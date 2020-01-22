---
path: "/chapters/proof-of-stake/weak-subjectivity"
title: "Weak Subjectivity"
---

Casper FFG guarantees that $\smash{\frac{2}{3}}$ of validators have made a decision about the chain that they will not revert later. Whenever a client sees a new finalized checkpoint, they will never accept a fork from before the checkpoint. Clients are effectively immune from long range attacks because they've received a promise from validators in advance.

However, we face one final, fundamental dilemma. An attacker might not be able to trick existing clients into accepting a conflicting promise. Unfortunately, the client must determine the validity of a promise for themselves. A new client that wasn't online when the first promise was made has no way to tell between the "real" and "fake" promises.

This dilemma sits at the heart of Proof of Stake. Termed the "weak subjectivity problem," it requires that anyone offline longer than the time for $\smash{\frac{2}{3}}$ of validators to withdraw their funds rely on some external source to determine the "primary" chain.

```text
TODO: Need to finish this section about weak subjectivity.
```