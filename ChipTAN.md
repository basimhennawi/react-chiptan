ChipTAN / CardTAN
-----------------

ChipTAN is a TAN scheme used by many German and Austrian banks. It is known as ChipTAN in Germany and as CardTAN in Austria, whereas cardTAN is a technically independent standard.

A ChipTAN generator is not tied to a particular account; instead, the user must insert their bank card during use. The TAN generated is specific to the bank card as well as to the current transaction details. There are two variants: In the older variant, the transaction details (at least amount and account number) must be entered manually. In the modern variant, the user enters the transaction online, then the TAN generator reads the transaction details via a flickering barcode on the computer screen (using photodetectors). It then shows the transaction details on its own screen to the user for confirmation before generating the TAN.

As it is independent hardware, coupled only by a simple communication channel, the TAN generator is not susceptible to attack from the user's computer. Even if the computer is subverted by a Trojan, or if a man-in-the-middle attack occurs, the TAN generated is only valid for the transaction confirmed by the user on the screen of the TAN generator, therefore modifying a transaction retroactively would cause the TAN to be invalid.

An additional advantage of this scheme is that because the TAN generator is generic, requiring a card to be inserted, it can be used with multiple accounts across different banks, and losing the generator is not a security risk because the security-critical data is stored on the bank card.

While it offers protection from technical manipulation, the ChipTAN scheme is still vulnerable to social engineering. Attackers have tried to persuade the users themselves to authorize a transfer under a pretext, for example by claiming that the bank required a "test transfer" or that a company had falsely transferred money to the user's account and they should "send it back". Users should therefore never perform bank transfers they have not initiated themselves.

ChipTAN is also used to secure batch transfers (Sammelüberweisungen). However, this method offers significantly less security than the one for individual transfers. In case of a batch transfer the TAN generator will only show the number and total amount of all transfers combined – thus for batch transfers there is little protection from manipulation by a Trojan. This vulnerability was reported by RedTeam Pentesting in November 2009. In response, as a mitigation, some banks changed their batch transfer handling the way that batch transfers containing only a single record are treated as individual transfers.

This optical interface is described in the HHD specification (version 1.3) of the [ZKA](http://www.hbci-zka.de). The problem is that the specification is **only partially public**. So there is only the way through reverse engineering. ![ninjatroll](https://git.io/ninjatroll)
 