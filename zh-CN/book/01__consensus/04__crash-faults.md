---
title: "Crash Faults"
---

# {{ $frontmatter.title }}


::: tip TODO The Consensus chapter was recently reworked to include a more interactive process of constructing a consensus protocol that slowly handles more and more realistic network conditions. I have not had a chance to update this chapter yet, so it doesn't quite read correctly. I'll try to update this section within the next few days. :::


Now we'll explore the first interesting problem that arises when trying to create a distributed system: crash faults. When a node suffers a crash fault, we can effectively assume that it ceases to function entirely (at least for the purposes of the protocol). In practice, a crash fault might be something as straightforward as a dead computer or a computer that loses its internet connection to other nodes in the network. We'll later talk a bit more about other types of faults where nodes are still functional but not properly following the prescribed protocol.

## Establishing the problem

Let's briefly re-establish the problem. Say we have a distributed system that consists of a number of nodes (we'll call this number `total_nodes`). Our goal is to develop a protocol that guarantees these nodes will, after some amount of time, come to agreement about a particular ordered list of events. Active nodes must be able to come to agreement even when other nodes might be suffering crash faults. Again, at this point, we're only interested in making our protocol resistant to crash faults and we'll describe mechanisms for dealing with more insidious faults later. How can we make this work?

For simplicity, let's assume that all nodes on the network are known in advance and that messages are somehow authenticated (perhaps with a cryptographic signature). Since we're assuming that nodes can only suffer from crash faults, we could even skip the need for message authentication (we trust that nodes will either behave honestly or not function at all). Let's also make the assumption that any node is allowed to propose an event, all events are "valid", and we're simply trying to establish some basic ordering.

All this is simply to establish that:

1. Nodes on the network know about all of the other nodes on the network.
2. Nodes can trust the messages coming from other nodes.
3. Any node can propose an event.

## A basic mechanism

Given the above assumptions, let's try to construct a consensus mechanism. We've made the assumption that any node can propose an event, so we need some way to figure out the order in which nodes should store these events locally. Although it's possible to come up with many different ways of handling this, one of the easiest methods is simply to assign some particular node to act as the "leader" of the network.

Our leader node will carry out the following special protocol:

1. Listen for events from other nodes and store incoming events in a local FIFO queue.
2. Whenever the queue is not empty, take the next event (`next_event`) off the queue.
3. Broadcast a message to the network proposing that `next_event` will be stored as the next event in the chain of events.

All nodes (including the leader) will then carry out the following:

1. Wait to receive a proposal for some `next_event`.
2. When a proposal is received, broadcast a message that acknowledges receipt of the `next_event`.
3. Listen for other nodes to send their acknowledgement of the event.
4. After some threshold number of nodes (`threshold_responses`) broadcast an acknowledgement of the event, store the event in the local version of the canonical chain of events.

### Limits of crash-fault resistance

Though such a system needs to be maximally resistant to faults, there is a theoretical limit to the number of faults we can handle. We would clearly have a problem achieving much of anything if 100% of nodes were to become faulty. Research into this problem found that these crash-fault tolerant systems could sustain up to `n/2 + 1` failures. We often represent this number alternatively through the lens of the total number of nodes necessary given a certain number of faulty nodes, `f`, as `2f + 1`. One intuitive way of understanding this boundary is that if 50% of nodes were allowed to become faulty, then we could split the network into two segments that simply think the other half is faulty and may continue to operate in conflict.

### Understanding these limits

The basis of a crash-fault tolerant system is that a certain threshold of nodes must come to agreement about an operation before the operation is actually executed. One of the simplest methods for reaching this agreement is to hold a vote. Conveniently, since we do not expect malicious behavior from our nodes, we can assign a single node to manage the entire voting process without fear of tampering. This node will send out events to vote on, tally up votes on particular events, and notify nodes of any relevant results. Our only core requirement is that nodes will never execute an operation unless `n/2 + 1` nodes have voted to do so.

Another way to look at this `n/2 + 1` requirement is to imagine the following scenario. Let's say that `n/2 + 1` nodes voted for event `x` to be `y`. Now assume that at a later time, `n/2 + 1` nodes voted for event `x` to be `z`, a contradiction of the previous vote. In order for this to have happened, `n` nodes must have made `n + 2` votes, meaning at least one node made a contradictory vote. Since nodes cannot make contradictory votes under the crash-fault model, we can safely assume that this could never happen. Therefore, once `n/2 + 1` nodes vote for a particular event, the system will never include a contradictory vote.

### Modern applications

This model of fault-tolerance through voting between machines is still extremely popular today. Services like Apache ZooKeeper and etcd have vastly simplified the process of deploying these systems. Many large organizations use crash-fault tolerant networks to store important information.
