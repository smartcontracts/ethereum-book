---
path: "/chapters/phase-0/validator-life-cycle"
title: "Validator Life-Cycle"
---


The validator lifecycle is broken into a few primary stages. These stages are:

Ready to activate
Activated
Unslashed and exited
Slashed
Slashed and exited
Wirhdrawable
Withdrawn

Ready to activate is the first stage of the validator lifecycle. This stage happens when the validator deposits some funds into the smart contract on eth1 (32 ETH) and this deposit is recognized on the Eth2 chain as a result of validators including the eth1 data. Once this stage has happened, the validator is effectively ready to become a validator in the network but has not yet been included. The validator remains in this stage first until the deposit is seen on Eth2, then waits 4 epochs, and then gets pulled out of a FIFO queue. The queue exists in order to limit churn of the validator set and the amount of change that can happen with incoming validators. We need this limitation because it provides security. During this phase, the validator should already have their software ready to go because they will be an active validator soon.


After the waiting period and clearing the queue, the validator is considered active. This basically just means that the validator is doing their duties in the network, like producing blocks when asked and signing atteststions when asked. This will also include doing stuff with shard chains once phase 1 is ready. This is the primary phase for validator and the phase most validators will spend the most time in.


The validator now has a few potential pathways from this point. Basically, these all go to the stage of "exited", but there are different routes to get there. The first route is when a validator decides that they no longer want to be a validator by choice and are therefore "voluntarily" exiting the chain. There is a waiting period of XX epochs to do this operation. This waiting period exists to prevent attacks in which validators drop off line very quickly. The validator is still active during this period. Another pathway is if the validator is offline and losing money but not being actively slashed. Slashing only occurs if the validator is actually doing conflicting things actively, which also means it's not possible to DOS someone and get them "slashed" but will lose them some money over time. If the validator loses enough money, they will be kicked out of the protocol immediately.


Once either of these paths are completed, the validators are put in an "unslashed and exited" stage. This means that the validator is no longer participating in consensus but is still waiting to get their funds out. There is a waiting period between this stage and the final stage of being able to withdraw your funds. The reason for this is because the validator may have done something slashable that just hasn't been detected or publicly acknowledged yet. Therefore there are two possible pathways here. The first pathway is that the validator goes into a "withdrawable" stage if there is no slashing detected. This means the validator can now transfer their funds to another user in the beacon chain or deposit the funds into an EE on a shard in order to move the funds there. The other pathway is that some slashable behavior is detected before the waiting period is over, and now the validator becomes "slashed".


Now let's go backwards to "active" the other possible route here is directly to "slashed" from "active" which means the validator has not exited yet but gets slashed. Effectively the same as before, this happens when some slashable behavior is shown to the beacon chain. In either case, there's now a short waiting period after the validator is slashed before they're kicked out of the network (4 epochs). Once this waiting period is over, the validator will be in the "slashed and exited" state.


In this state, the validator only has one pathway in which they now wait for a long period of time (1 month) before their remaining funds are "withdrawable". This is just to punish slashable behavior more and disincentivize it somewhat.


Finally, you get to the "withdrawable" state which means you can get your funds out of the system. This is either by sending to another user or putting in an EE. Once this is done, you are out in the "withdrawn" stage and you are done being a validator. Of course, if you are not slashed you may always become a validator again by starting the process again from the deposit stage.


Beacon structure
Ok finallly we can get into gritty details about the beacon chain.

