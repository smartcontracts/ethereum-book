---
path: "/chapters/blockchains/execution"
title: "Execution"
status: "0"
---

Our study of blockchain systems so far has primarily focused on the basic protocols used to come to agreement about a set and ordering of events (or "transactions"). Within this section, we'll start to get an idea of the information contained within each transaction. We'll also understand, in a basic sense, the way in which nodes react to those transactions. 

Early distributed systems research, the sort of work carried out by Leslie Lamport, was typically utilized by organizations to maintain robust database backups. Transactions within the context of a database would usually represent an instruction to modify a particular database value. One might implement this behavior, for instance, with a transaction that essentially communicates that nodes should "add value X to table Y."

Although transactions can take many different forms, a digital cash system lends itself to very specific transaction structures. Particularly, digital cash can be easily represented as a ledger of value exchanges between some "sender" and some "recipient." One might be familiar with such a ledger in the form of a bank statement. Such summaries might include information about the date in which a transaction occurred, the sending party, the receiving party, and the value transferred between the two. We're now ready to analyze the way in which Bitcoin and other early blockchain systems achieved this functionality.

Bitcoin made use of a transactional structure known as the "unspent transaction output," or UTXO, model. Within such a system, value is represented as bundles of currency, often called "outputs." Transactions "consume" any number these outputs and, in turn, generate any number of new ones.

Transactions therefore take a form generally described by the following diagram:

```
TODO: Diagram
```

UTXOs can be used to create a digital cash system with the addition of some "verification" information embedded into the UTXO itself. A simple system may require that each UTXO contains a public key. This essentially assigns ownership to each UTXO if a transaction is only considered valid when it contains signatures from the private keys corresponding to the public keys on each input.

Bitcoin took this verification process further into a more generalized form. Instead of simply including a public key, Bitcoin UTXOs could include small scripts. These scripts were written in a special programming language called "Bitcoin Script." Scripts take some input data and perform a series of operations to "verify" the data. Eventaully, the scripts return either "true" or "false," corresponding to the ability for the UTXO to be spend given the input to the transaction.

We can implement a basic signature verification script without too much effort. Our script only needs to check that the input to the script is a signature over the entire transaction, minus the signature itself. In Bitcoin script, this looks like the following instructions:

```
TODO: Signature verification script.
```

If the signature is valid, the script returns "true" and the input can be used in the transaction. Otherwise, the transaction is rejected entirely. Once all input scripts have been verified, nodes check that the sum of all input value is greater or equal to the sum of all output value. Finally, nodes assert that the inputs have not already been used as part of some other transaction. If all of these checks are passed, the transaction is considered valid.

This model may seem somewhat unintuitive, but it has several nice properties for a digital cash system. Bitcoin script can be used to implement a wide variety of payment conditions. For instance, one could lcok an output with multiple public keys to increase security. Furthermore, excess value in a transaction can be returned to a new address. Transactions can , as a result, somewhat obfuscate the ownership of a particular set of funds. Finally, the system is relatively simple to implement.

However, the system also has some downsides. Since output are consumed once used in a transaction, it's quite difficult to keep track of information across several transactions. Bitcoin script was not designed to enable the existence of long-term applications that could manage the flow of value. UTXOs in Bitcoin were essentially akin to adding conditions to specific cash bills instead of creating services that could conditionally manage the bills that moved through them.

Ethereum changed this paradigm with the introduction of the Ethereum virtual machine. Taking inspiration from early research into distributed state machines, Ethereum attempted to bypass the limitations of its predecessors almost entirely. Ethereum did away with the UTXO model and instead settled for an "account-based" approach. Unlike Bitcoin, Ethereum accounts are much more similar to the accounts one might be familiar with in the context of banking.

Ethereum's biggest innovation, however, was  the introduction of "contract accounts." Unlike standard accounts controlled by private keys belonging to users, contract accounts behave according to a predefined set of programmatic instructions. Contract accounts can send and receive ETH like any user account, but can also expose methods that can be executed by users. Through these methods, contracts can perform a wide variety of tasks not feasible in earlier systems. 

Contract methods are small programs that dictate how a particular contract will respond to a given transaction. Contracts can expose a number of different methods for users to execute. Users interact with contracts through transactions that make clear the target contract, the target method within that contract, and any additional input to the method. Although users may send ETH along with a transaction, this is not strictly necessary. 

As did UTXO verification scripts, contract methods have access to any input data within the transaction. However, these methods also have access to a database associated with the contract account itself and have the ability to interact with other contracts. The key addition of an internal database, or "state," allows contracts to keep track of relatively complex information and interactions. For instance, contracts can generate and manage their own digital currencies by maintaining an internal record of account balances. Contract-oriented design was often simpler and more intuitive than its UTXO counterparts. The model was, arguably, the biggest initial driver behind Ethereum's massive success.

We discuss Ethereum's account model in much more detail in the following chapter. The Cambrian explosion of blockchain designs over the past ten years has revealed the breadth of options for transactional execution.  The UTXO and account models are, at the moment, the most widely used structures for representing the "stuff" going on within a blockchain. That said, no single system can be said to be strictly "best," and it's likely that better models are still to come. As we'll discover, Eth2 presents us with the opportunity to explore new paradigms within this "execution" layer.

Diversity on the execution layer highlights the value of a mental separation between execution and consensus. Our analysis of the origins of blockchains and distributed systems often avoided discussion of the "stuff" happening within each transaction. With some careful design, we can make use of a single consensus mechanism for any number of completely different execution models. Tight coupling between the two layers often results in additional and unnecessary complexity. It's worth keeping this in mind when we eventually come to discuss the construction of Eth2.
