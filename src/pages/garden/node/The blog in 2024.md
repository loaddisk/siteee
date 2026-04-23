---
title: How did the blog do in 2024?
tags: [meta]
in: blog
date: 2025-04-04
description: Virality, Traffic Patterns, Economics, and Copyright
sec: unlisted
---

```
~1m views
~$850 donations
~$60 expenses*

3 job offers, 1 job accepted
4 ad offers, 0 ads placed

~+1300 mastodon followers (1.6k total)
~+320 RSS subscribers
+266 bluesky followers

3 quotes in major publications, dozens of links from them
1 blog post made with specific intent to critique my spelling
Countless life lessons
One hell of a good time

* $12 domain, $5 cf hosting, $40 analytics
```

That's it. That's the post. Oh, you're still here. Ok. Brace yourself for a fat dose of yappenese.
## Woah we big time now

Until March*ish*, nobody looked at this site. I've had it for a couple of years. I wrote into the void. Then, in March, two things happened. I went a little viral, and then I went *really viral*. I think the first time was mostly circumstance, but it’s hard to say how much thereafter is skill, and how much is luck.

I do not use a publishing platform, nor mailing lists. This means organic growth is slow, and largely relies on social media. I got my start on Mastodon, with about 150 followers, and random toots did sorta well and slowly gained me followers, and then somebody linked to one of my articles and their post did quite well. That, I imagine, gave my own XZ post quite the kick. That article ended the year at over 700k views.

Now I have a little more "clout." Not a huge amount — I don't have anything close to the name recognition of Xe Iaso, Julia Evans	or Molly White. But now I know that when I put something out, *somebody* will read it. That is a really cosy feeling.

I don't think growth is the end all goal here. In fact, I think a lot about *if* growth is something to be desired. Is it healthy to want more and more people to read what I write, or should I just take each person as a win? I've been told that I should pick one particular domain to write about, and perhaps if I did, growth would be easier. If I did this, however, I would be sacrificing quality and personality. It would no longer be mine. This is decidedly not healthy. This is my blog and I'll write about what I please.
### Traffic Analysis

I've documented places that my post appeared [[Backlinks|here]]. There's a lot of them, like the NYT and NIST.gov. That's pretty crazy to me.

65% of my traffic is of unknown origin. Some portion of this is from the Fediverse — instances are unlikely to want to expose their relative users like that. Another known source of these links is the New York Times.

A decent chunk of traffic comes from Hacker News, which I have a mixed relationship with. It provides a lot of bursty traffic, but the content doesn't perform that well. Often times it makes a fleeting appearance on "Top," before disappearing a second later: 

::: details Graphs

This pattern can be seen on almost every story submitted from my site — either by me or someone else.

![[Pasted image 20240504123459.png]]

![[Pasted image 20240504123716.png]]
(Three other stories exhibited similar patterns, but social protocols only retains logs for 30 days)

:::

Every post I made started with very few upvotes. Around 2-3 hours, suddenly they reached the front page. One factor I can imagine causing this is a user resubmitting a link, automatically triggering an upvote (this is why I suspect some blogs do really, really well consistently on the site).

Posts stay for a couple of hours, and then suddenly disappear. To my understanding, there are three factors that have cause these drops: user flags, moderator action, and the flamewar detector (comments/upvotes). In the case of my [[LLMs Destroying Internet|anti-LLM post]], the flamewar detector seems probable. My [[Truth Social]] post was met with both flags and upvotes due to the politics of such things, and flags carry a lot of weight. In my XZ post, I suspect moderators removed it and merged it into the main thread. I have no idea what caused the unnatural drop for the rest, like my [[Bountysource]] one. Hacker News has no transparency.

Lobste.rs & Lemmy rankings feel a lot more natural, but they don't have much bearing on traffic (despite the fact that they yield similar discussion levels). A lot of the stuff I write and read is considered off-topic on Lobste.rs.
## Cold hard cash

For the first time, I didn't lose money on this thing.

Service pricing really isn't built for non-commercial blogs. If you get a million views in a year, *surely* you're doing well? Whoever set the price of analytics providers sure thinks so. Plausible would've wanted *$490*. Umami's cloud would've costed $200. I can't afford that. I use a fork of Umami, hosted on a $3 Hetzner VPS. When I was getting *a lot* of traffic, I briefly upgraded the instance. In total, I spent $42 at Hetzner this year.

The domain costs $12 per year.
### There is no newsletter

There is an Atom feed, but there is no newsletter. The Atom feed currently isn't delivering the *contents* of posts, only the titles and other metadata. I *want* to deliver content, but getting it to render correctly is difficult and I haven't tackled it yet. Recently, as a workaround, I added `<content src="..."/>` tags to my Atom feed. The spec says the following:

