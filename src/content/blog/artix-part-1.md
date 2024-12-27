---
title: "Part #1: Running Linux as your daily driver"
description: "Are you tired of Windows 10/11? Start your Linux 🐧 journey here!"
author: "Léo Mercier"
authorLink: "https://github.com/Sawangg"
authorAvatar: "https://avatars.githubusercontent.com/u/38500427?s=60"
authorAt: "@Sawangg"
publishedAt: 2024-02-07
tags:
- title: Linux
  color: orange
- title: Guide
  color: red
---

Tired of Microsoft shenanigans and Windows eating all of your RAM? In this multiple articles guide you’ll see how to
setup a full disk encryption with Artix Linux and the init system called `dinit` on your machine as well as rice the
distro to be **secure** and **usefull**.  
<br />

Because we are using Artix Linux, `systemd` and other common packages found in
most Linux distros won't be included, so you have total control of your own computer. This article will contain detailed informations to guide you through the install process and the next few posts will help you install a graphical interface and more!

***

## Material needed

For this guilde you will need the following

* A USB stick with atleast 1GB in storage
* The machine you want to install Artix Linux. This guide was created with a 1TB M2 SSD, AMD CPU and last generation Nvidia GPU in mind but it can be used with any machine, for example I also installed this on a raspberry pi!
* An internet connection

This article was designed so it requires minium effort to follow but you'll still need the basics (such as exiting vim).
Additionally, this guide was done using a french layout keyboard (AZERTY), thus you can skip or modify the sections regarding keyboard mapping.

***

## First step

