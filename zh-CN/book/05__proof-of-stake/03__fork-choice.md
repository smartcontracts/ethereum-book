---
path: "/chapters/proof-of-stake/fork-choice"
title: "Fork Choice"
status: "2"
---

# {{ $frontmatter.title }}

Since forks are always a possibility in any blockchain, we need to extend our basic Proof of Stake chain with a fork-choice rule that allows validators to find the "correct" chain.

In the case of a one-block fork, we can simply say that validators should follow whichever fork has more votes.

::: tip TODO Image for one-block fork. :::

As ever, this decision becomes more complex when deciding between chains more than one block in length.

## An Old Friend: The Longest Chain Rule

We could consider, for instance, using a version of the Longest Chain Rule modified to fit our Proof of Stake environment. Instead of following the chain with the highest total difficulty, we follow the chain with the most total votes, weighted by stake.

Our algorithm would take the form:

::: tip TODO Add LCR algorithm here. :::

Such an algorithm would be quite effective at resolving a fork such as the one shown below, in which we can clearly see a "winner":

::: tip TODO Image with lopsided forks. :::

Unfortunately, the realities of a blockchain network leave this fork-choice rule open to attack.

### High-Latency Attacks

Imagine a scenario, for instance, in which a malicious validator controls $\smash{\frac{1}{3}}$ of the stake on our network. This attacker wants to create a competing chain that somehow overcomes the primary chain.

If the primary chain is operating smoothly, then the Longest Chain Rule prevents the attacker from getting very far. Even if the attacker refuses to publish blocks on the primary chain, thereby leaving an empty slot every third block on average, the attacker can only create one block for every two created on the primary chain. Furthermore, these blocks will only have half of the votes, on average, of primary chain blocks.

::: tip TODO Image with attacker's chain in ideal conditions. :::

The Longest Chain Rule starts to show weakness, however, in the presence of particularly high network latency. With sufficient latency on the primary chain, we may run into situations in which a validator does not receive the previous block before the validator's assigned slot begins. In this case, the validator will build their block on the last known block. Once the missing block becomes available, we end up with a small chain fork.

::: tip TODO Image with attacker's chain and small latency fork. :::

An attacker can use this latency to their advantage. As latency increases, the primary chain extends in length more and more slowly. If latency reaches four times the slot length, then the primary chain will, on average, only extend by one block (with $\smash{\frac{2}{3}}$ votes) for every two blocks (with $\smash{\frac{1}{3}}$ votes each) on the attacker's chain.

::: tip TODO Image with attacker's chain and large latency fork. :::

At any higher latency, the attacker's chain will quickly begin to outpace the primary chain, even though the attacker only controls $\smash{\frac{1}{3}}$ of the total stake. The Longest Chain Rule doesn't seem to accurately capture the will of the majority as latency increases.

::: tip TODO Image with attacker's chain and massive latency fork, LCR picks attacker. :::

## The New Kid on the Block: LMD GHOST

Eth2 introduces a fork choice rule called "Latest Message Driven GHOST", LMD GHOST for short. Based on the GHOST algorithm described in our overview of Eth1, LMD GHOST patches the holes in the Longest Chain Rule by acknowledging votes on uncle blocks.

LMD GHOST, like GHOST, consider votes within uncle blocks to a chain as votes for the chain itself. Furthermore, in order to avoid double-counting votes, LMD GHOST only takes into account the *latest messages* from each validator. In combination, these two rules give the following algorithm:

::: tip TODO LMD GHOST algorithm. :::

LMD GHOST often agrees with the Longest Chain Rule.

::: tip TODO Image LMD GHOST agrees with LCR. :::

However, LMD GHOST addresses the attack vector for the Longest Chain Rule because a minority chain can never receive more votes than a majority chain. The attacker's chain from our previous example can never receive more than $\smash{\frac{1}{3}}$ votes, no matter the length of the chain.

::: tip TODO Image for attacker failing under LMD GHOST. :::

Additionally, the attacker is unable to force the rule to favor their chain in the case that the primary chain has stopped producing blocks altogether.

::: tip TODO Image for attacker failing even when other chain is offline. :::

### Saved Message Attacks

So far, our chain has slashing rules that prevent validators from creating multiple votes during the same slot. Furthermore, LMD GHOST ensures that votes for the same chain created by the same validator in different slots won't be counted twice. We have not, however, prevented validators from making votes for *different* chains during different slots.

An attacker with sufficient stake could abuse this fact to cause a prolonged fork. An attacker could "save" votes by refusing to publish them during previous slots and then later "release" these votes to manipulate the fork decisions of other validators.

For instance, take the following situation in which an attacker with $\smash{\frac{1}{3}}$ stake has not published votes for several slots in a row.

::: tip TODO Image for saved messages. :::

At this point, the attacker has accumulated $\smash{\frac{1}{3}}$ votes for each of the missed slots. The attacker then waits for a fork in the chain, perhaps due to network latency, and publishes $\smash{\frac{1}{3}}$ votes in favor of one of the two blocks.

::: tip TODO Image for publication of initial votes. :::

Next, the attacker waits until they see other validators publish enough votes that this first block almost has a majority. At this point, the attacker uses another set of saved up votes to vote for the other forked. Since LMD GHOST considers latest messages, it will remove the attacker's original votes and only consider the latest ones. Now, LMD GHOST swaps and suddenly favors the other block.

::: tip TODO Image for publication of second votes. :::

Since LMD GHOST favors the second block, validators who have not yet voted will begin to submit votes for the second block. Our attacker can continue to execute this "flip-flop" attack for many blocks in a row, forcing the chain to split between two potential forks.

Eth2 addresses this problem by refusing to accept any votes older than a certain number of slots. This prevents any attacker from saving up a significant number of votes.
