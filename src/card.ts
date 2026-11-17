export class createCard {
  number: string;
  suit: string;

  constructor(number: string, suit: string) {
    this.number = number;
    this.suit = suit;
  }

  isAce(): boolean {
    return this.number === "A";
  }

  getValue(): number {
    if (this.isAce()) {
      return 11;
    }
    if (this.number === "J" || this.number === "Q" || this.number === "K") {
      return 10;
    }
    return Number(this.number);
  }

  toString(): string {
    return `${this.number} of ${this.suit}`;
  }
}
