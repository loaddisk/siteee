---
title: Bountysource Stole at Least $21,000 From Open Source Developers
description: This is why people say the open source ecosystem sucks.
in: blog
date: 2024-05-03
tags: ["open-source","muckraking"]
---

I like open source. I like the idea of gifts to the commons. I like the idealism, this naïve belief that if we all do our part, we can make beautiful things together. Unfortunately, I've spent the past few months committed to profiling the open source community for this blog. Now, I know that I was stupid. In our culture, open source does not represent freedom. [It](https://www.huffpost.com/entry/heartbleed-bug_n_5120457) [[Everything I Know About The XZ Backdoor|represents]] [an](https://web.archive.org/web/20161202163921/http://blog.ssh.com/free-can-make-you-bleed) [exploitive](https://nutjs.dev/blog/i-give-up) [relationship](https://github.com/fafhrd91/actix-web-postmortem), [where](https://web.archive.org/web/20210516172305/https:/marak.com/blog/2021-04-25-monetizing-open-source-is-problematic) [wealth](https://web.archive.org/web/20210704022108/https:/github.com/Marak/faker.js/issues/1046) [is](https://gist.github.com/richhickey/1563cddea1002958f96e7ba9519972d9) [brutally](https://staltz.com/software-below-the-poverty-line.html) [extracted](https://twitter.com/FFmpeg/status/1775178803129602500) [from](https://cmustrudel.github.io/papers/osstoxicity22.pdf) [maintainers](https://mikemcquaid.com/open-source-maintainers-owe-you-nothing/) ([I](https://trstringer.com/oss-compensation-broken/) [could](https://www.wired.com/story/open-source-coders-few-tired/) [keep](https://blog.tidelift.com/tidelift-response-to-oncd-rfi) [going](https://stackoverflow.blog/2021/01/07/open-source-has-a-funding-problem/) [forever](https://www.kitze.io/posts/github-stars-wont-pay-your-rent)[).](https://github.com/zloirock/core-js/issues/767) And I can't think of a better example than Bountysource. Why is nobody talking about this?

One of the core issues in open source is that there tends to be immense feelings of entitlement in downstream consumers. They have somehow convinced themselves that just by using your stuff, they deserve support. Obviously, this relationship is utterly broken. Bountysource promised to fix this issue, by enabling users to "fund" issues. Issues with higher funding would be prioritized by maintainers:

![[Pasted image 20240503180509.png]]

And so, the maintainer is empowered to demand compensation for their work, at long last.
## Trouble in paradise 
Bountysource grew and grew, permeating into all corners of open source. A brief survey of GitHub shows that 55,000 issues make reference to it, and the archives show triumphs for projects like Borgbackup, ElementaryOS, Nextcloud, and Nim. Bountysource represented a rising tide, but they could not avoid the allure of wealth.

In 2017, the project was purchased by the cryptocurrency company CanYa, and in 2020 it was sold to "The Blockchain Group". Coincidently, around this time, the Bountysource project announced drastic changes to its terms of service, enabling them to steal unclaimed bounties after two years:

> 2.13 Bounty Time-Out.
> If no Solution is accepted within two years after a Bounty is posted, then the Bounty will be withdrawn and the amount posted for the Bounty will be retained by Bountysource. For Bounties posted before June 30, 2018, the Backer may redeploy their Bounty to a new Issue by contacting support@bountysource.com before July 1, 2020. If the Backer does not redeploy their Bounty by the deadline, the Bounty will be withdrawn and the amount posted for the Bounty will be retained by Bountysource.

[After](https://diziet.dreamwidth.org/5938.html) [backlash](https://blog.elementary.io/goodbye-bountysource-hello-github-sponsors/) the company reversed course, and business continued as usual. There was barely any publicity hit.

While things seemed better, business continued at an agonizingly slow pace. [GitHub issues](https://github.com/bountysource/core/issues/1539) show that at numerous moments in time, payments were left pending for months on end. Some developers claimed that as early as June 2023, their payouts amounting to thousands of dollars went ignored. Soon after, after showing signs of [crisis](https://www.web3isgoinggreat.com/?id=blockchain-group-financial-crisis), the company quietly announced [bankruptcy](https://www.theblockchain-group.com/wp-content/uploads/2023/11/TBG-CP17112023.pdf) in 2023, leaving tens of thousands of dollars left unpaid.
## Casualties

There has been shockingly little discussion of this event. The community quietly accepted their loss, and the voices of developers who lost thousands of dollars were never amplified. This is but [[Everything I Know About The XZ Backdoor|another sorrow of open source]]. It's not unique in any type of way: open source developers were simply exploited once again, as is usual. Their sorrows were not given voice. I still don't have much of a platform. I cannot give these maintainers the attention they deserve. But I need to try. Here are the known casualties of Bountysource:

| Project                                                                                      | Amount        |
| -------------------------------------------------------------------------------------------- | ------------- |
| [NewPipe](https://newpipe.net/blog/pinned/announcement/we-have-lost-access-to-bountysource/) | $6000+        |
| [FreeCAD](https://github.com/bountysource/core/issues/1595#issuecomment-2012741234)          | $4279.10      |
| [Abdel](https://github.com/bountysource/core/issues/1595)                                    | $4000         |
| [Ryan Schultz](https://github.com/bountysource/core/issues/1586#issuecomment-1872555191)     | $3500         |
| [parvit](https://github.com/bountysource/core/issues/1586#issuecomment-1631802785)           | $1100         |
| [Davide Beatrici](https://github.com/mumble-voip/mumble/discussions/5403)                    | $1000+        |
| [abebeos](https://github.com/bountysource/core/issues/1595)                                  | $1000         |
| [abmyii](https://github.com/bountysource/core/issues/1539#issuecomment-881554019)            | $200          |
| [Jaap Marcus](https://github.com/bountysource/core/issues/1591#issuecomment-1637665926)      | $190          |
| [PythonSwiftLink](https://github.com/bountysource/core/issues/1590#issuecomment-1632999178)  | $150          |
| [Thomas Waldmann](https://github.com/bountysource/core/issues/1539#issuecomment-1042480727)  | $144          |
| [Gordon N. Squash](https://github.com/bountysource/core/issues/1591)                         | $139          |
| **Total**                                                                                    | **$21,702.1** |

This only accounts for the developers who had completed their work and were awaiting payment. It is likely that magnitudes more money was held in escrow, which has also been lost. This means that not only were the developers harmed — the few people who found it in their heart to donate were also scammed. Who knows how many more thousand dollars are still missing. For now, the [man](https://twitter.com/xavlat?lang=en) and the [woman](https://twitter.com/liaxalmeida) and their [henchmen](https://www.linkedin.com/company/theblockchain-group/people/) who stole from the FOSS community continue to run free.