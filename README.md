# Blackjack

A small command-line Blackjack game in TypeScript. You play against the dealer.

## Run it

You need [Node.js](https://nodejs.org) 20 or newer. Check with `node -v`.

From this folder:

```bash
npm install       # first time only
npm start         # play
```

## Your answers

Write what you found and fixed in `ANSWERS.md`.

## Rules

- Try to get closer to **21** than the dealer without going over. Going over 21 is a **bust**, and you lose.
- Number cards are worth their number. J, Q and K are worth 10. An ace is worth 11, or 1 if 11 would make you bust.
- You and the dealer each get two cards. You see only one of the dealer's cards.
- On your turn, **hit** (take another card) as many times as you like, or **stand** (stop).
- Then the dealer reveals their hidden card and must keep hitting until they have 17 or more. There are two exceptions:
  - If you bust, you lose right away and the dealer doesn't play.
  - If you have a blackjack, the dealer only reveals their hidden card. You win unless the dealer also has a blackjack, which makes it a tie.
- You start with 100 chips, and every round you bet 10:
  - **Win:** +10 chips
  - **Blackjack** (an ace plus a 10-value card as your first two cards): +15 chips
  - **Tie** ("push"): you keep your bet
  - **Lose:** -10 chips

## Code map

| File | What it does |
|---|---|
| `src/main.ts` | Starts the game and reads your choices |
| `src/game.ts` | Deals cards, runs the dealer's turn, settles bets |
| `src/participant.ts` | What the player and the dealer have in common |
| `src/player.ts` | You: name, chips and hand |
| `src/dealer.ts` | The dealer |
| `src/hand.ts` | A set of cards and their total value |
| `src/deck.ts` | 52 shuffled cards |
| `src/card.ts` | One card, like "Q of Hearts" |
