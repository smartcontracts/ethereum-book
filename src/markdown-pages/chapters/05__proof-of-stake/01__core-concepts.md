---
path: "/chapters/proof-of-stake/core-concepts"
title: "Core Concepts"
status: "2"
---

Proof of Stake chains, in a nutshell, attempt to replicate the functionality of Proof of Work chains without the reliance on wasteful computational processes. We can make several useful analogies to Proof of Work in order to get a better understanding of the core components of Proof of Stake.

## Validators
As we've previously discussed, Proof of Work chains are extended by **miners** who participate in a "lottery" for the right to produce additional blocks. The probability that any given miner "wins" this lottery is directly proportional to that miner's hash power as a fraction of total hash power. A miner with ten percent of all hash power, for instance, has approximately a ten percent chance to produce the next block. Hash power effectively acts as a proxy measurement for economic investment in the system.

Proof of Stake chains measure investment *directly* in the form of capital lock-up, instead of *indirectly* through hash power. Users on a Proof of Stake chain may deposit some form of economic value (in the case of Eth2, Ether) in order to receive the right to some influence over the system. Such users are known as **validators**.

Validators in Proof of Stake can be thought of as replacements for miners in Proof of Work, though their roles are not identical. A validator's purpose within a Proof of Stake system is to perform certain tasks, like block production, that allow the system to continue to operate. Just as miners are rewarded for producing new blocks, validators are rewarded for successfully carrying out any assigned tasks.

## Validator Role Selection
Since Proof of Work chains rely on external investment, they need not keep track of which parties have control of hash power at any given time. However, investment in a Proof of Stake chain is explicitly recorded on the chain itself. As a result, in order to maintain the relationship between investment and influence, Proof of Stake chains assign roles to *known* validators.

A Proof of Stake chain needs some process that, given the current validator set, assigns validators to perform various tasks. Such a selection process can take various different forms. Any potential process should, though, ensure that validator rewards are proportional to investment.

For instance, we could trivially guarantee proportional influence with a "round-robin" selection process. A round-robin system would give validators the right to produce a certain number of blocks in a row, based on their percentage of total owned stake.

```text
TODO: Image of round-robin selection.
```

Though simple, this sort of model is vulnerable to some methods of attack. For instance, as validator roles are known far in advance, a malicious actor has more time to orchestrate denial-of-service attacks against specific validators.

```text
TODO: Image of round-robin attacks.
```

We can reduce look-ahead with the introduction of some sort of unpredictability. We explore the specifics of this selection process in Eth2 during our later chapter regarding the Eth2 Beacon Chain.

## Slots
So far, we've discussed this role-selection mechanism in the context of specific *blocks*. However, we quickly run into issues in the case that a validator fails to produce their assigned block. Unless other validators can choose to "skip" this block after some waiting period, the chain will halt indefinitely.

```text
TODO: Image of chain halt due to missed block.
```

Instead of assigning roles for specific *blocks*, a Proof of Stake chain therefore assigns roles for specific *periods of time*, referred to in Eth2 as "slots." Under this model, if a validator fails to produce a block during their assigned slot, other validators can continue to extend the chain.

```text
TODO: Image of no chain halt b/c slots.
```
