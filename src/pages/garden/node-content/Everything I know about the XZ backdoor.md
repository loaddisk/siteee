---
state: evergreen
date: 2024-03-29
description: "Please note: This is being updated in real-time. The intent is to make sense of lots of simultaneous discoveries"
tags:
- open-source
in: blog
structuredData:
  type: NewsArticle
---

*This publication was last updated at 12:49 PM EST on April 8th*

Recently, a backdoor was discovered in XZ, a popular library for lossless data compression. Initial research efforts were predominantly concentrated on unpacking the well-disguised attack vector, while the social aspects of the attack received only murmurings. To investigate this attack, I never read a line of code. Instead, I spent dozens of hours pouring over hundreds of discussion threads and mailing lists. I've concluded that while the events that unfolded are undoubtedly a tragedy, it was one of our own making — one of an ugly reality that quietly plays out every day. Our attacker was not naïve. They meticulously examined the culture of open source and then pounced on its norms, twisting them strategically to their benefit. If we continue to focus purely on technicalities, nothing will ever change. This story will play out time and time again, like it already has for decades. We must stop focusing on fuzzing and static analysis and instead turn our attention to the human costs of open source. We must learn. With this in mind, I present a timeline of the attack — one from a new perspective that's too often ignored.
### 2021

JiaT75 (Jia Tan) creates their GitHub account.

