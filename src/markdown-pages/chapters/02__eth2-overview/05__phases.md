---
path: "/chapters/eth2-overview/phases"
title: "Rollout Phases"
---

Eth2 is really big and has a lot of moving parts. In order to make Eth2 deployment simpler, it's broken up into three phases (0,1,2). Each of these phases introduces some new stuff that builds upon the previous phase where the phase 0 starts the system off.

Phase 0 in a nutshell just runs the Beacon Chain. We don't have any shard chains, but validators get to start playing with the system and get paid to create new beacon chain blocks and include new validators in the system or exit anyones that want to leave etc.

Phase 1 introduces a basic odea of shards. We don't actually allow for execution of any kind yet, we have shards be sort of like blobs of data. The idea here is mainly to avoid bugs in EEs while we test that the logic about coming to consensus about shards works. So anyone will be able to upload data to these shards, though there wont be any real idea of what that data means on the shards itself and its primarily meant to just be a source of verified data.

Phase 2 is where shards come to life. Its where we introduce EEs to shards. This means that shards not onlyhave data but can now really understand what taht data means and perform transactions ont aht data. For example, we could have an EVM shard that behaves like Eth1. 

GEnerally speaking the reason we have these phases is to make our lives easier. 