import { createParticipant } from "./participant.js";

export class createPlayer extends createParticipant {
  // Note: In a production environment, chips should be stored in a database.
  chips: number;

  constructor(name: string, chips: number) {
    super(name);
    this.chips = chips;
  }

  Chips(): number {
    return this.chips;
  }

  winChips(amount: number): void {
    this.chips += amount;
  }

  loseChips(amount: number): void {
    this.chips -= amount;
  }
}