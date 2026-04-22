---
in: blog
date: 2023-01-01
---

Let me tell you what I wish I was doing. I wish I was in the harsh climate of Vermont, pummeling through the air on skis, dancing as snow crafts a new beginning. It wouldn't be hard to be doing that right now... I have already obtained a season pass, but here I find myself, wallowing in the comfort of my bed.

If I were to BeReal, at this moment, that would mean accepting and presenting myself as the couch potato I am. No, I would much prefer to put on an unhealthy facade, becoming the thing that the well meaning network swore to destroy. I am not real. Today, I will be fake. And I was prepared. You can be too.

Ok, I got a little carried away on this introduction. Yes, I am all of these things, but the real motivation was to see if I could upload a gif.

## The day before

I'll be honest. This was not an impulse decision. The day before, I fired up [mitmproxy](https://mitmproxy.org), intending to play around a bit. For those who don't know, mitm proxy is a penetration testing tool designed to help you perform [MITM Attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) on yourself so you can read and modify requests. I spun it up, and configured it as a proxy on my Android device.

BeReal was properly protected against this sort of attack, utilizing Certificate Pinning (via Android's TrustManager). Really though, that's just code. [Frida](https://frida.re) is an incredible tool that allows you to preform script injections on "black boxes" for a large variety of platforms (like Violentmonkey!). That includes (provided your device is rooted) android. Once a frida server is running on given device, you can launch any app with specific code that disables certificate pinning capabilities. I chose one from frida codeshare.

```shell
$ frida --codeshare akabe1/frida-multiple-unpinning -Uf com.bereal.ft --no-pause
    ____
   / _  |   Frida 15.2.2 - A world-class dynamic instrumentation toolkit
  | (_| |
   > _  |   Commands:
  /_/ |_|       help      -> Displays the help system
  . . . .       object?   -> Display information about 'object'
  . . . .       exit/quit -> Exit
  . . . .
  . . . .   More info at https://frida.re/docs/home/
  . . . .
  . . . .   Connected to Pixel 6 (id=~)
Spawned `com.bereal.ft`. Resuming main thread!
======
[#] Android Bypass for various Certificate Pinning methods [#]
======
[-] Chromium Cronet pinner not found
[-] Flutter HttpCertificatePinning pinner not found
[-] Flutter SslPinningPlugin pinner not found
[!] Unexpected SSLPeerUnverifiedException occurred, trying to patch it dynamically...
[!] Attempting to bypass uncommon SSL Pinning method on: okhttp3.CertificatePinner.check$okhttp
[+] Bypassing TrustManagerImpl (Android > 7) checkTrustedRecursive check: mobile.bereal.com
```

Just like that, I was logging every request from the BeReal app. I decided to intercept these requests, and submit a BeReal, so I could closely monitor the flow.

![[Pasted image 20221204233938.png]]

Basically:

First, BeReal POSTs to an endpoint (auth.bereal.team/token) with a refresh token
```json
{

    "client_id": "android",
    "client_secret": "---",
    "grant_type": "refresh_token",
    "refresh_token": "---"
}
```
And the server responds with a shortlived authorization token and a new refresh token
```json
{

    "access_token": "ey---",0a6da0
    "expires_in": 3600,
    "refresh_token": "DN---",
    "scope": "",
    "token_type": "bearer"
}
```
Good work for them! This is the proper way to do things.

Next, BeReal GETs an endpoint (https://mobile.bereal.com/api/content/posts/upload-url?mimeType=image%2Fwebp) that starts the upload process. That endpoint returns an array containing two firebase urls, one for the front camera and one for the back.

I tried changing the mimeType to a PNG, but it seems the only supported type is webp. (Remember the real reason for all of this — I wanted to upload a GIF as my bereal) I thought my plan was foiled, but, conveniently, you can do anything with WEBP! (it's a bit like PDF in this regard). I quickly converted both my images (a GIF and a PNG) into WEBP.

I tried to replace the real images with my own before they were uploaded (remember, we have been intercepting and selectively letting traffic through). When one of the uploads failed, I looked into the headers. I noticed `x-goog-stored-content-length` seemed to be the size of the original image in bytes. I changed it to the new one, but that also failed! BeReal has limited their image size to 1mb. I took my GIF, minified that, and turned it back into WEBP. 200kb now!

With both images uploaded, I relaunched BeReal, hoping to see my new post. I rashly disabled the interception, and the original image got reuploaded and posted in a fraction of a second. Rats.

Luckily, MITM proxy was still enabled. I noticed a final request, a POST to https://mobile.bereal.com/api/content/posts. I presume this wasn't originally fired because of the long long delay as I fumbled to replace the original image. That request basically looked like this

```json
{
    "backCamera": {
        "bucket": "storage.bere.al",
        "height": 2000,
        "path": "Photos/---/post/---.webp",
        "width": 1500
    },
    "frontCamera": {
        "bucket": "storage.bere.al",
        "height": 2000,
        "path": "Photos/---/post/---.webp",
        "width": 1500
    },
    "isLate": true,
    "retakeCounter": 0,
    "takenAt": "---",
    "visibility": [
        "friends"
    ]
}
```

## Gameday

So easy to read! Basically, just two references to the images we uploaded. Defeated by the excited app, I decided to put these requests into Insomnia and be more prepared tomorrow. To avoid the eager app, I decided not to use it (or rather not modify - only block - requests from it). I allowed it's call to auth.bereal.team/token, but nabbed the token and wrote it down. I then simulated the 4 requests (GET, PUT, PUT, POST) from insomnia using the new URLS and token. I took careful note to make sure the front/back references were correct. I relaunched bereal, knowing nothing bad could happen because I haden't even initiated a capture in the app today. It wouldn't try any funny biz. Lou and behold, there was my gif. Amazing.
