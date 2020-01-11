---
path: "/chapters/eth2-overview/shard-chains"
title: "Shard Chains"
---

Since the Beacon Chain just handles meta stuff, we also have other chains for other things. These are Shard Chains, which are like each their own Eth1 chain. Except there are some big differences too.

Eth1 had one execution environment EVM. All cotnracts had to be written in a way that the evm could execute them. In Eth2, we actually get rid of this idea. Instead, we say that anyone can create new execution environments (new vms) as long as they compile to a base eWasm language. Shards can have many different EEs on them, and EEs each execute according to some predefined rules. Anyone can upload a new EE as long as they put up some money. These EEs are now where the apps and money actually lives, sort of like what Eth1 was. You could even make an EVM EE that lives on a shard, and this is maybe a plan that some people have.
