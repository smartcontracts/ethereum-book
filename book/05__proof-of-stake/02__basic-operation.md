---
title: "Basic Operation"
---

# {{ $frontmatter.title }}

Many of the design decisions behind Eth2 can be best understood as incremental improvements over a "naive" Proof of Stake protocol. The remainder of this chapter will introduce new concepts as responses to attack vectors against such a naive protocol. By the end of the chapter, our naive system will have evolved into a robust Proof of Stake chain.

## Genesis

Our naive system begins with one initial block, the genesis block, that contains a list of validators and their respective stakes within the system. We break time into a series of slots, each of which are `n` seconds long. Furthermore, we'll initially assume that our validator set does not change, e.g., validators cannot withdraw their funds. Eth2 *does* allow validators to enter or exit the system, but this introduces certain challenges to be addressed later in the chapter.

::: tip TODO
Image of basic slot system.
:::

## Role Selection

For the sake of this initial operational analysis, we construct a role-selection mechanism as follows. Every `M` slots, validator roles are selected randomly for `Slot N` through `Slot N + M`, where `Slot N` is the current slot.

For simplicity, assume that our random distribution is perfect such that, in the long run, a validator with `X%` of stake produces exactly `X%` of all blocks. This does not entirely reflect the selection process used within Eth2, but is a "good enough" approximation for the moment.

::: tip TODO
Image of role-selection system.
:::

## First Steps

Using this simple selection process, we can begin to create a basic Proof of Stake chain.

For each slot, our chain assigns a single validator to produce a block and then assigns all other validators to vote on the validity of the block. We say that these other validators are part of the **attestation committee** for this slot. In order to incentivize correct behavior, we reward validators who produce valid blocks or create votes during their assigned slots.

Under perfect conditions, the validator assigned to each slot will produce a valid block, which the attestation committee will receive before the start of the next slot. Committee members will then check the validity of the block according to some rules and broadcast a vote of validity.

Assuming we have no forks, the block producer will be rewarded for having produced a block in the canonical chain. Members of the attestation committee are rewarded once their votes are recorded within a future block. We incentivize the inclusion of these attestations by giving block producers an additional reward for each included attestation.

This process continues, and the chain progresses.

::: tip TODO
Image of ideal operation
:::

## Missed Slots

Of course, in reality, we cannot assume that the chain will operate with such perfection. We might, for example, run into the case that a validator simply chooses not to produce a block during their assigned slot. A software failure may cause a validator to go offline, or a validator may be actively attempting to disrupt the chain.

In the simple case of a missed slot, members of the corresponding attestation committee have nothing to sign. As a result, neither the block producer or committee members receive a reward for this block. Similarly, in the case that a producer creates an *invalid* block, nodes will automatically reject the block and it can effectively be treated as if no block was produced.

::: tip TODO
Image of missed slot.
:::

## Slashing

We need to introduce some new functionality, however, to handle the case in which a producer creates *two or more* blocks during the same slot. Until now, we hadn't introduced any rules preventing this sort of behavior. We clearly want to patch any holes in our system that allow a validator to so easily create a fork in our chain.

::: tip TODO
Image of two blocks during the same slot.
:::

Our very first additional mechanism, therefore, is to define a punishment for any validators caught creating more than one block during the same slot. We refer to this sort of punishment as **slashing**.

A validator is slashed if evidence of misbehavior is included in some later block. In this case, our evidence is the existence of a validator's signature on two distinct blocks with the same slot number. We incentivize the inclusion of this evidence by rewarding the reporting validator with a portion of the penalty.

Simply punishing the block producer doesn't entirely solve our problem, unfortunately. It's still possible for a validator to create two blocks within the same slot, even though they'll be punished for doing so. A wealthy attacker, for example, might be willing to face the financial penalty simply to see how the network reacts.

In such an event, the attestation committee is faced with a dilemma. Attestations can only be rewarded if they are included in the history of the chain. If a committee member votes for the "wrong" block, then, from the perspective of the canonical chain, their vote effectively does not exist. As a result, the committee member receives no reward on the canonical chain. The natural and rational choice is, therefore, simply to create votes for both chains.

::: tip TODO
Image of nothing-at-stake problem.
:::

Since both chains receive votes, both may be equally "valid" with respect to whichever fork-choice rule we develop to handle forks. Assuming that validators are rational, both chains *will* receive the same number of votes. If this continues, our chain will end up as a mess of forks.

We prevent this behavior by introducing a slashing penalty for any validators who create two votes during the same slot. Our evidence in this case takes the form of a validator's signature on two distinct votes with the same slot number.

In the case that an attestation committee is faced with this decision, they will naturally want to wait and see which block has received more votes. However, this leads to a situation in which all validators are waiting for votes and, as a result, no validators are publishing votes.

We circumvent this issue by adding logic to our reward system such that an attestation is more valuable the more quickly it's included in the chain. Validators are therefore forced into making a timely decision. Eth2 designs this reward to halve with each additional slot.
