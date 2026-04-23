![[Pasted image 20240820124128.png]]
So we installed Windows 7
![[Pasted image 20240820124157.png]]
The process after this step was... complicated. Internet Explorer struggles to connect to the internet, so we need to share local files between the host and the client. To do this, we need SPICE tools. The "Install Windows Guest Tools" button did not work, so I would need the manual download listed [here](https://docs.getutm.app/guest-support/windows/), but we can't reach this page!

In a moment of genius, I spun up a web server on `192.168` to serve the file over HTTP. Unfortunately, after installing it WebDAV still wasn't working. After a lot of pain, I installed SPICE [via the spice-space](https://www.spice-space.org/download.html) website as well, and we were in:

![[Pasted image 20240820124225.png]]
Naturally, the Spotify API has changed since 2012, so logging in did not work, but I thought our good friend [[Be(ing)Fake|MITM Proxy]] might help. I quickly configured the proxy, and tried installing the HTTPS certificate. The windows GUI wasn't working — when prompted for a password leaving the field blank as instructed did not work, but I managed to do it via the command line. Unfortunately, as I tried to log in, I was disappointed by how quiet it was. Is this it? Is this all there is to life?
![[Pasted image 20240820125812.png]]
No. Some applications do not respect the proxy. MITM offers a transparent mode, but this is quite difficult to configure. Instead, I opted for the new WireGuard mode, but WireGuard was struggling to install:
![[Pasted image 20240820130001.png]]
[Superuser](https://superuser.com/questions/1492060/procedure-entry-point-setdefaultdlldirectories-could-not-be-located-kernel32-dll) told me that I'd need an update from [here](https://www.catalog.update.microsoft.com/Search.aspx?q=KB4457144), and after very little fanfare the glorious progress bar pulled to the other side,
![[Pasted image 20240820130158.png]]
And the installation went perfectly:
![[Pasted image 20240820130226.png]]Configuration was just as pleasing, and soon I was getting some *real* traffic.
![[Pasted image 20240820130934.png]]
First, the client connects to `http://apresolve.spotify.com/`, which returns a list of endpoints:
```
{
    "ap_list": [
        "ap-gue1.spotify.com:4070",
        "ap-gue1.spotify.com:443",
        "ap-gue1.spotify.com:80",
        "ap-guc3.spotify.com:4070",
        "ap-gew1.spotify.com:443",
        "ap-gew4.spotify.com:80"
    ]
}
```
Shockingly, the client picks one and connects, and there is a TCP exchange, which unfortunately I cannot read:
![[Pasted image 20240820131425.png]]
Wireshark might be of help, you might think to yourself. I'm here to tell you that you're wrong — spotify has its own wire protocol that they've written about here 