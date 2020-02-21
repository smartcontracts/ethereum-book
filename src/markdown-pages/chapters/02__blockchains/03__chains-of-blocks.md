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
