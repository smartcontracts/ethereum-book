---
path: "/chapters/building-blocks/casper-ffg"
title: "Finality: Casper FFG"
---

## On Finality
We often take for granted the existence of transactional "finality" in our everyday lives. When we exchange cash for goods or services, for example, it's usually difficult to "revert" a transaction and claw back whatever funds we spent. Merchants might offer refunds in the case that something went wrong with an order, but this is almost certainly conditional on the return or cancellation of the original purchase. Transactions made with credit or debit cards usually follow the same rules, though cards may provide some sort of "chargeback" service in the case a merchant is being uncooperative. Generally speaking, however, most of the transactions we execute through traditional payment methods can be considered final.

Transactional finality is crucial to the proper functioning of an exchange-based society. If there were some non-trivial probability that an electronic transaction could simply disappear into thin air, merchants would likely feel much less comfortable accepting electronic payments. Merchants might be particularly concerned if consumers could abuse this flaw to buy items without actually having to pay for them. It's easy to see why anyone would be weary of such a platform.

Blockchains have, as a result, long attempted to develop a clear sense of transactional finality. Unfortunately, most systems have only been able to present relatively weak forms of finality. Proof of Work blockchains, for example, provide what's often referred to as "probabilistic finality." Transactions in these systems always have some probability of disappearing into thin air, although the actual odds of this happening decrease as time goes on. 

Proof of Stake blockchains need to provide a similar finality mechanism. However, the probabilistic finality of Proof of Work is tied to the high cost to produce competing chains. Validators in a Proof of Stake can produce blocks with a simple signature, so we can't use the same "work" metric to get a sense of finality. Casper FFG is a novel mechanism that attempts address this issue, and Eth2 adapts it into the context of a Proof of Stake blockchain.

Casper FFG, in a nutshell, allows validators to come to agreement about the finality of certain blocks. Crucially, Casper FFG goes beyond the probabilistic finality of Proof of Work blockchains and provides a more "real" sense of finality. Casper FFG allows validators to come to consensus about "checkpoints," blocks which cannot be reverted without great cost. Specifically, Casper FFG guarantees two properties:

1. "Accountable Safety" - Two conflicting checkpoints cannot be finalized unless 1/3 of validators have lost their deposit and
2. "Plausible Liveness" - It will always be possible to finalize a new checkpoint as long as 2/3 of validators are following the protocol

We'll discuss the proofs for these properties in more detail later in this section. First, however, we'll take a look at the fundamentals behind the Eth2 Proof of Stake system that enable Casper FFG.

## Checkpoints
Checkpoints are the poitns at which the network considers a block and all of its ancestors to be finalized. Checkppoints happen at ebbs. Checkpoints happen during special conditions called justifications are linked. The idea of justifications is that there's a concept of a source and a target. A source is a previously justified block. A target is the next block to be justified. Justifications are official once there are sufficient votes for a justification, in ETh2 case its 2/3 of the validator set. For example, see the following diagram.

Justifications aren't actually checkpoints though. We need a little more ,because there's some extra stuff about the temporaility of a checkpoint. The idea is that checkpoitns should be points taht are *really sure* that there's validity of a network. So what we say is we define a rule about when a justification means a checkpoint. What we want to achieve here is that there needs to be certain justifications within a small period of time that make a checkpoint valid. This satisfies the temporality of the system.

So as a result, we want to define a rule. Originally, we said that justifications became checkpoitns when two EBBs in a row were justified. However, this rule is a little harsh when there is some network delay. Basically it's possible that maybe someone hasn't seen that a block is justified yet, and therefore creates justifications where the soruce is n-1 instead of n for n+1. However then maybe we see that N is actually justified later on during n+2, but we don't know if N+1 is justified yet, so we want to use soruce of n. So then we have this situation where theres justifications for n-1, n+1, and n, n+2. However, obviously this is sort of a situation in which n+1 can be checkpointed because your'e allowed to have missing pieces in the justification link as long as all of the missing pieces are themsevles justified. This is a general rule, but in Eth we only look at the k+2 case because of some stuff we use later on for security.

## Slashing
Slashing is the important thing that provides security for the casper FFg system. Basically we want to punish people who try to evade the casper FFg tools. These conditions are as follows. One slashing condition is that we don't want people to try to finalize two different blocks at the same target height. So we say taht someone gets slashed if they ever publish two justifications where the target height is the same, but the actual target block is different. We also have a second rule called no spanning where you're mot allowed to jump over one of your finalization votes. Where a finalization vote is a vote of one edge ???

## Slashing Conditions
