---
title: "Common Terminology"
---

# {{ $frontmatter.title }}

We now direct this chapter into a more detailed analysis of the construction of fault-tolerant distributed computing systems. We begin this study with definitions of certain key concepts used in the specifications of these systems. Exact terminology employed within this book is, whenever possible, faithful to original language of "the literature," and may occasionally rather poorly summarize underlying concepts. We attempt to provide additional context and exposition when we find this to be the case.

## Nodes

Our brief history of fault tolerance thus far has referred in passing to concepts like "computers" and "networks," among others. These are, in practice, highly technical and varied elements. Computers can be constructed in countless ways and still achieve the goal of "computing." One can verify this statement within the span of a brief journey to the nearest electronics store. Physical network connections are similarly diverse in both form and function. It's for these reasons that the field of computer science has developed useful conceptual abstractions that smooth out differences between real components.

Computers are, unsurprisingly, the foundation of computational systems. However, it's not necessary that the entities interacting within a networked system operate on distinct hardware. Indeed, computer hardware has been capable of running multiple processes in parallel since the mid-20th century. Computer scientists therefore often refer to "nodes" as abstractions of computers on a network. Nodes can be thought of as unique entities on a network that have some computational processing power and access to local memory storage.

## Networks

Communication lines between computers are similarly abstracted to remove any notion of an underlying physical medium. Whether information is transferred via electromagnetic waves, sound waves, or even carrier pigeon makes no difference to our analysis. We instead depict "logical" connections between nodes, over which nodes can send distinct packets of information called "messages." We further assume that some unknown amount of time must elapse between the moment that a message is sent and the moment at which it is received.

Lines of communication are necessary but not sufficient for collaboration between nodes. Just as humans need languages, nodes must share a vocabulary of sorts in oder to successfully send and receive information. These communication "protocols" allow nodes to understand the meaning of messages on the network. We generally do not define any specific communication protocol in theoretical network studies, though we do assume that one exists.

## Protocols

We also use the term "protocol" to refer to the set of actions nodes in a system are expected to take at any given time. Since node behavior defines the overall properties of a system, it's this protocol that we must now construct. Our primary goal, as previously noted, is to ensure that nodes be able to come to agreement about a particular set and ordering of events. We therefore come to call this construction a "consensus protocol."
