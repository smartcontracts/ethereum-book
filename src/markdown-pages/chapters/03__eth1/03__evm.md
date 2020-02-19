---
path: "/chapters/eth1/evm"
title: "The Ethereum Virtual Machine"
status: "1"
---

## Outline
- Introduce EVM 
- Run programs in contract accounts
    - Contract accounts are actors with functions
    - Functions can be called with parameters
- Defines set of instructions that can be executed when function is called
    - Instructions can either do computation or read/write storage
    - Gives access to world state, can call other functions or other contracts
    - Events can be written but not read from within EVM
    - Everyone has the same instructions so execution is deterministic


---

```text
LEARNING GOALS:
1. Introduce the concept of transaction execution.
2. Introduce the EVM for later reference w/r/t EEs.
3. Introduce the basics theories behind transaction fees.
```

## Transaction Execution
Blockchains are given utility by the information represented in their state. However, this information would likely be relatively uninteresting if it remained permanently unchanged. Indeed, some of the most useful and exciting aspects of any blockchain are revealed by the ways that information can be both represented *and* modified within the system.

Modifications to blockchain state are carried out through *transactions*. Any time a user wishes to modify the state of the blockchain, perhaps transferring ownership of an asset to another user, they must create a transaction. 

Transactions contain the information necessary to carry out some desired change to the blockchain state. In order to properly compute the desired change, clients to a particular blockchain must understand exactly what the transaction is attempting to do. All blockchain systems therefore define rules for clients that dictate how any given transaction should be executed.

Furthermore, these rules should ensure that transactions can be executed *deterministically*, meaning that the same transaction applied to the same initial state will always produce the same output state. Without deterministic transactions, two clients may execute the same transactions and find completely different resulting states. Any such deviation would violate the primary goal of a blockchain to create a verifiable "history" of digital interactions.

## Early Execution Models
Models for transaction execution vary between blockchains. Some early blockchain systems defined a limited set of fixed transaction "types." Such a system would provide specific execution rules for each transaction type. Transactions within these blockchains would then additionally include some form of identifier so that clients could apply the correct execution rules.

A blockchain operating under this model might define, for instance, a transaction type for transfers of a digital currency of the following form:

```text
[identifier (4 bytes), sender address (20 bytes), recipient address (20 bytes), amount (32 bytes), sender signature (65 bytes)]
```

Clients would be programmed to determine from the first four bytes that this is a transfer transaction. Clients would then attempt to execute the transfer by pulling the remaining relevant information out of the transaction using the known size of each field in bytes.

This model, though simple, is fatally limiting. Any new functionality would necessarily require a change to client software, an effort often made difficult by the sheer number of users of these systems. As a result, novel or niche use-cases are difficult to implement. Developers on these systems often found that it was easier to launch an entirely new blockchain than add functionality to the existing one.

Many of these "swiss army knife" blockchains, Bitcoin included, introduced basic scripting languages that allowed users to program the conditions under which a transaction could be completed. Although this concept reduced the need for client-level changes, the stateless nature of these systems still ultimately limited their utility.

## EVM Basics
Ethereum was one of the first blockchain systems to introduce an *expressive* and *stateful* programming environment. Dubbed the "Ethereum Virtual Machine," EVM for short, this environment allowed users to deploy complex software onto Ethereum. This software could not only control the flow of transactions, but could also easily store state and *define* new assets themselves. Users could introduce a massive variety of new functionality at will, without any change to Ethereum client software.

Unlike earlier scripting models, the EVM does not attach programs to specific transactions. Instead, software is deployed as "autonomous agents," often called "smart contracts," that behave according to rules specified by their creators. Each contract has an associated "contract addresses," and can interact with other contracts or user accounts. Contract functionality is exposed as a series of "functions," which define the behavior of a contract when it receives a transaction from another account.

This model has proved extremely successful for its relative simplicity.

```text
TODO: How much more detail do we need here?
```

## EVM Transaction Fees
Transaction execution in any blockchain system requires some amount of computational effort on the part of users creating new blocks. Miners in a Proof of Work system, for instance, must execute the transactions within their blocks in order to compute the resulting state of the system. As such, it seems logical that these miners be paid a fee for the resources expended while executing these transactions.

Earlier systems with fixed transaction types or limited scripting systems could guarantee that transactions would execute in a timely manner. Transaction fees within these systems are typically more influenced by the limited space within each block rather than the computational intensity of each transaction. Ethereum's intricate EVM model, however, introduced the possibility that a transaction be exceedingly costly to execute. As a result, the EVM also introduces a fee system that charges users based on the complexity of their transaction.

Ethereum's metering system charges users for the EVM instructions in their transaction. Each EVM instruction includes a corresponding cost denominated in a unit called "gas." The total "gas cost" of a transaction is the sum of the cost of each instruction carried out during the execution of the transaction. Transactions then include a "gas price," denominated in Ether, that when multiplied by the "gas cost" gives the total fee paid to the miner for the transaction.

In order to prevent runaway transactions (an accidental infinite loop, perhaps), transactions additionally include a "gas limit." If the gas used within a transaction reaches this limit, execution is halted and the transaction is failed. However, because this still requires execution on the part of the miner, the failed transaction is still included within the block, unexecuted, and the transaction fee is rewarded to the miner.

```text
TODO: Figure out how to close this out, flow into Scaling section.
```