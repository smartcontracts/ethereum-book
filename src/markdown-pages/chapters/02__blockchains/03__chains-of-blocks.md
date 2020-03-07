---
path: "/chapters/blockchains/chains-of-blocks"
title: "Chains of Blocks"
status: "0"
---

Proof-of-Work provided researchers with a useful building block with which digital money systems could be constructed. At its core, the mechanism made it possible for people to prove that they'd expended a given amount of resources in the form of the electricity and wear necessary to find a given partial collision. Moreover, this proof could be easily verified without the need to communicate with the user who created the proof.

Additionally, the ability for someone to generate such a proof was linked directly to their access to adequate physical resources. That users weren't required to register with any specific governing body was strongly in alignment with the early decentralized mentality. Individuals could produce these proofs as long as they were participants of some society willing to secure their ownership of the necessary machinery. If Proof-of-Work could somehow act as a replacement for "voting power" in a fault-tolerant system, it would satisfy most of the qualities of the "ideal" decentralized digital currency.

Fault-tolerant systems up to this point relied on the existence of some "leader" or "proposer" responsible for presenting new transactions to the network. However, designated "leaders" were in clearly conflict with the concept of decentralization. Early models for decentralized currencies therefore rejected the notion of a single "proposer." Instead, any participant could propose new transactions and broadcast them to other nodes on the network.

Existing fault-tolerant systems also relied on a voting process in which nodes would come to agreement about the set and ordering of all transactions. Here, Proof-of-Work would find its place as a replacement for the "voting power" of each node. Votes would reference the result of some previous update to the system and additionally reference some new update. For instance, if each update corresponds to a single transaction, the vote might contain the hash of the previous update and the hash of the current new transaction. Nodes would attach "voting power" to these votes in the form of Proof-of-Work, where the input to the Proof-of-Work function would be the vote itself and an extra field, called a nonce, that could be modified until a desired partial collision was found.

```
TODO: Clean up the above paragraph, add diagrams, explain genesis blocks, tying hash power to specific updates, rewards.
```

Unfortunately, earlier voting models from research into Byzantine fault tolerance could not be easily adapted to make use of Proof-of-Work. Most BFT systems made use of a series of "voting rounds" in which decisions on particular transactions could be made. Rounds were feasible in a context in which the nodes, and therefore the total number of possible votes, were known in advance. Nodes could determine that they'd received some threshold percentage of votes during a round because they were aware of the number of voting nodes. Once some desired threshold, `2/3rds` for BFT systems, was reached, the nodes could be sure that a decision was made and could move on to the next transaction.

```
TODO: Clean up the above paragraph, again.
```

Under a model in which voting power is linked to Proof-of-Work, one cannot be sure that a certain percentage of total votes has been cast during a given period of time. In theory, the maximum number of votes is only bounded by the total physical resources available to all possible participants.

```
TODO: Continue, got tired.
```

---

Bad draft for "Chains of Blocks" section

Okay so we have Proof-of-Work as a primitive that we can use to essentially calculate the amount of economic value someone invested in order to generate a given value. The way that this primitive works is as follows. Basically, let's define a metric for hash values. Our metric will be that a lower hash value in decimal is more work done. So for instance, < 0x0001 would be more work done than < 0x001 since the first has three leading zeroes and the second only has two. On average, it would take more work to find a value that results in the first hash than the second. 

Once again, the probability of finding any value in the first digit is 1. The probability of finding < F is 15/16. The probability of finding 0 is 1/16. So we can estimate the number of hashes required to find any given hash value as follows. For each leading zero we multiply by 1/16. After the first nonzero value, you use this formula where you're taking the probability of getting something lower times the probability that you didn't get something lower in a previous digit, so it disappears pretty fast. The exact formula is:

todo

Using this formula, you can calculate the exact number of hashes, on average, that someone would need to execute to find a value less than the given value. From that, you can figure out the amount of resources required to get that hash value by looking at the cost per hash, where the cost comes from stuff like electricity, the cost of the hardware, any sort of labor costs, land etc etc. Usually there is some average cost per hash you can look at online.

What this means is that we can get a sense of the "value" of a hash through the hash itself. General rule of thumb is that lower hash value means higher cost to produce the hash. Again the reason we use this model at all is so that we can replace the one node, one vote system that fails in the face of sybil attacks. In a typical BFT system like we explored, nodes will attach signatures to their messages which give their message a vote value of 1. Within our Proof-of-Work system, we want nodes to attach proof of work hashes to messages, where the vote value of the message depends on the value of the hash.

