---
title: "US-EAST-1: All for one, one for all"
date: 2025-10-22
is: "swordfighting"
in: blog
description: Nobody ever gets fired for deploying to US-EAST-1
---

> [[PenPen]]'s Note: This is a synthesis of accounts of the handling of the recent AWS outage at various companies, with fictional glue. Each event is based on a real experience of someone, but not the same person.

At 12:11 AM, Amazon begins investigating a service outage in the US-EAST-1 region.

Engineers on-call at ACME sleep, while their backend withers and dies, taking the frontend down with it. Sales drop to zero. Nobody is paged, nobody is awakened until one engineer's [heated mattress](https://x.com/rauchg/status/1980316868184535292) loses connection and goes haywire. Only then does anybody notice anything is wrong.

The engineer springs into action. Very quickly, they realize that US-EAST-1 is down. Thank fuck, the engineer thinks to themself. Nothing I can do. For the next day, at 45 minute intervals, the engineer will reload the AWS status page, see no change, and march on over to their own status page to write "We are continuing to monitor the situation," before resuming the sword fight.

![[Pasted image 20251021105147.png]]

But why was nobody pinged? Well, their monitoring provider was inadequately prepared for a sudden influx of logs.

![[Pasted image 20251021110402.png]]

Furthermore, no logs were available from AWS:

![[Pasted image 20251021110554.png]]

Furthermore, even if the logs were appearing on time or at all, nobody would've been notified due to issues with notification integrations.

![[Pasted image 20251021110842.png]]

The engineer's boss does wonder if, as a quick fix, they could migrate to US-EAST-2. The engineers had designed their application in such a way that this could be done. Unfortunately, AWS Identity Centre can only be hosted in one region, and [their instance was hosted in US-EAST-1](https://news.ycombinator.com/item?id=45643848). Thus, no engineers could access the control panel.

So, the boss suggests they reach out to AWS support. But AWS support also, evidently, runs on US-EAST-1.

![[Pasted image 20251021112358.png]]

All that's left to do is wait. By the end of the day, the systems are all back. Stakeholders and engineers sit down to discuss what had just happened. Everyone is exhausted. Despite the fact that one outage took down not only their product, but every other vendor's product, leaving them stranded, nobody is angry. They decide to change nothing.

They recall the last time their product went down. That time, the incident was isolated and internal—a misconfiguration pushed to production by an engineer. That time, the customers were angry. The company had to publish a postmortem, and fight to assure the customers that they could still be trusted. This time, the support lines are eerily quiet. When the servers go up, sales surge, rapidly recouping the loss. Just as the employees at ACME weren't upset regarding the failure of their vendors, ACME's clients did not care, as everything they needed was down and ACME's product was just a drop in the bucket.

If ACME migrated to US-EAST-2, this outage would not have impacted them. But, sooner or later, US-EAST-2 will go down while US-EAST-1 stays up. Then, by virtue of being virtually the only US-EAST-2 user, the outage will be their fault in the user's eyes. They won't have the luxury of making wide sweeping gestures, shrugging their shoulders, and changing nothing.

Uptime isn't important, being able to blame someone else is what's important. If everyone goes down, it is an act of god, not some architectural failure you must address. Thus, in a quest for deflectable responsibility, best use US-EAST-1. All for one, one for all.