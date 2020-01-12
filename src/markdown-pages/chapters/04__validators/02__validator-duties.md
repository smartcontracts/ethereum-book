---
path: "/chapters/validators/validator-duties"
title: "Validator Duties"
---

Validators obviously play a key role in the maintenance of the Beacon Chain. We've already discussed the validator life-cycle at a high-level, but now we'll explore the primary validator duties, creating blocks and attestations, in more detail.

## Creating Attestations
Validators make statements about the validity of a given block in the form of an attestation. During each epoch, the validator set is divided into equally sized committees, one committee for each slot within the epoch. Each individual validator only appears in a single committee, ensuring that validators only be allowed to create a single attestation per epoch. Validators can determine their committees one epoch in advance.

When the slot for a given committee comes up, the members of the committee wait for half of the slot time and start to query for the block produced during that slot. Each validator then checks that the block is valid and creates a signature if so. Finally, the validators publish their signatures to the network.

## Creating Blocks

### Voting for Eth1 Data
As we previously discussed, the Beacon Chain is tied to Eth1 for the purpose of allowing validators to make deposits. The Beacon Chain therefore needs to be aware of the state of the deposit contract on Eth1. Validators are responsible for informing the Beacon Chain about this state.

Block proposers fill out a field in the block called `eth1Data`. This field contains the "deposit root" of the deposit contract at some point in the Eth1 chain. However, we can't simply trust that the validators will include accurate data in this field. Instead, the Beacon Chain holds a vote over a period of XXXX blocks and only updates the "known" Eth1 data in the case that some proposed hash gets more than 2/3rds of the total votes. This can generally be considered an oracle system in which an invalid Eth1 value would only be included if more than 2/3rds of the validator set is malicious.

Validators determine the specific `eth1Data` to include by following a relatively simple process. If the voting period has just begun and therefore no votes have been published, validators will query Ethereum to find the current deposit root. If the voting period is in early stages, then the validator will look at all of the current votes and vote for whichever value is least stale. If the voting period is in later stages, then the validator will vote for whichever value has the most votes. If honest validators are following this protocol, then the vote will naturally converge to some relatively fresh deposit root.

### Revealing RANDAO Commitments
We've talked about the basics of randao but now let's talk about how it's actually used in the beacon chain. This is a bit circular because randao is used to pick block proposers but the actual data used in randao comes from the blocks themselves. We need to pick a starting point, I think it's eIser to start here.


So what happens is that randao is used to pick validators to propose blocks. Well look at the exact selection mechanism in a second. When a validator creates a block, they include a special field. So I know that we said randao would use a commit/reveal scheme. However, we sort of have an automatic commit reveal scheme already. Basically, what the validator does is sign the current epoch using their BLS key. The effect of this is that there's no need to commit, because the value is pre-determined. The validator cannot know the value of other people's reveals.


So what happens is this signature is the actual value that gets mixed into the randao so the values created by other people. Every epoch, these values form a random seed for other things within the system.


Both block proposer selection and committee selection are dependent on this value. The way Ethereum picks block proposers is very similar to the way it picks committees. We have a shuffling function that sort of provably, given an input set, shuffles the set in an unpredictable way. We then weight that set by the amount of ETH owner by each validator.


What happens for block proposers is that you shuffle the set and pick the first validator in the set! Easy. For committees, you do another shuffle and you separate the set out into sunsets of a given size, where the size is predetermined.


### Processing Validator Deposits
Validators are responsible for processing deposits. The number of deposits that they process depends on the number available and the churn rate. The validator is punished if they do not process the correct number of deposits, which is the incentive for doing so. Because clearly they get less money otherwise and would have no incentive to do so. This requires talking about eth1 data first.

### Processing Validator Exits
The validator needs to update the list of exits depending on whoever posted a message saying they wanted to. They can process up to N exits per block, depending on the churn rate. They are naturally incentivized mostly to process these exits because the fewer validators there are the more money the validator gets in total.

### Including Attestations
Validator includes attestatioks in a block. Validators are incentivized to do this because they get a percentage of the atteststion reward for themselves. Furthermore they get more reward depending on the total number of attestatoms that they include. Because the total number of attestations in a block is limited, this means they will include attestations that are better aggregated with higher priority. Also they get paid more for quickly including attestations. The parameters are fine tuned to generally reward attestations being included quickly but not so quickly that they aren't well aggregated.

### Slashing Validators
Validators also update the list of slashes if they have proof that a person should be slashed. Validators get a reward for doing this, which is nice. This is the incentive. Validators generally want to keep this information for themselves because they get the reward. So they will be watching for bad behavior by themselves as a result. Possible that someone will just do this anyway??


