---
path: "/chapters/eth1/blocks"
title: "Blocks"
status: "1"
---

## Outline
- Purpose: Describe Eth1 block structure
- Reminder of block purpose
    - Collect transactions 
    - Progress the system through updates
- Flow of making a block
    - Pick block to build on
    - Find transactions, fill up to block gas limit
    - Find ommers
    - Dish out rewards
    - Execute transactions, determine final state
    - Do work on top of this
- Contents (header)
    - Misc info
        - Reference to some previous block
            - Necessary for several reasons
        - Ommershash, list included in "body"
            - Explain here?
        - Block number
        - Account that gets fees (beneficiary)
        - Difficulty
        - Extradata
        - Mixhash, nonce ("lottery ticket")
    - Transactions
        - Ordered
        - Not included directly but as transactionsroot, included in "body"
        - Executed in order with starting state equal to final state of previous block
        - After execution, gives final state of this block
        - Also includes receipt root, logsbloom
    - Root of state tree after execution included in block
        - Locks work to a particular set of txs
---

Blocks are effectively collections of transactions and form the "time steps" in the system. We use blocks because it's easier to dea with more transactions than individual updates. blocks result in changes to the state, but don't actually contain the state itself. One determines the current state by executing all transactions in all blocks in a process called synchronization. 

The process of producing a block is as follows:

```
TODO
```

Blocks are organized into two main components, the header and the body. The header acts as a concise reference to everything that happened in a block. The body contains the full record of transactions. This distinction is useful for light clients who can use the Merkle-Patricia Tries in the header to access specific datapoints within the block without accessing and downloading the full block.