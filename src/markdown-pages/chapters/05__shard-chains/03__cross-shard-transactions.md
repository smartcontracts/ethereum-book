---
path: "/chapters/shard-chains/cross-shard-transactions"
title: "Cross-Shard Transactions"
---

Basic idea behind cstx is that shards put data on the beacon chain which can be consumed by other shards. We trust that data is valid so we use receipts to execute against the other environment. Receipts are where the data is that we need in the merkle tree represented by the root in the cross-link.

We have a few competing models for this this will work. It's not entirely clear. The leading model is that we will have shards put data on chain during every single block. This means that shards will be able to communicate with one another with a 1 block time. 

Other proposals include that we can do links only once per epoch. Which allows us to do more shards, at the expense of increasing communication time between shards. Would onyl be able to cstx once every epoch here.

More alternatives even are to use optimisitc mechanisms where we effectively bet on the future state and make decisions on what we think the state will be, and then update our decisions only in the case we were wrong. This means we get more speed in the short term, but it also means that we might have to revert which can be costly. Generally probably something to consider on a higher level and not on eth2 itself, which is how its usually approached.