Download the ISO image on the official [Artix Linux website](https://artixlinux.org/download.php). We will choose the `artix-base-dinit-x86_64.iso` version to get Artix Linux with dinit. The partitions for our machine will be the following  
<br />
![schema](../../assets/article1-1.avif)
<br />

_Use this schema as reference if you're lost with what disk or partitions I use in the commands_  
<br />

This approch is using LVM on LUKS to encrypt our entire system. We will also later on protect our `boot/efi` partition using the secure bios and an additional tool. This will provide maximum security for our data.  
<br />

During this guide, I will reference the disk as either `/dev/your-disk` or a variant of this to indicate a specific partition. You will be able to see if your disk is `/dev/sda` for a hard drive or `/dev/nvme0n1` for an M.2 SSD or any other in the section about wiping your disk.

***

## Create a bootable USB

Locate the ISO you downloaded on your machine and use a tool like `dd` on Linux or Rufus on Windows to flash the usb.

Here is the command to flash the USB on Linux

```sh
dd bs=4M if=path/to/artixlinux-version-x86_64.iso of=/dev/my-usb oflag=direct status=progress
```
Once the USB is flashed, plug the USB in your PC when it's shutdown, press the boot menu choice key or change the bootable order in your BIOS and boot onto the USB.

You might need to edit the GRUB boot options depending on your hardware or else you'll get a black screen once you load the live OS. Press e on the Stick/HDD option of the menu and add ‘nomodeset’ at the end of the line that starts with linux. 

```
linux ... nomodeset
```
Press F10 to boot. You should now have access to the root terminal of your live Artix Linux.  
<br />

### Login

You can now login using the default credentials

```sh
username: root
password: artix
```
### Change your keyboard

Change your keyboard mapping if you didn't change the keytable in the GRUB options. Here is an example for the AZERTY layout

```sh
loadkeys fr
```

### Login to the network

We're going to need an Internet connection to download packages further in this guide. To do that without an Ethernet cable, we're going to use `wpa_supplicant` provided in the live install of Artix. Run all these commands to connect to your WIFI

```sh
rfkill unblock wlan
ip link set wlan0 up
wpa_cli
add_network
set_network 0 ssid "my wifi ssid"
set_network 0 psk "my password"
enable_network 0
```
***

## Wipe your disk

This step ensure that you start with a fresh disk. You can use whatever disk manager tool you’re comfortable with. Be careful if you have data on this drive it **will be deleted**! You can list your partitions and disks by running:

```sh
lsblk
```

Wipe the data **⚠️ THIS WILL DELETE ALL THE DATA ON THE SELECTED DISK ⚠️**. This can take a long time depending on the size of your disk and your CPU.

```sh
dd bs=4096 if=/dev/urandom iflag=nocache of=/dev/your-disk oflag=direct status=progress || true
```
**WAIT** for the process to finish and run

```sh
sync
```

***

## Create the Partitions

Now that our disk has been reset to its original state, we're going to use a tool called parted to create our partitions. Let's install it

```sh
pacman -Syu
pacman -S parted
```

Create a GPT partition table

```sh
parted -s /dev/your-disk mklabel gpt
```
We're going to use the UEFI & GPT combo. The first partition is going to hold our bootloader and the rest will be encrypted using LVM on LUKS.

```sh
parted -s -a optimal /dev/your-disk mkpart "primary" "fat32" "0%" "512MiB"
parted -s /dev/your-disk set 1 esp on
parted -s -a optimal /dev/your-disk mkpart "primary" "ext4" "512MiB" "100%"
parted -s /dev/your-disk set 2 lvm on
```

You can print the partition table of the drive and see if the alignment of your partition is optimal
```sh
lsblk
parted -s /dev/your-disk align-check optimal 1
parted -s /dev/your-disk align-check optimal 2
```

***

## Cryptsetup

Now we're going to encrypt our disk. To get started run the next command to try to force the unlocking of stronger ciphers
```sh
cryptsetup benchmark
```
If that didn't work and you get an N/A on serpent-xts, try rebooting your live environment.

To generate a strong password, you can use this tool:
https://rumkin.com/tools/password/

Next we're going to encrypt the disk using one of the stronger cipher proposed by the benchmark.
```sh
cryptsetup --verbose --type luks1 --cipher serpent-xts-plain64 --key-size 512 --hash sha512 --iter-time 10000 --use-random --verify-passphrase luksFormat /dev/your-disk-2
```

Then we mount using the device mapper. A possible reboot here can fix issues mounting the partition.
```sh
cryptsetup luksOpen /dev/your-disk-2 alpha
```

***

## Logical & Physical volume

Now it's possible to create the physical volume
```sh
pvcreate /dev/mapper/alpha
```
And finally the logical volume that we'll call alpha
```sh
vgcreate alpha /dev/mapper/alpha
```

***

## System partitions

Next we can create the 3 partitions needed: swap user and root
```sh
lvcreate --contiguous y --size 16G alpha --name volSwap
lvcreate --contiguous y --size 400G alpha --name volUser
lvcreate --contiguous y --extents +100%FREE alpha --name volRoot
```

### Format the partitions

We can format each partition to use the correct file system.
```sh
mkfs.fat -n ESP -F 32 /dev/your-disk-1
mkswap -L SWAP /dev/alpha/volSwap
mkfs.ext4 -L ROOT /dev/alpha/volRoot
mkfs.ext4 -L HOME /dev/alpha/volUser
```

### Mount the partitions

We can finally mount our newly created partitions. If you get an error about `ext4` being unrecognized, run `modprobe ext4` and check if you get an error. If you do, reboot your system and do the following
```sh
swapon /dev/alpha/volSwap
mount /dev/alpha/volRoot /mnt
mkdir -p /mnt/boot/efi
mount /dev/your-disk-1 /mnt/boot/efi
mkdir /mnt/home
mount /dev/alpha/volUser
```

We did it! We can finally install Artix to our system.

***

## Install Artix

It's time to install all the necessary packages for your brand new os.

First we're going to install the base. I chose dinit but you can use `runit` `openrc` or `s6` and I also added `seatd` instead of `elogind`
```sh
basestrap -i /mnt base base-devel dinit seatd seatd-dinit dbus-dinit
```

Then we're going to chose linux-hardened for more security. We're going to install more packages like `turnstile` to fully replace `elogind` later on.
```sh
basestrap -i /mnt linux-firmware linux-hardened linux-hardened-headers mkinitcpio dhcpcd dhcpcd-dinit iwd iwd-dinit acpi acpid acpid-dinit chrony chrony-dinit openssh man
```

Finally we're going to install additional packages
```sh
basestrap -i /mnt doas vim git amd-ucode fastfetch
```

Feel free to replace the amd-ucode with the necessary drivers for your CPU (intel-ucode). If you are using an Nvidia GPU like I do, I'll post an article on how to handle the pain that Nvidia is on Linux.

<br />
### Fstab

Generate the fstab

```sh
fstabgen -U /mnt >> /mnt/etc/fstab
```

Ensure everything is listed correctly, you should have 4 entries
```sh
cat /mnt/etc/fstab
```

If you're missing an entry, add it manually, for example this is the command to add your /home
```sh
echo -e "# /dev/mapper/alpha-volUser LABEL=HOME\nUUID=`blkid -s UUID -o value /dev/alpha/volUser`\t/home\t\text4\t\trw,relatime\t0 2\n" | tee -a /mnt/etc/fstab
```

#### Optional

tmpfs is a temporary filesystem that resides in memory or swap partitions. Without systemd, only the /run directory uses tmpfs by default. We can change the size of tmpfs partition using this command
```sh
echo -e "\ntmpfs\t\t\t\t\t\t/tmp\t\ttmpfs\t\trw,nosuid,nodev,norelatime,size=8G,mode=1777\t0 0\n" | tee -a /mnt/etc/fstab
```

### Chroot

Now that we installed the base of our system, we can access it using
```sh
artix-chroot /mnt /bin/bash
```

Set your new root password

```sh
passwd
```

## Doas I do and remove sudo

Since we're using `doas` instead of `sudo` and for whatever reason `sudo` is a dependency of `base-devel`, we will remove it now
```sh
pacman -Rdd sudo
```

### Locale, Timezone, Hostname and Hosts

First we need to generate our local. It is recommanded to use en_US but you can use whatever locale you want.

```sh
echo -e "en_US.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
export LANG=en_US.UTF-8
```

Then we need to switch our timezone

```sh
ln -s /usr/share/zoneinfo/your-continent/your-city /etc/localetime
hwclock --systohc
```

Setup your hostname, in this example "Artix"

```sh
echo "Artix" > /etc/hostname
```

And finally we need to add our static hosts

```sh
vim /etc/hosts
```

And insert this

```
127.0.0.1    localhost
::1          localhost
127.0.1.1    myhostname.localdomain    myhostname
```

#### Optional

Add your keymaps in vconsole
```sh
echo "KEYMAP=fr" > /etc/vconsole.conf
```

### User account

Next we're going to create a user account
```sh
useradd -m myuser
passwd myuser
usermod -aG wheel,storage,power myuser
```

We need to enable the use of doas for the wheel group. To do that create `/etc/doas.conf` and add
```sh
permit setenv {PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin} :wheel
```

Finally, change the permissions of the file to
```sh
chown -c root:root /etc/doas.conf
chmod -c 0400 /etc/doas.conf
```

#### Optional

If you want to persist your password in your terminal after you used it once, you can change the `doas.conf` to this
```sh
permit persist setenv {PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin} :wheel
```

Keep in mind that this is not as secure as typing your password every time.

<br />
### Kernel parameters

```sh
pacman -S cryptsetup lvm2 lvm2-dinit
dinitctl enable lvm2
```

```sh
vim /etc/mkinitcpio.conf
```

And insert encrypt lvm2 and resume between the block and filesystems parameters

```sh
HOOKS=(base udev autodetect modconf kms keyboard keymap consolefont block filesystems fsck)
```
Should become
```sh
HOOKS=(base udev autodetect modconf kms keyboard keymap consolefont block encrypt lvm2 resume filesystems fsck)
```

Next, we will create a key to decrypt our disk during boot by our bootloader. If we don't do that, we will be prompted for our encryption key twice instead of one directly on boot. The default path for that key is `/crypto_keyfile.bin`. **BE CAREFUL** to never leak this key because it can fully decrypt your disk. We will generate it like this
```sh
dd if=/dev/random of=/crypto_keyfile.bin bs=512 count=8 iflag=fullblock
chmod 000 /crypto_keyfile.bin
```

Add the file to the `FILES` hook of `/etc/mkinitcpio.conf` and register your key.
```sh
sed -i "s/FILES=(/FILES=(\/crypto_keyfile.bin/g" /etc/mkinitcpio.conf
cryptsetup luksAddKey /dev/your-disk-2 /crypto_keyfile.bin
```

Compile the image and you're ready to go
```sh
mkinitcpio -p linux-hardened
```

We should get a successfull image generation

***

## GRUB

Let's install GRUB
```sh
pacman -S grub efibootmgr
```

Run this command to add the correct configuration. Make sure you reference the correct lvm partition (it should be your second one)
```sh
sed -i "s/^GRUB_CMDLINE_LINUX_DEFAULT=.*/GRUB_CMDLINE_LINUX_DEFAULT=\"cryptdevice=UUID=`blkid -s UUID -o value /dev/your-disk-2`:alpha loglevel=3 quiet resume=UUID=`blkid -s UUID -o value /dev/alpha/volSwap` net.iframes=0\"/" /etc/default/grub
```

Next open the file and check if the output of the previous command is correct
```sh
vim /etc/default/grub
```

Then uncomment this line
```
GRUB_ENABLE_CRYPTODISK="y"
```

And add to GRUB_PRELOAD_MODULES cryptodisk
```
GRUB_PRELOAD_MODULES="cryptodisk part_gpt part_msdos"
```

Save the file and run the next two commands to install and generate the config
```sh
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=artix --recheck /dev/your-disk
grub-mkconfig -o /boot/grub/grub.cfg
```

Check the output of the command to see if it used our linux-hardened image we created earlier using `mkinitcpio`.

***

## Boot Time !

It seems like we can now boot into our system.

Exit the termnial, unmount the partitions, shutdown your system, unplug the USB and start it!

```sh
exit
umount -R /mnt
swapoff -a
sync
reboot
```

***

## First time on the system

Login using your user credentials previously created and enable a few services as **ROOT**
```sh
doas dinitctl enable dbus
```

Because we didn't install `networkmanager`, we're going to enable the `dhcpcd` service as root to get an ip adress
```sh
doas dinitctl enable dhcpcd
```

### Wifi

If you installed `iwd` in the basestrap, you can connect to the wifi by running
```sh
doas dinitctl enable iwd
iwctl
station name connect SSID
```

Once you've got an internet connection, change your dns to whatever you want (don't use Google please). You can prevent the file from being updated if you want your DNS configuration to be persistent.
```sh
vim /etc/resolv.conf
chattr +i /etc/resolv.conf
```

You're **DONE**!! Congratulation, you're well on your way to have a wonderful Linux system. See the [next post](https://leomercier.blog/posts/artix-part-2) of this guide to setup your user environment!

