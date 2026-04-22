---
description: RSS Analytics! RSSLytics!!!
in: blog
tags:
- rss
- analytics
date: 2024-03-25
---

Yes, I know, RSS day was last week. Unfortunately, the blog post was not ready last week, was it? Here it is *now*. It's RSS day when I say it is. Anyway. Recently, the internet was blessed with [RsS iS dEaD LOL](https://rss-is-dead.lol/). The point? To prove that RSS is not dead, by showing all the sites that still use it. My question is a little different. I want to know if *my* RSS is dead. I want to know all the *users* that still use it. I happen to run Cloudflare workers on almost all the pages on my site, so I simply enabled it for routes ending in `.xml`. I also configured a database using D1 which will store the user agents requesting these pages. Unfortunately, it's not so simple. There's a lot of noise, and popular RSS readers like Feedbin will just combine requests into one. Luckily, some are kind enough to tell you about it in the user agent:

<details>
<summary> User Agent Table </summary>

| Reader Name                          | User Agent                                                                                                         | Reports Users? | Selfhostable? |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | -------------- | ------------- |
| Feedbin                              | Feedbin feed-id:xxxxxxx - xxx subscribers                                                                          | ✅              | ❌             |
| Feedly                               | Feedly/1.0 (+http://www.feedly.com/fetcher.html; xxx subscribers; like FeedFetcher-Google)                         | ✅              | ❌             |
| NewsBlur                             | NewsBlur Feed Fetcher - xxx subscribers                                                                            | ✅              | ❌             |
| Miniflux                             | Mozilla/5.0 (compatible; Miniflux/version; +https://miniflux.app)                                                  | ❌              | ✅             |
| [bazqux](https://bazqux.com/fetcher) | Mozilla/5.0 (compatible; BazQux/2.4; +https://bazqux.com/fetcher; xxx subscribers)                                 | ✅              | ❌             |
| TinyTinyRSS                          | Tiny Tiny RSS/version (https://tt-rss.org/)                                                                        | ❌              | ✅             |
| NetNewsWire                          | Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; de-de) AppleWebKit/531.22.7 (KHTML, like Gecko) NetNewsWire/xxxx | ❌              | ❔             |
| Fraidycat                            | None?                                                                                                              |                | ❔             |
| FreshRSS                             | FreshRSS/version (OS; https://freshrss.org)                                                                        | ❌              | ✅             |
| theoldreader.com                     | Mozilla/5.0 (compatible; theoldreader.com; xxx subscribers; feed-id=xxxx)                                          | ✅              | ❌             |
| Blogtrotter                          | Blogtrottr/2.0                                                                                                     | ❌              | ❌             |

</details>

This table doesn't have every single reader I've encountered, but it served it's purpose. For the most part, it looks like hosted RSS readers report subscribers pretty consistently, and selfhosted RSS readers do not report subscribers, so it looks like we can have a table schema like

```ts
interface LogEntry {
	id: Generated<number>;
	date: timestamp;
	// See below
	readerId: string;
	ip: string;
	feedUrl: string;
	feedId?: string;
	subscriberCount?: number;
	readerName?: string;
	readerVersion?: string;
	userAgent: string;
}
```

To compute the amount of subscribers our feed has, we just want to count the unique items in our logs per day, and then multiply the logs by the number of subscribers where appropriate. To compute the unique ID, I say we do `readerName + feedUrl + feedId` if there's a count of subscribers (expected to be one distinct entity per user agent), and `readerName + feedUrl + ip + version` if there isn't (each IP *should* be a different entity, but there is such thing as shared hosts. Hopefully, the version varies between each installation in this case).

In terms of the actual code, well it's not too complicated. You can find it [here](https://github.com/boehs/rsslytics/blob/main/index.ts), if you want. I seriously considered one incredibly terrifying Regex but decided against it. You are safe, for now. In the future, I want some cool data visualization and stuff, but for now, you'll need to make due with a table:

::: details Count for the 26th (before XZ)

| subscriberCount | readerName     |
| --------------- | -------------- |
| 5               | feedbin        |
| 4               | netnewswire    |
| 1               | newsblur       |
| ?               | feedmail.org   |
| 5               | feedly         |
| 6               | feeder         |
| 2               | nextcloud-news |
| 2               | freshrss       |
| 4               | inoreader      |
| ?               | rss parrot     |
| ?               | blogtrottr     |
| 5               | bazqux         |
| 5               | reeder         |
| 4               | miniflux       |
| =~40            |                |
This data was collected over a period of about ~~7~~ 24 hours, which, I theorize, should be enough to get a sense of it. I would have liked to see the delta between *before* this happened, and after:

![[Pasted image 20240325102354.png]]

I bet I did miss a few running locally on people's devices that aren't on right now. I'd wager it's really sitting around 50 right now.

:::

| subscriberCount | readerName    |
| --------------- | ------------- |
| ~2              | akregator     |
| 2               | bazqux        |
| 2               | commafeed     |
| 11              | feedbin       |
| 26              | feedly        |
| ~7              | freshrss      |
| 20              | inoreader     |
| ~7              | liferea       |
| ~7              | miniflux      |
| 4               | newsboat      |
| ~7              | reeder        |
| ~7              | tiny tiny rss |
| ~20+            | misc          |
| =~140           |               |

Some of these are hard to judge, especially the ones that run locally on people's devices as IPs change. I try to judge from the version numbers, but that's not perfect either, and a couple hosted RSS readers don't report counts. Plus, there are a bunch of nondescript Firefox agents that I suspect are either Fraidycat or Thunderbird's doing. A couple other interesting things is that by far, the most enthusiastic reader is Feedbin (25 minute intervals), closely matched by Feeder for Android.

Also, there's this interesting log (or rather, series of logs at absurd intervals) from `FriendlyCrawler`.  [Alex Kunz](https://imho.alex-kunz.com/2024/01/25/an-update-on-friendly-crawler/) recently went on a crusade about it, and concluded that it is being used to train LLMs. This is *not* a good bot. It assets itself as friendly, which should immediately raise flags regarding its modesty, and perhaps it's honesty. In addition, it does not sufficiently identify itself, as there is no page with information on the company running it. I'm not sure why Cloudflare isn't blocking it, but in general [I try to avoid](https://boehs.org/robots.txt) allowing companies to steal my writing and profit off it without so much as attribution. In the future, I'd quite like to write about how LLMs could be on the verge of killing the internet. Stay tuned for that.

Finally, completely unrelated and a little less negative, I just wanted to say it's awesome how diverse the "RSS Reader Industry" is! It's super cool to see an even spread of readers across a large variety of providers.

But anyway, to the 50 of you who will see this now, I just want to say thank you from the bottom of my heart for reading, and thank you for supporting a web that's a little less corporate.
## Beat Me To It
- [Looking at RSS User-Agents](https://www.lesswrong.com/posts/djn3nJnnHYX7tReFa/looking-at-rss-user-agents)
- [Estimating the number of your RSS subscribers](https://darekkay.com/blog/rss-subscriber-count/)
