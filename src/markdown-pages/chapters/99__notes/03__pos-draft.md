---
path: "/chapters/notes/pos-draft"
title: "Proof of Stake Draft"
---

Proof of Stake in Eth2 represents a large departure from the Proof of Work rules that governed Eth1. Our deep dive into Eth2 begins with an explanation of the theoretical basis of Proof of Stake. This basis allows us to explore in later chapters the Beacon Chain, Eth2's implementation of a Proof of Stake chain based on the ideas described here.

Certain mechanisms described within this chapter can be implemented in a variety of ways. We typically present such mechanisms as "black boxes" and leave their implementation details within Eth2 for our chapters regarding the Beacon Chain. Any simplifications made within this chapter serve only to aid explanation and do not attempt to "hand-wave" important conceptual topics.

---

A core property of a Proof of Work system is that any individual's influence over the system is, roughly, proportional to their economic investment in it. A miner with 10% of all hash power over some period of time should produce approximately 10% of all blocks during this period. This miner is presumed to have expended twice as many resources as a miner with only 5% of all hash power.

Proof of Stake chains, in a nutshell, attempt to replicate the functionality of Proof of Work chains without a reliance on wasteful computational processes. Instead of measuring investment in the system indirectly through hash power, Proof of Stake chains measure investment directly in the form of capital lock-up. Users on a Proof of Stake chain may deposit some form of economic value (in the case of Eth2, Ether) in order to receive the right to some level of influence over the system. Such users are called "validators."

A validator's value within a Proof of Stake system is to perform certain actions, such as block production, that allow the system to continue to operate. As a result, validators should be properly rewarded when they successfully performing these tasks. Furthermore, just as in Proof of Work, the robustness of a blockchain system depends on the condition that a validator's influence on the system is directly proportional to their economic investment.

Proof of Work systems guarantee this condition because a miner's chances of producing a block are proportional to their percentage of total hash power. Since the economic investment is external to the system, Proof of Work chains need not be aware of which parties have control of hash power at any given time. However, investment in a Proof of Stake chain is recorded on the chain itself. In order to guarantee the proportionality condition, Proof of Stake chains need some mechanism that explicitly assigns validator roles based on the current validator set.

Such a mechanism can be implemented in various different ways. We could trivially guarantee proportional influence with a "round-robin" system. Such a model gives validators the right to produce a certain number of blocks in a row, based on their percentage of total owned stake.

```text
TODO: Image of round-robin selection.
```

Though simple, this sort of model is vulnerable to some methods of attack. Since validator roles are known far in advance, a malicious actor has more time to orchestrate denial-of-service attacks against specific validators.

```text
TODO: Image of round-robin attacks.
```

We can reduce look-ahead with the introduction of some sort of unpredictability. The Eth2 Beacon Chain, as we will discuss in more detail later on, uses exactly such a mechanism to limit look-ahead.

---

So far, we've discussed this role-selection mechanism in the context of specific blocks. However, we quickly run into issues in the case that a validator fails to produce their assigned block. Unless other validators can choose to "skip" this block after some waiting period, the chain will halt indefinitely.

```text
TODO: Image of chain halt due to missed block.
```

Instead of assigning roles for specific *blocks*, a Proof of Stake chain assigns roles for specific *periods of time*, referred to in Eth2 as "slots." Under this model, if a validator fails to produce a block during their assigned slot, other validators can continue to extend the chain.

```text
TODO: Image of no chain halt b/c slots.
```

---

Many of the design decisions behind Eth2 can be best understood as incremental improvements over a "naive" Proof of Stake protocol. The remainder of this chapter will introduce new concepts as responses to attack vectors against such a naive protocol. By the end of the chapter, our naive system will have evolved into a robust Proof of Stake chain.

Our naive system begins with one initial block, the genesis block, that contains a list of validators and their respective stakes within the system. Our system breaks time into a series of slots, each of which are `n` seconds long. Furthermore, we'll initially assume that our validator set does not change, e.g., validators may not withdraw their funds. Eth2 *does* allow validators to enter or exit the system, but this introduces certain challenges to be addressed later in this chapter.

