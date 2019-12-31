---
path: "/chapters/phase0"
title: "Eth2: Phase 0"
---

## Proof of Stake in Eth2

### Proof of Work: The Incumbent
Blockchains are, fundamentally, consensus mechanisms in which participants in the consensus process come to agreement about a canonical ordered series of transaction blocks. Although there are many different ways in which participants can actually come to an agreement about these blocks, blockchains consensus mechanisms tend to fall into certain classes. Most early blockchain protocols made use of "Proof of Work" consensus mechanisms. Proof of Work is, at its core, based on the concept that the weight of one's voting power in the consensus process is based on the extent of one's expenditure of physical computational resources. Proof of Work systems generally state that a new block is only considered valid if a certain amount of computational effort has been expended in the block's creation. Practically, this typically means that the hash of the new block is less than or equal to a given target value. As secure hash functions are computationally infeasible to reverse, this means that a block producer is required to grind hashes until the target hash is reached.

Proof of Work has several obvious flaws. It clearly relies on the expenditure of precious resources in the form of the energy required to operate hash-computing machines. Furthermore, efficient hash-computing machinery can be a huge advantage in a Proof of Work system. Unfortunately, the ability for a party to create or acquire this machinery is highly dependent on the resources and knowledge available to that party. As a result, these systems tend toward centralization. As this section is not intended to act as a complete argument against Proof of Work consensus protocols, readers interested in understanding the various arguments for (and against) Proof of Work should direct their attention to the following articles.

### Proof of Stake: The Alternative
Proof of Stake has evolved as a proposed alternative to Proof of Work. In short, Proof of Stake replaces the computation-based voting weight with a weight based purely on the value of economic resources placed as a bond, or stake, into the system. This model theoretically follows the same ideology of Proof of Work, but eschews wasteful computation in favor of a more direct representation of interest in the mechanism. Proof of Stake systems attempt to re-create the properties of Proof of Work by randomly assigning the right to produce blocks based on the percentage of assets stake in the system.

#### Coming to Consensus
Although Proof of Stake is theoretically similar to Proof of Work, Proof of Stake introduces several interesting problems. Many of these problems arise from the increase in subjectivity brought by the lack of direct connection to the physical world via hash-computing machinery. One such problem is revealed when we consider how validators should react to forks in the blockchain. In a Proof of Work system, participants cannot split their computational power over multiple possible forks without also proportionally splitting their chances to find the next target hash. However, in a Proof of Stake system, participants can easily create votes for two different forks without expending significant resources. If this behavior is permitted, then Proof of Stake validators will be incentivized to vote on every fork as to avoid losing out on rewards in the case that some unexpected fork becomes the "canonical" chain.

We often refer to this interesting theoretical result as the "nothing-at-stake" problem, and it necessitates much of the early stages of Eth2. We begin the next section with a deep exploration of Ethereum's proposed solution to this problem, Casper FFG. Casper FFG introduces the concept of "epochs," fixed periods of time, that contain "boundary blocks" which can become "finalized" and therefore absolutely canonical and irreversible. Validators that attempt to fork out "finalized" blocks are heavily punished and, therefore, no longer have "nothing-at-stake."

Although Casper FFG addresses a key theoretical barrier for Proof of Stake systems, it does not specify a consensus mechanism for blocks within a particular epoch. We therefore spend a section discussing LMD GHOST, an algorithm used by validators to determine the "correct" chain in the short-term and eventually the "final" chain in the long-term.

#### Moving Toward the Future
Casper FFG and LMD GHOST are both used by validators to make decisions about the current set of canonical blocks. However, neither mechanism actually defines how blocks are produced. We therefore conclude this section with an introduction to the Eth2 block proposal mechanism and the various cryptographic primitives upon which it relies. We explore this mechanism in more detail in later sections, but provide a strong basic intuition. For simplicity, we do not dive deeply into the underlying mathematics behind the cryptographic primitives but instead provide resources for interested readers to explore the constructions on their own.

### Casper FFG

#### Background
In a Proof of Stake system, we generally want some mechanism to figure out which blocks are part of the canonical set of blocks. This is important because otherwise we have an almost infinite ability for people to create competing chains. This really comes down to a problem called the "nothing-at-stake" problem. What this means is that if validators can sign on forks nilly-willy, then they will always sign on forks because they don't want to ever be in a situation where they won't sign on the head chain. They're incentivized effectively to always be forking, which isnt good. Instead, we want a system by which validators actually want to stick with one chain over another and are punished heavily if they don't.

Casper FFG (Friendly Finality Gadget) is a system that achieves exactly this. In effect, it adds the idea of block "finalization" whereby if a block gets a certain number of votes, it is "finalized" and it, and its ancestors, cannot be changed and its ancestors cannot be built upon. This removes the "nothing at stake" problem because you will get actively punished if you decide to try to fork beyond this point. Of course, we also want to prevent users from being incentivized to fork heavily when things aren't finalized, so we'll talk about that later.

