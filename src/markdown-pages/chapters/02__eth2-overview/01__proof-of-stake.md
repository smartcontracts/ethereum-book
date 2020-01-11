---
path: "/chapters/eth2-overview/proof-of-stake"
title: "Proof of Stake"
---

this is the big change in eth2. Where Eth1 used proof of work with physical hardware, Eth2 uses a more environmentally friendly method called Proof of Stake. The core idea with proof of stake is instead of measuring the amount of interest in a chain with computational power, we basically measure interest by requirign that people put up a deposit against their opinions. So if in Eth1 you get to make blocks by having the money to buy machines, in Eth2 you get to make blocks by having the money to stake. Still the same core idea, though, that the more resoruces you lock into the system, the more blocks you get to produce and get rewards from the system.

In order to get this to work, we need to make some pretty big changes to the chain. Most of these changes have to do with recording the validator set on chain, figuring out which validators will get to do things and when, etc. Since we can't just randomly find anyone to be a block producer like in Eth1, we need to actually determine block producers on the beacon chain. This is a big challenge. We also need to figure out new ways to ensure that the chain will sort of converge and to prevent people from doing certain types of attacks taht only exist in PoS.