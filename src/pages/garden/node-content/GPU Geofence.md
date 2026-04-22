---
title: "You want to geofence my GPU???"
description: "A GPS won't fit in a graphics card."
tags:
- politics
- ai
date: 2025-05-15
in: blog
---

[Reuters: US lawmaker targets Nvidia chip smuggling to China with new bill](https://www.reuters.com/world/us/us-lawmaker-targets-nvidia-chip-smuggling-china-with-new-bill-2025-05-05)

A couple of days ago, Reuters reported that Rep. Bill Foster is planning to introduce legislation that mandates geofencing on GPUs, as part of the ongoing war against China's access to these products.

> U.S. Representative Bill Foster, a Democrat from Illinois who once worked as a particle physicist, said the technology to track chips after they are sold is readily available, with much of it already built in to Nvidia's chips. Independent technical experts interviewed by Reuters agreed.

How the hell would you geofence a GPU?

NVIDIA is already quite good at placing artificial restrictions on the technical abilities of their GPUs. A lot of their products feature similar internals but a few extra components, segmented by die quality, firmware, and peripherals surrounding the main chip. The RTX 3090 and A6000 share the same GA102 chip, but offer vastly different performance profiles. Famously, they placed restrictions on the hash rate of consumer GPUs, to combat crypto mining.[^1]

But geofencing is much harder than tweaking performance characteristics. As far as I can tell, you could go one of two routes. You could add a side channel to the GPU, or you could go through the host's driver. Both of these options are completely useless.

The side channel would be some additional peripheral that allows the GPU to deduct its own position in space. The most obvious option is a GNSS system, however this is power hungry and has no hope of working reliably indoors. Alternatively, the GPU could use Wi-Fi Positioning System. Of course, the GPU itself wouldn't be connected to the internet, but WiPS relies on BSSIDs which can be read without being connected to a network. Critically, however, this would rely on a network being nearby (not always the case in a data centre!), and the device having access to an ever-growing database of BSSIDs and their known location. This will not work. The last option is [Dead Reckoning](https://en.wikipedia.org/wiki/Dead_reckoning), which is impossible as the GPU is not powered while in transport.

So side channels are a non-starter. What about putting restrictions in the driver? On the surface level, this makes a lot more sense, but it falls apart if you think too much. Many hosts will have some sort of network connectivity, but not all. The well-designed datacentre will rely on an intranet, instead of exposing all machines to the internet needlessly. Assuming that miraculously, NVIDIA agrees to sell GPUs that don't work without internet, there is still a glaring problem. NVIDIA does not control the entire stack. Software running on the host could easily prohibit GPU drivers from connecting to the geolocation server, or even alter the response. Yes, the government could compel Microsoft to add its own side channels to windows, just as Apple did[^2][^3] in macOS, but all software can be modified. As it turns out, GPU users have a long history of working around Nvidia's shenanigans.[^4] [^5] [^6] [^7] If the servers are running Linux, as many servers do, it is game over for regulators.

As it turns out, where there's a will there's a way, and China certainly has a will. These bypasses are trivial compared to the [current smuggling](https://www.economist.com/business/2025/05/05/how-china-is-still-getting-its-hands-on-nvidias-gear) that GPUs undergo.

But there's actually no need to speculate about how it would be done. The Reuters article actually says!

> The technology for verifying the location of chips would rely on the chips communicating with a secured computer server that would use the length of time it takes for the signal to reach the server to verify where chips are, a concept that relies on knowing that computer signals move at the speed of light.

So instead of IP based geolocation, they[^8] want to rely on ping time. But computer signals simply do *not* move at the speed of light. There are so many factors relating to the countless intermediaries involved in getting data from point A to point B. All the methods of doing this are bad, but this is somehow even worse. Imagine the nightmare that would unfold if US-based GPUs started bricking themselves.

Hot take, but maybe regulators should actually know a thing or two about the field they're attempting to regulate. I don't even have well-formed thoughts on chip export controls as a principle—this page isn't supposed to be some big gotcha. I'm just confused how they intend to go about it, and until I start seeing some well reasoned proposals, I'm inclined to chalk it up as just another moment in a long history of technological incompetency at the fed.

That's all for now. I'll be back soon to talk about LLMs and how they relate to critical thought in school.
## 🍃 See Also

- [[TikTok Ban]] & [[TikTok Restored]]

[^1]: [Nvidia Expands Mining Limiter to RTX 3060 Ti, 3070, 3080 Graphics Cards](https://www.pcmag.com/news/nvidia-expands-mining-limiter-to-rtx-3060-ti-3070-3080-graphics-cards)
[^2]: [Patrick Wardle on Twitter](https://x.com/patrickwardle/status/1318437929497235457)
[^3]: [Apple’s Private Relay can cause the system to ignore firewall rules](https://mullvad.net/en/blog/2022/4/25/apples-private-relay-can-cause-the-system-to-ignore-firewall-rules)
[^4]: [Nicehash bypasses LHR limiter](https://www.tomshardware.com/news/nicehash-quickminer-bypasses-nvidia-lhr-limiter)
[^5]: [LTT — Nvidia Said No.. I said YES!](https://www.youtube.com/watch?v=vz-rpRYFhRo)
[^6]: [LTT —  GPU Sharing with Virtual Machines](https://youtu.be/Bc3LGVi5Sio)
[^7]: Shenanigans, I might add, that NVIDIA did of their own free will. NVIDIA clearly does not want to prevent sales to China. If compelled to add this ability, I fully expect them to half-ass it.
[^8]: The phrasing of this Reuters article makes it appear as if this is what regulators intend, although it isn't actually a quote attributed to anyone.
