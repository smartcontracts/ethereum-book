# Contributing to Kelvin's Ethereum Book

Thank you for looking into contributing to Kelvin's Ethereum Book! <3

On this page you'll find the most important information about the contributing process. We've tried to make this as straightforward as possible. Thank you again for taking the time to contribute!

The book is automatically created with [VuePress](https://vuepress.vuejs.org/).

## How can I contribute?

### Fixing small errors

One of the easiest ways to contribute to this project is to fix small errors in the book. For these sort of smaller errors, we'd love if you could make a pull request fixing the issue. As long as the fix makes sense (typos are usually pretty obvious), there won't be much back-and-forth and we can just merge the PR. [Here's an example of a great pull request that fixes some typos within the book](https://github.com/smartcontracts/eth2-book/pull/15).

### Making subjective suggestions

When deciding between creating an issue or making a pull request, a good rule of thumb is that if the fix is non-controversial (typos, factual errors, etc.) you should make a PR. For fixes that are more subjective, please [create an issue](https://github.com/smartcontracts/eth2-book/issue) that explains the fix. This allows us to review the suggestion and see if it fits within the content/structure of the book. That way we can avoid situations where you put in a lot of work to create a PR and we end up rejecting it.

### Giving general feedback

This book is meant to be the best possible resource to learn about how Ethereum and Eth2 really work under the hood. We can only make that a reality if people are willing to give feedback about the content/flow/etc. We highly appreciate any sort of feedback. Please feel free to [create an issue](https://github.com/smartcontracts/eth2-book/issue) that includes your feedback so we can try to improve the book.

### Translating the book

We're planning to translate Kelvin's Ethereum Book into as many languages as we can get away with. Translations are being handled automatically via [Crowdin](https://crowdin.com/). If you're interested in helping to translate the book, please join the [Eth2 Book Working Group](https://t.me/+QdbYrQtP0zE3ZDVh) on Telegram. Please note that the book is still a work in progress and only certain parts of the book are ready for translation.

### Adding new features

Kelvin's Ethereum Book is, to an extent, an exploration of the website as a platform for long-form educational content. As a result, Kelvin's Ethereum Book is about 50% book and 50% software project. We love suggestions for new features and capabilities that take the book to the next level. See [here](https://github.com/smartcontracts/eth2-book/pull/7) for a great PR that adds a new feature, for an example.

## How to test a contribution

Kelvin's Ethereum Book can be served locally so that you're able to see and test your changes live. You'll need to install the following:

- [Node.js](https://nodejs.org/en/) (LTS should be fine, comes with `npm`)
- [yarn](https://classic.yarnpkg.com/en/docs/install) (v1)

Once you have those installed, you'll need to clone the repository and install its dependencies:

```
git clone https://github.com/smartcontracts/eth2-book.git
cd eth2-book
yarn install
```

Finally, you can serve the book locally with:

```
yarn dev
```

## Stuff to keep in mind

### Only modify the primary English text

As previously stated, we're trying to translate the book into many different languages. We're using [Crowdin](https://crowdin.com/) to manage the translation process. Since the book is still being written, only certain parts will be ready for translation at any given time. For any sections that have not yet been translated, the original English text will be used. Crowdin handles this duplication process automatically, so there's no need to update these other texts when making a fix. Simply update the English text and the other languages will update automatically.

## NFTs for contributors

As a special thank you, anyone who makes a contribution to this book will receive a hand-drawn [Bookzombie](https://quixotic.io/collection/bookzombies) NFT minted on [Optimism](https://optimism.io). After you make a contribution, you'll be asked for an ETH address. You can (of course) always decline the NFT, it's your choice!

### Why NFTs for contributors?

It's a book about Ethereum, so an NFT seems like a reasonable "thank you" card. I also have fun drawing and creating NFTs. I've found that for many people, the NFTs they receive for contributing will be their first NFT ever, so this is also something of a crypto recruiting mechanism ;-).

### Why is it zombie themed?

Who knows! I was messing around with designs and thought it looked cool.

### Why is it on Optimism?

Optimism is way cheaper than the Ethereum mainnet. I can't really afford to mint NFTs for everyone on mainnet, but I usually only pay about $1-2 per mint NFT on Optimism.

### How many Bookzombies can I get?

I'll send you one Bookzombie per contribution! I'll try to add more cool stuff to your Bookzombie depending on the size and scope of your contribution.

### Can I sell my Bookzombie?

Sure you can! Just don't get mad when Bookzombies become the next Crypto Punks ;-).
