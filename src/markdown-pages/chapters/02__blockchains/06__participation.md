---
path: "/chapters/blockchains/participation"
title: "Participation"
status: "1"
---

## Outline
- Spoke mainly about people actually proposing things
    - These are called miners, proposers, validators
    - Generally required to run "full nodes" that track everything
- But obviously must have people doing actions, not necessarily be miners
    - Non-miner participants can make changes to state
    - Can run "full nodes" if desired
    - Can also run "light nodes" with reduced guarantees
- Can also be non-participant observer
    - Any? Maybe even archival.

---

So we mainly spoke about the people who are proposing changes to the system, miners. Sometimes we call them proposers or validators. In order to be a miner, you need to be able to execute any potential transactions that you receive from other users. This means you need to have the hardware to do the execution and it also means you need to have the storage space for the state that they might be executing against. Usually we call this requirement a "full node," which is basically a node that is capable of executing any potential transaction that comes in.

Of course there are going to be users that are not miners but are making transactions. Such users can use full nodes if they wish, but they often also have the option to use something called a light client. The goal of a light client is for an end user to be able to verify their own balances and check their own transactions without needing to see everyone elses transactions. This tends to come at a security cost, so it's not perfectly interchangable for full nodes. Users particularly concerned with the security of their funds will usualyl use full nodes (possibly multiple of them). Light clients are generalyl more usualy for resoruce constrainted environments where the tradeoff makes sense because a full node is not feasible. 

[explain light client protocols]

Finally we can also have what are called archival nodes, which differ slightly from full nodes. Basically full nodes are meant to be able to verify and execute any potential transaction given the current state. However, this effectively means that they can throw out any state that is no longer being used. For instance, they might choose to throw out state older than say 1000 blocks sicne they doubt that there will be a reorg that far. AS long as somene doesnt come out of nowhere with a fork that big, they are still able to successfully verify new transactions. It's nice because it reduces the total load and lets you throw away junk that isn't necessary.

Archival nodes store everything, even "stale" state. For instance, if a variable is set to X => Y => X, we could just keep a record of X in a full node, but the archival node will store the whole history. This is useful for a few things, mainly people who want to maintain a full history of everyhting that happened for themsevles or services like block explorers that need to be able to search back far in the history. Archival nodes tend to be much larger than full nodes because you can't prune the state. In Ethereum this is like a few GB to a few TB in an archival node.

---