```
atom:content MAY have a "src" attribute, whose value MUST be an IRI reference [RFC3987]. If the "src" attribute is present, atom:content MUST be empty.  Atom Processors MAY use the IRI to retrieve the content and MAY choose to ignore remote content or to present it in a different manner than local content.
```

Unfortunately, this feature isn't well known, so no feed readers implement it.

I was told a lot of people would rather a newsletter, so I looked into that. Turns out that it is really expensive if you don't go through Substack. If I had 300 readers on Buttondown, that would be costing *me* $90 per year. Not as ugly as analytics, but that is still a huge increase in spend. Buttondown has a feature where you can charge for a newsletter. If you set the charge at $1/m or something, that offsets the cost, but if you don't get 10 paying users, you're losing money. 10 paying users doesn't *seem* like a high bar to clear, but I'm not sure if it would happen.
### Donations

I made around $850 in donations last year. That is ∞% more than I made two years ago. Almost all of them were "one time donations." I put "one time" in quotes because LiberaPay is a reoccurring payment platform, but PayPal requires manual renewal, and I think that is better.

> For the type of works I link my LiberaPay to, I don't have nor want tiers and rewards associated with them, as that forms a social contract where I am expected to perform more labour. I only want money from people who are thankful for what I've already provided, and I only want what they're willing to provide. I suspect microscopic rewards like discord roles, a newsletter, etc. _do_ increase revenue, but then you're managing a community. I encountered issues with Stripe so that's been disabled, PayPal only, but PayPal doesn't auto-renew. Again, I suspect I lost a considerable amount of money because of this. But again, taking money from people who wouldn't explicitly click 'renew' when they get the email doesn't feel right.

$850 is nothing to laugh at, but it isn't immense. I don't see a world in which writing becomes a job. Four months into 2025, I've made $60, enough to offset my hosting costs this year. I'm very, very thankful for my donors.

I used to just keep a donate button in the footer; see if you can spot it:

![[Pasted image 20250404153413.png]]

I've since *also* added a longer appeal at the foot of my articles.

![[Pasted image 20250404153337.png]]

This wasn't the original variant. Here was the first:

![[Pasted image 20240402165501.png]]

I removed the goal because it was arbitrary. Removing it decreased CTR, but I really want to keep the site as calm as possible.

A final thing I've experimented with is corporate sponsorships, á la Daring Fireball. A small little blurb at the top of posts. I set the CPM *very* high, deliberately. The point isn't for companies to get an ROI, rather for a founder who likes my work to justify spend on the corporate card.[^1] A couple reached out, but I've never placed an ad. I need to like the company, and I have some specific terms that are dealbreakers. If I ever sell out I must do it right.

The blog has also provided me with a wealth of personal and professional opportunities. The value of these are hard to quantify, but they're worth a lot.
## Changing the licence

All content, unless otherwise noted, is now licensed under the Creative Commons Attribution-ShareAlike 4.0 International Licence, abbreviated as `CC BY-SA 4.0`. This is the same licence that is used by Wikipedia.

::: details The Deed

This is a human-readable summary of (and not a substitute for) the licence.
### You are free to:

- **Share**—copy and redistribute the material in any medium or format for any purpose, even commercially.
* **Adapt**—remix, transform, and build upon the material, for any purpose, even commercially.

The licensor cannot revoke these freedoms as long as you follow the licence terms.
### Under the following terms:

