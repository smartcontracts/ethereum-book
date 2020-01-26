---
path: "/chapters/eth2-overview/execution-environments"
title: "Execution Environments"
---

```text
DRAFT STATUS: 1/5
```

Although the EVM was a massive improvement over the fixed or limited transaction types in older blockchains, it too ultimately proved limiting in some respects. The EVM was built from the ground up as a special-purpose environment for applications on Ethereum. Certain quirks in the design of the EVM, such as the use of 256-byte words as opposed to traditional 32-byte or 64-byte words, reduced overall performance in comparison to other virtual machines. Furthermore, the EVM's custom instruction set necessitated entirely new compilers and smart contract programming languages.

Eth2 attempts to expand on the flexibility of Ethereum with the introduction of **execution environments**, often abbreviated as **EEs**. Effectively, execution environments are an abstraction of the role played by the EVM in Eth1. Under this model, users can create their own framework for the execution of code on Ethereum. One could, for instance, create an execution environment that emulates the behavior of the EVM. The EE concept is primarily intended to spur innovation in the types of software one can run on Ethereum.

Execution environments can be thought of as small ecosystems in which users and applications interact. Instances of EEs are deployed onto shards, and applications and assets exist as code and data within these instances. Many EEs can exist on the same shard, and the specific code that defines a given EE can be used within many different instances.

Execution environments can, and most likely will, be built in a manner that allows for interaction with other environments. An app on one environment could, for example, be allowed to transfer an asset to an app on another environment. These interactions will even be possible for EE instances on different shards, via some form of cross-shard communication.

For reasons related to efficiency and accessibility, all execution environments are compiled to an assembly language called Ewasm. Ewasm is a subset of the popular WebAssembly (wasm) langauge, and is, as a result, significantly more developer-friendly than the EVM. Particularly, this move to Ewasm opens the door for smart contracts written in widely used programming languages like C, C++, and Rust.

Later within this book, we deeply explore Ewasm and execution environments. We take a focused look at the components of an EE and its various responsibilities. We then additionally walk through a simple EE implementation as we come to understand the process of building and deploying execution environments.