---
path: "/chapters/blockchains/fork-choice-rules"
title: "Fork Choice Rules"
status: "0"
---

## Outline
- Reiterate problem statement
    - User sees multiple blocks or chains at the same time
    - Not possible to tell which came first, must use some other metric
    - Tool used to determine a chain to follow is fork choice rule
- Fork choice properties
    - Should be easy to compute 
    - Should reinforce economics of chain itself
    - Should be deterministic so clients can converge
- LCR
    - Simple, effective
    - Protocol explanation
- GHOST
    - More complex, accounts for more information when latency:block ratio is high (ommers)
    - Protocol explanation
    - Not actually used in Eth1 even though everyone thinks it is
- Others exist but not as frequently used
---

ok let's reiterate the problem. We previously mentioned that forks could happen when multiple people publish an update against the same state. This could happen by accident if two people find lottery tickets at the same time, but it could also happen deliberately. For instance someone could try to make a payment and then create a different chain that does not include the payment, effectively wiping the payment out if that otehr chain becoems the accepted one. It's actually not possible to tell whether a block jsut came really late or if the person made the block really late, since they look the same from info-theoretical standpoint. But basically the problem here is that someone might see two potential chains at some point and have to decide which chain is the "correct" one or something we often call "canonical." The strategy that someone uses to determine the canonical chain given a set of possible chains is called the fork choice rule.

Now fork choice rules need to have some particualr properties in order to be useful. An obvious first requirement is that they should be easy to compute. It should be possible to relatively qucikly determine from a list of forks without too much effort. This is really just a logical statement since we dont' want to add a bunch of extra work on the side of clients.

However the fork choice rule also should probably reinforce the requirements of teh chain to remain open and accessible. Part of this typically means that the fork choice rule is constructed so that it doesn't rely on a central party to tell you which fork is the correct one. You're typically able to determine this result for yourself simply by looking at the potential options. Howver its important to also note that clients don't necessarily need to follow the same fork choice rule in theory. It's really up to the client. Yet of course clients are going to want to agree on a chain or they won't be able to itneract since they have different histories.

We do want to generally guarantee that the economics of the system make sense. before we mentioned that people get rewarded for making proposals. A proposal is a block, and the reward for that block gets given to the creator within that very block. If the block is removed from the "canonical" list of a client, then the person doesn't get paid in the eyes of that client. They did not get that reward. So it makes sense that the immediate reaction for a fork choice rule is one that basically chooses forks based on whichever one has the most amount of cumulative effort on it. The idea is that since that chain did the most amount of cumulative work, we want to reward them. If you used any other metric, then suddenly doing the most work doesn't necessarily mean getting paid, which creates a weird disparity between the stated goals of the system and the actual functionality. 

So one of the simplest mechanisms for this is literally to just choose the chain with the most amount of cumulative work expended. When faced with a fork, you look at the total difficulty of the blocks within the possible chains. Whichever chain has the most work behind it is the "canonical" chain and clients pick that chain. This satisfies our properties because it's easy to check the difficulty given the block and it only relies on having the blocks. 

[LCR EXPLAINER]

Another reason we want this is that it becomes harder for someone to make a long distance fork as more blocks are created on the other chain. Since in order to become the winning chain they would need to do more work than the other chain, each new block added to the other chain means more work for the other person. Generally speaking, this means that in order to start outpacing the "main" chain, someone would need 51% of hash power. So anyone with 51% of ahsh power could theoretically, over time, build an alternative chain that becomes the main chain. One thing with this is that there are social considerations, hard to explain. Also, really the best you can get out of this is to wipe a transaction out of the other chain.

An alternative to LCR is called GHOST, which is sort of like LCR but takes uncles into account. The general idea of GHOST is that uncles on a block are actually sort of implicitly doing work on that block, even if they aren't part of the chain itself. If we dont take uncles into account, then we're ignoring the work expended and it effectively becomes wasted. This is especially necessary when uncles are more common like in blockchains with smalelr blocks and faster block times.

[GHOST EXPLAINER]

So GHOST basically makes it easier to determine forks when latency:block ratio is high. 

---