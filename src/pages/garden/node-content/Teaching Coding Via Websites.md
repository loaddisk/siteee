---

---

I believe that websites are the best gateway into computer science, for a couple of reasons. They allow you to start small, the most basic websites could be constructed by a novice in under 15 minutes. They also have an essentially infinite ceiling, allowing for constant tinkering and refinement. Not only that, its essentially the most important thing one will make. It's essentially the most important project one will make. It's the one project guarenteed to stick with you throughout your whole career, but it is only there when you need it. My website has been transformative, and I attempt to give this gift to others.

This guide is targeted at *you*, likely someone who already has some programming ability. It assumes you've identified a promising pupil. This pupil will have next to zero programming experience, but demonstrates strong problem solving capabilities, and a strong willingness to learn. The goal of this guide is to help *you* facilitate their learning asynchronously, without holding the student's hand. The goal is for the "graduate" to still possess a relatively low level of skill, but to have gained the ability to vocalize problems they encounter and hopefully be able to find the resolutions themselves. The "graduate" should hopefully have gained a sense of direction, a path they can follow for themselves. Essentially, I want to teach you how to give them a small nudge through a door to infinite possibilities.

There are three main technical modules, that should each be conducted in a sitting of 15-60 minutes:

1. Making a website
2. Publishing a website
3. Programmatically generating websites

Between each module, you should continue to be a presence in the pupil's life as they work independently, building upon what they've learned in the prior module. During the lessons, you are driving the wheel, but outside the lessons, you should be "teaching to fish" (as opposed to providing solutions to problems, nudge them such that they can solve the problem for themselves).

## Making a website

Setup steps:

1. Guide them through installing VSCode
2. Guide them through installing Node.js
	1. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`
	2. `nvm install node`
3. Install a tool that will allow them to easily view their work in the browser
	1. `npm install -g sirv-cli`
	2. They *do not* need to understand the steps before this point.

Teaching:

1. Guide them through opening VSCode and creating a new directory
2. Tell them that there are three languages that work together to make websites
	1. HTML defines the structure
	2. CSS makes that structure pretty
	3. JavaScript makes the website interactive
3. Create the first index.html file. Write `!` and hit enter.
4. Guide them to open the terminal with `Cmd+\``. 
5. Write `sirv . --dev`, explain what sirv does, and all the parts of this command
6. Open the site in the browser. Get them to ask "how do I put content there". Don't tell them this question. Say something along the lines of "What do you think we should do next". Get their imagination going.