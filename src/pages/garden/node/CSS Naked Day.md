---
title: Deleting my CSS for a day
description: On April 9th, I deleted my CSS. It was a huge learning opportunity
in: blog
date: 2022-04-09
is: naked 🌿
---

Today is April 9th. At my ski resort, we donned funny costumes and recklessly attempted to pond skim as the snow melted around us. Of course, outside of our blissful bubble of hypothermia, the world struggles on against mounting tensions with russia. Also, today is CSS naked day!

This is my first year participating, but I am ecstatic about the event. There is a small sense of community, my strip buddies forever. There is also a sense of accomplishment, knowing your name will be listed for all of eternity on https://css-naked-day.github.io/2022.html. For me, most exciting is the opportunity to take a day to focus on accessibility, and boy did I!

First, I fixed my feed SVG. As it turns out, I can specify height and width in the svg itself. This means that there will no longer be oversized svgs before the CSS loads, and as a bonus the CSS becomes slightly smaller because of the new lack of explicit width.

Next, I turned to my lists. I made the `cardgroup` component a `ul`, and `taxValues` a `ol` - hiding both via CSS. This will be helpful to screen readers!

Not leaving the topic of lists quite yet. For frontmatter and footer links, I turned them into fancy definition lists instead of basic `div`+`ul` combos. It was a challenge to get the flexbox like vibe, because of how `dl` elements are structured.

**Before:**

```html
<nav>
	<!-- The following div is a flexbox -->
	<div>
		<p>Key</p>
		<ul><li>Value</li></ul>
	</div>
	<!-- The following div is another flexbox -->
	<div>
		<p>Key</p>
		<ul><li>Value</li></ul>
	</div>
</nav>
```

**After:**

```html
<dl>
	<dt>Key</dt>
	<dd><ul><li>Value</li></ul></dd>
	<dt><p>Key</p></dt>
	<dd><ul><li>Value</li></ul></dd>
</dl>
```

This makes flexbox hard, because we want each `dt`+`dd` combo to have it's own line, but it's hard to do this with the constraints of no divisions. How can I teach CSS that `dt`'s and `dl`'s work together? I tried some flexbox solutions that did not have a perfect appearance (the issue was mostly that the `dd`'s would not always fully go to the right). The solution was under my nose the whole time though. Use CSS grid!

```scss
nav > dl,.kv {
  display: grid;
  grid-template-columns: auto max-content; // Give dd's room to grow
  gap: 10px;

  & > dd {
    margin-left: auto; // Force dd's as far right as possible
	}
}
```

The last challenge this year was cards. On my website, the entire card is wrapped in an `a` element. This has big accessibility issues, screenreaders will read it out as

> Deleting my CSS for a day on April 9th, I deleted my CSS. It was a huge learning opportunity, link

The obvious solution was to only link the title, but I said no. Sorry screen reader users. But wait! We *can* do this a proper way. We can wrap the title in an `a`, but then style the `a` to be as big as the card.

```scss
.card {
	position: relative;

	a::after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
```

Unfortunately, this also is not perfect. For one thing, it means the card can't be highlighted. This alone is disorienting, but there also appears to be a bug in chrome that makes the `a` take 2x longer to transition on hover than the rest of the card. Considering [50% of my visiters are from chrome]({{config.analytics.pub}}), unfortunately, for this we need to stick to our old, non semantic ways.

This was very fun, and I was so happy to participate, See everyone next year.