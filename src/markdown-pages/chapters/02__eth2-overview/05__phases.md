---
path: "/chapters/eth2-overview/phases"
title: "Rollout Phases"
---

```text
DRAFT STATUS: 1/5
```

Eth2 is, as we now know, composed of many interlocking elements. The size and complexity of these elements necessitates a phased rollout process in which components are deployed individually over time. The Eth2 community has largely settled on a series of three initial deployment phases. Each phase builds upon the last until, after the third phase, Eth2 can be considered mostly operational.

## Phase 0
The first rollout phase, Phase 0, introduces the Proof of Stake Beacon Chain. During this phase, users will be able to stake Ether and become validators on the Beacon Chain. Eth2 will not handle applications or application-level transactions at this point. Once it appears that the Beacon Chain is functioning as intended, Eth2 will advance to Phase 1.

## Phase 1
Phase 1 introduces basic shard chains to Eth2. Validators will begin to create and extend shard chains, and will carry out additional responsibilities on the Beacon Chain regarding these shard chains. However, shards at this stage will not handle any transaction execution and will instead be populated with arbitrary data. This phase is primarily intended to ensure that the process of downloading, extending, and voting on shard chains is fully functional.

## Phase 2
The third and final initial phase, Phase 2, brings shard chains to life. Phase 2 opens the door for execution environments on shards. Users will be able to deploy and use blockchain applications within these environments. This phase effectively marks the point at which Eth2 becomes mostly operational, though one should expect a reasonable wait until the system is considered stable.

Phase 0 and Phase 1 are well specified, and development on clients for these phases is already well under way. Phase 2 is still somewhat "up in the air" at the time of writing. Most ambiguity around Phase 2 revolves around models for interactions between shard chains. Some community members further define a "Phase 3 and Beyond" for additional improvements to Eth2 not necessary for basic functionality. A full treatment of open research questions in Eth2 is provided later within this book.