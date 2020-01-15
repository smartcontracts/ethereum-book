---
path: "/chapters/building-blocks/casper-ffg"
title: "Finality: Casper FFG"
---

When we exchange cash for goods or services, it's usually difficult to "reverse" our transactions and claw back whatever funds we spent. Merchants might offer refunds in the case that something went wrong with an order, but this is almost certainly conditional on the return or cancellation of the original purchase. In the blockchain world, we often refer to this quality of irreversibility in a transaction as "finality."

Electronic transactions made with credit or debit cards are usually similarly difficult to reverse. Some cards may provide some sort of "chargeback" service, though these are usually only effective if a merchant is being uncooperative. Generally speaking, however, most of the transactions we execute through traditional payment methods tend to be difficult to remove from our monthly statements.

Transactional finality is crucial to the proper functioning of an exchange-based society. If an electronic transaction could simply disappear into thin air, merchants would likely feel much less comfortable accepting electronic payments. Merchants might be particularly concerned if consumers could strategically abuse this flaw to "buy" items without actually having to pay for them. It's easy to see why anyone would be weary of such a platform.

## What *is* Casper FFG?
Blockchains have always struggled to develop a clear sense of transactional finality. Most systems have only been able to present finality in relatively weak forms. Proof of Work blockchains, for example, usually provide what's often referred to as "probabilistic finality." Blocks in these systems can, in theory, always be forked out of the "canonical" chain if enough resources are diverted into a competing chain, though the actual odds of this decrease quickly as more blocks are added onto the chain.

Proof of Stake blockchains need to provide a similar finality mechanism. However, probabilistic finality is tied to the high cost to produce competing Proof of Work chains. Validators in a Proof of Stake chain can produce blocks with relatively minimal effort, so we can't use the same "work" metric to get a sense of finality.

Casper FFG is, in a nutshell, a protocol that allows validators to vote to have certain blocks "finalized." Casper FFG is unique in that it provides stronger guarantees about finalized blocks that go beyond simple probabilistic finality.

Without further ado, let's look at Casper FFG under the hood.

## Deposits
Casper FFG requires that all validators in the system have a **deposit**. Casper FFG relies heavily on the idea of "slashing," or punishing, validators who don't follow the rules. Without any sort of deposit, validators wouldn't have anything to lose. Currently, Eth2 validators must submit an initial deposit of 32 ETH. 

We sometimes refer to a certain fraction of validators (e.g., 2/3rds of validators). Although all validators start with the same deposit, a validator's deposit can increase or decrease. Since we want the influence of a validator to be proportion to their deposit, our fractions actually refer to the set of validators whose deposits make up that fraction of the total stake, and not a fraction of the total number of validators. 

## Checkpoints
Checkpoints are specific blocks that validators can attempt to finalize. For the sake of efficiency, Casper FFG doesn't allow every block to be a checkpoint. The Beacon Chain defines only [Epoch Boundary Blocks](/chapters/phase-0/blocks-slots-and-epochs#epoch-boundary-blocks) as checkpoint blocks.

## Votes
Validators come to consensus about which checkpoints should be finalized by creating and broadcasting **votes**.

The goal of Casper FFG is to create a "chain" of finalized checkpoints. Just as blocks in a blockchain reference some parent, validators reference some older checkpoint (the "source") whenever they vote to finalize a new checkpoint (the "target").

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

## Extras

Proof:
defns:
conflicting:
- two nodes in distinct branches

from Assumptions:
1. if s1 => t1, s2 => t2 distinct supermajority links; then h(t1) != h(t2)
2. if s1 => t1, s2 => t2 distinct supermajority links; then h(s1) < h(s2) < h(t2) < h(t1) cannot hold

We get:
1. t.e. at most one supermajority link s => t with h(t) = n
2. t.e. at most one justified checkpoint w/ height n

Theorem 1: two conflicting checkpoints cannot both be finalized
1. let a_m with justified a_m+1 where h(a_m) + 1 = h(a_m+1) and b_n with justified b_n+1 where h(a_m) + 1 = h(a_m+1)
2. Suppose a_m and b_n in conflict and wlog h(a_m) < h(b_n), because if h(a_m) == h(b_n) then 1/3 validators violated condition ONE (1/3 vote A, 1/3 vote B, could not possibly get == unless remaining 1/3 vote both)
3. Let r  = chain of checkpoints for supermajority link chain for b_1 => b_n+1
4. no h(b_i) equals h(a_m) or h(a_m+1) because violates property (4)
5. Let j be lowest integer s/t/ h(b_j) > h(a_m+1) then h(b_j-1) < h(a_m+1) or h(b_j-1) == h(a_m) which violates condition ONE
6. Implies supermajority link from epoch less than h(a_m) to epoch greater than h(a_m+1) which incompatible with link bet. a_m to a_m+1

Theorem 2: Supermajority links can always be added when 2/3 avail
1. Let a be justified checkpoint w/ greatest height
2. Let b be targest checkpoint w/ greatest height for which any validator has made a vote
3. Any checkpoint a' descenent of a with h(a') == h(b) + 1 can be justified w/o violating commandments
4. Then a' can be finalized by adding link from a' to a'' direct child w/o violating commandments
XX. i.e.: THERE is no way for the chain to stall 

Dynamic validator sets:
- 

Long range attacks:
- Validators can withdraw deposits b/c dynamic, can finalize conflicting checkpoints w/o fear of being slashed b/c already widhtrawn money
- Basically solved by not reverting finalized blocks and sync frequency (order of months)
- Introduce max delay where guaranteed to have heard
- slashing violation at time t then reject blocks w timestamp > t + 2delay part of chains not including this evidence
- Clients refuse to finalize future blocks or blocks too far in the past
- Pick whichever checkpoint came frist if no intersect between windows
- if intersecting windows, guarnateed evidence by 2delay, reject blocks > 4delay w/o evidence in chain, if w > 4delay then guarnateed to be slashed if malfeasant in whatever chain accepted
- attacker creates block BEFORE withdrawal b/c slashing won't matter,
- if network delays can cause clients to disagree (corrupted propsoal mechanism => prevent evidence inclusion => prevents finality)

Inactivity leak:
- Solves issue where > 1/3 go offline
- Simplest formula would just drain validators who arent voting
- Could also do a dynamic leak (ETH2)
- Introduces scenario where two chains could be finalized w/ conflciting blocks, introduciton of weak subjectivity
