---
path: "/chapters/blockchains/state"
title: "State"
status: "0"
---

First junk draft of State and State Transition Function section.

In order to understand what happens inside of a blockchain we need to look at the concept of state. Basically blockchains are responsible for giving us the ability to share a list of events and the ordering of those events. What this means is that with a blockchain protocol we share information so that nodes come to agreement about a series of events, each of which contains information inside the event. This ends up looking like this:
  
todo

Events alone aren't really very useful. We need to ascribe some sort of meaning to these events. Luckily, we can actually represent almost any sort of application through this type of strucutre. To undertsand this, let's look at the concept of an application at a high level. Basically, the basis of any sort of application is the "state" of that application. State isn't a very descriptive term, but it essentially means the information that the application represents. 

Let's look at this concept outside of a financial perspective. For instance, let's say we want to build an application that represents a virtual store that only sells a single type of item perhaps bricks. Our store probably has an inventory, which tells us how many bricks we have in stock. So the "state" of our virtual store is pretty simple:

```json
{
   "inventory": 1000
}
```

Now we can add things to this state, like let's say we want to keep track of some employees. We need to add a new field to our state that tells us who our employees are right now:

```json
{
    "inventory": 1000,
    "employees": [
        "Alice",
        "Bob"
    ]
}
```

We want a way to update our stock when we get new bricks, and we want a way to represent that we sold a brick. We also want to be able to change our employees when we hire or fire someone. The way we change our state is through "Transactions." Each transaction contains the relevant information that tells us what we're trying to do to the state. So for our specific example, we essentially want two different types of transactions, one that can change employees and one that can change our inventory.

For an inventory change, we might design a transaction like this:

```json
{
    "type": "Inventory Change Transaction",
    "action": ["Sale" or "Purchase"]
    "amount": [Number]
}
```

Similarly, for an employee change, our transaction would look like:

```json
{
    "type": "Employee Change Transaction",
    "action": ["Hire" or "Fire"]
    "employee": [Employee Name]
}
```

Basically these transactions are a way to represent what we want to happen. In our inventory change transaction, we're representing that we want to either mark a sale or mark an inventory purchase, and we give a number for how much the inventory is changing by. For the employee transaction, we're marking whether we're hiring or firing, and we're saying which employee is being modified.

In order to make this transaction useful, however, we need to define some sort of logic that says what will happen when our application sees one of these transactions. This logic is called the "State transition function" and it tells us how the state moves from one state to the next. State transiton functions are very general purpose. Essentially, they can be represented as:

State Transition Function = (Old State, Data) => New State

For our specific example application, our state transition function should modify the state based on whatever transaction we're giving it. So it'll take the form:

STF = (Old State, Transaction) => New State

With our inventory change transaction, our STF should see whether it's a sale or purchase and change the inventory accordingly. Also with the employee transaction type, we want to change the employee list  That part of the logic might look like this:


```javascript
state_transition_function = (old_state, transaction) => {
	new_state = old_state

	if (transaction.type == "Inventory Change Transaction) {
		if (transaction.action == "Sale") {
			new_state.inventory = old_state.inventory - transaction.amount
		}
		if (transaction.action == "Purchase") {
			new_state.inventory = old_state.inventory + transaction.amount
		}
	}

	if (transaction.type == "Employee Change Transaction) {
		if (transaction.action == "Hire") {
			new_state.employees = old_state.employees.add(transaction.employee)
		}
		if (transaction.action == "Fire") {
			new_state.employees = old_state.employees.delete(transaction.employee)
		}
	}

	return new_state
}
```

Now with these three components, the state, transactions, and state transition function, we can represent our entire application. If we start with zero inventory and no employees, we can do whatever changes through our transactions. These transactions are the "Events" on our system that tell us what happened to our application. By executing each one of these transactions in order, we can go through the history of our store and, eventually, figure out the latest "state" of the store. So let's say that we start empty, and we have the following events:

```json
{
	"type": "Employee Change Transaction",
	"action": "Hire",
	"employee": "Alice"
},
{
	"type": "Inventory Change Transaction",
	"action": "Purchase",
	"amount": 1000
},
{
	"type": "Employee Change Transaction",
	"action": "Hire",
	"employee": "Bob"
},
{
	"type": "Inventory Change Transaction",
	"action": "Sale",
	"amount": 500
},
{
	"type": "Employee Change Transaction",
	"action": "Fire",
	"employee": "Bob"
},
```

If we run each of these through our state transition function, we go through the following changes:

