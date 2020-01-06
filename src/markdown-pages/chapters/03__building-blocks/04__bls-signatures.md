---
path: "/chapters/building-blocks/bls-signatures"
title: "Signatures: BLS"
---

Cryptographic signatures are a key component of any blockchain system. If you've ever interacted with a smart contract or sent crypto to someone, then you've created a cryptographic signature.

Signature schemes tend to follow a very standard structure. In order to create a signature, a user first needs to generate a cryptographic "private key," a secret piece of information not meant to be revealed to anyone else. Then, that user generates a corresponding "public key" and distributes this to other users. When the user wants to create a signature, they perform a mathematical operation with the message and their private key. Other users can then use the public key to verify that the signature did, in fact, come from the corresponding private key.

Validators need to create signatures in order to vote on checkpoints or attest to the validity of blocks. However, traditional signature schemes are simply too slow to handle the number of signatures these validators will be creating. ECDSA signatures, used by Eth1, take two seconds to verify and each occupy a space of 65 bits. We expect Eth2 to have at least approximately one million validators. All of these validators vote within each epoch using traditional ECDSA signatures, then we'd spend almost half an hour simply verifying each signature and each block would be filled with over six megabytes in signatures alone. We might be able to reduce this time by processing signatures in parallel, but this further increases the barrier to entry to any would-be validator.

## BLS to The Rescue
The BLS signature scheme is a novel way to create signatures, developed by researchers at Stanford. BLS is, primarily, so useful because it allows users to efficiently "aggregate," or combine, their signatures.

BLS aggregation is more efficient when the various different signatures all reference the same message. 