---
title: It’s Been a Year and georgia.gov Continues to Be Hacked
description: "Illegal drug transactions facilitated through Georgia's employee portal"
date: 2024-04-26
tags:
- civics
- security
in: blog
---

Exactly one year ago, I was searching Google to see what government websites somehow wound up using ChatGPT programmatically:

![[Pasted image 20240426012007.png]]

Lo and behold, one did! It was the state of Georgia!

![[Pasted image 20240426012253.png]]

Now, unfortunately, I do not have screenshots of what the Google results looked like, but `medicicnes` might give you a good idea what the pages were about: They redirected to sites that illegally sold dubious medicine.

![[Pasted image 20240426013140.png]]

![[Pasted image 20240426013437.png]]

I thought this was pretty interesting, so I contacted the New York Times and also fired an email off to the contact link listed on the Georgia website. Both parties ignored me and I forgot about it. Until now.

This time around, the results were much harder to find, as since then a *lot* of government websites have been infiltrated by AI. A little history sleuthing, however, lead me back to the fatal misspelling of medicine that I couldn't quite remember. Are the redirects still up?

![[Pasted image 20240426013643.png]]

Dang.

team.georgia.gov is reportedly *For State of Georgia Employees*. I don't think it's fair to make government employees share their space with hackers. This is a bad look — especially as it's been unpatched for a year now. It's a bad look that my contact attempt was ignored. Step it up, Georgia.

I was curious if I could figure out how this happened. I'm also curious how this ended up in the Google index (as `sitemap.xml` is empty and ahrefs reports zero backlinks). Visiting team.georgia.gov/medicicnes directly shows an Apache 404 page:

![[Pasted image 20240426014630.png]]

It's interesting because every other 404 route just shows an empty page:

![[Pasted image 20240426014705.png]]

You can detect the version of Apache by doing a `HEAD` request. I've done a head request for these two different paths:

![[Pasted image 20240426014954.png]]

This indicates to me that someone with access to Georgia's servers did this on an Apache level, instead of within WordPress. All these software versions are outdated, so it's possible that an attacker did this, I suppose... It's just all a wee bit odd.

Further investigation shows that this page *only* works if the referrer is google:

![[Pasted image 20240426082251.png]]

Which makes this a very deliberate attempt to hide the attack.

*If you are aware of other unpatched government tomfoolery, or have more information on this story, please [reach out](/contact).*