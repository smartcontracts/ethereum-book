---
path: "/chapters/notes/pos-draft"
title: "Proof of Stake Draft"
---

Now that we've covered the basic elements of Eth2, let's see how these play out in a best-case scenario. Many of the design decisions behind Eth2 can be best understood by analyzing the various ways in which things can go wrong in a naive Proof of Stake protocol. Let's see how such a naive protocol might function. Then, we'll start enumerating possible attacks and the various mechanisms we can use to prevent these attacks.

We briefly described the concepts of blocks and slots in the previous section. A very simply Proof of Stake protocol operates by assigning one validator to each slot, and allowing that validator to produce a block. Such a protocol presupposes the existence of some method for determining which validator to assign to each slot.

The details of this selection process are generally not necessary to understand in order to get a high-level understanding of Proof of Stake as a whole. A full treatment of this process within Eth2 is provided in later sections. However, one should be aware that any such process attempts to strike a balance between two key properties.

A validator's value within the system is to perform certain actions that allow the system to continue to operate, such as creating new blocks. As a result, we want to properly reward validators for performing these tasks. Furthermore, the robustness of a blockchain system largely depends on the condition that a validator's influence on the system is directly proportional to their economic investment in it.

As a result, our selection process should choose a validator to produce blocks at a rate that mirrors their percentage of owned stake. A validator who controls 1% of all stake, for instance, should roughly be selected to propose 1% of all blocks. Similarly, such a validator should roughly hold 1% of all votes about the validity of any given block.

Our selection process should also take care to avoid revealing validator roles too far ahead of time. Otherwise, a malicious actor has enough time to orchestrate certain attacks with or against other validators. For example, a malicious actor could attempt to launch a denial of service attack against several validators if they can forsee that those validators happen to be chosen to produce several blocks in a row.

For the sake of this initial operational analysis, we'll assume that our chain determines validator roles randomly, several slots in advance of the slot in question. More generally, the roles for `Block N` are chosen randomly during `Block N-M` where `M` is our lookahead time. Further assume that our random distribution is perfect such that in the long run, a validator with 1% of stake produces exactly 1% of all blocks. This does not entirely reflect the selection process used within Eth2, but is a "good enough" approximation for now.

With our simple selection process, we can create a basic Proof of Stake chain as follows. We begin by assuming that our validator set is unchanging. Eth2 does allow validators to enter or leave the system, but this introduces security concerns and will be addressed later in this chapter. Our genesis block contains the initial set of validators, and our selection process will randomly select one of these to produce a block during each slot.

We also select some fixed number of validators to serve on the attestation committee for each slot. Assuming this validator produces a block and that there is no network latency, the committee will receive the block within the assigned slot. Committee members then check the validity of the block according to some rules. Assuming the block is valid, the members will then broadcast a vote of validity. This process continues, and the chain progresses.

Of course, in reality, we cannot assume that the chain will operate with such perfection. We might, for example, run into the case that a validator simply chooses not to produce a block during their assigned slot. A software failure may cause a validator to go offline, or a validator may be actively attempting to disrupt the chain.

In the simple case of a missed slot, members of the corresponding attestation committee have nothing to sign. Neither the block producer or committee members receive a reward for this block. Similarly, in the case that a producer creates an invalid block, nodes will automatically reject the block and it can effectively be treated as if no block was producer.

We need to introduce some new functionality, however, to handle the case in which a producer creates two blocks during the same slot. So far, we haven't introduced any rules that prevent this sort of behavior. Our very first addition is to define a punishment for any validators caught creating more than one block during the same slot.

Generally, we refer to this sort of punishment as "slashing." A validator is slashed if evidence of misbehavior is included in a later block. In this case, our evidence is the existence of a validator's signature on two distinct blocks with the same block number.

Simply punishing the block producer doesn't entirely solve our problem, however. It's still possible for a validator to create two blocks within the same slot, even though they'll be punished for doing so. A wealthy attacker, for example, might be willing to face the financial penalty simply to see how the network reacts.

In such an event, the attestation committee is faced with a dilemma. Attestations can only be rewarded if they are included in the history of the chain. If a committee member votes for the "wrong" block, then their vote effectively does not exist from the perspective of the canonical chain. As a result, the committee member receives no reward on the canonical chain. The natural and rational choice is, therefore, simply to create a vote for both chains.