```text
TODO: Image of basic slot system.
```

For the sake of this initial operational analysis, we construct a role-selection mechanism as follows. Every `M` slots, validator roles are selected randomly for `Slot N` through `Slot N + M` where `Slot N` is the current slot. For simplicity, assume that our random distribution is perfect such that in the long run, a validator with 1% of stake produces exactly 1% of all blocks. This does not entirely reflect the selection process used within Eth2, but is a "good enough" approximation for the moment.

```text
TODO: Image of role-selection system.
```

Using this simple selection process, we can begin to create a basic Proof of Stake chain. For each slot, our chain assigns a single validator to produce a block and assigns the remaining validators to vote on the validity of the block. We say that these other validators are on the "attestation committee" for this slot. In order to incentivize correct behavior, we reward validators who produce valid blocks or create votes during their assigned slots.

Under perfect conditions, the validator assigned to each slot will produce a valid block and the attestation committee will receive that block before the start of the next slot. Committee members will check the validity of the block according to some rules and broadcast a vote of validity. The block producer and members of the attestation committee are all rewarded for correctly following the protocol. This process continues, and the chain progresses.

```text
TODO: Image of ideal operation
```

Of course, in reality, we cannot assume that the chain will operate with such perfection. We might, for example, run into the case that a validator simply chooses not to produce a block during their assigned slot. A software failure may cause a validator to go offline, or a validator may be actively attempting to disrupt the chain.

In the simple case of a missed slot, members of the corresponding attestation committee have nothing to sign. As a result, neither the block producer or committee members receive a reward for this block. Similarly, in the case that a producer creates an *invalid* block, nodes will automatically reject the block and it can effectively be treated as if no block was produced.

```text
TODO: Image of missed slot.
```

We need to introduce some new functionality, however, to handle the case in which a producer creates *two or more* blocks during the same slot. Until now, we hadn't introduced any rules preventing this sort of behavior. We clearly want to patch any holes in our system that allow a validator to so easily create a fork in our chain.

```text
TODO: Image of two blocks during the same slot.
```

Our very first additional mechanism, therefore, is to define a punishment for any validators caught creating more than one block during the same slot. We refer to this sort of punishment as "slashing." A validator is *slashed* if evidence of misbehavior is included in some later block. In this case, our evidence is the existence of a validator's signature on two distinct blocks with the same slot number.

Simply punishing the block producer doesn't entirely solve our problem, unfortunately. It's still possible for a validator to create two blocks within the same slot, even though they'll be punished for doing so. A wealthy attacker, for example, might be willing to face the financial penalty simply to see how the network reacts.

In such an event, the attestation committee is faced with a dilemma. Attestations can only be rewarded if they are included in the history of the chain. If a committee member votes for the "wrong" block, then, from the perspective of the canonical chain, their vote effectively does not exist. As a result, the committee member receives no reward on the canonical chain. The natural and rational choice is, therefore, simply to create votes for both chains.

```text
TODO: Image of nothing-at-stake problem.
```

Since both chains receive votes, both may be equally "valid" with respect to whichever fork-choice rule we develop to handle forks. Assuming that validators are rational, both chains *will* receive the same number of votes. If this continues, our chain will end up as a mess of forks.

We prevent this behavior by introducing a slashing penalty for any validators who create two votes during the same slot. Our evidence in this case takes the form of a validator's signature on two distinct votes with the same slot number.

If a committee member does have to make this decision, they will naturally want to wait and see which bock has received more votes. However, this leads to a situation in which all validators are waiting for votes and, as a result, no validators are publishing votes.

We circumvent this issue by adding logic to our reward system such that an attestation is more valuable the more quickly it's included in the chain. Validators are therefore forced into making a timely decision. Eth2 designs this reward to halve with each additional slot.

---

