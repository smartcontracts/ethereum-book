---
title: "Foreword"
---

# {{ $frontmatter.title }}

## A bit of history on the book

*Kelvin's Ethereum Book* has been a work in progress for several years. I originally started work on this project in late 2019 while taking a year off from more traditional employment in the crypto space. At the time, this project was being kept alive with funding from the Quilt team over at [ConsenSys](https://consensys.net/) and later with a grant from [MolochDAO](https://molochdao.com/). I'm forever grateful to both groups for taking a chance on this effort.

Work on this project stalled in 2020 when some things changed in my personal life and I mostly ran out of money. I ended up taking a full-time job as a software engineer (and/or benevolent chaos monkey) at [Optimism](https://optimism.io) which, at the time, was a tiny startup that needed a lot of attention. I no longer had the time and energy to commit to a project like this, and the project mostly went abandoned.

Still, I felt a strong responsibility to eventually return to the project when I was finally able to do so. It's been about two years now, and Optimism is finally at a place where I feel like I can start to build things outside of work again. When thinking about what side-projects to tackle next, *Kelvin's Ethereum Book* was the obvious first choice. Writing a book is *hard*. I've always hoped I would be able to say that I'd been able to write a book. So work on *Kelvin's Ethereum Book* begins again.

## What this book is about

Kelvin's Ethereum Book is... a book about Eth2. It's also much more than that. When I first started working on this project, the idea was to create a resource that explained Eth2 to developers who were already quite familiar with Eth1. However, it quickly became clear that explaining Eth2 in a vacuum like this is only useful to the small group of people who already have access to the resources necessary to learn more about Eth2. Eth2 is also quite a departure from the origins of Ethereum (even though some of the core concepts still apply) and there's a requirement to return to some of the more traditional ideas in distributed systems to really understand the protocol design.

I also felt like this was a great opportunity to create a resource that could help lots of new people dive into Ethereum. So I changed the scope of the project and tried to go for something much bigger. Kelvin's Ethereum Book is now an introduction to Ethereum as it will be when Eth2 goes live. It's meant to be a complete overview of consensus, blockchains, and the way in which Ethereum applies these concepts to create something truly amazing.

## On the general state of the book

Currently, the book is mostly unpolished and unedited. Large portions of the skeleton of the book have been filled in, but there are likely to be many missing details, spelling errors, and grammatical mistakes. My philosophy in writing this book has been a "breadth-first" approach as I find that overall content structure and layout is the most important part of an educational work. Smaller details, like headings, links, citations, etc., are best to be left toward the end of the project (lest we remove an entire section and waste a significant amount of effort).

I still feel this is the right way to work on a project of this magnitude, but I acknowledge that it may make parts of the book hard to read in its current state. I hope that by making the work public I can start to crowd-source a lot of these smaller details. Anyway, this is all to say that the book is definitely not complete in any sense of the word and I hope you'll bear with me as the kinks get worked out.

It's also worth noting that Eth2 has changed quite a bit since this project was started. Some parts of this book (particularly in the later chapters) are likely wholly inaccurate or outdated. As referenced in the above section regarding the Eth2 rebrand, it's a top priority to review the book for any inaccuracies and to make sure that it matches the narrative around Eth2 as it stands today.

## How this book is being written

I originally wrote this book alone (inside of a private repository). I spent most of my time for a period of about six months sitting in front of my computer staring at this book. I wrote most of my first drafts on paper -- I have a stack of dozens of sheets of hand-written drafts sitting somewhere in my house. I thought this was the only way to write, but then again I'd never written a book before.

I found that this approach to writing was somewhat lonely. With a subject as complicated as Eth2, it's important to get lots of eyes on your content. Much of the information related to Eth2 is still sitting in the heads of just a few people (although the extent to which this is true has been reduced significantly since I first started writing the book). I also found that there was little pressure to keep pushing on the project when things got difficult. I figured that I needed a new way to write this content on my second attempt.

As a result, I'm now writing all of this content out in the open. I plan to make this my primary project outside of Optimism for the foreseeable future. You can view the entire [source for this book on GitHub](https://github.com/smartcontracts/eth2-book). You're more that welcome to make edits to this content by submitting pull requests. You should be able to find links to edit this content at the bottom of each page.

## Contributing

Any and all contributions to this work are very much appreciated. I would love for this to be a collaborative effort. As a way of saying thank you to contributors, I will be creating hand-drawn NFTs for everyone who submits suggestions, edits, or other similar contributions (on Optimism, because I'm biased and also because it's way cheaper than sending NFTs on L1 and I'm not made of money). You'll also be credited as a contributor within the book itself.

If you're interested in contributing frequently, I've set up a [Telegram group](https://t.me/+QdbYrQtP0zE3ZDVh) to coordinate the project. As far as the contributing process goes, here are my initial thoughts:

- For small typos and other similar minor corrections, please make a [pull request](https://github.com/smartcontracts/eth2-book/pulls) that includes the change. I'll usually merge these without any back-and-forth, assuming the correction is correct.
- For larger suggestions (like comments about inaccuracies, content structure suggestions, etc.), please start by creating an [issue](https://github.com/smartcontracts/eth2-book/issues) so that I can review the change before a pull request gets made. I may have thoughts on the subject and I don't want to waste your time with a pull request until we've been able to come to consensus about the validity of a larger change.

## A quick note on the Eth2 rebrand

Long after work on this project started, [the Ethereum community rebranded "Eth2" to refer to the new consensus layer](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) instead of using Eth2 as the name for the entire system itself. I have no strong opinions on the change, but this does now mean that it's necessary to go back and edit large parts of this work. Conveniently, this is a great excuse for going over the entire book to do some edits. I think this is probably an important first task to start working on now that the book is public.

You will likely see parts of this book change quite significantly as I attempt to reframe things to refer to the ["Ethereum Upgrades"](https://ethereum.org/en/upgrades/) and try to limit usage of the term "Eth2". Of all the things that were subject to change when I started working on this project, a new name for the whole thing wasn't something I really expected. I'm currently debating whether or not "Kelvin's Ethereum Book" is still a good name for the project. Who knows!

## Acknowledgements

First of all, I'd like to thank the Quilt team over at [ConsenSys](https://consensys.net/) for taking a chance on this book in 2019. I was very particular about my writing style and I appreciate all of the patience I received with reviews and feedback from the Quilt team. I'd like to thank [Will Villanueva](https://twitter.com/wjvill), [lightclients](https://twitter.com/lightclients), and [Ben Edgington](https://twitter.com/benjaminion_xyz) for acting as editors and reviewers for the project in 2019 and 2020.

I'd also like to thank [MolochDAO](https://molochdao.com/) for giving me a generous grant in 2020 when the project moved away from funding via ConsenSys. I felt that I hadn't lived up to the grant when the project came to a halt, but I hope that I can pay that grant forward by finally turning this into a useful resource for the Ethereum community as a whole.

This list is not complete and will be updated heavily as time goes on. I'll do my best to make sure that everyone who's contributed to this effort is reflected here. For now, enjoy the book!