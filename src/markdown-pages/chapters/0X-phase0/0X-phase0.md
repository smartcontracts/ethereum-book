---
path: "/chapters/phase0"
title: "Eth2: Phase 0"
---

## Overview

## Transitioning to Proof of Stake

### Proof of Work: The Incumbent
Blockchains are, fundamentally, consensus mechanisms in which participants come to agreement about a canonical ordered series of transaction blocks. Although there are many different ways in which participants can actually come to an agreement about these blocks, blockchains consensus mechanisms tend to fall into certain classes. Most early blockchain protocols made use of "Proof of Work" consensus mechanisms. Proof of Work is, at its core, based on the concept that the weight of one's voting power in the consensus process is based on the extent of one's expenditure of physical computational resources. Proof of Work systems generally state that a new block is only considered valid if a certain amount of computational effort has been expended in the block's creation. Practically, this typically means that the hash of the new block is less than or equal to a given target value. As secure hash functions are computationally infeasible to reverse, this means that a block producer is required to grind hashes until the target hash is reached.

Proof of Work has several obvious flaws. It clearly relies on the expenditure of precious resources in the form of the energy required to operate hash-computing machines. Furthermore, efficient hash-computing machinery can be a huge advantage in a Proof of Work system. Unfortunately, the ability for a party to create or acquire this machinery is highly dependent on the resources and knowledge available to that party. As a result, these systems tend toward centralization. As this section is not intended to act as a complete argument against Proof of Work consensus protocols, readers interested in understanding the various arguments for (and against) Proof of Work should direct their attention to the following articles.

### Proof of Stake: The Alternative
Proof of Stake has evolved as a proposed alternative to Proof of Work. In short, Proof of Stake replaces the computation-based voting weight with a weight based purely on the value of economic resources placed as a bond, or stake, into the system. This model theoretically follows the same ideology of Proof of Work, but eschews wasteful computation in favor of a more direct representation of interest in the mechanism. Proof of Stake systems attempt to re-create the properties of Proof of Work by randomly assigning the right to produce blocks based on the percentage of assets stake in the system.

#### Coming to Consensus
Although Proof of Stake is theoretically similar to Proof of Work, Proof of Stake introduces several interesting problems. Many of these problems arise from the increase in subjectivity brought by the lack of direct connection to the physical world via hash-computing machinery. One such problem is revealed when we consider how validators should react to forks in the blockchain. In a Proof of Work system, participants cannot split their computational power over multiple possible forks without also proportionally splitting their chances to find the next target hash. However, in a Proof of Stake system, participants can easily create votes for two different forks without expending significant resources. If this behavior is permitted, then Proof of Stake validators will be incentivized to vote on every fork as to avoid losing out on rewards in the case that some unexpected fork becomes the "canonical" chain.

We often refer to this interesting theoretical result as the "nothing-at-stake" problem, and it necessitates much of the early stages of Eth2. We begin the next section with a deep exploration of Ethereum's proposed solution to this problem, Casper FFG. Casper FFG introduces the concept of "epochs," fixed periods of time, that contain "boundary blocks" which can become "finalized" and therefore absolutely canonical and irreversible. Validators that attempt to fork out "finalized" blocks are heavily punished and, therefore, no longer have "nothing-at-stake."

Although Casper FFG addresses a key theoretical barrier for Proof of Stake systems, it does not specify a consensus mechanism for blocks within a particular epoch. We therefore spend a section discussing LMD GHOST, an algorithm used by validators to determine the "correct" chain in the short-term and eventually the "final" chain in the long-term.

#### Moving Toward the Future
Casper FFG and LMD GHOST are both used by validators to make decisions about the current set of canonical blocks. However, neither mechanism actually defines how blocks are produced. We therefore conclude this section with an introduction to the Eth2 block proposal mechanism and the various cryptographic primitives upon which it relies. We explore this mechanism in more detail in later sections, but provide a strong basic intuition. For simplicity, we do not dive deeply into the underlying mathematics behind the cryptographic primitives but instead provide resources for interested readers to explore the constructions on their own.

## Casper FFG

