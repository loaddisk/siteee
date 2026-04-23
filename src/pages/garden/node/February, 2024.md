---
in: links
description: Pluralistic at home
---
[[toc]]
## The Ninth
### Tucker
[Tucker Carlson Interviews Vladimir Putin](https://www.youtube.com/watch?v=fOCWBhuDdDo&t=4938s)
### Making fast text editors is hard
- Making text editors fast is hard
	- Deleting text, very hard in large buffers like a text editor. Data shifts.
	- We can mitigate this
- Mitigations
	- [Rope (data structure)](https://en.wikipedia.org/wiki/Rope_(data_structure))
		- [Ropes, an Alternative to Strings \[pdf\] (1995)](https://news.ycombinator.com/item?id=24955650)
			- [Rope Science](https://web.archive.org/web/20200415013110/https://abishov.com/xi-editor/docs/rope_science_00.html)
		- [Is there any scenario where the Rope data structure is more efficient than a string builder](https://stackoverflow.com/questions/1863440/is-there-any-scenario-where-the-rope-data-structure-is-more-efficient-than-a-str) (StackOverflow)
	- Sidetracked: [Why Emacs has Buffers](https://www.masteringemacs.org/article/why-emacs-has-buffers) ([HN](https://news.ycombinator.com/item?id=31650859))
	- But anyway Emacs uses [gap buffer](https://en.wikipedia.org/wiki/Gap_buffer)s
### Making good terminals is hard
- Suckless complains that xterm is 60k LOC
	- I'm surprised it's not more
	- Even suckless's terminal implements a lot of stuff where I don't know what's happening
	- If you look at Ghostty, you can see lots of stuff about compat
		- Basically the gold standard *is* just mocking XTerm's idiosyncrasies
		- And in the absence of standards, everybody implements their own
			- Eg: The Kitty Proto
			- Wild West
			- [TermInfo](https://github.com/mitchellh/ghostty?tab=readme-ov-file#terminfo) & "Standards Compliant Terminal Emulation"
			- [#632](https://github.com/mitchellh/ghostty/issues/632)
			- [Ghostty Devlog 005 ](https://mitchellh.com/writing/ghostty-devlog-005
			- [Grapheme Clusters and Terminal Emulators](https://mitchellh.com/writing/grapheme-clusters-in-terminals)
### Sometimes, It's too hard
Sometimes things are hard for no reason. Sometimes, somebody needs to come along and shake things up, with a simple solution.
#### Benchy WR on an Ender 3, viewers shocked

Ender 3 beats a voron in [new world's fastest benchy \[00:02:09s\] - YouTube](https://www.youtube.com/watch?v=MNPnTeIat98)

> comes from nowhere and shatters the speed record with an bedslinger on direct drive and a BLtouch, absolute legend.

> Out of all the 3d printers available now days, I did not expect the ender 3 to hold this record lol

[an overview of the world's fastest ender 3 - YouTube](https://www.youtube.com/watch?v=Y199h1UaJ7U&t=164s)

> When I saw the original WR video I paused and went "...is that a fucking Ender 3?" No CoreXY, no servos, no Bowden, just straight gas. Incredible. I described this to my non-3D printing buddy as "someone winning the quarter mile with a 97 honda accord and two leafblowers"

[world's first sub 2 minute benchy \[00:01:59\] HD - YouTube](https://www.youtube.com/watch?v=7lJmkTSoWLc)

> steam deck timer with the pimped out ender 3 being cooled by the 3d printed turbo being held up by the harbor freight bench vice. What a legend.

> \>enters the internet out of nowhere
> \> annhialates the benchy wr
> \>fucking does it again in just a few weeks
> \>says that she's not happy with it
> \>refuses to elaborate

> The reports of the bedslinger's demise have been widely exaggerated.
#### Refterm
- [Programmer complains rendering colourful text is slow](https://github.com/microsoft/terminal/issues/10362)
- Microsoft developers state "I believe what you’re doing is describing something that might be considered _an entire doctoral research project in performant terminal emulation_ as “extremely simple” somewhat combatively."
- Programmer states "When we're at the stage when something that can be implemented in a weekend is described as "a doctoral research project", and then I am accused of "impugning the reader" for describing something as simple _that is extremely simple_, we're done. Consider the bug report closed."
- Programmer drops [refterm](https://github.com/cmuratori/refterm/) four hours later
- Microsoft in shambles
> refterm actually isn't very fast. Despite being several orders of magnitude faster than Windows Terminal, **refterm is largely unoptimized and is much slower than it could be**

> TL;DR: refterm should be thought of as establishing a modern _minimum_ speed at which a reasonable terminal should be expected to perform. It should not be thought of as a maximum to aspire to. If your terminal runs _slower_ than refterm, that is not a good sign.

[Refterm v2 - Resource usage, binary splat, glyph sizing, and more - YouTube](https://www.youtube.com/watch?v=99dKzubvpKE)

[It takes a PhD to develop that](https://news.ycombinator.com/item?id=28743687)

> That sounds like you've never seen performance of a heavily worked-on subsystem increase by 10x because one guy who was good at that kind of stuff spent a day or two focused on the problem.

Microsoft responds

[Extremely slow performance when processing virtual terminal sequences](https://github.com/microsoft/terminal/issues/10462)

Yes, the GPL license is intentional. I'm sure microsoft could hire casey using their billions in revenue, if they so wished. Or just have one of their programmers do their own doctoral research in 4 hours.
### Text rendering is hard

- [Text Rendering Hates You - Faultlore](https://faultlore.com/blah/text-hates-you/)
	- [HarfBuzz text shaping engine](https://github.com/harfbuzz/harfbuzz)
	- [Partial Ligatures](https://robert.ocallahan.org/2006/10/partial-ligatures_24.html)
- [Simpler code is generally faster code](https://news.ycombinator.com/item?id=27775268)
# The Thirteenth

- I read a lot of [Manuel Moreale](https://manuelmoreale.com/)
- I have purchased Reeder 5.
