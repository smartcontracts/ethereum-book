---
path: "/chapters/eth1/blocks"
title: "Blocks"
status: "1"
---

Blocks are effectively collections of transactions and form the "time steps" in the system. We use blocks because it's easier to dea with more transactions than individual updates. blocks result in changes to the state, but don't actually contain the state itself. One determines the current state by executing all transactions in all blocks in a process called synchronization. 

So finally we're getting into the topic of blocks. Luckily, blocks are not too difficult since we've already talked about the most important stuff within transactions, state, and state transition. All blocks are really doing is creating a record of what happened during the executon of a specific set of transactions. First we're going to explain exactly what happens when a block is produced.

The way this works is that it starts when users are making transactions and broadcasting them to the network. These transactions sit in the pool of pending transactions waiting to be included into a block. Nodes look at these transactions and pick transactions from the pool to include. The process for making a block then works like this.

First, the node looks at their current state. For each transaction, they will execute the transaction using the STF and through the EVM. This will produce a new state. They continue to do so until they reach the their block gas limit, which is set by the miner itself. Once they have executed all transactions, they will collect information about the transactions and the state. This information is:

The state trie at the end of execution, a Merkle tree of transactions executed, a Merkle tree of receipts of execution. They then add in some extra information, which is the block number, the hash of the previous block they're working on top of, the difficulty of the current block computed by the difficulty algorithm, the address of the user who receives a reward for this block. There's also an extra data field which can contain whatever the block producer wants, maybe an identifier for the producer.

Ethereum also adds a mechanism whereby ommers get paid for some work. In order to make this work, blocks include a Merkle tree of ommer hashes and the accounts that made those ommers. These accounts are also rewarded within the block itself.

The roots of trees and the other data is included in the block "header". This is essentially a smaller reference to the total data in the block, same idea as we described when we talked about Bitcoin. We will explain later how this is used in the context of light clients. The miner then has an extra field called the nonce, which is what gets changed when the miner wants to find a new potential hash. They change the nonce over and over, until they find a block hash that matches the difficulty for that block. Its worth noting that Ethereum uses a special hash function called Ethash meant to reduce the use of ASICS and make GPUS more suited for hashing, mainly by making the hashing process "memory hard" or intensive on memory, which is a big bottleneck. The general concept there is the idea that GPUs are easier to get your hands on and therefore the mining process will be more decentralized or easier to get into.

Once the miner finds a sufficient hash, they broadcast the block to the network. If anotehr block was already found, they might choose to stop working on tis block and instead just go to the next one and start the process over again. Although the header contains the short referneces, the full block data is also broadcast in something called the "body," which is just the full data that corresponds to the trees where the roots are in the header. The full body contains the full list of transactions, receipts, and ommers, everything else can be found in the header so no need to include it twice.
