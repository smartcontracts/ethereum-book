---
path: "/chapters/blockchains/execution"
title: "Execution"
status: "0"
---

## Outline
- Spoke about proposals vaguely
    - Proposals should include actions that actually do things
    - Really could be anything, but obvious initially was cash
- Call back to transactional model of distributed systems
    - Core concept of a money system needs a ledger
    - Ledgers can be represented in different ways
- UTXO model explainer
    - Background (why?)
    - Core concepts
    - Basic verification with sigs
    - Scripting
        - Verification can be extended to do more complex stuff
        - Bitcoin introduces Script
    - Fees
    - Pros/cons
- Account model
    - Background (why?)
    - Core concepts
    - Contract accounts
        - Accounts as autonomous actors
        - Ethereum introduces EVM
    - Fees
    - Pros/cons
---

So far we've remained intentionally vague about the contents of the proposals that these participants are making. Traditional distributed systems could be used for any number of use cases from backing up important information to ensuring that critical software stays operational. Of course, some of our direction on this has already been covered as the original intention was to build a digital money system. As we previously noted, we actually need some incentive for our participants, which can be paid out via our own digital money system.

At this point, we just need to figure out how we want to represent such a system. Early projects like Bitcoin made use of an interesting transactional model called the "unspent transaction output" or "UTXO." Under this model, all currency on the platform would be represented as unique "bundles" of coins that could be combined to broken apart. Transactions would take up to a certain number of these bundles as "inputs" and spit out any number of "outputs." These resulting outputs could then be used as inputs to further transactions.

Within Bitcoin specifically, coins can only enter the system through the mining process. The creator of a block includes a special transaction that has no inputs but one output with a value equal to the block reward. This is the only instance in which the output amount can be greater than the input amount. For all other transactions, input amount must be greater than or equal to output amount. Any difference between input and output amounts is automatically considered to be a transaction fee paid to the miner.

Although this model is not particularly intuitive, it does provide certain useful properties. Since a user can change their address between each transaction, their transactions become more difficult to trace. Someone would need to do a relatively extensive analysis of the graph of outputs in order to study a user's behavior. Furthermore, outputs are cleanly separated from one another in that transactions with no shared inputs can be executed simultaneously. This makes the model quite parallelizable.

This sort of system is usually compared to the "account" model of blockchains like Ethereum. Account-based systems are generally more familiar to us than UTXOs. Under this model, users can create accounts that hold their funds. Transactions between accounts are effectively debits from one account and credits to another, much like a traditional bank account. This is somewhat simpler than the UTXO model but can also be more efficient in many cases.
