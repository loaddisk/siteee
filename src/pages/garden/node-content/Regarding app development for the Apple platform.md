---
in: blog (draft)
tags: [swift, development, operating-systems, app]
---

On November 1st, I wrote my first line of Swift, as I begun work on [[Love Your Music]]. This is a little shocking, for two reasons. I bought my first Mac on March 24th, 2023, after my previous device gave out in little over a year, and I bought my first iPhone on September 22nd, the same day it became available. It’s a little surprising, then, that I break ground on an iPhone app little over a month after first laying my hands on the damn thing. Well, what can I say, I’m an opportunist. The second surprise is my timeline. In those 3 months, between then till now, I’ve grown accustomed to swift, refactored my codebase a number of times, and ultimately released my first app, with a codebase consisting of 10k lines of low duplication code. For these reasons, I feel particularly qualified to write on the holistic _experience_ of development for the apple platform, for those who are themselves beginning on this journey.
## Catalyst

As a consumer (and, as we’ll later see, developer), a particularly frustrating part of the Apple platform is the inability to sideload. Usually, I am content making _rough_ tools for myself: They do what I need, fail in ways only I understand, and may be published souly because “why not”.

::: details A developer’s perspective on sideloading

> **[[PenPen]]'s Note**: See [[Private APIs]], below is a summary:

Aside from the new perspectives discussed here and later on, one additional advantage to sideloading is the potential of private APIs. It’s my understanding that these were once absolutely unprotected, aside from human review. In 2018, SourceDNA identified hundreds of apps utilizing these APIs to extract people’s AppleID email. Soon after, SourceDNA was acqui-hired into the App Store review process, and Apple began locking down access to these APIs, as they should have from the very beginning. For what it’s worth, android has been doing similar, but I imagine the permission model was always stronger, as from the very beginning it’s supported sideloading. So anyway, when Apple says "sideloading is a security risk", what they mean is "our private APIs are not all properly protected yet, and we cannot vet sideloaded applications in the same way we can with vet app store applications." But obviously, if private APIs are something that apple cares so deeply about, there must be something good in there! And indeed, there is, and there always has been (in early iOS, developers bought & sold components made to mirror Apple’s own, and ranted about App Store rejections caused by such a good intimidation that apple thought they must be using private APIs). Three modern examples I’m familiar with is displaying Memojis, the progressive blur found in the Apple Maps navigation bar, and the ability to read the now playing track. Sideloading would open the possibility of new “supercharged” apps, as is already common on macOS (ex Things, rcmd)

:::

On iOS, when you make an app without a developer account, the app has 7 days to live on your device before it must be rebuilt. The app I’m making, out of personal necessity, ideally should not be removed every 7 days. So I need a developer account. And that costs money – 100$ a year. And so, I need to make something people want to use. A nice step outside my comfort zone. This introduces many challenges! Good fun! I’m actually thankful in this way. Now I have a business. Thanks Apple, I suppose.

## SwiftUI

When you say “I want to make an iOS app”, you immediately are blasted with a difficult choice: How? You have React Native and Flutter as cross-platform options, and UIKit and SwiftUI as apple specific options. I think the pros and cons can be inferred pretty easily here, at least between native and cross-platform. Between UIKit and SwiftUI, however, it's a little harder. SwiftUI is Apple’s new framework, which is generally much more productive and familiar to developers that have some proficiency in Reactive programming. There are many cons, however.
### The cons of SwiftUI

SwiftUI is a newer framework, and Apple has a ridiculous reluctance to back port even the most trivial new features to older iOS versions, which is annoying on so many levels. Take `ContentUnavailableView`, a simple component to create 404 pages. To use this, you need to use iOS 17 (especially as few people make polyfills). Another pain: noticing an API is deprecated in iOS 17, but you can’t do anything to prepare for that, because you want your app on iOS 16. It goes the other way too. Imagine the feeling of disappointment when you find code to do what you need, but it relies on new features (SwiftUI is ultimately a UIKit wrapper, so there are absolutely things you **cannot** do, at least without diving in deep)

By far, the easiest solution is to simply exclusively support the latest iOS version, given how much SwiftUI is still in flux, which is ridiculous. Each iOS release guarantees you’ll want to refactor something. My personal advice: Start with iOS 16. With the new navigation APIs, it really feels like SwiftUI 1.0.