### Background
When we're dealing with financial transactions, we often want to ensure that the transaction has some sense of "finality." If a transaction could be reverted at any time, then most of our economic system wouldn't be functional. For example, imagine that you're going into a small boutique and want to buy some clothes. If there's a significant possibility that your transaction is somehow reversed or is like it never happened, why would the store owner want to sell you anything? Although we do have some forms of this in our lives, mainly in the form of credit card chargebacks, these events are usually reserved for cases of fraud and your credit card company will look into the situation case-by-case. 

Blockchains also need this sort of finality, just like any other transactional system. In traditional Proof of Work blockchains, we get what's called "probabalistic finality." What this basically means is that when there's work done on a block to extend that block, the more work that's done on the block, the less likely that a different competing chain will appear that others will want to build upon. This is, of course, assuming that we follow the rule that if you're honest then you will follow the chain with the most work behind it. The reason why this is probabilistic is because there is always a chance that somehow someone could build a much longer chain by getting really lucky with their hashes. This is actually discussed in the original Bitcoin paper, where it shows how the probability drops off heavily with each additional block on the chain.

In a Proof of Stake system, we want to ensure that we also get some sort of finality. However, it's not expensive to create blocks. In fact, it is very cheap because validators only need to sign a message, which is computationally minimal. However, this opens up a big attack where a validator would just sign off on every different fork because it's worth it for them to do so! This is called the nothing-at-stake problem and means that the blockchain protocol would effectively be incentivized to just sign off on every fork, there really wouldn't be any consensus on a single chain, let alone a finalized chain. So this is where Ethereum introduces Casper FFG. Casper FFG is a mechanism that allows validators to "finalize" blocks created by a block proposal mechanism. We will talk about the specifics of the block proposal mechanism later, but here we first look at the finalization mechanism. Really what finalization means in this context is that validators are agreeing that they won't sign off on forks of ancestors to a finalized block, or they'll be slashed heavily. It gives us certain guarantees about the cost to revert a given previous block.

### Blocks and Slots
Any user in a Proof of Work blockchain has the "right" to publish a new block as long as that block has some specified hash. Generally speaking, this lottery system acts as a proxy for the amount of economic value that the user has invested in the system. Proof of Stake systems similarly attempt to evenly assign the block production rights to users by the amount of economic value invested in the system. However, this now takes the form of the amount of value staked by a known list of validators. There are many potential ways to achieve this. We could, for example, do a simple round-robin system in which validators are allowed to produce X blocks in a row out of N, where X is the amount of stake that validator has and N is the total amount of stake. We could also do a "random" system in which the blockchain attempts to randomly select proposers.

Basically what's necessary to note int he context of proof of stake is that, no matter the system, we need to know for any block who gets the right to produce that block. For example, we could say that user X gets to produce block number 10. We can quickly see a potential issue here. In a Proof of Work system, it's effectively a race to see who gets to produce the block. However, in a Proof of Stake system, we assign this in advance and therefore we know who will produce that block. As a result, it's possible that for some reason the block does not get produced by the assigned validator at some time. If we don't address this issue, then the whole blockchain will stall because the validator didn't produce their block. We have several ways to address this issue. Generally speaking, however, we need to assign some sort of timeout that says that if the validator doesn't produce their block within a given amount of time, we go to the next validator. This naturally leads us to the construction of "slots," periods of time in which a validator is assigned to produce a block and may or may not do so.

Slots are really specific to Proof of Stake blockchains. Proof of Work blockchains typically assign a "height" to every block, where a block's height is equal to its position in the chain. For example, the tenth block following the genesis block will be assigned a height of 10. Generally speaking, the `nth` block following the genesis block has a height of `n`. Proof of Stake blockchains also have block heights, though.

So whereas a Proof of Work blockchain might look something like this:

![Proof of Work block heights](./images/pow-height.png)

Our Proof of Stake chain looks like this:

![Proof of Stake block heights](./images/pos-height.png)

In the above image, we've skipped slots 1 and 3, which means that we didn't see any blocks produced during these slots. The height of the last block in this chain is 2 instead of 4.

