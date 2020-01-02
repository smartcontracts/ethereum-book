---
path: "/chapters/building-blocks/lmd-ghost"
title: "LMD-GHOST"
---


## Fork-Choice Rules
In any blockchcian system we need a way to determine what's the current head of the chain, mmeaning the current canonical chain. This is because it's opossible for there to be forks in the chain, and so we need to know which fork we're supposed to be following. We therefore create a "fork choice rule" that tells us which fork we're supposed to be following. This is basically an algorithm that looks at all of the forks and deterministically tells us which fork is considered the head of the blockchain.

## Longest-Chain Rule
The longst chain rule is one of the original fork choice rules. This rule is very simple, it basicall yjust says to follow whatever is the longest chain that we know of. This is simple and works well in the context of a proof of work blockchain because it takes a lot of effort to extend the chain. We usually modify this rule a little so it's not just the longest chain but the chain with the most work behind it, meaning we assume that the most money has gone into that chain.

The longest chian rule is very useful, but it does remain vulnerable to a few attacks. A key version of this attack is the selfish miner attack, which is effective ebcause of one key piece of information: the LCr does not take into account any uncle blocks! 

## GHOST

### Ideology
GHOST stands for Greedy Heaviest Observed Subtree, and its name is very revealing. Basically, the ideology behind GHOST is to take into account the value of uncle blocks. Uncle blocks are blocks that build upon one of the blocks in the canonical chain but are not part of the canonical chain itself. So although they don't extend the length of the canonical chain, we do see that this means that the person who created the block probably thought that the parent block was part of the valid chain, or they wouldn't have built upon it!

If we ignore this, then we ignore the work that person did when working on the block. This can have some interesting effects ont he chian, but it primarily just makes attacks easier for someone who wants to build their own chain.

### Functionality
Generalyl speaking, the way that GHOST works is that it assigns some weight to the amount of votes on uncle blocks of a chain, as well as the amount of votes on the canonical chain itself. This is different from LCR as LCR will only look at the votes (weight, work) on the canonical chain and will ignroe the uncle blocks. So the basic rules of the fork choice rule are as follows. Starting from the genesis block, we look at the *total* weight of all available forks of that block. Then we go down the tree with more weight. Rinse and repeat. Note here that the uncle blocks actually add weight to the trees!

As with any fork choice rule, it's possible to be indeterminate about which block to follow. In this case, we basically keep a list of potential head blocks, but don't actually pick the one we want yet. This is pretty much impossible for a PoW chain because it's almost impossible for two people to do exact the same amount of work. However, in PoS we have more discrete units of work ("one validator") so its' more likely.

### GHOST vs. LCR
GHOST and LCR often agree in their results. Take the following example. We can see here that LCR and GHOST agree about which block is the head of the canonical chain, so they're the same here.

However, they also sometimes disagree! take this example. We can see here that GHOST actually picks a different chain from LCR because the added weight of the uncle blocks causes us to pick a different subtree at step X, and then we end up on a different tree entirely.

## LMD GHOST

### GHOST in PoS
So the GHOST is fine in PoW, but we need to do some changes for PoS. Basically, the thing that makes GHOST work in PoW is that messages (blocks in this case) are expensive to create. You have to do a lot of computational work to create a valid block. However, messages in PoS are very cheap (they're just a signature). As a result, we need to modify this scheme so it doesn't just look at each message as a valid thing. Hence, latest-message driven GHOST. Instead of looking at every message, we only look at the latest message from each validator. The idea behind this is pretty simple, we basically want to prevent validators from being able to vote twice. If a validator votes for block X and then a descendent of block X, they're voting for block X twice. With this LMD system, we only count the vote once.

Besides only looking at the latest message, we also only allow validators to vote once within a single epoch. We will reject and slash validators if they try to make more than one vote in a signle epoch.

### Saved-Message Attacks
Although validators can only make one vote in a signel epoch, they can sitll make votes in different epochs obviously. OTehrwise the system wouldn't work. So there's a problem here whereby a validator could theoretically save up their votes by refusing to publish votes for a while, and then all of a sudden publish many votes at once. This would, effectively, allow te validator to have multiple votes counted for the same block! bad bad bad. This is actaulyl the basis of selfish mining attacks, where a validator goes silent for a while and then all of a sudden broadcasts all of this work theyve done, which the fork choice takes into account. This can clearly attack simple GHOST becuase the messages would each be counted.

This attacks LMD GHOST in a weird way. Although the validator is not able to create multiple votes for the same block, since we'll just take the latest message and therefore the attacker doesn't really get anywhere with this, the validator *can* actually do some weird stuff where they cause a flip-flopping in the heaviest chain by taking their vote on one block whihc makes it the subject of the fork choice rule, then flipping to a different block, meaning people wll be confused as to which block is actually the one that's going to be finalized later on. Basically the problem is that people will be split in their justificaitons, meaning finalizaiton will take a lot longer.

In order to prevent this sort of attack or at elast limit it, we add a rule to avoid stale justificaitons. The idea here is to say that we will only look at attestations from the current epoch or the previous epoch. This is a tighter synchrony condition, but it does have the nice property that people can't really cause this super long flip-flop attack anymore.

### Interactions with Casper FFG
So there are some interactions with FFG, basically. The core here is that FFG is responsible for finalization, but LMD GHOST is responsible for consensus of blocks that haven't been finalized yet. WHat this means is that we want to take into account finalization first and then LMD GHOST aftewards. How we do this is simple. We first want to find the last finalized block. Then we find the highest epoch justified block that is a descentent of this finalized block. Remember that justified does not mean finalized necessarily unless other conditons hold true as we discusser previously. Now once youve found this justified block, you run LMD GHOSt from here to find the head of the chain.

Let's look at an example of this. Let's say we have this structure, and this block is the last finalized block. Now we have a few other blocks taht ave been justified but not finalized because of our rules. Now we pick the highest epoch justified block, X in this case. We run LMD ghost from here and find that YYY is the head of the chain. COol.
