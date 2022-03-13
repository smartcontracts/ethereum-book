---
title: "Byzantine Faults"
---

# {{ $frontmatter.title }}

Although crash-fault tolerant systems are heavily used in production applications, they sometimes prove insufficient for the task at hand. Smaller projects may be able to assume that nodes will always behave according to protocol. However, once a system becomes highly valuable, the attack landscape shifts. Perfect protocol implementations may prevent unintended node behavior, but they do not prevent an attacker from gaining access to the machines on which nodes are running. Even with strong security practices, almost any system could be compromised, at least to some extent, by a malicious adversary.

It's possible to use simple crash-fault tolerance in the face of this problem, though this introduces less-than-ideal scenarios. For instance, a system could recover from an attack by reverting to a previous state. Of course, this relies on the existence of backups not yet compromised by the attacker and additionally results in a potentially massive service disruption. Research effort was, as a result, expended in the search for protocols that could provide native resistance to the presence of malicious nodes. This problem proved difficult enough to spur the development of an entirely new field of research.

The problem space for systems robust to actively malicious nodes was summarily defined in a famous 1982 paper entitled, "The Byzantine Generals Problem." Within this work, Robert Shostak, Marshall Pease, and none other than the aforementioned Leslie Lamport present an entertaining abstraction of the problem in the context of a Byzantine army surrounding a large city. The author's rendition of the underlying elements in such a network became so strongly connected to the space that resulting protocols came to be known as "Byzantine fault tolerant."

"The Byzantine Generals Problem" describes a fictional scenario in which a Byzantine army is attempting to execute a military maneuver around a vast city. The army is broken out into divisions, each of which is controlled by a general. Some of these generals are "loyal" and will always follow their prescribed protocol, while others are "traitors" and will attempt to actively manipulate the system to the greatest extent possible. The paper attempts to develop a protocol that allows loyal generals to agree on a unified battle plan, even in the presence of traitors.

The authors give a few more constraints to further flesh out the problem. Generals communicate with one another via messenger, so we can clearly expect some time to elapse between send and receipt. One of the generals is assigned as the "commanding general" and is responsible for sending out initial orders. All other generals are referred to as "lieutenant generals." Any general, whether a lieutenant general or the commanding general, may be a traitor. Given this additional context, the exact problem statement from the paper is:

A commanding general must send an order to his `n - 1` lieutenant generals such that:

1. All loyal lieutenants obey the same order.
2. If the commanding general is loyal, then every loyal lieutenant obeys the order he sends.

Under this more challenging model, traitors can, for instance, lie about the orders they received in an attempt to trick loyal generals into acting on conflicting orders. Unfortunately, this reduces the number of faults the system can sustain in comparison to crash-fault tolerant systems. The authors demonstrate that with three generals, a single traitor can cause a total failure. Let's take a look at a sketch for this proof.

A three-general army has one commanding general and two lieutenant generals, here depicted as `c`, `l1`, and `l2`. If our traitor is a lieutenant general, then the loyal lieutenant may receive conflicting orders:

However, the loyal general may see the same exact set of messages if the commander is the traitor:

Since `l1` sees the same messages in both cases, there's no way for `l1` to determine which of the generals is a traitor. This holds, without less of generality, for `l2`. As a result, the loyal generals are unable to find one another and come to any agreement about the correct order to execute.

The paper later shows that if there are `n` traitors, there must be at least `2n + 1` loyal generals for the system to function properly. This requirement stems from the lack of a trusted "coordinator" available to make generals aware of their own orders and orders given to others. Previously, in our discussion of crash-fault tolerance, we assigned a node to manage the voting process, something quite similar to the commanding general in this new scenario. However, as the commanding general may be a traitor, loyal lieutenants cannot simply trust the commander's messages.

Instead, the lieutenants must communicate directly with other generals in order to make a decision. The paper describes two solutions that both rely on this sort of direct communication between generals. For now, we'll assume that a general may communicate directly with any other general, i.e., the generals and their communication lines form a completely connected graph. Each solution effectively requires that, upon receiving an order from the commander, lieutenant generals share their orders with all other generals.

The difference between the two presented solutions lies in the use of cryptographic signatures in the second. These signatures make it impossible for a traitor to forge a message from another general. Most modern systems use this technique, so we'll explore the basic elements of this solution now. We follow a two-step process in which the commander first distributes orders to lieutenants, and lieutenants then share their received orders with all other generals.

If the commanding general is loyal, this protocol can relatively easily find a common order for loyal generals. Since traitors cannot forge an alternative order, the loyal lieutenants will only see a single order given by the commander. With only one possible order, the lieutenants will end up executing the same action.

If the commander is a traitor, more formal reasoning is necessary to see the correctness of the system. It's possible that a general sees two conflicting orders from the commander. This general now knows that the commander is a traitor, but must still come to agreement with all other loyal lieutenants. We handle this scenario with a deterministic function that defines how loyal lieutenants should act when given a list of possible actions. We can therefore still execute a common order as long as we can guarantee that all loyal generals receive the same list of possible orders.

A traitorous commanding general could coordinate with other traitors to attempt to give loyal generals different sets of orders. For instance, the traitors could choose to only send the conflicting order to half of the loyal generals. Without further communication, the loyal generals would not act in unison. We can provide a simple solution by requiring that loyal generals relay conflicting orders to all other generals. After this second round of communication, all loyal generals are guaranteed to share the same information. The paper shows that we can achieve the same result if loyal generals only relay orders with less than `f` votes, where `f` is the maximum number of traitors that can be safely handled by the system.

One way to understand the `3f + 1` general requirement for `f` traitors is again through the lens of a "threshold" for carrying out an action. In the context of crash-faults, we needed a threshold of `n - f` votes in order to make a decision. Since crashed nodes could not vote, we could derive that all of the `n - f` votes came from properly functioning nodes. When the faulty nodes, in this case our traitorous generals, can actually contribute to the vote, we must increase the threshold to effectively discount the possibility of malicious votes.
