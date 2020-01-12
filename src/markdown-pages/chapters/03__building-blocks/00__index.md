---
path: "/chapters/building-blocks"
title: "Eth2 Building Blocks"
---

So let's get right into Eth2 why don't we. We are starting off with the core building blocks behind the Beacon Chain. Since the Beacon Chain is the main part of the Eth2 ecosystem before shards. 

We're going to talk about a few different things. First were going to explore the general structure of the beacon chain. The beacon chain is a little different from Eth1 in that it isn't just structured as a series of blocks. We'll expain later. We introduce core ideas like validators too and the main things that they have to do at a high-level.

Next we look at some of the tools validators use in Eth2. These are things like cryptographic tools necessary for making Eth2 a reality and the mechanism that Eth2 uses to select validators for their various roles. Basically, we're covering first how validators actually do what they need to do from a technical perspective and then we cover how the beacon chain choses certain validators to do these things.

After this we look at the ways that PoW has to change in PoS. These are mainly about things like coming to agreement about which blocks are the valid ones and which ones not to follow. This is because we always have forks in blockchain systems and we need to pick which fork to follow. We also talk about FFG, which is a system meant to create a sense of "finality" or irreversibility about specific blocks and punishes any validators who try to go back on their word.

These really form the core of the Beacon Chain. It's what allows the beacon chain to run properly.