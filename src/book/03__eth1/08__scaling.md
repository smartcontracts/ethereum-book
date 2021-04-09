---
title: "Scaling"
---

# {{ $frontmatter.title }}

::: tip NOTE
Not very happy with this draft yet. Needs a clearer vision.
:::

Ethereum blocks are created roughly every 15 seconds and contain, on average, somewhere between 50 and 150 transactions. Other comparable blockchain systems share a similarly sluggish pace in comparison to modern centralized payment providers. However, this stems not from any lack of demand on the part of users; Ethereum currently has approximately 60,000 transactions pending for inclusion within the blockchain. Such a discrepancy in supply and demand suggests a more fundamental limitation on these blockchain systems.

Ethereum's limited throughput is actually a result of caps set by miners on the total amount of gas that can be expended within their blocks. Certain blockchains, like Bitcoin, instead set fixed caps to the size of all blocks on the network. This fact seems to suggest the reasonable conclusion that these systems should increase throughput by simply removing any sort of limit on gas expenditure within blocks. We can become more familiar with the fundamental problems of blockchain scaling by exploring the impact of this sort of change in an imaginary blockchain.

We'll begin by defining two variables for our analysis. `state_size` represents the total size of the state within our imaginary chain. `participation_cost` represents the average cost for a user to participate in the consensus process of our chain. Like in most blockchains, users that participate in consensus must execute all transactions within each block for themselves.

From this last property, we can begin to see our dilemma. If we double the size of each block in the chain, we've doubled `state_size`. However, users now also need to execute roughly twice as many transactions, so we've also doubled `participation_cost`. For this reason, block size increases are considered a form of *linear scaling*, in that they increase `state_size` at the same rate as `participation_cost`.

Increases to `participation_cost` are, generally, bad for a blockchain system. Much of the decentralized nature of Ethereum and other similar blockchains relies on the ability for a wide variety of users to easily participate in the system. This diversity and accessibility increases the robustness of the protocol to centralization or collusion between different parties. It is, quite simply, harder to attack a network when its participants are culturally, geographically, and socially diverse.

So, as `participation_cost` increases, we very quickly begin to face issues with centralization. Clearly, a higher entry cost naturally reduces the number of individuals who can afford to participate in the network. Given the rampant wealth inequality of modern capitalism, even small increases to `participation_cost` might exclude large swaths of potential participants.

Our concerns don't end there, unfortunately. If `participation_cost` grow to a sufficient level, users may no longer find it feasible to participate from a home computer and may be forced to rely on already-centralized cloud infrastructure. Such a scenario would give cloud providers significant control over the network simply by nature of having control over the physical hardware running its nodes.

This relationship between participation costs and centralization forms the basis of the scalability dilemma in modern blockchain systems. Linear increases `state_size` and `participation_cost` are ineffective long-term solutions. Instead, blockchains seek to find constructions that allow for *superlinear* scaling, in which `state_size` increases result in a disproportionately small increase to `participation_cost`.

In order for `state_size` to increase more rapidly than `participation_cost`, it *must* be true that some users are not executing all transactions. Indeed, the basis for all superlinear scaling is that, under certain conditions, users may safely ignore a given transaction entirely.

## Layer 2 Scaling Strategies

Several strategies have been developed toward this goal of superlinear scaling. One overarching class of strategies, layer 2 scaling mechanisms, focuses on the introduction of blockchain *applications* that increase total transaction throughput. Generally, these applications take advantage of situations in which groups of users are making many transactions amongst themselves.

Payment channels are one such layer 2 scaling mechanism used to simplify the process of making payments within a very small group, typically only two people. Users can "enter" into a payment channel with other users by depositing funds into an application on an existing blockchain. These deposits represent the initial balances within the channel, which can then be modified by agreement of all parties in the channel.

Since all parties are agreeing to all balance changes, there's no need to publish all of these changes publicly. Instead, the users simply need to publish the *final* set of balances in order to "close" the channel. Users could potentially carry out an unlimited number of transactions privately before settling back onto the blockchain. Since these intermediate transactions are never published, `participation_cost` for the primary blockchain does not increase.

```text
TODO: Is it worth going this deeply into L2? Should we talk about plasma and rollups?
```

## Layer 1 Scaling Strategies

Layer 2 scaling mechanisms are inherently limited by the blockchains they're deployed to. These mechanisms can often be quite complex by themselves, and often need to introduce additional complexities to address limitations of their host chains. As a result, we simultaneously explore layer 1 scaling opportunities, another class of mechanisms involving modifications to the underlying blockchain itself.

The previously discussed block size increase would fall under the category of layer 1 scaling, as it involves a modification to the base layer of the system. Certain blockchain networks utilize this philosophy heavily and simply require that users bear a very high participation cost. However, we found this sort of change inadequate as it only scaled the system linearly.

```text
TODO: How much detail should we add about sharding?
```

## An Aside: Combining Layer 1 and Layer 2

Because layer 1 changes impact the base protocol, they can often be difficult to implement. Large client updates are complex to organize and can be contentious in some cases. Particularly, changes to miner rewards or economics have often faced strong backlash. In general, layer 2 mechanisms attempt to increase the throughput of a blockchain system without introducing changes at the base layer. By avoiding contentious changes, layer 2 approaches can innovate much more quickly than their layer 1 counterparts.

However, these mechanisms are always limited by the underlying blockchain. Layer 1 improvements generally increase the number of available options on layer 2. These two classes of improvements therefore tend to feed into one another; both layer 1 and layer 2 have their place in the scaling ecosystem.
