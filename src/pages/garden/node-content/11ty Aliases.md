---
title: 11ty aliases the right way
tags:
- 11ty
- webdev
in: blog
date: 2022-03-20
description: A short little tutorial on how to make redirects in 11ty that aren't awful.
aliases:
- bad url
is: a bit unsure
---

Redirects are something so simple that no one has actually bothered to write a solution for. [Cool URIs don't change](https://www.w3.org/Provider/Style/URI), thank you very much w3, and yet, that URL was *soooo* 2012.

You just can't help but need a new URL, so what to do?

Well, [people had some ideas](https://github.com/11ty/eleventy/issues/510#issuecomment-824104799), but I was not a big fan. I have been defining aliases in frontmatter for years, and I was not in the mood to switch to an objectively worse solution.

May I present, a two part solution to all your alias needs:

[[toc]]

## Part One: .eleventy.js

Add the following to your 11ty configuration

```js
eleventyConfig.addCollection("redirects", function (collectionApi) {
	// lets make a variable to hold our redirects
	let redirects = [];
	// We need to get each post in our posts folder. In my case this is /node
	const nodes = collectionApi.getFilteredByGlob("pages/garden/node/*.md");
	// next lets iterate over all the nodes
	nodes.forEach(node =>
		// for each alias
		(node.data.aliases || []).forEach(alias =>
			// push the target url and the old url
			redirects.push([node.data.page.url,node.data.page.url.replace(/\/[^\/]*?(\..+)?$/, `/${alias}$1`)])
		)
	)
	return redirects
})
```

## Part Two: Make a template page to make use of it

I called it `redirects.njk`

{{echo}}
```liquid
---
pagination:
  data: collections.redirects
  size: 1
  alias: redirect
permalink: "{{redirect[1]}}"
layout: ""
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="1; URL='{{ redirect[0] }}'" />
  <title>Redirecting to: {{ redirect[0] }}</title>
</head>
<body>
  	you should be redirecting to <a href="{{ redirect[0] }}">{{ redirect[0] }}</a>
</body>
</html>
```
{{/echo}}

## Conclusion

This post was much more simple than my last post on [[11ty Taxonomies]], but just as useful, if not more!

You can see this in use by going to [[bad url]], and watching in awe as you get sent away!

### Next Steps

This solution works great for most use cases, but you might still want to

1. Convert your template to only generate *one file* for use by your static host like [[Netlify]]. Most people prefer a `301` redirect for SEO reasons, but I really like the old style.
	* https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file
2. If you are serving multiple MIME types from your web server, you might want to adjust the regex to be more specific, something like
   ```regex
   /\/[^\/]*?(\..+)?$/ // [!code --]
   /\/[^\/]*?(\.html)?$/ // [!code ++]
   ```

### Legal (You don’t want to get sued)

All code on this page (text within `<code>` html tags) is hereby released under the [unlicense](/unlicense.txt). Consider sending a small tip via [[Liberapay]]!