The first commits they make are not to xz, but they are deeply suspicious. Specifically, they open a PR in libarchive: [Added error text to warning when untaring with bsdtar](https://github.com/libarchive/libarchive/pull/1609). This commit does a little more than it says. It replaces `safe_fprint` with an unsafe variant, potentially introducing another vulnerability. The code was merged without any discussion, and ~~[lives on to this day](https://github.com/libarchive/libarchive/blob/master/tar/read.c#L374-L375)~~ ([patched](https://github.com/libarchive/libarchive/pull/2101)).
### 2022

In April 2022, Jia Tan submitted a patch via a mailing list. The contents of the patch are not relevant, but the events that follow are. A new persona — *Jigar Kumar* — enters, and begins [pressuring](https://www.mail-archive.com/xz-devel@tukaani.org/msg00565.html) for this patch to be merged.

Soon after, *Jigar Kumar* [begins](https://www.mail-archive.com/xz-devel@tukaani.org/msg00566.html) pressuring *Lasse Collin* to add another maintainer to XZ. In the fallout, there is much to learn about mental health in open source.

Three days after the emails pressuring *Lasse Collin* to add another maintainer, JiaT75 makes their first commit to xz: [Tests: Created tests for hardware functions.](https://git.tukaani.org/?p=xz.git;a=commitdiff;h=aa75c5563a760aea3aa23d997d519e702e82726b). Since this commit, they become a regular contributor to xz (they are currently the second most active). It's unclear exactly when they became trusted in this repository.

*Jigar Kumar* is [never seen again](https://www.mail-archive.com/search?l=xz-devel@tukaani.org&q=Kumar&x=0&y=0). Another account — [Dennis Ens](https://www.mail-archive.com/search?l=xz-devel@tukaani.org&q=from:%22Dennis+Ens%22) also participates in pressure, with a similar name+number formatted email. This account is also never seen outside of xz discussion, and neither have any associated accounts that have been discovered.

{{ embedMastodon "https://mastodon.social/@glyph/112180922900094371/embed" }}

### 2023

JiaT75 merges their first commit [on Jan 7, 2023](https://github.com/tukaani-project/xz/pull/7)[^1], which gives us a good indication of when they fully gain trust.

In March, the primary contact email in Google's oss-fuzz is [updated](https://github.com/JiaT75/oss-fuzz/commit/6403e93344476972e908ce17e8244f5c2b957dfd) to be Jia's, instead of *Lasse Collin*.

Testing infrastructure that will be used in this exploit is committed. Despite *Lasse Collin* being attributed as the author for this, *Jia Tan* committed it, and it was originally written by *Hans Jansen* in June:

- Commit: [liblzma: Add ifunc implementation to crc64\_fast.c](https://git.tukaani.org/?p=xz.git;a=commitdiff;h=ee44863ae88e377a5df10db007ba9bfadde3d314)
- PR: [Replaced crc64\_fast constructor with ifunc by hansjans162](https://github.com/tukaani-project/xz/pull/53)

*Hans Jansen*'s account was seemingly made specifically to create this pull request. There is very little activity before and after. They will later push for the compromised version of XZ to be included in Debian.

In July, [a PR](https://github.com/google/oss-fuzz/pull/10667) was opened in oss-fuzz to disable ifunc for fuzzing builds, due to issues introduced by the changes above. This appears to be deliberate to mask the malicious changes that will be introduced soon. Also, JiaT75 opened an [issue](https://github.com/llvm/llvm-project/issues/63957) about a warning in clang that, while indeed incorrect, drew attention to ifuncs.
### 2024

A pull request for Google's [oss-fuzz is opened](https://github.com/google/oss-fuzz/pull/11587) that changes the URL for the project from tukaani.org/xz/ to xz.tukaani.org/xz-utils/. tukaani.org is hosted at `5.44.245.25` in Finland, at [this](https://www.zoner.fi/) hosting company. The `xz` subdomain, meanwhile, points to GitHub pages. This furthers the amount of control Jia has over the project.

A commit containing the final steps required to execute this backdoor is added to the repository:

- [Tests: Add a few test files](https://git.tukaani.org/?p=xz.git;a=commitdiff;h=cf44e4b7f5dfdbf8c78aef377c10f71e274f63c0)
- [Tests: Update two test files](https://git.tukaani.org/?p=xz.git;a=commitdiff;h=6e636819e8f070330d835fce46289a3ff72a7b89)

#### The discovery

An email is sent to the oss-security mailing list: [backdoor in upstream xz/liblzma leading to ssh server compromise](https://www.openwall.com/lists/oss-security/2024/03/29/4), announcing this discovery, and doing it's best to explain the exploit chain.

{{ embedMastodon "https://mastodon.social/@AndresFreundTec/112180406142695845" }}

A [gist](https://gist.github.com/thesamesam/223949d5a074ebc3dce9ee78baad9e27) has been published with a great high-level technical overview and a "what you need to know"

In addition to the gist and the email above, several analysis attempts have begun emerging:

- [xz/liblzma: Bash-stage Obfuscation Explained](https://gynvael.coldwind.pl/?lang=en&id=782#stage2-ext)
- ["It's RCE, not auth bypass"](https://bsky.app/profile/filippo.abyssdomain.expert/post/3kowjkx2njy2b)
- [\[WIP\] XZ Backdoor Analysis and symbol mapping](https://gist.github.com/smx-smx/a6112d54777845d389bd7126d6e9f504)
- [Infographic](https://infosec.exchange/@fr0gger/112189232773640259)
- [xzbot: notes, honeypot, and exploit demo for the xz backdoor](https://github.com/amlweems/xzbot)
- [research!rsc: The xz attack shell script](https://research.swtch.com/xz-script)

#### A sudden push for inclusion

A request for the vulnerable version to be included in Debian is opened by Hans:

- [#1067708 - xz-utils: New upstream version available](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=1067708)

This request was opened the [same week](https://salsa.debian.org/hjansen) Hans' Debian GitLab account was created. The account created a few similar "update" requests in various low-traffic repositories to build credibility, after asking for this one.

Several other, suspicious, anonymous name+number accounts with little former activity also push for its inclusion, including *misoeater91* and *krygorin4545*. *krygorin4545*'s PGP key was made 2 days before joining the discussion.

> Also seeing this bug. Extra valgrind output causes some failed tests for me. Looks like the new version will resolve it. Would like this new version so I can continue work.

> I noticed this last week and almost made a Valgrind bug. Glad to see it being fixed.
> Thanks Hans!

The Valgrind bugs mentioned were *introduced* by this malicious injection, as noted in the email to OSS-Security:

> Subsequently the injected code (more about that below) caused valgrind errors and crashes in some configurations, due to the stack layout differing from what the backdoor was expecting.  These issues were attempted to be worked around in 5.6.1:

A [pull request](https://github.com/jamespfennell/xz/pull/2) to a go library by a 1Password employee is opened asking to upgrade the library to the vulnerable version, however, it was all unfortunate timing. 1Password reached out by email referring me to this [comment](https://github.com/jamespfennell/xz/pull/2#issuecomment-2027836356), and everything seems to check out.

A Fedora contributor [states](https://news.ycombinator.com/item?id=39866275) that *Jia* was pushing for its inclusion in Fedora as it contains "great new features"

*Jia Tan* also [attempted](https://bugs.launchpad.net/ubuntu/+source/xz-utils/+bug/2059417) to get it into Ubuntu days before the beta freeze.

A few hours after all this came out, GitHub suspended JiaT75's account. Thanks? They also banned the repository, meaning people can no longer audit the changes made to it without resorting to mirrors. Immensely helpful, GitHub. They also [suspended](https://github.com/JiaT75?tab=following) *Lasse Collin*'s account, which is completely disgraceful.

Lasse has begun reverting changes introduced by Jia, [including](https://git.tukaani.org/?p=xz.git;a=commitdiff;h=f9cf4c05edd14dedfe63833f8ccbe41b55823b00) one that [added](https://git.tukaani.org/?p=xz.git;a=commitdiff;h=328c52da8a2bbb81307644efdb58db2c422d9ba7) a sneaky period to disable the sandbox. They also have published a FAQ that begins to explain the situation: [XZ Utils backdoor](https://tukaani.org/xz-backdoor/)
### OSINT

Various people have reached out to me regarding discoveries about the identity of Jia. Some of this has been incorporated in the timeline, but other stuff is "timeless" so I'm putting it here:
#### IRC

I received an email that clarified a few points and provided new insight into the situation.

"Jia Tan" was present on the \#tukaani IRC channel on Libera.Chat. A /whois revealed their connecting IP and activity on March 29th.

```
[libera] -!- jiatan [~jiatan@185.128.24.163]
[libera] -!-  was      : Jia Tan
[libera] -!-  hostname : 185.128.24.163
[libera] -!-  account  : jiatan
[libera] -!-  server   : tungsten.libera.chat [Fri Mar 29 14:47:40 2024]
[libera] -!- End of WHOWAS
```

Running a Nmap on the IP shows a lot of open ports, which probably indicates a proxy, hosting provider, or something of the sort. The IP is from Singapore.

Further research shows that this IP belongs to Witopia VPN, so it's not entirely indicative of a region. Given the timezone, however, I feel like proximity becomes plausible.
#### Important notes on LinkedIn

I have received a few emails alerting me to a LinkedIn of somebody named *Jia Tan*[^2]. Their bio boasts of *large-scale vulnerability management*. They claim to live in California. Is this our man? The commits on JiaT75's GitHub are set to +0800, which would not indicate presence in California. UTC-0800 would be California. Most of the commits [were made](https://play.clickhouse.com/play?user=play#U0VMRUNUIHRvSG91cihjcmVhdGVkX2F0KSBBUyBob3VyLCBjb3VudCgqKSBGUk9NIGdpdGh1Yl9ldmVudHMgV0hFUkUgYWN0b3JfbG9naW49J0ppYVQ3NScgR1JPVVAgQlkgaG91ciBPUkRFUiBCWSBob3Vy) between UTC 12-17, which is awfully early for California. In my opinion, there is no sufficient evidence that the LinkedIn being discussed is our man. I think identity theft is more likely, but I am of course open to more evidence.

Apr 7 Update: Subsequently, I've received a lot of people sending me other LinkedIn accounts, theorizing about what his name could mean, etc., but I don't think a bad actor would use their real name.
#### Discoveries in the Git logs
I received an email from [Minhu Wang](https://github.com/minhuw) who investigated the Git log, and found one instance where Jia's username was different:

```bash
$ git shortlog --summary --numbered --email | grep jiat0218@gmail.com
273 Jia Tan <jiat0218@gmail.com>
2 jiat75 <jiat0218@gmail.com>
1 Jia Cheong Tan <jiat0218@gmail.com>
```

They found this particularly interesting as `Cheong` is new information

Furthermore, an [independent analysis](https://rheaeve.substack.com/p/xz-backdoor-times-damned-times-and) of commit timings concludes that the perpetrator worked "Office Hours" in a UTC+02/03 timezone. It's particularly notable that they worked through the Lunar New Year, and did not work on some notable Eastern European holidays, including Christmas and New Year. I have, however, been presented with a differing view, which you can read [here](https://lunduke.locals.com/post/5467061/xz-backdoor-i-did-a-more-thorough-analysis-and-i-changed-my-mind-again-specifically-i-compar).

[Ry Jones](https://github.com/ryjones) used gharchive to extract Jia's entire git activity, and he uploaded it to a repository, viewable here: [jiat75-logs](https://github.com/ryjones/jiat75-logs). Jia's GitHub username previously featured Cheong, but this has since been removed.

[^1]: Thanks @joeyh@hachyderm.io
[^2]: I was also alerted to discussions of this on Gab, which should tell you what you need to know.
