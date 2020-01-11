---
path: "/chapters/eth1-overview/blockchains"
title: "Blockchains"
---

Ok so blockchain basics. Generally, we have this idea of transactions, which are functions that take some state (x) and take an input, and thentransform it into a new output state (y). For example, a transaction might look like this: alice send money to bob. 

Now in order to efficiently do these transactions, we collect transactions into blocks of transactions. So we might have alice send money to bob, carol send money to dave, etc. All included in the same block.

Each block of transactions always references some previous parent block of transactions that it builds upon. This is what creates the chain of blocks, as the blocks each refer to a parent and we can go from the last block allll the way to the first block. This first block obviously can't reference a parent, so we call it the genesis block and it just includes some initial data.

## Creating Blocks
Eth1 uses this basic system. Before we look at the contents of blocks, let's look at how blocks get created. Basically, Eth1 uses something called Proof of Work. It's a consensus mechanism that works like this.

We have some block of transactions. If we simply allowed anyone to create a valid block at any time, then we would have a ton of potential blocks and we wouldn't know where to look. Instead, we want some sort of metric to decide which block is going to be valid. Proof of Work uses the metric of economic value expended in the form of computational expenditure. 

So the way thsi works is that a person first collects a bunch of transactions from a pool of txs that people dump txs into. Next, they take the actual data inside that block (1s and 0s) and do a mathematical operation called a hash on the header. The hash is basically a function that takes any arbitrary data (1s and 0s) and covnerts it into a short fixed sized number in a way that we can't predict what that number is going to be and we can't get the original data back from the number.

The idea here is that we ask potential block producers to keep creating new hashes by slightly tweaking the block (a "nonce"). Since this resulting number is not predictable, it's gonna be random. We create a sort of lottery system in which we ask people to find a resulting hash that is less than some target value. So let's say that the hash can be a number between 1 and 10, we would want people to find perhaps a number below 3. Since they can't predict what the number is going to be, they have to tweak the block and try again until they get 3.  Of course in the real system, we're not dealing with 1 and 10 but 0 and 2^255 which is really friggen big. This takes many hashes to find on average. Once you find this hash, congrats you made a block.