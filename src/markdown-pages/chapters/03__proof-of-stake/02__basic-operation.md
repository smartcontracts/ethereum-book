---
path: "/chapters/proof-of-stake/basic-operation"
title: "Basic Operation"
---

Ok so what exactly will we talk about in this chapter? What we basically want to communicate is the basic functionality of the beacon chain. This includes things like how block proposers get to be selected, what attestation committees do in a nutshell, votes, etc

What has been covered so far is only limited to the absolute basics like blocks/slots/and what validators are. SO what we want to do here is say initially what validators do:

We can't have a blockchain without anyone to produce blocks. Within a Proof of Work blockchain, like Ethereum, blocks are produced via our lottery system. However, our Proof of Stake chain is trying to avoid that, that's the whole point.

Instead, as we just described, we have slots in which validators are selected to produce specific blocks. Our blockchain will select a validator for each slot, and only that validator is able to create the block. We're going to talk about this in a somewhat abstract sense, we won't discuss the details of what's actually in these blocks yet, but for now this is good enough.

When a validator creates a block during their slot, they will publish that block. We need some sort of "validation" mechanism, otherwise the validator could simply publish a completely garbage block, not ideal obviously. Generally speaking, what we do is we have validators vote on the blocks.

Honest validator?

However, we have very many validators (potentially millions) and we therefore can't have all validators vote on every block. We'd be swamped with a massive amount of data each block.

So instead, we assign specific committees of validators to each slot. Each committee is a certain size, and just as we randomly select our block proposer, we randomly select specific validators to be in each committee from the full list of validators.

Validators in a committee wait until it's their slot, and then will wait a little longer so the proposer can create the block. Then they download the block if it exists, they will vote on whether or not it's valid. If there was no block published, then the validator doesn't do anything.

Interestingly, though, we don't have a "threshold" of validity for individual blocks. Instead, what we have is the idea that, generally, we want to follow blocks with more signatures attached. More on that later. But the idea is pretty simple, we assign committees and they vote on the validity of the block.

Wheee.