Generally speaking, Casper FFG functions by breaking down a blockchain into a series of "epochs," where an epoch is a given number of blocks. However, in PoS, we need to add the addition of a concept of "slots," instead of blocks. The idea here is that each epoch has a special block which collects votes because votes for a block also implicitly count as votes for a previous block. The high-level idea is that if enough validators are voting for a specific block, then that block should be considered justified. And then additionally, if multiple lbocks are justified in a row, then the block will be considered finalized.

The reason why we don't jsut have finalization being dependent on a single justification is because it could then be possible for two different forks to be finalized. Basically, we want the property that you are able to switch your vote if you beleive other people are on adiferent chain or something. Idk exactly what the deal is here, research it more. But generally speaking, we want people to be *extra sure* about finality, and we also want finality to have temporal limits, because the validator set can change. Finality should really be limited to a specific validator set. If we make it possible for finality to happen over a very long time, then it's easier to attack.

#### Slots
So the first thing we introduce in the world of Proof of Stake is the concept of slots. You can think of slots a lot like the concept of block height in a traditional block chain, except slots do NOT necessarily have to contain a block. Its possible for a slot to be skipped. Slots are fixed periods of time and are offset from the genesis tiem of the blockchain. For example, let's say the genesis time of the blockchain is "zero" and each slot is a period of 6 seconds. Therefore, the 100th slot would start exactly 600 seconds after the genesis time of the blockchain. Slots are important because in a Proof of Stake system, instead of a lottery where anyone might be the next person to create a block given by some external device, we now need a sort of internal leader election system that says "you are responsible for generating the next block." However, if we simply say this, then the protocol would halt as soon as that person is offline. As a result, we want a time-based mechanism which basically says that you are responsibile for cerating a block during a given period of time and allows the network to skip you if you do not publish a block during that time.

This does sort of mean that you need to be synchronzied with other people as to what time it is on the network right now. Otherwise, you won't publish your block on time. There is some leeway to this, but not a lot.

#### Blocks
Blocks are just like blocks on any other system. We're goign to talk about the actual content of the blocks in a later section, but here we'll just assume its some arbitrary thing witha rbitrary validity rules. It really doesn't matter.

#### Epochs
Epochs are the important part in FFG. Epochs are chunks of time, specified in PoS as chunks of slots. For example, we can set an epoch to be 64 slots. Epochs are important because they're basically larger time scales on which finality happens. Finality is a generally expensive thing to do, and we want to give the network enough time to see everthing and really come to consensus on what's goign to be considered final and what won't be considered final. If we don't give enough time, then it's possible for someone to violate the rules only because they haven't seen all the messages yet. If we give too much time, then we're stuck waiting forever for finality. But we still want the network to progress in the meanwhile, so the idea is that we have a certain level of security on a shorter time period and a larger level security on a larger time period.

Checkpoints happen on epochs, specifically on what are called epoch boundary blocks. Epoch boundary blocks are key blocks within an epoch. They're effectively the blocks within an epoch that are operated on in other parts of FFG. Epoch boundary blocks aren't necessarily the first block in an epoch. THey're either the block created int he first slot of an epoch OR the last known block carried over to the current epoch, itnerestingly enough. For example, see the following illustration.

#### Checkpoints
Checkpoints are the poitns at which the network considers a block and all of its ancestors to be finalized. Checkppoints happen at ebbs. Checkpoints happen during special conditions called justifications are linked. The idea of justifications is that there's a concept of a source and a target. A source is a previously justified block. A target is the next block to be justified. Justifications are official once there are sufficient votes for a justification, in ETh2 case its 2/3 of the validator set. For example, see the following diagram.

Justifications aren't actually checkpoints though. We need a little more ,because there's some extra stuff about the temporaility of a checkpoint. The idea is that checkpoitns should be points taht are *really sure* that there's validity of a network. So what we say is we define a rule about when a justification means a checkpoint. What we want to achieve here is that there needs to be certain justifications within a small period of time that make a checkpoint valid. This satisfies the temporality of the system.

So as a result, we want to define a rule. Originally, we said that justifications became checkpoitns when two EBBs in a row were justified. However, this rule is a little harsh when there is some network delay. Basically it's possible that maybe someone hasn't seen that a block is justified yet, and therefore creates justifications where the soruce is n-1 instead of n for n+1. However then maybe we see that N is actually justified later on during n+2, but we don't know if N+1 is justified yet, so we want to use soruce of n. So then we have this situation where theres justifications for n-1, n+1, and n, n+2. However, obviously this is sort of a situation in which n+1 can be checkpointed because your'e allowed to have missing pieces in the justification link as long as all of the missing pieces are themsevles justified. This is a general rule, but in Eth we only look at the k+2 case because of some stuff we use later on for security.