Since forks are always a possibility, we need to create a fork-choice rule that allows validators to find the "correct" chain to extend. In the case of a one-block fork, we can simply say that validators should follow whichever fork has more votes.

```text
TODO: Image for one-block fork.
```

However, this decision becomes more complex when deciding between chains more than one block in length. We could consider, for instance, using a version of the Longest Chain Rule modified to fit our Proof of Stake environment. Instead of following the chain with the highest total difficulty, we follow the chain with the most total votes, weighted by stake.

Our algorithm would take the form:

```text
TODO: Add LCR algorithm here.
```

Such an algorithm would be quite effective at resolving a fork such as the one shown below, in which we can clearly see a "winner":

```text
TODO: Image with lopsided forks.
```

Unfortunately, the realities of a blockchain network leave this fork-choice rule open to attack. Imagine a scenario, for instance, in which a malicious validator controls $\frac{1}{3}$ of the stake on our network. This attacker wants to create a competing chain that somehow overcomes the primary chain.

If the primary chain is operating smoothly, then the Longest Chain Rule prevents the attacker from getting very far. Even if the attacker refuses to publish blocks on the primary chain, thereby leaving an empty slot every third block on average, the attacker can only create one block for every two created on the primary chain. Furthermore, these blocks will only have half of the votes, on average, that primary chain votes have.

```text
TODO: Image with attacker's chain in ideal conditions.
```

The Longest Chain Rule starts to show weakness, however, in the presence of particularly high network latency. With sufficient latency on the primary chain, we may run into situations in which a validator does not receive the previous block before the validator's assigned slot begins. In this case, the validator will build their block on the last known block. Once the missing block becomes available, we end up with a small chain fork.

```text
TODO: Image with attacker's chain and small latency fork.
```

An attacker can use this latency to their advantage. As latency increases, the primary chain extends in length more and more slowly. If latency reaches four times the slot length, then the primary chain will, on average, only extend by one block (with $\frac{2}{3}$ votes) for every two blocks (with $\frac{1}{3}$ votes each) on the attacker's chain.

```text
TODO: Image with attacker's chain and large latency fork.
```

At any higher latency, the attacker's chain will quickly begin to outpace the primary chain, even though the attacker only controls $\frac{1}{3}$ of the total stake. The Longest Chain Rule doesn't seem to accurately capture the will of the majority as latency increases.

```text
TODO: Image with attacker's chain and massive latency fork, LCR picks attacker.
```

---

Eth2 introduces a fork choice rule called "Latest Message Driven GHOST", or LMD GHOST for short. Based on the GHOST algorithm described in our overview of Eth1, LMD GHOST patches the holes in the Longest Chain Rule by acknowledging votes on uncle blocks.

LMD GHOST, like GHOST, consider votes within uncle blocks to a chain as votes for the chain itself. Furthermore, in order to avoid double-counting votes, LMD GHOST only takes into account the *latest messages* from each validator. In combination, these two rules give the following algorithm:

```text
TODO: LMD GHOST algorithm.
```

LMD GHOST often agrees with the Longest Chain Rule.

```text
TODO: Image LMD GHOST agrees with LCR.
```

However, LMD GHOST addresses the attack vector for the Longest Chain Rule because a minority chain can never receive more votes than a majority chain. The attacker's chain from our previous example can never receive more than $\frac{1}{3}$ votes, no matter the length of the chain.

```text
TODO: Image for attacker failing under LMD GHOST.
```

Additionally, the attacker is unable to force the rule to favor their chain in the case that the primary chain has stopped producing blocks altogether.

```text
TODO: Image for attacker failing even when other chain is offline.
```

---

So far, our chain has slashing rules that prevent validators from creating multiple votes during the same slot. Furthermore, LMD GHOST ensures that votes for the same chain created by the same validator in different slots won't be counted twice. We have not, however, prevented validators from making votes for *different* chains during different slots.

