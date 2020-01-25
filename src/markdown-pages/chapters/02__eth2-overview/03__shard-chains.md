---
path: "/chapters/eth2-overview/shard-chains"
title: "Shard Chains"
---

```text
DRAFT STATUS: 0/5
```

Shard chains are blockchains in which user-level transactions occur. The beacon chain has functionality that assigns validators to shard chains. These chains can hold a lot of transaction data and can even interact with one another. Users can interact with as few or many shards as they'd like, and are not limited to any individual shard. This is where users will interact with the system if they are not validating the chain.

Shard models can take various different ideas. One model for sharding is a tree structure in which shards have parent shards and children shards. Data flows between the shards like this:

[image]

Eth2 uses a shard model more like a hub-and-spoke, where the beacon chain is hub. Each shard directly connects to the beacon chain and can interact with others shards by passing messages through the beacon chain like this:

[image]

We will explain these shards in more detail later.
