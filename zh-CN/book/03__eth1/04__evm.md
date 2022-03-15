---
title: "The Ethereum Virtual Machine"
---

# {{ $frontmatter.title }}

We've now examined the structure of both the state and the transaction in Eth1. At this point, we can construct Eth1's state transition function. Eth1 pioneered the concept of a highly generalized blockchain system. The contract accounts previously mentioned are capable of executing extremely complex operations that can not only transfer value, but also store and manipulate arbitrary data. Eth1's state transition function is responsible for actually running these operations whenever a transaction specifies that it wishes to interact with a contract account.

Most of the state transition functions defined in this text so far have only performed relatively simple actions. Our basic state transition for an account-based currency system, for instance, was limited to increasing the balance of one account and decreasing the balance of another. We're now introducing a state transition in which state mutations are controlled not by some simple logic, but by entire software programs uploaded to the system by users. We therefore need to shift the way we think about these functions so that we can handle these intricate and unpredictable interactions.

In essence, our state transition function must parse and execute the instructions of any contract account deployed to the system. Some of these instructions may carry out arithmetic tasks, like adding two numbers together, others may perform logical checks, perhaps to confirm that a user has enough balance to execute some action. Contracts can even read or write arbitrary data to their storage, meaning the state transition function must be able to locate or manipulate the Eth1 world state. As the set of desired behaviors begins to grow, this function quickly starts to resemble the sort of thing we might find in a computer capable of running any number of potential programs.

Indeed, at the heart of Ethereum's state transition function sits the "Ethereum Virtual Machine." Within its state transition function, Ethereum essentially simulates the activity of a computer capable of executing arbitrary programs. This computer, the "EVM," defines a set of instructions that make it possible for programs to carry out arithmetic and logical calculations, as well as read or write to Ethereum's world state. Because this virtual computer makes up a majority of our state transition function, we dedicate most of the remainder of this section to the EVM's inner workings. However, it's worth first understanding how the EVM is initialized and executed based on the contents of a transaction.

Recall briefly that we defined three Ethereum transaction types, basic transfers, contract deployments, and contract interactions. For the moment, we ignore the first two and focus on the third. The state transition functions developed within this section assume that all incoming transactions are of the "contract interaction" type. Basic transfers and contract deployments involve only relatively straightforward state modifications, but can also be thought of as special cases of the "contract interaction" transaction.

When any transaction is executed, our state transition function must verify some key details before invoking the EVM. These "intrinsic validity checks" ensure that the transaction conforms to certain basic requirements prior to the dedication of the computational resources necessary to run the EVM. We include here, among others, an assertion that the transaction fits our expected format and that the sending account has enough balance to cover the transaction fee. In a nutshell, this component of the function looks as follows:

::: tip TODO Something was supposed to go here but I forget what. :::

As noted, we are making the assumption that all transactions are contract interactions. Transactions will therefore contain a contract address in the "recipient" field, and some additional data in the "calldata" field. When we begin EVM execution, we provide the EVM with the full transaction so that it understands which contract is being called and with what input data. We additionally provide the EVM with access to the full world state so that it can, in part, access the code corresponding to the specified recipient contract. We can visually represent this architecture in a simple diagram:

::: tip TODO Something was supposed to go here but I forget what. :::

Upon invocation, the EVM fetches the code for the contract address listed in the transaction. This code is then stored in memory for the duration of the contract execution. The EVM further includes memory space for certain tools necessary to correctly run the code defined in the contract. Here resides a "program counter," a "gas counter," and a "stack," all concepts explained in more detail later in this section. We can combine these elements with those previously mentioned to develop a full picture of data and memory spaces available to the EVM:

::: tip TODO Something was supposed to go here but I forget what. :::

Before we examine execution within the EVM, we should briefly switch gears to understand how contract code is designed. At a high level, contracts behave like programmatically controlled user accounts. Contracts, like user accounts, can send or receive funds, interact with other contracts, and even deploy contracts. In this sense, contract accounts can carry out any action that a user account might. However, contract accounts behave differently from user accounts in that they can only perform operations when they receive a transaction from another account. That is to say, all actions taken by a contract must ultimately be the result of a transaction created by a user account.

As discussed in our section regarding state in Ethereum, contracts have a balance and a storage field accessible only to the contract itself. These are crucial to nearly any functionality the contract may wish to expose. Contract code used to expose this functionality is defined as a series of instructions that can be parsed by the EVM. Much like in a physical computer, these instructions are part of a special assembly language that dictates the actions of the EVM. All contract code consists of a long list of instructions which are executed one by one inside the EVM. Here the evm makes use of the "program counter" to keep track of the specific instruction currently being executed. For program control flow, the EVM includes instructions that can modify the program counter to, for instance, move to another section of code when certain conditions are met. Visually, execution essentially looks like:

::: tip TODO Something was supposed to go here but I forget what. :::