#### Slashing
Slashing is the important thing that provides security for the casper FFg system. Basically we want to punish people who try to evade the casper FFg tools. These conditions are as follows. One slashing condition is that we don't want people to try to finalize two different blocks at the same target height. So we say taht someone gets slashed if they ever publish two justifications where the target height is the same, but the actual target block is different. We also have a second rule called no spanning where you're mot allowed to jump over one of your finalization votes. Where a finalization vote is a vote of one edge ???

##### Slashing Conditions

### LMD GHOST

#### Fork-Choice Rules
In any blockchcian system we need a way to determine what's the current head of the chain, mmeaning the current canonical chain. This is because it's opossible for there to be forks in the chain, and so we need to know which fork we're supposed to be following. We therefore create a "fork choice rule" that tells us which fork we're supposed to be following. This is basically an algorithm that looks at all of the forks and deterministically tells us which fork is considered the head of the blockchain.

#### Longest-Chain Rule
The longst chain rule is one of the original fork choice rules. This rule is very simple, it basicall yjust says to follow whatever is the longest chain that we know of. This is simple and works well in the context of a proof of work blockchain because it takes a lot of effort to extend the chain. We usually modify this rule a little so it's not just the longest chain but the chain with the most work behind it, meaning we assume that the most money has gone into that chain.

The longest chian rule is very useful, but it does remain vulnerable to a few attacks. A key version of this attack is the selfish miner attack, which is effective ebcause of one key piece of information: the LCr does not take into account any uncle blocks! 

#### GHOST

##### Ideology
GHOST stands for Greedy Heaviest Observed Subtree, and its name is very revealing. Basically, the ideology behind GHOST is to take into account the value of uncle blocks. Uncle blocks are blocks that build upon one of the blocks in the canonical chain but are not part of the canonical chain itself. So although they don't extend the length of the canonical chain, we do see that this means that the person who created the block probably thought that the parent block was part of the valid chain, or they wouldn't have built upon it!

If we ignore this, then we ignore the work that person did when working on the block. This can have some interesting effects ont he chian, but it primarily just makes attacks easier for someone who wants to build their own chain.

##### Functionality
Generalyl speaking, the way that GHOST works is that it assigns some weight to the amount of votes on uncle blocks of a chain, as well as the amount of votes on the canonical chain itself. This is different from LCR as LCR will only look at the votes (weight, work) on the canonical chain and will ignroe the uncle blocks. So the basic rules of the fork choice rule are as follows. Starting from the genesis block, we look at the *total* weight of all available forks of that block. Then we go down the tree with more weight. Rinse and repeat. Note here that the uncle blocks actually add weight to the trees!

As with any fork choice rule, it's possible to be indeterminate about which block to follow. In this case, we basically keep a list of potential head blocks, but don't actually pick the one we want yet. This is pretty much impossible for a PoW chain because it's almost impossible for two people to do exact the same amount of work. However, in PoS we have more discrete units of work ("one validator") so its' more likely.

##### GHOST vs. LCR
GHOST and LCR often agree in their results. Take the following example. We can see here that LCR and GHOST agree about which block is the head of the canonical chain, so they're the same here.

However, they also sometimes disagree! take this example. We can see here that GHOST actually picks a different chain from LCR because the added weight of the uncle blocks causes us to pick a different subtree at step X, and then we end up on a different tree entirely.

#### LMD GHOST

