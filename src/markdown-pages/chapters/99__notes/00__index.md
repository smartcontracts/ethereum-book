---
path: "/chapters/notes"
title: "Notes"
---

TODO:
- SSZ
- Merkle Trees
- Design Rationale
- Custody Game
- Honest Validator Assumption
- Weak Subjectivity
- Storage Rent
- Fraud Proofs
- Swap-or-Not
- Guide for Eth2 Developers
- Guide for Eth2 Validators
- Scaling in General (l1 vs l2)

# Validator Guide
Before anyone can become a Beacon Chain validator, they need to create some BLS key pairs. Validators have two key pairs, for security reasons. The first of these pairs is a validator's withdrawal credentials, which are only used for withdrawing funds from the staking system. The second of these pairs is a validator's public key, which is used for all other validator actions, like creating blocks or attestations.

The purpose of this multi-key setup is primarily for security. Since validator public keys will need to be easily accessible to a system connected to the internet ("hot storage"), they are more vulnerable than keys kept disconnected from any network ("cold storage"). By creating a separate withdrawal key that can be kept in cold storage, an attacker is much less likely to be able to steal funds from a validator by withdrawing to their own address. If the attacker gets access to the private key used for attestations or blocks, they can only cause the validator to receive a penalty, which shouldn't wipe out the validator's funds as long as they leave the system early enough.

The Eth1 deposit contract has already been specified, so we're able to take a look at the requirements in the transaction. Deposits require three pieces of information. First, deposits require a `pubkey`, which is the 48 byte BLS public key corresponding to the key that the validator will use for all actions except withdrawals. Deposits also require a `withdrawal_credentials`, which is the 32 byte `sha256` hash of the BLS public key corresponding to the validator's withdrawal key. We use the hash of the withdrawal public key instead of the public key itself as an extra layer of security. Finally, validators need to provide proof that the actually have the private key for the given `pubkey`, so they're required to give a signature over the other data using `pubkey`. This is mainly so we can avoid any sort of errors that might cause someone to submit a deposit with an invalid public key, but also serves to prevent anyone from using someone else's public key which could cause issues.

There is currently no way to get your deposit back from Eth2 once you've submitted it on Eth1. You should be aware of this so that you know that! Also, we'll talk about it mroe later, but in Phase 0 there is no way to actually withdraw your funds from Eth2.

Ethereum is, perhaps, one of the most ambitious distributed software projects of all time. From its humble beginnings in 2014, Ethereum has grown to attract thousands of developers and billions of dollars. Development of Ethereum can likely be credited with many of the fundamental research developments in the distributed systems space over the last five years. 

Ethereum is also, however, significantly too limited in its current form to achieve its grand vision of decentralized finance. Ethereum's limitations arise from several fundamental roadblocks. 

The primary goal of any blockchain system is to ensure that account balances remain accurate. Blockchains achieve this goal by introducing the concept of a shared transactional ledger. In short, all transactions on a blockchain system are broadcast to all parties within the system. Parties who wish to, say, find the balance of a particular account need only execute each transaction in order to determine the final state of the system.

Unfortunately, this immediately causes certain issues. Each transaction needs to be both downloaded and executed. As a result, we are limited in the total number of transactions the system can handle by the size of each transaction in bytes (bandwidth, how much a user can download) and the computational complexity of the transaction (cycles, how much a user can execute). 

Currently, we find that Ethereum can handle approximately XX transactions per second, though exact throughput is highly dependent on the contents of the transactions. Although it's not clear how many transactions per second we really need, it is clear that this current number simply isn't enough. When we're up against these limitations, we need to start thinking outside the box. 

Eth2 is the umbrella name of a series of improvements to Ethereum that would allow the system to process significantly more transactions without sacrificing the security. It introduces a new proof-of-stake consensus mechanism. It also introduces the concept of "shard chains," separated blockchains that can interact with one another and draw security from a common source, but don't need to execute the transactions of other chains. 

