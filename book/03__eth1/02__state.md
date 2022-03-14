---
title: "State Model"
---

# {{ $frontmatter.title }}

The manner in which a blockchain represents activities has a massive impact on the type of activities it can support. We saw in our analysis of the UTXO model that UTXOs are well suited for relatively simple value-transfer systems. However, they were much less appropriate for applications that required some form of autonomous "agent" to handle transfers. Without the ability to maintain some state, UTXOs could essentially only be used to control the flow of individual transactions.

Ethereum forever changed the blockchain landscape with the introduction of the account-based state model. State in Ethereum is represented as a mapping between account identifiers and information about those accounts. Essentially, Ethereum is a database where accounts are stored and can be modified. This mapping is called the Ethereum "world state." On an abstract level, it looks something like this:

::: tip TODO
TODO: World state diagram.
:::

Given the ID, or address, of a particular account, the world state returns some information associated with the account. This information is called the "account state." The account state for all accounts, for instance, contain a "balance" field that represents the account's current balance of a currency known as Ether, or ETH. ETH can be transferred between accounts. ETH is also used as the reward for block producers and the fee users must pay for any transactions on the system.

Eth1 allows for two types of accounts. The first is the "user account," which is controlled by a cryptographic private key. The address of a user account is derived from the public key associated with its private key and is therefore guaranteed to be unique. A user account can make a transaction, perhaps an ETH balance transfer, by signing the transaction with the private key. Besides a balance, user account state includes a field for a "nonce," which counts the total number of transactions sent from that account. A user account takes the following structure within Ethereum:

```json
{
    "nonce": <number>,
    "balance": <number>
}
```

Ethereum also allows for accounts that are controlled by some code and not by a private key. These "contract accounts" can send and receive transactions like any other. We examine the structure and behavior of these accounts in the next section. Contract account state also contains a `balance` field. Unlike user accounts, however, they contain an additional `codeHash` field that stores the hash of the code that defines the contract's behavior. Furthermore, contracts have an associated `nonce`, which counts the total number of contracts deployed by that contract.

Contract accounts also contain a final field called the `storageRoot`. This is a compact reference to the information that the contract wishes to store for later. User accounts are not allowed to store information in this manner. We use the word "root" because the actual information is stored in a special data structure called a "Merkle-Patricia Trie." A Merkle-Patricia Trie is much like a Merkle Tree, except it allows for key-value access. Since this structure appears in multiple places throughout Ethereum, we explain it thoroughly below.

The structure of a contract account in Ethereum is as follows:

```json
{
    "nonce": <number>,
    "balance": <number>,
    "codeHash": "<string>",
    "storageRoot": "<string>"
}
```

In practice, we use the above structure for both user accounts and contract accounts. As user accounts have no `codeHash` or `storageRoot`, the entries for these fields are set to certain default values. The `storageRoot` for a user account is simply the empty string, whereas the `codeHash` for a user account is the `keccak256` hash of the empty string. For instance, a user account may contain the following state:

```json
{
    "nonce": 1,
    "balance": 10000,
    "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "storageRoot": ""
}
```

We now briefly turn our attention to the Merkle-Patricia Trie, a data structure frequently used in the world of Ethereum. The Merkle-Patricia Trie allows us to store key-value pairs within a traditional Merkle Tree structure. The "trie" component of the name stems from a special tree data structure called a "radix trie," in which branches represent some key. At each node, there are some children each associated with a given key. For instance, the root of such a trie might look like this:

::: tip TODO
First diagram.
:::

We can add values to these nodes so the trie takes the form:

::: tip TODO
Second diagram.
:::

Using the key `H` we get a value of `10`. With `L`, we get `5`. We can add more nodes to make the trie more interesting:

::: tip TODO
Third diagram.
:::

Within this trie, the value at `HEY` is `7`, while the value at `HI` is `9`. These values are all arbitrary, but they demonstrate how such a trie allows us to store key-value pairs. Ethereum's trie is constructed so that keys are hex values of a fixed length (32 bytes). Each node in the trie has 16 children, corresponding to the hex digits `0-F`. This looks something like this:

::: tip TODO
Fourth diagram.
:::

Again, each node here has a value. Given the hex string `67FDA`, we would go to the sixth child of the root, the seventh child of that child, and so on. The value at our final node is the result of our lookup.

::: tip TODO
Fifth diagram.
:::

We can then use this trie as a Merkle Tree. Starting from the bottom, we hash the value of children together and this becomes the value of their parents. We repeat this process until we get to the root node.

::: tip TODO
TODO: Sixth diagram.
:::

The hashed value at this root node is then the Merkle root of the tree. Since this is a Merkle tree, we can prove inclusion of a specific leaf with a Merkle proof. Unlike a binary Merkle Tree, our proof might need up to 15 siblings for each level in the tree. Ethereum has some efficiency improvements for this problem in practice when the tree is sparse.

::: tip TODO
TODO: Seventh diagram.
:::

This sort of Merkle-Patricia Trie is used to represent storage values for contracts. All variables and stored values are given a unique 32 byte identifier. One can later look up the value of these variables through the trie. The full account state for a contract account therefore looks like this:

::: tip TODO
TODO: Diagram.
:::

The world state itself is also stored in a Merkle-Patricia Trie, except the keys are account addresses. Combining this with the account state, we have our final image of state in Ethereum:

::: tip TODO
TODO: Diagram.
:::
