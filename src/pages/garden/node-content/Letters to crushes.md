Many years ago, as a teenager, I stumbled upon a little corner of the internet. This corner was different, somehow a bastion away from the evils of the world wide web that we have all grown accustomed to. In this little corner, the world came together to share the most intimate and heartfelt forms of writing.

| What is the `she:him` ratio of letters?[^1] | Man: He, Him, His | Woman, She, Her, Hers |
| --------------------------------------------- | ----------------- | --------------------- |
| № letters mentioning                            |                   |                       |
| Percent of LGB folk[^2]             | 3.6%              | 3.4%                  |
| Estimated `she:him` ratio         |                   |                       |
[^1]: Look for mentions of pronouns, assume author uses opposite ones. Adjust for % of gay folks
[^2]: https://williamsinstitute.law.ucla.edu/publications/how-many-people-lgbt/

What was this form? Love letters.

## The beginning

To my delight, at time of writing the site continues to stand, with `<x>` letters. Still, it felt as if it was under life support. The last posting by an administrator was in 2015, with links trailing to pages long forgotten. I wanted to extend a hand to the administrator of the website, if they needed it. Unfortunately, I could find little information on him.

In my head, that left me with no choice. I took it upon myself to begin preserving the purest, most precious writings the internet holds. I can't bear to lose them.

This is how I justified scraping the site. This was the first barrier I faced as I began this project. I've never scraped data before, so I suppose on that day I took the first step to becoming a real data scientist[^3]

[^3]: It seems every data scientist I've met has faced the same concerns about the ethicality of how they sourced their content. Because they are "data scientists", it would appear they got over it.

It would be a shame if we lost it.

And so, my data hording career begins. Over the next few months, I would download every letter posted to the site, spanning from the year 2008 to today. I also instructed archive.org to ingest the entirety of the site (the crawler – captained by ArchiveTeam – downloaded 400k pages, before calling it quits). When the site croaks, I will be there to revive it. I think there are more ethical subtexts here worth exploring, I will eventually get to it in a node titled [[Internet Evanescence]]. If you click this link, please know it might exist, or it might not.

| № Letters |
| --------- |
| 1,000,000          |

The site was open source, so I tried reading the source.

[Screenshots of funny code redacted]

Minor issues like [Redacted huge issue] aside, I struggled to understand the code, and gave up pretty quickly. It lacked any pattern, method to madness.

Thankfully, I extracted some goodness, so I am very thankful. Specifically, an endpoint to fetch letters. I assume this endpoint exists for the unfinished app to use, because the site itself is server rendered. Each call to the endpoint returns a JSON array of 10 letters. Interestingly though, I almost didn't end up using this endpoint because each call to it takes an average of `4.24` seconds, presumably because whenever it is called it configures an entirely new [[MySQL]] connector instance.

Yes. You read that correctly.

This means that it is actually faster to fetch & extract data from 10 unique pages with all the HTML cruft than to wait for a JSON API to return a single request.[^multithreading?] It would seem absurd, then, to opt for the slower JSON API...

[^multithreading?]: I tried spinning up multiple workers, but even more perplexing behavior emerged. For some baffling reason, each request is processed synchronously BUT! the server WAITS until *every*. *single*. *sync*. *request* (of 4 seconds each mind you) is processed before issuing a response to every request at once. Ex: 2 workers results in both workers simultaneously receiving a response after 8 seconds

But the JSON API has a secret. It would appear from the API response simply returns the JSON equivalent of a `select *` query. I expect this choice was made because the author wasn't expecting anyone to use or even discover it. Hehe. That was the second lucky break.

![[Pasted image 20220706222520.png]]

\*I have censored one IP as it is in the middle of nowhere

Of course, I filed an issue in the repository right after discovering this absurd API, and to this day I am unsure of if it was right for me to record these IPs[^6]

[^6]: IPs in plural both because there were multiple rows, and because a few rows contained multiple comma sperated IPs. That was a fun error.

With these IPs, I can tell you what countries used the site the most"

| Country | № Letters | Percent |
| ------- | ---------- | ------- |
| 🇺🇸 United States      |            |         |

And here is it on a map

[Map (screenshot, not zoomed in)]

And with these IPs, we can also identify repeat posters.

| № Posts | № IPs | %   |
| ------- | ----- | --- |
| 1        |       |     |

## Fun with lots of data

More then anything, this has been a learning experience for me. I've learned much about SQL, explored my ethics, and, as I will now show off, graphing.

[Cumulative activity graph]
[Weekly activity graph]

But, something I knew I wanted to do is a word cloud. All this crushes stuff brings me back to 3rd grade.

[word cloud]

### Lobst.rs

I must confess I was running out of ideas, until I remembered lobste.rs. The admin lets the community ask him to run SQL queries. Let's borrow some!

### Machine learning

[Random letter]
[Model]
