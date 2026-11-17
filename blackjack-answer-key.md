# Blackjack Deslopify Answer Key

## Kinds of problem

### Bad comments

- Category A: repeats the code. The comment says what the code or the method name already says. Fix it by deleting the comment.
- Category B: doesn't match the code. The comment describes something the code doesn't do. Fix it by correcting or deleting the comment.

### Bad names

- Category A: meaningless. The name says nothing about what the method does.
- Category B: breaks conventions. Classes should be PascalCase nouns, and methods should be camelCase and start with a verb.
- Category C: misleading. The name suggests something the value isn't.
(Students need one example from each of the three categories.)

## Class hierarchy (spans several classes)

ICardHolder → createParticipant → createPlayer and createDealer

The participant class only holds name, hand, and one-line methods. The dealer class adds nothing but the name "Dealer". Any of these fixes is acceptable.

- Delete participant.ts and dealer.ts. The player class gets its own name and hand. Game uses "private dealerHand = new Hand()". receiveCard() and resetCards() become hand.add() and hand.clear(). Remove the two files from the README code map.
- Delete participant.ts. The player class gets its own name and hand. The dealer class gets its own hand and preferably another method. Remove participant.ts from the README code map.
- Delete ICardHolder, since it has only one implementation. Also delete the receiveCard() and resetCards() forwarders and keep the participant class.

## Card (card.ts)

### Bad names

- Line 1: rename the class name createCard to Card.
- Multiple places in this file: rename number to rank. A card's rank can be "A", "J", "Q" or "K", so it isn't a number.

## Deck (deck.ts)

### Redundant methods

- Line 37: delete getRemainingCards(), and use this.cards.length instead.

### Bad names

- Lines 4 and 18: rename NUMBERS to RANKS and num to rank. The list holds "A", "J", "Q" and "K", which aren't numbers.

## Hand (hand.ts)

### Unnecessary generics

- Line 4: "class Hand\<T extends createCard = createCard>" becomes "class Hand". Every hand holds the same card class, so T serves no useful purpose.

### Redundant methods

- Lines 15, 19 and 23: delete getCards(), getCardCount() and getCardAt(). Use this.cards, this.cards.length and this.cards[i] instead.
- Line 27: keep getFirstCard(), since game.ts uses it and cards is private, but return this.cards[0] instead of calling getCardAt(0).

## Participant (participant.ts)

### Bad names

- Line 9: rename createParticipant to Participant. Skip this if the student deletes the class as a class hierarchy fix.

### Redundant methods (if the class is kept, see class hierarchy)

- Lines 17 and 21: delete getHand() and getName(). Use .hand and .name instead.
- Lines 25 and 29: delete receiveCard() and resetCards(). They only forward to hand.add() and hand.clear(). Delete the ICardHolder interface too, since it requires these two methods. The class-hierarchy fixes also cover these.

## Player (player.ts)

### Redundant methods

- Line 12: delete Chips(), and use .chips instead.

### Bad comments

- Line 4: delete "Note: In a production environment, chips should be stored in a database." It's about a system that doesn't exist.

### Bad names

- Line 3: rename createPlayer to Player.

## Dealer (dealer.ts)

### Bad names

- Line 3: rename createDealer to Dealer. Skip this if the student deletes the class as a class-hierarchy fix.

## Game (game.ts)

### Bad comments

- Lines 26, 28 and 30: delete "Increment the round number", "Reset the player's cards" and "Reset the dealer's cards". Each one repeats the next line.
- Line 32: delete "Deal two cards each". It repeats the next four lines and the comment on line 24.
- Line 44: delete "The player may keep hitting until they reach 21 or bust." The method name and the check < 21 already say it.
- Line 49: delete "The player takes one more card from the deck." It repeats the method name.
- Line 100: delete "condition ? a : b picks a when ...". It explains TypeScript syntax, not this code.

### Bad names

- Line 25: rename handle1() to startRound(), or another name that says what it does.
- Line 57: rename handle2() to finishRound(), or another name that says what it does.

## main (main.ts)

### Bad comments

- Line 7: change "None" to "null". TypeScript has no None, and the function returns null.
- Line 14: remove "busts". Busting ends a round, not the game.
