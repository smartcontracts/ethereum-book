---
path: "/chapters/blockchains/chains-of-blocks"
title: "Chains of Blocks"
status: "0"
---

However, this lottery system could not simply assign the winner as leader for a certain amount of time without also introducing the possibility that the winner's proposed changes go entirely ignored. Instead, he winner would actually perform their work on a reference to a specific set of proposed changes, and would publish these changes along with their winning lottery ticket. It's important to note here that proposed changes necessarily had to point to the state being changed. This prevents, for instance, two conflicting changes from being executed on the same state. However, this presents an interesting problem in that it's possible for two users to win the same lottery. In this case, participants may have different views of the network. Generally, the less amount of time the lottery takes, the more likely that we have multiple winners. It therefore makes sense to extend the lottery time to reduce the chance of having multiple winners. When the lottery time is high, we want to put many changes within a single proposal or the system would be unbearably slow. As a result, we get blocks of transactions.
