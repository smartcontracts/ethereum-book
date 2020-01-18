---
path: "/chapters/proof-of-stake/casper-ffg"
title: "Casper FFG"
---

LMD-GHOST successfully prevents a minority from outrunning a majority, but things start to get a little dicey when we consider that validators are allowed to withdraw their funds. Since we don't want to ossify the network into a certain elite that owns most of the stake, we want the ability for new validators to join the system and other validators to leave it. 

Unfortunately, the problem with allowing validators to leave the system is that once they've withdrawn their funds, they can carry out slashable behavior without any downside on the main chain since their funds are already gone. We could try to slash these users on the main chain, but they don't have any funds available to be slashed.

This opens us up to the possibility that a set of withdrawn validators could try to execute an attack on the chain from before the time that they actually withdrew their funds. At that point in time, they still had the right to create blocks even if they don't now. Effectively, these attackers are trying to rewrite history. 

Let's look at a worst-case scenario. Imagine a chain in which validators ABC controlled 100% of the stake at time 0 and withdrew some time later. Now, validators DEF control 100% of stake. Validators ABC want to execute an attack, so they start creating another chain from block 0. They're not worried about getting slashed on the main chain, and they can avoid getting slashed on the secret chain by rotating their funds into new accounts before making the second chain public. 

A client who sees both of these chains is no longer able to make a decision between the chains. Both chains are "equally" good in their eyes, so LMD-GHOST can't properly decide which chain to follow. Even if this chain is made public much later then the original chain, LMD-GHOST now needs to take this new information into account and stalls.

We address this problem with the introduction of Casper FFG. Effectively, Casper FFG is a mechanism that prevents users from reverting blocks after a certain period of time. Since this chain would need to come from a long time ago to ensure that a majority of the members have withdrawn their funds, users can effectively refuse to follow this fork simply because it's too old.

Casper FFG allows the network to "finalize" certain blocks, and any clients who see these finalized blocks will refuse to consider any earlier forks. As long as the amount of time to withdraw a majority of stake is greater than the amount of time to finalize a block, an attacker won't be able to carry out a long range attack.

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


### Interactions with Casper FFG
LMD-GHOST doesn't allow validators to circumvent blocks finalized by Casper FFG. In order to accomplish this, we run LMD-GHOST according to the following process:

1. Find the last finalized block.
2. Find the highest-epoch justified block that is a descendent of the finalized block.
3. Run LMD-GHOST from the block found in step (2).

## Weak Subjectivity
Although FFG gives us checkpoints, there's an issue. If we know the current validator set and we're up to date with the network, then we're never going to revert past a checkpoint and all is good. However, clients who haven't synchronized within the withdrawal period have an outdated view of the validator pool and could be susceptible to this attack! What this means is that there's no way for the client to distinguish between two chains without consulting an outside party.

This is the idea of weak subjectivity, which means that a client basically needs to ask other people which of the chains to select. Weak subjectivity only applies if we're a new client or haven't synced within the withdrawal period. Effectively we need to rely on social graphs to ask people what the "legitimate" eth2 chain, which isn't something you need to worry about in a proof of work blockchain.

Weak subjecitivty is a highly debated topic in the blockchain world. Most arguments come especially from the world of Proof of Work blockchains in which we avoid this problem entirely by relying on an "objective" metric like physical hardware used to create hashes. The idea here is that any set of people with 51% of hardware generally controls the "reality" of the chain. However, my view is that this effectively ignores the way in which consensus is a social process and is actually much stickier than we want. We *want* people to be able to create competing versions of "reality" if they have different worldviews, not simply to state that the correct version is whoever has the most "stuff" because this makes social progress much bloodier.

## Catastrophic Crashes
Casper FFG operates effectively as long as most of the honest users are online. However, if more than half of honest users drop offline at the same time, then the malicious 1/3rd of stake is no longer a minority of the active members. This allows the malicious 1/3rd to create a chain that's equally as good as the chain still being produced by the remaining 1/3rd controlled by honest users, even if we use LMD GHOST.

We can recover from this sort of crash by introducing the idea of an inactivity leak. Effectively, an inactivity leak is simply a small punishment for any user who's offline when they're supposed to create a block or sign an attestation. From the perspective of our primary chain, a full 2/3rds of users are offline in a Catastrophic Crash because 1/3rd is truly offline and the other 1/3rd are malicious and trying to make another chain. The idea here is that over time, offline users will lose enough of their funds that the remaining 1/3rd of honest users will eventually come to fully own the stake on the primary network.

Although this allows FFG to continue finalizing blocks after a catastrophic crash, it also allows two chains to finalize blocks at the same time. Both chains look identical from each others perspectives, so this makes sense, really. Once again this means that users would have to rely on the social graphs w/r/t weak subjectivity in order to determine which of the two chains to continue following. It might even be that neither is "malicious" in any real sense.

