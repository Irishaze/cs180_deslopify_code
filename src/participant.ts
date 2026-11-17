import { createCard } from "./card.js";
import { Hand } from "./hand.js";

export interface ICardHolder {
  receiveCard(card: createCard): void;
  resetCards(): void;
}

export abstract class createParticipant implements ICardHolder {
  name: string;
  hand: Hand<createCard> = new Hand<createCard>();

  constructor(name: string) {
    this.name = name;
  }

  getHand(): Hand<createCard> {
    return this.hand;
  }

  getName(): string {
    return this.name;
  }

  receiveCard(card: createCard): void {
    this.hand.add(card);
  }

  resetCards(): void {
    this.hand.clear();
  }
}
