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

This problem of multiple leaders at the same time introduces the concept of forks in the network. When two users create a block at the same time, it's necessary for the rest of the network to figure out which block to build on. We need to decide on a single block because new blocks must reference some specific state as outputted by a block. Participants follow a "fork choice rule" to figure out what to do when presented with more than one block for the same height. A fork choice rule is an algorithm that picks a chain from a list of potential forks, based on some metric.

Within Proof of Work, the simplest for choice rule is the longest chain rule.

[LCR EXPLAINER]

[GHOST EXPLAINER]