+++
title = "Nvidia Compute+VFIO Setup"
+++

I recently got my hands on a Nvidia RTX 2070 Super. Despite being much more
powerful than my RX580, at first I was going to use it for VM passthrough only,
and not for daily use.
However AMD recently discontinued support for ROCm on Polaris chips so I guess
I now need to use the 2070 for compute purposes such as machine learning [^1]. 
Obviously these two scenarios require different drivers: `nvidia` for the host
compute, and `vfio-pci` for passthrough. Switching between the two is easy, but
requires a sequence of unbinds and binds for each of the (4!!) PCI devices that
are exposed.

To help ease this driver switching I wrote a wrote script called
[pci-bind](https://github.com/lolzballs/dotfiles/blob/master/bin/pci-bind),
which handles the unbinding and binding a new driver for a group of devices with
a certain PCI address.

To bind `nvidia` for compute I can just run:
```sh
sudo pci-bind nvidia 0000:0a:00
```
Replacing `nvidia` with `vfio-pci` does the opposite, which is what I put at
the top of my `qemu` script.

On my system `lspci` gives:
```
...
0a:00.0 VGA compatible controller: NVIDIA Corporation TU104 [GeForce RTX 2070 SUPER] (rev a1)
0a:00.1 Audio device: NVIDIA Corporation TU104 HD Audio Controller (rev a1)
0a:00.2 USB controller: NVIDIA Corporation TU104 USB 3.1 Host Controller (rev a1)
0a:00.3 Serial bus controller [0c80]: NVIDIA Corporation TU104 USB Type-C UCSI Controller (rev a1)
...
```
and each of these live in `/sys/bus/pci/devices/0000:0a:00.{0-3}`. Hopefully you
can see where the `0000:0a:00` argument comes from (it's just a prefix).

One issue I've experienced with this setup is that XWayland will pick up the
Nvidia drivers and hold `/dev/nvidia0` open so that the `nvidia` module will
refuse the unbind request. I found that this was due to `glvnd` loading the
Nvidia EGL ICD from `/usr/share/glvnd/egl_vendor.d/10_nvidia.json`.
Unfortunately I couldn't find a way to simply not install the Nvidia GL driver
but include the `nvidia` kernel driver (i.e. a headless driver of some sort) on
Arch. Anyways to stop `glvnd` from loading the `nvidia` driver, I simply added
the following to force EGL to load `mesa` only:
```sh
export __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json
```

I also use flatpak, which will end up trying to install the Nvidia GL drivers
as a flatpak package. To disable this I just masked out the driver package:
```sh
flatpak mask "org.freedesktop.Platform.GL.nvidia*"
```

[^1]: screw Nvidia for making CUDA proprietary and not advancing open standards
like OpenCL, but also screw AMD for discontinuing ROCm support randomly on a
fairly recent card. Hopefully Intel comes up with something better, oh wait
they did and SYCL is just *another* standard.
