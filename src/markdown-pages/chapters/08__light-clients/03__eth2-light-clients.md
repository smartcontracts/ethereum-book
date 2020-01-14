---
path: "/chapters/light-clients/eth2-light-clients"
title: "Eth2 Light Clients"
---


So how do we find the true validator set? We need somewhere that tells us who the validators are. Crosslink committees happen every block, but their signatures get aggregated so we can't see who they are. Shard committees get shuffled less often, once every 27 hours. 

[TODO] I really don't get this part. ^^^

This works, but unfortunately it only really gives us a weaker sense fo security. How much?

Once we've figured out the validator set, we can start syncing blocks. We basically look at our local list of validators and their stake, and then we see which validators have signed off on a given block and make sure 2/3rds are there. 

After we've synced, we still need to get to the specific data that we want. We only have the headers for each blocks, which are a small fixed size, now we want to maybe access some data inside the block. For example, we might want to find the state root or maybe we want to see a token balance inside of some EE.

We can do this becuase of SSZ. It's Simple Serialize and the nice idea is that it makes everything into big ol merkle tree. Everything is structured into nice objects that can be easily merklized and then accessed using a Merkle proof. We just need to ask for a given object and someone with the full data can give us the object plus a proof that verifies the object was actually included in the block.

[TODO] Security analysis??

EEs: Will anyone be able to create them? This is an open question. I mean, anyone will be able to create EEs but the question is mainly whether to initially only launch one or two main EEs. There are arguments either way, if we launch with many EEs then there's a bigger risk that one of them goes wrong because we can't just focus development resources on the few EEs.

Personally, I think the best model is to launch with 1-2 EEs and allow others to create EEs later on after maybe a few months. This way we can still allow people to create novel EEs but the initial launch of Eth2 is least likely to be marred by a bad EE.
