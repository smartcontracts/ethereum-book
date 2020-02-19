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