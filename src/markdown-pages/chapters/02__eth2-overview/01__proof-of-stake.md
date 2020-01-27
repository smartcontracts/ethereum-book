---
path: "/chapters/eth2-overview/proof-of-stake"
title: "Proof of Stake"
---

```text
DRAFT STATUS: 1/5
```

Proof of Work blockchain protocols have faced significant backlash in the past several years. Many critics point to the protocol's excessive energy consumption as cause for concern over its long-term sustainability. At the time of writing, for context, Proof of Work mining on Bitcoin alone consumes power at an annual rate comparable to that of the country of Austria. Such a wasteful protocol is likely to find little sympathy in the modern socio-political reality of global warming.

Proof of Stake is an alternative to Proof of Work that attempts to minimize energy consumption and simultaneously increase overall protocol security. The fundamental basis of Proof of Stake is the replacement of implicit measures of capital investment ("work") with explicit ones. Instead of miners with thousands of machines, Proof of Stake systems utilize validates who explicitly lock capital into the system.

Proof of Stake models are not all alike, however. Many different Proof of Stake systems were developed prior to the onset of serious Eth2 development. Eth2 uses a unique Proof of Stake protocol that follows from a strong design rationale. The key principles of this rationale, detailed below, are intended to ensure that Eth2 remains useful and relevant far into the foreseeable future.

## Eth2 Design Rationale

### Simplicity
Eth2 strives to be as simple as possible while still maintaining a sufficient level of utility. Simplicity has impacts on various levels of the Eth2 ecosystem. Critically, it reduces the cost to understand and develop implementations of the protocol. This additionally reduces the risk of security flaws in either the protocol itself or a specific implementation thereof.

### Stability
Eth2 is designed to remain relatively unchanged for a long period of time. Changes to a blockchain base layer require wide-spread agreement and carry significant social costs. Changes of this scale to a project as influential as Ethereum are, as of Eth2, entirely unprecedented.

### Sufficiency
Somewhat along the same vein as stability, Eth2 is constructed to support a maximally wide class of applications. This requirement ensures that Eth2 is genuinely useful for most users and that additional changes are not needed to support common use-cases.

Blockchain systems must find a balance between complexity on the base layer and application layers. If the base layer is too simplistic, then applications must often replicate seemingly basic functionality and bear the cost of increased complexity. Eth2 purposefully pushes certain functionality onto the base layer as to reduce overall complexity on applications.

### Security
Users expect their financial services and providers to be robust to attack, and Eth2 is no exception. The Eth2 protocol attempts to take into account as many potential attack vectors as possible. Much of Eth2 has been constructed from the ground up to be provably secure under a number of common and uncommon network conditions.

### Accessibility
Eth2 tries to maximize accessibility with support for efficient light clients. This requires certain protocol features be specifically designed with light clients in mind. Improved accessibility brings Eth2 closer to the vision of "Ethereum Everywhere," even in the context of resource-constrained environments.

From these principles, Eth2 has developed an intuitive Proof of Stake protocol that provides several major advantages over Proof of Work. Particularly, Eth2's Proof of Stake is more energy efficient, more robust to centralization, and generally more secure than its Proof of Work predecessor. Many of these advantages stem from the ability to actively punish misbehaving validators, as we will discover in our deep-dive of the protocol.