And the second issue: SwiftUI plays pretty well into UIKit (and is actually built on top of it), so you get pretty good support for primitives. You also have some pretty great high level APIs. The problem is, these high level APIs offer no escape hatches. Say you want a scrollable page. You have two options, `ScrollView` and `List`. `ScrollView` is the primitive, and lists offer so many quality of life additions on top of it, like swipe actions and reasonable styling for _a list_. You can’t put Lists in `ScrollView`s, so if you want multiple types of content on a page, one of those being a list of things, you’re screwed. Choose your _single_ list style for the whole page, or reimplement the thousands of custom lines of code that went into that List component.

Also, some quality of life features aren’t always desirable, and there is no opt out. For instance, If you use a list, `NavigationLink`s will automatically expand to make the whole row clickable, and there’s little you can do to change that. After acquiring any sort of SwiftUI proficiency you’ll _easily_ be able to tell exactly how any app is built, which isn’t the case for web applications.

If SwiftUI provided sane defaults (which to some degree, it does), _and_ allowed the user to override all of these defaults (not even close right now), _and_ those defaults were well documented and consistent, I wouldn’t have a problem.

Ooh documentation. Apple’s infamous for poor documentation. It’s basically their trademark, and SwiftUI is absolutely no exception. The docs feature next to no previews, the examples are often outdated or nonexistent, and the state of _community_ documentation is also terrible, both given how rapidly things are changing, and the relative size of the community as opposed to that of web frameworks like React. Take the new Observation framework in iOS 17, a replacement for ObservableObject with better performance and better DX. There is almost _zero_ coverage of this, from Apple or otherwise.

I’ve found I’m most productive now, having identified a couple open source SwiftUI repositories of a reasonable quality to inspect, as opposed to googling solutions to my issues. Another pro tip is those WWDC videos. Those are actually closer to proper documentation than the real documentation.

One especially frustrating lack in the documentation is coverage of magic defaults. There’s a lot of them. Take `.padding()`. It does what it says, it does give you padding, but apple refuses to elaborate on _how much_ padding it will give you. I like these defaults actually, but if there are defaults, it is imperative that the behavior of them is well documented.