Since both chains receive votes, both may be equally "valid" with respect to whichever fork-choice rule we develop. Assuming that validators are rational, both chains will receive the same number of votes. If this continues, our chain will end up as a mess of forks.

We prevent this behavior by also slashing any validators who create two votes during the same slot. Our evidence in this case takes the form of two signatures on distinct votes with the same slot number.

If a committee member does have to make this decision, they will naturally want to wait and see which bock has received more votes. However, this leads to a situation in which all validators are waiting for votes and, as a result, no validators are publishing votes.

We circumvent this issue by adding logic to our reward system such that an attestation is more valuable the more quickly it's included in the chain. Validators are therefore forced into making a timely decision. Eth2 designs this reward to halve with each additional slot.

If we do have a fork, we need to determine a fork-choice rule that allows us to find the "correct" chain for validators to extend. In the case of a one-block fork, we can simply say that validators should follow whichever fork has more votes. However, this decision becomes more complex when deciding between chains more than one block in length.

We could consider, for instance, using a version of the Longest Chain Rule modified to fit our Proof of Stake environment. Instead of following the chain with the highest total difficulty, we follow the chain with the most total votes, weighted by stake.

Our algorithm would take the form:

Such an algorithm would be quite effective at resolving a fork such as the one shown below, in which we can clearly see a "winner":

Unfortunately, the realities of a blockchain network leave this fork-choice rule open to attack. Imagine a scenario in which a malicious validator controls 1/3 of the stake on our network. This attacker wants to create a competing chain that somehow overcomes the primary chain.

If the primary chain is operating smoothly, then the Longest Chain Rule prevents the attacker from getting very far. Even if the attacker refuses to publish blocks on the primary chain, thereby leaving an empty slot every third block on average, the attacker can only create one block for every two created on the primary chain. Furthermore, these blocks will only have half of the votes, on average, that primary chain votes have.

The Longest Chain Rule starts to show weaknesses in the presence of particularly high network latency. With sufficient latency on the primary chain, we may find small chain forks if a validator does not receive the previous block before the validator's assigned slot begins. In this case, the validator will build their block on the last known block. Once the missing block becomes available, we end up with a small chain fork.

An attacker can use this latency to their advantage. As latency increases, the primary chain extends in length more and more slowly. If latency reaches four times the slot length, then the primary chain will, on average, only extend by one block (with 2/3rd votes) for every two blocks (with 1/3rd votes each) on the attacker's chain.

At any higher latency, the attacker's chain will quickly begin to outpace the primary chain, even though the attacker only controls 1/3rd of the total stake. The Longest Chain Rule doesn't seem to accurately capture the will of the majority as latency increases.

As an alternative, Eth2 introduces a fork choice rule called "LMD GHOST." Based on the GHOST algorithm described in our overview of Eth1, LMD GHOST patches the holes in the Longest Chain Rule by acknowledging uncle blocks. It first adapts GHOST to consider votes within uncle blocks to a chain as votes for the chain itself.

Furthermore, in order to avoid double-counting votes, LMD GHOST only takes into account the latest messages from each validator. In combination, these two rules give the following algorithm:

LMD GHOST ensures that no minority of stake can outrun a majority chain. The attacker from our previous example can no longer create an alternative history, as their chain can never receive more than 1/3rd votes, no matter the length of the chain.

Additionally, the attacker is unable to force the rule to favor their chain in the case that the primary chain has stopped producing blocks altogether.

LMD GHOST is extremely powerful in this way. However, our chain has, until now, relied on the existence of a fixed validator set. Under this assumption, the 2/3rds of stake owned by honest validators will forever be owned by honest validators. In Eth2, we want to allow validators to both join and leave the system.

The purpose of a dynamic validator set is, in some sense, intuitive. Just as with Proof of Work, anyone should have the ability to join or leave the system at any time. If the validator set remains fixed, a permanent "nobility" maintains control over the system. Such a "nobility" is in direct violation of many of the core philosophical ideals behind decentralized networks.

The introduction of a withdrawal system brings with it several challenges for our Proof of Stake chain. A naive method for withdrawals might allow validators to exit the system immediately after a withdrawal request is included in the chain. Though convenient, such a system would permit an attacker to wreak havoc on our network.

