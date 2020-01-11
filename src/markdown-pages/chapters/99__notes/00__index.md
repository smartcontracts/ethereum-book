---
path: "/chapters/notes"
title: Notes
---

Before anyone can become a Beacon Chain validator, they need to create some BLS key pairs. Validators have two key pairs, for security reasons. The first of these pairs is a validator's withdrawal credentials, which are only used for withdrawing funds from the staking system. The second of these pairs is a validator's public key, which is used for all other validator actions, like creating blocks or attestations.

The purpose of this multi-key setup is primarily for security. Since validator public keys will need to be easily accessible to a system connected to the internet ("hot storage"), they are more vulnerable than keys kept disconnected from any network ("cold storage"). By creating a separate withdrawal key that can be kept in cold storage, an attacker is much less likely to be able to steal funds from a validator by withdrawing to their own address. If the attacker gets access to the private key used for attestations or blocks, they can only cause the validator to receive a penalty, which shouldn't wipe out the validator's funds as long as they leave the system early enough.

The Eth1 deposit contract has already been specified, so we're able to take a look at the requirements in the transaction. Deposits require three pieces of information. First, deposits require a `pubkey`, which is the 48 byte BLS public key corresponding to the key that the validator will use for all actions except withdrawals. Deposits also require a `withdrawal_credentials`, which is the 32 byte `sha256` hash of the BLS public key corresponding to the validator's withdrawal key. We use the hash of the withdrawal public key instead of the public key itself as an extra layer of security. Finally, validators need to provide proof that the actually have the private key for the given `pubkey`, so they're required to give a signature over the other data using `pubkey`. This is mainly so we can avoid any sort of errors that might cause someone to submit a deposit with an invalid public key, but also serves to prevent anyone from using someone else's public key which could cause issues.

There is currently no way to get your deposit back from Eth2 once you've submitted it on Eth1. You should be aware of this so that you know that! Also, we'll talk about it mroe later, but in Phase 0 there is no way to actually withdraw your funds from Eth2.

# Validator Duties

## Creating Attestations

Validators also need to create attestations, or votes, about specific blocks. This is related to LMD ghost and FFG. in an epoch, we use the RANDAO value to break the list of validators evenly across each block during the next epoch. So we know one block in advance. This is tuneable. 

Then, the validator is responsible for downloading the block at slot+1/2t and checking that it satisfies all of the required conditions. Namely, they will check that there aren't too few or many exits and deposits, slashing was valid, etc. Look here for a complete list of the validity conditions within each block. If the block is valid, they will sign off on the block and broadcast this to the network.

Attestations are cool because not only do they sign off on a block, they also implicitly sign off on all parents of the block. And therefore, also sign off on the justification link within the EBBs for finalization. So one signature, multiple actions. 

## Creating Blocks

One of the most important duties of the validator is to create new blocks. Let's explore the various pieces of the Beacon Chain that the validator is responsible for updating within each block.

### Exits
Validators are responsible for including any exits by other validators in the system. Exits can take three different forms, voluntary, insufficient balance, and slashed. If another validator created a message saying they wanted to be exited, then we put this into the block and they'll be exited a few blocks later. If a validator runs out of balance, similar. In both of these cases, validators are naturally incentivized to do this because it reduces the total number of validators in the system and therefore increase the reward per validator (including themselves).

We only process [TODO] exits per block, validators won't accept the block if more or less are processed. Up to number pending. An exit is usually marked before it actually goes into effect, we can mark as many as we want but won't be processed until queue goes out.

### Eth1 Data
Validators need to include Eth1 data in each block. What they do is basically "vote" for a given Eth1 deposit contract root. The Beacon Chain holds a vote that is tallied every [TODO] epochs. If some deposit root gets 2/3rds of votes by stake over that time period, then it is considered the current valid deposit root.

In order to make sure that the system converges on a specific vote, we have a "pile on" vote system. Validators will basically have three options. If no Eth1 data because at the start of the vote, they get their own Eth1 data. If there is Eth1 data but vote period has only just started, we pick whichever is the least stale. If the vote period is long underway, we pick whichever has the most votes. Easy.

