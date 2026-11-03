/** One playing card, like "Q of Hearts". */
export class Card {
  rank: string;
  suit: string;

  constructor(rank: string, suit: string) {
    this.rank = rank;
    this.suit = suit;
  }

  isAce(): boolean {
    return this.rank === "A";
  }

  /** Aces count as 11 here. Hand turns them into 1 when 11 would bust. */
  getValue(): number {
    if (this.isAce()) {
      return 11;
    }
    if (this.rank === "J" || this.rank === "Q" || this.rank === "K") {
      return 10;
    }
    return Number(this.rank);
  }

  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}
