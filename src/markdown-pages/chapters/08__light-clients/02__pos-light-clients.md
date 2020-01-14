---
path: "/chapters/light-clients/pos-light-clients"
title: "Light Clients and Proof-of-Stake"
---


In Proof of Work, this is somewhat easier because everything that we need to get a sense of validity of a block is stored in the block header, mainly the work which we can verify by hashing the header. This acts as a solid proxy for the validity of the block. 

Unfortunately this is harder in Proof of Stake since there is not such a clear proxy. We need to figure out two questions, how do we get updated "trusted" roots and how do we do this succinctly? So the key insight here is that if we get 2/3rds of stake on a given block, then we can trust all previous blocks. However this requires that we actually know who's validating, which means we need to build up a sense of the true validator set.