Hire alice, purchase 1000, hire bob, sell 500, fire bob.

At the end of this process, we end up with a final state of:

```json
{
	"inventory": 500,
	"employees": [
		"Alice"
	]
}
```

So this is the basics of representing an application through state and state transition functions, using transactions as the events that change the state. We can use the same idea to represent pretty much anything that we'd like. You could build a game of tictactoe with these ideas, where the "state" is the current set of xs and os on the board plus the current winner if any, and the transactions are the moves that people make, and the state transition function changes the board or sets a winner.

Now that we've got this part down, we need to analyze how this is applied to a digital cash system. In any digital cash system, we're basically building an application that tells us who owns what currency on the system. Transactions on that system are basically transfers of currency between those users, which means our state transition function will have to change the state to show that someone else now owns a given amount of funds. So the basic idea is to have a state that tracks currency ownership. There are very many ways to do this simple thing.

Bitcoin popularized a specific version of this called the "UTXO" model of currency transactions. UTXO stands for Unspent Transaction Output (transaciton is soemtimes shortened to "TX") and the basic concept is like this. The name is a little confusing, but we will understand it soon. Essentially, all "money" on the system is represented as bundles of currency called outputs with an associated owner. The "state" in a UTXO system looks like this:


```json
{
	"outputs": {
		1: {
			"id": 1,
			"amount": 100,
			"owner": "Alice",
			"spent": false
		},
		2: {
			"id": 2,
			"amount": 500,
			"owner": "Bob",
			"spent": false
		}
	}
}
```

That's pretty much it. In the above example, Alice owns an output worth 100 "units," whatever currency that might be perhaps Bitcoin. Bob owns an output worth 500 units. Each output has a unique identifier so that it can be referenced in a transaction.

A transaction in this system might look like this:

```json
{
	"inputs": [
		{
			"id": 2,
			"amount": 500,
			"owner": "Bob",
			"spent": false
		}
	],
	"outputs": [
		{
			"id": 3,
			"amount": 200,
			"owner": "Alice",
			"spent": false
		},
		{
			"id": 4,
			"amount": 200,
			"owner": "Carol",
			"spent": false
		},
		{
			"id": 5,
			"amount": 100,
			"owner": "Bob,
			"spent": false
		}
	],
	"signatures": [
		"This is Bob's signature!"
	]
}
```

Transactions "consume" outputs in the sense that the whole output is used as an input to the transaction. This output is then converted into new outputs, where the sum of the new outputs is equal to the value of the original input. Here, Bob is "spending" his original output in order to create three new outputs. He creates two new 200 unit outputs for Alice and Carol. Again, since the output is "consumed," Bob creates a new output for himself in order to keep the leftovers of the transaction. We refer to this sort of extra output as a "return" output since it's returning the extras to the original sender. 

We included another field called "signatures," which is what we'll use to make sure that the transaction is actually created by Bob. Otherwise, anyone coudl just create a transaction that spends Bob's output and steals his money. Now that we have our transaction, let's look at the state transition function for this sort of system.

```javascript
state_transition_function = (old_state, transaction) => {
	for (let i = 0; i < transaction.inputs.length; i++) {
		let input = transaction.inputs[i]
		assert (old_state.outputs[input.id].spent == false)
		assert (signatures[i] created by input.owner)
	}

	let input_sum = 0
	let output_sum = 0
	for (let i = 0; i < transaction.inputs.length; i++) {
		let input = transaction.inputs[i]
		input_sum = input_sum + input.amount
	}
	for (let i = 0; i < transaction.outputs.length; i++) {		
		let output = transaction.outputs[i]
		output_sum = output_sum + output.amount
	}
	assert(input_sum == output_sum)

	let new_state = old_state
	for (let i = 0; i < transaction.inputs.length; i++) {
		let input = transaction.inputs[i]
		new_state.outputs[input.id].spent = true
	}
	for (let i = 0; i < transaction.outputs.length; i++) {
		let output = transaction.outputs[i]
		new_state.outputs[output.id] = output
	}

	return new_state
}
```

So what we've done here is implement a basic financial system using UTXOs. Our state transition function does a few key things. First, it goes through each one of the inputs and it checks that the inputs are unspent and also checks that each input has a corresponding signature. Next, it adds up the sum of the input values and the sum of the output values. It then checks that the input sum is equal to the output sum. Finally, it updates the state so that the inputs are marked as "spent" and the outputs are added to the final database. 

Using our transaction from above, our final state would look like this:

