---
path: "/chapters/eth1-overview/evm"
title: "The Ethereum Virtual Machine"
---

Ethereum is novel w/r/t bitcoin because it adds something called the EVM. Where bitcoin was based on a UTXO system, Ethereum is based on an account model. This means that users have individual accounts which can own things, have balances, etc. We also introduce the idea of code accounts or contract accounts. 

Basically, these are accounts that are programmatically controlled. We can interact with these accounts and do things with them. We write code in a programming langauge, which is then compiled into a low-level format that is executed by a "virtual machine" called the EVM. 

This is cool because it lets you do things like contracts that will react when you send money or transactions. Note that transactions don't have to send money and that sending money is really just a form of updating things in a database. Similarly, we can send any sort of data as long as we pay for it.

Now the EVM is cool but it's pretty slow and that's one thing that we attempt to tackle in ETh2. Bassically it was custom built for Eth1 and we have done a lot of research in Eth2 to use a different base system called eWasm which is nicer and more efficient plus it lets you use mroe languages than just the custom languaes for the EVM like solidity.

Eth1 is a programmable blockchain. What this means is that Eth1 basically has a base layer that you can use to program other layers of transactions on top of it. Basically there is a "core" transaction layer that cannot be changed, but we can put code on the system that runs on top of this core. It's very flexible, meaning we can do very many different things.

So Bitcoin didnt' really have this layer. It had a basic scripting functionality. The EVM is a virtual machine. Computers are physical circuits that react to electrical pulses to perform actions. At a higher level, this allows them to read instructions and perform mathematical actions. We don't actually need the circuitry though if we can just write a program that takes the instructions and produces a result that would match what the chip makes.

EVM is such a VM. Basically it has a set of instructions and a spec for how to react to these isntructions. What this means is that transactions are not just blobs of data, but actually instrucitons to this underlying computer. 

These isntructions allow us to do various things. We have basic oeprations like sending ETH, but we have other oeprations too like creating new pieces of code that act like accounts. We write code and deploy it, and then that code itself can react to certain transactions. This allows us to build "smart contracts" effectively applications on top of Ethererum, and it's one of the most powerful features of Ethereum.