### Epochs
Epochs are the important part in FFG. Epochs are chunks of time, specified in PoS as chunks of slots. For example, we can set an epoch to be 64 slots. Epochs are important because they're basically larger time scales on which finality happens. Finality is a generally expensive thing to do, and we want to give the network enough time to see everthing and really come to consensus on what's goign to be considered final and what won't be considered final. If we don't give enough time, then it's possible for someone to violate the rules only because they haven't seen all the messages yet. If we give too much time, then we're stuck waiting forever for finality. But we still want the network to progress in the meanwhile, so the idea is that we have a certain level of security on a shorter time period and a larger level security on a larger time period.

Checkpoints happen on epochs, specifically on what are called epoch boundary blocks. Epoch boundary blocks are key blocks within an epoch. They're effectively the blocks within an epoch that are operated on in other parts of FFG. Epoch boundary blocks aren't necessarily the first block in an epoch. THey're either the block created int he first slot of an epoch OR the last known block carried over to the current epoch, itnerestingly enough. For example, see the following illustration.

### Checkpoints
Checkpoints are the poitns at which the network considers a block and all of its ancestors to be finalized. Checkppoints happen at ebbs. Checkpoints happen during special conditions called justifications are linked. The idea of justifications is that there's a concept of a source and a target. A source is a previously justified block. A target is the next block to be justified. Justifications are official once there are sufficient votes for a justification, in ETh2 case its 2/3 of the validator set. For example, see the following diagram.

Justifications aren't actually checkpoints though. We need a little more ,because there's some extra stuff about the temporaility of a checkpoint. The idea is that checkpoitns should be points taht are *really sure* that there's validity of a network. So what we say is we define a rule about when a justification means a checkpoint. What we want to achieve here is that there needs to be certain justifications within a small period of time that make a checkpoint valid. This satisfies the temporality of the system.

So as a result, we want to define a rule. Originally, we said that justifications became checkpoitns when two EBBs in a row were justified. However, this rule is a little harsh when there is some network delay. Basically it's possible that maybe someone hasn't seen that a block is justified yet, and therefore creates justifications where the soruce is n-1 instead of n for n+1. However then maybe we see that N is actually justified later on during n+2, but we don't know if N+1 is justified yet, so we want to use soruce of n. So then we have this situation where theres justifications for n-1, n+1, and n, n+2. However, obviously this is sort of a situation in which n+1 can be checkpointed because your'e allowed to have missing pieces in the justification link as long as all of the missing pieces are themsevles justified. This is a general rule, but in Eth we only look at the k+2 case because of some stuff we use later on for security.

### Slashing
Slashing is the important thing that provides security for the casper FFg system. Basically we want to punish people who try to evade the casper FFg tools. These conditions are as follows. One slashing condition is that we don't want people to try to finalize two different blocks at the same target height. So we say taht someone gets slashed if they ever publish two justifications where the target height is the same, but the actual target block is different. We also have a second rule called no spanning where you're mot allowed to jump over one of your finalization votes. Where a finalization vote is a vote of one edge ???

#### Slashing Conditions

## LMD GHOST

### Fork-Choice Rules
In any blockchcian system we need a way to determine what's the current head of the chain, mmeaning the current canonical chain. This is because it's opossible for there to be forks in the chain, and so we need to know which fork we're supposed to be following. We therefore create a "fork choice rule" that tells us which fork we're supposed to be following. This is basically an algorithm that looks at all of the forks and deterministically tells us which fork is considered the head of the blockchain.

### Longest-Chain Rule
The longst chain rule is one of the original fork choice rules. This rule is very simple, it basicall yjust says to follow whatever is the longest chain that we know of. This is simple and works well in the context of a proof of work blockchain because it takes a lot of effort to extend the chain. We usually modify this rule a little so it's not just the longest chain but the chain with the most work behind it, meaning we assume that the most money has gone into that chain.

The longest chian rule is very useful, but it does remain vulnerable to a few attacks. A key version of this attack is the selfish miner attack, which is effective ebcause of one key piece of information: the LCr does not take into account any uncle blocks! 

### GHOST

#### Ideology
GHOST stands for Greedy Heaviest Observed Subtree, and its name is very revealing. Basically, the ideology behind GHOST is to take into account the value of uncle blocks. Uncle blocks are blocks that build upon one of the blocks in the canonical chain but are not part of the canonical chain itself. So although they don't extend the length of the canonical chain, we do see that this means that the person who created the block probably thought that the parent block was part of the valid chain, or they wouldn't have built upon it!

