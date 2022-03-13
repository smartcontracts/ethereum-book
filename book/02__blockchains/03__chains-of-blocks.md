---
title: "Chains of Blocks"
---

# {{ $frontmatter.title }}

Proof of Work provides us with a primitive that allows us to quickly and accurately estimate the resource expenditure necessary to generate a given partial hash collision. Once we determine the number of hashes required, on average, to compute a collision, we can translate into "real" cost. We simply need to estimate the economic cost per hash by analyzing labor, electricity, hardware, and any other resource inputs. One can often find online sources that perform this work on our behalf.

Now, we must construct a system in which this proof of resource expenditure can replace the "one node, one vote" model that fails in an open network. To do so, we can attempt to replicate the voting mechanisms of traditional BFT systems. BFT models required that votes on particular messages take the form of a digital signature over the given message. This made the vote attributable to a given node and simultaneously unique to a specific message. Our Proof-of-Work system should, ideally, retain these properties.

These properties are critical to any Proof-of-Work system. Without attribution, a node could claim the work attached to a particular message as their own. This would essentially remove any incentive to perform work at all. Without a unique association between a partial collision and a specific message, the same work could be used as "voting power" on multiple messages. Within HashCash, this would allow a user to send many emails with the same stamp, bypassing the purpose of HashCash almost entirely. In a Proof-of-Work system, this would permit a node to gain virtually unlimited voting power without expending resources for each additional vote.

We can implement both of these properties with largely the same technique used in HashCash. Instead of simply asking for partial collisions from arbitrary input data, we require that nodes include a unique ID and the message being voted on as part of the input to the hash function. This "ties" the work to the ID and message, as any other input would not generate the same hash output. If a user attempted to attach the work to some other message, a verification check would reveal that the hash with this new message does not match the associated work.

For completeness, we must add a field that can be varied in order to generate new hash values. Of course, the node's ID and message must remain constant. Since a hash function always returns the same output on the same input, the hash of the ID and message is fixed. An additional variable "nonce" field allows a node to modify the input as to generate new outputs until a partial collision is found. The node would then transmit this value along with the fixed content so that other nodes can verify the collision.

The full input to the work function is therefore:

```
input = (id, message, nonce)
```

Let's illuminate this with an example. Suppose that a node with ID `10` wants to generate a vote for the message `Hello!`. For simplicity, let us assume that the node wishes to find a partial collision such that the first digit of the hash is a `0`. The node would repeatedly compute `hash(input)`, where `input = (id, message, nonce) = (10, "Hello!", nonce)`, until a sufficient output hash is found.

::: tip TODO
TODO: Diagram
:::

Perhaps, depending on the hash function, `hash(10, "Hello!", 6)` provides us with the desired collision. The node would publish their vote by broadcasting a single message containing the three input variables and the resulting hash. Another node could then verify the work by computing `hash(10, "Hello!", 6)` for themselves and comparing the result to the provided hash. A node would not be able to use the same work as voting power for a different message `other_message != "Hello!"`, because `hash(10, other_message, 6)` will not be equivalent to `hash(10, "Hello!", 6)`.

::: tip TODO
TODO: Diagram
:::

At this point, we are still emulating traditional BFT system, though we've replaced the way in which votes are generated. Now, we begin to partially diverge. Most BFT systems will elect a "leader" responsible for proposing potential updates to all other nodes in the system. Within a Proof-of-Work system, nodes will most likely not be aware of all other nodes in the network. If a designated leader were to exist, then it is possible that a node could not be aware of the leader and, as a result, not be able to participate. Therefore, we need to eliminate the need for a designated leader.

::: tip TODO
TODO: Diagram
:::

Our system must still allow end-users to somehow introduce new transactions that mutate the state represented within the system. Whereas a BFT system would route all of these transactions through the leader, our system moves them around to all nodes on the network. These "pending" transactions, not yet accepted into the system, are transmitted between nodes such that all nodes have some view into this "pool." It's from this pool that individual nodes pick specific transactions they wish to see included in the greater shared system.

