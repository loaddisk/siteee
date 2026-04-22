---
description: Notes on the world's most quirky donation platform
---

My Liberapay is [e](https://liberapay.com/e/). A fun little thing about a username this short is that I am scolded for it in my description:

![[Pasted image 20240403223711.png]]

{{ embedMastodon "https://social.coop/@eb/112137615694358776" }}

## Undocumented Pages

When linking to pages prefixed with your username, like https://liberapay.com/e/receiving/, you can instead do https://liberapay.com/about/me/receiving/ to automatically redirect to the logged in user's page. This pattern will be used throughout this document.

### JSON API

You can download public information about your account programatically by going to https://liberapay.com/about/me/public.json. This API is CORS friendly, and is used to power the footer on my site.

You can download the data used to render charts by going to https://liberapay.com/about/me/charts.json

### Statements

Liberapay [apparently](https://github.com/liberapay/liberapay.com/issues/714#issuecomment-331833122) has support for account statements, but it didn't work when I checked. This is the programmatic portion:

- [https://liberapay.com/about/me/wallet/export.json](https://liberapay.com/about/me/wallet/export.json)
- [https://liberapay.com/about/me/wallet/export.json?mode=aggregate](https://liberapay.com/about/me/wallet/export.json?mode=aggregate)
- `https://liberapay.com/about/me/wallet/export.csv?key={key}` where `{key}` is `exchanges`, `given`, `taken`, or `received`
- `https://liberapay.com/about/me/wallet/export.csv?key={key}&mode=aggregate` where `{key}` is `given`, `reimbursed`, or `taken`
-  you can view other months by adding `?year=<number>&month=<number>` to the URL.

The first two give empty JSON files. The latter two give empty CSVs titled "bad request".

This is the visual version:

- https://liberapay.com/about/me/wallet/statement

I think it doesn't work because when you go to https://liberapay.com/about/me/wallet/, it says

> This page only shows transactions processed by Mangopay, to view other payments go to the Ledger page.

The CSV here https://liberapay.com/about/me/patrons/export.csv?scope=active doesn't include the end date and units.
## Scripts

Ok we improvise he says. (No, this doesn't handle leap years)

Go [here](https://open.er-api.com/v6/latest/usd), copy the JSON, then go [here](https://liberapay.com/about/me/ledger) and run this:

```js
let f = JSON.parse(prompt('Enter JSON')).rates
let map ={'$':'USD','€':'EUR','£':'GBP','¥':'JPY','₩':'KRW','₽':'RUB','₹':'INR','A$': 'AUD' };
let obj = {};
let curr = null;
let week = (ts) => Math.floor((ts + 345_600_000) / 604_800_000);
[...document.querySelectorAll(".description,.day-open")]
	.map((r) => r.textContent.trim().replaceAll(/\n */g, ""))
	.forEach((r) => {
		if (isNaN(Date.parse(r))) {
			if (r.includes("from") && !r.includes("failed")) {
				r = r.match(/\(([0-9]*) (year|month|week|).*?of (.*?)([0-9.]*?)\)/).slice(1);
                r[0] = Number(r[0])
                r[3] = Number(r[3])
                if (r[1] == 'month') {
                    r[0] *= 4 + (1/3)
                    r[0] = Math.round(r[0])
                    r[3] /= (4 + (1/3))
                }
                if (r[1] == 'year') {
                    r[0] *= 52
                    r[3] /= 52
                }
                r[3] /= f[map[r[2]] || r[2]]
				obj[curr].push([r[0],r[3]]);
			}
		} else {
			curr = week(Date.parse(r));
			if (obj[curr] == undefined) obj[curr] = [];
		}
	});
// Align to zero
obj = Object.fromEntries(Object.entries(obj).map(e => [Number(e[0]) - Number(Object.keys(obj)[0]), e[1]]))
let two = {}
Object.entries(obj).forEach(([k,v]) => {
    v.forEach(v => {
    	for (let i = Number(k); i < Number(k)+v[0]; i++) {
    		if (!two[i]) two[i] = v[1]
    		else two[i] += v[1]
    	}
    })
})
console.log(Object.entries(two).map(row => row.join(',')).join('\n'))
```

And...

![[Pasted image 20240404001335.png]]

