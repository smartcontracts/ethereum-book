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
The thing with these money systems is that they were centralized in that they usually had a single authority with a high level of control over the system. For early systems, this proved fatal. e-Gold was shut down by the uS govt after only a few years because it was effectively operating a bank since it had been recording balances. Since the US has a strong regulation on banks and in theory e-gold could do messy things with balance sheets, it was deterined that egold should just be shut down. Similarly, Beenz faced an investigation in the uk over potential money laundering and the fact that it was probably running an unlicensed bank.

This really highlighted the belief that many shared that digital money systems need to be open and accessible in order to be useful. If a central entity had control over the system, then these people argued that the system could be manipulated by the central entity. It also left balances and accounts subject to abuse by the government, which had a history of abusing financial removal laws. Basically, there was a significant enough population that didn't trust the existing oversight system to properly run money.

Conveniently, among this group of people were the aforementioned cryptographers. Again this is the perfect storm of relatively well-to-do individuals with computer skills and knowledge about financial systems, with the ability to make a digital money system happen. Having learned from the lessons of DigiCash, a few started to wonder if there was a way to develop digital money without the need for a central entity that managed balances. Of course, there was a way.

It was already possible, in fact, to create a system that only existed as distributed between different computers. This was the distributed system work carried out in the 1980s. A few people realized that the work carried out in the 1980s on distributed systems could potentially be used to create a digital money system. Clearly if the money lived within the computers shared by a group of people, then it would be less prone to centralization and probably harder for a government to shut down.

However, the systems developed in BFT weren't really good enough for the task at hand. At least not yet. The main issue was that the digital money systems imagined needed to be open and accessible. Anyone was to be able to move money around, that was for sure. DigiCash managed this a decade earlier, though. What was really important was an open consensus mechanism, one in which anyone could join in and participate in the protocol responsible for repliating and updating the system.

BFT systems as we described earlier always assumed that the nodes in the system were explicitly known. That is to say, nodes know which other nodes are part of the system and therefore have the right to "vote" on new changes. What was being imagined here was a model in which nodes could join and leave the consensus process at will. Anyone, even a node that had never before connected to the internet, could suddenly participate without anyone else within the network stopping them from doing so.

BFT systems fundamentally relied on this state of known nodes, since each node was given an equal say in the process. We can immedaitely see what would go wrong if we allowed just anyone to join the system if each node is given the same voting power. Someone could very easily just create many different nodes and suddenly get many votes in the system! BFT protocols require that <1/3 nodes are malicious, but there's no way we can hit this guarantee if an attacker can simply create countless nodes.

This is called a sybil attack, and it's the reason for a lot of amazing developments in the late 90s and early 00s. Basically, the challenge here was to figure out some mechanism that assigned "voting power" to nodes in a way that most of the voting power was controlled by people who just wanted the system to continue running smoothly. However, we need to do this without a central entity "identifying" specific nodes responsible for maintaining the system. It would be in the weird space of email spam prevention that we would find our answer.

See, in the world of email spam we were facing a similar problem. It's just too easy to create email addresses and to send emails. A malicious party could send millions of emails every single day, stuffing up inboxes with junkmail and hiding important messages. We needed some way to figure out who was the "good guys" and who was the "bad guys." There are a lot of strategies for this, but we're interested in one in particular, the cryptographic one. Some very smart people realized that you could slow down spammers by forcing them to do computational work before sending an email. The basic gist of this system was that in order to send an email, you had to do some computational work that was provably connected to the email itself. The function was designed so that the recipient could check this work in a short amount of time. No work, no email. Now, if each email used 1c of electricity, then an attacker would be spending boatloads of money to send 1m emails (10k usd!).

See the interesting thing here was the recognition that there's no way for an attacker to somehow send more emails without expending a proportional amount of effort. Their ability to send spam was now intrinsically linked to their access to a physical resource (electricty, computers), which one couldn't really come by under the model of private property laws. Basically, since private property laws were linked to an individual, this was a way to force people to act as individual entities.

