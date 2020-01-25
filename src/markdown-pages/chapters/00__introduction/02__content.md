---
path: "/chapters/introduction/content"
title: "Content"
---

```text
DRAFT STATUS: 0/5
```

Eth2 is a sprawling technical subject with lots of moving parts. In writing this book, we've attempted to present the concepts behind Eth2 in a manner that most easily communicates complex subjects. The content flow of this book has been designed to primarily target readers without deep knowledge of Eth2. As a result, readers more experienced with Eth2 may find the flow somewhat in contrast to the way in which Eth2 has been previously presented.

For more experienced readers, one will find that this book attempts to avoid presenting Eth2 in lens of the various development phases (discussed in depth later). Existing resources have usually presented in the lens of these phases and introduced technical subjects in the order that they will be introduced in production. However, we've chosen not to follow this flow for two primary reasons. First, the development phases are really only meant for the process to reach production. Once the phases are complete, they will effectively be meaningless to a reader hoping to understand Eth2 in depth. Second, the certain phases add functionality to components introduced in previous phases. As a result, a phase-based approach would have to continuously update explanations of elements left out in previously explained components. 

Instead, this book attempts to explore Eth2 as a whole, as it will exist once the phases are complete. Even this introductory section will have to be updated once the phases are complete! Our content is, to this end, structured as follows.

We first begin our exploration into Eth2 with an overview of Eth1. It's quite important to understand the key components and limitatations of Eth1, mainly because these  informed many of the design decisions of Eth2. Furthermore, this allows us to introduce core blockchain concepts in a familiar manner before going into the more unfamiliar territory of Eth2. We recommend reading through the entirety of this section to refresh your understanding of blockchain systems, even if you are relatively comfortable with our knowledge of Eth1. Importantly, it defines certain terms and concepts that we build upon when we introduce Eth2. We also use this section to explore the concept of scalability, which will be important when understanding Eth2.

After our Eth1 overview, we move into Eth2. We begin with an introduction to Eth2 at a high level, attempting to give a birds-eye view of the system before diving into details. We introduce in a basic sense the various components of Eth2, which gives us a picture of the system as a whole that we can fill in later in the book. This provides an intiuition for Eth2 that can be useful reference when discussing particular elements of the cosntruction.

Next, we move into a detailed explanation of Eth2's Proof of Stake protocol. This is likely one of the most difficult components of Eth2 to fully comprehend, as it uses many novel techniques not seen in Eth1 and differs very much from its predecessor. We first introduce Proof of Stake as a theoretical construction, explaining the various components that would allow an Eth2-like system to function. This section avoids the specifics of the implementaiton of this protocol as found in the Beacon Chain.

Once we cover that, we look at the specifics of the Beacon Chain. This completes the exploration of Eth2's Proof of Stake by showing how it's implemented in practice in a real chain. This section effectively follows the current specification for the Beacon Chain and looks back at our explanation of PoS in order to explain why certain features of the Beacon Chain exist and what they do. We look at the specific structure of the blocks that make up the beacon chain, as well as the role of the users who maintain the chain and what these users need to do in Eth2.

The first release of this book ends after this section. Future releases of the book 