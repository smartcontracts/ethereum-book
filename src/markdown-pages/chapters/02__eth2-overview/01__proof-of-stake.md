---
path: "/chapters/eth2-overview/proof-of-stake"
title: "Proof of Stake"
---

```text
DRAFT STATUS: 0/5
```

Proof of Stake is the basis of Eth2. It's what makes Eth2 very different from Eth1 and allows it to scale significantly without the environmentally unfriendly ideas behind Proof of Work. Proof of Stake is a big shift from Proof of Work, and we will explore the core of Proof of Stake in detail later in the book. First, however, we want to give a high-level understanding of Proof of Stake.

The core concept behind Proof of Stake is that we replace the "work" metric of Proof of Work that implicitly measures investment in the system via computational resources with a "stake" metric that explicitly measures investment via capital lockup. Instead of miners, we introduce new users called validators who are tasked with maintaining the system. Validators have a stake that is used as collateral and can be rewarded or punished for successfully or unsuccessfully completing relevant actions.

Validators have the role of creating and validating blocks in the network. We use various incentive mechanisms to ensure that blocks are created and validated in a timely manner.

Proof of Stake chains need new verisons of the fork-choice rules that we use in Proof of Work. This is to ensure that the chain functions correctly. Some of the ideas used in Proof of Work need to be modified to correctly work within Proof of Stake. Often, a simple translation of these rules will not function properly in a Proof of Stake system.

Major advantages of Proof of Stake include better security, reduced risk of centralization, and energy effiicnecy. There are basic types of Proof of Stake consensus algorithms, mainly lumped into chain-based or BFT based. 

A chain-based Proof of Stake selects validators to produce blocks during a time period and assigns them the right to that time period. The blocks point to a previous block, and the chain grows.

A BFT based PoS is where validators are randomly selected to produce blocks but the process of agreeing on which block is canonical happens in a multi-round system where people put votes. At the end of the process, validators agree on which chain is correct permanently. The key difference between this and chained is that the decision between which chain is correct does not depend on the length or size of the chain.

Eth2 uses a mix of these two systems.

One of the key benefits of Proof of Stake is that we don't use as much electricity and therefore we can secure the chain with less extra cost in the form of rewards.

Another benefit is that it opens up new techniques to actively avoid cartels or other mechanisms that can be used to manipulate the chain. Mainly, because there's more control over the economics of the system and less reliance on some external economic device. This leads into the idea of certain punishments against validators that make 51% attacks more expensive. Such a system does not exist in Proof of Work because we cannot "destroy" someone's mining rig for misbehaving.

We discuss the full treatment of the Proof of Stake protocol in Eth2 later in the book.