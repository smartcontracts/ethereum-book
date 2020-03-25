---
path: "/chapters/eth1/transactions"
title: "Transactions"
status: "1"
---

As shown in our analysis of blockchain systems in general, the next component after a system's state model is its transaction structure. Consensus mechanisms come to agreement about a specific ordered set of these transactions. Clients can then determine the current state of a system by passing each transaction, in order, through some specified state transition function. We examine Eth1's state transition function in detail throughout the next section. However, we must first understand the structure and purpose of Eth1's transactions. Here, we explore Eth1's various transaction types, the contents of each transaction, and the basic steps necessary to generate a valid transaction.

Eth1 represents state as a set of accounts that correspond to, and thereby "own," an ETH balance and some arbitrary storage space. All transactions in Eth1 are sent "from" one account "to" another, both of which must be specified within the transaction itself. Transactions sent from a user account are only valid if they include a signature over the transaction created with the sending account's private key. Transactions may be sent by contract accounts, but only during the course of the execution of some transaction from a user account. These contract account transactions do not include signatures as they can only be created when a contracts code permits. These fields form the basic contents of any transaction.

```
NOTE: Forgot to add nonce and fee fields to the above.
NOTE: Change *all* must contain recipient to most w/ exceptions.
```

Eth1 allows for three primary types of transactions. Simple ETH transfers allow one account to send ETH to another. These transactions only include the fields defined above:

```
TODO: Simple ETH transfer tx structure.
```

Contract deployment transactions make it possible for an account to upload a new contract to Eth1. Contract deployments are identified by the lack of a recipient account address and are the only transactions that do not include the recipient field. Code for the new contract is attached in a "calldata" field. Calldata may additionally contain extra code and input data to be executed as soon as the contract has been deployed. Lastly, contract deployment transactions can include an ETH balance to be transferred to the new contract from the sending account. Altogether, these transactions take the following form:

```
TODO: Contract deployment tx structure.
```

The third and final transaction type defined by Eth1 is the "contract interaction." This transaction type allows accounts to trigger the code associated with a given contract. Contract interactions contain all basic transaction information, including an optional ETH balance to be sent to the target contract. Like contract deployments contract interactions contain a calldata field that may be used to provide the contract with relevant input data. Contract code often uses this calldata to determine the exact action the sending account wishes to take. A complete contract interaction transaction appears as follows:

```
TODO: Contract interaction tx structure.
```

```
NOTE: "Gas" references below to be edited into second paragraph of this section.
```

We've alluded to the fact that transactions must include a fee in the form of "gas." We discuss the exact calculation for this fee in the following section. In a nutshell, gas is a virtual currency used to pay for any transaction. All transactions must contain a base amount of gas (currently 21,000 gas) and a fixed amount of gas depending on the size of calldata in bytes (currently 68 gas per byte). Transactions then must additionally include an amount of gas generally proportional to the resource expenditure necessary for the transaction's execution. So that gas values can remain fixed in the presence of price fluctuations, transactions specify a "gas price," the amount in ETH to be paid per unit gas. This mechanism generally guarantees that nodes who mine a transaction are compensated according to the cost of doing so.

```
NOTE: Not sure whether to include receipt info (below) here or in next section.
```

Once executed and included within a block, transactions are paired with a "transaction receipt." Transaction receipts act as concise summaries of the impact of a transaction on the system. They include, for instance, a status code that signals whether or not a transaction was completed successfully. Clients will often use information within the receipt to make a determination about any additional actions to take. A full receipt contains the following fields:

```
TODO: Receipt structure.
```

Most of these fields are likely self explanatory. However, we have yet to cover the concept of "logs." Essentially, a log is a piece of information that can be attached to a transaction receipt by a contract account. Logs are typically employed to relay some useful data about the effect or events of a transaction without directly manipulating the storage of a contract. For instance, a contract may generate a log to efficiently signal that an ETH balance was transferred out of the contract. Logs may alternatively be called events in some circles.

All logs contain basic identifying information, including the address of the contract that generated the log and references to the block and transaction in which the log was produced. Logs then additionally define a "topic" and some "data." Log topics allow users to identify the particular event represented by the log. Log data provides more detailed information about the topic at hand. For example, if a contract is acting as a marketplace for virtual cats, it may choose to emit a log of the following form whenever a sale is completed:

```
TODO: Sample log.
```

In the following section, we take a look at Eth1 state transition function. We make use of the concepts discussed in this section and the one preceding it to build a complete picture of Eth1's application layer. Certain details of Eth1's transaction structure do change in Eth2, but the general concepts remain largely in place. Transaction receipts become particularly important in Eth2, as we'll soon come to discover. We're now ready to see how a modern production blockchain system processes transactions that have complex effects.