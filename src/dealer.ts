import { Participant } from "./participant.js";

/** The dealer. They play by fixed rules and never bet. */
export class Dealer extends Participant {
  constructor() {
    super("Dealer");
  }
}
