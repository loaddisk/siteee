---
title: Lastpass is worse than you think
description: How does it live on?
tags:
- app
- considered harmful
date: 2022-05-12
state: sunset
is: pastlast
in: blog
---

> **[[PenPen]]'s Note:** Since publishing, there has been a series of *further* security issues in lastpass. The point still stands, but this article has currently not been updated to reflect that. It is also, frankly, written poorly.

*For lastpass users in a hurry, here is a TD;LR. [please immediately stop using lastpass](#security).*

[[toc]]

Why would anyone use proprietary [[password manager]]s? Entrusting a black box to your biggest secrets? Password managers know more crap about you then any other entity, likely including your government. Turns out all conspiracy theorists had the right idea, just the wrong target.

Password managers encourage storage of all secrets in a centralized manner.

I have long cautioned against using password managers like Lastpass, 1password, and Dashlane, because these password managers are *closed source*. This means that no one can read the code aside from the developers. A common misconception about closed source software is that closed source software is more secure, because the code can't be edited by anyone. This is incorrect, open source code can only be edited by users permitted to do so, just like closed source software. In this regard, open source is actually *more* secure, because no changes can be made in secret. When a company makes their source code public it means, with a high probability, that they are not hiding anything beneath the depths. In closed source software, the developers could simply add code to steal passwords, and no one would know. Open source also makes it easier for good guys to review the code, making sure there are no issues bad guys can exploit.

Let's pretend I don't know you (If I actually don't, my name is Evan and it's a pleasure to meet you). What if I come to your door one day and tell you I can double the money you give me by next week? You would certainly have many questions. First you might ask how I can do such a thing, and I would give you an answer in earnest (password managers saying they use AES and a trillion iterations of hashing). Next you would still be critical, and ask to see the operation, a request I refuse (closed source password managers). This is assuming you even entertain the idea of giving a stranger money in the first place, a concept you likely reject (giving password managers your passwords). The thing is, This stranger is a perfect metaphor for password managers. Not only do we give the snake oil salesmen our reddit passwords, we give them our banking details, social security numbers, and credit cards, without seeing proof it all works like they say it does.

You are entrusting critical information to a system that no one will show to you, only offer their best explanation without any evidence. You would not do such a thing without knowing the plan for your money to it's fullest, so why would you do something different with your arguably more important passwords?

Just to reiterate, encryption and other security precautions don't matter if a password manager is closed source, because for all we know, it could all be lies. Even if we somehow know for sure that the password manager does properly encrypt on the server, we don't know that the client is hack proof.

I want to note that I am not opposed to all password managers. When compared to reuse, the choice is clear. I myself use bitwarden, which is open source, and has not had any of the issues described below. I would say, however, that I am opposed to *passwords*.

## Lastpass

If a password manager is highly rated and very popular, It's probably a better pick than a small one with less eyes? That's what you might expect from a password manager like lastpass. How could a password manager possibly be so bad at it's job that it fails at... managing passwords?

### Reviews

#### [Investopedia](https://www.investopedia.com/best-password-managers-5080381)

Investopedia wins the Google first place award 🥇, picking LastPass as their number one pick.

#### [PCMag](https://www.pcmag.com/picks/the-best-password-managers)

PCMag ranks second, and for many consumers has become a trusted source on the tech world. Something just feels a little bit sketchy about their unconventional picks.

![[Pasted image 20220509143122.png]]

Zoho? Really?

#### [NYTimes](https://www.nytimes.com/wirecutter/reviews/best-password-managers/) and [Wired](https://www.wired.com/story/best-password-managers/)

Coming in at 3rd place and 5th place in the google wars, are the only two reviews that do not feature glowing reviews for lastpass. NYTimes does not rate it favorably, citing prices, neglecting to mention any security issues. Interesting, wired has zero mentions.

#### The rest

* [CNET](https://www.cnet.com/tech/services-and-software/best-password-manager/), at 4th place, is another trusted news source. It gives lastpass a second place rating
* [Toms guide](https://www.tomsguide.com/us/best-password-managers,review-3785.html) gives lastpass first place
* [Techradar](https://www.techradar.com/best/password-manager) gives lastpass a glowing #2 rating
* [LaptopMag](https://www.laptopmag.com/best-picks/best-password-managers) gives lastpass the honor of number one, also utilizing incredible grammar.
  ![[Pasted image 20220509162709.png]]

---

With all these glowing reviews, it seems reasonable to look no further then lastpass. It averages a rating of `11 (1+4+2+1+2+1)/8=1.375`, after all. Hopefully, you look into it a bit more though.

### Incidents

Lastpass [claims](https://www.lastpass.com/security/what-if-lastpass-gets-hacked) there has been one *security event* in their product. They reassure you that

> no encrypted vault data was compromised

Let's investigate their [security report](https://blog.lastpass.com/2015/06/lastpass-security-notice/) before we put our trust in them. In it they confirm the breach, and tell us "email addresses, password reminders, server per user salts, and authentication hashes were compromised". I suppose their claim that no encrypted data was stolen rings true.

I would not be writing this post if there were not issues with their response though. I, as an educated consumer, wanted to read about how they were attacked and what steps they took to prevent reoccurring attacks. They are very insightful here too, first giving us incoherent marketing speech:

> We make advancements, and the bad guys do, too. The work is never done here at LastPass. It’s constantly evolving, so it’s important to stay ahead of the game. And when we’re put to the test, we can point to what worked in our model, and evaluate how to secure our fortress going forward.

They mention a low and medium impact improvement to security, but they also mention that they have finally added.... Bug bounties? It's incredible that till this point LastPass has not had a bug bounty program. These programs are industry standard, especially in such a high impact application like LastPass.

Additionally, they never detailed how the compromise happened. This is good indication of an embarrassing issue, it's absolutely industry standard to release this information in the post mortem. The last three paragraphs are more marketing bullshit.

> We prioritized disclosing what happened and all of our actions have centered around keeping you and your data secure. Going forward, we don’t want to lose sight of the ever-growing need for password managers like LastPass. Managing strong, complicated, difficult-to-remember passwords is challenging when you also need to use a different password everywhere. For most of us, we simply can’t practice good password security without a safe tool to help. Password managers are the most efficient way to generate strong passwords for every website, remember those passwords, and backup and sync those passwords securely.

Bro, you just got hacked. Shut up for one second.

This would be fine if it was the first or last incident. Despite their aformented marketing claims, they have actually accidentally exposed unencrypted user passwords not one, not two, not even three, four, five, or six times. Depending on how you count, on 6 or 7 unique occasions lastpass has been found to be exposing all user passwords.

What do these exposures mean for the consumer? In each one of the exposures lastpass has failed to prevent unauthorized, automated access through vulnerabilities. They have also lied in marketing pages about the mere existence of such exposures. I expect reading about them will immediately cause you to stop using lastpass.

#### 2014 (One exposure)

[Berkeley reports on a number of password manager vulnerabilities](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-138.pdf "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-138.pdf"). LastPass was not excluded, quite the opposite. Two issues were discovered, one allowing a website to grab the passwords of any other website.

On page 8, it is written:

> Figure 4 illustrates how a malicious web application `evil.com` can steal Alice’s credential for `dropbox.com`. When Alice visits the attacker’s site evil.com and clicks her LastPass bookmarklet, the attacker uses any of a number of hijack techniques [1, 8] ... The downloaded script, which runs on the attacker’s page, includes all the information needed to decrypt credential for `dropbox.com`

LastPass has blogged about it [here](https://blog.lastpass.com/2014/07/a-note-from-lastpass/). They neglected to mention the severity of such an incident. They don't mention it allows an attacker to obtain the password of any website without authorization. Quite the opposite, the only details on this attack provided by lastpass fit inside half a tweet:

> Zhiwei discovered one issue that could be exploited if a LastPass user utilized the bookmarklet on an attacking site

Instead, the blog focuses on a still-critical-but-more-tame issue that allowed the attacker to obtain a list of every website a given user stores in lastpass. They again do not explain what the issue actually is, only explaining why it is unlikely the issue was actually exploited. This is embarrassing, considering they just leaked all the passwords of their users. The focus on the second issue was likely to divert attention away from the huge issue that would enrage consumers.

Amazingly, despite this being the first of many many vulnerabilities in lastpass, things don't get better. [Techcrunch does better reporting of the worst issue a password manager can have then the password manager itself.](https://techcrunch.com/2014/07/11/lastpass-finds-security-holes-in-its-online-password-manager-doesnt-think-anyone-exploited-them/)

#### 2016 (Two exposures)

In 2016 another [two](https://blog.lastpass.com/2016/07/lastpass-security-updates/) vulnerabilities were disclosed.

In the first, Mathias Karlsson discovered [an issue](https://labs.detectify.com/2016/07/27/how-i-made-lastpass-give-me-all-your-passwords/) in LastPass's home made URL parser that allowed him to get a visitor's login to any website.

![[Pasted image 20220509183001.png]]

Again, lastpass neglects to clarify what this vulnerability does. Nowhere in their blog post do they mention the URL parsing bug in question literally exposed every password of their users. Not once. So much for keeping your users informed I guess.

Lastpass awarded Mathias 1000$ for singlehandedly saving their megacorperation and millions of users from every password being exposed and the destruction that would follow. 1000$.

The next vulnerability we know less about. They told us

>  Once there, Ormandy demonstrated that the website could then execute LastPass actions in the background without the user’s knowledge, such as deleting items.

So much for transparency as they claim in "Common Themes" below. Waita beat around the bush! Nice work! Luckily I am crafty and found information for you. [Here ya go!](https://bugs.chromium.org/p/project-zero/issues/detail?id=884) (Hint: they leaked all passwords)

#### 2017 (~~Three~~Four exposures)

Three but really four more bugs!

> To exploit the reported vulnerabilities, an attacker would first lure a user to a malicious website. Once on a malicious website, Tavis demonstrated how an attacker could make calls into LastPass APIs, or in some cases run arbitrary code, while appearing as a trusted party. Doing so would allow the attacker to potentially retrieve and expose information from the LastPass account, such as user’s login credentials.

Finally! Lastpass [tells](https://blog.lastpass.com/2017/03/important-security-updates-for-our-users/) us up front that they exposed user credentials again! This was a really juicy post. First,

> Based on our URL parsing process in Firefox 3.3.2, malicious websites could spoof legitimate websites and fool the LastPass add-on into providing user site credentials.

This might seem like the same bug as the same bug in 2016, and it really is. They just... forgot to fix it? [Tavis looks at Mathias's work](https://bugs.chromium.org/p/project-zero/issues/detail?id=1188) and discovers it never got fixed. Oh well, things happen right? But wait, in the same article... Another credential exposure? Surely not... Uhh...

> An issue with the architecture for a consumer onboarding feature affected clients on which that code appeared (Chrome, Firefox, Edge). A malicious website could trick LastPass by masking as a trusted party and steal site credentials.

Mhmm. So in the same blog post, we learn details of two unique instances, both discovered by the same researcher, both exposing the credentials of every password stored in lastpass. Fun right? As always, here is the relevant [issue](https://bugs.chromium.org/p/project-zero/issues/detail?id=1209). The same blog post sneaks in another similar issue disclosed the day after.

>Later on March 21st, another report came in related to Firefox 4.1.35a. In fact, this vulnerability is largely the same as the one reported the prior day, and affecting the 4.x Firefox addon. While this issue would have been addressed by our full fix to follow our workaround

You can read about this one [here](https://bugs.chromium.org/p/project-zero/issues/detail?id=1217)

But, 2-3 bugs was not enough for Tavis. He is too cool. [Lol](https://blog.lastpass.com/2017/03/security-update-for-the-lastpass-extension/). At least it seems lastpass is finally getting their shit together. For all reports so far in 2017, they actually were honest and detailed what the attack allows to happen, unlike their past years. This report was no different, and no less alarming then the rest. Two interesting snippets:

> This was a client-side vulnerability in the LastPass browser extensions and could be exploited to steal data and manipulate the LastPass extension

>  it could have been manipulated to allow remote code execution (RCE) on the extension.


On the relevant [issue](https://bugs.chromium.org/p/project-zero/issues/detail?id=1225) some helpful advice is given:

> NOTE: Please ***do not*** release a patch until you're confident all cases have been fixed. Releasing a patch that just fixes the single case that I've made a demo for will make it very easy to identify the vulnerability and for someone to simply exploit any of the hundreds of others of cases where you've made this mistake. Please communicate with me on your plan to release fixes so that we can make sure the process goes smoothly. We will not release vulnerability details until *either* a patch is available or 90 days expire.

I suspect this comment was quite pointed.

#### 2019 (One exposure)

Just when you think you are safe. BAM! Tavis at it again with his 5th! discovery of a vulnerability in lastpass that allows him to grab unexpecting visitor's credentials. [The Register](https://www.theregister.com/2019/09/16/lastpass_vulnerability/) explains this new vulnerability perfectly.

> How much pass could LastPass pass if LastPass passed last pass

Like. Perfectly.

> LastPass has fixed a security bug that potentially allowed malicious websites to obtain the username and passphrase inserted by the password manager on the previously visited site.
>
> In other words, if you visited website A, and LastPass automatically injected a username and password for you to log in, and then you surfed to website B, the latter could access the password issued to website A

Not as horrible as the last leakages, but step up your damn game for god's sake!

- [issue](https://bugs.chromium.org/p/project-zero/issues/detail?id=1930)
- [lastpass coping](https://blog.lastpass.com/2019/09/lastpass-bug-reported-resolved/)

Unfortunately, lastpass got sloppy since 2017, and their blog posts are yet again unclear and do not explain that THEY EXPOSED YOUR DAMN CREDENTIALS AGAIN!

### Common Themes

By now, I expect you have begun to notice a common theme. Since 2014, they have accidentally leaked every password they have been entrusted with, on average once a year.

Plus, even *after* each hack, lastpass has demonstrated a consistent theme of incompetency, writing significantly subpar blog posts/post mortems *after* each time they just exposed every damn credential. Most of the time, they did not even *mention* in their incident reports that any credentials were potentially exposed. Does this seem like a company you can trust with your credit card information?

You would expect a password manager to be good at it's SINGLE JOB, but here we are at 7 breaches still twiddling our thumbs. After the first fuckup, a password manager should go out of business, yet here we are, with lastpass still being the number one recommended password manager by journals.

> Door to door get rich quick schemes are no different, maybe even worse. Not only do we give the snake oil salesmen our reddit passwords, we give them our banking details, social security numbers, and credit cards, without seeing proof it all works like they say it does.
>
> You are entrusting critical information to a system that no one will show to you, only offer their best explanation without any evidence. You would not do such a thing without knowing the plan for your money to it's fullest, so why would you do something different with your arguably more important passwords?

Might I remind you lastpass is closed source. Do you still trust, without being able to read the code they write, that they are keeping your passwords safe? Have you stopped to check the history of your password manager? Do I need to reiterate that:

LAST. PASS. HAS. EXPOSED. EVERY. CREDENTIAL. THEY. STORE. 7. TIMES.

- Every Password
- Every Email
- Every Username
- Every Credit Card
- Every Social Security Number

BUT THEY ARE STILL.... STILL! THE NUMBER ONE RECOMMENDED. PASSWORD. MANAGER.

#### "Regular Audits"

Audits are one way companies ensure their apps are secure. They pay companies to *try* to hack them. Audits are not a replacement for open source, and open source is not a replacement for audits. Password managers like Bitwarden and 1Password post their audits publicly. [LastPass claims](https://www.lastpass.com/security/zero-knowledge-security)

> **Regular audits & pen tests**
> We engage trusted, world-class, third-party security firms to conduct routine audits and testing of the LastPass service and infrastructure.

But their audits are nowhere to be found.

Also on this page, lastpass writes the following

> **Transparent incident response**
> Our team reacts swiftly to reports of bugs or vulnerabilities and communicates transparently with our community.

But as we have seen this is rarely the case. In all but the indents in 2017, lastpass did not even *mention* in their incident reports that credentials were exposed. Not a peep.

## The Others

I picked on lastpass quite a bit, but they are blatantly the worst. I thought it would be fitting to recommend a password manager, but i'm not qualified. I wanted the input of the most qualified person I could think of. Our good friend Tavis has some input, but first he raises excellent points.

It's important to know that for as much encryption the password manager promises, it's impossible to be secure. You have to consider the most simple attack of all: just adding a tiny update to maliciously access passwords. As much as apps try to secure the server with encryption, malicious updates will always be the biggest, unfixable problem.

> These claims are all nonsense. An attacker (or malicious insider) in control of the vendor’s network can change the code that is served to your browser, and that code can obviously access your passwords. This isn’t farfetched, altering the content of websites (i.e. [defacement](http://www.zone-h.org/)) is so common that it’s practically a sport.
>
> The reality is that you have to trust your vendor to maintain their infrastructure and keep it safe. The existence of encryption (“bank grade” or not) does not alter this.

Even if there is good intent, bugs are easy to make and hard to find, as lastpass perfectly illustrated. No password manager is excluded from this, it seems as if each and every one has had some issue (just lastpass has more issues then all of the rest combined)

As for his [advice](https://lock.cmpxchg8b.com/passmgrs.html)?

> Conceptually, what could be simpler than a password manager? It’s just a trivial key-value store. In fact, the simplest implementations are usually great. Good examples of simple and safe password managers are [keepass](https://keepass.info/) and [keepassx](https://www.keepassx.org/), or even [pass](https://www.passwordstore.org/) if you’re a nerd.
>
> Things start to go wrong when you want integration with other applications, or when you want data synchronized by an untrusted intermediary. There are safe ways to achieve this, but the allure of recurring subscription fees has attracted businesses to this space with varying degrees of competence. I’m generally skeptical of these online subscription password managers, and that’s going to be the focus of the rest of this article.

> If you want to use an online password manager, I would recommend using the one already built into your browser. They provide the same functionality, and can sidestep these fundamental problems with extensions.

Personally, I like the convenience of password manager extensions. At some point, you need to have trust. Knowing the risks that historically have been masked is only useful if you use it to make educated decisions for yourself. I have done extensive research into the password manager bitwarden and have decided it's the best option for me.

## Conclusion

In Tavis's post, he writes

> [Telling people to "use a password manager" is like] telling someone with a headache to pop any pills they find in the medicine cabinet. Maybe they’ll get lucky and find an aspirin, or maybe they won’t and you’ll be making a call to poison control.

And this really sums it up. Reading listicals, listening to friends, picking a password manager without doing research is just taking a gamble. A huge one. It's on you to stay educated and safe.

That being said it's unbelievable that lastpass has gotten away with lying for 10 years. It's unbelievable people continue to use them. It's unbelievable journalists have failed the creed blatantly without fail. Not one journal, even ones that don't recommend lastpass, has researched into the security risks of what they preach. Frankly, it's likely lastpass paid them off. I suppose it's good evidence of this whole ordeal. People just can't be trusted.

Your information in password managers is your most important asset. Protect it.

I have reached out to Investopedia, PCMag, CNET, Tom's Guide, Techradar, Laptop Mag, HowToGeek, [Macworld](https://www.macworld.com/article/668938/best-password-managers-for-mac.html), [PCWorld](https://www.pcworld.com/article/407092/best-password-managers-reviews-and-buying-advice.html), and LastPass for comment. If one responds, this post will be updated.