## Creating Attestations

Validators also need to create attestations, or votes, about specific blocks. This is related to LMD ghost and FFG. in an epoch, we use the RANDAO value to break the list of validators evenly across each block during the next epoch. So we know one block in advance. This is tuneable. 

Then, the validator is responsible for downloading the block at slot+1/2t and checking that it satisfies all of the required conditions. Namely, they will check that there aren't too few or many exits and deposits, slashing was valid, etc. Look here for a complete list of the validity conditions within each block. If the block is valid, they will sign off on the block and broadcast this to the network.

Attestations are cool because not only do they sign off on a block, they also implicitly sign off on all parents of the block. And therefore, also sign off on the justification link within the EBBs for finalization. So one signature, multiple actions. 

## Creating Blocks

One of the most important duties of the validator is to create new blocks. Let's explore the various pieces of the Beacon Chain that the validator is responsible for updating within each block.

### Exits
Validators are responsible for including any exits by other validators in the system. Exits can take three different forms, voluntary, insufficient balance, and slashed. If another validator created a message saying they wanted to be exited, then we put this into the block and they'll be exited a few blocks later. If a validator runs out of balance, similar. In both of these cases, validators are naturally incentivized to do this because it reduces the total number of validators in the system and therefore increase the reward per validator (including themselves).

We only process [TODO] exits per block, validators won't accept the block if more or less are processed. Up to number pending. An exit is usually marked before it actually goes into effect, we can mark as many as we want but won't be processed until queue goes out.

### Eth1 Data
Validators need to include Eth1 data in each block. What they do is basically "vote" for a given Eth1 deposit contract root. The Beacon Chain holds a vote that is tallied every [TODO] epochs. If some deposit root gets 2/3rds of votes by stake over that time period, then it is considered the current valid deposit root.

In order to make sure that the system converges on a specific vote, we have a "pile on" vote system. Validators will basically have three options. If no Eth1 data because at the start of the vote, they get their own Eth1 data. If there is Eth1 data but vote period has only just started, we pick whichever is the least stale. If the vote period is long underway, we pick whichever has the most votes. Easy.

We make sure to follow the Eth1 chain by a safe distance (1000 blocks, ~4 hours) so that we don't get a reorg on Eth1 chain that messes up the Eth2 chain. This distance is long enough that there really has never been a reorg this big so we just assume that it'll be safe and won't mess the chain up. If a reorg did happen, then we'd have a bad situation in which a validator is part of the chain but doesn't have a deposit on the Eth1 chain possibly.

### Deposits
This is an important part of the process. Validators are responsible for processing deposits in the deposit contract. We get the list of people who have deposited and haven't been processed yet. Then we process [TODO] of the validators, or as many as are left if less than this. Validators won't attest to the block if they don't include the required amount. defined by CHURN.

### Slashed Exits
Validators also include any slashings in the block. This only happens if the block proposer has evidence that a validator should be slashed. When this happens, the block proposer gets a reward for including the evidence as a portion of the slashed amount. In order to incentivize this behavior. 

Slashings are interesting because they require that the validator actually have additional evidence. Since slashable validators won't actively share evidence of their bad actions (if they're smart), validators are going to be responsible for checking this for themselves. This is an additional cost for the validator, but again we reward them with some of the reward.

### Including Attestations
So part of the block as well is the attestaions. The way this works is that the validator will look at the network for attestations of the last few blocks that haven't been included yet. Especially the previous block, since that's the one that won't have any included attestations yet. The validator waits for signatures and will aggregate themselves, but aggregations will also be sent across the network.

Once the validator collects signatures, they add it to the block. Since it's cheaper to have fewer aggregations that have more component signatures, we want to add micro-incentives that basically reward people for including (1) good aggregations with many signatures and (2) recent aggregations. The less recent the aggregations, the less the reward. The total amount rewarded is about 1/8 of the reward that goes to the aggregators, so not insignificant.

### Randao reveal
like we talked about, validators reveal a randao thing. We said vaguely that validators doa  commit-reveal. Generally speaking, a cryptographic commitment can take many forms. For example, we can create a commitment in a sense by requriing that the reveal be a signature on a known value. In this sense, we can verify that the signature was in fact on the known value and therefore the signature is a reveal on that commitment.

In our case, we say that the block producers signs the current block height. Simple enough also because it doesn't erquire that we have producers actually broadcast any sort of commitment. 


