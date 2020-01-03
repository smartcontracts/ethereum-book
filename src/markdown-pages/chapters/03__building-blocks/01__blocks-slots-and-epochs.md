---
path: "/chapters/building-blocks/blocks-slots-and-epochs"
title: "Structure: Blocks, Slots, and Epochs"
---

The Eth2 Beacon Chain is an unusual beast in the world of blockchains. Although most blockchains are simply structured as an ordered list of blocks, the Beacon Chain introduces several new concepts like "slots" and "epochs." These elements are important to the actual operation of the Beacon Chain, so it's important we understand them before moving on. Luckily, they're not nearly as confusing as they might sound.

## Blocks
The Beacon Chain retains the idea of blocks from traditional blockchains. After all, would a blockchain really be a blockchain without blocks? Beacon Chain blocks consist of so-called "system-level" transactions such as changes to the list of currently active validators. Applications, like the smart contracts you might be familiar with on Eth1, don't actually live on the Beacon Chain. Instead, applications reside and are executed on Shard Chains. We'll discuss Shard Chains and the actual contents of Beacon Chain blocks in more detail later on, but it's good to note that blocks do still exist.

## Slots
"Slots" are an interesting little addition that naturally appear in Proof of Stake blockchains. It's easier to understand why slots come about if we first look back at the way in which blocks are produced in a Proof of Work blockchain. Most Proof of Work chains follow relatively similar block production mechanisms. That is, a user may, at any time, publish a new block as long as the hash of the block, a number deterministically and unpredictably generated from the contents of the block, is less than some "target" number. If the block hash doesn't hit the target, then the user changes the block slightly and tries again. Since each hash takes a little bit of computational effort, the user needs to expend resources for each change to the block. Effectively, this system acts as a lottery in which any individual user's odds of "winning" are based on the amount of money they've spent on the machines that generate hashes.

Beacon Chain blocks, by contrast, aren't produced through this sort of lottery system based on physical hardware. Instead, the Beacon Chain picks block producers from a defined set of validators. We could pick validators in a lot of different ways, we'll discuss the actual selection method later, but the Beacon Chain is effectively telling validators which blocks to produce and when. However, if the Beacon Chain only said something along the lines of "`validator 123` gets to produce `block 456`," then the chain would stall in the case that `validator 123` didn't publish `block 456`. We need to add some more functionality to the Beacon Chain in order to avoid this sort of scenario.

We can avoid this sort of stall by introducing the idea of a "slot." A slot is simply just a period of time in which a validator has the right to produce a block. If the validator fails to produce a block during that period of time, then we move on to the next slot and its corresponding validator. Instead of "`validator 123` gets to produce `block 456`," we end up with "`validator 123` gets to produce `block 456` during `slot 789`." If `validator 123` doesn't produce their block during `slot 789`, we simply move onto the next slot and the next validator.

The genesis block for the Beacon Chain has a "start time," which allows us to figure out the current slot. We define the amount of time for each slot in advance, and we can figure out the current slot by seeing how much time has passed since the genesis block was produced. For example, if each slot is six seconds long and the genesis block was produced 6000 seconds ago, then the current slot would be `slot 1000`.

### Slots and Block Height
Although slots are a new concept in the Beacon Chain, we still have the same idea of block "height" that you'd find in a Proof of Work blockchain. Beacon Chain blocks simply also have a second "slot" attribute that corresponds to the slot in which that block was produced. 

So, whereas a Proof of Work blockchain might look like this:

![Proof of Work Block Height](./images/blocks-slots-and-epochs/pow-height.png)

The Proof of Stake Beacon Chain will look something like this:

![Proof of Stake Slots and Block Height](./images/blocks-slots-and-epochs/pos-height.png)

Here we get an idea of what happens when a slot gets "skipped." Third block (`block 2`) still has a height of two (assuming that the genesis block has a height of zero), but was produced in `slot 4`.

## Epochs
Epochs are another new concept within the Eth2 Beacon Chain. Basically, an epoch are is specified number of slots and therefore forms a chunk of time. For example, if each slot is six seconds and each epoch is 64 slots, then each epoch is `6 seconds per slot * 64 slots per epoch = 6.4 minutes per epoch`:

![Proof of Stake Epochs](./images/blocks-slots-and-epochs/pos-epochs.png)

And of course, as with slots, we can determine the current epoch by looking at the amount of time elapsed since the production of the genesis block.

Epochs are markers for several important events in the life-cycle of the beacon chain. For instance, certain accounting tasks are only executed at the start of a new epoch. We fully explore the purpose of the epoch in later sections.