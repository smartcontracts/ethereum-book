---
path: "/chapters/blockchains/participation"
title: "Participation"
status: "1"
---

Before we finally move onto our analysis of Eth1, it's worth introducing some new terms and simultaneously reiterating some old ones. 

Distributed systems, blockchains included, are composed of participants in the form of computers called "nodes." Nodes speak with one another over some lines of communication, and the total set of nodes and connections between them is called the "network." 

Nodes may participate in the consensus protocol if they choose to do so. We often refer to these nodes by special distinguishing term. One will typically see these nodes called "miners," "validators," or "block producers." The term "miners" tends to be more popular within Proof-of-Work blockchains like Bitcoin or Eth1. 

Nodes that interact with the system but do not participate in the consensus process are usually simply referred to as "nodes" or "clients." We do, however, make a distinction between nodes depending on their capabilities. "Full nodes" download and maintain all information necessary to assert the validity of the system state for themselves. Full nodes execute all transactions in order to compute the current state. Block producers are almost always expected to run full nodes. 

Many implementations of full nodes for blockchain systems will begin to throw away, or "prune," old information after a certain amount of time. For instance, if one transaction modifies a value within a contract and another transaction later rewrites the value, a full node may choose to eventually delete their record of the first transaction. Time windows for deletion depend on the amount of time after which the node believes it's extremely unlikely for a fork to occur. Eth1 full nodes begin to prune information after something on the order of 1000 blocks. 

"Light nodes," or "light clients," only maintain a subset of transactions within the system. Light clients are typically reliant on full nodes for access to the information necessary to execute any arbitrary transaction. As a result, light clients are not entirely self-sufficient. Light clients are useful in the context of resource constrained environments, like phones, where running a full node might not be feasible or even possible. 
