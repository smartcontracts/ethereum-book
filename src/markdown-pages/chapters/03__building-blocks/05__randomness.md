---
path: "/chapters/building-blocks/randomness"
title: "Randomness: RANDAO"
---

Our lives seem to be punctuated by an endless stream of random events. Whether we're thinking about packing an umbrella for that trip next week, or just sitting down for a game of D&D, we're making small gambles every day.

Though not without its faults, randomness bestows upon us many of our greatest joys. Without it, life would be entirely predictable and, perhaps, unbearably mundane. In many ways, we're truly lucky when we're able to say that tomorrow holds unknown possibilities.

Randomness plays a central, and often overlooked, role in our technological lives. Our computers use random numbers to keep our data, and, in many ways, us, safe from prying eyes. Randomness is so critical, in fact, that many modern phones include special-purpose hardware devices dedicated entirely to generating random numbers. Critically, we wouldn't be able to create secure Ethereum private keys or hide our embarrassing web searches if computers couldn't understand some concept of randomness.

## What *is* Randomness?
We might have an intuition for the meaning of the word "random," but most of us would probably have a difficult time explaining the concept in detail. So what exactly *is* randomness?

A dictionary might describe randomness as something that has a quality of unpredictability, fitting for the highly chaotic experiences of human life. It seems, though, that certain things are simply "more random" than others. Weather patterns, for example, can seem very random, but we're often able to predict them to some extent. Lottery outcomes are pretty random, but ask anyone to pick a random number between one and ten, and they're probably going pick seven.

When we talk about an event being "random," or something presenting "randomness," therefore, we're actually making a qualitative statement. Indeed, some sources of randomness can be "better" than others. Particularly, when we're using randomness as a security measure, we're interested in examining the ability for someone to "bias," or manipulate, our source of randomness.

## Randomness in Computing
Computers are usually meant to execute programs in expected, or deterministic, ways. We typically want our programs to generate the same output when given the same input. Our lives would be much more difficult if our computers started behaving in completely "random" ways. 

Our computers do still, clearly, rely on random numbers for a lot of important functionality. For instance, computers need access to random numbers in order to generate Ethereum private keys. Otherwise, anyone else could easily reproduce the behavior of our computer and, therefore, reproduce our private keys. Clearly there must be some way for computers to generate "randomness." 

Computers generally rely on the idea of "reasonably unpredictable" external inputs to generate random numbers. For instance, a program might derive random numbers from the movement of your mouse over a period of time. This method is effective because mouse movements are generally very unpredictable. It's extremely unlike that any two people have ever moved their mice across their screens in exactly the same way over a non-trivial period of time. Furthermore, cursors can take so many potential paths across a screen that it's infeasible for an algorithm to guess which movements you used to generate a given random number.

Computers can use any number of unpredictable inputs as sources of randomness. Random.org uses the unpredictable behavior of atmospheric noise to derive its random numbers. CloudFlare, an internet infrastructure company, famously generates random numbers from a camera pointed at a wall of lava lamps.

## Randomness in Blockchains
Blockchains face even more problems when attempting to generate randomness. Ethereum is somewhat like a computer, so we could start by trying to make use of a similar input-based method of generating random numbers. In order to achieve this, we somehow need to get these external inputs into Ethereum. We could assign someone to be responsible for creating and publishing random numbers, but they might just pick specific numbers that, for example, cause them to win an Ethereum-based lottery system. We instead need some sort of "decentralized" randomness that can't easily be manipulated for individual gain.

## Randomness in Eth2
Random numbers are crucial to many of the things we interact with every day, and Eth2 is no exception. Randomness helps Eth2 run efficiently and securely in the face of constant adversity. Let's take a look at the various ways in which Eth2 actually makes use of random numbers.

### Block Proposers
Blockchains don't run unless someone is around to produce blocks. Although there are many ways to select block producers in a Proof of Stake system, we generally want to maintain a few key properties.

First, we want the selection process to be fair to all of the validators. Blockchains generally give out a reward to block producers, so we want to ensure that validators are being paid in proportion to their investment in the system. A good block proposal mechanism should therefore make sure that validators are given the opportunity to produce blocks at a rate mostly proportional to their stake in the system. For example, a validator with 10% of the total stake in the system should produce approximately 10% of all blocks. Simple enough, in theory.

If, in our blockchain, each validator has the same amount of stake, then we could just sort the validators into a list (alphabetically, perhaps) and allow validators to produce a block based on their position in this list. We'd get a perfect distribution of blocks between validators every time, no randomness required. We could even extend this system to handle the case that validators have different amounts of stake.

