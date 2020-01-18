---
path: "/chapters/proof-of-stake/slashing"
title: "Slashing"
---

The basic Proof of Stake mechanism we just described focused on the process of producing new blocks on a single chain. Blockchains in the wild won't always be limited to a single continuous chain, however. As we know from experience, we'll inevitably be subject to forks for any number of reasons.

Chain forks are a reality of any public blockchain system. Eth2 can fork, for instance, if network latency is high enough that a validator creates a block before receiving the previous validator's block.

Our basic Eth2 chain selects block proposers to create blocks during slots and selects attestation committees to vote on these blocks. Without any further limitations, a malicious validator could also create a fork in the network by creating two blocks during the same slot.

We obviously don't want to allow this sort of behavior, because validators should be required to commit to a single version of history. This attack also introduces an additional problem for members of the attestation committee, who now need to determine which fork to vote on. Since validators receive rewards for voting on blocks, and those rewards are meaningless if they don't end up voting on the "correct" chain, the natural incentive is to vote on both chains. 

Without any sort of punishment mechanism, this behavior would incentivize the creation of many forks and, as a result, make Eth2 mostly useless. As a result, we introduce the idea of validator slashing.

The basic concept behind slashing is that we require that validators put down a deposit that can be decreased, or slashed, in the case that they perform certain undesirable actions. Our system originally only required that validators lock up funds, but didn't actually state that these funds could be decreased in any way.

Our basic slashing mechanism prevents validators from publishing two different "messages" within the same slot. In our case, these messages are either blocks or votes. Since Validator B published two different blocks in a fork, they're liable to be slashed. Any validators who created attestations for both Block 1 and Block 2 are also liable to be slashed. Since there's now a downside to creating and voting on multiple blocks at the same time, honest validators will instead maximize their profit by only creating or voting on a single block during each slot.

We execute this punishment by allowing other validators to include proof of this misbehavior within some future block. Validators are incentivized to include this evidence to some extent, simply because any reduction in another validator's stake results in an increase in their own stake as a proportion of total stake. However, since validators will likely attempt to hide any evidence of malfeasance, we further incentivize others to actively search for and include evidence of slashable behavior with a "finders fee." This fee represents a portion of the amount slashed. The rest of the amount is burned in order to prevent validators from reporting their own errors and receiving their entire lost value in return.

