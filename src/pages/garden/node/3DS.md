---
title: The 3DS still holds up
tags: hardware, gaming
date: 2025-06-24
in: blog
description: I know the Switch 2 just came on but I want to give you a love letter to my 3DS
---

![[Image 2755.webp]]

The 3DS still holds up. It's a great little console, and it gets greater each year. It certainly has flaws: The battery could be bigger, the processor could be faster, and what are those I/O speeds?! However, despite its flaws, it can run GBA & DS games natively, and emulate NES, Virtual Boy[^1], and SNES near perfectly. People have got retroarch, pico-8, [PS1](https://catskull.net/ps1-on-3ds.html) and N64 on this thing, to various degrees of success. It can even run 3DS games.

Almost all of this is made possible by 3DS homebrew. Homebrew for the 3DS is quite unique, as consoles go. No hardmod is required, and while the device does employ protections against mods, the mods are way too good and the protections were never that great in the first place. [^2] [Previous attacks](https://www.3dbrew.org/wiki/3DS_Userland_Flaws) used the audio player (soundhax), theme shuffler (shufflehax), and the classic title *Cubic Ninja*. Nintendo was always reactive, not proactive. The 3DS had critical flaws in its bootrom and secure boot process, and once boot9 was [dumped](https://media.ccc.de/v/33c3-8344-nintendo_hacking_2016#t=3) in 2016, it was game over, as the bootrom is burnt at the factory, making it unpatchable. I like to think that the switch is what it is today because Nintendo was so embarrassed by the homebrew community.

At one point, Nintendo [did](https://www.reddit.com/r/3dshacks/comments/6dduin/official_banwave_megathread/) issue bans to homebrewers back in 2017, right after the bootrom was cracked, but the bans were [bypassed](https://gbatemp.net/threads/all-3-methods-to-get-unbanned-from-recent-ban-wave.450679/). Now, Nintendo shut down their online services, so that isn't even a risk any more. Viva la Pretendo. All of this, compounded with time for tools to mature, makes homebrew shockingly low risk and safe. Almost all hacks nowadays are initialized through old webkit vulnerabilities, leading to a ROP Chain granting code execution in ARM11 usermode. This is used to run otherapp.bin, which in turn runs an exploit chain to ARM9. SafeB9SInstaller is installed as fake firmware payload. The device reboots and runs SafeB9SInstaller, which writes boot9strap into firmware. On boot, boot9strap loads a custom payload. This payload is luma3ds (*cfw*). It bypasses signature checks and adds a number of features.

- [Nintendo 3DS Architecture | A Practical Analysis](https://www.copetti.org/writings/consoles/nintendo-3ds/)
- [Introduction to how 3DS hacks work](https://gbatemp.net/threads/introduction-to-how-3ds-hacks-work.491138/)

::: figure Look at how big that cartridge reader is!
![[3DS XL Teardown Background Removed.webp]]
:::

As for the 3DS vs the New 3DS, you may have heard that the New 3DS has a better CPU. This is only a half-truth. In reality, the New 3DS has *four* physical 45nm MPCore processors which are *identical* to the *two* in the original 3DS. This effectively triples the core count, because one core is mostly reserved for the system. The CPUs are also clocked at 804Mhz instead of 268Mhz. Nintendo likely clocked the original 3DS lower as the battery is worse and there is less heat dissipation. The SOC on the new 3DS features 4mb of additional VRAM (totaling to 10mb), and features an L2 cache. Also, RAM was doubled from 128mb to 256mb, giving games 192mb of addressable RAM instead of 64. Games for the original 3DS running on the new one are still clocked to the original speed, however this can be overridden by luma3DS. Battery life does go down, however frame rates can disproportionately increase, making it plausible that the 804Mhz clock is actually more efficient.

I hope all this trivia was interesting. There are a lot better places to learn about the nitty-gritty of technicals or installing homebrew. This doesn't seek to compete. But I think it is cool to have some understanding the devices we use. What will follow isn't a tutorial, more a demonstration of what this device is capable of. Onward.
## Homebrew

::: figure A 3DS boots, displaying the old VALVᴱ logo.
![[HEIC to WEBP Image 2764.webp]]
:::

The guide at 3ds.hacks.guide leaves your system with a number of new apps:

- The Homebrew Launcher: The 3DS home screen can hold a maximum of 300 icons, plus an additional 40 DSi icons (a folder holding 5 apps with a badge on top would count as 7/300 icons). The home screen launches installed CIAs, whereas the homebrew launcher launches apps in a custom 3dsx format. This means utilities installed this way don't count to the limit.
- FBI: Installs CIA app archives to the system
- FTPD: FTP server for the 3DS. Useful because New 3DS SD cards are inaccessible unless the back is unscrewed. The 3DS network connection tops out at like 1mbps.
- Universal Updater: An app store for homebrew
- Anemone: Allows installing custom themes. How I got that Windows XP theme up there! Also allows you to set a splash screen that luma3ds shows while booting the main OS. Also allows you to install badges that you can use on the homescreen.
- Checkpoint: Save file manager.

A few others are necessary to every console:

- ModMoon: Mod manager for 3DS. I tried searching for a list of good 3ds game mods/rom hacks and didn't find a solid list, but some I like are [CTGP-7](https://ctgp-7.github.io/), hands down the best 3DS rom hack; [mc3ds-modern](https://github.com/wyndchyme/mc3ds-modern) for Minecraft; various super smash mod packs; and [Project Restoration for Majora's Mask 3D](https://restoration.zora.re/). 
- Pretendo: OSS reimplementation of game servers

There are plenty of other homebrew apps, like a YouTube client, a client for the Moonlight game streaming app, and a digital streetpass. I was shocked to find a highly competent graphing calculator named Omega.

![[Pasted image 20250624220911.png]]

I imagine in modern times, Pretendo and Checkpoint are both the big drivers for homebrew.[^3] Don't get me wrong, playing games made for 3DS on a 3DS is a great way to experience the console. I've been having a blast recently inside Ridge Racer 3D and Monster Hunter Generations 4. I have a lot of PC games, but I still come back to DS, DSi and 3DS for bite sized games. But these things are well within the bounds of what is *expected* of a 3DS. So let me tell you about emulation instead.

[List of 3DS homebrew applications](https://www.gamebrew.org/wiki/List_of_3DS_homebrew_applications)
## Emulation

As mentioned, the 3DS also contains a DSi, a DS[^4]and a GBA, via the inclusion of a second chip. This makes it a powerhouse for emulating these consoles, although in Nintendo-like fashion they didn't make it easy.
### DSiWare & Virtual Console

3DSes have a pretty strong emulation out of the box.

* They ship with software emulators for NES, SNES[^7], GB, GBC, and TG-16. These emulators are branded as Virtual Console
* Backwards compatibility with DS cartridges via a dedicated chip, but refusing to boot them from the SD card.
* In addition, GBA "Virtual Console" is *closer* to native than the aforementioned emulators because the DS CPU was backwards compatible with the GBA. As far as I'm aware, Nintendo never sold a GBA Virtual Console game, they were only given to ambassadors.
* DSiWare: DSi games which were sold on the eShop. They used the dedicated chip as well.

But, Nintendo strictly controlled which games could use these emulators. No retail DS games were sold on the eShop, despite cartridges working. Neither were GBA games. Of the remaining systems, only some games were sold.

This brings us to a proprietary[^5] program called "Super Ultimate Injector," which wraps ROMs with Nintendo's original emulator binaries which are presumably extracted from official titles, then fakesigns it. For virtual consoles the 3DS *doesn't* have an emulator for, it "forwards" to a user's own emulator. I've found I *don't* like using this program very much. You'll find out about alternatives later.
### TwiLight Menu, nds-bootstrap & TWPatcher

`TWL_Firm` is the name of Nintendo's DS firmware for the 3DS. `nds-bootstrap` is homebrew software that allows the firmware to launch titles from the SD card, not just cartridges. TwiLight Menu++ is a homebrew application that acts as a homescreen, launcher and tweak manager for the DS titles on your SD card. These components together allows your 3DS to run *any* DS backup.

The ability to run DS games off your SD card instead of a cartridge is already cool, but with a few simple tweaks, we can turn our 3DS into the definitive way to play DS games.

A program called TWPatcher literally modifies `TWL_Firm` to change the upscaling algorithm, and, critically, enable supported three-dimensional games to become widescreen 16:10 instead of the 4:3 of the DS.[^6]

One finicky part of the DS was its lack of a circle pad. Precise 3D games that required the ability to control *magnitude* relied on the touchpad as a control scheme instead of the d-pad or missing circle pad. This, obviously, was not ideal, leading to (justified) criticism of games like Super Mario 64 DS and Super Monkey Ball: Touch & Roll. In 2022, a god named shoco [published](https://gbatemp.net/threads/circle-pad-patches-for-super-mario-64-ds-and-other-games-in-twilightmenu-with-twpatcher-and-rtcom.623267/) a mod to GBATemp allowing the 3DS circle pad to be used instead of the touchpad, also enabling gyro and CStick camera control for some games.

The only thing missing are mods to make 3D games *3D*. Maybe they'll come in 2026.

Tutorial: [Remastering DS Games for 3DS - Widescreen, Dual Analog & More](https://www.youtube.com/watch?v=l_d3H2bkZHM)
### Emulating other systems

![[Pasted image 20250624221320.png]]

It's also a great target for fantasy console. [Fake-08](https://github.com/jtothebell/fake-08) is an emulator for the pico-8, and it runs perfect for me. It can run UXN via [uxnds](https://github.com/asiekierka/uxnds). Of course people [put](https://www.reddit.com/r/unixporn/comments/a0lwy7/nintendo_3ds_linux_on_the_3ds/) linux on it.

{{ embedMastodon "https://merveilles.town/@d6/114741669915023040" }}

The 3DS is *also* the definitive way to play Virtual Boy games. For some reason, Nintendo never offered a Virtual Boy VC, but skyfloogle's [Red Viper](https://github.com/skyfloogle/red-viper) gets the job done.

Retroarch runs dozens of systems amazingly, though often times standalone emulators do it better:

* NES: [VirtuaNES](https://github.com/bubble2k16/emus3ds)
* SNES: [Snes9x](https://github.com/bubble2k16/snes9x_3ds)
* Sega Master/Genesis/Mega Drive: [PicoDrive](https://github.com/bubble2k16/emus3ds/blob/master/readme-picodrive.md)

The former 2 can be injected as well. In general, standalone emulators are preferred over injects and retroarch because it is more convenient than creating your own injects, they may perform better, and offer additional features.

N64 emulation is technically possible, although not well done.

PS1 emulation can actually be done decently well via retroarch with some tweaking. The CHD file format works best. Having a PS1 BIOS file improves performance. In general, I've found that all PS1 games can run, but they need tinkering. Some guides:

- [PCSX Rearmed "Optimal Settings"](https://gbatemp.net/threads/pcsx-rearmed-optimal-settings.639274/)
- [PCSX ReARMed compatibility list](https://gbatemp.net/threads/pcsx-rearmed-compatibility-list.489357/)

For GBA, your options are basically either injects or `open_agb_firm`. Both use the native hardware. The injects are nice because you can launch them from the homescreen, whereas open_agb_firm games don't take any home slots, have features like modding, and boot faster.
### Ports

![[Pasted image 20250624220743.png]]

A lot of classic games have been ported, like [Doom](https://gbatemp.net/threads/release-prboom-3ds-port-gpu-accelerated.636076/) ofc, [Super Mario 64](https://archive.org/details/super-mario-64-mkst-ctr-p-sm-64), [Sonic Mania](https://github.com/SaturnSH2x2/RSDKv5-Decompilation/releases/), [Quake III](https://www.gamebrew.org/wiki/IoQuake3DS), [Super Hexagon](https://github.com/RedTopper/Super-Haxagon), [Fallout 1](https://github.com/MrHuu/fallout1-ce-3ds/releases) and [Half Life](https://github.com/masterfeizz/Xash3DS).

Huge list [here](https://rentry.org/3ds-game-ports-guide)
## Conclusion

The 3DS may be the best emulation device yet, assuming you already own one. If you don't, you're likely weighing it against something like a TrimUI Brick. I don't think there is a right choice either way, I think niche devices are cool and do hope to add a brick to my collection one day, but of course the 3DS has the advantage of being able to play an even wider array of games, when you factor in its 3DS, DS, and Virtual Boy support. In addition, it features a larger (though less dense) screen, and a circle pad. The brick's CPU is clocked around 2x higher, and features 4x the ram. I don't know if this has any real impact on emulation ability. All I mean to say here is that if you have a 3DS sitting around, you really ought to pick it back up.

[^1]: Against Nintendo's wishes... a common theme for this article.
[^2]: Back in 2016, Nintendo's eShop was a static CDN that made encrypted games available without authentication. Purchasers were issued "tickets" that allowed the games to be decrypted. An app called freeShop maintained a database of these tickets and redistributed them. Yes, at one point Nintendo's *own* servers were used for piracy.
[^3]: Or maybe people install a custom theme and put the 3DS back in a drawer.
[^4]: Did you know that the DS had only 4mb of RAM and was clocked to 67MHz?
[^5]: ["Source code? I just can't make it public. At least not the version of NSUI you all know. [...] right now I can't upload the current code for all. I just don't want it to be visible by Ninty."](https://gbatemp.net/threads/discussion-new-super-ultimate-injector-nsui.500376/page-30#post-9127888)
[^6]: 2D assets are streached, but 3D assets retain their geometry 
[^7]: Only on new 3ds, for some reason