- **Attribution**—You must give [appropriate credit](https://creativecommons.org/licenses/by/4.0/deed.en#ref-appropriate-credit"), provide a link to the licence, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the [licensor](https://creativecommons.org/licenses/by/4.0/deed.en#ref-indicate-changes) endorses you or your use.
- **Share Alike**—If you remix, transform, or build upon the material, you must distribute your contributions under the same licence as the original.
- **No additional restrictions**—You may not apply legal terms or [technological measures](https://creativecommons.org/licenses/by/4.0/deed.en#ref-technological-measures) that legally restrict others from doing anything the licence permits.
### Notices:

You do not have to comply with the licence for elements of the material in the public domain or where your use is permitted by an applicable [exception or limitation](https://creativecommons.org/licenses/by/4.0/deed.en#ref-exception-or-limitation).

No warranties are given. The licence may not give you all of the permissions necessary for your intended use. For example, other rights such as [publicity, privacy, or moral rights](https://creativecommons.org/licenses/by/4.0/deed.en#ref-publicity-privacy-or-moral-rights) may limit how you use the material.

This deed highlights only some of the key features and terms of the actual licence. It is not a licence and has no legal value. You should carefully review all of the terms and conditions of the actual licence before using the licensed material.

:::

What follows is not legal advice. Instead, it is the rationale and interpretations that lead to this change.

Previously, no licence was used for content on the page. When a work has no licence, it is under exclusive copyright, which should prevent others from reproducing, distributing, and displaying it, unless as allowed by fair use.

> Under the fair use doctrine of the U.S. copyright statute, it is permissible to use limited portions of a work including quotes, for purposes such as commentary, criticism, news reporting, and scholarly reports.

Choosing not to licence my work was deliberate. I wished to allow others to use my work in ways that create value for all. I did *not* want to allow others to exploit my personal work for their own gain. No license is a bad licence, but that can be a good thing. [Case Duckworth of funputer.biz](https://funputer.biz/licenses.html) writes the following:

> I propose that new projects choose a licence from what I call the "Poison Pill" class. These are licences that are so nonsensical that any entity with an actual legal department won't use them out of terror; however, normal, every day people have no such strict adherence to legalese and can enjoy them as the art they are in themselves.

For the purposes of allowing ordinary people to use my content, the lack of a licence has been fine. Major publications have linked to my work. Blog posts have been made for the [purpose of critiquing my grammar](https://languagelog.ldc.upenn.edu/nll/?p=63268). People have [built-upon](https://jasminchen.dev/articles/2024/analysing_the_truthsocial_source_code/) my work, taking it in new directions I did not go.

All of this, I wish to allow. I didn't use a licence, because the work I love is made by ordinary people who do not care about its omission, and surely corporations, with their fancy lawyers, will be scared away by the ambiguity. 

Did you catch my error? I was wrong to assume that corporations and the machines they program [would care](https://arstechnica.com/tech-policy/2025/02/meta-torrented-over-81-7tb-of-pirated-books-to-train-ai-authors-say/) about copyright. On corporate blogs, my coverage of the [[Everything I Know About The XZ Backdoor|XZ Backdoor]] was ripped off. They copied and pasted my original research, changed a few words, and passed it off as their own.

![[Pasted image 20250404111147.png]]

In minutes, I can find many pages on various corporate security blogs that blatantly violate the fair use doctrine without crediting me. Furthermore, despite blocking AI scrapers in robots.txt and the Cloudflare WAF, my content continues to be relentlessly ingested. 

![[Pasted image 20250404111345.png]]

A real licence won't change any of this. It will continue to be completely ineffective, unless there is real shift in society. One thing that could cause that is enforcement.

I don't know where I stand on copyright. When looking at cases like Aaron Schwartz, I find myself thinking we'd be better off if it didn't exist, but as a copyright holder myself, I'd like to exercise it. Undoubtably, as it stands, it is completely broken, fraught with unilateral enforcement. Copyright is a weapon wielded by large corporations against hapless independents. As long as it exists, might as well fight back.

So, by changing the licence, I get my own little weapon. Instead of needing to lawyer about what the lack of a licence may imply, I can look at a work and *know* if it is compliant. What I do with that knowledge is a different story. Most likely, most often, nothing. For better or for worse, this blog is a hobby project. While its intermittent successes have provided a wealth of opportunity, the theft of content has little bearing on my livelihood, so long as digital content remains naturally fungible, and my site remains the canonical reference. One area I *am* watching is class actions against LLM creators. I'm all for increased access to knowledge, but that's not what LLM companies are doing. They're profiteering and pillaging, incessantly consuming with no regard for creators (at this point, only 1/10th of requests come from JavaScript enabled browsers. We do not need this many scrapers).

Anyway, all of this is a long way to say "I changed the licence & I'm still bitter about LLMs."

## Other housekeeping

The visual identity of the site hasn't changed a lot, it has just been refined.

1. The font has been changed from Spectral to Crimson Pro. Crimson Pro is a *lot* better. Spectral is all out of wack with regard to letter spacing and kerning. I considered Alegreya, [Crimson Pro](https://groups.google.com/g/googlefonts-discuss/c/lZGJqeigS3I), and Source Serif. Crimson Pro does a nice job of maintaining character while being legible.
2. Charts are now generated at build time, using data and source code that is stored in version control. Config as Code, baby!
3. Codeblocks now look pretty
4. Backend improvements, small CSS changes, and a couple Easter eggs.

## Conclusion

Thanks for being here! ~~Big~~ small, manageable things coming ~~soon~~ when I feel like <3.

[^1]: If this sounds implausible, it is. Still, worth keeping as an option... The US government accepts donations.