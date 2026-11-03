import { Card } from "./card.js";
import { Hand } from "./hand.js";

/** Anything in the game that can hold cards. */
export interface ICardHolder {
  receiveCard(card: Card): void;
  resetCards(): void;
}

/** Someone sitting at the table: they have a name and a hand. Shared by Player and Dealer. */
export abstract class Participant implements ICardHolder {
  name: string;
  hand: Hand<Card> = new Hand<Card>();

  constructor(name: string) {
    this.name = name;
  }

  getHand(): Hand<Card> {
    return this.hand;
  }

  getName(): string {
    return this.name;
  }

  receiveCard(card: Card): void {
    this.hand.add(card);
  }

  resetCards(): void {
    this.hand.clear();
  }
}