Eth2 introduces the large new change from PoW to PoS. PoW has been shown to be a wasteful consensus mechansim. Although there are still plenty of debates about the actual difference in wastefulness, these debates really don't matter because PoW is *clearly* bad PR. When we're up against global warming and it's really starting to make changes to our environment, there's a need to move away from something that *obviously* wastes energy and toward something that *most likely* doesn't waste nearly as much. It looks better.

Anyway, PoS introduces new concepts into the Ethereum ecosystem. Mainly, we'll no longer have miners who run GPUs. Instead, people will have to lock assets into Ethereum and will then be given the power to produce blocks on Ethereum.

Several options for scaling Ethereum have been presented in its lifetime. Most notably, we've seen the development of supernodes, L2, and shard chains. Each of these options carry trade-offs, though all increase the throughput of Etherum as a whole. 

Supernodes are one such concept. In a supernode system, we require that there exist a few nodes that can execute every single transaction. Of course, this is not feasible for the average user. The average user could keep track of a small subset of the total transactions, but they would have to trust the set of supernodes to correctly store and execute all of the transactions if they want to download any new ones. This is bad because it decreases the total number of parties that could cause the system to act in a faulty way.

One fundamental thing that we want to maintain in a scaled Ethereum is the avoidance of any sort of centralization. When a scaling mechanism requires that we hand control over to a few entities with resources, we tend to avoid that solution. Supernodes are one such solution. Generally speaking, supernodes are the idea that we should create a few nodes that can actually handle mass amounts of data. Basically, we simply accept the idea that there must be a party capable of executing every transaction that goes through the system. Of course, these systems are brittle because they're highly subject to coersion. We always want to maximize the number of parties that need to be compromised before the system as a whole becomes compromised. The average user cannot run and operate the scale of node that a supernode requires.

Various other proposals, called L2 proposals, because they live on top (on another "layer") have been proposed over the years. Generally, these proposals insert some sort of information into Ethereum ("commitments") but do some additional execution outside of Ethereum. For example, plasma, payment channels, state channels, whatever. 

Layer 2 proposals go hand-in-hand with Eth2. These proposals do not forgo the need for a construction like Eth2, in fact, they complement Eth2 very well. 