My app doesn't *seem* particularly complicated, but I've uncovered so much more than I would fancy to do seemingly trivial things. For instance, [did you know that `Text` nodes are *actually* web browser wrappers? ](https://www.cocoanetics.com/2012/12/uitextview-caught-with-trousers-down/)?

![[Pasted image 20240226021152.png]]

Imagine my surprise when the unexpected Times New Roman hit. Everything is built upon layers and layers of cruft, and it *will* bite you. When it does, expect Apple to fight you, in some desperate attempt to hide their sins. Of course, this fight will just make your life that much harder.

To sum it up:

> “Hey I got 90% of what I wanted really quick! Neat!” “…oh turns out that last 10% is basically impossible, eh?”
> -- Adam Kaump

Here is a collection of rants:

-   https://tonsky.me/blog/swiftui/
    -   https://news.ycombinator.com/item?id=22413355
-   https://news.ycombinator.com/item?id=31504354
    Here are the best superficial resources I’ve found:
    And here are some resources that dive a little deeper;
-   https://swiftui-lab.com/

So all in all, I much prefer web development, however, while making a mobile app, I would much rather make a mobile app, if that makes sense, so I don’t regret choosing SwiftUI. I just wish Apple would stop pretending that they are just making SwiftUI for themselves, and realize there is a massive community of developers without the luxury of just diving into its proprietary source code.

### The mistakes

I figure I might as well document some early pitfalls in my app, so you can avoid them:

- ! Assertions are very bad. Much crash! You have a lot of great tools at your disposal to avoid them (`if let`, `Optional.map`, `Optional.flatMap`, `try?`)
- Whenever you see a combine style network request, I would refactor it to async. Async in swift is really good actually. `async let` is an amazing feature. For simple things you can actually avoid combine pipelines entirely using `didSet`. Unfortunately, for pipelines involving more advanced stuff like debouncing, you're better off with combine.
- When you see `ObservableObject` in tutorials, refactor it to `Observable`. Observable is a replacement API that is much more efficient, poorly documented, and easy to use.
- It’s unclear how to combine Observable with Combine. My `ViewModel`s using Combine are still using `ObservableObject`
- Make your views small. Better for performance, better for ergonomics.
- Use the Swift package manager, as opposed to cocoapods.
- Localization is really easy and worth at least starting on.
## Interlude: cross-platform/FFI

It just so happens that my app does more client side work than simply parsing a JSON response from my server. This causes two problems:

Cross-platform requires maintaining two codebases — Swift and Kotlin. As a solo developer, that’s a no-go. Additionally, I was experiencing performance issues in my swift codebase, arising from the quality of the packages I had to use. I took a risk, and decided to kill two birds with one stone. Rust has a strongish FFI community, and plenty of packages with strong corporate backing. I heard cautionary tales of Dropbox abandoning their shared C++ codebase, but I don’t have an arsenal of employees at my disposal, rust’s ecosystem makes it uniquely suited to the task, and I’m confident that I’m more productive in Rust than I would have been in C++. I decided to take the risk, and I’m happy to report it paid off. Setup was discouraging, but once completed, the work to share both codebases is negligible. I’ve already written a blog post on the topic of FFI setup for swift, you can find it [[UniFFI|here]]
## Welcome to the App Store
The App Store has some pretty strict policy that [[Private APIs|does not apply to large corporations]], but will apply to you. Here are some rules that jumped out to me:

-   If users can create accounts in your app, they must be able to delete them
-   You are not allowed to use Private APIs. If you are, you’d know.
-   You will need to write a privacy policy
-   User generated content must have a report button

A couple questions you’ll need to ask if you’re joining the developer program:

-   Do I want my developer account to be the same as my personal account?
-   Do I want to join as a corporation or an individual?

I’m not particularly qualified to speak under either one of these points, though I ultimately chose a company account. Some things:

-   I did this without legal counsel
-   If you go this route, in no particular order, you will need some address you trust to receive mail, a DUNS number, an EID, the actual LLC, forms for the corporate transparency act, a bank account, and a website. My company is [Toastcat](https://toastcat.club/).
-   If you are the only employee, it will be taxed as a sole proprietorship, which means taxes are a little bit easier.

I am now technically a tech entrepreneur. Currently, I have invested 631.11$ into this project. I have provided a cost breakdown:

| Name | Cost |
| -------- | ---- |
| TOASTCAT LLC – MA Certificate of Organization | 520$ |
| Apple Developer Program Membership | 100$ |
| toastcat.club – CF Domains | 11.11$ |
| **Total:** | 631.11$ |

### App Store Review Process

## Marketing

I have a number of marketing strategies for my app, all of which cost me nothing. During development, I kept in touch with a Music community I am friendly with, keeping them updated on progress. I recorded those who mentioned being interested:

![[Pasted image 20240226024906.png]]

And mentioned to all of them that I was entering a private beta, with the hopes they would become early users.

In addition, as my app is for the Rate Your Music community, when I launched it I marketed it in appropriate places within their forums.

Finally, I placed flyers outside of record stores. This is an ideal demographic – obvious music enthusiasts who are willing to spend money on their hobby. I also live in close proximity to various colleges and concert halls. I intend to place flyers there as well.

![[Pasted image 20240226030317.png]]

### Analytics
My app has very little analytics, beyond what Apple provides me. The flyer QRCodes are geotagged, but that's about all I have for understanding referral sources. I decided to link directly to the app store, as opposed to my marketing page. I theorize this leads to more conversions.
## Sales
After some amount of time, I will report the sales data. Stay tuned.
### Pricing
I don't want ads or subscriptions, from a purely philosophical standpoint. Even if I didn't hate their one of those options, I still would not want to go with it. My app is ultimately a frontend for another site, one with it's own ads and subscriptions. I cannot integrate their ads into my app, and I think adding my own ads or my own subscription on top of that would be rude. A one time purchase makes my place in this very clear, I think. I may offer in-app purchases to add extended functionality for film and game reviews. Maybe. We'll see.
## I can help
I am willing to provide support over email for new developers on a beerware basis. I won't pretend 