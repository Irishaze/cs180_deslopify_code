import { Card } from "./card.js";

const SUITS = ["Spades", "Hearts", "Diamonds", "Clubs"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const RESHUFFLE_BELOW = 15;

// Here's the updated Deck class with improved shuffling logic:

/** A standard 52-card deck. It reshuffles itself when it gets low. */
export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.refill();
  }

  private refill(): void {
    this.cards = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        this.cards.push(new Card(rank, suit));
      }
    }
    // Fisher-Yates shuffle: swap each card with a random card at or before it
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card {
    if (this.getRemainingCards() < RESHUFFLE_BELOW) {
      console.log("(The dealer shuffles a fresh deck.)");
      this.refill();
    }
    return this.cards.pop()!;
  }

  getRemainingCards(): number {
    return this.cards.length;
  }
}
