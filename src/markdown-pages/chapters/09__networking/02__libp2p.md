---
path: "/chapters/networking/libp2p"
title: "libp2p"
---

Eth1 used a custom protocol called devp2p. Devp2p had many issues and so there was a big push to upgrade the system. Eth2 decided to use a newer thing called libp2p.

Libp2p is pretty cool. The main idea behind libp2p is a series of logical connections. SO the idea here is taht we sort of abstract the underlying communication line (wire, wifi, whatever) and just say we have a "connection." This is really cool because it means that nodes can communicate over any number of physical lines, including bluetooth or even snail mail (though that one might be too slow). It's robust no matter the underlying scheme. Devp2p really didn't have this idea.

Libp2p also lets us do some stuff called channels and subsriptions. Basically, on eth2 theres certain information that only some people care about. For example, block producers care about attestations, but users probably don't really care about those attestations untilt hey're actually included ina  block. A producer can simple subscribe to this whereas the user decides not to. We only need the data we care about, and its much more efficient. Libp2p introduces a very optimal algorithm for sharing messages in a gossipy way that doesn't duplicate messages over and over and introduce a lot of network lag and weight.

libp2p also lets us do a thing where peers can relay connections for other peers. For example, let's say I have a connection to Alice who has a connection to bob, but im unable to get a direct conneciton to bob. I can still communicate to bob in a secure way, and alice will just relay our messages on our behalf. Cool!

Libp2p is great but has some downsides too. It's complex and much bigger than devp2p. The spec is really big and it's also a moving target that hasn't been completely set in stone yet. We also have to implement a lot of optional components and we use non-traditional transports since we want eth2 be able to run everywhere. That said, teams have been doing a great job with the project so far and have managed to successfully implement basic interop between clients. It makes eth2 stronger! It has support from otehr big institutions and is definitely ahead of the pack in many ways.

Networks need discovery mechanisms, which basically means two things. it means you need to find which computers on the internet you can actually talk to, and it also means you need to find the capabilities of those computers. For example there might be different comptuers in the network that do different things. We could have a computer that is a validator, who has access to blocks and such, and a computer that is just watching the network for the sake of some sort of analysis. Each computer therefore needs to tell the world what sort of capabilities it has, so that other computers can ask for data or results or whatever.

libp2p uses a system called kadamelia which is ok but not perfect. Eth2 needs a better discovery mechanism so it uses a different thing called discovery v5, whicha llows for both capability advertising and topic advertising (I have acceess to this infromation). It's more flexible than kademelia and is also nice because it's shared with eth1 and reduces development cost.

We have certaint ypes of requests that peole can make for example ask for a given block by its root, ask for a range of blocks for sync.

One thing thats interesting is taht although it us under the rest of the system, we do need to coordinate any sort of forks to the networking protocol. Let's say we want to update how we advertise a given topic. If only some participants follow this upgrade, we could have a network split. Therefore not good and must coordinate forks to the same level as changing soenthing like block structure on beacon chain.
