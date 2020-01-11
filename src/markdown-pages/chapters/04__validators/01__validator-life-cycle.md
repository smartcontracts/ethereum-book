---
path: "/chapters/validators/validator-life-cycle"
title: "Validator Life-Cycle"
---

Let's go through this diagram piece by piece.

## Deposited
All Beacon Chain validators need a deposit ("stake") of 32 ETH as collateral in case they violate the rules that keep Eth2 secure. However, since ETH currently only lives inside Eth1, these deposits have to be handled by a special smart contract, the "deposit contract," sitting on the Eth1 chain.

Users who want to be validators first need to send a transaction to the deposit contract, along with 32 ETH and certain authentication credentials. Once their deposits are submitted, users waits for their deposits to be recognized and processed on Eth2. The Beacon Chain will only process a limited number of deposits within each block, so users may face in implicit waiting period in the event that many others have submitted deposits.

After their deposits are processed on the Beacon Chain, users are required to wait for an additional period of [TODO] epochs before finally becoming active validators.

## Leaving the System
The process of leaving the Beacon Chain is split into two stages, the "exit" stage followed by the "withdrawal" stage. Any validators in the process of leaving the system is first placed into the "exit" stage. During this stage, validators no longer participate in consensus but cannot yet withdraw any funds. After an additional waiting period, validators in the "exit" stage enter the "withdrawal" stage and may withdraw their deposits.

## Slashed Exits
Validators caught violating slashing conditions are removed from the validator pool after a period of [TODO] epochs. As an additional penalty for their actions, these validators are required to wait for [TODO] epochs before they are able to withdraw their funds. 

### Insufficient Balance Exits
Validators lose portions of their deposit (without violating slashing conditions) when they fail to produce blocks during their assigned slots. Once a validator's balance drops below [TODO] ETH, they are automatically exited after a period of [TODO] epochs. 

Validators who are exited in this manner are required to wait an additional [TODO] epochs before they are able to withdraw their funds. During this period, validators can still receive any unpaid rewards or be slashed. If a validator is slashed 

### Voluntary Exits
Validators who no longer wish to participate 