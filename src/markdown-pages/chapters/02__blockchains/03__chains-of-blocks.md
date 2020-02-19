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
So the magic realization was that the same process of hashing used in the email thing could be applied almost directly to the proposal process. The gist here was a few parts. First, it was clear that there still needed to be some proposal process. Someone had to be proposing new changes to the shared ledger. But who? Well, we can let the hash power decide basically. This was similar to leader elections in BFT, whereby a node would be selected to propose changes to the system. In that case, nodes were usualyl all equals and would be decided randomly. In this case, the decision had to be weighted by the hash power of the node.

Originally we might think that we could do a "race" in which people ahve to do a certain amount of work in order to earn the right to produce blocks. However, this has the obvious flaw that the person with the most resoruces would always win the race since they could always do that amount of work the fastest. We actually wanted a system taht would for instance give someone with 5% of hash pwoer the right to propose changes 5% of the time on average.

Conveniently the method devised for email spam prevention could be used in this case. The idea was that instead of doing a certain amount of work, the people would have to do a hash on a value to hit a certain target hash. Since hashes are random, anyone could theoretically find the target hash first. The probability that someone finds that target hash first depends directly on the amount of hash pwoer they have. As a result, we have a good system that allows people to "win" the right to propose changes proportionally to their hash power.

Second of all this is a lot of money being burned to do this computational effort. People aren't just going to do this for free, there needs to be some reason to do it. So these systems were designed to reward people for their effort with some amount of digital currency generally reflective of the amount of work they did. this is discussed later mroe.

Finally, an important thing was that work had to be tied to a specific update. Basically the issue here was that rewards had to be paid out to users for being proposers. Eahc time the proposer is chosen, they need to do more work. If the same ticket could be redeemed to make two different proposals, then the proposer just got paid twice for only doing work once.

Furthermore, there was a necessity for updates to be sticky and not be easily removed from the system. Since otherwise, someone could make a payment, receive product, and then manage to "wipe" their payment out of existence possibly by making an alternative payment. This is called the double spending problem and it's an issue because thre's no way to tell which payment was made "first." Instead we introduce an ordering mechanism whereby each new update references a previous update. We'll talk a little mreo about how this solves the double spending issue in the next chapter.

But this requirement of a reference to a previous update creates a "chained" system in which updates always reference a parent. It's possible for two updates to reference the same parent, which means we have a fork or multiple possible pathways to go down. In the next section we talk about how clients pick between different forks and how this relates to the double spending issue.

We know it's possible for two different updates to reference the same parent update. Our mechanism for resolving forks is going to help us ensure that most of the time people won't do this purposefully, though they can try. However, there are cases in which this can happen accidentally. This happens more frequently as the ratio of the speed of new updates to the latency of the network increases. Let's understand why.

See, the reward that someone gets for proposing an update should generally reflect the amount of work they put into creating that proposal. We can sort of approximate that amount of work by the value of the things going on inside the update. We haven't talked about what these updates look like yet, but don't worry. If there's just a single update, for instance, it migth just be someone sending a small amount of currency. Maybe $1. So this means the reward to the miner should be relatively small. However, this also means the amount of work done should be relatively small. As a result, it takes very little time to find a winning ticket.

Since it takes little time to find a winning ticket, many people might find tickets before they even see winning tickets attached to proposals from other people. The resutl of this is that many people create updates at the same time, and now we have a big messy set of forks to choose from. This genrealyl creates a bunch of junk on the network and it's annoying to deal with. We don't want to send around that much ifnroamtion if we don't need to.

Instead, we make our updates bigger and more valuable. How? By collecting transactions into block updates; blocks! By colelcting many transactions, we increase the value of our update and therefore the reward and the amount of work necessary. As a result, it's much less likely that two people will find winning tickets at around the same time. Generally, this relationship holds and with smaller frequent blcoks we get more of these "ommers."

So now we're getting there. We have these blocks of updates (transactions) that get mined and must reference a previous block of updates. Since they're referencing previous blocks, we get chains!

So by having larger groups of udpates at the same time, we reduce the amount of uncles. One intersting hting here is that comptuers always get better over time, so it becoems easier to do the same amount of work with less resurce expenditure. To ensure that resource expenditure remains constant over time, we have a mechanism of difficutly adjustment that continuously updates the target based on the amount of time it took to find previous blocks. This way we gradually adjust so we don't have a situation in which a block can be created very fast and therefore once again breaks our requirements. 

Also it's not really mentioned elsewhere in this book, but it's worth also noting that this block stuff isn't actually *necessary*, it's more just a convenience. There are systems that do this sort of update on a per-transaction basis instead of blocks of transactions and allow a larger picture to covnerge over time, like iota and whatnot. These are usualyl called DAG systems and they're a lot more complicated than blockchains, so it's understandable that early systems made use of this and honestly that they continue to make use of it now.

---
