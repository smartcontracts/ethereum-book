---
path: "/chapters/eth1/fork-choice-rule"
title: "Fork Choice Rule"
status: "1"
---

## Outline
- Reiterate purpose of fork choice rule
- LCR is used in Ethereum, not GHOST
    - Brief recap + example
- Ethereum does reward uncles though
    - Also uses uncles to determine difficulty
    - Purpose is to give some weight to uncles w/o full blown GHOST
    - Just explain this whole uncle logic in detail, with examples
---

```
TODO: Insert recap of purpose of fork-choice rules.
TODO: Insert recap of LCR.
```

Although Eth1 does not use GHOST, it does include some incentives for producers of ommer blocks. Within each block, as we mentioned, is the root of a Merkle tree of ommer data. This includes the hash of the ommer and the address of the miner in that block. Each ommer included in a block receives a small reward in addition to the reward paid to miners. Currently, this reward is X ETH. Although it's not necessary for miners to include ommers, there's a general incentive to do so because it provides more rewards for everyone in the system.

```
TODO: Need to look further into the incentives here....
```

Furthermore, recent changes to ETh1 introduced in EIP X have increased the influence of ommers in the protocol. Although they are still not taken into consideration for the fork-choice rule, ommers now influence the difficulty of the next block. The exact rule is that [X]. Essentially, this takes more information into account when adjusting the difficulty so that overall difficulty will better represent the hash power of the system. It also ensures that someone cannot as easily manipulate issuance rate by aso manipulating ommer rate. When more ommers are present, the difficulty will increase and the block production rate will decrease. Same in reverse when fewer ommers are present. Overall it stabilizes the ommer rate and ensures the network will more quickly adapt to changes in hash power.