---
path: "/chapters/eth1-overview/evm"
title: "The Ethereum Virtual Machine"
---

```text
DRAFT STATUS: 1/5
```

Blockchains are only as useful as the set of actions that users can take in the form of transactions. Transactions, as we know, transform the state of the blockchain. Blockchain systems must somehow "execute" these transactions in a deterministic manner. This ensures that any user may execute transactions and compute the current state of the system for themselves.

All blockchain systems define a standard client behavior that explains how to execute a given transaction. Early blockchains took a "swiss army knife" approach to these specifications by defining a fixed set of transaction "types." For example, a blockchain might state that a transaction starting with 001 is a payment, and a transaction starting with 002 is a name registration. 

Though this is a logical first step, such explicit definition of possible actions proved limiting. New functionality could only be introduced by updating all clients to understand some new transaction type. As a result, novel or niche use-cases were difficult to implement. Developers found that it was often easier to launch an entirely new blockchain than add functionality to an existing one.

Ethereum was one of the first blockchain systems to introduce an expressive programming environment as an alternative to fixed transaction types. Dubbed the "Ethereum Virtual Machine," this environment allowed users to deploy complex software onto Ethereum. Users could introduce new functionality -- new transaction types -- at will, without any change to Ethereum client software.

The basis of this system is the "contract account." Unlike standard user accounts, contracts are autonomous agents that operate according to certain rules specified by their creators. These rules are defined as a series of instructions and can carry out extremely complex actions. Furthermore, unlike earlier models along the same lines, these contracts can store arbitrary state.

```text
TODO: EVM by example.
```

Just as in other blockchains, Ethereum requires miners to actually execute transactions in order to compute the final state of their blocks. However, earlier systems with fixed or limited transaction types could guarantee that transactions would execute in a timely manner. Ethereum's contract system opened up the possibility that a transaction be exceedingly costly to execute. A malicious user could even construct a contract that contained an infinite loop.

Ethereum handles this problem with a metering system that charges users proportionally to the computational and storage costs of their transactions. All Ethereum transactions must pay for "gas," a measurement unit depleted with each additional operation taking during the transaction. To limit certain attack vectors, all transactions have a maximum "gas limit." If the transaction exceeds this limit, a block producer is rewarded all of the gas cost.