In an ideal world, all nodes would have an identical view of the transaction pool. In practice, however, nodes will often see very different sets of pending transactions. Much of this can be ascribed to network latency and the arrangement of connections between nodes. A specific node may of course always choose not to broadcast a transaction to its peers. No matter the cause, we inevitably end up with a system in which each node has their own view of the transaction pool that may greatly differ from the views of its peers.

::: tip TODO
TODO: Diagram
:::

This observation serves as motivation to understand the operation of our system as a whole first through the lens of an individual node. We now briefly step into the shoes of a node attempting to have a transaction accepted by the network at large. Although we analyze these actions from an individual perspective, we can assume that every other node in the system follows roughly the same logic. This is, quite reasonably, the expected behavior of a protocol in which each node essentially holds the same set of permissions and responsibilities.

Let's take a look at the perspective of any one node in the system. For simplicity, we'll assume that no transactions have been processed by the network. All nodes therefore see the same initial "genesis" state. Our particular node additionally sees some pool of pending transactions from which it can select transactions to process. We now want to understand how a node processes and votes for a transaction to be recognized by other nodes.

::: tip TODO
TODO: Diagram
:::

As discussed in our sections regarding state and state transitions, a transaction acts as an input to some state transition function, which in turn mutates some initial state. The initial state can have an effect on the result of the transaction, so it's important that all nodes execute any given transaction against the same state. Therefore, a record of a transaction in the system must always include a reference to the specific state on which the transaction operates. Since the state may be quite large, we often use some commitment to the state, like a hash, instead of the full state.

Let's assume that our node has selected some transaction, `T0`, to attempt to process. We required that all nodes share the same initial state, which we'll call `S0`. The "thing" that our node wants to have recognized is that other nodes should accept `T0` as the transaction that mutates `S0` into some second new state, `S1`. We can describe this as the message `(S0, T0, S1)`.

Our node must now produce some "voting power" to attach to this message. The extent of the voting power attached will determine whether or not other nodes accept the message. As we previously explained, this means repeatedly performing `hash(ID, message, nonce)` until the node is satisfied with the result. Of course, we have yet to define the conditions under which a node would find the result sufficient. We can take a stab at a first attempt for this metric as follows.

The level of "work" a node is willing to do for any given transaction should, in theory, depend on the expected return for doing so. Any work performed translates directly into resource expenditure on the part of the node. Assuming that the node receives a reward for its effort, it seems sensible to say that a node will continue to do work on a particular transaction until the resources expended approximately equal the value of the reward. The node can then attach whichever result is the smallest. As we will shortly find out, this method is reasonable but not entirely ideal.

Before we continue our analysis, we should briefly touch on the topic of reward values. This is a complex subject that we explore in much greater depth later within this text. For the moment, however, one may find it useful to assume that reward value is proportional to the value or "importance" for the transaction being processed. This mental model suggests that nodes will generally do more work for transactions that users wish to see processed quickly and spend less time on non-critical tasks.

Let's now shift our attention back to our individual node. Take the scenario in which `T0` is only valuable enough such that its associated reward covers a few seconds of work. After this short period of time, our node picks its smallest result and attaches it as the voting power for the message `(S0, T0, S1)`. The node then broadcasts the combined message and vote to the network of other nodes.

To understand what happens next, we must zoom out of the perspective of an individual node and look again at the network as a whole. IF we assume that all nodes are similar to our particular node, we find a network flooded with potential transactions to be executed against the genesis state. We chose the work time of a few seconds quite deliberately. At this interval, many nodes will finish their votes before the votes from others have enough time to propagate through the network. If nodes selected different transactions from the pool, there are now many conflicting messages of the form `(S0, T?, S1)`.

::: tip TODO
TODO: Diagram
:::

