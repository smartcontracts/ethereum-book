---
path: "/chapters/light-clients"
title: "Light Clients"
---


So generally speaking, what are light clients exactly? How do they work? Why do we care about them in the first place?

Light clients are pieces of software that can consume blockchain data with requirements logarithmic to the size of the blockchain state. What does logarithmic mean here? So the idea here is that let's say the blockchain state expands by a multiple of two, it's twice as large as it previously was. Instead of requiring that the client now have twice as much storage space or twice as much computational power, we instead want the client to only have log(n) this amount.

Why do we care? Well, blockchains are really big. On the order of several gigabytes, usually. We want people to still be able to access blockchains in the context of low-power environments like smart phones. Even though smart phones are getting better and better, the average person only has a relatively weak mobile processor. However, if we don't support access from such an environment, then we automatically exclude communities with fewer resources.

Besides low-power environments, light clients also allow us to embed within other blockchains (which really are low-power envs). This allows us to efficiently query data from Eth2 shards within another blockchain, meaning we get better interop between chains. Blockchains will probably follow a power-distribution of usage, so we will likely have a few widely used chains and many lesser-used chains. As a result, we really want to push forward any sort of interop and this has historically been an issue for Eth2.

Why is this hard? The main idea behind blockchains is that we want to verify everything that's going on in order to verify that the whole chain is valid. This is basically like auditing the entire history of things. Sharding helps us because it allows us to only audit the shards we care about, but it's not good enough in most instances. It's still too big for low-capacity environments.

What's the basic strategy? Merkle trees, which basically allow us to store pieces of information in a way that the amount of computation/data to access any one element is logarithmic with the total size of the dataset. We can combine merkle trees with multiproofs, which allow us to access several elements simultaneously with even more efficiency gains by looking at intersections in the proof elements.

In Proof of Work, this is somewhat easier because everything that we need to get a sense of validity of a block is stored in the block header, mainly the work which we can verify by hashing the header. This acts as a solid proxy for the validity of the block. 

Unfortunately this is harder in Proof of Stake since there is not such a clear proxy. We need to figure out two questions, how do we get updated "trusted" roots and how do we do this succinctly? So the key insight here is that if we get 2/3rds of stake on a given block, then we can trust all previous blocks. However this requires that we actually know who's validating, which means we need to build up a sense of the true validator set.

So how do we find the true validator set? We need somewhere that tells us who the validators are. Crosslink committees happen every block, but their signatures get aggregated so we can't see who they are. Shard committees get shuffled less often, once every 27 hours. 

[TODO] I really don't get this part. ^^^

This works, but unfortunately it only really gives us a weaker sense fo security. How much?

Once we've figured out the validator set, we can start syncing blocks. We basically look at our local list of validators and their stake, and then we see which validators have signed off on a given block and make sure 2/3rds are there. 

After we've synced, we still need to get to the specific data that we want. We only have the headers for each blocks, which are a small fixed size, now we want to maybe access some data inside the block. For example, we might want to find the state root or maybe we want to see a token balance inside of some EE.

We can do this becuase of SSZ. It's Simple Serialize and the nice idea is that it makes everything into big ol merkle tree. Everything is structured into nice objects that can be easily merklized and then accessed using a Merkle proof. We just need to ask for a given object and someone with the full data can give us the object plus a proof that verifies the object was actually included in the block.

[TODO] Security analysis??

EEs: Will anyone be able to create them? This is an open question. I mean, anyone will be able to create EEs but the question is mainly whether to initially only launch one or two main EEs. There are arguments either way, if we launch with many EEs then there's a bigger risk that one of them goes wrong because we can't just focus development resources on the few EEs.

Personally, I think the best model is to launch with 1-2 EEs and allow others to create EEs later on after maybe a few months. This way we can still allow people to create novel EEs but the initial launch of Eth2 is least likely to be marred by a bad EE.
