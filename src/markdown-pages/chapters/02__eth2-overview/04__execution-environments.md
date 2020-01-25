---
path: "/chapters/eth2-overview/execution-environments"
title: "Execution Environments"
---

```text
DRAFT STATUS: 0/5
```

Eth2 introduces a model of Execution Environments, which is different from the EVM we are familiar with. Basically, instead of one fixed virtual machine, we have a system that allows people to develop their own virtual machines. Each machine is called an Execution Environment or EE. These environments are written and compiled into an assembly language called Ewasm. Anyone can deploy their own EE as long as they pay some value for doing so and a rent for continuing to operate.

EEs can really be anything. Someone could build an EE that duplicates the functionality of the EVM. Simiarly, someone could build Bitcoin Script as an EE. Basically, it defines what sort of applications users can build. This gives us much more flexibility than the EVM because we can try out new models outside the EVM and aren't restricted to only the functionality provided by that one EVM. We can also use this sort of system to upgrade an EE and just move balances into an upgraded EE if this is desired by users. Basically, it's a new way of doing things that goes even further than the EVM to be general purpose.

We can have more than one EE per shard. EEs can be built to interact with one anther. By sending messages to one another on the same shard or on different shards, EEs can pass information and transfer assets to one another. This is very flexible.

We explore the details of EEs, their operation, applications in Eth2, and more later in the book.