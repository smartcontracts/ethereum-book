---
path: "/chapters/blockchains/forks"
title: "Forks"
status: "0"
---

This problem of multiple leaders at the same time introduces the concept of forks in the network. When two users create a block at the same time, it's necessary for the rest of the network to figure out which block to build on. We need to decide on a single block because new blocks must reference some specific state as outputted by a block. Participants follow a "fork choice rule" to figure out what to do when presented with more than one block for the same height. A fork choice rule is an algorithm that picks a chain from a list of potential forks, based on some metric.

Within Proof of Work, the simplest for choice rule is the longest chain rule.

[LCR EXPLAINER]

[GHOST EXPLAINER]