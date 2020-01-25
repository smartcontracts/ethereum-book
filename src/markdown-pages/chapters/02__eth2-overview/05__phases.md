---
path: "/chapters/eth2-overview/phases"
title: "Rollout Phases"
---

```text
DRAFT STATUS: 0/5
```

Okay let's talk about the phases of eth2 rollout! So basically, Eth2 is a really big project. Like many other big projects, Eth2 is using a phased rollout system in which certain elements will be introduced one by one. During each rollout phase, new elements will be added that build upon the previous rollout (except the first phase, of course). There are three primary phases at the moment, and these phases correspond to certain key stopping points in the new chain.

The first phase is Phase 0 and will introduce the beacon chain and proof of stake. During this phase, validators will be able to join the beacon chain and stake, and will start to take on the roll of maintaining the beacon chain. They will participate in a proof of stake process that we will describe in detail in the following chapter. The specific roles of the validators and the components of the blocks they'll create during this phase will also be discussed later in this book. 

Phase 0 will set the stage for the beginning of Eth2. Once we are sure that the beacon chain works as intended and that things are moving smoothly, we will have a solid base to continue adding new features. During this phase, the beacon chain will only exist to maintain itself, and there will be no user-level transactions like we currently have on Eth1.

Phase 1 introduces shard chains on top of the beacon chain. At this point, the validators will start to create and extend shard chains, which will be connected to the beacon chain by cross-links. However, shards during phase 1 will still not support any user-level transactions and will likely only contain null data (lots of zeroes). This phase is mainly used to ensure that the process of downloading shards works for validators and that validators are prepared for execution in later phases.

Phase 2 brings shards to life by adding execution. There will be some execution environments on top of these shards, and users will be able to deploy applications to the shards. This phase will mark the point at which Eth2 is actually usable, though there will likely be a certain amount of time before the system is stable and bugs have been worked out. Phase 2 is currently the specified less detailed than phases 0 and 1, mainly because there are still discussions about how shards will interact with the beacon chain and with other shards when execution and applications are actually possible. 

BEyond these phases, there are still additional improvements to be added. We sort of lump these into a "phase 3 and beyond," mainly because these additions improve upon Eth2 but aren't necessary for basic functionality. We discuss some of these potential improvements later in the book. There will still be plenty of development to be done on Eth2 beyond the intiial three phases, and this is a very interesting area of development for the future of Eth2.