This is, basically, a "round-robin" system. It's easy to implement, but it's also quite vulnerable to certain types of attacks. Particularly, round-robin selection tells us far in advance who's going to be producing blocks and when. Any would-be adversary would have plenty of time to strategically attack specific validators in order to manipulate certain blocks. An adversary might try block a validator from the rest of the network in order to prevent that validator from producing a block in a Denial-of-Service attack. Validators could even try to collude with their neighbors on the list to stop producing blocks and, as a result, halt the network for a significant period of time.

If we use random numbers to pick new block producers for every epoch, then these attacks become much more difficult to execute. As long as the random number generation process is difficult to manipulate or predict, it'll be significantly harder to deny service to or collude with other validators. The law of large numbers also guarantees that the distribution of blocks will, over time, generally reflect the amount of stake owned by each validator.

### Committees
Eth2 relies on the "committees," defined groups of validators, to perform certain actions like vote on the validity of blocks within shards. Committees are particularly important to the security of Eth2's sharding system. If an attacker can gain control of 2/3rds of a committee voting on the validity of a shard block, then they can cause an invalid shard block, perhaps one that generates ETH out of thin air, to be considered valid by the rest of the network.

Although Eth2 does allow users to submit "fraud proofs" in these events, the Beacon Chain would still be forced to roll itself back to a point before the invalid shard block. This roll-back would be a major service disruption, so we need a good source of randomness that reduces the probability of this sort of event.

### Applications
Many blockchain applications also need good sources of randomness. For example, the various lottery applications already running on Eth1 are only as good as their mechanism for generating random numbers. So far, applications have typically either relied on relatively poor sources of randomness, like block hashes, or attempted to roll their own versions of the random number generation process used in Eth2. We don't want application developers to have to build complex protocols for primitives like randomness, so it's important that Eth2 provides a secure and accessible source of randomness.

## On Randomness


## RANDAO
RANDAO is a relatively simple mechanism for generating "random" numbers in a decentralized way. The core idea behind RANDAO is to have a large group of people come together to generate a random number instead of simply trusting one person to do it on everyone's behalf. One simple version of RANDAO is simply to have each member of a group come up with a random number on their own. We can then take these random numbers and "mix" them together in a way that each person's number has an equal impact on the final result.

There's a flaw in this simple version of RANDAO if members of the group can see other members' numbers before they pick their own. The last person to add their random number to the mix could simply look at the current value and pick a "random" number that, when mixed into the current value, gives a favorable outcome. An attacker could run through many potential outcomes to find that "random" number that gives a good result. Obviously, this wouldn't really be a useful "random" number for any practical purposes because the attacker could always cheat.

We generally solve this problem by requiring that everyone "commit" to a random number in advance. These "commitments" are cryptographic guarantees each user makes in advance. Then, when the it's time for everyone to reveal their random numbers, they can only reveal the number that they committed to. This means it's no longer possible for an attacker to pick any number they want, since they already committed to a number earlier on.

This improved version of RANDAO is more resistant to attacks, but there's still one problem. The last revealing user could, if they want, simply refuse to publish their original random number. Although this doesn't give the last user effectively infinite attempts to change the output, it does allow them to roll the dice one more time. Instead of getting one fixed result, such an attacker could basically choose between two different results. Generally speaking, the last `n` members could collude to get an additional `2^n` rolls of the dice. Obviously this isn't ideal, as the randomness is somewhat subject to bias, but we have some guarantees about the potential outcomes of these results depending on the amount of the system owned by an attacker.

## Verifiable Delay Functions
Verifiable Delay Functions, or VDFs, are a novel cryptographic construction developed by researchers at Stanford. VDFs take some `input` value and return an `output` along with a `proof` of correctness for that `output`. VDFs are special in their `output` can only be computed serially, meaning it's impossible to speed up VDF computation time by running the algorithm simultaneously on multiple computers. Although similar constructions can be found in older time-lock mechanisms, VDFs are novel in that their `proof` can be verified very quickly.

VDFs are interesting in their own right, but they shine in combination with RANDAO. As previously discussed, RANDAO is subject to bias if the last validator(s) within each epoch coordinate to hide their RANDAO reveals. We can mitigate this attack by feeding the RANDAO output into a VDF and instead use the VDF output as our final random number. This mitigation works because adversarial validators only have a short amount of time after receiving the current RANDAO value to decide whether or not to reveal their commitment. Without VDFs, these validators simply need to perform a simple computation to make this determination. With VDFs, however, validators would have to perform a computation that's mathematically guaranteed to take much longer than the available time.