One thing to note is that we want a way to tie the proof of work to the specific message. If we did not have this sort of tie-in, then someone could do a bunch of work once and attach the same work to multiple messages, even though they didn't do work for each individual message. It's the same idea as the hashcash spam prevention mechanism, each email had to have its own proof of work stamp and the same stamp couldn't be used for multiple messages. We want each vote to correspond to some work being done, and using the same vote twice means no additional work is being done. 

So how we tie the work into the message itself is that we require the work to be done on top of the message. Proof of Work as we mentioned functions by having the user take the hash of some values until they find a low hash. We can require that part of the thing being hashed is the message itself. Of course if it were only the message, then the hash would always be the same because the message stays constant. We need to add some variable part to the hash input that allows the user to find new values. We call this the "nonce," and it's just an extra piece of data that can be varied in order to generate new hash results.

So, for instance, we could do a system in which the input to the hash function looks like hash input = message + nonce. When users want to create a vote for a message, they would do something like message:0, message:1, etc etc. until they find a value they're happy with. This ties it to the message because one would "verify" the work by checking that hash(message, nonce) is equal to the hash the user provided. The user cannot cheat and try to use the same work for multiple messages because hash(message2, nonce) would not be equal to the work and the work would be rejected.

We now have the way in which users in the system produce votes for particular messages. Essentially our system right now can be though of as identical to a traditional BFT system except that votes are not signatures but the work as we just described. One big different however is that, if you remember, traditional BFT systems typically had one node responsible for sending potential updates to all nodes in the system. We called this node the "leader" or "proposer," and it would be identified in advance so that nodes could know where to look for new transasctions to vote on. When end-users made updates to the system, they would go through the leader who would then broadcast them to other nodes.

todo: diagram

Here, we use a system where anyone can broadcast requested changes to the network. If a user wants to add a new transaction, they create it and send it to some nodes, who relay the transaction to other nodes, and so on. In an ideal world, this means that all nodes see a shared list of transactions that are waiting to be added to the system. We tend to call this the "pool" of transactions.

todo: diagram

Of course in reality we have network latency and we don't have a perfect peer-to-peer network. So what happens is that each node sees their own list of pending transactions depending on who they're connected to and whether a given transaction has propagated around the network. It might even be that a client is just sending their transactions to one node and that node isn't sharing them for whatever reason. It doesn't matter. The point is, what ends up happening is that we have a network where nodes have their own view of pending transactions, as shown in this diagram:

todo: diagram

The way that this system actually processes transactions is as follows. So nodes want things to progress, they want to add new transactions to the shared list of total transactions. Let's look at a single node at the very start of the protocol, where the state is at the genesis state and all nodes have the same first state. The node sees some transactions in the pool and would like to vote for a particular transaction to be added to the shared list.

todo: diagram

If you remember our section on state, transactions, and stfs, you'll remember that the stf takes the old state and a transaction as an input. So in order for people to know what to do with a transaction, they need to know which old state the transaction is operating on. So what the node does is they execute the stf for themselves using the old state (genesis in this case) and find out the new state. The thing they're voting on isn't the specific transaction but the transaction + the old state, since the old state might influence what the transaction does. So the message essentially becomes the old state + the transaction. Since the old state might be large, we don't actually reference the old state explicitly but use a reference to it, usually a hash of that state. 

Now that they have the message, they want to create voting power for the message. In order to figure out exactly how much resoruces the node wants to expend voting for the message, we have to look at the system of rewards in place for the node for doing that work. Nodes aren't going to do any work for free, that would just be burning resources. For now we will just imagine that the way this works is that along with the transaction, the message will also include some node identifier so that the result of the STF on the state will increase the node's balance by some reward amount. 

As far as the reward value goes, this is a complex subject. However, it's reasonable to think of the reward as being proportional to the value of the transaction itself. We're going to talk about this a little bit more at a later point in time. For now, though, it's ok to imagine the reward as increasing when the transaction is more important, and less valuable when the transaction is less important. The idea here being that if the user doesn't really care about the transaction going into the system, then the node's work should be spent on a different transaction, so we want to reward the other transaction more in order to incentivize this behavior. A little abstract but don't worry about it for now.

Well, let's say that a node gets a single low value transaction. They see that they're going to receive a reward that would cover a few seconds of hashing cost. Since they don't want to lose money, they're only going to do as much work as the reward covers at most. So they'll do a few seconds of computational work and then pick whichever value they found that was lowest. Now they broadcast the message and work hash to the network and wait.