If we ignore this, then we ignore the work that person did when working on the block. This can have some interesting effects ont he chian, but it primarily just makes attacks easier for someone who wants to build their own chain.

#### Functionality
Generalyl speaking, the way that GHOST works is that it assigns some weight to the amount of votes on uncle blocks of a chain, as well as the amount of votes on the canonical chain itself. This is different from LCR as LCR will only look at the votes (weight, work) on the canonical chain and will ignroe the uncle blocks. So the basic rules of the fork choice rule are as follows. Starting from the genesis block, we look at the *total* weight of all available forks of that block. Then we go down the tree with more weight. Rinse and repeat. Note here that the uncle blocks actually add weight to the trees!

As with any fork choice rule, it's possible to be indeterminate about which block to follow. In this case, we basically keep a list of potential head blocks, but don't actually pick the one we want yet. This is pretty much impossible for a PoW chain because it's almost impossible for two people to do exact the same amount of work. However, in PoS we have more discrete units of work ("one validator") so its' more likely.

#### GHOST vs. LCR
GHOST and LCR often agree in their results. Take the following example. We can see here that LCR and GHOST agree about which block is the head of the canonical chain, so they're the same here.

However, they also sometimes disagree! take this example. We can see here that GHOST actually picks a different chain from LCR because the added weight of the uncle blocks causes us to pick a different subtree at step X, and then we end up on a different tree entirely.

### LMD GHOST

