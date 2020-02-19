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

Money is obviously a ubiquitous thing in this world, so it's really no surprise that people started to see if they could represent money digitally as soon as networked computing really became a thing. Once the world wide web was live, it started to make a lot of sense that finance could happen over the internet instead of needing to go to a physical location or to use cash. I mean, there's really no reason why someone wouldn't want to do this, given the obviousness of it all. So people started to do it.

Digital cash was a nice idea because it was hugely impactful, but also because it was relatively simple. The basics of financial systems are just ledgers, lists of transactions that people make. Conveniently, this was exactly the model of transactional databases. The construction of digital money was effectively just to have a database that tracked transactions and could figure out people's balances.

Another aspect to this was that finance can go hand in hand with privacy. Privacy turns out to go hand in hand with cryptography, so a lot of cryptographers became interested in finance systems that could maintain privacy for users. This sort of perfect storm meant that many people with a strong understanding of computing and the tools necessary to make digital cash were ready and willing to work on it.

The first real digital cash project was ecash developed by David Chaum, which would eventually become DigiCash. This was a pretty radical idea at the time. Basically, the core concept was a digital money system managed by a central entity. Users didn't need to register with IDs like they would with a bank, instead they just used digital signatures and could receive money with their public keys. Interstingly this is a lot of the same things we'll see later in this section, but it didn't quite hit the mark for several reasons.

Other digital cash systems started to spring up in the late 90s. There were some successful rpojects like e-gold and Beenz that really took the world by storm for a short period of time in the dotcom bubble before the whole thing just exploded. Afterwards, we still got digital money systems like venmo and paypal, among otehrs. All of these systems are effectively just databases that store user balances and record transactions between users, updating balances upon transactions. Obviously the idea of digital money was, and is, useful.

---
