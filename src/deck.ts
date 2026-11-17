import { createCard } from "./card.js";

const SUITS = ["Spades", "Hearts", "Diamonds", "Clubs"];
const NUMBERS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const RESHUFFLE_BELOW = 15;

// The deck reshuffles itself when the number of cards gets low.
export class Deck {
  private cards: createCard[] = [];

  constructor() {
    this.refill();
  }

  private refill(): void {
    this.cards = [];
    for (const suit of SUITS) {
      for (const num of NUMBERS) {
        this.cards.push(new createCard(num, suit));
      }
    }
    // Fisher-Yates shuffle: swap each card with a random card at or before it
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): createCard {
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
