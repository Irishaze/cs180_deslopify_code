import { Card } from "./card.js";

/** The cards one person is holding. Generic so it can hold any kind of card. */
export class Hand<T extends Card = Card> {
  private cards: T[] = [];

  /** Adds a card to the hand. */
  add(card: T): void {
    this.cards.push(card);
  }

  /** Clears the hand. */
  clear(): void {
    this.cards = [];
  }

  /** Gets the cards. */
  getCards(): T[] {
    return this.cards;
  }

  /** Gets the card count. */
  getCardCount(): number {
    return this.cards.length;
  }

  /** Gets the card at the given index. */
  getCardAt(index: number): T {
    return this.cards[index];
  }

  /** Gets the first card. */
  getFirstCard(): T {
    return this.getCardAt(0);
  }

  /** Adds up the cards. Each ace counts as 11 unless that would bust, then it counts as 1. */
  getValue(): number {
    let total = 0;
    let aces = 0;
    for (const card of this.cards) {
      total += card.getValue();
      if (card.isAce()) {
        aces++;
      }
    }
    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }
    return total;
  }

  /** Checks if the hand is bust. */
  isBust(): boolean {
    return this.getValue() > 21;
  }

  /** 21 with exactly two cards: an ace plus a 10-value card. */
  isBlackjack(): boolean {
    return this.getCardCount() === 2 && this.getValue() === 21;
  }

  /** Converts the hand to a string. */
  toString(): string {
    return `[${this.getCards().join(", ")}] = ${this.getValue()}`;
  }
}
