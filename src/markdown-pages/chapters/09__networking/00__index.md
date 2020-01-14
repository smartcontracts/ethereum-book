---
path: "/chapters/networking"
title: "Networking"
---


networking is critical for any blockchain system, mainly peer to peer networking. Without a network, there's no way to communicate. Without communcation, there's no way to agree about things or even talk about what we want to agree about. 

We want peer to peer networks because theyre more resilient to attack. The idea in a server-client system is that there's a direct connection between two parties where the server sort of acts like a hub for connections. This is vulnerable to attack because if the server goes down, the whole system goes down. Instead, we want a system where every node is pretty much equal and therefore the network can recover around failures.

Networks usually consist of two pieces. There's a physical component, which is the wires or communication links between nodes (wires, wifi, whatever). Then theres a logical component (protocol) which determines how people can talk to one another. Just having wires means nothng. If I send you morse code, you dont really know what it means unless you understand morse code. Plus, you also don't know what it means unless you understand english too. Same idea. We come up with a basic system for sending messages (packets) and then we come up with a protocl on top. 
