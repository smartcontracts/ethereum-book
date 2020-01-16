---
path: "/chapters/proof-of-stake/attack-surfaces"
title: "Attack Surfaces"
---

This is where things really get interesting. Our block proposers are making blocks, and our block producers are creating attestations. Nice.

Well, we can't just stop there. Just like in Proof of Work, it's always possible that we get a fork in the chain. One validator might make a block but then it doesn't get published to the rest of the network in time. We have to handle forks! 

Before we start to actually handle forks though, it's important to see that there are some potential attacks in this design unless we explicitly design them out.

One attack is called the long range attack. And the way this attack works is, basically, taking advantage of dynamic validator sets. Since our validators are allowed to withdraw their funds, once they've withdrawn their funds they're no longer part of the system now but they were indeed part of the system in the past. Hmm..

What this problem creates is that a validator doesn't have anything at stake right now, they can try to mess with the network without fear of getting slashed since they already withdrew their funds! So how could this be used for an attack? 

Okay so basically, this has to do with something called weak sujbectivity. Let's say I'm a client who has never downloaded the Eth2 blockchain. I start off with the genesis chain, but there might be forks in the network and I don't know which one to follow. So let's say a user starts a withdrawal at block 100. From that fork onward, we can basically ignore any sort of additional blocks from that user. But we don't even know if that fork is canonical! We have a different fork where the user did *not* submit a withdrawal, which might be the canonical one everyone is currently using.

On this other chain, we still accept blocks created by the validator even though we ignore them in the first chain. So the problem ends up being this: what do we do about this other chain? How can we tell which one is actually valid? 

So it really depends, firstly, on our fork choice rule. We can't decide between forks without one! So let's say we're using the longest chain rule, which will demonstrate the attack. Our person withdraws at block 100, so we ignreo everyhting on that. Except on our other chain they don't withdraw. 


Now the attacker needs to create a longer chain than our otehr chain in order to be successful. Let's say there are four people on the network. Three are still behaving, one is a baddie.

Okay so how can they do the attack? Simplest version might be to create "future" blocks. Basically, we can just simulate what will happen in the future since we don't need to rely on inputs from anyone else, which means we just create blocks with future timestamps. We send those blocks to our clients, who see a bunch of blocks (billynz) and accept it as the longest chain! 

We can pretty easily solve this issue by requiring that clients check block timestamps before accepting blocks. Generally speaking, it's pretty easy to see that a block supposedly created tomorrow is invalid, unless you're so disconnected from the rest of the world that you can't properly synchronize clocks. But generally, we don't need to worry about this on the scale of earth. Even humans could generally tell you the date, and it'd be pretty easy to see that a block is coming from tomorrow. So we don't really need to worry about this specific attack.

okay well that one's solved, so what now? Not so fast. Well, let's say our randomness is good and our system will only pick our baddie once every four blocks on the other fake chain. At this rate, they'll never catch up! Womp. We're going to be making blocks withotu skipping a beat, so maybe we'll catch up if somehow the real network ends up stalling, maybe there are a lot of forks, maybe people aren't making blocks, whatever. There's some sort of low probability that we catch up, depending on other people on the other chain. Let's say that 2/3rds of the people on the other chain are online, so we get 1 block for every like 2-3 that they get.

We might get sort of lucky, if we have close to 50% of the total stake, we're more likely to get lucky. Although this attack gets more effectice when more withdraw, our first new mechanism will be used to prevent the attack on the shorter term. Let's look at an example we might want to prevent. Let's say our chain gets built on by two validators, who build on the same parent but because of high latency they're siblings and not building on each other. Our chain hasn't gotten any longer, which means that if we used LCR then we could be in some doo doo. 



We can't just create a bunch of blocks alone, but what if we could get someone else in on the attack? Okay so let's say that our friendo, bobby boy, also used to be a validator on the network. Well they no longer validate, so they don't really care about their key. We'll buy it off of them for cheap! Probably not much, sort of depends on external factors but obviously not going to be nearly as much as bb had staked. Or, we can just hack their key somehow. Either way.

Now with this extra key, we get to produce even more blocks on our little fake network. Now we're producing 2 blocks for every 2-3 they're making!


We can go evenf urther. Let's say everyone who was online at that time has withdrawn, and we figure out how to buy keys or hack all of their keys. We have full control of the chain, we're gonna make a block in every single slot! 4 blocks for every 2-3 of theirs? We're gonna outpace these mfs in absolutely no time.

Check out the damage we did! Boom baby, we just came back from the dead and now we have a whole chain to ourselves.

This is all basically like a 51% attack in a proof of work blockchain. The big difference is that the attack gets cheaper from a specific block as more people withdraw their keys in that validator pool. 

Ooof. So how do clients know not to follow this bad chain?