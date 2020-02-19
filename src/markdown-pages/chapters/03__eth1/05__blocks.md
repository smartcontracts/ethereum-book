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