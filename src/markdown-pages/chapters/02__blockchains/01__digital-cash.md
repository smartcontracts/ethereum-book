---
path: "/chapters/blockchains/digital-cash"
title: "Digital Cash"
status: "0"
---

## Outline
- Digital cash as an interesting use-case
    - Large societal impact
    - Relatively simple construction
    - Privacy and cryptography mix well
- Centralized systems
    - e-gold, other similar digital schemes
    - Today with Venmo and PayPal
    - Include Beenz for fun
- Early research into more "independent" systems
    - David Chaum and DigiCash (Ecash)
        - Protocol overview

---

Many improved versions of the protocol described in "The Byzantine Generals Problem" have been published in the decades since the paper's debut. However, the core elements of the protocol, including the use of cryptographic signatures and peer-to-peer messaging have remained largely the same. The ability for these systems to remain operational in the face of malicious nodes have made them particularly useful for critical systems in healthcare and finance, where disruptions could cause massive and long-lasting damage to society.

Even with these advantages, BFT systems remained a niche subject until a renaissance in the late 90s and early 00s changed the field forever. BFT protocols along the lines of those proposed in "The Byzantine Generals Problem" made it possible for machines connected over the internet to share a "log of events." Their use among financial institutions made obvious that such protocols could potentially underpin a digital money system. Perhaps this money system could even live exclusively within the network and remain entirely free of attachments to traditional state-operated currencies.

Although the underlying technology of byzantine fault tolerance was agnostic to the final use-case, as best demonstrated by the distributed state machine, digital money seemed to be both useful and relatively feasible at the time. Basic monetary systems would effectively require that nodes share a minimal ledger of currency transfers between users. A lightweight version of this would basically only require that nodes do some simple math for each new transfer. This core functionality alone was not particularly novel or difficult to achieve.

However, money is also a fascinating social construction that tends to carry strong and varied meanings. Proponents of the early digital money movement generally felt that such a system should be not only robust to attackers, but also open to all new participants. TO string an analogy to the Byzantine Generals problem, these individuals wanted to create a system in which anyone could become a general at any time. Primarily, the aim of such a system was to circumvent the potential problems inherent when the nodes in control of a money system are fixed and unchanging. 



