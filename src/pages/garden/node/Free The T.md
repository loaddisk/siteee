---
in: blog
is: T-posing
date: 2024-03-17
tags:
- urbanism
- boston
description: A plee to the Massachusetts bay transportation overlords.
---

**March 2025 Update**: _Charts have been updated. MBTA overestimated fare earnings by $100M. The MBTA faces a [$700M](https://commonwealthbeacon.org/transportation/mbtas-next-budget-is-the-one-to-worry-about/) [deficit](https://mass.streetsblog.org/2024/08/23/a-riders-guide-to-the-mbtas-looming-financial-crisis) for next year that would cause service cuts but BREAKING NEWS we [MIGHT](https://commonwealthbeacon.org/transportation/healey-task-force-turns-to-existing-tax-to-boost-mbta-transportation-infrastructure/) tax the rich which is crazy. The new $1B fare system is finally here, mostly. It works alright. On the upside, most slow zones are fixed._

**May 2025 Update:** *As I correctly predicted over one year ago, fare evasion did increase. The MBTA [says](https://www.nbcboston.com/investigations/after-mbta-implements-new-payment-system-rampant-fare-evasion-on-green-line/3707620/) that "a loss of $25 to $30 million threatens a lifeline," and that "every dollar is important to us." If that was really so, you wouldn't have spent 1 billion dollars so that you could lose an additional 30 million dollars each year in perpetuity. What the hell?*

When riding the MBTA, there is a social expectation to pay the fare, some \$2.40[^1] for each board. I say social expectation because fare evasion is both rampant and trivial. Unlike the [MTA](https://www.tiktok.com/@kiingspiidertv/video/7294296372784860462), the MBTA has not yet attempted a crack-down. This is mostly political: Mayor Wu of Boston is particularly opposed to fares[^2], and governor Charlie Baker decriminalized fare evasion in the 2021 Transportation Bond Bill[^6], making enforcement useless ("[MBTA says fare evaders may also choose to ignore fines](https://www.bostonherald.com/2022/11/17/mbta-says-fare-evaders-may-also-choose-to-ignore-fines/)"). But anyway, to run the math, the average, law-abiding train commuter will spend roughly \$1200 a year in fares, or \$1000 when using monthly passes.

Despite not implementing explicit anti-evasion mechanisms, the MBTA has begun implementing a new fare collection system. This new system is designed to make fare collection more efficient. The MBTA claims that this new system will allow them to provide further discounts to users, and enable mobile tap to pay. I think mobile tap to pay is especially beneficial here, as I suspect[^12] that the hassle of carrying a charlie card is potentially a significant barrier to MBTA usage in some groups of people. Finally, and this is key, riders will be able to pay for above ground trains at any door. I expect that this final component will *reduce* fare based revenue, as boarding on all doors is now normalized, and sliding an inactive phone over the reader is quite slick. To combat this, the MBTA plans to implement a PoP (proof of payment) system, where all train passengers will be randomly spot checked by civilian employees.

![[Pasted image 20240206230905.png]]

Regardless of my opinions on the matter, it certainly seems inevitable that the project will proceed, despite already being 3 years behind schedule and $212 million dollars over budget[^3]. Wait, sorry, 212 *million*? How much will this system cost? The system, reportedly, will cost $935.4 million dollars. You could buy 3 million [square terminals](https://squareup.com/shop/hardware/us/en/products/terminal-credit-card-machine) with that amount of cash! I'm pretty damn sure the MBTA does not have 3 million doors[^4], and if they did, surely a bulk discount could be arranged. Sure, Square software would need to be adjusted to suit this use case. Luckily, you could hire 9000 full-time programmers with that amount of money.

This investment represents roughly one half of the MBTA's yearly revenue[^8], revenue that would be much better spent on addressing the 142 current slow zones[^5], or addressing the safety concerns raised by the federal government[^7]. Over a ten-year operational period, the federal report estimates that the system will save the MBTA 90 million dollars – One tenth of the initial investment.[^9] They said 40% of that additional income will come from a decrease in fare evasion. This estimate, of course, feels unreasonable, and the MBTA is aware of this. In 2021, the MBTA told the FMCB that fare evasion could, in fact, *increase* by $25-$30 million *per year*, effectively meaning that the new system will *cost them* a minimum of $190 million over a 10-year period, on top of the $900 million investment. In addition, it's unclear if the proposed PoP system will actually overcome the cost of employing hundreds to obtain proof of payment.

<figure>

```js exec
let data = h.read.csv("data/mbta yearly revenue.csv");
data = data.map(d => ({
    year: +d.year,
    revenue: +d['Revenue'],
    fares: +d['Revenue from fares'],
    percent: d['Revenue from fares'] / d['Revenue']
}))
const v1 = (d) => d.revenue;
const v2 = (d) => d.percent;
const y2 = d3.scaleLinear([0, 1], [0, d3.max(data, v1)]);
return Plot.plot({
    width: h.cfg.maxWidth,
    aspectRatio: 250,
    y: {
        axis: "left",
        label: "revenue (M)",
        transform: (d) => d / 1e6,
        grid: true
    },
    x: {
        tickFormat: d3.format("")
    },
    color: {
        legend: true,
        type: "categorical",
        domain: ["Revenue", "Fares", "Revenue from fares ÷ Revenue"],
        range: ["green", "red", "steelblue"]
    },
    marks: [
        Plot.ruleX([2024], {
            strokeDasharray: "4,4",
            strokeWidth: 1,
            stroke: "#3D3C3C"
        }),
        Plot.ruleY([0]),
        Plot.axisY(y2.ticks(), {
            color: "steelblue",
            anchor: "right",
            label: "Revenue from fares ÷ Revenue",
            y: y2,
            tickFormat: d3.format("0.00%")
        }),
        Plot.lineY(data, {
            x: "year",
            y: "revenue",
            sort: {
                x: "y",
                reverse: true
            },
            curve: "natural",
            stroke: "green",
            strokeWidth: 2,
        }),
        Plot.lineY(data, Plot.mapY((D) => D.map(y2), {
            x: "year",
            y: v2,
            stroke: "steelblue",
            strokeWidth: 3,
            curve: "natural"
        })),
        Plot.lineY(data, {
            x: "year",
            y: "fares",
            sort: {
                x: "y",
                reverse: true
            },
            strokeWidth: 2,
            stroke: "red",
            curve: "natural"
        }),
        Plot.ruleY([0])
    ]
}).outerHTML;
```

<figcaption>

FY24 and 25 data from MBTA projections, which are known to miss. See notes at [[data/mbta yearly revenue]]

</figcaption>
</figure>

Instead of diverting nearly one billion dollars to a useless collection system with no clear path to profitability *and* millions of dollars to ineffective enforcement, I propose we do something radical. I propose that we make the T free.
## An Increase in Ridership

 In a poll of 1000[^10], 57% of residents state the system being free would make them more likely to ride it. In an additional survey[^11] of 300 riders, over 50% of the respondents stated the fares were too expensive to afford (48% of riders on the MBTA, according to the MBTA's own study, are low income). The survey claims that 1/3rd of the respondents detailed a difficult choice fares presented in their life, including responses like:

- I have skipped lunch to go to work more times than I can count.
- I’ve had to choose between buying pads or being able to go home.
- If I don't have money for my T card then I can't go to work. T card or medication at times.
- Typically, I just bear with the pain to save money, because I can’t justify paying $3

Other systems that have become fare free have experienced an uptick in riders, but we don't actually need to look far from home to see how free transportation might increase ridership. Using a grant, the city of Boston made certain routes serving critical populations free. In the communities these routes served, the rate of recovery from covid dips was double the system-wide rate[^13]. The variation in travel time decreased, despite an increase in ridership, and crowding remained similar.

![[Pasted image 20240207131304.png]]

2% of trips are new, and 5% of trips that would have been otherwise made using cars were instead made using public transportation.

What's interesting is that very little money was actually saved by participants. Only 26% of riders saved $20 or more per month – A majority of riders still needed to purchase passes to use other parts of the system. This, of course, could still serve as a deterrent to many potential riders. I'm curious – if the system was completely free, how would the usage change?
## Not just for the poor

Boston's pilot program, of course, was targeted at low income communities that made heavy use of public transportation. Unfortunately, for a wide variety of reasons, the needs of low income citizens do not rise high on the agenda of politicians. I believe that above all else, the perception that public transportation is only for the poor is what is destroying it.

When Germany introduced a 9 euro, unlimited ticket, interest in its public transportation increased by 25%. 20% of the users of the $9 ticket were not previous public transportation users. Train trips longer than 18 miles increased by 40% over pre-covid levels, and trips to rural areas popular with tourists increased by 80%[^14]. While it was widely reported in Germany that there was little change to commute traffic levels, long distance (60mi) trips decreased by 10-18%[^16]. An independent study reported that 50% of people increased public transportation usage, and 30% decreased car usage[^17].

Interviews conducted by outlets like [the guardian](https://www.theguardian.com/world/2023/sep/20/all-aboard-can-luxembourgs-free-public-transport-help-save-the-world) show a generally positive outlook on free transportation by the public:

> “When we were students, a lot of people went to school by car instead of bus and train, and now it’s easier for young people to hang out after school or on weekends. If you want to go to a certain village, there’s always a way to get there by bus.”

> “It’s very convenient and easy because we don’t need to pay anything, before, it was a big mess, because at small stations usually there were no ticket offices, so sometimes it was not easy to find the appropriate fare.”

> “It was the first time \[my children's friends\] were taking a train, at 16.”

> One owner of a café just a few minutes from Luxembourg City’s central station says that young people — and his teenage son in particular — are using the fare-less policy to go on jaunts around the country and discover it in ways that wouldn’t previously have been possible (a boon in a country where there isn’t a huge amount for young people to do).[^18]

I can offer my own anecdotal experience, having lived in Massachusetts for all my life. When the PVTA ran their buses free for a month, I was lucky enough to be in Springfield. I can say the contrast to the MBTA was staggering. There is a certain burden to fares, as you must be aware that you intend to take public transportation before you leave your house, and you must stomach the fee every trip you take. During the month that I experienced the free PVTA, I can say that I *also* experienced a beautiful sense of autonomy. There is something liberating about the ability to explore a city without worrying about parking, or the tole each trip takes. Just hop on, hop off. By contrast, within the MBTA, I have encountered a number of situations where I wanted to take the train, but did not have a charlie card on me.

I imagine that the burden on children is even higher. Without a stable income, children that intend to use public transportation must rely on their parents, or fund the card with the little savings they have. Driving is not an option – this privilege is held hostage until the child reaches 16, and thereafter is still gated behind the cost of the automobile, and the time required to learn how to operate it. We should be encouraging children to explore our cities, as it is well understood that the modern child had less autonomy than their parents did[^21] [^22] [^23]. It feels clear that the prevalence of automobiles further robs children of said independence.

Need one more reason? Public transportation makes communities safer. A 2016 study by the [APTA](https://www.apta.com/wp-content/uploads/Resources/resources/reportsandpublications/Documents/APTA-Hidden-Traffic-Safety-Solution-Public-Transportation.pdf) found that cities with an average of 50 transit trips per resident have half the average traffic fatality rates as cities with 20, and "transit-oriented communities" had one fifth the number of fatalities than automobile dependent communities. This data makes sense: 30% of accidents involve drunk driving[^25]. Intoxicated citizens leaving urban bars need to get home somehow, and the reality is many do not think ahead about designated drivers. Due to sprawl, walking is often forbiddingly difficult, and an Uber costs at least 10x more than gas or fares. Normalizing public transportation usage, a thing that increased ridership helps do, should decrease these accidents. The entry of ride hailing alone, even with its cost, has decreased alcohol related incidents by as much as 10%[^26]

A [study](https://www.google.com/books/edition/_/PAV7GLw0ZysC?hl=en&gbpv=1) in the US – conducted in 2012 – found similar outcomes to those of the European countries described above. It found that universities and resorts often implement free transportation to remain competitive, that free transportation increases ridership by 20-60%, and that a large portion of that ridership is associated with new tourism, as opposed to people switching away from motorized transportation (though when people do, millions of pounds of emissions are prevented). Though the total cost of public transportation increases alongside ridership, the cost per rider decreases. Many of the towns interviewed reported a higher degree of communal unity and pride.

The impact of public transportation on communal wealth is already well understood – the presence of it drives up property value[^19], and ski resorts have recognized it as a necessity. It makes sense, then, that making transportation free would further benefit the economy. Contrary to the common narrative[^20], free public transportation does not just help people in poverty. It seems clear that free public transportation increases both domestic and foreign tourism, which is good for the economy, the redistribution of wealth, and the goal of fostering a happy, lively city.
## Usage justifies funding

Transit funding tends to be at least somewhat proportional to its ridership[^24] – that's just common sense. The MBTA is *infamous* for its poor conditions. It's hard to say how much of this is a management issue, as opposed to a funding issue, but what's clear is that something must give.

There are many corners of our public transportation infrastructure in desperate need of attention. Attention costs money. This new fare system *also* costs an absurd amount of money. It's not clear that the additional revenue from this new system will ever offset its cost, let alone provide more funding. Ridership provides more funding. It's not clear that this new fare system provides more riders. A system that *will* provide more riders is a free system. A free system will also benefit marginalized communities, bring new revenue sources to businesses, and even prevent death.

Realistically however, a free system might never break even, at least in terms of numbers on a spreadsheet. I'm not actually sure this matters: public transportation has never been profitable. Services for the public good (like libraries, healthcare and schools), ought to be free. When they are, we will feel the cascading warmth forever.

[^1]: [MBTA – Subway Fares](https://www.mbta.com/fares/subway-fares)
[^2]: [Mayor Wu – Forget fare hikes — make the T free](https://www.bostonglobe.com/opinion/2019/01/31/opinion-michelle-forget-fare-hikes-make-free/vJpKVu6Rft2C4Esi50mB5M/story.html)
[^3]: [MBTA – Fare Transformation Update](https://cdn.mbta.com/sites/default/files/2020-04/2020-04-27-fmcb-I-fare-transformation.pdf)
[^4]: [The MBTA Vehicle Inventory Page](http://roster.transithistory.org/)
[^5]: https://www.mbta.com/performance-metrics/speed-restrictions
[^6]: [Section 101: Evasion of payment of toll or fare](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXII/Chapter159/Section101)
[^7]: [Feds clamp down on safety after 5 'near misses' between MBTA employees and trains](https://www.wbur.org/news/2023/04/19/mbta-near-misses-track-work-fta-order)
[^8]: [MBTA Budget](https://www.mbta.com/financials/mbta-budget)
[^9]: [Project Profile: Massachusetts Automated Fare Collection System](https://www.fhwa.dot.gov/ipd/project_profiles/ma_massachusetts_auto_fare_collection_system.aspx)
[^10]: https://www.massincpolling.com/the-topline/poll-residents-sound-the-alarm-on-mbta-service-quality-safety
[^11]: [Getting around while getting by](https://publictransitpublicgood.org/wp-content/uploads/2024/01/CLU_PTPG_GettingAroundR4v2.pdf)
[^12]: I have not found a specific study to corroborate this
[^13]: [Fare Free Mid Program Report](https://www.boston.gov/sites/default/files/file/2023/03/Fare%20Free%20Mid%20Program%20Report.pdf)
[^14]: [Pressemitteilungen des VDV](https://www.vdv.de/presse.aspx?id=be711bba-5926-48df-b541-74851878036f&mode=detail&coriander=V3_5cbb1794-5fc1-e2bf-b313-ec14416e6b4f)
[^16]: [9-Euro-Ticket: Mehr Bahnverkehr vor allem in ländlichen, touristischen Regionen](https://www.destatis.de/DE/Presse/Pressemitteilungen/2022/08/PD22_339_12.html)
[^17]: [A nation-wide experiment: fuel tax cuts and almost free public transport for three months in Germany](https://arxiv.org/pdf/2208.14902.pdf)
[^18]: [One of Europe’s Smallest Nations Tries a Big Idea: Free Public Transit](https://www.bloomberg.com/news/articles/2022-07-07/inside-luxembourg-s-experiment-with-free-public-transit)
[^19]: [What Investors Should Know About Public Transportation's Effect On Manhattan Real Estate Value](https://www.forbes.com/sites/forbesrealestatecouncil/2018/11/27/what-investors-should-know-about-public-transportations-affect-on-manhattan-real-estate-value/?sh=4a34417b42a6)
[^20]: Though, of course, it is my opinion that "helps the poor in the city with one of the largest wealth gaps" alone should be a significant motivator
[^21]: [The decline of American playtime — and how to resurrect it](https://www.vox.com/23759898/kids-children-parenting-play-anxiety-mental-health)
[^22]: [The decline of American playtime — and how to resurrect it](https://www.nytimes.com/2022/05/05/learning/whats-going-on-in-this-graph-may-11-2022.html)
[^23]: ![[Pasted image 20240207171600.png]]
[^24]: https://www.transit.dot.gov/funding/grants/urbanized-area-formula-grants-5307
[^25]: https://www.nhtsa.gov/risky-driving/drunk-driving
[^26]: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7505578/
