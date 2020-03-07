---
path: "/chapters/proof-of-stake/casper-ffg"
title: "Casper FFG"
status: "2"
---

The solution to the long range attack is, effectively, to introduce a new rule that prevents clients from reverting any block created more than `n` blocks ago, where `n` is the amount of time for $\smash{\frac{2}{3}}$ of validators to withdraw their funds. The mechanism within Eth2 that provides this functionality is **Casper FFG**.

## Checkpoints
The first new concept within Casper FFG is the **checkpoint**. Checkpoints are special blocks that are candidates for finalization. We can pick our checkpoint blocks however we please, but Eth2 specifically states that checkpoints occur once every fixed number of blocks. Currently, this happens every 32 slots. We call this period of 32 slots an "epoch."

```text
TODO: Image of checkpoints.
```

When the first slot of an epoch is not empty, this block serves as the checkpoint for that epoch.

```text
TODO: Image of EBB when first slot has block.
```

Since we might miss a slot, it's possible that the first slot of an epoch will be empty. In this case, we use the last known block as the checkpoint block for that epoch. 

```text
TODO: Image of EBB when first slot is skipped.
```

We refer to the checkpoint block for an epoch as the "epoch boundary block," or EBB for short.

## Supermajority Links and Justified Checkpoints
Whenever a validator creates an attestation, they must now also include a vote to connect two checkpoint blocks. This vote contains references to two checkpoints that the validator wishes to connect. The purpose of this connection will soon become clear.

If $\smash{\frac{2}{3}}$ of validators vote to make the same connection between two checkpoints, then we say that there exists a "supermajority link" between the checkpoints.

We then additionally introduce the concept of a "justified checkpoint." We say that the genesis block is by default a justified checkpoint. Beyond the genesis block, a checkpoint is justified if it is connected to another justified checkpoint by a supermajority link.

```text
TODO: Image of justification
```

This system reveals the purpose of the connections. We are attempting to create an "overlay blockchain," a series of blocks found to be valid by a $\smash{\frac{2}{3}}$ of validators.

## Justification and Finalization
Justification alone is not sufficient for finalization. The reason for this is most easily understood by example.

Imagine a chain in which we have two potential checkpoint blocks for the same epoch. Such a situation might arise if, for example, network latency delays propagation of the block in the first slot of an epoch.

```text
TODO: Image of our setup.
```

An attacker with $\smash{\frac{1}{3}}$ of stake wants to exploit this situation to prevent any more blocks from being justified. Some portion of honest validators created votes under the assumption that the first block did not exist. Later, when the block became available, other honest validators created votes that conflicted with these first votes.

```text
TODO: Image of two conflicting checkpoints with votes.
```

If we do not allow validators to create conflicting votes, then our attacker can completely prevent more checkpoints from being justified. All they need to do is simply refuse to publish any votes. Since some honest validators are in conflict, it would be impossible to react $\smash{\frac{2}{3}}$ votes on a checkpoint.

```text
TODO: Image showing neither can be justified.
```

Because of cases like this, we must allow validators to create certain votes that contradict themselves. We still do not allow validators to create multiple votes during the same slot, but we permit validators to make two votes with the same source height or where the connections overlap.

```text
TODO: Expand here to detail the conditions we're allowing.
```

This allowance prevents us from halting like we did in the previous scenario. Validators can now simply switch their votes to follow the majority.

```text
TODO: Image where validators switch votes to prevent stall.
```

However, this reveals why justification alone is insufficient for finalization. Once validators can make contradictory votes, multiple conflicting checkpoints can become justified. We need to go slightly further to ensure that conflicting checkpoints cannot be finalized.

## Finalization
We say that a checkpoint is **finalized** if it is justified and connected to its direct parent checkpoint. The logic behind this rule mostly follows from the idea that we want to ensure, without a doubt, that $\smash{\frac{2}{3}}$ of our stake has made a vote that it cannot contradict.

```text
TODO: Really need to expand here.
```

```text
TODO: Image for finalization.
```

We previously noted that validators are allowed to make conflicting votes where source height is the same and target height differs, or where the connections intersect. Now we make this explicit and introduce the two casper "commandments."

1. A validator cannot make two votes such that $\smash{H(t_1) = H(t_2)}$.
2. A validator cannot make two votes such that $\smash{H(s_1) < H(s_2) < H(t_2) < H(t_1)}$

These two rules do allow for the exceptions previously detailed. However, they ensure some additional properties. The first rule guarantees that we can never have conflicting justified checkpoints at the same height. Therefore, if we do have conflicting checkpoints, one must have a greater height than the other.

Now, we instate a "fork choice rule" for checkpoints that validators should always follow the justified checkpoint at the greatest height. Again, our first rule guarantees that only one of these will exist.

```text
TODO: Image for fork-choice rule.
```

Since only one exists, if the immediate next checkpoint is justified, then we can be sure that no other conflicting checkpoints can appear later. Rule I directly prevents validators from justifying two child checkpoints, and Rule II prevents any attempts to vote "around" the highest justified checkpoint.

```text
TODO: Image for trying to cheat.
```
