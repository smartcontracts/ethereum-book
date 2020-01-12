---
path: "/chapters/eth1-overview/consensus"
title: "Consensus Mechanisms"
---

Eth1 uses this basic system. Before we look at the contents of blocks, let's look at how blocks get created. Basically, Eth1 uses something called Proof of Work. It's a consensus mechanism that works like this.

We have some block of transactions. If we simply allowed anyone to create a valid block at any time, then we would have a ton of potential blocks and we wouldn't know where to look. Instead, we want some sort of metric to decide which block is going to be valid. Proof of Work uses the metric of economic value expended in the form of computational expenditure. 

So the way thsi works is that a person first collects a bunch of transactions from a pool of txs that people dump txs into. Next, they take the actual data inside that block (1s and 0s) and do a mathematical operation called a hash on the header. The hash is basically a function that takes any arbitrary data (1s and 0s) and covnerts it into a short fixed sized number in a way that we can't predict what that number is going to be and we can't get the original data back from the number.

The idea here is that we ask potential block producers to keep creating new hashes by slightly tweaking the block (a "nonce"). Since this resulting number is not predictable, it's gonna be random. We create a sort of lottery system in which we ask people to find a resulting hash that is less than some target value. So let's say that the hash can be a number between 1 and 10, we would want people to find perhaps a number below 3. Since they can't predict what the number is going to be, they have to tweak the block and try again until they get 3.  Of course in the real system, we're not dealing with 1 and 10 but 0 and 2^255 which is really friggen big. This takes many hashes to find on average. Once you find this hash, congrats you made a block.

Ok so we have the ideas of state, transactions, and blocks. Now we need to figure out how blocks get created. In a general sense, we refer to this process as the consensus mechanism.

The idea here is as follows. Let's say anyone is allowed to create new blocks in our blockchain. Alice sends their full balance to bob and simultaneously to carol. Now alice creates one block where they add the first tx and another where they add the second tx. They give the first block to bob and the second to alice. Bob thinks the tx is valid, alice does too. How solve?

This is the famous double spending problem, and it forms the basis of most blockchain protocols. Basically, we want some sort of guarantees that a certain chain of blocks is actually the "canonical" chain. When we say canonical, we really mean the chain that many people are agreeing to follow, which is why we call this the consensus process.

We can come up with many idfferent possible ways to come to consensus. One of the simplest would just be to have a single trusted party who gets to create all blocks. This works fine if people really do trust that party to create the blocks, but it creates issues if the "trusted" party starts making multiple forks and presenting them both as reality. Womp.

Can we do better? Yes. 

Proof-of-Work, commonly shortened to PoW, is a consensus mechanism that tries to, generally, connect the valid chain with the chain that has most expended value on it. The way this achieved is basically by requiring that people burn certain physical resources (waste). in a high level sense, whichever chain has the most burned resoruces behidn it is considered to be the valid chain.

How though? So what PoW basically does is the following. We sort of create a "lottery" using mathematics. We have this mathematical concept of a hash function, which is a function that takes any input (0s and 1s) and spits out an output (also 0s and 1s) of fixed size, such that it isn't possible to get the original text back from the hashed text. It also is designed so that we can't predict what the resulting value will be. Since it's 0s and 1s, it can be represented as a number.

For example, here's the hash of "hello" in sha256: 0x...... This is a pretty garbled number. You can try playing with that site, and notice a few things. First, any tiny change you make will really change the rest of the string. Even one additional character will cause teh whole string to change. Next, try finding some input such that the first three characters of the output are all zeroes. This is hard! You probably have to do a whole bunch of guesses.

So that's the basic idea behind proof of work too. Instead of trying to get a number that starts with only three zeroes, we're pretty much trying to get a number that starts with like 20 or 30 zeroes. You have to make trillions of guesses to find one that works! So the idea here is that you can get machines that do these guesses for you. Two machines can guess at the same time, so even if the total number of guesses is the same, you cut down on the time to find a correct answer. GEnerally speaking, your ability to find a guess before other people corresponds to the number of computers you have doing math (and quality ofthese computers of course). Which corresdponds to the amount of moeny ivnested in the system.

In the blockchain we're not guessing on random strings, we want specific strings. We specifically want the hash of the block header to have a specific value. The block header basically contains a commitment to the data inside the block. YOu can make guesses by slightly changing parts of the header, the nonce. The reason for this is that we want the guesses to reference a specific block, meaning you're actually doing work on that specific block.

Okay so we have a system for producing blocks. We do this mathematical lottery and blocks get generated every once in a while. We can tweak the amount of work necessary automatically so that the time between each block is approximately constant. Ofc since this is a random process, there's always a chance that you somehow get lucky on the first guess, but it's generally extremely unlikely that this will happen. The law of large numbers guarantees that itll be relatively average on the long term.

Now we go back to alice. IF she wants to cheat bob and carol, she has to do the work to produce two different blocks. So now at the very least we have some lower bound for the amount that she'd even be willing to cheat anyone, where it's based on the expense of doing that work. What if she does manage to create two blocks though?

Well, then we have a fork.

In the case of a fork, we need to develop something called a fork-choice rule. A fork-choice rule is basically what it sounds like, some rule for determining which chain is valid among different chains.

The simplest possible rule in Proof of Work is the longest-chain rule, which is what Eth1 uses. The rule is that we follow whichever chain has the most amount of work behind it, based on the "size" of the number. Smaller the number, more the work.

So now when alice creates these two blo