Take, for instance, an attacker who creates two blocks in the same slot. We initially addresses this vector with the introduction of slashing penalities. Unfortunately, under certain network conditions, evidence of this behavior may not be immediately included in the blockchain. If an attacker can withdraw their funds before evidence is included, then the attacker faces no financial penalty.

An attacker could even, for example, execute such an attack simply because the chain randomly selects them to produce multiple blocks in a row.

To prevent this sort of behavior, it's necessary to introduce some delay into the withdrawal process. Such a delay should generally be "long enough" that the likelihood of flying under the radar is negligible. The lower bound for this delay can be estimated so that the odds of an attacker with 1/3rd stake being chosen to produce all blocks before the withdrawal is minimized.

Although a withdrawal delay ensures that slashable behavior can be punished, the existence of any withdrawal mechanism poses problems for LMD GHOST. Our troubles begin due to the fact that a withdrawn validator faces no consequences for any slashable behavior carried out in the past. Indeed, this is exactly why we introduced a withdrawal delay.

Our delay cannot, however, punish any messages received after the withdrawal is completed that are crafted to look as if they were created in the past. We cannot distinguish between messages actually created in the past, but not seen, and messages constructed to appear as if they were made in the past. Therefore, as long as our delay is finite, an attacker can perform certain slashable actions without fear of being punished.

The withdrawal process first removes a validator from the set of active participants. An attacker can only create messages from a time in which they were still active, since newer messages would be rejected by clients. An attacker could, for instance, publish a block that creates a fork some time in the past.

Just as with any other new block, clients would need to factor this new block into their fork-choice rule in order to determine the correct chain to follow. With only a single block and no votes, however, LMD GHOST still clearly favors our primary chain. An attacker needs to go further to cause problems.

Let's examine one extreme case in which an attacker can halt our chain. Assume that at some time, three validators held, jointly, 100% of stake on the chain. All three validators sign messages in support of some given block. At some time in the future, all three have withdrawn from the chain and are replaced by new validators.

Now, by some means, a malicious party has acquired the keys for the original three validators. Perhaps the validators sold their keys for some low price, as they are at no risk of losing any funds. Possibly, an attacker managed to hack the keys as the validators had little reason to continue heavily securing them. No matter the reason, the attacker has managed to relatively cheaply acquire the keys.

The attacker now uses the keys to create a block that forks the first block supported by all three parties. Then, the attacker publishes this block to other clients. When the clients attempt to decide between the two blocks, they find that LMD GHOST is unable to make a decision. According to the rules of LMD GHOST, both chains have 100% of votes and are equally good.

This attack is effective because the attacker is able to violate the honest majority assumption retroactively. Even if all three validators were faithfully following the protocol before withdrawing their funds, there's no strong incentive to continue doing so once their funds are withdrawn. Our "honesty" assumption is highly dependent on the existence of incentives for correct behavior.

This attack can be generalized beyond the special case in which it was initially presented. For any block in the chain, we can find a specific number of supporting validators from the known validator pool at that block, `p`. This value is identical to the LMD GHOST score for that block.

As withdrawal requests are a form of support for a block, we know that at most `p` accounts have withdrawn their funds. In order to execute this attack, an attacker must acquire keys for at least `p` accounts. Under the assumption that all `p` accounts have withdrawn their funds, the attacker can acquire `p` keys at relatively negligible cost. However, if `p < 0.5`, the attacker must acquire an additional `0.5 - p = q` keys to successfully attack the chain. Since all other keys belong to active validators, the attacker must spend at least `0.5s - p`. 

From this last equation, it's clear that the cost of this attack decreases as more of the validator set at a given block withdraws their funds.

We refer to this sort of attack as a "long range attack." Such an attack, as we've shown, becomes possible once 2/3rd validators withdraw their funds. We can determine the minimum distance for a long range attack depending on our withdrawal delay and any churn limitations.

The solution to this problem is effectively to introduce a new rule that prevents clients from reverting any block created more than `n` blocks ago, where `n` is the amount of time for 2/3rds of validators to withdraw their funds. These additional rules are, together, referred to as Casper FFG.

