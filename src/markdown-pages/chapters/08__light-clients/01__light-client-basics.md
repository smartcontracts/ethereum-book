---
path: "/chapters/light-clients/light-client-basics"
title: "Light Client Basics"
---


So generally speaking, what are light clients exactly? How do they work? Why do we care about them in the first place?

Light clients are pieces of software that can consume blockchain data with requirements logarithmic to the size of the blockchain state. What does logarithmic mean here? So the idea here is that let's say the blockchain state expands by a multiple of two, it's twice as large as it previously was. Instead of requiring that the client now have twice as much storage space or twice as much computational power, we instead want the client to only have log(n) this amount.

Why do we care? Well, blockchains are really big. On the order of several gigabytes, usually. We want people to still be able to access blockchains in the context of low-power environments like smart phones. Even though smart phones are getting better and better, the average person only has a relatively weak mobile processor. However, if we don't support access from such an environment, then we automatically exclude communities with fewer resources.

Besides low-power environments, light clients also allow us to embed within other blockchains (which really are low-power envs). This allows us to efficiently query data from Eth2 shards within another blockchain, meaning we get better interop between chains. Blockchains will probably follow a power-distribution of usage, so we will likely have a few widely used chains and many lesser-used chains. As a result, we really want to push forward any sort of interop and this has historically been an issue for Eth2.

Why is this hard? The main idea behind blockchains is that we want to verify everything that's going on in order to verify that the whole chain is valid. This is basically like auditing the entire history of things. Sharding helps us because it allows us to only audit the shards we care about, but it's not good enough in most instances. It's still too big for low-capacity environments.

What's the basic strategy? Merkle trees, which basically allow us to store pieces of information in a way that the amount of computation/data to access any one element is logarithmic with the total size of the dataset. We can combine merkle trees with multiproofs, which allow us to access several elements simultaneously with even more efficiency gains by looking at intersections in the proof elements.