Contracts may want to temporarily store information for the duration of a transaction that does not need to be stored long-term. This is often part of even basic operations like keeping track of two values while they are being multiplied, or temporarily saving any input data within the initiating transaction. The EVM provides this functionality in the form of a stack, a data structure to which values can be inserted or removed in a last-in, first-out format. Stacks are relatively simple structures, but important to comprehend. Stacks typically have two "modifying" operations, "push" and "pop." The "push" operation places a value on the top of the stack, and the "pop" operation removes a value from the top of the stack. Ethereum includes instructions for both of these operations, and additionally includes an instruction that allows a contract to read the `Nth` value from the top of the stack.

::: tip TODO Something was supposed to go here but I forget what. :::

We can now use this knowledge to construct a very simple program that adds two numbers together and returns the result. Here, we make use of the "push," "add," and "return" instructions.

::: tip TODO Something was supposed to go here but I forget what. :::

Of course, writing software using these instructions would quickly become very tedious. As in other environments, many high-level programming languages exist in Ethereum that compile more abstract programs into these instructions. Solidity and Vyper, for example, allow developers to write contract code in languages similar to JavaScript and Python, respectively. Although functional EVM programming languages exist, the object-oriented Solidity is the most mature and popular language at the moment. Contracts in Solidity have "functions" that are used to disambiguate transactions attempting to carry out different actions. At a high-level, the object-oriented contract takes the following form:

::: tip TODO Something was supposed to go here but I forget what. :::

We can use Solidity to build another, simpler version of our addition code:

::: tip TODO Something was supposed to go here but I forget what. :::

Note that this code is very legible and hides the low-level details of the EVM. Many application developers can somewhat safely write contracts without knowledge of EVM internals thanks to these abstractions. However, it's often valuable, in a literal sense, to understand EVM operation under the hood. This value is the result of the manner in which fees for transactions are computed. All transactions must pay a minimum base fee, plus an additional fee for the amount of data included in the transaction itself. Transactions must then also pay a fee proportional to the computational complexity of the code they execute.

This resource-based fee, called the "gas cost" of a transaction, is used to ensure that the nodes who process and mine transactions are paid for any computational effort necessary to do so. All EVM instructions have an associated "gas cost," which is tuned to reflect the relative physical machine cost of each instruction. For instance, the "ADD" instruction has a gas cost of 3, whereas the more complex "DIV" instruction has a gas cost of 5. Users must provide transactions with a certain amount of gas upfront, along with a "gas price" listing the amount of ETH to be paid per unit gas used. During the execution of a transaction, the EVM keeps track of the remaining gas available and decrements this value according to the gas cost of each processed instruction. At the end of execution, all remaining gas is returned to the sender. If all gas is depleted before execution has completed, the transaction is "reverted" and any state changes are undone, though the transaction is still considered valid in that it may be included in a block even though it has no effect on the state. This ensures that miners will be paid for the execution of the transaction even if the transaction eventually fails.

We've now covered all of the various internal elements of the EVM. In summary, the EVM has access to the data inside a transaction, the world state, and various "volatile" memory spaces necessary during the execution of a transaction. Let's now examine the full process by which the EVM handles a transaction to a simple contract. Here, we have a very basic contract that returns the product of two user-provided input values:

::: tip TODO Something was supposed to go here but I forget what. :::

Our contract uses the "CALLDATALOAD" instruction twice in order to get the input values provided by the user. It then uses the "MUL" operation to multiply these values, which are now on the top of the stack. Finally, it returns the product of the values. A sample transaction calling this contract looks as follows:

::: tip TODO Something was supposed to go here but I forget what. :::

Execution of this transaction begins with our intrinsic validity checks. We've developed a more complete version of these checks below. This version accounts for the concept of gas explained previously:

::: tip TODO Something was supposed to go here but I forget what. :::

After intrinsic validity checks, we begin EVM execution. The EVM is initialized with our transaction data, world state, and memory spaces. The EVM loads the contract code from the world state and sets counters to their starting values:

::: tip TODO Something was supposed to go here but I forget what. :::

The EVM now starts to run our contract. In the following interactive panel, we can see the effect of each instruction on the EVM:

::: tip TODO Something was supposed to go here but I forget what. :::

After the last instruction, the EVM hands control back to the state transition function. At this point, there's nothing left to do but to return the world state as modified by the EVM:

::: tip TODO Something was supposed to go here but I forget what. :::

This example concludes our analysis of the Ethereum state transition function and, by extension, the EVM. Ethereum's virtual machine approach to state transitions is extremely powerful in the context of blockchain applications. Ethereum has seen an explosion of novel and complex applications not found in any preceding blockchain system. Even so, the EVM continues to evolve in Eth2. As we explore later, now work aims to cut the strong ties between computation and representation of state present in the EVM. These efforts will allow application developers to choose between a multitude of state representations and no longer force all users into an account-based model. All interesting subjects to come. Next, we take a look at Ethereum's block structure and block production process.