The first new concept we'll introduce is the checkpoint. Checkpoints are special blocks that are candidates for finalization. We can pick our checkpoint blocks however we please, but Eth2 specifically states that checkpoints occur once every fixed number of blocks. Currently, this happens every 32 slots. We call this period of 32 slots an "epoch."

When the first slot of an epoch is not empty, this block serves as the checkpoint for that epoch. Since we might miss a slot, it's possible that the first slot of an epoch will be empty. In this case, we use the last known block as the checkpoint block for that epoch. We refer to the checkpoint for an epoch as the "epoch boundary block," or EBB for short.

Whenever a validator creates an attestation, they must now also include a vote to connect two checkpoint blocks. This vote contains references to two checkpoints that the validator wishes to connect. The purpose of this connection will soon become clear.

If 2/3rds of validators vote to make the same connection between two checkpoints, then we say that there exists a "supermajority link" between the checkpoints. We then additionally introduce the concept of a "justified checkpoint." We say that the genesis block is by default a justified checkpoint. Beyond the genesis block, a checkpoint is justified if it is connected to another justified checkpoint by a supermajority link.

This system reveals the purpose of the connections. We are attempting to create an "overlay blockchain," a series of blocks found to be valid by a 2/3rds of validators. However, justification alone is not sufficient for finalization. The reason for this is most easily understood by example.

Imagine a chain in which we have two potential checkpoint blocks for the same epoch. Such a situation might arise if, for example, network latency delays propagation of the block in the first slot of an epoch. 

An attacker with 1/3rd of stake wants to exploit this situation to prevent any more blocks from being justified. Some portion of honest validators created votes under the assumption that the first block did not exist. Later, when the block became available, other honest validators created votes that conflicted with these first votes.

If we do not allow validators to create conflicting votes, then our attacker can completely prevent more checkpoints from being justified. All they need to do is simply refuse to publish any votes. Since some honest validators are in conflict, it would be impossible to react 2/3rds votes on a checkpoint.

Because of cases like this, we allow validators to create certain votes that contradict themselves. We still do not allow validators to create multiple votes during the same slot, but we permit validators to make two votes with the same source height or where the connections overlap.

This allowance prevents us from halting like we did in the previous scenario. Validators can now simply switch their votes to follow the majority.

However, this reveals why justification alone is insufficient for finalization. Once validators can make contradictory votes, then multiple conflicting checkpoints can become justified. We need to go slightly further to ensure that conflicting checkpoints cannot be finalized.

We say that a checkpoint is finalized if it is justified and connected to its direct parent checkpoint. The logic behind this rule mostly follows from the idea that we want to ensure, without a doubt, that 2/3rds of our stake has made a vote that it cannot contradict.

We previously noted that validators are allowed to make conflicting votes where source height is the same and target height differs, or where the connections intersect. Now we make this explicit and introduce the two casper "commandments."

I. A validator cannot make two votes where H(t1) = H(t2).
II. A validator cannot make two votes where H(s1) < H(s2) < H(t2) < H(t1).

These two rules do allow for the exceptions previously detailed. However, they ensure some additional properties. The first rule guarantees that we can never have conflicting justified checkpoints at the same height. Therefore, if we do have conflicting checkpoints, one must have a greater height than the other.

Now, we instate a "fork choice rule" for checkpoints that validators should always follow the justified checkpoint at the greatest height. Again, our first rule guarantees that only one of these will exist.

Since only one exists, if the immediate next checkpoint is justified, then we can be sure that no other conflicting checkpoints can appear later. Rule I directly prevents validators from justifying two child checkpoints, and Rule II prevents any attempts to vote "around" the highest justified checkpoint.

Casper FFG guarantees that 2/3rds of validators have made a decision about the chain that they will not revert later. Whenever a client sees a new finalized checkpoint, they will never accept a fork from before the checkpoint. Clients are effectively immune from long range attacks because they've received a promise from validators in advance.

However, we face one final, fundamental dilemma. An attacker might not be able to trick existing clients into accepting a conflicting promise. Unfortunately, the client must determine the validity of a promise for themselves. A new client that wasn't online when the first promise was made has no way to tell between the "real" and "fake" promises.

This dilemma sits at teh heart of Proof of Stake. Termed the "weak subjectivity problem," it requires that anyone offline longer than the time for 2/3rds of validators to withdraw their funds rely on some external source to determine the "primary" chain.