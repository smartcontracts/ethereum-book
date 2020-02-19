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

We spoke pretty vaguely about the contents of blocks so far. We sort of hitned that they were transactions but of coruse in BFT transactions can be really anything. State machines were one of the first things people did with BFT, so it's clear that we could do a lot of different things if we wanted. However right now the intial use cases were obviously related to digital cash, so most of the early models for the state and updates were related to this for effiicency and cleanliness sake.

Okay so if we think about this in the context of money, our state should effectively be some sort of ledger that tracks who can spend what money. There are a few different ways taht we can actually implement such a system, and they're not always as intuitive as you might think. They all basically achieve the goal of a transactional ledger, though they have different properties in the long run.

One of the first models created is called the UTXO model. Basically the way this system works is that we sort of have these bundles of money that have rules about how they can be spent. Transactions effectively take bundles of money as inputs and spit out bundles of money as outputs. Each bundle is uniquely identified, so a transaction literally has a list of input IDs and then creates outputs with new IDs. This is a little confusing, but the result is that there's money and there's a way to spend it. This is sort of the result of thinking of the system in a pure money sense, and it's why bitcoin used it. The primary usecase was money, so the system was desigend around that usecase.

Core principles are that a transaction can only spend as much as was incoming. If 10btc came in, only 10btc can go out. Transactions that violate this will not be accepted by clients. 

The rules for who can spend a particualr bundle of moeny are interesting. The easiest rule we can come up with is basically to attach a public key to each bundle and say that someone can only spend the bundle if they provide a signature from the corresponding private key. This gives us a simple system that allows people to send money to one another by creating transactions that spend input bundles and generate output bundles with new public keys attached. If you want to spend less than 10BTC, you need to do 10btc => xbtc and ret btc where retbtc is returned to you. A nice property here is that the ret address can be different than the one that originally held the 10btc, even though they're both your own addresses. This generally makes it annoying to trace btc transactions and was one initial selling point, though companies have now developed strong techniques to track stuff anyway.

Ok so we have signature verification, but there's no reason why we have to stop there. Btc added a system caleld Script which allowed people to use more complex verification techniques than simple signatures. This was really more of a necessity, people wanted to do interesting things otehr than simple transfers. the way that script works is that people can define a small script that given some input tells you whether you can spend the funds. A dumb example of this might be a script that allows anyone to spend the money by inputting the string "hello," but in practice this is really used to do more complex stuff like funds that can only be spent if a few parties sign off simultaneously (multisig). This is relatively powerful and started to show off the possibilities of programmatically controlling the flow of money. Script is limited in that there's no real way to "store" values, whcih is by design.

Since transactions actually require some sort of effort on the part of the miner, it makes sense that users have to pay directly. In BTC this fee is generally related to the size of the transaction in bytes because this effectively approximates the amount of computational effort requried to execute teh transaction. Fees are paid in UTXO systems usually by saying that the difference in inputs and outputs is the fee, which we sometimes call an "implicit" fee system.

the UTXO model is clearly the "money system" model at its heart. It really takes money to be the primary use-case, which makes sense. It has some nice benefits, one of which is that you can basically just keep track of your own UTXOs and mostly ignore UTXOs of others and be relatively secure. Another benefit is that it's somehwat harder to track since there's that annoying tree structure.

The main alternative to the UTXO model is the account model. This is more like the type of system you mentally think of when it coems to a bank or something. Basically the ledger is represented as accounts which can interact with one another for instance transferring money. Transactions are carried out from one account to another, i.e., there is a sender and a recipient in each transaction. The main reason this model was developed was because it was mentally simpler than the UTXO system. It's more familiar to what you would see in daily life and it's a little easier to wrap your head around.

Ethereum was one of the first to introduce this model into production. Ethereum effectively just keeps track of a big mapping between accounts and information related to those accounts, like their balances. A simple transaction under this system might look like an increase in the balance of one account and a drecrease in the balance of another. It's really pretty basic, so it makes sense why it was used for that clarity.

Accounts can also be used to achieve that programmatic ability that Script gave Bitcoin. In some senses this programmatic ability is actually much expanded. Basically, Ethereum has two types of accounts called user accoutns and contract accounts. USer accounts are what you think they are, accounts controlled by a singel private key. Transactions can be made from those accounts by signing the transaction with the private key associated with teh account. Contract accounts arent controleld by a private key but instead operate according to some fixed code that cannot be changed after the account is created. 

Contracts are basically autonomous accounts that expose a set of functions that can be "called" by other accounts. Their functionality is controlled by a special system called the Ethereum Virtual Machine. Basically, people upload the code of the contract in a special bytecode that is understood by this virtual machine. When someone wants to interact with the contract, they specify a function to call in that contract. The Ethereum virtual machine then knows how to execute the code that is defined by the function in the contract. This is somewaht more complex than Script, we dedicate an entire section to this within the next chapter. One nice thing to note though is that contracts can actually have associated storage, which means they can keep track of state for a long time easily, which isn't as easy to do in Script.

Fees in Ethereum are paid explicitly as opposed to the implicit fees in bitcoin. Users must define a specific fee, which can help reduce problems with clients taht result in the loss of massive funds. This has happened a few times in btc. It's also happened in Ethereum too, though! Generally again the fee system we will explain later but the overall model is that the fee a user must pay largely reflects the computational cost of the effort expended in executing the transaction.

Again the main pro to this system is that it metnally makes a lot of sense. It's easy to wrap your head around for the average person. It's also much easier to write code for this system generally, since it follows a more more object-oriented model that is familiar to developers. It can also be easier to keep track of your balance since you only need to look at your own accounts and not scan the entire pool of UTXOs for ones that happen to be sent to your address without you knowing.

---
