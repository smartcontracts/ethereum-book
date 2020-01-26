---
path: "/chapters/eth2-overview/beacon-chain"
title: "The Beacon Chain"
---

```text
DRAFT STATUS: 1/5
```

The Beacon Chain is the beating heart at the core of the Eth2 ecosystem. The Beacon Chain implements the Eth2 Proof of Stake protocol and thereby enables validators to build and extend the Eth2 blockchain. Community members often refer to the Beacon Chain as Eth's "system chain," as it holds responsibility for maintaining records of validator identities, validator balance changes, and many other validator-related data points.

Applications and user-level transactions do not exist on the Beacon Chain and are instead relegated to shard chains, as to be discussed in the next section of this overview. However, the Beacon Chain is necessary to ensure that these shard chains, and, by extension, applications, operate as expected. Understanding the Beacon Chain is critical to understanding the operation of Eth2 as a whole.