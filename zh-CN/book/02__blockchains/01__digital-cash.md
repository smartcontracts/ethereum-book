---
title: "Digital Cash"
---

# {{ $frontmatter.title }}

From the ubiquity of money as a dominant system of social coordination it's no challenge to understand why attempts at digital financial products have been plentiful. Given the inherently social nature of money and finance, it should also come as no surprise that these projects gained significant traction with the launch of the world wide web in 1989. As the dotcom bubble made undeniably clear, the internet-connected universe was enamoured with a wholly digital vision of the future. Digital reality held limitless possibility, but it most certainly help digital money.

Beyond the apparent social impact of such a system, already confirmed by the success of other financial conveniences like the ATM, money was ultimately relatively straightforward to construct. Accounts, balances, and transactions translated cleanly into the computer databases necessary to represent finance in cyberspace. Even the ATM required the development of digital banking tools as early as the 1960s. With most of its raw components sitting in plain sight, digital money was simply waiting to be plugged into the internet.

Within a year of the launch of the world wide web, digital money would have its first taste of sunshine. In 1990, computer scientist David Chaum launched a small company by the name of DigiCash. Based on a protocol Chaum detailed in 1983, DigiCash was truly a computer scientist's ecash. Chaum leveraged his early work regarding blind signatures and built a system that allowed users to securely transfer virtual currency over the web.

Chaum's system made use of many novel mechanisms we now often take for granted. Transactional integrity was guaranteed by a series of digital signatures used to authorize interactions. Users could even participate without the need to create an account at a traditional bank. Anyone could send and receive money by simply generating a cryptographic keypair. Chaum could even guarantee privacy on every transaction through a few mathematical tricks. DigiCash appeared to be the perfect nu-currency for the digital age.

As ever, DigiCash came with a DigiCatch. The system was constructed around the existence of a central intermediary. This "bank," though not necessarily actually operated by a major banking institution, was responsible for asserting the validity of each transaction. Chaum's protocol, in a nutshell, flowed as follows:

1. A "bank" is responsible for maintaining a database of balances for user accounts.
2. A "payer" with some balance creates a "note" to be used for payments.
3. The bank signs the note and debits the payer, as long as the payer has sufficient balance to cover the note.
4. The payer gives the note to a "payee."
5. The payee sends the note to the bank for redemption.
6. The bank verifies the note and credits the payee.

Chaum's full mechanism further included cryptographic techniques that preserved the privacy of each transaction. DigiCash notes were designed in such a way that the bank was unable to link the notes created by payers to those redeemed by payees. Since the bank would debit the payer when a note was generated, they were simply required to check that the note was valid and had not yet been cashed.

Although groundbreaking, this system was far from the ideal of trustworthy digital finance. Reliance on a central entity for overall functionality also introduced reliance on the entity to remain honest in its actions. As the veracity of any given note was imparted by its signature, the bank could theoretically manipulate the supply and flow of notes. For instance, if it were so inclined, the bank could issue notes to a payer in vast excess of their actual balance and effectively print a limitless supply of currency. A particularly blatant offender might simply modify account balances outright. Without insight into the balance sheet, DigiCash customers could only rely on external regulation to keep the bank in check.

In the end, it was market timing, rather than the existence of a single point of trust, that proved to be the ultimate downfall of DigiCash. Chaum was early to a market that was only starting to hit its stride. The company began operations at the birth of the World Wide Web, before Tim Berners-Lee even had a chance to release the world's first web browser in 1991. Furthermore, the US National Science Foundation, which essentially operated the internet "backbone" connections at the time, placed heavy restrictions on commercial activity over their network. As a result, E-commerce expansion was stunted almost entirely until NSF relaxed its position in 1995. Unable to grow and sustain any significant user base, DigiCash slowly burned through its resources over the course of a decade. Finally, in 1998, DigiCash filed for Chapter 11 bankruptcy in the United States.

Given the failure of DigiCash to gain traction, one might find reason to fault constructions that gave so much power to a single entity. Indeed, several other infamous 90s experiments in digital currency were developed under this model and eventually ceased operations. One may find entertainment in the downfall of Beenz, whose reputation was severely damaged after a software error allowed users to, essentially, print Beenz at will.

Yet regulation, and not software bugs, ultimately determined who could, or couldn't, do the digital dash to get the digital cash in the new millennium. The UK Financial Services Authority paid Beenz a visit on suspicion that the company was running an "unlicensed bank." Flooz, another dotcom baby, shut down shortly after notification from the FBI that the platform was being used as part of a money laundering scheme. Digital finance was quickly starting to feel the pressure of governmental organizations in the physical realm.

Not dissuaded by a crackdown, some companies recognized the need to play ball with authorities. Digital finance was clearly still feasible and desirable; online shopping was only getting more popular as the internet continued to grow. Centralized management was not only the simplest model for these systems, but was also often the only one that conformed to existing regulations. Unsurprisingly, digital cash made a resurgence in the decade following the dotcom bust. Big players, some, like PayPal, still recognizable today, managed to develop successful digital cash systems, all under the watchful eye of the world's governmental agencies.

Of course, the vision of a "decentralized" digital currency, one not directly controlled by global authorities, did not entirely fade out of existence. Computer science theory simply wasn't quite ready to bring that vision to reality. However, small pockets of researchers continued to study this problem and, as we'll explore in the next chapter, eventually found a pathway through it.