We make sure to follow the Eth1 chain by a safe distance (1000 blocks, ~4 hours) so that we don't get a reorg on Eth1 chain that messes up the Eth2 chain. This distance is long enough that there really has never been a reorg this big so we just assume that it'll be safe and won't mess the chain up. If a reorg did happen, then we'd have a bad situation in which a validator is part of the chain but doesn't have a deposit on the Eth1 chain possibly.

### Deposits
This is an important part of the process. Validators are responsible for processing deposits in the deposit contract. We get the list of people who have deposited and haven't been processed yet. Then we process [TODO] of the validators, or as many as are left if less than this. Validators won't attest to the block if they don't include the required amount. defined by CHURN.

### Slashed Exits
Validators also include any slashings in the block. This only happens if the block proposer has evidence that a validator should be slashed. When this happens, the block proposer gets a reward for including the evidence as a portion of the slashed amount. In order to incentivize this behavior. 

Slashings are interesting because they require that the validator actually have additional evidence. Since slashable validators won't actively share evidence of their bad actions (if they're smart), validators are going to be responsible for checking this for themselves. This is an additional cost for the validator, but again we reward them with some of the reward.

### Including Attestations
So part of the block as well is the attestaions. The way this works is that the validator will look at the network for attestations of the last few blocks that haven't been included yet. Especially the previous block, since that's the one that won't have any included attestations yet. The validator waits for signatures and will aggregate themselves, but aggregations will also be sent across the network.

Once the validator collects signatures, they add it to the block. Since it's cheaper to have fewer aggregations that have more component signatures, we want to add micro-incentives that basically reward people for including (1) good aggregations with many signatures and (2) recent aggregations. The less recent the aggregations, the less the reward. The total amount rewarded is about 1/8 of the reward that goes to the aggregators, so not insignificant.

### Randao reveal
like we talked about, validators reveal a randao thing. We said vaguely that validators doa  commit-reveal. Generally speaking, a cryptographic commitment can take many forms. For example, we can create a commitment in a sense by requriing that the reveal be a signature on a known value. In this sense, we can verify that the signature was in fact on the known value and therefore the signature is a reveal on that commitment.

In our case, we say that the block producers signs the current block height. Simple enough also because it doesn't erquire that we have producers actually broadcast any sort of commitment. 




# Intro to Building Blocks
So let's get right into Eth2 why don't we. We are starting off with the core building blocks behind the Beacon Chain. Since the Beacon Chain is the main part of the Eth2 ecosystem before shards. 

We're going to talk about a few different things. First were going to explore the general structure of the beacon chain. The beacon chain is a little different from Eth1 in that it isn't just structured as a series of blocks. We'll expain later. We introduce core ideas like validators too and the main things that they have to do at a high-level.

Next we look at some of the tools validators use in Eth2. These are things like cryptographic tools necessary for making Eth2 a reality and the mechanism that Eth2 uses to select validators for their various roles. Basically, we're covering first how validators actually do what they need to do from a technical perspective and then we cover how the beacon chain choses certain validators to do these things.

After this we look at the ways that PoW has to change in PoS. These are mainly about things like coming to agreement about which blocks are the valid ones and which ones not to follow. This is because we always have forks in blockchain systems and we need to pick which fork to follow. We also talk about FFG, which is a system meant to create a sense of "finality" or irreversibility about specific blocks and punishes any validators who try to go back on their word.

These really form the core of the Beacon Chain. It's what allows the beacon chain to run properly.

# Networking

networking is critical for any blockchain system, mainly peer to peer networking. Without a network, there's no way to communicate. Without communcation, there's no way to agree about things or even talk about what we want to agree about. 

We want peer to peer networks because theyre more resilient to attack. The idea in a server-client system is that there's a direct connection between two parties where the server sort of acts like a hub for connections. This is vulnerable to attack because if the server goes down, the whole system goes down. Instead, we want a system where every node is pretty much equal and therefore the network can recover around failures.

Networks usually consist of two pieces. There's a physical component, which is the wires or communication links between nodes (wires, wifi, whatever). Then theres a logical component (protocol) which determines how people can talk to one another. Just having wires means nothng. If I send you morse code, you dont really know what it means unless you understand morse code. Plus, you also don't know what it means unless you understand english too. Same idea. We come up with a basic system for sending messages (packets) and then we come up with a protocl on top. 