[https://notes.ethereum.org/@vbuterin/rkhCgQteN]
Eth2 was designed with several key principles in mind. Namely, these principles are simplicity, stability, sufficiency, security, and light-client verifiability.

Simplicity is at the core of Eth2 development. Proof of Stake and sharding are complex constructions. As with any project, complexity is often at odds with accessiblity. As a result, Simplicity is one of the most important things to keep in mind durign ETh2 devgelopment. Simplicity is also key because it minimizes cost and reduces security risks. 

[https://radicalxchange.org/blog/posts/2018-11-26-4m9b8b/]
One thing with simplicity is that it allows protocol designers to easily convince users that parameter choices are legitimate. Central planning has come to be considered an undesirable thing. However, someone needs to make *some* decisions about certain things. Especially when that comes to parameters about how the system should work. For example, block times have been an extremely contentious thing. When a system is complex, there are more dials and knobs to be turned. The more dials to turn, the more decisions we have to make right now. AS vbuterin says, we know little and we should not design systems that demand us to know a lot. Simple protocols also have fewer moving parts. Also, simple protocols achieve legitimacy more easily because parameter tuning can be more easily justified. We don't want protocol designers to have weak justifications for lots of paramters, we want protocol designers to have strong justifications for a few parameters. When there are a lot of knobs to be turned, there might be certain knobs that seem useless but actually have a large impact, opening the door for capture by private interests. Fewer parameters = better systems!

[Above should really be expanded into its own section]

Stability is obviously a key component of any system. These protocols shouldn't be changed for a long time, especially because it's so contentious to make these changes. Innovation should be pushed to higher layers that don't impact all users. We don't want things to be super flexible at the base layer because that just causes even more debate. Again, more flexibility means more complexity, means more dials to turn. 

[Add section on innovation at higher layers?]

Sufficiency means that it's possible to build many different types of applications on the same base layer. This isn't about making the protocol ridiculously flexible, it's about making sure that an extremely simple base layer can still support an interesting set of applications. We obviously don't want to just focus in on a single application, having the EVM was really what set Ethereum apart from other blockchain projects. So there's a sweet spot in simplicity. It's also cool that we can sort of abstract these things apart so that the complexity is happening at a higher level (EEs).

Security is what guarantees that your pile of money will still exist tomorrow. We really want to amke sure that Eth2 is robust against many different classes of attacks. We want to preempt as many of these attacks as possible before releasing a new thingy. Obviously there's a point at which we want to stop with security, so that's a consideration. But there are many that we can actually preement like network latency, faults, motvations.

Light clients are important because many users won't have the hardware or don't want to have the hardware that can actually verify a ton of data on the blockchain. Light clients should be able to verify things under certain conditions. Otherwise, users would have to carry beefy machines around with them all the time, which obviously won't happen. We need to be realistic with what we expect from our users. This follows from defence in depth. Light clients are clients that only verify a subset of all the data,  and don't get full guarantees but should get as many guarantees as possible. We can't have everyone with light clients or the system wouldnt work. So it's also about the middle ground between "full nodes" and "super nodes", in that "full nodes" should be accessible to users but users shouldn't *have* to use them whereas supernodes are generally inaccessible to most users.

[https://vitalik.ca/general/2018/08/26/layer_1.html]
Let's talk about tradeoffs between l1 and l2. We want to find a sweet spot where there are sufficiently many features at L1 that innovation is possible, but that most crazy stuff happens at L2. 

- l2 arguments:
    - reduced base layer complexity
    - reduced need to modify consensus layer
        - reduces complexity
    - more flexibility
- l1 arguments:
    - reduced stalled progress
    - reduced compleixty maybe?
    - L1 needs to be at least somewhat powerful to support l2

We want to carefully balance these two. Primary inclusions in the philosophy of Eth2 are:
- quasi-Turing-complete and richly-stateful execution environments
    - to build l2 applications
- scalable data availability and computation
    - doesn't limit us to techniques like plasma that have trouble generalizing
- fast block times
    - doesn't limit us to channels for fast transactions

other features left to L2 are, because rapid innovation:
- privacy
- high-level languages
- scalable state storage
- signature schemes

[https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ]
Why PoS?

## Finality

When we exchange cash for goods or services, it's usually difficult to "reverse" our transactions and claw back whatever funds we spent. Merchants might offer refunds in the case that something went wrong with an order, but this is almost certainly conditional on the return or cancellation of the original purchase. In the blockchain world, we often refer to this quality of irreversibility in a transaction as "finality."

Electronic transactions made with credit or debit cards are usually similarly difficult to reverse. Some cards may provide some sort of "chargeback" service, though these are usually only effective if a merchant is being uncooperative. Generally speaking, however, most of the transactions we execute through traditional payment methods tend to be difficult to remove from our monthly statements.

Transactional finality is crucial to the proper functioning of an exchange-based society. If an electronic transaction could simply disappear into thin air, merchants would likely feel much less comfortable accepting electronic payments. Merchants might be particularly concerned if consumers could strategically abuse this flaw to "buy" items without actually having to pay for them. It's easy to see why anyone would be weary of such a platform.

## What *is* Casper FFG?
Blockchains have always struggled to develop a clear sense of transactional finality. Most systems have only been able to present finality in relatively weak forms. Proof of Work blockchains, for example, usually provide what's often referred to as "probabilistic finality." Blocks in these systems can, in theory, always be forked out of the "canonical" chain if enough resources are diverted into a competing chain, though the actual odds of this decrease quickly as more blocks are added onto the chain.

Proof of Stake blockchains need to provide a similar finality mechanism. However, probabilistic finality is tied to the high cost to produce competing Proof of Work chains. Validators in a Proof of Stake chain can produce blocks with relatively minimal effort, so we can't use the same "work" metric to get a sense of finality.

Casper FFG is, in a nutshell, a protocol that allows validators to vote to have certain blocks "finalized." Casper FFG is unique in that it provides stronger guarantees about finalized blocks that go beyond simple probabilistic finality.

Without further ado, let's look at Casper FFG under the hood.