---
title: The fascinating security model of dark web marketplaces
is: diving in deep
description: Captchas, Monero, Scams and absolutely no JavaScript
in: blog
sec: unlisted
date: 2024-11-30
tags:
- security
- civics
---

With Trump pledging to commute the sentence of Silk Road founder, then winning the election, the dark web, among many other things, has been on my mind.

Since the fall of the [Silk Road](https://gwern.net/silk-road), the demand for illicit substances has not disappeared, and that isn't shocking. The very first transaction on the internet was weed, [sold between university students over ARPANET](https://www.theguardian.com/science/2013/apr/19/online-high-net-drugs-deal). Many marketplaces have appeared since the fall of the Silk Road, and many have since fallen, due to one of three reasons: Clean exits, law enforcement, and exit scams. The average lifespan of these marketplaces is only eight months. Currently, the most trusted marketplace has been chugging along since May 2020. This long run, and the market's success in the community, appear to be a product of it's apparently exceptional operational security. The boom and bust cycle has triggered a sort of evolution, with each new marketplace learning from the flaws of the previous one. This market is the culmination of this evolution — at least for now. The intent of this article is to shed light on its security model as a technical curiosity, without romanticizing or otherwise commenting on the products it sells.

> [[PenPen]]'s Note: Evan has censored the URLs and name of this site. He does not believe the site is *hard* to find — a sufficiently motivated user could find it within minutes. Regardless, such is convention, and there is little point in deviating from this convention on a technical blog.

## The Website

It starts with JavaScript, or, I suppose, the lack thereof. The community has become rather insistent that the language is to be avoided at all costs, and for good reason. By nature, it is vulnerability prone, and it provides many avenues for fingerprinting, despite Tor’s best efforts to prevent it. The website must be fully featured without a single line of JavaScript, which leads to some creative programming.

![[Pasted image 20241114164937.png]]

The first evidence of this reality is the Captcha system. On the server, an image is generated. Your objective is to "click into the circle with a cut"

![[Pasted image 20241114092451.png]]

You also start the beginning of a very common theme — the operators keep driving home anti-phishing messaging. The nature of the onion router is that URLs are not recognizable like "google.com" might be.

By completing the captcha, you are *forced* to read and think critically about the safety of where you've wound up.

Of course, this does not solve the URL recognizability problem, which is exasperated further by the amount of mirrors they operate. The solution to this problem is to publish a mirror list, signed with a PGP key, below the captcha:

![[Pasted image 20241114112829.png]]

Other website operators repost this key when linking to these mirrors:

![[Pasted image 20241114113418.png]]

Assuming this always traces back to the same key, you can know that the link you're clicking is legit.

Continuing to the login page, the sign-in button is replaced with another captcha and verification step:

![[Pasted image 20241114113717.png]]

You may be wondering *how* such a captcha works without JavaScript. How does it know where I clicked? The answer is a little known browser feature: [`<input type="image">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image). This image supplements the `<input type="submit">` element — clicking the image submits the form. When the form is submitted, two query parameters are included: `?x=32&y=46`. Using CSRF tokens, the server knows where it put your open circle. When the form is submitted, it knows if you know that as well.

Other sites implement the Captcha in other creative ways. One uses an `<input type="range">` to position an image to the correct place:

![[Pasted image 20241130145344.png]]

The most impressive one uses a series of checkboxes positioned in the exact same place. When a checkbox is checked, that box is hidden and the next one is shown. Based on what box is checked, images are repositioned with CSS:

![[Pasted image 20241130150248.png]]

You then type the parts of the URL that have stars covering them in the scrambled image — another anti-phishing strategy.

I think these captchas are really cool. Likely less accessible, probably less effective in preventing bots, and yet a staggering example of the cool stuff we can accomplish [*without* JavaScript](https://github.com/kkuchta/css-only-chat) , and I think we could learn from these anti-phishing tactics. Throughout this article, we will see more examples of JavaScript-less pseudo-interactivity, stay tuned.

Anyway, back to authentication. The next step is PGP based 2FA. When you create an account, you upload a public key that it uses to encrypt messages. You then decrypt the message with your private key:

![[Pasted image 20241114121231.png]]

The market uses PGP to encrypt communications, and once again this two-factor authentication has two functionalities: Like most 2FA mechanisms, it ensures only the private key holder can log in, but it *also* ensures that the users know how to properly use the GPG suite.

At long last, you are given one final page:

![[Pasted image 20241114121823.png]]

This page, explicitly labelled "anti-phishing" follows the same pattern of forcing the user to read and think about the text before they log in. You need to look for the box with your username, and read the boxes telling you how to find a list of legitimate mirrors.

After we're logged in, in settings there are "private mirrors":

![[Pasted image 20241114123309.png]]

So you have a set of mirrors for the clearnet — users before they make an account. Because these are public, these URLs are the most risky. Then, you give a group of authenticated users their own mirror URL, a pool. Because users can only see the URL that they were assigned, that protects all the other private URLs. After a user makes a transaction, their pool is upgraded, and so on, so on. This, I suppose, is a technique known as [Defense In Depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)).
## The Wallet

The site uses an integrated wallet for purchases:

![[Pasted image 20241114124310.png]]

Integrated wallets feel risky, and indeed it is. The integrated wallet acts as an escrow, but the developers could seize the wallet in an exit scam:

![[Pasted image 20241114163113.png]]

Cryptocurrencies have a feature called "multisig", where the funds are stored in your wallet until 2/3 parties accept the transaction (where the parties are you, the vendor, and the market). This allows an exit-scam proof escrow, but it is poorly supported, and this marketplace doesn't support it as well.

Allegedly, there have been some precautions taken with the escrow feature. Apparently, you can deposit funds 3 hours *after* you place the order and the price is finalized, and vendors can automatically withdraw. These features mean the escrow wallet can be fairly thin. I do not intend on verifying either of these assertions by placing an order.

When placing an order, you communicate your shipping details to the vendor, encrypted using their public key. If you fail to do this encryption, the market does it for you with their own key. Relying on this is what is called, universally, a bad idea, as the market could choose to retain the information and use it for blackmail, which has happened in other exit scams.

It may come as a surprise that it is encouraged to use your real name for shipping. This is because it tends to raise eyebrows when the name on the other end of a package changes, increasing the likelihood of customs using probable cause to search the mail, and then issuing a ["Love Letter"](https://www.reddit.com/r/royalmail/comments/1fiwwiw/nice_love_letter_from_royal_mail/).

Unlike early markets, this market does not use Bitcoin. Instead, it is built around Monero, a particularly controversial coin due to its strong anonymity. To quote Wikipedia, "Observers cannot decipher addresses trading Monero, transaction amounts, address balances, or transaction histories". For the mathematically inclined, ["Zero to Monero"](https://www.getmonero.org/library/Zero-to-Monero-2-0-0.pdf) is a really incredible read on how basic mathematics can be used to produce technically amazing results.

> [[PenPen]]'s Note: In general, Evan finds crypto*graphy* to be a cool topic he knows next to nothing about, but crypto*currency* to be boring and often annoying.

## The Operators

A lot of these dark web marketplaces come out of Russia as a product of their low interest in prosecuting cybercrime, but this does not appear to be the case for this market. The English is *so close* to almost perfect, and there is very little Russian activity on the forums. It is, however, of European origin — the site launched there initially before expanding worldwide. Some information can be gleaned from [an early interview](https://web.archive.org/web/20240713190941/https://tarnkappe.info/artikel/interviews/archetyp-neuer-darknet-drogenshop-will-an-die-spitze-interview-89885.html) done between the founder and a German crypto blog.

The site is laser focused on drugs — that is the only product offered, whereas other marketplaces offer things like stolen credit cards and fake passports. In the interview, the admin claims that a certain substance turned his life around, and that he now believes drugs should be legalized, which is why he made the site.

> Anyone who seriously wants to tell me that fraud is a good thing is doing mental gymnastics at the highest level. I will do my best to split the scene, because criminal scum don't belong in the drug scene. Drugs should be legalized.

> In short: I miss the exchange on equal terms, which is about growing together. That's why, with \[website\], I'm now taking up the humanist-liberal idea that was behind Silk Road back then and trying to bring values back into the scene. Together we can campaign for decriminalization and legalization.

> After all, it's not just about the next high in life. \[website], should become the \[ideal\] of a marketplace.

Acknowledging that choosing a German website for the interview could be a deliberate choice for obscurity, I believe Occam's razor applies here. Germany is known for being one of the most drug friendly places in Europe, 60% of Germans speak fluent English, and the author talks about their fondness for the [DiDW](https://de.wikipedia.org/wiki/Deutschland_im_Deep_Web) forums, a now defunct forum and market that served Germany exclusively. Cursory investigations appear to show that this figure *did* indeed spend some time on DiDW, they are not just making it up.

*Update: One counterpoint is the use of the decimal point instead of the decimal comma to separate numbers*

They brag about hacking another market, 'Pax Romana', to demonstrate their security ability, then refunding all the customers as a show of goodwill. I investigated their comments on a dark forum, and what I can glean is as follows:

> They allowed people to upload files directly to their server, this made it possible to upload a remote shell, with this shell someone was able to directly access the server. Basically they gave full access away for free.

> I sold the PaxRomana source code to another market for 5000€ and to one other person for 500€ making 5500€ in XMR from it, I think the market admin (who by now is busted) put the source [onto GitHub](https://github.com/baltiqa/paxromana) as they did not like each other. Without hacking PaxRomana I would likely never had the funds to start my market, isn't that crazy? I felt like the happiest man back then because I was so fucking poor, hacking that shit market really changed my life. Thinking back to it right now makes me incredible happy again, thanks for reminding me. :)

After that, it's a little fuzzy. Some combination of the following things happened: Pax Romana recovered, then they exit scammed, or maybe there was a bug that allowed double withdrawals driving the admin into debt, then 5 or so other markets with similar code appeared and then exit scammed, and maybe they were by the same people or maybe people who bought the code. But in any case, it created a good window for this website's admin.

Reading comments like [this](http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion/post/6f34a6cdd3736c14b91c) (onion link) almost makes it seem like the admins genuinely believe their liberalism message. "We do nothing wrong! We don't care if we're arrested! Go after the real bad guys!", and maybe they actually do believe this! (of course, with room for some profit). The admin *identity* opsec feels poor, even if the site is secure. I think the owner may fancy themselves as a martyr, imagining that when they fall the public will come to their defense like what happened for Snowden and Ulbricht. If this is true, they can be *both* taking a solid approach to preserving the privacy of their users, while failing to protect the privacy of themselves. This is made even more believable by comments like this:

> I want to express that I have taken up the humanistic-liberal idea of ​​Silk Road, but I want to live it out differently than Ross Ulbricht did back then. I want to clearly distance myself from Ross Ulbricht's actions (murder orders). I don't idealize Silk Road or Ross Ulbricht, but the idea behind it.

And yet, it is hard to feel like they're the good guys when they are out hacking other markets just to prove they're good at security. But maybe that's just how the game is played in the dark. Dog eat dog world out there.
## The Operation

But anyway, I'm not a psychologist or anything. All I can say with some authority is that it's made... startlingly well. The admin seems interested in staying on top of security, making comments about how companies are trying to trace Monero, stating things like "I plan every step so that my anonymity will not only exist today, but also in 10 years", and then *demonstrating it* with stuff like a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) that prevents JavaScript from executing.

Beyond security, I wanted to take this opportunity to talk about the interesting design decisions that arise from the nature of this service. I believe the service is running on Ruby from the various morsels of information I've picked up during this investigation. I *do not* believe it is using Ruby on Rails. It is styled with tailwind. I would be willing to believe that the different URLs are actually hosted in different places — the site was experiencing a DDoS attack for a portion of this investigation, and some URLs remained up. Furthermore, I have attempted to use the 2-step verification from one mirror on a different one, and this failed.

Sidebar navigation was shockingly responsive for a site without JavaScript, so I delved into the CSS.

![[Pasted image 20241129152501.png]]

The sidebar is implemented as a series of radio buttons. With CSS, the active button is selected, and then the *adjacent sibling* is unhidden.

Popup windows are implemented using ids:

![[Pasted image 20241129153142.png]]

In the footer, they have random quotes:

> “Only those who have the patience to do simple things perfectly will acquire the skill to do difficult things easily.” – Friedrich Schiller
> “The truth is generally seen, rarely heard.” – Baltasar Gracian
> “Think of all the beauty still left around you and be happy.” – Anne Frank
> “Conquer yourself rather than the world.” – Rene Descartes
> “One should use common words to say uncommon things.” – Arthur Schopenhauer
> “Hang on to your youthful enthusiasms -- you’ll be able to use them better when you’re older.” – Seneca
> “I would rather be a devil in alliance with truth, than an angel in alliance with falsehood.” – Ludwig Feuerbach
> “Every man is guilty of all the good he did not do.” – Voltaire
> “The busier we are, the more acutely we feel that we live, the more conscious we are of life.” – Immanuel Kant
> “The individual has always had to struggle to keep from being overwhelmed by the tribe. If you try it, you will be lonely often, and sometimes frightened. But no price is too high to pay for the privilege of owning yourself.” – Friedrich Nietzsche
> “Reason has always existed, but not always in a reasonable form.” – Karl Marx
> “People demand freedom of speech as a compensation for the freedom of thought which they seldom use.” – Søren Kierkegaard
> “In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule.” – Friedrich Nietzsche
> “I have always thought the actions of men the best interpreters of their thoughts.” – John Locke
> “I love those who yearn for the impossible.” – Johann Wolfgang von Goethe

A lot of Germans in that list ^^, what do I know. Anyway, with all that inspiration out of the way, I hope you feel a sudden urge to do good, which feels like closure.

Until next time,
Evan ([Bluesky](https://bsky.app/profile/boehs.org), [Mastodon](https://social.coop/@eb))
