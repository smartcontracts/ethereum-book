---
title: "Stateful Applications"
---

# {{ $frontmatter.title }}

Before we move on to our analysis of more modern fault tolerant systems, we should become familiar with the ways in which these systems represent applications. As we know, BFT systems provide us with a set and ordering of events, or "transactions." These transactions alone are not very useful unless we attach some sort of meaning to the information they contain. However, once we do this, we can effectively represent any type of application that we can imagine. The process of designing any such application requires the definition of only three components, the state, the transaction, and the state transition function.

The "state" of an application refers to the stored information that details the universe of that application at some point in time. The term isn't particularly descriptive, possibly a reflection of the vast variety of structures and values that the state of an application can take. For any potential use-case it's important that the state is carefully constructed as to encapsulate fully the set of desired functionalities. Let's now attempt to understand this concept by example.

Although the idea of a "transaction" may sound strongly tied to finance, we use the term without any direct financial connotation. To cement this point, our example application will attempt to avoid references to finance. Perhaps we'd like to build an application that keeps track of the number of cats currently residing in the author's home. A basic structure for the state of such an application may take the following form:

```json
{
    "number_of_cats": <number>
}
```

We can further extend this state to add more detail to the application. In addition to a simple `number_of_cats` field, we could introduce a mapping between the names of each cat and some information about them. Here, we'll include the age of each cat and the number of objects they've broken over the last year.

```json
{
    "number_of_cats": <number>,
    "cats": {
        "<string>": {
            "age": <number>,
            "objects_broken": <number>
        }
    }
}
```

When we first initialize this state, we'll have an empty application with no cats. This is relatively boring, so we now need to introduce some mechanism through which the state can be mutated. The first piece of this puzzle is the transaction. Transactions are messages that communicate some desired change to the state of the application. We can develop different transaction "types" that correspond to changes to different parts of the state.

For instance, we can construct a format for a particular transaction type that adds a new cat to our home:

```json
{
    "transaction_type": "New Kitty",
    "cat": {
        "name": "<string>",
        "age": <number>,
        "objects_broken": <number>
    }
}
```

We can then additionally define a type of transaction that modifies some trait about a cat in our home:

```json
{
    "transaction_type": "Update Kitty",
    "cat": "<string>",
    "field": "<string>",
    "change": <number>
}
```

As you may be able to infer from these examples, transactions tell an application about the changes a user is attempting to make. Our first transaction type includes all of the information necessary to add a new cat to the state. Our second transaction instead only includes the specific field we want to mutate, and by how much. Essentially, these are descriptive representations of the "things happening" within our little application.

In order to make these transactions useful, however, we must define some logic that details exactly how a given transaction will impact the state of the system. We refer to this logic as the "state transition function" of the application. When given some initial state and a transaction, the state transition function will return a new state. We often depict this function mathematically as:

```
state_transition_function = (old_state, transaction) => new_state
```

Within our specific application, the state transition function should be able to recognize and handle the two transaction types previously defined. When it sees a "New Kitty" transaction, it should add the cat to the state and increment the total number of cats. When it sees an "Update Kitty" transaction, it should mutate the state according to the specified update. An implementation of this logic in Python might resemble the following:

```python
def state_transition_function(old_state, transaction):
    new_state = old_state

    if transaction["transaction_type"] is "New Kitty":
        cat = transaction["cat"]

        new_state[cat["name"]] = {
            "age": cat["age"],
            "objects_broken": cat["objects_broken"]
        }

        new_state["number_of_cats"] = old_state["number_of_cats"] + 1

    if transaction["transaction_type"] is "Update Kitty":
        cat = transaction["cat"]
        field = transaction["field"]
        change = transaction["change"]

        new_state[cat][field] = old_state[cat][field] + change

    return new_state
```

We've defined our three components, the state, the transaction, and the state transition function. We've now represented the entirety of our application. We can run through a dynamic example of the application as a series of transactions operating on some initial state. We're assuming here that the application begins in an "empty" state:

```json
{
    "number_of_cats": 0,
    "cats": {}
}
```

Next, we introduce a series of transactions:

```json
{
    "transaction_type": "New Kitty",
    "cat": {
        "name": "Dexter",
        "age": 5,
        "objects_broken": 10
    }
},
{
    "transaction_type": "New Kitty",
    "cat": {
        "name": "Nico",
        "age": 1,
        "objects_broken": 0
    }
},
{
    "transaction_type": "Update Kitty",
    "cat": "Nico",
    "field": "objects_broken",
    "change": 20
}
{
    "transaction_type": "New Kitty",
    "cat": {
        "name": "Moony",
        "age": 0,
        "objects_broken": 0
    }
}
```

After running each of these transactions through our state transition function in order, we can determine the final state of our system:

```json
{
    "number_of_cats": 3,
    "cats": {
        "Dexter": {
            "age": 5,
            "objects_broken": 10
        },
        "Nico": {
            "age": 1,
            "objects_broken": 20
        },
        "Moony": {
            "age": 0,
            "objects_broken": 0
        }
    }
}
```

Although this example has been rather simplistic, it demonstrates the basic process of constructing an application for transaction-based systems. These same fundamental principles are applicable to almost any application one can dream up. The state of a tic-tac-toe board, for instance, might contain the current positions of "X"s and "O"s on the board, and its transactions would update the board. Entire virtual computers can be represented under this model, as we'll soon discover in our discussion of Ethereum. In the following chapter, we'll come to understand how these ideas have been applied to the next generation of fault tolerant systems.