Anyway, now all that was required was a way to figure out how to adapt this concept of physical resoruce access as voting power into the realm of a distributed money system. Somehow, we had to link "resources" to "voting power" or "proposal power." 

---

Many improved versions of the protocol described in "The Byzantine Generals Problem" have been published in the decades since the paper's debut. However, the core elements of the protocol, including the use of cryptographic signatures and peer-to-peer messaging have remained largely the same. The ability for these systems to remain operational in the face of malicious nodes have made them particularly useful for critical systems in healthcare and finance, where disruptions could cause massive and long-lasting damage to society.

Even with these advantages, BFT systems remained a niche subject until a renaissance in the late 90s and early 00s changed the field forever. BFT protocols along the lines of those proposed in "The Byzantine Generals Problem" made it possible for machines connected over the internet to share a "log of events." Their use among financial institutions made obvious that such protocols could potentially underpin a digital money system. Perhaps this money system could even live exclusively within the network and remain entirely free of attachments to traditional state-operated currencies.

Although the underlying technology of byzantine fault tolerance was agnostic to the final use-case, as best demonstrated by the distributed state machine, digital money seemed to be both useful and relatively feasible at the time. Basic monetary systems would effectively require that nodes share a minimal ledger of currency transfers between users. A lightweight version of this would basically only require that nodes do some simple math for each new transfer. This core functionality alone was not particularly novel or difficult to achieve.

However, money is also a fascinating social construction that tends to carry strong and varied meanings. Proponents of the early digital money movement generally felt that such a system should be not only robust to attackers, but also open to all new participants. TO string an analogy to the Byzantine Generals problem, these individuals wanted to create a system in which anyone could become a general at any time. Primarily, the aim of such a system was to circumvent the potential problems inherent when the nodes in control of a money system are fixed and unchanging. 

This model of open access was not immediately compatible with traditional byzantine fault tolerant protocols. One fundamental problem was that an attacker could create virtually unlimited identities on the network, pretending to be different unique participants. Without a method to clearly assign an identity to a verifiable human, there was no apparent way to prevent this attack. To this day, the problem of assigning unique digital identities without the need for a third-party (e.g. passport assigned by the U.S. government) remains an extremely difficult and, by many standards, unsolved problem.

A solution to this dilemma was found in research related to the prevention of email spam. In fact, spam prevention is, in many ways, a challenge directly related to the prevention or detection of "sybil identities" created by malicious spam producers. The basic mechanism employed here was to require that the sender perform some sort of verifiable computational effort in order to send a message. This effort had to be verifiable in the sense that the recipient could easily confirm to a high degree of certainty that the effort had been performed. 

The theoretical basis of such a system was not to perfectly assign digital identities to real people, but to significantly increase the cost of spam email. If a single email expended 1c of electricity, then an attacker would quickly rack up quite the bill to send thousands or even millions of emails. Such a system could even be tuned by the user to remove or reduce costs for whitelisted addresses.

Researchers quickly realized that a similar approach could enable "indirect" identity verification on a digital money system. Instead of needing explicitly assigned identities, users could participate in consensus by expending computational effort. The weight of a user's influence over the system would be measured not by their number of identities but by their expended computational effort. As a result, an attacker could no longer gain an advantage by creating multiple identities.

Even if such a system could manage to skirt the need for explicit identities, it would face further dilemmas. Traditional BFT protocols called for some node to act as the "leader" and to propose a change in the network. Since participants were known in advance, these protocols would explicitly assign nodes to act as leaders, usually for some fixed period of time. Without known participants, the digital money protocols needed some new way to determine a leader at any given point in time.

These systems settled on a model that satisfied the goal to attach influence to expenditure of computational resources. Participants would effectively participate in a continuous lottery system to determine the next leader. During each round of the lottery, participants would repeatedly search for some given target hash. The random nature of the hashing process guaranteed that, on average, a user's odds of winning are proportional to their percentage of total resource expenditure.