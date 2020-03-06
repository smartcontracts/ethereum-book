---
path: "/chapters/blockchains/chains-of-blocks"
title: "Chains of Blocks"
status: "0"
---

## Outline
- Realization that hashing could replace leader election
    - Mirrors process in traditional BFT
    - Each update to the system requires winning a lottery
    - Winner rewarded financially for their effort
    - Ticket must be tied to update and to previous state, or same ticket could be used for multiple updates
- Possible for multiple to find ticket around the same time
    - Impossible to tell who won "first"
    - Leads to concept of forks, multiple possible pathways
    - Brief note on fork choice rules in prep for next chapter
- Reward tied generally to "value" of things happening within the update
    - Small, frequent updates means not worth giving high reward, means needs to be easier to find winning ticket
    - Easier to find winning ticket means more likely for multiple to find ticket around the same time
    - Instead, bundle transactions into larger "blocks" that take longer to find.
    - Difficulty adjusts automatically to maintain a constant rate of blocks
    - Note that some chain systems do actually use DAG approach
- Since blocks refer to their parents, we get "chains"

---

Proof-of-Work provided researchers with a useful building block with which digital money systems could be constructed. At its core, the mechanism made it possible for people to prove that they'd expended a given amount of resources in the form of the electricity and wear necessary to find a given partial collision. Moreover, this proof could be easily verified without the need to communicate with the user who created the proof.

Additionally, the ability for someone to generate such a proof was linked directly to their access to adequate physical resources. That users weren't required to register with any specific governing body was strongly in alignment with the early decentralized mentality. Individuals could produce these proofs as long as they were participants of some society willing to secure their ownership of the necessary machinery. If Proof-of-Work could somehow act as a replacement for "voting power" in a fault-tolerant system, it would satisfy most of the qualities of the "ideal" decentralized digital currency.

Fault-tolerant systems up to this point relied on the existence of some "leader" or "proposer" responsible for presenting new transactions to the network. However, designated "leaders" were in clearly conflict with the concept of decentralization. Early models for decentralized currencies therefore rejected the notion of a single "proposer." Instead, any participant could propose new transactions and broadcast them to other nodes on the network.

Existing fault-tolerant systems also relied on a voting process in which nodes would come to agreement about the set and ordering of all transactions. Here, Proof-of-Work would find its place as a replacement for the "voting power" of each node. Votes would reference the result of some previous update to the system and additionally reference some new update. For instance, if each update corresponds to a single transaction, the vote might contain the hash of the previous update and the hash of the current new transaction. Nodes would attach "voting power" to these votes in the form of Proof-of-Work, where the input to the Proof-of-Work function would be the vote itself and an extra field, called a nonce, that could be modified until a desired partial collision was found.

```
TODO: Clean up the above paragraph, add diagrams, explain genesis blocks, tying hash power to specific updates, rewards.
```

Unfortunately, earlier voting models from research into Byzantine fault tolerance could not be easily adapted to make use of Proof-of-Work. Most BFT systems made use of a series of "voting rounds" in which decisions on particular transactions could be made. Rounds were feasible in a context in which the nodes, and therefore the total number of possible votes, were known in advance. Nodes could determine that they'd received some threshold percentage of votes during a round because they were aware of the number of voting nodes. Once some desired threshold, `2/3rds` for BFT systems, was reached, the nodes could be sure that a decision was made and could move on to the next transaction.

```
TODO: Clean up the above paragraph, again.
```

Under a model in which voting power is linked to Proof-of-Work, one cannot be sure that a certain percentage of total votes has been cast during a given period of time. In theory, the maximum number of votes is only bounded by the total physical resources available to all possible participants.

```
TODO: Continue, got tired.
```