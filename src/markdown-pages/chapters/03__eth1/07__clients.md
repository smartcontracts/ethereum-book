---
path: "/chapters/eth1/clients"
title: "Clients"
status: "1"
---

## Outline
- Ethereum allows for three primary client types
- Archival nodes
    - Store everything that's ever happened
- Full nodes
    - Store everything in the current state
    - Usually does not include very old state, like deleted storage or history of changes (old wiki lists > 1k blocks, not sure what people settled on)
- Light clients
    - Sort of a thing in Eth1, but not as good as bitcoin SPV b/c more info needed to verify
    - Need to research this a little more
---

Only thing that really needs to be explained here is the light clients protocol. Perhaps also a brief explanation of full client protocol.

Full nodes as we described earlier are capable of verifying everything that happens on the network for themselves. They download all blocks including the header and the body. They then execute the transactions in these blocks themselves, verify the work in the header, and generally make sure that the transactions are valid. They can be sure that no invalid transactions will slip by and also have the information necessary to generate any transaction they'd like. The flow for a full node is as follows:

Node sees new block header, verifies work, sees if it would win fork choice rule, downloads content, verifies content, stores it. Repeats this process for every new block header that it receives such that it has a record of all blocks and transactions on the system. If the block would not win fork choice rule, typically strategy is to store the header until something new comes that would make that header useful, download full chain. Since headers are pretty small, this overhead is relatively limited. 

Sometimes full nodes use pruning to remove older information. Pruning in ETH means removing parts of the state trie that are no longer used. Also might mean removing transactions where the effect is not useful anymore. This is a little more subjective, clients can implement this differently for differing effects. Overall pruning makes a full node less secure if there's a very long term fork, but since this becomes more difficult as time goes on, it's usually reasonable. Nodes that perform no pruning are called archival nodes. Certain archival nodes are implemented with special software called instrumentation that logs the EVM steps and other low-level information in a manner more easily parsed.

Finally we have light clients. These are clients that don't store all block bodies, but usually just store block headers instead. Since we use lots of Merkle tries in the headers, light clients can access specific pieces of information through a full node. This process is basically that the light clients will request a piece of information from the full node, perhaps the balance of a specific account. The full node then returns the balance along with a proof that the value is in the tree of the header of some recent block as specified by the light client. Light client verifies this proof and can then ensure that the value was actually correct. Algorithm for this is:

Light clients can also pull transaction data by asking a full node for the index and block, then pulling nodes of the tree to verify that the tx was included:

Finally, also works for event logs, but requires a little more work. Light clients see what block headers have bloom filters with matching logs for their filter. Then download transaction receipts of all txs in matching blocks. For any that match, check full rlp log and ensure it matches. More complex since there's more to download, approx sqrtN. 
