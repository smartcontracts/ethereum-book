---
title: "Fork Choice Rule"
---

# {{ $frontmatter.title }}

We covered the concept of blockchain forks in our previous chapter. In brief summary, forks can occur if nodes produce two or more blocks that reference the same parent block. Nodes must select one of these blocks to consider "canonical," as conflicting blocks may contain mutually exclusive transactions. Nodes can, in theory, make this determination in any manner they'd wish. However, blockchain systems provide a particular set of rules, called a "fork choice rule," that nodes are expected to follow. Fork choice rules are a critical part of any blockchain protocol and ensure that a "main" popular chain that reinforces the economic incentives that drive the chain. This section explains Eth1's fork choice rule and clarifies certain misconceptions of its operation.

Eth1 makes use of the "longest chain rule" discussed earlier in this text. The algorithm, often shortened to the "LCR," dictates that the canonical chain be that with the highest total difficulty. Difficulty in this case refers to the target Proof-of-Work value of each block. Although we've already addressed this subject, one can refer to the following diagram for a brief refresher:

::: tip TODO Diagram :::

Some resources available on the internet suggest, incorrectly, that Eth1 makes use of the alternative GHOST fork choice rule. GHOST, as we know, takes the difficulty of ommer blocks into account during its chain determination. Eth1 does not consider ommers within its fork choice rule, but does address them elsewhere. Producers of ommers referenced in another block are given a "consolation" reward of sorts, currently set at `TODO` ETH, as opposed to the standard `TODO` ETH reward. This reward is designed to minimize the economic cost of ommer blocks to their producers and thereby encourage the existence of small-scale mining operations.

Eth1 additionally factors ommer production rate into its difficulty adjustment algorithm. When a block contains many ommer references, overall difficulty increases, and vice versa. This has two primary effects on mining as a whole. An uptick in the ommer rate suggests that many nodes are generating blocks at approximately the same time. Increased difficulty helps to decrease these events and, as a result, reduce unnecessary chain forks. Adjustments based on ommer rate simultaneously limit the profitability of attempts to deliberately manipulate the ommer rate for personal gain.

Luckily, the Eth1 fork choice rule doesn't introduce much novel subject matter. At the close of this section, we've covered almost every core element of Eth1. The remaining sections take a look at the ecosystem around Eth1 and serve to motivate the need for Eth2. Please take a moment to congratulate yourself for making it to this point! We've establish a large majority of the core concepts necessary to deeply understand Eth2.
