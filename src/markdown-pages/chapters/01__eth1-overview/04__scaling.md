---
path: "/chapters/eth1-overview/scaling"
title: "Scaling"
---

```text
DRAFT STATUS: 1/5
```

## Blockchain Limitations
The decentralized nature of Ethereum and other blockchains inherently limits the extent to which these systems can scale. Most blockchains attempt to guarantee that the "average user" can verify the chain for themselves. As the cost to verify the chain increases, it becomes more likely that individuals with access to more resources can manipulate the chain for personal gain.

In order to guarantee this property, we must necessarily place certain constraints on the network. If blocks can be massive, for instance, then the average user may no longer be able to afford the storage or bandwidth costs to synchronize a client. Even with certain limits, blockchain state can quickly grow beyond the reach of most users.

Of course, these self-imposed limitations reduce the total number of transactions that Ethereum can process at any given time. Though transactions vary in size and complexity, Ethereum can currently only handle an average of [TODO] transactions every second.

Given this limitation on transaction throughput, the strategies for scaling blockchain systems tend to follow the same basic principle. If we are unable to simply increase the number of transactions on our chain, then we may be able to construct a system in which a user can safely ignore certain transactions.

We can mathematically describe this concept. Assuming that we have a given volume of transactions of order `O(n)`, a user should be able to securely use the system with `O(c)` computational resources. Our system is scalable if `O(c)` grows much less quickly than `O(n)`, preferably `O(c) = O(log(n))`. Such a system would be able to scale extensively without introducing significant computational load on users.

## Layer 2 Scaling Strategies
Layer 2 scaling mechanisms basically work by trying to take advantage of situations in which a smaller group of people is making many transactions between themselves. The basic concept is that when users make transactions between one another, we can collect these transactions into bundles and execute them simultaneously or only execute the final result of all of the transactions. Moreover, since we only look at a final result, there's no need for other parties to worry about the intermediate steps that ended up with that final result.

There are a few primary areas in layer 2 scaling, and each area depends on certain assumptions. The area of "channels" are basically where a very small group of people, usually just two people, make transactions between themselves. After each transaction, the whole group of people agrees on the state of the system. We need a deposit at the beginning that adds funds into the small system. At each transaction, we have a new agreed upon state. When the parties want to stop transacting, they can simply put the final state of the system on the blockchain. This is the core of the channel system, though there is some more interesting stuff necessary when one of the parties is trying to be malicious.

Another strategy, generally called plasma, can be used when a large group of people want to transact. Since there are many people, it's effectively impossible for the entire group to sign off on every new state. It's simply too much to do, and even a single offline party would ruin the system. Instead, plasma systems use their own consensus mechanism to figure out the state of the system. Users make transactions that are regularly collected into blocks, just like they would be on the main blockchain. Headers for these blocks are published to the main blockchain in a way that users can withdraw their funds by referencing the state of the system via these blocks.

Plasma is very similar to sidechains, which also have these blocks that get published to the primary blockchain. The main difference between plasma and sidechains is that in a plasma chain, there are certain tools used to ensure that the consensus mechanism cannot steal user funds by creating invalid blocks. This does create certain problems for plasma though, mainly in the flexibility of the things that users can do on the sidechain because if something goes wrong, the state of the system needs to be "dumped" onto the main chain.

Finally, one last layer 2 mechanism is called rollups. In a rollup system, we basically collect full transactions and put them on chain in a way that's more efficient than executing these transactions one by one. This is similar to a block, but it's basically just a mechanism to make contracts much more efficient by executing many transactions at once. There are certain directions in this field, whereby we can either actually execute the transactions or we can simply put the data on-chain and give an "optimistic" execution of the transactions that can be challenged if the execution is invalid.

## Layer 1 Scaling Strategies
For instance, an optimization to the EVM that reduces the cost of certain common complex functions would fall under the category of layer 1 scaling. Such a change would likely require a modification to all Eth1 clients. Similarly, a block size increase would linearly scale a chain and typically requires a change to client software.

Any layer 1 improvement can be identified by the need for a change at the consensus layer of the system. These changes require a "fork" in which client software must be modified. We can divide these forks into "soft forks" and "hard forks," depending on the extent of the change. A "soft fork" can be used when a change is backwards-compatible. A "hard fork" is necessary when a change would cause older clients to reject the new chain.

On the topic of layer 1 mechanisms though. So Eth2 is considered a layer 1 scaling upgrade to Eth1. It's a little hard because Eth2 is such a big change over Eth1. but anyway, let's understand the layer 1 areas because it's important to understand why Eth2 is the way that it is.

There are certain layer 1 mechanisms called linear scaling. This is stuff like increasing the size of each block. It increases throughput of the system, but it also simultaneously increases the computational load of checking these systems. Similarly, creating two version of Ethereum would also fall under this definition since there are twice as many blocks. Same if we just doubled the number of blocks.

What we really want is quadratic scaling, in which the throughput of the system increases to an exponent of the computational load. Earlier ideas of this were concepts like supernodes. The idea here is that there would be certain "big" nodes that would handle all transactions, and users only needed to hande a certain portion of these transactions that they cared about. However, this clearly violates the condition of decentralization because these supernodes have some control over the system and it's now easier to manipulate the small set of supernodes.

Eth2 takes a different pathway called sharded scaling. Basically, in the land of databases, shards are small pieces of the total database. Traditionally this is used so that each individual database is much smaller and easier to handle than putting everything in one central location. What Eth2 attempts to do, at a high level, is create a system in which there are many small "shard" chains that are each like their own blockchain. These shard chains are connected by a single "system chain" that handles the logic for ensuring that all of the shards will be valid. Primarily, the system chain uses novel mechanisms in random sampling that mean validators can be guaranteed with some probability that the chain will be valid, even without needing to validate the whole chain. Using such a probablisitic method, the average user can be a validator of the system with significantly less resources than would be necessary to check the whole system. We basically use economics to ensure that even though the user may not see the whole system, they can be sure it's valid under certain assumptions. Furthermore, a user can use a single shard and even interact with other shards without the need to check the other shards, since they can be sure the other shards are valid.

## An Aside: Combining Layer 1 and Layer 2
Because layer 1 changes impact the base protocol, they can often be difficult to implement. Large client updates are complex to organize and can be contentious in some cases. Particularly, changes to miner rewards or economics have often faced strong backlash. In general, layer 2 mechanisms attempt to increase the throughput of a blockchain system without introducing changes at the base layer. By avoiding contentious changes, layer 2 approaches can innovate much more quickly than their layer 1 counterparts. However, this often comes at the cost of reduced flexibility.

So if layer 2 is easier than layer 1, why don't we use that? Well like we said, layer 2 is somewhat limited by layer 1. When we scale layer 1, we can also increase the number of options for layer 2. In this sense, both layer 1 and layer 2 are complementary and feed into one another. Layer 1 and layer 2 both have their place in the scaling world. The general philisophy on this in Ethereum is that we should have a strong and scalable layer 1 that is well defined, and built to last. After that, we should focus on layer 2 to get the more novel innovative scaling mechanisms since we can use them without needing to worry about controversy about layer 1 changes.
