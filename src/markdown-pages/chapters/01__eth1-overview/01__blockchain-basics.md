---
path: "/chapters/eth1-overview/blockchain-basics"
title: "Blockchain Basics"
status: "1"
---

We can only most effectively explore Eth2 by first understanding the core elements behind Eth1. Much of the Eth2 design draws explicitly from lessons learned throughout the lifetime of Eth1. Furthermore, as discussed later, Eth1 plays a central role in the early stages of Eth2. It's necessary, therefore, to understand certain key details about Eth1's operation.

We begin this study with an overview of the basics of any blockchain system, the same basics that underpin both Eth1 and Eth2. It's through these basic elements that blockchain systems can come to life and provide useful properties to their users.

## State
Blockchains are fundamentally designed to keep track of some sort of meaningful data. For example, if we want to create a financial system within a blockchain, we might want to track the balances of each of our users. We might also want to store information about unique digital assets, perhaps the ownership of some digital token that corresponds to an object in the physical world.

We often refer to this information, in its many forms, as the state of the blockchain. Generally speaking, the state of a blockchain defines the world of things that have happened or can happen on that blockchain. Although the specific ways in which state is stored or can change typically differ between blockchain projects, the high-level concept remains the same.

## Transactions
Transactions are operations that mutate the state of a blockchain. We usually think about transactions as functions that take an initial state along with some input data and produce an output state. 

We're most exposed to the idea of transactions in the context of finance. We create transactions every time we send money to a family member or purchase something online. Transactions within the context of a blockchain take a much more general form.

A blockchain-based financial system might store account balances within the blockchain state. In order to permit users to send funds between accounts, we need to define some sort of transaction that increases the balance of one account and decreases the balance of another. This sort of transaction is very similar to the type of financial transactions you're likely already very familiar with.

We might, however, want to allow users to perform more complex actions. For instance, users might want the ability to create a nickname for their accounts. The state of our system would now include both the nicknames and balances for each account.

Even though they aren't financial interactions like balance transfers, nickname changes will update our state. Since any change to our state needs to be carried out inside of a transaction, users need to create transactions to update their nicknames.

```text
TODO: Transactions need to be deterministic.
```

## Blocks
We might eventually run into situations in which transactions conflict with one another. In our financial system example, we might have a situation in which a user simultaneously tries to send their full balance to two different accounts. One of these transactions should fail, but which? We need some way to figure out the order in which transactions should be executed.

```text
TODO: Add more detail here about needing to reference a previous state to operate on.
```

Blocks give us the ability to order transactions. Blocks are, effectively, bundles of transactions. Each transaction has a specific position, or index, within a block that corresponds its execution order. 

```text
TODO: Expand on why blocks fix issue with referencing previous state.
```

We form our eponymous block "chains" because blocks themselves need to be ordered. Each block of transactions must always reference some previous "parent" block. The initial state on which transactions within a block operate is based on the output state of the parent block. 

Of course, our blockchain must have some first block that doesn't reference a parent block. We usually refer to this as the "genesis" block.