#### GHOST in PoS
So the GHOST is fine in PoW, but we need to do some changes for PoS. Basically, the thing that makes GHOST work in PoW is that messages (blocks in this case) are expensive to create. You have to do a lot of computational work to create a valid block. However, messages in PoS are very cheap (they're just a signature). As a result, we need to modify this scheme so it doesn't just look at each message as a valid thing. Hence, latest-message driven GHOST. Instead of looking at every message, we only look at the latest message from each validator. The idea behind this is pretty simple, we basically want to prevent validators from being able to vote twice. If a validator votes for block X and then a descendent of block X, they're voting for block X twice. With this LMD system, we only count the vote once.

Besides only looking at the latest message, we also only allow validators to vote once within a single epoch. We will reject and slash validators if they try to make more than one vote in a signle epoch.

#### Saved-Message Attacks
Although validators can only make one vote in a signel epoch, they can sitll make votes in different epochs obviously. OTehrwise the system wouldn't work. So there's a problem here whereby a validator could theoretically save up their votes by refusing to publish votes for a while, and then all of a sudden publish many votes at once. This would, effectively, allow te validator to have multiple votes counted for the same block! bad bad bad. This is actaulyl the basis of selfish mining attacks, where a validator goes silent for a while and then all of a sudden broadcasts all of this work theyve done, which the fork choice takes into account. This can clearly attack simple GHOST becuase the messages would each be counted.

This attacks LMD GHOST in a weird way. Although the validator is not able to create multiple votes for the same block, since we'll just take the latest message and therefore the attacker doesn't really get anywhere with this, the validator *can* actually do some weird stuff where they cause a flip-flopping in the heaviest chain by taking their vote on one block whihc makes it the subject of the fork choice rule, then flipping to a different block, meaning people wll be confused as to which block is actually the one that's going to be finalized later on. Basically the problem is that people will be split in their justificaitons, meaning finalizaiton will take a lot longer.

In order to prevent this sort of attack or at elast limit it, we add a rule to avoid stale justificaitons. The idea here is to say that we will only look at attestations from the current epoch or the previous epoch. This is a tighter synchrony condition, but it does have the nice property that people can't really cause this super long flip-flop attack anymore.

#### Interactions with Casper FFG
So there are some interactions with FFG, basically. The core here is that FFG is responsible for finalization, but LMD GHOST is responsible for consensus of blocks that haven't been finalized yet. WHat this means is that we want to take into account finalization first and then LMD GHOST aftewards. How we do this is simple. We first want to find the last finalized block. Then we find the highest epoch justified block that is a descentent of this finalized block. Remember that justified does not mean finalized necessarily unless other conditons hold true as we discusser previously. Now once youve found this justified block, you run LMD GHOSt from here to find the head of the chain.

Let's look at an example of this. Let's say we have this structure, and this block is the last finalized block. Now we have a few other blocks taht ave been justified but not finalized because of our rules. Now we pick the highest epoch justified block, X in this case. We run LMD ghost from here and find that YYY is the head of the chain. COol.

## BLS Signatures

### Background
BLS signatures are an important part of PoS. Basically, one big problem in traditional systems is signatures. Let's first explain how signatures work at a high-level. The idea is that you have some secret piece of information (private key) with a corresponding public piece of information (public key). Your public key cannot be used to derive your private key BUT it does have a cool feature that you can use your private key and a mathematical operation to "sign" a message (create a "signature message") that can be "verified" to have corresponded to your private key by anyone with access to your public key. So long. Simplified, anyone can take your signature and your public key and see that the operation must have been performed with message,private key and therefore the person with the private key is "attesting" to the message.

One of the big problems with signatures so far is that signatures are really slow to verify. Like supah slow. This is a huge amount of overhead on any blockchain. But this becomes a big problem in the context of PoS because signatures are actually sort of equivalent to "work" in PoW. When we verify the "work" in PoW, we're doing a very fast operation (hashing). However, we have hundreds or thousands or millions of signatures to verify every epoch. These signatures are NOT fast to verify. If we just take an ETHereum signature, verifying one signature takes 2ms. Verifying 1000 signatues would take 2 seconds. Verifying 1000000 signatures would take 2000 seconds or a full 30 minutes... Just not feasible. Multithreading can help, but this is just unreal if we expect that there are 4m signatures. Also, these things are very big and we would need to store them all, which is just too much data. The full data calculation is here and it's big.

So instead, smart people at standford came up with a new signature scheme called BLS which allows for a thing caleld aggregaiton. The idea here is taht we can take multiple signatures and combine them into one signature that's faster to verify than each individual signature and it's even a constant size! no moer big bytes. The underlying math here is very complex, but generally speaking it uses a lot of the core concepts of other curve-based crypto with the addition of an interesting ocncept of "pairing" (not explained). you can ead more about it here. 

One thing to note with BLS is that although aggregation of signatures on different messages is slightly more efficient than each individual signature, the real speed-up is with signatures on the same message. YOu can imagein why this would be, information theoretically. We're sharing the same info between each signature, so there's less to do. This does mean, however, that we raelly get the advantages of BLS when everyone is signing the same information using their own private key. This means that we really prefer "well aggregated" signatreus. This is fine because we have committees that are generally going to be signing the same thing, and we add some incentivizes (later explained) for people to be signing the same thing. But yes we want good aggregaiton because otherwise we dunhave lots of expensive ass sgnatures.

## Randomness

### Understanding Randomness
Ok so basically randomness is important for many different reasons. One of the most important reasons is calling back to the thing we talked about earlier where the Proof of Stake system needs to select block proposers. There are many ways to do this, like the round-robin thing we talked about, but one of the better ways to do this is via randomness. Although round-robin is fair, it is very predictable. This is bad, for example, because it means we know far in advance who has the right to produce a block at a given time. This means we have a lot of time to DOS this producer (cause them to lose out on rewards and also mess with the network) or try to collude with them to do some bad behavior. If we aren't able to predict very far in advance, then we have less time to execute a DOS attack or collude.

However, randomness is an interesting concept in itself and there are many different ideas about it. If I ask you to pick a random number from 1-10, you're more likely to pick 7 than any other number. This obviously isn't a good "source" for randomness. There are other "sources" of randomness we can use, but there's a challenge about getting them into the blockchain. Basically, we need the blockchain itself to create the randomness. This is a really hard problem! If the randomness isn't good, then for example the producers won't be fairly picked meaning soem will get more rewards than they deserve or it will be easy to figure out in advance who will be a producer. that's bad for sure.

So we also use randomness in other places in Eth2. One thing we'll dicsuss later is the idea of "Committees" of validators who are chosen to vote (make attestations on) beacon chain blocks and also vote on shard blocks (more later). Before we talk about thsi in detail, it's important to note that a lot of Ethereum's security is based on good randomness and, if its good, then we have certain guarantees about the likelihood that a committee voting on a shard block will be all malicious. It's very unlikely in this case. However, if the randomness can be biased then it's much mroe likely for this to be the case and we have the potentail problem where invalid shard blocks could be created. there are solutions for this sort of issue (fraud proofs), but they require a rollback of the blockchain which is realy annoying.

One more place where randomness is useful is for applicaitons. Lots of different applications could have a use for randomness. Weve seen this ehavily with things like lotteries or thigns on-chain that want to give money by chance. Gambling basically. You can think of many different applicaitons that could want to use randomness. We want to make sure these applications have a good source of randomness to use.

As a result, it's important that we explain how Eth2 actually achieves this randomness becuase it's something you will have to participate in as a validator. So let's get into it.

### RANDAO
The tool that Eth2 uses to generate random numbers is called RANDAO. RANDAO is actually very simple, so let's go over the basics quickly. So let's say that we just wanted one person to generate a random number for us. Obviously that person could just cheat and pick a "random" number that benefits them in some way. Let's say it wins them the lottery in one of these on-chain games. Obviously not good enough. So we can try something else. Let's instead have a bunch of people generate random numbers and then we combine these numbers together! This is the core of RANDAO. The first idea is that we have everyone generate a random length-n bit string and we XOR the bits of everyone's random number together whch gives us a final number that no one could really predict. 

Here's an example of this:

But well here's an issue. If someone can see everyone elses number in advance, then they can just pick their own number to manipulate the result to their own benefit! Let's say everyone did their values but C picks last. They see that they can just pick XXXXX to get a favorable random number. Ths takes some grinding, but it allows them to really manipulate as much as they want.

Ok obviously this is a start bu no bueno. So now what we do is we add a mechanism so taht you dn't get to see veryones number at first. This is called a commit/reveal scheme and the idea is simple. Basiclaly, first everyone "commits" to their random number. They take the hash of their number and publish it. Once evertyone has published their hash, people start revealing one by one. Now is where it gets interesting. The attacker can basically wait until everyone else has published and they just choose whether to reveal or not. They can't change their number since they already committed to it (revealing a different number gives a different hash), but they do have the option to refuse to reveal. This means they sort of get one more "roll of the dice" and 2^n bits of bias where N is the number of nodes controlled by the attacker in the order of revealing end. So generalyl this is much better then just basic RANDAO, but it's not perfect.

But it is good enough for most purposes and we have some proofs about how much any individual attacker can actually influene the chain here.

##### VDFs
We know that RANDAO isn't perfect, but we want to see if it's possible to improve upon it. Some interesting new developments in Cryptography have come where we have the idea of VDFS or verifiable delay functions. The idea behind VDFs is that you are doing a mathematical computation that you must do in serial and cannot parallelize, but that spits out a proof that you did the computation that can be verified in a short period of time. This is sort of coming out of the idea of time-lcok crypto, except that you now have an efficient proof. 

So why do we care? well, they giev us a cool thing if we combine it with RANDAO. The idea is that instead of just waiting for the reveals Or not, we wait for the last reveal and then we use the last value as an input to a VDF. This VDF takes a long time to finish, but then spits out the actaul random number that we will use. The point here is that let's say the attacker has the last validator and can choose whether to reveal or not. However, in order to see how the reveal or not will actually influence the random number, the attacker would have to compute the VDF. This takes longer than 1 slot time, so the attacker doesn't gain any advantage by not revealing. Cool!

One issue with VDFs is basically the advantage proportion. Similar to PoW difficulty, VDFs can be tuned to take a ceratin amount of time to compute the result. This takes much less resouces than PoW of course, but the attacker could get an advantage back if they figure out how to significantly decrease the tme to compute ther esult compared to everyone else. As a result, there's a lot of work going on about getting this advantage down to a minimum, and producing a low-cost ASIC that people could buy (just one per validator!) that would ensure the VDF advantage is minimized. 

## Validators in Phase 0

### Validator Duties

#### Block Proposals

#### Attestations

### Validator Life Cycle

#### Primary Stages

##### Generating a Key Pair

##### Submitting a Deposit

##### Performing Validator Duties

##### Exiting the System

##### Submitting a Withdrawal

## The Beacon Chain

### Structure

#### Modules

#### Beacon Chain State

#### Beacon Chain Block

#### Validator State