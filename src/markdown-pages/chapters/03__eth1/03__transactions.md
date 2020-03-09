---
path: "/chapters/eth1/transactions"
title: "Transactions"
status: "1"
---

## Outline
- Transaction basics
    - Transactions operate on a specific state and mutate it
    - Remind that term comes from transactional databases, not finance
    - Transactions contain some sort of information that tells clients how to mutate the state
- Transactions in Eth1
    - Transactions must be sent from an account
    - If sent from user account, must include a signature
        - Not necessary for contracts because don't have private keys, only legit way to send is code
    - Enshrined tx type for eth transfers from user accounts
    - Enshrined tx type for contract deployment
    - Otherwise must call a contract
        - Specify contract to call
        - Specify data to send to the contract (which method to call, plus input data)
    - If a transaction fails for any reason, changes made are reverted
- Fees
    - Contract call time indeterminate
        - Want to charge users based on computational and storage expense of their transaction
        - Otherwise could abuse miners and break economics
    - Gas metering system
        - Each opcode has an associated cost in "gas"
        - Each transaction has an associated "gas cost"
        - Transactions must include a "gas price" in "eth per gas"
        - Transactions must include a "gas limit"
            - Anything beyond limit is a revert
        - Gas used, whether success or revert, paid to miner
            - Unused gas is returned to user
- Transactions generate a receipt   
    - Info about transaction outcome, with logs

---

Transactions change the state as described earlier. Transactions contain information that tell nodes how the state should be changed. The impact of any given transaction depends on the contents of that transaction. Most important is what action the transaction represents. Nodes parse this information and then carry out changes according to some agreed upon rules.

For all transactions there are rules we need to consider depending on if the transaction is coming from a user account or a contract account. If a transaction is coming from a user account, it must contain a signature from the private key associated with that account. We do not need a signature if the transaction is coming from a contract account, as the only valid way to generate such transactions is through a code path within the contract. Since the contract itself must've triggered that code path, the transaction is implicitly considered valid.

Eth1 defines two special transaction types. A transfer transaction includes a sender, recipient, and an ETH balance to transfer between the two. The other special transaction is the contract deployment transaction. Since they aren't directed to anyone in particular, they have no recipient. Instead, they include the code for the new contract. They optionally also include some ETH balance to send to the new contract and input data to pass to the constructor function if required.

All other transactions must be contract invocations. These include the address of the contract to call, the ID of the specific method to call, and any input data to the method. Contract invocations can also include an ETH balance if necessary for the method being called. When a node executes a contract call, it retrieves the contract and its storage. It then runs the method in the EVM and sees what storage values change. If the transaction runs without error, then the new state is changed in the world state trie. Otherwise, the whole transaction is reverted.

Transaction execution in any blockchain system requires some amount of computational effort on the part of users creating new blocks. Miners in a Proof of Work system, for instance, must execute the transactions within their blocks in order to compute the resulting state of the system. As such, it seems logical that these miners be paid a fee for the resources expended while executing these transactions.

Earlier systems with fixed transaction types or limited scripting systems could guarantee that transactions would execute in a timely manner. Transaction fees within these systems are typically more influenced by the limited space within each block rather than the computational intensity of each transaction. Ethereum's intricate EVM model, however, introduced the possibility that a transaction be exceedingly costly to execute. As a result, the EVM also introduces a fee system that charges users based on the complexity of their transaction.

Ethereum's metering system charges users for the EVM instructions in their transaction. Each EVM instruction includes a corresponding cost denominated in a unit called "gas." The total "gas cost" of a transaction is the sum of the cost of each instruction carried out during the execution of the transaction. Transactions then include a "gas price," denominated in Ether, that when multiplied by the "gas cost" gives the total fee paid to the miner for the transaction.

In order to prevent runaway transactions (an accidental infinite loop, perhaps), transactions additionally include a "gas limit." If the gas used within a transaction reaches this limit, execution is halted and the transaction is failed. However, because this still requires execution on the part of the miner, the failed transaction is still included within the block, unexecuted, and the transaction fee is rewarded to the miner.

Transactions generate a receipt that explains what happened during execution. Receipts contain the cumulative block gas used, any logs produced, a bloom filter for those logs, and a status code signalling the result of the transaction. This is useful to easily verify that the state was updated correctly. It also gives a justification for rejected transactions and the reduction of sender balances they include.