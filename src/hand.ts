import { createCard } from "./card.js";

// T is the kind of card this hand holds. It must be createCard or a subclass of it.
export class Hand<T extends createCard = createCard> {
  private cards: T[] = [];

  add(card: T): void {
    this.cards.push(card);
  }

  clear(): void {
    this.cards = [];
  }

  getCards(): T[] {
    return this.cards;
  }

  getCardCount(): number {
    return this.cards.length;
  }

  getCardAt(index: number): T {
    return this.cards[index];
  }

  getFirstCard(): T {
    return this.getCardAt(0);
  }

  // Each ace counts as 11 unless that would bust, then it counts as 1.
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

  isBust(): boolean {
    return this.getValue() > 21;
  }

  isBlackjack(): boolean {
    return this.getCardCount() === 2 && this.getValue() === 21;
  }

  toString(): string {
    return `[${this.getCards().join(", ")}] = ${this.getValue()}`;
  }
}