An attacker with sufficient stake could abuse this fact to cause a prolonged fork. An attacker could "save" votes by refusing to publish them during previous slots and then later "release" these votes to manipulate the fork decisions of other validators.

For instance, take the following situation in which an attacker with $\frac{1}{3}$ stake has not published votes for several slots in a row.

```text
TODO: Image for saved messages.
```

At this point, the attacker has accumulated $\frac{1}{3}$ votes for each of the missed slots. The attacker then waits for a fork in the chain, perhaps due to network latency, and publishes $\frac{1}{3}$ votes in favor of one of the two blocks. 

```text
TODO: Image for publication of initial votes.
```

Next, the attacker waits until they see other validators publish enough votes that this first block almost has a majority. At this point, the attacker uses another set of saved up votes to vote for the other forked. Since LMD GHOST considers latest messages, it will remove the attacker's original votes and only consider the latest ones. Now, LMD GHOST swaps and suddenly favors the other block.

```text
TODO: Image for publication of second votes.
```

Since LMD GHOST favors the second block, validators who have not yet voted will begin to submit votes for the second block. Our attacker can continue to execute this "flip-flop" attack for many blocks in a row, forcing the chain to split between two potential forks.

Eth2 addresses this problem by refusing to accept any votes older than a certain number of slots. This prevents any attacker from saving up a significant number of votes.

---

LMD GHOST effectively blocks a minority chain from outrunning a majority chain. However, our chain has, until now, relied on a fixed validator set. The introduction of a dynamic validator set can break certain properties of LMD GHOST unless actively addressed.

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

Let's examine one extreme case in which an attacker can halt our chain. Assume that at some time, three validators held, jointly, 100% of stake on the chain. All three validators sign messages in support of some given block. At some time in the future, all three have withdrawn from the chain and are replaced by new validators.

```text
TODO: Image for our setup.
```

Now, by some means, a malicious party has acquired the keys for the original three validators. Perhaps the validators sold their keys for some low price, as they are at no risk of losing any funds. Possibly, an attacker managed to hack the keys as the validators had little reason to continue heavily securing them. No matter the reason, the attacker has managed to relatively cheaply acquire the keys.

The attacker now uses the keys to create a block that forks the first block supported by all three parties. Then, the attacker publishes this block to other clients. When the clients attempt to decide between the two blocks, they find that LMD GHOST is unable to make a decision. According to the rules of LMD GHOST, both chains have 100% of votes and are equally good.

```text
TODO: Image with the malicious fork.
```

This attack is effective because the attacker is able to violate the honest majority assumption retroactively. Even if all three validators were faithfully following the protocol before withdrawing their funds, there's no strong incentive to continue doing so once their funds are withdrawn. Our "honesty" assumption is highly dependent on the existence of incentives for correct behavior.

---

This attack can be generalized beyond the special case in which it was initially presented. For any block in the chain, we can find a specific number of supporting validators from the known validator pool at that block, `p`. This value is identical to the LMD GHOST score for that block.

As withdrawal requests are a form of support for a block, we know that at most `p` accounts have withdrawn their funds. In order to execute this attack, an attacker must acquire keys for at least `p` accounts. Under the assumption that all `p` accounts have withdrawn their funds, the attacker can acquire `p` keys at relatively negligible cost. However, if `p < 0.5`, the attacker must acquire an additional `0.5 - p = q` keys to successfully attack the chain. Since all other keys belong to active validators, the attacker must spend at least `0.5s - p`. 

From this last equation, it's clear that the cost of this attack decreases as more of the validator set at a given block withdraws their funds.

We refer to this sort of attack as a "long range attack." Such an attack, as we've shown, becomes possible once 2/3rd validators withdraw their funds. We can determine the minimum distance for a long range attack depending on our withdrawal delay and any churn limitations.

The solution to this problem is effectively to introduce a new rule that prevents clients from reverting any block created more than `n` blocks ago, where `n` is the amount of time for 2/3rds of validators to withdraw their funds. These additional rules are, together, referred to as Casper FFG.

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