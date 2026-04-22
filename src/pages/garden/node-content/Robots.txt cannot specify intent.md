---
description: The grand game of cat and mouse
---

It's been a little quiet over here. I have some musings type articles I've been working on, but I've been all too consumed with my little project called [Pinefore](https://pinefore.com/). It's not ready yet, but when it is ready I'll have so much to say about it and the issues that surround it.

Today, however, a little page titled [Llms.txt](https://news.ycombinator.com/item?id=41439983) swum onto the home page of hacker news. The intent of llms.txt is to help large language models index your site better. I, however, do not wish to allow LLMs to index my site. I've done my best in the robots.txt, but it has just occurred to me that it is woefully outdated. AI companies really like their user agents.

The original intent of robots.txt as it existed in the 90s was to help curb misbehaving programs that caused undue load on the webmaster's servers. Naturally, these blocks are *targeted* — you wish to stop only one particular robot that is causing you trouble. Ignoring the obvious problem of ignorant bots, this protocol works quite well for its intended use.

Still, the protocol is largely stupid. It relies on the bot operator being willing to identify themselves, and it relies on the operator programming support for robots.txt into their script. Furthermore, it assumes that the script is capable of polling the file frequently enough to notice changes, something that may not happen in the case of a misbehaving script. To alleviate the latter concerns, blocking user agents is more effective.

While all this is true, we've ignored the biggest flaw in robots.txt for the modern age: it completely ignores intent. By this, I mean to say that we rarely come to robots.txt to block *specific* bots, we come to block entire classes of them.

I, for instance, would like to block the