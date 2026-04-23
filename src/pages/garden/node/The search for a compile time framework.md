---
is: experincing linking errors
in: blog (draft)
---

[It's well documented that the web is obese](https://idlewords.com/talks/website_obesity.htm). Now days, even simple profile pages and applications seem to bundle hundreds of kilobytes of javascript, doing god knows what to achieve what could have been done in a hundredth of the file size. We have tried relentlessly to control it's cancerous growth with server side rendering, bundling, minification, and whatever the cool kids are using.

::: details Why do you still hate frameworks if every country in the world is hitting speeds faster than 1MbPs?
- Data is still not cheap, first and foremost. The average smart phone user in [Canada pays 12.55$ for a single gigabyte of mobile data](https://markets.businessinsider.com/news/stocks/cost-of-mobile-data-worldwide-1029366462).
- Javascript execution speeds are also a factor, lowering page reactivity, causing FOUC.
- Up in the sky ✈️, [[GitHub]] becomes unusable. This is less of a problem for me after I switched off github, because [[Sourcehut]] pages take only a few seconds to load.
- Attempts to mitigate performance issues likely end up causing additional server load (SSR, anyone? For the record, it's not like SSR ever worked. Show me a SSR solution that actually... ya know... does SSR instead of shipping a tad bit less code)
- It encourages non semantic html. If I asked a react developer how to make a collapse menu they would probably do it with javascript, hurting accessibility users (show me a react site that is not `div div div div ul li div div li div`)
- It's ugly and frankly depressing to see how big websites have become.
:::

I've been looking for a compile time framework, so I don't need to worry that I am being selfish by putting myself before the user. I thought it would be easy, so I googled "compile time html framework". Lo and behold, it seems as if if this idea is not novel! The first result leads me to Svelte, a framework for shipping less JavaScript. It has a compiler, meaning optimizations are done during build time. Looks like this might shape out to be an open and shut case after all.

But wait a second... there is JavaScript! To Svelte's credit, it is challenging the norm, where a [hello world ships 200kb of source](https://netlify-react-site.netlify.app), but it still just does not sit well in me knowing that a purely textual website still has more JavaScript than content.


::: details ## What about astro?
*disclaimer: I have been paid for my contributions to Astro.*

Astro proposes something interesting. They wanted to make a framework that builds on top of frameworks, but removing all the JavaScript that comes with them. I am happy to say Astro is doing well, but what is Astro *really*? It's way too much to manage, and I fear the project is slowly killing itself. On top of extending React, Vue, and Svelte, they also decided to support Preact, Lit, and Solid. Oh, also for good measure their own proprietary framework.

Extending these frameworks works better than you might imagine, but not as well as you wish. Keep in mind that Astro is using these frameworks in ways that they were not designed to be used, and it often shows. I have noticed most Astro users favor Astro's own format, but lack of editor support makes it feel like a second class citizen too. 

And through the aforementioned support for every framework known to man and then some, the Astro company attracted many different people who want many different things. I feel an impeding sense of doom, gridlock feeling inevitable at every turn.

> Ship zero JavaScript... in all the possible ways

:::

Think Evan, think.

Wait.

What if it was in front of me the whole time! Introducing..... Templating languages! No matter if home looks like {%raw%}`{%%}`{% endraw %}, `<==>`, or something else all together, we all have had the fortune of interacting with a templating language. It's easy to dismiss these tools as being too simple to build complex apps, but it has been done. Executing templating languages with data on the server is fast for the user and easy on the server, truly a win win for everyone, except for you.

The issue with these templating languages is the lack of convenience. Most templates lack modern concepts like components, and who likes manually writing routes that forms POST to. Additionally, these template engines seem hell bent on avoiding executing *any* custom javascript serverside, a necessity for modern web apps.

Further, to my understanding there has never been a full framework built upon templating languages.

It's unfortunate that these languages might actually be my best option, especially given the [lack of interest](https://github.com/mozilla/nunjucks/pulls) in developing new ones. I would be ecstatic if someone tried to refresh templating, but for now React is still the cool thing!

What about tiny frameworks? Glad you asked. There are hundreds. To name a few:

- Lit
- Alpine
- Preact
- Marko*
- Mithril
- Solid

All of these frameworks, while better options, involve some overhead still. For many, without javascript the page won't even work still. Marko is special because it attempts to render much of the code on the server, but it falls apart when you want to render anything client side.

So what do I want?

## The dream

1. The framework should be easy and intuitive. This is subjective, but I personally am hoping for svelte like syntax/syntax like templating languages.
2. The app's source should be compiled before being shipped to the browser
3. The app should be composed with the following order of priority
	1. Static HTML
	2. SSR static HTML with no extra JavaScript (heavy HTML forms)
	3. 1 or 2 but progressively enhanced with JavaScript. For example, instead of confirming by redirecting the user to a confirmation page (the no js way), show a popup if the user does have javascript). Both results should act exactly the same for the user, just one is faster feeling.
	5. Maintainable JavaScript
4. Output for client *and* server should always be maintainable like a human wrote it. If the framework is deleted the code produced should still be easy to change.
5. The framework should integrate well with databases?

## Kicking around ideas

The framework would likely extend an existing templating language like [[nunjucks]], or a framework like [[Svelte]]. The goal would be to produce maintainable, no framework code from a declarative, framework style input. [[Noam Rosental]] outlines what the client side output goal would be in his article, [The Vanilla Alternative](https://www.smashingmagazine.com/2022/02/web-frameworks-guide-part2/). I would hope for this to be taken to an extreme. Take the following example Noam blesses us with:

```html
<style>
    label.error { display: none; }
    .app.has-error label.error {display: block; }
</style>
<label class="error">Message</label>

<script>
   app.classList.toggle('has-error', true);
</script>
```

The absolutely optimal solution here is to not send javascript at all. Assuming the error will be as a result of a form submission, it makes perfect sense to only send the client the error element *if* their submission returned an error. That way, there is no need to even include the javascript to show the error, it's done serverside and our application works in every web browser ever. Cool!

For modern apps that require javascript however (are popups and nested menus *ever* good ux, another question), resending the entire HTML each button press will kill your users. Via an attribute, we opt into also duplicating this functionality client side. Javascript hijacks the form, making it a special request to the server indicating it wants the job. The server sends only the needed information as JSON, and the client renders itself using conventional JavaScript. If the JavaScript has not loaded for any reason, that's fine, it simply won't hijack anything.

The entirety of the app works in this way. Every functionality provided by the framework first works server side. So are the majority of standard functionality, *including* DOM APIs. 

`setTimeout` functions even work serverside, the server will calculate a `meta-equiv-refresh` for the final page to keep it in sync. The only difference is that `setTimeout` functions will always also be sent to the client, and the client will try it's hardest to remove the equiv, as it's never an optimal experience.

Don't fear, adding the `clientOnly` script tag attribute does what it looks like.

One lingering question is in regard to [hotwire](https://hotwired.dev), a framework that does a similar duty. It lacks the zero javascript goals, but it's idea of sending HTML instead of JavaScript shows promise. Is there a middleground? Is there a winner? Pros? Cons?
## 👋

I'm hoping someone has done something like this. I'm hoping because developers are incredible, and with all of the incredible developers it's hard to know where to look. For instance, I only discovered [[Noam Rosental]]'s article after I began preparing to publish this one.