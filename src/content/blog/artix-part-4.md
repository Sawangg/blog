---
title: "Part #4: Sound on Artix with Wireplumber"
description: "The last post of this guide. Time to make some noise!"
author: "Léo Mercier"
authorLink: "https://github.com/Sawangg"
authorAvatar: "https://avatars.githubusercontent.com/u/38500427?s=60"
authorAt: "@Sawangg"
publishedAt: 2024-05-07
tags:
- title: Linux
  color: orange
- title: Guide
  color: red
---

In this final installment of this guide, we'll be setting up a superior alternative to PulseAudio using PipeWire and WirePlumber on Artix Linux. This guide will walk you through the installation and configuration steps to achieve a fully functional sound system without the need for systemd or elogind.

***

## Packages

We're going to install these packages

```sh
doas pacman -S pipewire pipewire-dinit wireplumber wireplumber-dinit pipewire-alsa pipewire-jack
```
Once installed, let's enable our 2 user services with dinit (**DON'T** run them as **ROOT**). If you haven't setup the user services yet with dbus, follow my previous posts of this guide.

```sh
dinitctl enable pipewire
dinitctl enable wireplumber
```
### Handle the lack of systemd and elogind

We need to disable some configs to support our systemd and elogind free system.

```sh
mkdir -p ~/.config/wireplumber/{bluetooth.lua.d,main.lua.d}
touch ~/.config/wireplumber/bluetooth.lua.d/80-disable-logind.lua
```
Then edit `80-disable-logind.lua` and add

```lua
-- Disable arbitration of user allowance of bluetooth via D-Bus user session
bluez_monitor.properties["with-logind"] = false
```
And create `~/.config/wireplumber/main.lua.d/80-disable-dbus.lua` with

```lua
-- Disable use of flatpak portal integration
default_access.properties["enable-flatpak-portal"] = false
```
Exit your session and login. You should see all the services running using `dinitctl list`. If all the services are up and running, you should now have sound on your system!  
<br />

## Usefull commands

You can check all your sources and more using

```sh
wpctl status
```
You'll maybe want to change your default sink (input), you can do so using

```sh
wpctl set-default ID
```
To get your current volume, run

```sh
wpctl get-volume @DEFAULT_AUDIO_SINK@
```
More info here: [https://wiki.archlinux.org/title/WirePlumber](https://wiki.archlinux.org/title/WirePlumber).  
<br />

## Media support

To be able to pause a media and more, we're going to install the `playerctl` package in the `extra` Arch Linux repository. If you don't have setup this repository yet, follow [this](https://github.com/Sawangg/dotfiles/wiki/Manage-your-packages#arch-repositories).

```sh
doas pacman -S playerctl
```
Now you're able to use the `playerctl` commands such the pause command to pause the audio currently playing.

```sh
playerctl pause
```
## Last words

I hope this series of posts helped you in your quest for a better system. There is still a lot for you to discover if
you continue on your quest to use the almighty Linux. For any questions, feel free to reach out and keep yourself on the
lookout for new posts written by yours truly. Happy tinkering!
