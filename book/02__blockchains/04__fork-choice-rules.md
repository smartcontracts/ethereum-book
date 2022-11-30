---
title: "Fork Choice Rules"
---

# {{ $frontmatter.title }}

In the previous section, we mentioned that forks occur when multiple published blocks reference the same previous state. We might face such an event by accident, perhaps if two blocks are published at approximately the same time. However, this could also happen on purpose, as would be the case if a malicious actor were attempting to create a fork in order to "remove" a payment from the chain generally accepted by other users. In either case, it's necessary that there be some mechanism that allows users to determine which fork is the correct or "canonical" one. We refer to such a mechanism as a "fork choice rule."

Fork choice rules are extremely important for the proper functioning of the underlying blockchain. Fork choice rules determine which chain is to be widely accepted and, therefore, which block producers are to be rewarded. A poorly designed fork choice rule can quite quickly lead to unexpected or undesired behavior on the part of both users and block producers.

All fork choice rules must have certain properties in order to be maximally useful. In keeping with the notion of openness and accessibility, fork choice rules should be easy to compute. Nodes should be able to select a canonical chain from a set of forks without significant computational effort. Furthermore, many protocol designers feel that fork choice rules should have limited reliance on external parties. Essentially, nodes should be able to execute the rule without needing to confer with some "trusted" central entity or group.

Perhaps most crucially, fork choice rules must reinforce the economic incentives within the system as a whole. Block producers are typically rewarded with some digital currency transaction contained within the blocks they produce. When a fork choice rule rejects their block, this reward transaction is no longer included within the canonical chain. Generally speaking, if the fork choice rule does not reward the producer who carried out the most computational work, then the direct link between voting power and resource expenditure is broken.

It's perhaps no surprise then that the earliest fork choice rules simply selected the chain with the most total work.

::: tip TODO
LCR explainer
:::

The longest chain rule has the effect that a competing fork can only become canonical once its total difficulty overtakes that of any other chain. Difficulty essentially acts as a proxy for resource expenditure, so we can say that the chain chosen by the LCR generally follows whichever parties control, jointly, more than half the total current hash power. The probability of producing a valid block increases with the amount of hash power dedicated to doing so. A group of miners with more than half total hash power will always be slightly more likely than any other group to find a valid block. Over time, this ensures with increasing probability that a minority chain cannot overtake a majority one.

One significant shortcoming of the longest chain rule is that it favors smaller groups with more hash power per member over larger groups with the same total hash power. This stems from the fact that a group working on many different blocks on the same chain can only produce a single block to be factored in by the LCR. The total rate of block production between the two groups will be approximately equal, as the first generates fewer blocks with higher frequency and the second many blocks with lower frequency. However, a larger percentage of these blocks become ommers and are thereby ignored by the LCR. The LCR effectively weighs the "winning" block as if only its producer, and not any others in the group, had performed any work to extend the target chain.

The alternative GHOST fork choice rule attempts to address this problem by accounting for the existence of ommer blocks. When computing a score for each block, GHOST sums the difficulty of all chains that stem from the block and not only the heaviest one. This modification to the LCR guarantees that a majority group will always outpace a minority one, even if the majority is poorly coordinated. In general, GHOST has a positive effect on the extent of decentralization among the mining population. The basic algorithm behind GHOST is:

1. First, we start at the genesis block.
2. Next, we look at all of the available forks from the current block, if any.
3. If there are no more blocks in the chain, we select the current block as the head of our chain and stop our search.
4. If we only have one potential chain (no forks), then we move onto the next block.
5. If we have more than one potential chain (a fork), then we move on to the first block of the fork with the most *total* blocks, including uncle blocks.
6. Head back to step (2) with our current block.

GHOST is additionally useful when block production rate is closer to network latency. For instance, this would be the case when network latency and block production rate are both on the order of 5-15 seconds. Lower ratio between the two metrics leads to an increase in the probability that a miner fails to see a new block and instead begins to work on a block stemming from the same parent. If the miner later chooses to switch their efforts to the new block, any work carried out is essentially now wasted. GHOST ensures that the miner can still influence the canonical chain by continuing work on their initial block. GHOST is typically accompanied by a reward system that compensates the producers of ommer bocks in line with the probability of such an event.

## GHOST vs. LCR

GHOST often agrees with the longest-chain rule:

![GHOST and LCR Agree](./images/fork-choice-rules/lcr-ghost-agree.png)

Here, the LCR picks `Block F` because it's part of the longest chain (six blocks in total). Our GHOST rules really only apply at `Block B`, where we have our first fork. The chain after `Block C'` has a total of three blocks, whereas the chain after `Block C` has a total of four blocks. GHOST therefore moves onto `Block C` and doesn't find any other forks until stopping at `Block F`.

However, in some cases, GHOST will disagree with the longest-chain rule:

![GHOST and LCR Disagree](./images/fork-choice-rules/lcr-ghost-disagree.png)

In this chain, the LCR picks `Block G` because it's part of the longest chain (seven blocks). GHOST diverges from the LCR after `Block B`. Although the chain following `Block C` is longer at five blocks, there are a total of *six* blocks in the fork starting at `Block C'` when we count uncle blocks.

GHOST and the LCR have a lot in common, but clearly have certain key differences. Although GHOST consumes more information, it also introduces complexities for implementation. The LCR has seen significantly more use within existing blockchains running in production today. Our study of GHOST will, however, prove valuable when we later analyze its modification and adoption in Eth2.
