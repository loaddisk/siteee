---
title: A cool use for CSS variables
in: blog
description: How I added dynamic coloring to my website, and how you can too.
is: bursting with color
date: 2022-03-21
---

[[toc]]

When I was introduced to CSS variables, I thought nothing of them. They were an excellent tool at the time for me, allowing me to develop rapidly by reusing styles across multiple locations for a consistent UI. This design pattern is common and most developers certainly make use of it.

```css
:root {
  --rad: 3px;
}

img {
  border-radius: var(--rad);
}

blockquote {
  border-radius: var(--rad);
}
```

To be clear, this pattern is great! For what it is worth, SCSS has a similar pattern

```scss
$rad: 3px

img {
  border-radius: $rad;
  ...
}

blockquote {
  border-radius: $rad;
}
```

(compiles to)

```css
img {
  border-radius: 3px;
  ...
}

blockquote {
  border-radius: 3px;
}
```

This begs the question: how is CSS's version better when it is more verbose than SCSS's beautiful (jquery flashbacks) `$`. Well, in terms of design choices SCSS is clearly the winner, but you should not *always* use SCSS for this.

## Defining CSS

CSS stands for Cascading Style Sheets! You see where I am going with this?

Well, if I tell CSS something is red, and then later that it is blue, it will look for the most authoritative answer (often, but not always, the answer that comes last). This is well known:

```css
p {
  color: red;
}

p {
  color: blue;
}
```

Life can't be simple though, and there are certain ways red would win in the given example. Things like `!important` (don't use this!) or more specific selectors (`p.red`).

Another bad way to ruin CSS's nice cascade is to use attribute styles.

```html
<p style="color: blue">
```

## The cool thing about CSS variables (why you are here?)

Well, it turns out CSS variables are not excluded from this cascade. Typically, we use `:root` to define variables, but it is feasible to do it elsewhere. This first came to my attention while attempting to dynamically theme parts of my website, like links or the primary color. (check out [[/states]]). We can use variables to change appropriate things in different places.

## Levels

### Level One: Body

We can use attribute styles (hypocrite alert?) to save space and to change the styles of all child elements with a flick of the wrist!
{{echo}}
```liquid
<body> // [!code --]
  {% if color and color != config.color %} // [!code --]
    <style> // [!code --]
      :root { // [!code --]
        --light: {{color}} // [!code --]
      } // [!code --]
    </style> // [!code --]
  {% endif %} // [!code --]
<body {% if color and color != config.color %}style="--light: {{color}}"{% endif %}> // [!code ++]
```
{{/echo}}
### Level Two: Highlighting outbound links

Instead of redefining properties to simply change color, we can just change a single variable!

```scss
a {
  text-decoration-color: var(--light);

  &:hover {
    color: var(--light);
  }

  &[href*="//"]:not([href*="boehs.org"]) {
    text-decoration-color: var(--warn); // [!code --]
    &:hover { // [!code --]
      color: var(--warn); // [!code --]
    } // [!code --]
    --light: var(--warn) // [!code ++]
  }
}
```

### Level Three: Custom Classes

For the `.penpen` class, we redefine a variable to update all references to it in element children of `penpen`:

```css

a {
  text-decoration-color: var(--light);
  &:hover {
    color: var(--light)
  }
}

blockquote {
  padding: 10px 0 10px 10px;
  border-left: 6px double var(--light);
  margin: 1em 0;
}

.penpen {
  --light: lightpink;
  background: lavender;

  p::before {
    content: '🐾 ';
  }
}
```

### Level Four: Any HTML Element

We can use attribute styles just like we did for `body` to update a variable for children of given element:

```html
<a style="text-decoration-color: #f6c915" href="https://liberapay.com/e">Donate</a> // [!code --]
<a style="--light: #f6c915" href="https://liberapay.com/e">Donate</a> // [!code ++]
```

## Conclusion

Scoped CSS variables are life changing because they do so much. Rapid development by not redefining styles (i'm looking at you, reader), save space by not redefining styles, and avoiding bugs by... you guessed it, not redefining styles.

On my website, I use them as an efficient way to add dynamic coloring, but the possibilities are endless.
