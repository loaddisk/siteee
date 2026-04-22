---
title: A non exhaustive guide to privacy focused analytics
state: archived
date: 2022-03-22
in: blog
description: A list of "privacy" focused analytics with evaluations for each one
is: always watching 👀
tags: [analytics, cloudflare]
---

[[toc]]

Well, the time has come, my friends. My site has been through a lot. Countless revisions (or rather 7, to date), and with each one a new switch in philosophy each time. Analytics were certainly not excluded from this constant turmoil. I started by using Google Analytics, but that was short lived as I grew to hate the bloat it added to my site (I suppose some things are constant). Next came the first dark age, as I went for a long stretches without any insight. Preceding that dark age was goacess. Access logs served me & my users well because there was no runtime cost, and they were the solution for a long time. Good things must come to an end, and unfortunately one of the costs of my switch to [[Netlify]] included giving up goaccess.

In the following days, I looked into request based solutions like tracking pixels. I _suppose_ I could ping an endpoint monitored by goaccess, but that would be hacky. There were a few tiny tracking pixel examples, but nothing fleshed out aside from the facebook pixel that I refuse to use.

Pixels out of the way, I began to look at using inbuilt analytics. Netlify charged a crazy amount, so that was not going to work. Feeling out of options, I began to consider using the [[cloudflare]] beacon, but that required embedding a script. Wait, what if that's my only option?

## Step one: Make a list

I'm a big fan of [[list based research]], making a list of things and then refining it. So I made a list of _candidates_ (sorry google).

-   https://ackee.electerious.com
-   https://static.cloudflareinsights.com/beacon.min.js
-   https://matomo.org
-   https://metrical.xyz
-   https://plausible.io
-   https://umami.is
-   https://usefathom.com
-   https://www.offen.dev
-   https://simpleanalytics.com

### Step one.two: Make another list

While there were some I quickly eliminated, it's not fair to future me to not include more detailed information about them. Before I write about each service, it's important to understand what I am looking for.

In order of most to least important

1. Open source
2. Script size
3. Features

Note that price is not a factor, I am planning to selfhost.

## Step two: Talking points

What does each service bring to the table?

### Ackee

-   Selfhosting first
-   [[Graphql]] API
-   No "personal information" (os, browser, device type) by default, however can be enabled
-   Users identified with `hash(dailySalt + ip + userAgent + domain)`
    -   But not really. This data is not linked very much to actual data, so most user specific data is missing (like bounce rate). Only user specific data point is unique visitors
        -   https://docs.ackee.electerious.com/#/docs/Anonymization
    -   UI is less advanced too, it's hard to filter data
    -   Missing data like bounce rate
