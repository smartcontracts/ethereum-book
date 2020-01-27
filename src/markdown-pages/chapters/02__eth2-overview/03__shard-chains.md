---
path: "/chapters/eth2-overview/shard-chains"
title: "Shard Chains"
---

```text
DRAFT STATUS: 0/5
```

Eth1 and most other blockchains follow a traditional structure in which a single blockchain is responsible for providing all the functionality within the system. Eth2 moves away from this model with the introduction of shard chains. Whereas the Beacon Chain can be thought of as Eth2's "system chain," shard chains are Eth2's "application chains."

Shard chains coexist with the Beacon Chain and rely on it for security. The same validators who maintain the Beacon Chain also maintain all shard chains. The Beacon Chain is responsible for assigning validators the roles necessary to build and extend shard chains.

Eth2 follows a hub-and-spoke model, in which the Beacon Chain plays the role of the hub and shard chains are each their own spoke. Shards regularly publish summaries of their activity to the Beacon Chain. This is necessary for shards to derive security from the Beacon Chain and enables communication between shards.