## Libp2p
Eth1 used a custom protocol called devp2p. Devp2p had many issues and so there was a big push to upgrade the system. Eth2 decided to use a newer thing called libp2p.

Libp2p is pretty cool. The main idea behind libp2p is a series of logical connections. SO the idea here is taht we sort of abstract the underlying communication line (wire, wifi, whatever) and just say we have a "connection." This is really cool because it means that nodes can communicate over any number of physical lines, including bluetooth or even snail mail (though that one might be too slow). It's robust no matter the underlying scheme. Devp2p really didn't have this idea.

Libp2p also lets us do some stuff called channels and subsriptions. Basically, on eth2 theres certain information that only some people care about. For example, block producers care about attestations, but users probably don't really care about those attestations untilt hey're actually included ina  block. A producer can simple subscribe to this whereas the user decides not to. We only need the data we care about, and its much more efficient. Libp2p introduces a very optimal algorithm for sharing messages in a gossipy way that doesn't duplicate messages over and over and introduce a lot of network lag and weight.

libp2p also lets us do a thing where peers can relay connections for other peers. For example, let's say I have a connection to Alice who has a connection to bob, but im unable to get a direct conneciton to bob. I can still communicate to bob in a secure way, and alice will just relay our messages on our behalf. Cool!

Libp2p is great but has some downsides too. It's complex and much bigger than devp2p. The spec is really big and it's also a moving target that hasn't been completely set in stone yet. We also have to implement a lot of optional components and we use non-traditional transports since we want eth2 be able to run everywhere. That said, teams have been doing a great job with the project so far and have managed to successfully implement basic interop between clients. It makes eth2 stronger! It has support from otehr big institutions and is definitely ahead of the pack in many ways.

Networks need discovery mechanisms, which basically means two things. it means you need to find which computers on the internet you can actually talk to, and it also means you need to find the capabilities of those computers. For example there might be different comptuers in the network that do different things. We could have a computer that is a validator, who has access to blocks and such, and a computer that is just watching the network for the sake of some sort of analysis. Each computer therefore needs to tell the world what sort of capabilities it has, so that other computers can ask for data or results or whatever.

libp2p uses a system called kadamelia which is ok but not perfect. Eth2 needs a better discovery mechanism so it uses a different thing called discovery v5, whicha llows for both capability advertising and topic advertising (I have acceess to this infromation). It's more flexible than kademelia and is also nice because it's shared with eth1 and reduces development cost.

We have certaint ypes of requests that peole can make for example ask for a given block by its root, ask for a range of blocks for sync.

One thing thats interesting is taht although it us under the rest of the system, we do need to coordinate any sort of forks to the networking protocol. Let's say we want to update how we advertise a given topic. If only some participants follow this upgrade, we could have a network split. Therefore not good and must coordinate forks to the same level as changing soenthing like block structure on beacon chain.

# Light Clients

Light clients are basically software than can consumer a blockchain data with requirements logarithmic to the size of the blockchain. Usually when you're consuming an individual blockchain, you need to look at the entire blockchain in order to figure out what's going on. We want to be able to allow clients to figure out what's going on under some assumptions without needing the space or computaitonal requirements to download the whole chain.

Generally speaking this is improtant for low-resoruce evinronments like phones. We can't jsut put gigabytes worht of blockchain data on a phone and it would take forever to verify it all at least for now.

# Light Clients

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

## Eth2 Failure Modes

### Bad Proposer, Good Committee
Bad proposer produces a bad shard block. Good committee will reject this block and nothing happens.

### Bad Proposer, Bad Committee
Bad proposer producers a bad shard block. Bad committee accepts block and it becomes part of canonical state.

Possible to recover via fraud proofs, though this requires heavy rollbacks of the chain. We also have some ideas for a rollup type system in which clients have more subjectivity about the state of the chain and can choose to apply fraud proofs (?).

# Project Areas

## Eth2 Clients
- LodeStart
- Quilt

## Eth2 Research Areas
- Fee markets
- Signature aggregation algorithms


