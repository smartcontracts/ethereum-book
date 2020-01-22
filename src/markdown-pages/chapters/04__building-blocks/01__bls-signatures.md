---
path: "/chapters/building-blocks/bls-signatures"
title: "BLS Signatures"
---

```text
DRAFT STATUS: 1/5
```

## Signatures 101
Cryptographic signatures, or simply "signatures," are a key component of any blockchain. If you've ever interacted with a smart contract or sent crypto to someone, then you've created a signature!

Signatures are pretty much what they sound like. Much like physical signatures, cryptographic signatures are meant to act as "stamps" that can be attached to digital messages. Just as physical signatures rely on a "secret" (your chosen method for scribbling your name onto paper), cryptographic signatures rely on a "secret" in the form of a "private key."

Unlike with physical signatures, however, we don't actually reveal this private key when we create a cryptographic signature. Instead, all private keys have an associated "public key" that can be used to verify that a given signature comes from the corresponding private key, without revealing anything about the private key itself.

![Wholesome Signatures](./images/bls-signatures/wholesome-sigs.png)

## Signatures in Eth2: A Conundrum
Validators create attach signatures to their blocks so that other users or validators can easily assert the block's veracity. Validators also attach signatures to other actions that they perform as part of their duties on the Beacon Chain.

Traditionally, we haven't had much of a problem determining which *specific* signature scheme to use in a blockchain system. Most blockchains today use an algorithm called the "Elliptic Curve Digital Signature Algorithm," or ECDSA for short. It's a bit of a mouthful, so you don't really need to memorize that one. ECDSA signatures are relatively small (65 bytes, less space than the amount of data taken up on your computer by this sentence) and quick to verify (on the order of a few milliseconds). 

Eth2, however, is designed to operate at a scale significantly higher than that of traditional blockchains. We sometimes run into situations where we need to verify hundreds of thousands, of not millions, of signatures within a single epoch. At 65 bytes and two milliseconds per signature, it'd take six megabytes of storage and a full *30 minutes* to verify one million ECDSA signatures. Our Beacon Chain deserves better.

## BLS to The Rescue
Researchers at Stanford, yes, the same ones who came up with VDFs, created a novel signature scheme that makes Eth2 possible. The "Boneh-Lynn-Shacham," or BLS, signatures are, in many ways, just like the traditional signatures used in other blockchains. However, they provide two key properties not found in other signature schemes.

BLS signatures allow us to combine any number of signatures on any number of messages into a *single* signature with a constant size. Although these signatures are slightly larger than ECDSA signatures (96 bytes instead of 65 bytes), this means that we no longer need megabytes worth of space in blocks dedicated purely to signatures.

BLS signatures, perhaps more importantly, also allow us to verify any number of signatures on the *same* message in constant time. Once aggregated, one million signatures on the same message can be verified in the about the same amount of time as a single signature on that message. Since validators are often signing the same message (a given block, perhaps), this optimization is extremely useful within the context of Eth2.

## Extras
Signature schemes have three algorithms in combination, each probabilistic polynomial:

G: key generator, generates a public key and corresponding private key on input 1^n where n is security parameter

$$
G(\text{security_parameter}) \rightarrow (\text{public_key}, \text{private_key})
$$

S: Returns a signature on inputs pk and string

$$
S(\text{private_key}, \text{message}) \rightarrow \text{signature}
$$

V: Outputs accepted or rejected on public key, message, signature

$$
V(\text{public_key}, \text{message}, \text{signature}) \rightarrow \{\text{accepted}, \text{rejected}\}
$$

Correctness:

$$
Pr[ (pk, sk) \leftarrow G(1^n), V(pk, x, S(sk, x)) = \text{accepted}] = 1
$$

$$
Pr[ (pk, sk) \leftarrow G(1^n), (x, t) \leftarrow A^{S(sk, -)}(pk, 1^n), x notin Q, V(pk, x, t) = accepted] < negligible
$$