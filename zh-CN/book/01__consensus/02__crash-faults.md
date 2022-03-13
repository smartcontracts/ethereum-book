---
title: "Crash Faults"
---

# {{ $frontmatter.title }}

## Terminology

We now direct this chapter into a more detailed analysis of the construction of fault-tolerant distributed computing systems. We begin this study with definitions of certain key concepts used in the specifications of these systems. Exact terminology employed within this book is, whenever possible, faithful to original language of "the literature," and may occasionally rather poorly summarize underlying concepts. We attempt to provide additional context and exposition when we find this to be the case.

### Abstracting away the computer

Our brief history of fault tolerance thus far has referred in passing to concepts like "computers" and "networks," among others. These are, in practice, highly technical and varied elements. Computers can be constructed in countless ways and still achieve the goal of "computing." One can verify this statement within the span of a brief journey to the nearest electronics store. Physical network connections are similarly diverse in both form and function. It's for these reasons that the field of computer science has developed useful conceptual abstractions that smooth out differences between real components.

Computers are, unsurprisingly, the foundation of computational systems. However, it's not necessary that the entities interacting within a networked system operate on distinct hardware. Indeed, computer hardware has been capable of running multiple processes in parallel since the mid-20th century. Computer scientists therefore often refer to "nodes" as abstractions of computers on a network. Nodes can be thought of as unique entities on a network that have some computational processing power and access to local memory storage.

### Abstracting away the network

Communication lines between computers are similarly abstracted to remove any notion of an underlying physical medium. Whether information is transferred via electromagnetic waves, sound waves, or even carrier pigeon makes no difference to our analysis. We instead depict "logical" connections between nodes, over which nodes can send distinct packets of information called "messages." We further assume that some unknown amount of time must elapse between the moment that a message is sent and the moment at which it is received.

Lines of communication are necessary but not sufficient for collaboration between nodes. Just as humans need languages, nodes must share a vocabulary of sorts in order to successfully send and receive information. These communication "protocols" allow nodes to understand the meaning of messages on the network. We generally do not define any specific communication protocol in theoretical network studies, though we do assume that one exists.

### Protocols as a set of behaviors

We also use the term "protocol" to refer to the set of actions nodes in a system are expected to take at any given time. Since node behavior defines the overall properties of a system, it's this protocol that we must now construct. Our primary goal, as previously noted, is to ensure that nodes be able to come to agreement about a particular set and ordering of events. We therefore come to call this construction a "consensus protocol."

## Handling Crash Faults

Let us briefly restate our problem so that we can analyze some initial barriers. We have a distributed system of `N` nodes. Our goal is to develop some protocol that guarantees the nodes will, after some amount of time, come to agreement about a particular ordered list of "events." Active nodes must be able to come to agreement even when other nodes may be faulty. At this point, we are only interested in making our protocol resistant to crash faults. That is to say, nodes either follow the protocol perfectly or do not function at all.

### Limits of crash-fault resistance

Though such a system needs to be maximally resistant to faults, there is a theoretical limit to the number of faults we can handle. We would clearly have a problem achieving much of anything if 100% of nodes were to become faulty. Research into this problem found that these crash-fault tolerant systems could sustain up to `n/2 + 1` failures. We often represent this number alternatively through the lens of the total number of nodes necessary given a certain number of faulty nodes, `f`, as `2f + 1`. One intuitive way of understanding this boundary is that if 50% of nodes were allowed to become faulty, then we could split the network into two segments that simply think the other half is faulty and may continue to operate in conflict.

### Understanding these limits

The basis of a crash-fault tolerant system is that a certain threshold of nodes must come to agreement about an operation before the operation is actually executed. One of the simplest methods for reaching this agreement is to hold a vote. Conveniently, since we do not expect malicious behavior from our nodes, we can assign a single node to manage the entire voting process without fear of tampering. This node will send out events to vote on, tally up votes on particular events, and notify nodes of any relevant results. Our only core requirement is that nodes will never execute an operation unless `n/2 + 1` nodes have voted to do so.

Another way to look at this `n/2 + 1` requirement is to imagine the following scenario. Let's say that `n/2 + 1` nodes voted for event `x` to be `y`. Now assume that at a later time, `2/n + 1` nodes voted for event `x` to be `z`, a contradiction of the previous vote. In order for this to have happened, `n` nodes must have made `n + 2` votes, meaning at least one node made a contradictory vote. Since nodes cannot make contradictory votes under the crash-fault model, we can safely assume that this could never happen. Therefore, once `n/2 + 1` nodes vote for a particular event, the system will never include a contradictory vote.

### Modern applications

This model of fault-tolerance through voting between machines is still extremely popular today. Services like Apache ZooKeeper and etcd have vastly simplified the process of deploying these systems. Many large organizations use crash-fault tolerant networks to store important information.
