---
path: "/chapters/proof-of-stake/casper-ffg"
title: "Casper FFG"
---

LMD GHOST effectively blocks a minority chain from outrunning a majority chain. However, our chain has, until now, relied on a fixed validator set. The introduction of a dynamic validator set breaks certain properties of LMD GHOST.

## Dynamic Validator Sets
The purpose of a dynamic validator set is relatively intuitive. Just as with Proof of Work, it seems useful that anyone have the ability to join or leave the system at any time. If the validator set remains fixed, a permanent "nobility" maintains control over the system. Such a "nobility" is in direct violation of many of the core philosophical ideals behind decentralized networks.

The introduction of a withdrawal system brings with it several challenges for our Proof of Stake chain. A naive method for withdrawals, for instance, might allow validators to exit the system immediately after a withdrawal request is included in the chain. Though convenient, such a system would permit an attacker to wreak havoc on our network.

Take, for instance, an attacker who creates two blocks in the same slot. We initially addresses this vector with the introduction of slashing penalities. Unfortunately, under certain network conditions, evidence of this behavior may not be immediately included in the blockchain. If an attacker can withdraw their funds before evidence is included, then the attacker faces no financial penalty.

```text
TODO: Image where attacker withdraws because of latency.
```

An attacker could even, for example, execute such an attack simply because the chain randomly selects them to produce multiple blocks in a row.

```text
TODO: Image where attacker withdraws because of random chance.
```

To prevent this sort of behavior, it's necessary to introduce some delay into the withdrawal process. Such a delay should generally be "long enough" that the likelihood of flying under the radar is negligible. The lower bound for this delay can be estimated so that the odds of an attacker with 1/3rd stake being chosen to produce all blocks before the withdrawal is minimized.

## Long Range Attacks
Although a withdrawal delay ensures that slashable behavior can be punished, the existence of any withdrawal mechanism poses problems for LMD GHOST. Our troubles begin due to the fact that a withdrawn validator faces no consequences for any slashable behavior carried out in the past. Indeed, this is exactly why we initially introduced a withdrawal delay.

Our delay cannot, however, punish any messages received after the withdrawal is completed that are crafted to look as if they were created in the past. We cannot distinguish between messages actually created in the past, but not seen, and messages constructed to appear as if they were made in the past. Therefore, as long as our delay is finite, an attacker can perform certain slashable actions without fear of being punished.

```text
TODO: Image for information theoretical limitations of slashing with withdrawals.
```

The withdrawal process first removes a validator from the set of active participants. An attacker can only create messages from a time in which they were still active, since newer messages would be rejected by clients. An attacker could, for instance, publish a block that creates a fork some time in the past.

```text
TODO: Image for a useful attack that could be performed.
```

Just as with any other new block, clients would need to factor this new block into their fork-choice rule in order to determine the correct chain to follow. With only a single block and no votes, however, LMD GHOST still clearly favors our primary chain. An attacker needs to go further to cause problems.

```text
TODO: LMD GHOST picks the right chain w/r/t above.
```

### Long Range Attacks: By Example
Let's examine one extreme case in which an attacker can halt our chain. Assume that at some time, three validators held, jointly, 100% of stake on the chain. All three validators sign messages in support of some given block. At some time in the future, all three have withdrawn from the chain and are replaced by new validators.

```text
TODO: Image for our setup.
```

Now, by some means, a malicious party has acquired the keys for the original three validators. Perhaps the validators sold their keys for some low price, as they are at no risk of losing any funds. Possibly, an attacker managed to hack the keys as the validators had little reason to continue heavily securing them. No matter the reason, the attacker has managed to relatively cheaply acquire the keys.

The attacker now uses the keys to create a block that forks the first block supported by all three parties. Then, the attacker publishes this block to other clients. When the clients attempt to decide between the two blocks, they find that LMD GHOST is unable to make a decision. According to the rules of LMD GHOST, both chains have 100% of votes and are equally good.

```text
TODO: Image with the malicious fork.
```

We refer to this exploit as a "long range attack." The attack is effective because the attacker is able to violate the honest majority assumption retroactively. Even if all three validators were faithfully following the protocol before withdrawing their funds, there's no strong incentive to continue doing so once their funds are withdrawn. Our "honesty" assumption is highly dependent on the existence of incentives for correct behavior.

### Long Range Attacks: Generalized
This attack can be generalized beyond the special case in which it was initially presented. For any block in the chain, we can find a specific number of supporting validators from the known validator pool at that block, $v_s$. Note that this value is identical to the LMD GHOST score for that block.

We can also find the number of validators who have withdrawn their funds, $v_w$. As withdrawal requests are a form of support for a block, we know that  that $v_w \leq v_s$.

In order to execute this attack, an attacker must acquire keys for at least $v_s + \frac{v_t - v_s}{2}$ accounts, where $v_t$ is the total number of validator accounts. As accounts in $v_w$ are already withdrawn, the cost to acquire these accounts decreases. Therefore, as $v_w$ approaches $v_s$, the total cost to execute this attack also decreases.

