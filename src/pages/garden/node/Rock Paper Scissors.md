---
title: How Good Can Computers Be at Rock Paper Scissors?
description: Can you outrandom a random number generator?
---

Rock Paper Scissors is quite possibly the simplest mind game. With a perfectly random opponent, the odds of winning are exactly 50/50. The "mind" part of the game is derived from the fact that humans are [awful](http://www.loper-os.org/bad-at-entropy/manmach.html) sources of entropy, and as such it is quite productive to guess your opponent's next move.

When your opponent is a *computer* acting with a naive random number generator, the problem becomes a lot more difficult. You can't *play* a perfectly random number generator — there is no guessing what it will do next. If you asked a number of people to compete with each other to create the best rock paper scissors' algorithm, there would be little incentive to naturally deviate from the obvious, easy and strong algorithm. The whole premise of a competition to create the best rock paper scissors robot feels like satire, except that's exactly what happened in the [1999](https://groups.google.com/g/comp.ai.games/c/qvJqOLOg-oc) ["RoShamBo Programming Competition"](https://web.archive.org/web/20180719050311/http://webdocs.cs.ualberta.ca/~darse/rsbpc2.html).

The rules of this competition were as follows:

1. "The most successful programs will recognize a variety of patterns and relationships, and use that information to gain an advantage over each opponent, without being susceptible to similar attacks."
2. Programs will be only be given the complete history of the match against the current opponent.
3. The length of each match will be between 100 and 10000 rounds
4. You may not access private competition procedures and memory
5. You may not set the random number seed

Given that the random number generator is theoretically unbeatable, the organizers inserted random, flawed players into the competition. Furthermore, the entrants were pitted against each other. The winners were simply the programs that did the best analysis of the strategy being used by its opponent. 