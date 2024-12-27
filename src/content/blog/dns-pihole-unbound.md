---
title: "DNS 101: Adblocking & Recursive DNS server in Kubernetes"
description: "Ads and trackers, you shall not pass!"
author: "Léo Mercier"
authorLink: "https://github.com/Sawangg"
authorAvatar: "https://avatars.githubusercontent.com/u/38500427?s=60"
authorAt: "@Sawangg"
publishedAt: 2024-07-14
tags:
- title: DevOps
  color: cyan
- title: Homelab
  color: indigo
- title: Privacy
  color: amber
- title: Guide
  color: red
---


The DNS protocol is the backbone of the Internet as we know it today, but this protocol is inherently insecure and can
be used to monitor your Internet traffic. From Internet companies to your ISP, DNS records can quickly become a goldmine
for advertisers and hackers alike.  
<br />

In today's article, you'll learn how to quickly set up an ad-blocking recursive DNS server at home by combining two
pieces of software: Pi-hole and Unbound, all within a Kubernetes cluster. If you don't have a Kubernetes cluster running
yet, follow my [previous article](https://leomercier.blog/posts/kubernetes-ansible) to get started.  
<br />

## PiHole

If you own a Raspberry Pi, you've probably heard of a project called Pi-hole. Pi-hole is software that blocks ads and
trackers across your entire network by acting as a DNS sinkhole. I've used this project for the last 5 years and have
financially contributed to its development. This great piece of software provides a web interface to manage everything
easily, allowing you to control your network's DNS traffic and block unwanted domains, providing a cleaner browsing
experience.  
<br />

## Unbound

Unbound is a recursive DNS server that will serve as the upstream DNS server for Pi-hole. This fast and lightweight
server communicates directly with Top-Level Domain (TLD) servers, enhancing privacy by eliminating reliance on
third-party DNS resolvers. When combined with Pi-hole, Unbound ensures that your DNS queries remain private and secure,
as it does not rely on any third-party DNS providers like Google or Cloudflare.  
<br />

## It's deployment time

Now that you understand what’s going on behind the scenes, let’s deploy the solution! I created an Ansible playbook to
manage the Kubernetes manifests and deploy everything automatically to your cluster. Convenient, right? You can find the
playbook and instructions on how to use it in my [Github
repository](https://github.com/Sawangg/dotfiles-server/tree/master/DNS). Just follow the `README.md` instructions to set
up Pi-hole and Unbound in your Kubernetes cluster seamlessly.  
<br />

## Update your client/router

Now that your ad-blocking DNS server is up and running, you’ll want to use it across all of your devices. To do this,
you’ll need to update the DNS entries in your router settings to point to your new server. This will ensure all network
devices use your Pi-hole server by default. The instructions for changing DNS settings vary depending on your router
model, so a little Googling might be necessary to find the specific steps.  
<br/>

If you can’t modify your DNS entries at the router level, you can update them directly on your machine. For example, on
a Linux machine, you can edit the `/etc/resolv.conf` file to point to your server’s IP address. To prevent this file
from being overwritten by processes like VPNs or DHCP clients (e.g. `dhcpcd`), run the following command:

```sh
doas chattr +i /etc/resolv.conf # Use sudo instead of doas if you prefer
```
> Note: You can also modify the `dhcpcd` configuration file to automatically give you the custom DNS server  
<br/>

On an IPhone, you can modify it by going into `Settings > Wifi > Tap the "i" icon next to your network > Configure DNS`
and then add yourserver's IP here.  
<br />

## Read more

If you want more in-depth details, feel free to check out the [PiHole
documentation](https://docs.pi-hole.net/guides/dns/unbound/) for a comprehensive guide on integrating Pi-hole with 
Unbound.  
<br />

Thank you for reading this article, and see you soon!