```json
{
	"outputs": {
{
	"outputs": {
		1: {
			"id": 1,
			"amount": 100,
			"owner": "Alice",
			"spent": false
		},
		2: {
			"id": 2,
			"amount": 500,
			"owner": "Bob",
			"spent": true
		},
		3: {
			"id": 3,
			"amount": 200,
			"owner": "Alice",
			"spent": false
		},
		4: {
			"id": 4,
			"amount": 200,
			"owner": "Carol",
			"spent": false
		},
		5: {
			"id": 5,
			"amount": 100,
			"owner": "Bob,
			"spent": false
		}
	}
}
```

So if we tried to execute this transaction again, we would get an error because the input with ID 2 now has spent set to true. Our assertion check would fail, and we'd essentially "revert" the transaction. So input 2 can no longer be used as part of any other transactions. As you can see, this method gives us a way to transfer money to one another.

So in a blockchain system, the nodes would all have the state transiton function written into their own clients. The nodes would then come to agreement about a series of transactions, which changes the state that we talked about. By executing the transactions in the agreed upon order, we get some final state that shows us which inputs are spent, unspent, and who owns what. Although this may seem a little unfamiliar, it's actually quite a nice way to represent value transfers. It's not very difficult to understand once you see the state transition function.

The UTXO model is one way to do things, but there's another major way. this is called the account model, and it was really popularized by Ethereum. The account model is much more similar to what you might expect in a bank or something of the likes. Effectively, users have accounts that have information associated with those accounts, like the balances of the account. Let's again take a look at this through the lens of state, transactions, and stfs.

The state for a simple account based system might look like this:


```json
{
	"accounts": {
		"Alice": {
			"balance": 100
		},
		"Bob": {
			"balance": 500
		}
	}
}
```

Unlike the UTXO example where the same user might have multiple utxos, in the account based system the same user just has one account with a fixed balance. Transactions for balances could be designed like this:

```json
{
	"sender": "Bob",
	"recipient": "Alice",
	"amount": 200,
	"signature": "This is Bob's signature!"
}
```

This is a lot simpler to think about than the UTXO model. The transaction clearly identifies who's sending the funds, who's receiving them, the amount, and a signature from the sender. Now our state transition function:

```javascript
state_transition_function = (old_state, transaction) => {
	assert (transaction.signature created by transaction.sender)
	assert (old_state.accounts[sender].balance >= transaction.amount)

	let new_state = old_state
	new_state.accounts[sender].balance = old_state.accounts[sender].balance - transaction.amount
	new_state.accounts[recipient].balance = old_state.accounts[recipient].balance + transaction.amount

	return new_state
}
```

As you can see, this is really very much simpler than the UTXO example we gave before. We're simply checking that the signature came from the sender and that the sender has enough balance to cover the transaction. We then increase the recipient's balance by the amoutn and decrease the sender's balance by the same. Finally, we return the new state.

So for our transaction, the final state would be:

```json
{
	"accounts": {
		"Alice": {
			"balance": 300
		},
		"Bob": {
			"balance": 300
		}
	}
}
```

Once again, nodes would execute all transactions through the state transition function in order to find the final resulting state. 

We wanted to cover this mainly because it shows how diverse these approaches can be. Blockchains are primarily about the set and ordering of events. We usually don't care how the underlying stuff inside the blockchain is represented, or what it's representing at all. UTXOs and accounts look very different but can achieve very similar things at the outlook. We can build financial currency applications, but we can also use the very same concept to build applications that have nothing to do with finanical currency at all. 

Basically, this is the motivation for a separation between the consensus layer and the execution layer. The consensus layer is the protocol that we use to come to agreement about events. However, it really doesn't care what those events mean in any way. When we design consensus protocols, we want to try to ignore the stuff inside these events as much as possible since in a properly designed system it should have no effect on the consensus protocol.

The execution layer should be thought of as a separate thing, which means we can use the same consensus protocol to come to agreement about events for different execution layers, or we can use the same execution layer underneath different consensus layers. It really doesn't matter, though there needs to be some way usually in blockchains to get fees and rewards to block producers. Either way, as long as the execution layer has some way to represent value transfer, it doesn't matter. In theory, if the system didn't require fees or rewards (let's say the producers are incentivized externally or whatever), then there would be no need for such a system. Though this would basically look more like a traditional BFT model! No matter what, this is all just to say that we can use blockchains to represent a really wide variety of things. All that's necessary is to figure out how to turn the applicaton into a state-tx-stf model.