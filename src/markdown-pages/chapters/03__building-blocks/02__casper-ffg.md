---
path: "/chapters/building-blocks/casper-ffg"
title: "Finality: Casper FFG"
---

## On Finality
When we exchange cash for goods or services, it's usually difficult to "reverse" our transactions and claw back whatever funds we spent. Merchants might offer refunds in the case that something went wrong with an order, but this is almost certainly conditional on the return or cancellation of the original purchase. In the blockchain world, we often refer to this quality of irreversibility in a transaction as "finality."

Electronic transactions made with credit or debit cards are usually similarly difficult to reverse. Some cards may provide some sort of "chargeback" service, though these are usually only effective if a merchant is being uncooperative. Generally speaking, however, most of the transactions we execute through traditional payment methods tend to be difficult to remove from our monthly statements.

Transactional finality is crucial to the proper functioning of an exchange-based society. If an electronic transaction could simply disappear into thin air, merchants would likely feel much less comfortable accepting electronic payments. Merchants might be particularly concerned if consumers could strategically abuse this flaw to "buy" items without actually having to pay for them. It's easy to see why anyone would be weary of such a platform.

Blockchains have always struggled to develop a clear sense of transactional finality. Most systems have only been able to present finality in relatively weak forms. Proof of Work blockchains, for example, usually provide what's often referred to as "probabilistic finality." Blocks in these systems can, in theory, always be forked out of the "canonical" chain if enough resources are diverted into a competing chain, though the actual odds of this decrease quickly as more blocks are added onto the chain.

Proof of Stake blockchains need to provide a similar finality mechanism. However, probabilistic finality is tied to the high cost to produce competing Proof of Work chains. Validators in a Proof of Stake chain can produce blocks with relatively minimal effort, so we can't use the same "work" metric to get a sense of finality. Casper FFG is a novel mechanism that addresses this issue.

## Casper FFG Guarantees
Casper FFG, in a nutshell, allows validators to come to consensus about "checkpoints," specific blocks that can't be reverted.

## Deposits
Casper FFG requires that all validators in the system have a **deposit**. Currently, Eth2 validators must submit an initial deposit of 32 ETH. Although all validators start with the same deposit, a validator's deposit can decrease if the validator misbehaves. When we refer to fractions of the total number of validators (e.g., 2/3rds of validators), we're actually referring to the set of validators whose deposits make up that fraction of the total stake. 

## Checkpoints
Checkpoints are specific blocks that validators can attempt to finalize. For the sake of efficiency, Casper FFG doesn't allow every block to be a checkpoint. The Beacon Chain defines only [Epoch Boundary Blocks](/chapters/phase-0/blocks-slots-and-epochs#epoch-boundary-blocks) as checkpoint blocks.

## Votes
Validators come to consensus about which checkpoints should be finalized by creating and broadcasting **votes**.

The goal of Casper FFG is to create a "chain" of finalized checkpoints. Just as blocks in a blockchain always reference some parent, validators always reference some older checkpoint (the "source") whenever they vote to finalize a new checkpoint (the "target").

Votes consist of:

1. The hash of some "source" checkpoint.
2. The hash of some "target" checkpoint that is a descendent of the source checkpoint.
3. The height of the source checkpoint in the blockchain.
4. The height of the target checkpoint in the blockchain.
5. A signature on the above data from the validator's private key.

## Supermajority Links and Justified Checkpoints
Of course, a single vote isn't enough to finalize a block. When 2/3rds of validators create a vote with the same source and target checkpoints, we say that these checkpoints are connected by a **supermajority link**. 

A target checkpoint becomes **justified** when it is connected to an already-justified source checkpoint via a supermajority link. Since we can't create justified checkpoints without connecting them to other justified checkpoints, we make the genesis block justified by default.

Checkpoints cannot be justified unless they are *directly* connected to a justified source checkpoint. That is, a supermajority link between `(Justified Checkpoint A, Checkpoint B)` justifies `Checkpoint B`, whereas supermajority link between `(Unjustified Checkpoint A, Checkpoint B)` does not.

Justification alone is **not** enough for finalization. We still have a little more work to do.

## Finalized Checkpoints
Finally, finality.

Justified checkpoints can become **finalized** in one of two ways.

A justified target checkpoint is considered finalized if its source is also its direct parent in the chain of possible checkpoints. In the case of the Beacon Chain, this means that EBBs of two consecutive epochs are justified.

A justified target checkpoint is also considered finalized if its source is its direct grandparent, and its parent is also justified.

## Slashing Conditions
Casper FFG provides its guarantees by slashing, or punishing, validators for misbehaving in certain ways. The conditions under which a validator can be slashed are often colloquially referred to as the "Casper Commandments."

The first of these commandments states:

1. A validator cannot publish two distinct votes for the same target height.

Remember that a vote contains both the hash of some target checkpoint and the height of that target in the chain. This condition prevents a validator from creating two votes with the same "target height" value but different values in any of the other fields in the vote.

The second commandment states:

2. A validator cannot vote within the span of its other votes.

Here, we prevent validators from creating votes that "cross over" one another. For example, if a validator voted to link a block at height 10 with a block at height 20, the validator wouldn't be able to create another vote linking a block at height 5 with a block at height 15. Generally speaking, validators are not allowed to create any votes where the "range" between the source and target heights intersect.

Slashing conditions are enforced in special transactions on the Beacon Chain. Validators are incentivized to reveal malicious behavior because they're rewarded if they can provide proof that another validator created votes that violated any of the above conditions.

## Casper FFG Guarantees
These slashing conditions give us our Casper FFG guarantees:

1. "Accountable Safety" - Two conflicting checkpoints cannot be finalized unless 1/3 of validators have lost their deposit
2. "Plausible Liveness" - It will always be possible to finalize a new checkpoint as long as 2/3 of validators are following the protocol

