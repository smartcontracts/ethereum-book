---
path: "/chapters/phase-0/validator-duties"
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