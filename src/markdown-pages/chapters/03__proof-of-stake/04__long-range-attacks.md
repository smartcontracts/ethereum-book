---
path: "/chapters/proof-of-stake/long-range-attacks"
title: "Long Range Attacks"
---

```text
DRAFT STATUS: 2/5
```

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

To prevent this sort of behavior, it's necessary to introduce some delay into the withdrawal process. Such a delay should generally be "long enough" that the likelihood of flying under the radar is negligible. The lower bound for this delay can be estimated so that the odds of an attacker with $\smash{\smash{\frac{1}{3}}}$ stake being chosen to produce all blocks before the withdrawal is minimized.

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
This attack can be generalized beyond the special case in which it was initially presented. For any block in the chain, we can find a specific number of supporting validators from the known validator pool at that block, $\smash{v_s}$. Note that this value is identical to the LMD GHOST score for that block.

We can also find the number of validators who have withdrawn their funds, $\smash{v_w}$. As withdrawal requests are a form of support for a block, we know that  that $\smash{v_w \leq v_s}$.

In order to execute this attack, an attacker must acquire keys for at least $\smash{v_s + \frac{v_t - v_s}{2}}$ accounts, where $\smash{v_t}$ is the total number of validator accounts. As accounts in $\smash{v_w}$ are already withdrawn, the cost to acquire these accounts decreases. Therefore, as $\smash{v_w}$ approaches $\smash{v_s}$, the total cost to execute this attack also decreases.

Such an attack, under a majority honesty assumption, becomes possible once $\smash{\frac{2}{3}}$ of the validator set at a given block withdraw their funds. We can determine the minimum distance for a long range attack depending on our withdrawal delay and any limitations on churn.
