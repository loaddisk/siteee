---
title: "You Have Power: Making Truth Social Comply With The AGPL"
description: "Defending Mastodon from Donald Trump's social media"
date: 2024-04-13
in: blog
tags:
- civics
- muckraking
- open-source
---

A hot minute ago, there was this interesting trend of Republicans being ostracized by mainstream social media, then forming their own. In these places, their version of the truth can proliferate without the moderation they’ve grown to despise. To do this, the conventional strategy is to reskin open-source social media platforms without attribution. There is, of course, a certain irony to the fact that the labor they exploit is frequently performed by liberals, queers, socialists, and other groups they’ve sworn to destroy, but I digress.

Luckily, the platforms they leech off are not entirely defenseless. The code of Mastodon is released under the AGPL, a strict open source license that prevents redistribution without disclosure of derivative source code.  Both gab and Truth Social have been identified as derivative work of Mastodon, and hence both are bound by the provisions of the AGPL. Mastodon has successfully defended its codebase a number of times, including in 2021, when they successfully convinced Truth Social to release its code. Truth Social continued these releases until December 20th, 2022, when the uploads stopped. How embarrassing.

To conduct a request under the AGPL, I need to prove that Truth Social uses AGPL licensed code, and that I have accessed said code. The latter is incredibly easy — the login page fetches `/api/v1/instance`, which is a pretty distinct Mastodon characteristic. Still, what’s to say that they didn’t just do a faithful, clean room implementation of the Mastodon API? The login page source code makes zero reference to ‘Mastodon’, so I was playing with this familiar API looking for a tell.

Yeah, I think I found it.

![[Pasted image 20240411112921.png]]

With this in mind, I set my sights on the legal department. Somehow, I doubted they would reply to me.

![[Pasted image 20240411113030.png]]

I also started poking around on the frontend, which is unambiguously powered by Soapbox, another piece of software licensed under the AGPL.

![[Pasted image 20240411114228.png]]

They also make "open source" releases of Soapbox. I was curious if these releases would be up-to-date (they aren't), but what I found was really quite interesting:

![[Pasted image 20240411115229.png]]

Simply uploading your compiled code and calling it "open source" does *not* count as compliance, even if it was up-to-date.

At this point, the SFC was taking interest. While I have more than enough grounds for the above request, if they don't comply, the next challenge before a public exposé is proving that the *Mastodon* codebase has actually been changed since its last open source release. This, of course, is incredibly plausible, given the frontend code obviously has. But we need proof.

Kindly, I was provided with a Truth Social account (I do not want my phone number on there, in the event that a little birdie gives maia arson crimew another issue of "[the shitposters](https://maia.crimew.gay/posts/meet-the-shitpoasters/)"). I then clicked around, and discovered the following endpoints in a minute:

```
/api/v4/truth/ads?device=desktop
/api/v1/truth/policies/pending
/api/v1/truth/carousels/suggestions
/api/v1/truth/policies/pending
/api/v1/groups/tags
```

Unsurprisingly, Mastodon does not have an ads endpoint. It also doesn’t have a v4 API. Neither does the open source release.

The truth directory does exist. It’s at `/app/controllers/api/v1/truth/`. Unfortunately for Trump Media & Technology Group, the files are missing here.

```
$ tree app/controllers/api/v1/truth
app/controllers/api/v1/truth
├── admin
│   └── accounts_controller.rb
├── emails_controller.rb
├── passwords_controller.rb
└── trending
    └── truths_controller.rb
$ rg carousels | wc -l
0
```

Of course, Republicans are categorically inclusive, which is why they bundle code from a *third* fediverse codebase that's AGPL licensed — Pleroma:

![[Pasted image 20240411135059.png]]
(nice localization, btw).

I was, of course, expecting this to go nowhere. I'm just Evan. TMTG could just drag their feet with the hopes that I give up. I, of course, had no intent of doing so — I was very serious when I said that I would take this matter to the press if I had to. Surprisingly, however, this story doesn't end with a public boxing match between me and the 45th president. I decided that I would give them 7 days before escalating. This weekend, I received an email stating that they had complied — 2 days before my internal deadline. I checked the source code and sure enough, it is up-to-date as far as I can tell. I've released it here:

[Automatically updated dump of Truth Social's source code (reskinned Mastodon)](https://github.com/boehs/truthsocial/tree/main)

Once again, this was absolutely not the outcome I expected. Some people might be *disappointed* by it. I might be relieved. After I sent that email, I was a little worried about what I was getting myself into. The *Truth Social Legal Team*. Imagine. But it went my way. The real takeaway is that you do have power. Don't be scared of the big guys. Speak their language, play on their court. Stand up for what you believe in. You can win. Finally, I want to thank Truth Social for complying appropriately. While we couldn't be further apart politically, I respect that they followed the law in a timely manner without a fight.

In terms of the code — I haven't looked at it yet. It's diverged significantly from Mastodon, but the resemblance is there. They've cherry-picked specific commits from upstream, but not all of them. I'm sure there are some [goodies to be found](https://infosec.exchange/@bontchev/112257849039442072). I encourage all of you to go looking for them alongside me, as that is your right. Tell me what you find. God speed.

## External Analysis

- [Analysing the source code of Truth Social](https://jasminchen.dev/2024/analysing-the-source-code-of-truth-social/)