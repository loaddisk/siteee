---
title: "(Almost) A Victim Of The Cloud: Scaling Boehs.org"
description: "How much did a million visitors cost?"
in: blog (draft)
tags:
- work in public
- analytics
---

As far as I know, my website has never exceeded 10k visitors in a month (I had analytics for the first year, then I deleted them, and now they're back). Within the past 30 days, however, I've accumulated 700k visits. I've run a regression and done a bit of calculus on the data, and I expect to reach 1 million. The cost of serving this traffic was low, but not zero. It could have been a little higher. A few people have asked about the architecture of this site, so I'll take this as an opportunity to explain that as well.

This site is *mostly* static, powered using 11ty. When I update an article, I push to a git repository, and CI rebuilds the site and deploys it. I'm considering switching to something more dynamic, as this is tedious.

Cloudflare hosts the static files for free, and performs a number of additional operations on HTML & XML files. Specifically:

1. The *is* in the header is randomly changed
2. On the home page, a language for the hello is randomly selected
3. For Japanese visitors, my header is presented in katakana
4. In chrome, my website uses SPA navigation, and workers facilitate the loading of new content.
5. Logging RSS feed hits

Each one of these operations incurs a very, very tiny fee. You are allocated 100,000 "serverless" hits per day for free, and you can pay $5 a month to turn this into 10M a month, plus 30 cents per million additional hits. This was the first cost — the $5.

In addition, I host analytics. These analytics were hosted on railway, which allocates me $5 of docker container credits a month. Previously, my usage was well within that $5 allocation, but 1gb of ram costs $10 a month and my Postgres database and Next.js app (not my choice) was rapidly going over this. This is a screenshot of the memory of the Postgres container alone. The Next.js container and the CPU for both is billed separately. 

![[Pasted image 20240402143026.png]]
(the dips are me restarting the server)

I had no idea what was causing this apparent memory leak, but I knew I was immensely uncomfortable with this arrangement for the following reasons:

1. I would be charged X arbitrary dollars at the end of the month, without knowing the sum beforehand
2. I could limit my usage, but if I went over said limit it would be killed.
3. I had no capacity to SSH into the server and look into what was causing such growth
4. Modifying the docker compose file was nigh impossible

When I realized my bill was going to be at least $15, I decided to pull the plug on managed docker. I switched to Hentzer, and provisioned a server with 8gb RAM, 4 vCPU, and 80gb of SSD for $6. *Had railway been allowed to change me for this equivalent usage, it would have costed $200*.

I was beginning to suspect there was an issue with railway that was causing the RAM to be misreported (or that Postgres was being overzealous with the caching because it *thought* it could), but I had no way to debug the usage prior, and given the whole pitch is to effortlessly scale, if I didn't find out it would be too late.

When I switched to Hetzner, I saw Railway's usage reports were not a fluke. In this graph, you can see the CPU being hammered until a sudden falloff. This, of course, is the best type of graph.

![[Pasted image 20240402144210.png]]

How did I do it?

I SSHed into the server, and I opened `htop`. Immediately, it dawned on me:

![[Pasted image 20240402144504.png]]

What could be causing Postgres to run 10 select queries per second? I wasn't selecting anything – it's analytics – I'm *inserting*. More importantly, what sort of select query could be using so much CPU?

![[Pasted image 20240402144704.png]]

Oh. I know. Running 10 `count(*)` queries per second on 500k rows could be doing that. Now, I had 4 options:

1. I could modify the schema to implement denormalization
2. I could implement caching
3. I could disable this feature
4. I could ignore the problem

I felt empowered to do 4 on this new server with finite resources, but I didn't feel comfortable with how slow it was. I decided to slap Redis in front of the specific query that was running so much, with a 60 second TTL. Immediately, my usage dropped significantly, to the point I was able to downscale my server to the $3.5 tier (Hetzner charges by the hour, so I barely paid for the higher tier).

In total, handling this amount of usage costed me $12. I was considering going back to railway after I identified the problem, but I've learned that running your own server is half the fun, and I don't want to worry about usage.

*Despite being lighter than 98% of websites and hosting on renewables, handling 1 million visitors took the same amount of energy required to drive an electric car 175 miles (or to fly a plane 1 minute)*