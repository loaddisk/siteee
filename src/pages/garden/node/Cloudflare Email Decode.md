---
tags:
- cloudflare
---

Cloudflare is injecting a script into my website. My pure, beautiful website. Ugh. It's 1.1kb, and it's job is to protect my email from being scraped. Unfortunately, It's not very good at it's job. Here is a function that re-implements the entire thing.

```js
function decode(token) {
  const hexadecimal = (a, b) => parseInt(a.substr(b, 2), 16);
  const hexadecimalToken = hexadecimal(token);
  let decode = "";
  for (let i = 2; i < token.length; i += 2) {
    decode += String.fromCharCode(hexadecimal(token, i) ^ hexadecimalToken);
  }
  return decode;
}
```

For the record, here is the encoder

```js
function encode(email) {
  let encoded = "", hexadecimalToken = Math.floor(Math.random() * 256);
  encoded += ("0" + hexadecimalToken.toString(16)).slice(-2);
  for (let i = 0; i < email.length; i++) {
    encoded += ("0" + (email.charCodeAt(i) ^ hexadecimalToken).toString(16)).slice(-2);
  }
  return encoded;
}
```