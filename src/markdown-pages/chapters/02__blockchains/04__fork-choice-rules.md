---
path: "/chapters/blockchains/fork-choice-rules"
title: "Fork Choice Rules"
status: "0"
---

In the previous section, we mentioned that forks occur when multiple published blocks reference the same previous state. We might face such an event by accident, perhaps if two blocks are published at approximately the same time. However, this could also happen on purpose, as would be the case if a malicious actor were attempting to create a fork in order to "remove" a payment from the chain generally accepted by other users. In either case, it's necessary that there be some mechanism that allows users to determine which fork is the correct or "canonical" one. We refer to such a mechanism as a "fork choice rule."

Fork choice rules are extremely important for the proper functioning of the underlying blockchain. Fork choice rules determine which chain is to be widely accepted and, therefore, which block producers are to be rewarded. A poorly designed fork choice rule can quite quickly lead to unexpected or undesired behavior on the part of both users and block producers.

All fork choice rules must have certain properties in order to be maximally useful. In keeping with the notion of openness and accessibility, fork choice rules should be easy to compute. Nodes should be able to select a canonical chain from a set of forks without significant computational effort. Furthermore, many protocol designers feel that fork choice rules should have limited reliance on external parties. Essentially, nodes should be able to execute the rule without needing to confer with some "trusted" central entity or group. 

Perhaps most crucially, fork choice rules must reinforce the economic incentives within the system as a whole. Block producers are typically rewarded with some digital currency transaction contained within the blocks they produce. When a fork choice rule rejects their block, this reward transaction is no longer included within the canonical chain. Generally speaking, if the fork choice rule does not reward the producer who carried out the most computational work, then the direct link between voting power and resource expenditure is broken.

It's perhaps no surprise then that the earliest fork choice rules simply selected the chain with the most total work.

```
TODO: LCR explainer
```

An important property of the Longest Chain Rule is that forks from some target block become less likely as additional blocks are produced on top of the target. Any chain attempting to fork out a specific block would need to carry out more work than the sum of the work on that block and any blocks that follow. An attacker must carry out even more additional work as more blocks are added to the canonical chain. Generally speaking, this means that an attacker would need access to more than 50% of all hash power to successfully carry out an attack.

```
TODO: Expand on the above.
```

**GHOST** (Greedy Heaviest Observed Subtree) is an alternative to the longest-chain rule. GHOST, unlike the LCR, doesn't simply look at the length of a chain, but also factors in any **uncle blocks**.

An uncle block to a chain is any block that *builds upon some block in that chain*, but isn't actually part of the chain itself. Let's go through this by example. In the following diagram, duplicated from above, we have a fork at `Block A`:

![Uncle Blocks](./images/fork-choice-rules/uncle-blocks.png)

Here, we say that `Block B'` is an *uncle of the chain headed by* `Block D` because it builds on one of its components (in this case, `Block A`).

Uncle blocks are not unusual occurrences. The main Eth1 chain is currently approaching ten million blocks in length and has almost *one million* uncles. But why do we care about them?

Though uncle blocks don't directly add to the length of a chain, they *do* imply that the creator of the uncle block meant to extend that chain. Which chain would you follow, a chain with two blocks and no uncles or a chain with one block and a thousand uncles? If we simply ignore uncle blocks, then we're "wasting" the work put into these blocks by their creators. 

Here's how GHOST finds the "best" fork to follow:

1. First, we start at the genesis block.
2. Next, we look at all of the available forks from the current block, if any.
3. If there are no more blocks in the chain, we select the current block as the head of our chain and stop our search.
4. If we only have one potential chain (no forks), then we move onto the next block.
5. If we have more than one potential chain (a fork), then we move on to the first block of the fork with the most *total* blocks, including uncle blocks.
4. Head back to step (2) with our current block.

### GHOST vs. LCR
GHOST often agrees with the longest-chain rule:

![GHOST and LCR Agree](./images/fork-choice-rules/lcr-ghost-agree.png)```

Here, the LCR picks `Block F` because it's part of the longest chain (six blocks in total). Our GHOST rules really only apply at `Block B`, where we have our first fork. The chain after `Block C'` has a total of three blocks, whereas the chain after `Block C` has a total of four blocks. GHOST therefore moves onto `Block C` and doesn't find any other forks until stopping at `Block F`.

However, in some cases, GHOST will disagree with the longest-chain rule: 

![GHOST and LCR Disagree](./images/fork-choice-rules/lcr-ghost-disagree.png)

In this chain, the LCR picks `Block G` because it's part of the longest chain (seven blocks). GHOST diverges from the LCR after `Block B`. Although the chain following `Block C` is longer at five blocks, there are a total of *six* blocks in the fork starting at `Block C'` when we count uncle blocks.

```
TODO: Expand on GHOST as useful for high latency.
```

```
TODO: Any others to touch on?
```