---
path: "/chapters/shard-chains/shard-basics"
title: "Shard Basics"
---

Eth1 is made up of a single chain where things get executed. In Eth2, we want to take things further. We add these things called shard chains, which are each a blockchain in their own rights. 

The universe is simple, we have the beacon chain, and then we have various different shard chains. The Beacon Chain gets messages from the shard chains, caleld cross-links, which allow the various shards to talk to one another and also checkpoint the state of the shard chains.

Within shard chains are execution environments, which are where applications and money lives. You can think of this like the EVM, which was the EE for Eth1. Except in this case, we are able to create many different environments instead of being stuck to Eth1. And they can all talk to one anotehr!

Generally, when we have a lot of data, we don't want to put all of that data in one place. Sharding in the cotnext of databases is where you take the data in the db and spread it over many different smaller databases. This is easier on a per-machine basis and also more robust, because you dn't have a single point of failure.

Sharding is much the same idea. Instead of doing everyhting on one chain, we do it on many chains that can interact when necessary. Users and apps live on a specific shard, though they can interact with others if needed. 

One of the cool things about shards in Eth2 is that you don't need to download the whole system to be sure that it's all working. In Eth1 a full node would've needed to download the ehole Eth1 chain. In Eth2, you can be certain to the same confidence level that the whole system is valid as long as the beacon chain is running as expected. So we can just download the data for our specific shard. When we interact with other shards, we can just trust that it'll be valid as long as we hold certain assumptions.