##### GHOST in PoS
So the GHOST is fine in PoW, but we need to do some changes for PoS. Basically, the thing that makes GHOST work in PoW is that messages (blocks in this case) are expensive to create. You have to do a lot of computational work to create a valid block. However, messages in PoS are very cheap (they're just a signature). As a result, we need to modify this scheme so it doesn't just look at each message as a valid thing. Hence, latest-message driven GHOST. Instead of looking at every message, we only look at the latest message from each validator. The idea behind this is pretty simple, we basically want to prevent validators from being able to vote twice. If a validator votes for block X and then a descendent of block X, they're voting for block X twice. With this LMD system, we only count the vote once.

Besides only looking at the latest message, we also only allow validators to vote once within a single epoch. We will reject and slash validators if they try to make more than one vote in a signle epoch.

##### Saved-Message Attacks
Although validators can only make one vote in a signel epoch, they can sitll make votes in different epochs obviously. OTehrwise the system wouldn't work. So there's a problem here whereby a validator could theoretically save up their votes by refusing to publish votes for a while, and then all of a sudden publish many votes at once. This would, effectively, allow te validator to have multiple votes counted for the same block! bad bad bad. This is actaulyl the basis of selfish mining attacks, where a validator goes silent for a while and then all of a sudden broadcasts all of this work theyve done, which the fork choice takes into account. This can clearly attack simple GHOST becuase the messages would each be counted.

This attacks LMD GHOST in a weird way. Although the validator is not able to create multiple votes for the same block, since we'll just take the latest message and therefore the attacker doesn't really get anywhere with this, the validator *can* actually do some weird stuff where they cause a flip-flopping in the heaviest chain by taking their vote on one block whihc makes it the subject of the fork choice rule, then flipping to a different block, meaning people wll be confused as to which block is actually the one that's going to be finalized later on. Basically the problem is that people will be split in their justificaitons, meaning finalizaiton will take a lot longer.

In order to prevent this sort of attack or at elast limit it, we add a rule to avoid stale justificaitons. The idea here is to say that we will only look at attestations from the current epoch or the previous epoch. This is a tighter synchrony condition, but it does have the nice property that people can't really cause this super long flip-flop attack anymore.

##### Interactions with Casper FFG
So there are some interactions with FFG, basically. The core here is that FFG is responsible for finalization, but LMD GHOST is responsible for consensus of blocks that haven't been finalized yet. WHat this means is that we want to take into account finalization first and then LMD GHOST aftewards. How we do this is simple. We first want to find the last finalized block. Then we find the highest epoch justified block that is a descentent of this finalized block. Remember that justified does not mean finalized necessarily unless other conditons hold true as we discusser previously. Now once youve found this justified block, you run LMD GHOSt from here to find the head of the chain.

Let's look at an example of this. Let's say we have this structure, and this block is the last finalized block. Now we have a few other blocks taht ave been justified but not finalized because of our rules. Now we pick the highest epoch justified block, X in this case. We run LMD ghost from here and find that YYY is the head of the chain. COol.

### Cryptographic Tools
PoS is a really complex system, and we need to use some interesting cryptographic techniques for it to really work in practice. Here we're going to discuss and explain (though in not too much depth) the basics of these systems, primarily BLS signatures and Randomness beacons. 

#### BLS Signatures

##### Background
BLS signatures are an important part of PoS. Basically, one big problem in traditional systems is signatures. Let's first explain how signatures work at a high-level. The idea is that you have some secret piece of information (private key) with a corresponding public piece of information (public key). Your public key cannot be used to derive your private key BUT it does have a cool feature that you can use your private key and a mathematical operation to "sign" a message (create a "signature message") that can be "verified" to have corresponded to your private key by anyone with access to your public key. So long. Simplified, anyone can take your signature and your public key and see that the operation must have been performed with message,private key and therefore the person with the private key is "attesting" to the message.

One of the big problems with signatures so far is that signatures are really slow to verify. Like supah slow. This is a huge amount of overhead on any blockchain. But this becomes a big problem in the context of PoS because signatures are actually sort of equivalent to "work" in PoW. When we verify the "work" in PoW, we're doing a very fast operation (hashing). However, we have hundreds or thousands or millions of signatures to verify every epoch. These signatures are NOT fast to verify. If we just take an ETHereum signature, verifying one signature takes 2ms. Verifying 1000 signatues would take 2 seconds. Verifying 1000000 signatures would take 2000 seconds or a full 30 minutes... Just not feasible. Multithreading can help, but this is just unreal if we expect that there are 4m signatures. Also, these things are very big and we would need to store them all, which is just too much data. The full data calculation is here and it's big.

So instead, smart people at standford came up with a new signature scheme called BLS which allows for a thing caleld aggregaiton. The idea here is taht we can take multiple signatures and combine them into one signature that's faster to verify than each individual signature and it's even a constant size! no moer big bytes. The underlying math here is very complex, but generally speaking it uses a lot of the core concepts of other curve-based crypto with the addition of an interesting ocncept of "pairing" (not explained). you can ead more about it here. 

One thing to note with BLS is that although aggregation of signatures on different messages is slightly more efficient than each individual signature, the real speed-up is with signatures on the same message. YOu can imagein why this would be, information theoretically. We're sharing the same info between each signature, so there's less to do. This does mean, however, that we raelly get the advantages of BLS when everyone is signing the same information using their own private key. This means that we really prefer "well aggregated" signatreus. This is fine because we have committees that are generally going to be signing the same thing, and we add some incentivizes (later explained) for people to be signing the same thing. But yes we want good aggregaiton because otherwise we dunhave lots of expensive ass sgnatures.

#### Randomness

##### Understanding Randomness

##### RANDAO

##### VDFs

## Validators

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

## Beacon Chain

### Structure

#### Modules

#### Beacon Chain State

#### Beacon Chain Block

#### Validator State