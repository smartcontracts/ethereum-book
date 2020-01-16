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

Okay let's try to organize this section a little better.

Our basic Eth2 setup selects block proposers to create blocks during slots, and attestation committees to vote on these blocks. All's well as long as there's only one blockchain to follow, but, as we know, we can always have forks.

Let's imagine that we have a basic network fork as a result of a malicious validator. Validator B decides to create two blocks during their assigned slot and propagates both to the network.

Slashing Validator B alone doesn't solve our problems, however. Our attestation committee for Slot 1 still need to decide whether to vote for Block 1 or Block 2. Validators receive rewards for voting on blocks. However, this reward doesn't matter unless they vote on the chain that becomes canonical. Otherwise, any record of that vote is only recorded on a defunct chain, which doesn't help in the long-term. So their logical choice is simply to vote for both blocks.

We obviously want to try to prevent Validator B from performing this sort of attack in the first place. We also want to make sure that validators don't end up voting on every potential fork, since we'd end up with a lot of forks. So, in order to prevent this sort of behavior, we introduce our first security mechanism: slashing.

The basic concept behind slashing is that we require that validators put down a deposit that can be decreased, or slashed, in the case that they perform certain undesirable actions. Our system originally only required that validators lock up funds, but didn't actually state that these funds could be decreased in any way.

Our basic slashing mechanism prevents validators from publishing two different "messages" within the same slot. In our case, these messages are either blocks or votes. Since Validator B published two different blocks in a fork, they're liable to be slashed. Any validators who created attestations for both Block 1 and Block 2 are also liable to be slashed. We execute this punishment by allowing other validators to include proof of this misbehavior within some future block.

Validators are incentivized to include this evidence to some extent, simply because any reduction in another validator's stake results in an increase in their own stake as a proportion of total stake. However, since validators will likely attempt to hide any evidence of malfeasance, we further incentivize others to actively search for and include evidence of slashable behavior with a "finders fee." This fee represents a portion of the amount slashed. The rest of the amount is burned in order to prevent validators from reporting their own errors and receiving their entire lost value in return.

So which fork should validators build on?

Generally speaking, since our attestation committees are small, it becomes increasingly unlikely that two forks will have an equal number of votes. Since our assumption is that 2/3rds of validators are honest, we can assume also that 2/3rds will only vote on whichever fork has more votes at any given time. With a properly sized committee, we can always ensure that there will be *some* winning fork between two blocks that validators can continue to build on. 

So we first want to start out with a basic fork maybe? Just to show that it's possible? Hmm okay yeah let's start with a basic fork and introduce the idea of slashing. We'll have a validator vote on two different chains and get slashed for it. Thing is, we don't just want to slash people for voting on two chains, because this introduces a problem where if this happens naturally, the chain can get stuck. So we add a second rule that says if 2/3rds vote on the other chain, then it's ok for others to switch their votes to the other chain.

Where does weak subjectivity come in? I think weak subjectivity really only comes in when there are dynamic validator sets. So let's introduce an attack where the whole original validator set switches out and they end up colluding to make a different chain. Basically the reason this works is that there's a time limit for including slashing messages on-chain. Why? Well, since validators can always withdraw their funds, there's really no point in looking further than a certain number of blocks. Here's one way of looking at it. On our original chain, the validator is going to try to withdraw their funds as quickly as possible after doing something slashable, mainly because there's a risk-free way of just transferring to another account so you don't get slashed. The assumption here is that any logical party will just withdraw their funds as quickly as possible. There's really just no *point* in looking further.

On our second chain, we sort of face the same dilemma. We could theoretically look further, but presumably the "secret" chain validators will rotate out before publication so that their funds can't get slashed anyway. So slashing alone can't really solve the issue, even though they did do something slashable, it wasn't recorded on the chain.

So let's first go through the case that it's just a few validators who have withdrawn. It's actually still possible for them to catch up under certain conditions! Basically, network conditions mean we're occasionally going to get uncle blocks that don't extend the length of the chain. Our minority can catch up to the other chain ("eventually") because they're not going to drop any blocks. So even if an equal number of people are on both chains, one is just centralized and more efficient. 

So where does this first problem lead us? We have a couple of issues here. We can solve the problem of the minority beating the majority by using a different fork choice rule, LMD GHOST: introduce ehre.

So we solved that problem, but what happens if the other chain isn't a minority anymore? The attacker got access to many more keys, and since we only assume 2/3rds are honest, we only need > 2/3rds of keys. So now it's possible that our secret chain fools LMD-GHOST. Introduce FFG here as a way to prevent forks longer than a certain time period. Then go into how this introduces the problem of weak subjectivity because really both chains will have checkpoints saying to ignore the other chain. Checkpoints can't just be when 2/3rds vote on a block, because there's a liveness issue in which an attacker could just keep splitting their vote so that no chain ever gets 2/3rds votes.