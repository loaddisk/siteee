---
title: A Rough Timeline of Technological Buffoonery in the DOGE Era
in: blog
description: It's barely been a month!
date: 2025-02-24
tags: [politics,civics]
is: letting that sink in
---

In this new administration, the news moves so fast. There are millions of things *more* important than this particular topic, like the impending destruction of national parks and looming fascism, but nevertheless this is my area of expertise, and so I will write about it.

The big claim used in defence of DOGE by Elon Musk is that they are a team of "experts," who know better than the incompetent bureaucrats toiling on legacy systems. Very quickly, however, it becomes apparent that *they* are the incompetent ones. If all you have is a hammer, everything looks like a nail.

When DOGE.gov launched, their homepage displayed the Dogecoin logo. Quickly, potentially with regard to copyright concerns, this was replaced by a new logo:

![[Pasted image 20250220104855.png]]

This logo would last a few short hours, from roughly 7-10PM EST. A close inspection of the logo evidences the use of artificial intelligence, featuring a flag comprised of mangled stars and an inconsistent pattern around the interior of the O. I got to give them credit for this, it was an efficient way to make a logo. Potentially realizing that Trump has [previously](https://reason.com/2024/07/26/trump-calls-for-jailing-flag-burners/) called to imprison those who "do anything to desecrate the American flag," this image was removed as quickly as it came.

## The Goons

The site would spend the next few days in a resting place, displaying a much more subdued golden logo accompanied by the text "The people voted for major reform." While the site remained stagnant, more news about the [people behind](https://www.wired.com/story/elon-musk-government-young-engineers/) the DOGE began emerging. Lots of these young employees have maintained close relationships with Musk, bouncing between his many companies. Many of them have rather impressive resumes. I think it is indisputable that these individuals are bright, though I would additionally venture to categorize them as egotistical and arrogant. 

Of particular note is a 19-year-old [kid named](https://www.wired.com/story/edward-coristine-tesla-sexy-path-networks-doge/) 'Edward Coristine', who went by the moniker 'bigballs' on LinkedIn. While a lot of discussion focused on Edward's age, I find this to be inappropriate. Age has no direct relationship with technological ability. What *is* concerning about bigballs is his muddied past. Reporting from WIRED and [KrebsOnSecurity](https://krebsonsecurity.com/2025/02/teen-on-musks-doge-team-graduated-from-the-com/) show him procuring DDoS-for-hire services, as well as other extremely suspicious activities and work with Russian and Chinese companies.

DOGE Staffer Gavin Kliger wrote on his substack that *Our American Pravda* by Ron Unz was his inspiration for joining. Ron Unz runs *The Unz Review*, a website known for publishing white nationalist and pro-Putin writings.

EXCLUSIVE: The WIRED exposé identified a number of folks working at DOGE, but only focused on a few. One overlooked figure — only mentioned in passing — was 'Ethan Shaotran.' Ethan, while at Harvard, worked on a project called 'Ballotproof' which was designed to detect defects in ballots. As part of the [project](https://box.boehs.org/archive/1740425171.125694/singlefile.html), [code](https://box.boehs.org/archive/1740425171.125694/git/ballotproof/generate.py) for generating [fake](https://box.boehs.org/archive/1740425510.373783/singlefile.html) ballots was written.

![[Pasted image 20250224151910.png]]

Archive.is captures from February 4th show a demonstration video on Devpost.com, along with a write-up:

![[Pasted image 20250224144031.png]]

However, sometime around February 7th, the video[^1] was removed, and the page was [blanked](https://box.boehs.org/archive/1740425171.125647/singlefile.html).

![[Pasted image 20250224144637.png]]

Pratam Soni's description was replaced with 'Worked on the project,' and Ethan's write-up was replaced with the letter 'A.'

I have reached out to Mr. Soni for comment, and will update this post if I receive a response.
## The Website

Sam Curry [discovered](https://x.com/samwcyo/status/1889527715029557607) that DOGE.gov is being run by DOGE staffer Kyle Schutt, CTO of Outburst Data. Outburst Data also developed the website for AMERICA PAC, Elon Musk's controversial Super PAC.

Since the discovery, the DNS records for `doge-25f.outburstapi.com` and `ampac.outburstapi.com` were removed, and the Cloudflare Zone ID was changed to `Eq3GW7G6_BQgeWvh9nuCig`, indicating a switch of accounts. 

Of course, the elephant in the room is the hack, first reported by [404Media](https://www.404media.co/anyone-can-push-updates-to-the-doge-gov-website-2/) on February 14th. An unsecured API endpoint enabled attackers to create their own government agencies on the workforce page.

EXCLUSIVE: The endpoint was patched quickly, but removing the IOCs took longer. The two fake government agencies referenced by news agencies, ID `7cd300eb-cf3f-47f5-90f1-9e66a8bc8d07` and `1`, were removed after a day. These, however, were not the only two. The agency with the ID `undefined` would not be removed until February 20th — 6 days after initial reporting.

![[Pasted image 20250224160601.png]]

Famously, the DOGE site miscounts savings numbers, recording the full amount of cancelled contracts despite the fact that for many, portions of the contract have already been spent. In addition, the website misreported the value of the contracts it cut, in one case recording $8 billion for an $8 million contract. After being called out, the figure was [corrected](https://x.com/DOGE/status/1892318654827524297), however the incorrect number [continued to factor](https://x.com/electricfutures/status/1892432356268560502) into the total savings reported by the agency.

DEI.gov was registered on February 4th, and oscillated between a redirect to Waste.gov and displaying [outlandish claims](https://www.404media.co/dei-waste-gov-doge-list-behind-password/) like budget allocation to a "Malaysian drug-fueled gay sex app." Waste.gov, another domain registered on February 4th, featured a WordPress template, before being password protected.

![[Pasted image 20250224162747.png]]

## The Experts

During a press conference, Elon Musk raised alarm bells about 150-year-olds in the social security database. In response, programmer influencers were quick to claim that `May 20, 1875` is the default date value in COBOL. These claims originated, as far as I can tell, from this post:

![[Pasted image 20250224185201.png]]

COBOL doesn't have a "default date." COBOL doesn't have a date type. And I can't find any spec that defines May 20th, 1875 to be the epoch. Before parading these claims, as reputable outlets like [WIRED](https://www.wired.com/story/elon-musk-doge-social-security-150-year-old-benefits) did, it's worth into if they're true.

Do not, however, be disillusioned. Elon is also wrong. He [swung back](https://x.com/elonmusk/status/1891350795452654076), uploading an image of the buckets that supposedly demonstrated fraud. Millions of people over the age of 140 collecting payments!

But the data doesn't match this. SSA.gov [reports](https://www.ssa.gov/oact/progdata/benefits/ra_age202412.html) only 89106 individuals above the age of 99 receiving payments. The SSA [terminates](https://secure.ssa.gov/poms.nsf/lnx/0202602578) payments to those aged 115 and higher. The screenshot listed 400 million people — more entries than citizens, and 5 times more than the number of recipients listed on [SSA](https://www.ssa.gov/oact/STATS/OASDIbenies.html)'s own website. A 2023 [report](https://oig.ssa.gov/assets/uploads/a-06-21-51022.pdf) found that 98% of those aged 100 and older inside the database received no payments. According to SSA, these entries exist in the database because they would be too costly to remove:

> We found that the possible solutions would have limited or no benefit for the administration of our programs and were too costly to implement.

When Elon ranted about the duplicates, somebody said something rather confusing: "TIL Elon has never used SQL." I have no idea what they meant by that — SSNs *are* unique and indeed they shouldn't be duplicated, but Elon made a fool of himself by batting back, [writing](https://x.com/elonmusk/status/1889062581848944961)

> This retard thinks the government uses SQL

The government uses SQL. SSA uses [DB2](https://oig.ssa.gov/assets/uploads/a-14-09-19097summary.pdf). DB2 is a relational database with a SQL-like interface.

## Conclusion

We are barely a month into this new administration.

[Long Live the Real King](https://www.nytimes.com/2025/02/24/us/politics/musk-trump-toes-video.html)

God speed,

Evan.

[^1]: Uploaded by 'Kenne Brookes.' The only information I can find about him is that he is Stanford '25.