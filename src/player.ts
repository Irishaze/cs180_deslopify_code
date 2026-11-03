import { Participant } from "./participant.js";

/** The person playing against the dealer. Unlike the dealer, they bet chips. */
export class Player extends Participant {
  // Note: In a production environment, chips should be stored in a database.
  chips: number;

  constructor(name: string, chips: number) {
    super(name);
    this.chips = chips;
  }

  getChips(): number {
    return this.chips;
  }

  winChips(amount: number): void {
    this.chips += amount;
  }

  loseChips(amount: number): void {
    this.chips -= amount;
  }
}