We looked at this from the perspective of a single node. In order to see what happens next, we must zoom out a little bit. Let's imagine a situation in which all nodes were in this exact same scenario, except they all got different low-value transactions. They all did approximately the same amount of computational work and sent out their vote after a few seconds. We picked a few seconds for a very specific reason, it's approximately on the order of network latency on some networks. Basically, it takes time for stuff to move around a network. When nodes all send out their messages at approximately the same time, other nodes are going to see lots of different messages from lots of different nodes. 

todo: diagram

Looking at this from the perspective of an indivdual node again, we see lots of potential updates against the same initial state.

todo: diagram

Since the updates are dependent on the state they operated on, we need to figure out which update we're going keep working on. When this happens, nodes are seeing what's called a "fork" in the network. We have messages that are incompatible with one another, so the node can't accept more than one of them. We need to resolve these situations with some sort of rules that nodes take to figure out which node to accept as the "correct" one. We're going to explore these fork choice rules in more detail in the next chapter. However, we want to generally reduce these sort of accidental forks. 

Basically the way that we reduce these forks is by changing the logic that people use to figure out how much work to do. Mainly, we want to reduce the odds that two nodes send out messages at approximately the same time. The way that this is done typically is we introduce a "target" hash value that a message must have before it will be accepted by other nodes. This turns the hash game from do as much work until reward value hit, to do as much work until target value found. The odds of any given node finding a hash at any point in time is equal to their hash power divided by the amount of hash power necessary to find the target hash. The odds of two nodes finding a value at around the same time depends on the target hash. We can actually look at these odds through the birthday problem.

todo: chart for this

Anyway, the lower the target hash compared to the total hash power available to nodes, the longer it will take for someone to find something lower than the target hash. Essentially, this means that there's more time between updates. Since it takes longer to find a target hash, users are expending more resources in order to find the hash. Once again, nodes aren't going to do work for free, so they will expect a reward for finding the target hash. And also again, we can think of rewards as generally proportional to the value of transactions. Therefore, in order to make such a system work, we either need to increase the value of the transactions or increase the total number of transactions.

Usually, the second choice is easiest. Instead of having nodes create votes on individual transactions, they'll combine transactions together and create votes on all of them at the same time. We call this a "block" of transactions. If you've ever wondered why we have blocks, that's pretty much why. They're basically necessary in order to reduce the probability of accidental forks happening all the time. 

todo: diagram

The process of voting with blocks is essentially the same as with individual tranasctions. Nodes pick a list of transactions to add to the system and execute them against some older state, which is always the result of some previous update. They then make a message out of a reference to the older state plus the list of transactions and do proof of work on top of that. Since references to older state are actually references to blocks, this means that blocks have links to the blocks that came before them (except the genesis block). And that's where we get the name of "blockchains"!

todo: diagram

It's worth noting that blocks don't actually solve forks. Really, they only reduce the chance of getting accidental forks. It's still entirely possible to get accidental forks just on pure probability. It'll happen eventually, and it does happen quite often in practice. Forks are actually a fundamental thing in Proof of Work chains, and there's no way to really eliminate them entirely. Let's look at why this is the case.

Back in BFT land, we were able to make permanent decisions about things. The way this worked is that time was split into rounds, where during each round an update would be proposed and voted on. Since the total number of nodes in the system was known to all other nodes, there was a threshold at which nodes could say a decision was permanent, namely 2/3rds of the total voting power. Once a node saw that 2/3rds other nodes had voted for a particular message, they would put that message into their version of the chain forever.

In PoW, it's impossible to know the total amount of voting power by design. At any point in time, someone can always come in with more hash power and now the total hash power has increased. You have no way to tell that 2/3rds of hash power have voted on a particular subject. What makes this problem even more difficult is that time is an issue. You don't only have to worry about hash power from now, you also need to consider hash power in the future. Basically, someone could publish a block that competes with some block far in the past. You only receive that block now, but they've created the the block with a fake timestamp that seems like it was created in the past. You might want to reject the block because you're getting it so late, but there's no way to distinguish this from someone who did actually publish the block in the past and network latency was just so slow that you never got the message until now.

Basically, you need to consider the block now, which means that the result of a particular vote can always be influenced. There's no way to get "absolute" certainty that a given block will always and forever remain part of the canonical chain. However, as we'll see next, there are ways to get "economic" certainty, through which you can be convinced that a given block will not be removed from the canonical chain unless someone is willing to expend X resources to do so. So let's see how that works!
