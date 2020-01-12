---
path: "/chapters/shard-chains/shard-validation"
title: "Shard Validation"
---

Shards work like this. the Beacon Chain assigns a person to the shard to be a block producer and it assigns a committee to the shard to validate the block created by the block producer .Very similar to how the Beacon Chain works itself.

The producer and committee are random but arent shuffled as much as the beacon chain mainly because in order to verify the shard we have to download more data. Which means that it takes longer to verify things, so this would introduce a lot of strain on validators and reduce performance of the system if we shuffled more often. Once in 27 hours.

People get told in advance (one epoch) so that they can download the shard data and figure out where they're at. Once per slot (same ones used on beacon chain) a producer creates a block. Sends to validator committee, who vote on it. If vote is OK, sends to Beacon Chain as a "cross-link" whch includes the root of the shard block and state. 

Committee size is important for security. Bigger committee size means less likely to be compromised purely on a random chance basis. If RANDAO is fully random then with size 128, we can guarantee that 50+ will be honest like 99% of the time. This is a tradeoff though, bigger committee size means fewer shards.