Such an attack, under a majority honesty assumption, becomes possible once $\frac{2}{3}$ of the validator set at a given block withdraw their funds. We can determine the minimum distance for a long range attack depending on our withdrawal delay and any limitations on churn.

## Casper FFG
The solution to the long range attack is, effectively, to introduce a new rule that prevents clients from reverting any block created more than `n` blocks ago, where `n` is the amount of time for $\frac{2}{3}$ of validators to withdraw their funds. One mechanism that provides this functionality is **Casper FFG**.

The first new concept we'll introduce is the checkpoint. Checkpoints are special blocks that are candidates for finalization. We can pick our checkpoint blocks however we please, but Eth2 specifically states that checkpoints occur once every fixed number of blocks. Currently, this happens every 32 slots. We call this period of 32 slots an "epoch."

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

Whenever a validator creates an attestation, they must now also include a vote to connect two checkpoint blocks. This vote contains references to two checkpoints that the validator wishes to connect. The purpose of this connection will soon become clear.

If 2/3rds of validators vote to make the same connection between two checkpoints, then we say that there exists a "supermajority link" between the checkpoints. We then additionally introduce the concept of a "justified checkpoint." We say that the genesis block is by default a justified checkpoint. Beyond the genesis block, a checkpoint is justified if it is connected to another justified checkpoint by a supermajority link.

```text
TODO: Image of justification
```

This system reveals the purpose of the connections. We are attempting to create an "overlay blockchain," a series of blocks found to be valid by a 2/3rds of validators. However, justification alone is not sufficient for finalization. The reason for this is most easily understood by example.

Imagine a chain in which we have two potential checkpoint blocks for the same epoch. Such a situation might arise if, for example, network latency delays propagation of the block in the first slot of an epoch.

```text
TODO: Image of our setup.
```

An attacker with 1/3rd of stake wants to exploit this situation to prevent any more blocks from being justified. Some portion of honest validators created votes under the assumption that the first block did not exist. Later, when the block became available, other honest validators created votes that conflicted with these first votes.

```text
TODO: Image of two conflicting checkpoints with votes.
```

If we do not allow validators to create conflicting votes, then our attacker can completely prevent more checkpoints from being justified. All they need to do is simply refuse to publish any votes. Since some honest validators are in conflict, it would be impossible to react 2/3rds votes on a checkpoint.

```text
TODO: Image showing neither can be justified.
```

Because of cases like this, we allow validators to create certain votes that contradict themselves. We still do not allow validators to create multiple votes during the same slot, but we permit validators to make two votes with the same source height or where the connections overlap.

```text
TODO: Expand here to detail the conditions we're allowing.
```

This allowance prevents us from halting like we did in the previous scenario. Validators can now simply switch their votes to follow the majority.

```text
TODO: Image where validators switch votes to prevent stall.
```

However, this reveals why justification alone is insufficient for finalization. Once validators can make contradictory votes, multiple conflicting checkpoints can become justified. We need to go slightly further to ensure that conflicting checkpoints cannot be finalized.

We say that a checkpoint is finalized if it is justified and connected to its direct parent checkpoint. The logic behind this rule mostly follows from the idea that we want to ensure, without a doubt, that 2/3rds of our stake has made a vote that it cannot contradict.

```text
TODO: Really need to expand here.
```

```text
TODO: Image for finalization.
```

We previously noted that validators are allowed to make conflicting votes where source height is the same and target height differs, or where the connections intersect. Now we make this explicit and introduce the two casper "commandments."

I. A validator cannot make two votes where H(t1) = H(t2).
II. A validator cannot make two votes where H(s1) < H(s2) < H(t2) < H(t1).

These two rules do allow for the exceptions previously detailed. However, they ensure some additional properties. The first rule guarantees that we can never have conflicting justified checkpoints at the same height. Therefore, if we do have conflicting checkpoints, one must have a greater height than the other.

Now, we instate a "fork choice rule" for checkpoints that validators should always follow the justified checkpoint at the greatest height. Again, our first rule guarantees that only one of these will exist.

```text
TODO: Image for fork-choice rule.
```

Since only one exists, if the immediate next checkpoint is justified, then we can be sure that no other conflicting checkpoints can appear later. Rule I directly prevents validators from justifying two child checkpoints, and Rule II prevents any attempts to vote "around" the highest justified checkpoint.

```text
TODO: Image for trying to cheat.
```

Casper FFG guarantees that 2/3rds of validators have made a decision about the chain that they will not revert later. Whenever a client sees a new finalized checkpoint, they will never accept a fork from before the checkpoint. Clients are effectively immune from long range attacks because they've received a promise from validators in advance.

However, we face one final, fundamental dilemma. An attacker might not be able to trick existing clients into accepting a conflicting promise. Unfortunately, the client must determine the validity of a promise for themselves. A new client that wasn't online when the first promise was made has no way to tell between the "real" and "fake" promises.

This dilemma sits at the heart of Proof of Stake. Termed the "weak subjectivity problem," it requires that anyone offline longer than the time for 2/3rds of validators to withdraw their funds rely on some external source to determine the "primary" chain.

```text
TODO: Need to finish this section about weak subjectivity.
```