-   `tracker.js` file size via network graph: 8.3kb (https://raw.githubusercontent.com/electerious/Ackee/master/dist/tracker.js)
-   Basic events

### Cloudflare

-   I would prefer not to
-   `beacon.min.js` file size via network graph: 5.2kb
-   Not tons of data
-   10% sampling

### Matomo

-   Open source
-   More of a google analytics platform, super advanced. It's not what I am looking for.
-   Script 22.8kb as reported by plausible (https://plausible.io/lightweight-web-analytics)

### Metrical

-   Still rough around the edges
-   Lots of interesting data + data viz
    -   Sources shows breakdown of referals, organic, and direct
    -   Average time on page
-   Supports filters
-   Pricing style I like (fixed rate, if you are special we can agree on something together)
-   Flagship feature: Respects do not track header
-   `script.js` file size via network graph: 1.9kb (https://cdn.metrical.xyz/script.js)
-   NOT OPEN SOURCE

### Plausible

-   Open source, possible to selfhost
-   `plausible.js` file size via network graph: 1.3kb (https://plausible.io/js/plausible.js)
-   Green energy powered
-   filters, bounce rate, "goals" & events
-   Can support IE
-   Unique user isolated to single day (similar hash system as Ackee)
-   Public stats option
-   Graph only shows unique visitors (why)

### Umami

-   Selfhosting first
-   Filterable
-   Option to respect do not track
-   Events but no goals, Bounce rate
-   1.4kb (https://umami.fuckcloudnative.io/umami.js)
-   Supports IE out of the box
-   Public stats option

### Fathom

-   Partly OSS, selfhost option is limited in features
-   Slightly better UX than plausible
    -   Can use graph to see many data points
-   Less degrees of control than plausible (plausible lets you narrow down, for instance by google search term)
-   `script.js` is 2.5kb via network graph (https://cdn.usefathom.com/script.js)

### Offen

-   Selfhosting first
-   Very interesting, OPT IN, NOT OUT
-   Users get dashboard showing all the details collected on them, and a way to delete it
-   Unlike plausible, tracking across many days
    -   Counts page depth, Unique sessions, Page load time (in contrast to pluasible)
-   `script.js` is 5kb via network graph (https://offen.offen.dev/script.js)

### Simple analytics

-   Closed source
-   Flagship feature: Track tweets
-   Tracking pixel as scriptless fallback
-   Very limited otherwise
-   `latest.js` is 4.2kb via network graph (https://scripts.simpleanalyticscdn.com/latest.js)

### Shynet

DO NOT USE DO NOT USE DO NOT USE (see step 5)

-   Selfhosting first
-   Tracks sessions+hits/session instead of unique visitors+hits/unique visitor
-   Tracking pixel as primary feature
-   Can respect DNT headers
-   Unminified + large comment `page.js` is 1.1kb (https://raw.githubusercontent.com/milesmcc/shynet/master/shynet/analytics/templates/analytics/scripts/page.js)
    -   Cool ideas about showing source by default
-   Worried about long time support
-   Only docker
-   Lacks events

## Step three: Eliminate round one

Some services are very obviously not the right choice for me.

-   Matomo
    -   Too complex
-   Fathom
    -   Closed Source
-   Simple Analytics
    -   Closed source
-   Metrical
    -   Closed source
-   Cloudflare
    -   Inferior
-   Ackee
    -   Inferior

This leads

-   https://plausible.io
-   https://umami.is
-   https://www.offen.dev

## Step four: Reevaluate

We now have a very focused list of services we are _tracking_. These all fulfill my criteria and are options. What are we looking for now?

-   Most features
-   Smallest script

And some cool features

-   Tracking pixel fallback (thanks simple analytics)
-   Tweet view (thanks simple analytics)
-   "What we collected on you" (thanks offen)
-   opt out (thanks offen)
-   Load times (thanks cloudflare, shynet)
-   Pixel (thanks shynet)

Unfortunately, offen needs to go. I really like what it brings to the web, but at this point we have been trained to say no whenever the option is presented. What percent of my visitors will _actually_ opt in? That being said, I am happy to provide an easy way to opt out, but I don't think anyone is going to explicitly agree, so opting in must be the default.

Well

-   Tracking pixel
    -   Plausible: No
    -   Umami: No
-   Tweet view:
    -   Plausible: No, but refine down to individual t.co links
    -   Umami: No, only refinement is subdomains
-   What we collected on you
    -   Plausible: No
    -   Umami: No
-   Opt out:
    -   Plausible: Possible to implement by modifying script
    -   Umami: Possible to implement by modifying script
-   Load times, Pixel
    -   No, No

So It won't come down to these features. In terms of script size, they are also equal. Umari is 0.1kb heavier. In terms of selfhosting, Umari is much easier.

Features wise, I went and compared both side to size.

-   Umami uses a bar chart, Plausible uses a graph.
-   Umami's bar chart has page views and unique visitors, plausible's graph only has unique visitors.
-   Plausible supports very in depth referers, Umami seems confused
-   Plausible supports pages, entry pages, and exit pages. Umami supports pages
-   Plausible and Umami support screen size, browser, and os, but Plausible lets you narrow it down
    -   Plausible supports
        -   Browser -> Browser versions
        -   OS -> OS versions
    -   Umami supports
        -   OS versions
        -   Browser
        -   (note that you can't do something general and then narrow it down)
-   Plausible supports country, region, and city (with it's amazing narrow down), Umami supports country
-   Umami supports click events, Plausible supports click events and "goals" (page visits like blog/\*\*). Umami has a graph.

Verdict, Plausible has more features with less javascript, at the cost of harder hosting and less useful graphs.

With umimi out of the picture, I was about to switch to plausible, ~~until a friend made me aware of Shynet. Shynet did not have an online demo, so I installed it.~~ It did not have plausible's degrees of narrowing down, but it brings some really cool ideas to the table. It uses a small pixel by default (better for bandwidth), and does not minify the extra heartbeat code. It is a really cool idea, but it's not as fleshed out as plausible. I hope the developer continues working on it, ~~I would love to switch~~ (or plausible steals the pixel, hell, becomes pixel-as-primary-mode-of-tracking, makes the graph as good, shortens scripts due to saved space by pixel, unminifies it, and adds sessions, that also works)

DO NOT USE DO NOT USE DO NOT USE (shynet) (see step 5)

## Step five: Ok but selfhost (If plausible is out of the picture)

Well, plausible was not designed to be selfhosted. Clickhouse is huge! Needs sudo! Oh no!

So umimi and shynet are back!!! Head to head!!!

## Final recommendations

So after the emotional rollercoaster I went

1. Ackee Cloudflare Matomo Metrical Plausible Umami Fathom Offen Simple Analytics ~~Shynet~~
2. Ackee Cloudflare Plausible Umami ~~Shynet~~
3. Plausible Umami
4. Umami

What a rollercoaster!

My final reccomendations are as follows:

1. Plausible if you are looking to pay (but fathom is also good)
2. Plausible if you don't care about selfhosting complexity
3. Plausible if you want the best features
4. Umami if you want to selfhost easily
5. Cloudflare if you don't care and just want something really easy
6. Offen if privacy is no1
7. Matomo if you want the most powerful option

## Changelog

March 23: Added https://github.com/milesmcc/shynet.git
