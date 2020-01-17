---
path: "/chapters/proof-of-stake/attack-surfaces"
title: "Attack Surfaces"
---

Okay let's try to organize this section a little better.

Our basic Eth2 setup selects block proposers to create blocks during slots, and attestation committees to vote on these blocks. All's well as long as there's only one blockchain to follow, but, as we know, we can always have forks.

Let's imagine that we have a basic network fork as a result of a malicious validator. Validator B decides to create two blocks during their assigned slot and propagates both to the network.

Slashing Validator B alone doesn't solve our problems, however. Our attestation committee for Slot 1 still need to decide whether to vote for Block 1 or Block 2. Validators receive rewards for voting on blocks. However, this reward doesn't matter unless they vote on the chain that becomes canonical. Otherwise, any record of that vote is only recorded on a defunct chain, which doesn't help in the long-term. So their logical choice is simply to vote for both blocks.

We obviously want to try to prevent Validator B from performing this sort of attack in the first place. We also want to make sure that validators don't end up voting on every potential fork, since we'd end up with a lot of forks. So, in order to prevent this sort of behavior, we introduce our first security mechanism: slashing.

The basic concept behind slashing is that we require that validators put down a deposit that can be decreased, or slashed, in the case that they perform certain undesirable actions. Our system originally only required that validators lock up funds, but didn't actually state that these funds could be decreased in any way.

Our basic slashing mechanism prevents validators from publishing two different "messages" within the same slot. In our case, these messages are either blocks or votes. Since Validator B published two different blocks in a fork, they're liable to be slashed. Any validators who created attestations for both Block 1 and Block 2 are also liable to be slashed. We execute this punishment by allowing other validators to include proof of this misbehavior within some future block.

Validators are incentivized to include this evidence to some extent, simply because any reduction in another validator's stake results in an increase in their own stake as a proportion of total stake. However, since validators will likely attempt to hide any evidence of malfeasance, we further incentivize others to actively search for and include evidence of slashable behavior with a "finders fee." This fee represents a portion of the amount slashed. The rest of the amount is burned in order to prevent validators from reporting their own errors and receiving their entire lost value in return.

So which fork should validators build on?

Well, we might think to use the Longest Chain Rule. However, this introduces certain interesting attack surfaces. Our assumption is that 2/3rds of validators are honest. For the sake of simplicity, let's also assume that all of these validators are online all the time. Even if this is the case, network latency can cause certain problems. For example, imagine that there's some latency and two validators create a fork simply because the second validator hasn't seen the first block in time. 

So here we're going to assume that latency is high enough that only every other block extends the length of the chain. We're also only assuming that 2/3rds of validators are honest, so there's 1/3rd trying to attack the network. We have a malicious validator who wants to cause some trouble in the network. Let's say they create a "secret" chain and also don't fulfill their blocks on the primary chain. On the secret chain, they're only going to be able to make blocks 1/3rd of the time, but they're not going to have this same issue with latency because they only need to talk to themselves.

Now our chain might end up looking like this, where both chains end up being the same length simply because there's some network latency! 

If we use the longest chain rule, then both chains are equally good. However, this seems really bad. Why should 1/3rd of validators be able to create an equally good chain simply because of some latency?

This is where we introduce a new fork choice rule, LMD GHOST.

-- LMD HERE --

LMD GHOST fixes a lot of issues and captures more information in the case of high latency. However, we still run into issues because of the idea of dynamic validator sets. We really don't want our set of validators to be fixed. Otherwise, there really wouldn't be any way for new validators to join the system.

As a result, we want validators to be able to withdraw their funds eventually. However, this introduces an interesting problem! After a validator has withdrawn their funds from the chain, they have no disincentive to try to sign slashable messages, because there's nothing to be slashed. An attacker could use this to interesting effect. 

Let's say we have the following chain. At the genesis block, we have a set of validators containing A, B, and C. However, the main chain has progressed and the validators have already withdrawn their funds and been replaced by D, E, and F. Now, ABC want to execute an attack. Since they don't care about being slashed on the main chain, they can start creating blocks from the block before they submitted their withdrawal.

We now have a dilemma because LMD GHOST runs into issues as soon as this second fork exists. Under normal conditions, the validators would've been slashed. However, since the validators already withdrew on the main chain there's no slashing messages. And, on this second chain, the validators can simply withdraw and rotate to new accounts so that there's now way to slash them even once they make the secret chain public.

Since LMD GHOST sees 3/3 signatures on the secret chain and 3/3 signatures on the main chain, both chains are equally good. So how do we address this problem? We introduce the idea of checkpoints.

-- FFG HERE --

Although FFG gives us checkpoints, there's an issue. If we know the current validator set and we're up to date with the network, then we're never going to revert past a checkpoint and all is good. However, clients who haven't synchronized within the withdrawal period have an outdated view of the validator pool and could be susceptible to this attack! What this means is that there's no way for the client to distinguish between two chains without consulting an outside party.

This is the idea of weak subjectivity, which means that a client basically needs to ask other people which of the chains to select. Weak subjectivity only applies if we're a new client or haven't synced within the withdrawal period. Effectively we need to rely on social graphs to ask people what the "legitimate" eth2 chain, which isn't something you need to worry about in a proof of work blockchain.

