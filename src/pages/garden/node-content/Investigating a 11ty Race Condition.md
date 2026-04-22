---
tags:
  - work in public
  - 11ty
date: 2024-01-31
---
My website is failing to build in 11ty again. Familiar readers might note that my website makes a really good fuzzer for 11ty:

![[Pasted image 20240131084721.png]]

Today, we have a race condition.

## The setup

Basically, in this PR I opened:

https://github.com/boehs/site/pull/32

I'm trying to convert my OG image generation to be a part of the 11ty build process. To do this, there are 2 components:

1. A collection holding every page that should have an OG image
2. A paginated page that generates the OG images

There is *also* this snippet of code, that already exists in my codebase:

```js
eleventyConfig.addTransform("html", function (content) {
	if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
		return minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	}
	return content;
});
```

Theoretically, then, this code should not be running on my OG images. But reportedly, it is:

```
[11ty] Problem writing Eleventy templates: (more in DEBUG output) [11ty] 1. Having trouble writing to "out/og/node/lorum.png" from "./src/og.11ty.js" (via EleventyTemplateError)
[11ty] 2. Transform `html` encountered an error when transforming ./src/og.11ty.js. (via EleventyTransformError)
[11ty] 3. str.replace is not a function (via TypeError)
[11ty]
[11ty] Original error stack trace: TypeError: str.replace is not a function [11ty] at collapseWhitespace (/Users/evan/Code/site/node_modules/.pnpm/html-minifier@4.0.0/node_modules/html-minifier/src/htmlminifier.js:37:15) 
// snip
```

Why? I have no idea. Some files build, some files don't, it's different on different devices, and console.logging information sometimes fixes it. This looks like a race condition to me!

---

What's interesting is, if you modify the 11ty source code that's running the transforms to show the output path, you'll notice that somewhere in the stack the output path *changes*:

```js
} catch (e) {
	console.log(pageData)
	throw new EleventyTransformError(
		`Transform \`${name}\` encountered an error when transforming ${inputPath} to ${outputPath}.`,
		e,
	);
}
```

```
{ url: '/og/', outputPath: 'out/og/index.html' }
[11ty] Problem writing Eleventy templates: (more in DEBUG output)
[11ty] 1. Having trouble writing to "out/og/node/lorum.png" from "./src/og.11ty.js" (via EleventyTemplateError)
[11ty] 2. Transform `htmlmin` encountered an error when transforming ./src/og.11ty.js to out/og/index.html. (via EleventyTransformError)
[11ty] 3. str.replace is not a function (via TypeError)
```

So yeah, if you're *actually* working with an image file, but the function doing the transformation *thinks* it's working with a html file because it is passed incorrect information, you are bound to have problems. At some point, there is confusion happening inside the 11ty codebase.

## Oops

Well there *was* confusion in the 11ty codebase, but it wasn't *really* their fault. In my template, I write:

```js
ctx.entry.url.replace(".html", ".png")
```

For the output path, however, on index pages, the ending is `/`, which means the output file is automatically made a HTML file. I have some thoughts on [[Magic Defaults]] that will need to be saved for another time, but the bug here is clear. The transformer *is* running on a PNG because I told it to. The problem is, this error is incorrect:

```
[11ty] Problem writing Eleventy templates: (more in DEBUG output) [11ty] 1. Having trouble writing to "out/og/node/lorum.png" from "./src/og.11ty.js" (via EleventyTemplateError)
[11ty] 2. Transform `html` encountered an error when transforming ./src/og.11ty.js. (via EleventyTransformError)
```

Modifying 11ty source code for the second error to report the output shows the *real* output file:

```js
} catch (e) {
	throw new EleventyTransformError(
		`Transform \`${name}\` encountered an error when transforming ${inputPath} into "${outputPath}"`,
		e,
	);
}
```

```
1. Having trouble writing to "out/og/node/lorum.png" from "./src/og.11ty.js" (via EleventyTemplateError)
2. Transform 'htmlmin' encountered an error when transforming ./src/og.11ty.js into "out/og/index.html". (via EleventyTransformError)
```

So why is it incorrect in the first error?

Because, the way 11ty works is it internally makes a queue of all the templates that need to be transformed. Because most templates are the actual content, this *usually works*, but pagination is one template making many output files. There was a very lazy hack employed, where the first file that will be outputted is set as the output file for use in error messages to avoid breaking other code:

```js
for (let page of map._pages) {
	// Copy outputPath to map entry
	if (!map.outputPath) {
		map.outputPath = page.outputPath;
	}
}
```

But, this means that I'm being told false information! And, without modifying 11ty source, there's no good way to get correct information! No wonder I was confused!

1. Magic defaults were automatically adding a HTML file extension
2. In the error, I was not being told correct information, instead I was debugging a seemingly random file failing for seemingly no real reason, so I was looking in the wrong places
3. When I modified source code to get to the bottom of this, I was initially seeing *both* the false information and the correct information, making me think that at some point, 11ty had confused the file data and the actual file contents that said data connected to