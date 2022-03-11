# The Eth2 Book

## Some background

I started working on this book on Eth2 more than two years ago while taking a year-long leave of absence from more traditional work in the crypto space.
The Quilt team over at [ConsenSys](https://consensys.net/) was kind enough to sponsor development of this work for a period of several months.
I also recieved a grant for parts of this book via [MolochDAO](https://molochdao.com/) for which I'm extremely grateful.
Unfortunately, I wasn't able to finish the book before I ran out of money and turned back towards full-time employment (with [Optimism](https://www.optimism.io/), where I still currently work).

This book has sat in a private GitHub repository for far too long now, waiting to be finished one day.
I'm now back on my feet financially, and I feel a responsibility to complete the work that I started.
I never released this work publicly because I felt it needed to be more polished in order to be useful (and there's perhaps always a sense of embarassment about showing others your unedited writing).
I've since changed my mind about how a book like this should be developed.
I do all of my other development out in the open, why should this be any different?

I've therefore decided to open this repository up and show it to the world.
Maybe the only impact of making this public will be to force myself to work on it more regularly.
Hopefully, though, others will read through this make suggestions and improvements that make the book better than anything I could've worked on by myself.
Who knows what the result of this will be, but I'm committed to creating a resource that will help people understand Ethereum (and Eth2 in particular) in much more detail.
Let's give the Eth2 book another shot!

## But what is it?

The Eth2 book is... a book about Eth2.
Of course, it's also much more than that.
When I first started working on this project, the idea was to create a resource that explained Eth2 to developers who were already quite familiar with Eth1.
However, it quickly became clear that explaining Eth2 in a vacuum like this is only useful to the small group of people who already have access to the resources necessary to learn more about Eth2.
Eth2 is also quite a departure from the origins of Ethereum (even though some of the core concepts still apply) and there's a requirement to return to some of the more traditional ideas in distributed systems to really understand the protocol design.

I also felt like this was a great opportunity to create a resource that could help lots of new people dive into Ethereum.
So I changed the scope of the project and tried to go for something much bigger.
The Eth2 book is now an introduction to Ethereum as it will be when Eth2 goes live.
It's meant to be a complete overview of consensus, blockchains, and the way in which Ethereum applies these concepts to create something truly amazing.

## A quick note on the Eth2 rebrand

Long after work on this project started, [the Ethereum community rebranded "Eth2" to refer to the new consensus layer](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) instead of using Eth2 as the name for the entire system itself.
I have no strong opinions on the change, but this does now mean that it's necessary to go back and edit large parts of this work.
Conveniently, this is a great excuse for going over the entire book to do some edits.
I think this is probably an important first task to start working on now that the book is public.

## On the general state of the book

Currently, the book is mostly unpolished and unedited.
Large portions of the skeleton of the book have been filled in, but there are likely to be many missing details, spelling errors, and grammatical mistakes.
My philosophy in writing this book has been a "breadth-first" approach as I find that overall content structure and layout is the most important part of an educational work.
Smaller details, like headings, links, citations, etc., are best to be left toward the end of the project (lest we remove an entire section and waste a significant amount of effort).

I still feel this is the right way to work on a project of this magnitude, but I acknowledge that it may make parts of the book hard to read in its current state.
I hope that by making the work public I can start to crowd-source a lot of these smaller details.
Anyway, this is all to say that the book is definitely not complete in any sense of the word and I hope you'll bear with me as the kinks get worked out.

It's also worth noting that Eth2 has changed quite a bit since this project was started.
Some parts of this book (particularly in the later chapters) are likely wholly inaccurate or outdated.
As referenced in the above section regarding the Eth2 rebrand, it's a top priority to review the book for any inaccuracies and to make sure that it matches the narrative around Eth2 as it stands today.

## Contributing

Any and all contributions to this work are very much appreciated.
As a way of saying thank you to contributors, I will be creating hand-drawn NFTs for everyone who submits suggestions, edits, or other similar contributions (on Optimism, because I'm biased and also because it's way cheaper than sending NFTs on L1 and I'm not made of money).
Your input is what will drive this whole thing to completion!

As far as the contributing process goes, here are my initial thoughts:

- For small typos and other similar minor corrections, please make a [pull request](https://github.com/smartcontracts/eth2-book/pulls) that includes the change. I'll usually merge these without any back-and-forth, assuming the correction is correct.
- For larger suggestions (like comments about inaccuracies, content structure suggestions, etc.), please start by creating an [issue](https://github.com/smartcontracts/eth2-book/issues) so that I can review the change before a pull request gets made. I may have thoughts on the subject and I don't want to waste your time with a pull request until we've been able to come to consensus about the validity of a larger change.

## Content structure

Below is the current structure of the book.
This structure is highly subject to change as development on the book progresses.

<pre>
book
├── <a href="./book/00__introduction">Introduction</a>
│   ├── <a href="./book/00__introduction/00__index.md">Index</a>
│   ├── <a href="./book/00__introduction/01__motivation.md">Motivation</a>
│   └── <a href="./book/00__introduction/02__content.md">Content Overview</a>
├── <a href="./book/01__consensus">Consensus Mechanisms</a>
│   ├── <a href="./book/01__consensus/00__index.md">Index</a>
│   ├── <a href="./book/01__consensus/01__origins.md">Origins</a>
│   ├── <a href="./book/01__consensus/02__crash-faults.md">Crash Faults</a>
│   ├── <a href="./book/01__consensus/03__byzantine-faults.md">Byzantine Faults</a>
│   └── <a href="./book/01__consensus/04__applications.md">Applications</a>
├── <a href="./book/02__blockchains">Blockchains</a>
│   ├── <a href="./book/02__blockchains/00__index.md">Index</a>
│   ├── <a href="./book/02__blockchains/01__digital-cash.md">Origins</a>
│   ├── <a href="./book/02__blockchains/02__open-access.md">Open Access</a>
│   ├── <a href="./book/02__blockchains/03__chains-of-blocks.md">Chains of Blocks</a>
│   ├── <a href="./book/02__blockchains/04__fork-choice-rules.md">Fork Choice Rules</a>
│   ├── <a href="./book/02__blockchains/05__applications.md">Applications</a>
│   └── <a href="./book/02__blockchains/06__participants.md">Participants</a>
├── <a href="./book/03__eth1">Eth1</a>
│   ├── <a href="./book/03__eth1/00__index.md">Index</a>
│   ├── <a href="./book/03__eth1/01__basics.md">Basics</a>
│   ├── <a href="./book/03__eth1/02__state.md">State</a>
│   ├── <a href="./book/03__eth1/03__transactions.md">Transactions</a>
│   ├── <a href="./book/03__eth1/04__evm.md">The Ethereum Virtual Machine</a>
│   ├── <a href="./book/03__eth1/05__blocks.md">Blocks</a>
│   ├── <a href="./book/03__eth1/06__fork-choice-rule.md">Fork Choice Rule</a>
│   ├── <a href="./book/03__eth1/07__clients.md">Clients</a>
│   └── <a href="./book/03__eth1/08__scaling.md">Scaling</a>
├── <a href="./book/04__eth2-overview">Eth2 Overview</a>
│   ├── <a href="./book/04__eth2-overview/00__index.md">Index</a>
│   ├── <a href="./book/04__eth2-overview/01__historical-context.md">Historical Context</a>
│   ├── <a href="./book/04__eth2-overview/02__project-philosophy.md">Project Philosophy</a>
│   ├── <a href="./book/04__eth2-overview/03__key-concepts.md">Key Concepts</a>
│   ├── <a href="./book/04__eth2-overview/04__development-process.md">Development Process</a>
│   └── <a href="./book/04__eth2-overview/05__learning-goals.md">Learning Goals</a>
├── <a href="./book/05__proof-of-stake">Proof of Stake</a>
│   ├── <a href="./book/05__proof-of-stake/00__index.md">Index</a>
│   ├── <a href="./book/05__proof-of-stake/01__core-concepts.md">Historical Context</a>
│   ├── <a href="./book/05__proof-of-stake/02__basic-operation.md">Project Philosophy</a>
│   ├── <a href="./book/05__proof-of-stake/03__fork-choice.md">Key Concepts</a>
│   ├── <a href="./book/05__proof-of-stake/04__long-range-attacks.md">Development Process</a>
│   ├── <a href="./book/05__proof-of-stake/05__casper-ffg.md">Development Process</a>
│   └── <a href="./book/05__proof-of-stake/06__weak-subjectivity.md">Learning Goals</a>
├── <a href="./book/06__building-blocks">Eth2 Building Blocks</a>
│   ├── <a href="./book/06__building-blocks/00__index.md">Index</a>
│   ├── <a href="./book/06__building-blocks/01__bls-signatures.md">BLS Signatures</a>
│   ├── <a href="./book/06__building-blocks/02__randomness.md">Randomness</a>
│   ├── <a href="./book/06__building-blocks/03__ssz.md">Simple Serialize (SSZ)</a>
│   ├── <a href="./book/06__building-blocks/04__committees.md">Committees</a>
│   └── <a href="./book/06__building-blocks/05__deposit-contract.md">The Deposit Contract</a>
├── <a href="./book/07__beacon-chain">Beacon Chain</a>
│   ├── <a href="./book/07__beacon-chain/00__index.md">Index</a>
│   ├── <a href="./book/07__beacon-chain/01__validator-life-cycle.md">Validator Life Cycle</a>
│   ├── <a href="./book/07__beacon-chain/02__validator-duties.md">Validator Duties</a>
│   └── <a href="./book/07__beacon-chain/03__structure.md">Structure</a>
└── <a href="./book/99__dev">Miscellany</a>
    ├── <a href="./book/99__dev/00__index.md">Index</a>
    ├── <a href="./book/99__dev/01__sources.md">Sources</a>
    └── <a href="./book/99__dev/02__notes.md">Notes</a>
</pre>
