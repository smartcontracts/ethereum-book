---
path: "/chapters/blockchains/open-access"
title: "Open Access"
status: "0"
---

## Outline
- Issues with earlier systems highlight problems of centralization
    - e-Gold shutdown
    - Beenz investigation
- Realization that distributed systems could apply to cash
    - Computers can share a ledger
    - Database transactions map to financial transactions
- Access
    - Open access crucial to a financial system
    - Existing systems based on known identities with voting power
    - Unclear at the time how to keep fixed identities without a central entity
- Open systems
    - Simply opening up the system creates problems with sybil attacks
    - Solutions to sybil problems found in related research into emails (hashcash & co)
    - Realizations that a similar system could be used for cash, just needed to figure out how to apply it

---

This model of open access was not immediately compatible with traditional byzantine fault tolerant protocols. One fundamental problem was that an attacker could create virtually unlimited identities on the network, pretending to be different unique participants. Without a method to clearly assign an identity to a verifiable human, there was no apparent way to prevent this attack. To this day, the problem of assigning unique digital identities without the need for a third-party (e.g. passport assigned by the U.S. government) remains an extremely difficult and, by many standards, unsolved problem.

A solution to this dilemma was found in research related to the prevention of email spam. In fact, spam prevention is, in many ways, a challenge directly related to the prevention or detection of "sybil identities" created by malicious spam producers. The basic mechanism employed here was to require that the sender perform some sort of verifiable computational effort in order to send a message. This effort had to be verifiable in the sense that the recipient could easily confirm to a high degree of certainty that the effort had been performed. 

The theoretical basis of such a system was not to perfectly assign digital identities to real people, but to significantly increase the cost of spam email. If a single email expended 1c of electricity, then an attacker would quickly rack up quite the bill to send thousands or even millions of emails. Such a system could even be tuned by the user to remove or reduce costs for whitelisted addresses.

Researchers quickly realized that a similar approach could enable "indirect" identity verification on a digital money system. Instead of needing explicitly assigned identities, users could participate in consensus by expending computational effort. The weight of a user's influence over the system would be measured not by their number of identities but by their expended computational effort. As a result, an attacker could no longer gain an advantage by creating multiple identities.

Even if such a system could manage to skirt the need for explicit identities, it would face further dilemmas. Traditional BFT protocols called for some node to act as the "leader" and to propose a change in the network. Since participants were known in advance, these protocols would explicitly assign nodes to act as leaders, usually for some fixed period of time. Without known participants, the digital money protocols needed some new way to determine a leader at any given point in time.

These systems settled on a model that satisfied the goal to attach influence to expenditure of computational resources. Participants would effectively participate in a continuous lottery system to determine the next leader. During each round of the lottery, participants would repeatedly search for some given target hash. The random nature of the hashing process guaranteed that, on average, a user's odds of winning are proportional to their percentage of total resource expenditure.