Once again, as the result of a transaction depends partially on the state on which it operates, nodes cannot accept multiple messages that reference the same initial state. Nodes are, therefore, now seeing what's called a "fork" in the network. Each node can only choose a single one of these messages to be the correct or "canonical" message. We'll analyze the algorithms, or "fork-choice rules," used to select canonical forks in the next section. At the moment, however, we can slightly modify our system to vastly reduce these sorts of massive fork events.

::: tip TODO
TODO: Diagram
:::

Our network was flooded with conflicting messages because many nodes broadcast their votes at approximately the same time. We would prefer to have a system in which the time between any two votes is generally large enough that the first vote is seen by most nodes before the second is broadcast. We can't simply assign specific time slots for specific nodes to vote in, because we are trying to maintain the ability for new participants to join at any time. Instead, we can introduce an element of random chance to the voting process.

A random component here should ensure, probabilistically, that the odds of two nodes generating a valid vote at the same time are quite low. We can achieve this result by requiring that all votes must at least be smaller than some "target" work. If this target is sufficiently small, then we can minimize the chance that two nodes find a valid vote within a few seconds of one another. This concept is often referred to as "difficulty."

Difficulty may reduce accidental forks, but it can also greatly increase the amount of work necessary to generate a valid vote. In turn, we must increase the reward for performing this work to maintain our incentive structure. As we mentioned, rewards vary approximately with the "importance" of a transaction. However, it's not particularly easy to make transactions "more important." We can, however, increase the number of transactions per state update message and thereby increase the total reward. Instead of `(S0, T?, S1)`, messages would now take the form `(S0, [T0, T1, ..., TN], S1)`, essentially bundling transactions into collections referred to as "blocks."

::: tip TODO
TODO: Diagram
:::

It's worth noting here that blocks don't solve the problem of forks. They simply reduce the probability of conflicting messages being published at approximately the same time by accident. It's still entirely possible that two or more nodes happen to find satisfactory hashes at around the same time. Forks are guaranteed to occur eventually, and they're a very common sign in practice. Indeed, forks are a fundamental part of any Proof-of-Work blockchain.

We can understand why this is the case by first examining why traditional BFT systems do not face the same problem. Most BFT systems, as we've discussed, define some "leader" responsible for introducing potential changes. For each new transaction, the leader begins a voting process. Other nodes then broadcast a vote representing their willingness to accept the transaction. Nodes finally "accept" a transaction once they've seen that more than `2/3` of all nodes have voted to do so. For two conflicting messages to receive more than `2/3` votes, more than `1/3` of nodes must have violated the protocol. However, we assume that only `1/3` can be malicious, so this scenario can never happen.

::: tip TODO
TODO: Diagram
:::

All of this is to say that once a decision as been made, traditional BFT nodes can safely assume no conflicting decisions will be seen in the future. This is primarily a result of the fact that nodes can be certain when the `2/3` threshold has been passed. In a Proof-of-Work system, on the other hand, nodes can never be sure of the total "voting power" at any given time. New nodes can always join the network and begin to participate in the consensus process. We cannot determine `2/3` of all nodes if we do not know how many votes can be cast.

This particular problem is further complicated by the dimension of time. From an information-theoretical perspective, one cannot distinguish between a message crafted in the past but not received until the present, and a message crafted in the present but forged to look as it if it were from the past. This has the effect that, in an asynchronous network, we must consider newly received blocks that conflict with very old ones. Essentially, the voting process for the set and ordering of blocks can never come to any absolute consensus.

::: tip TODO
TODO: Diagram
:::

Although Proof-of-Work chains may not give us any "real" sense of a decision, we can come to other, more subjective decisions. Properly constructed fork-choice rules can provide an "economic" certainty that a decision will not be reverted. In general, this means an assurance that a block can only be removed from the "canonical" chain if someone is willing to expend a large quantity of resources to do so. Next, we're going to better understand the purpose and construction of these fork-choice rules.
