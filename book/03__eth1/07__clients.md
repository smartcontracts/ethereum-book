---
title: "Client Types"
---

# {{ $frontmatter.title }}

Blockchain clients can access and participate in the system in various ways and to differing degrees. We previously explored the general concepts of full, archival, and light clients. Many users choose to operate full nodes that process all transactions but prune components of the system state after it's not longer likely to be useful. Some others run archival nodes that do not prune state, primarily for the purpose of searching and analyzing blockchain data. Others still maintain light clients that can store significantly less information at the cost of some hit to security. Within this section, we take a look at some of the techniques used in Eth1 to support these different operational modes.

Full nodes are the most common form of client amongst those that download and execute all new transactions. It's valuable to understand how these nodes implement state pruning in order to reduce storage requirements. Specifics can vary between different client software packages, but many high-level goals are universal. Recall that the Eth1 world state takes the form of a mapping from account addresses to account state structures. Contract accounts in particular include a "storage" field within this structure. Each block updates the world state in some way. We're most interested in finding and "forgetting" elements of the world state that exist in one block but are removed in the next.

One way in which such a removal from the world state can occur is through the storage deletion operation available to contract accounts. Contract storage takes the form of a key-value database accessible only to the contract itself. Contracts may occasionally decide to delete the value associated with some key when that value is no longer useful. Eth1's state tree would be modified by this action such that the particular tree node corresponding to this key-vale pair no longer exists:

::: tip TODO
Deletion operation impact diagram.
:::

Although the original node has been dropped from the trie, clients should generally hold on to the node for the possibility of a chain fork. If a fork lacking the deletion operation were to become canonical, the original node would once again be relevant:

::: tip TODO
Effect of a fork diagram.
:::

It's for this reason that client software typically defines a large threshold of blocks that must be appended to any given block before state pruning can be considered. Thresholds often fall on the order of several thousand blocks. If some particular node in the state trie was removed and not later re-inserted before the threshold was crossed, the node can relatively safely be deleted in its entirety. This strategy only puts full nodes at risk in the event of a fork spanning a number of blocks greater than the threshold (for context, the largest fork in Eth1's history spanned `TODO: ??` blocks). If this were ever to happen, full nodes would be forced to rely on the relatively small population of archival nodes to retrieve any relevant historical data.

Eth1 archival nodes are somewhat resource intensive and therefore out reach of many network participants. At the time of writing, these nodes store on the order of several terabytes of data. Some services, like block explorers, take nodes a step further and implement custom logging, or "instrumentation," features. These additions serve to record useful information often related to the inner details of transaction execution. For instance, popular block explorer EtherScan captures the complete list of EVM instructions carried out during each contract interaction. Users of the service can then step through and carefully analyze the effects of any given transaction. Though beneficial, this information is not necessary for normal network participation and can greatly increase cost and storage requirements.

Eth1 natively supports light client modes for the sake of resource-constrained environments. As is typical, light clients follow slightly different protocols when carrying out different actions. We'll first take a look at the process by which a light client can ascertain the state of a given account. Much of Eth1's support for this behavior comes from its distinction between in block headers and block bodies. Block bodies include complete block information, such as the full list of executed transactions. Block headers, on the other hand, contain identifying information about a block and, crucially, the roots of Merkle trees generated from the contents of the body.

The root of the world state trie can be found in every block header. Light clients can download headers at the relatively small cost of 508 bytes per header. Clients can them make use of this root to find the state of an account at some block by following a simple procedure. Given that the state trie is designed to be easily traversable, light clients can request specific nodes from the trie one-by-one until they reach their target node. The following diagram depicts this process:

::: tip TODO
Diagram showing requests necessary to get state element.
:::

Light clients can employ a very similar protocol to check for the inclusion of a transaction within a block. Transaction receipts already contain the index of a transaction in the full list of transactions in a block. Light clients can therefore simply request nodes from a block's transaction trie until they find their desired transaction:

::: tip TODO
Diagram showing requests necessary to get transaction.
:::

::: tip TODO
Need to figure out where to first bring up Bloom filters, probably should be explained before this.
:::

Light clients can also watch for specific transaction logs with some additional effort. Block headers contain a Bloom filter populated by the logs of all transactions in the corresponding block. Light clients can first use this filter to find blocks that may include relevant logs. For each matching block, the client must then download the full list of transaction receipts to check whether they do, in fact, contain relevant logs. This process can be visualized as follows:

::: tip TODO
Diagram showing light client log process.
:::

Light client protocols allow users to retrieve and verify data from the system at a significantly decreased storage cost. However, without the full block data, these clients cannot be certain that the block is entirely valid. Light clients would not, for instance, necessarily be aware of the presence of a transaction that was not properly executed. Light clients instead typically rely on presence of later blocks to judge the authenticity of a block at hand. Under standard network conditions, a majority of hash power should be dedicated to the extension of a valid chain. Light clients can therefore somewhat safely assume a block to be valid after sufficiently many blocks have been produced to follow it. Of course, this metric is less secure than full validation of every block.

Client flexibility continues to be improved in Eth2. Light client support is particularly expanded with the addition of new tree structures. Eth2 light clients will be able to drill down into significant more detailed elements of a block before having to download chunks of data. These changes aim to bring Ethereum to a much wider range of platforms, perhaps even opening the door to efficient light client implementations designed as applications on other blockchain systems. We explore these new possibilities in greater detail within our later chapter on Eth2 light client protocols. Many of the techniques applied to client constructions in Eth2 will come in handy not only in our discussion of Eth2, but in study of nearly any blockchain system.
