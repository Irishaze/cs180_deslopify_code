import { Deck } from "./deck.js";
import { createDealer } from "./dealer.js";
import { createPlayer } from "./player.js";

export const STARTING_CHIPS = 100;
export const BET = 10;
const DEALER_STANDS_AT = 17;

export class Game {
  player: createPlayer;
  private deck: Deck;
  private dealer = new createDealer();
  private round = 0;

  constructor(playerName: string) {
    this.deck = new Deck();
    this.player = new createPlayer(playerName, STARTING_CHIPS);
  }

  canAffordBet(): boolean {
    return this.player.Chips() >= BET;
  }

  // Deals two cards each. The dealer's second card stays face down.
  handle1(): void {
    // Increment the round number
    this.round++;
    // Reset the player's cards
    this.player.resetCards();
    // Reset the dealer's cards
    this.dealer.resetCards();
    // Deal two cards each
    this.player.receiveCard(this.deck.draw());
    this.dealer.receiveCard(this.deck.draw());
    this.player.receiveCard(this.deck.draw());
    this.dealer.receiveCard(this.deck.draw());

    console.log();
    console.log(`=== Round ${this.round} | ${this.player.getName()} has ${this.player.Chips()} chips | Bet: ${BET} ===`);
    console.log(`Dealer shows: ${this.dealer.getHand().getFirstCard()}`);
    console.log(`Your hand:    ${this.player.getHand()}`);
  }

  // The player may keep hitting until they reach 21 or bust.
  playerCanHit(): boolean {
    return this.player.getHand().getValue() < 21;
  }

  // The player takes one more card from the deck.
  hit(): void {
    const card = this.deck.draw();
    this.player.receiveCard(card);
    console.log(`You draw ${card}. Your hand: ${this.player.getHand()}`);
  }

  // Finishes the round and settles the bet.
  handle2(): void {
    const hand = this.player.getHand();

    // A busted player loses even if the dealer would bust too, so the dealer doesn't play.
    if (hand.isBust()) {
      this.player.loseChips(BET);
      console.log(`Bust! You lose ${BET} chips.`);
      return;
    }

    console.log(`Dealer reveals: ${this.dealer.getHand()}`);

    // If the player has a blackjack, the dealer doesn't draw.
    // If both have a blackjack, this block is skipped and the comparison below scores it as a tie.
    if (hand.isBlackjack() && !this.dealer.getHand().isBlackjack()) {
      const payout = (BET * 3) / 2;
      this.player.winChips(payout);
      console.log(`Blackjack! You win ${payout} chips.`);
      return;
    }

    while (this.dealer.getHand().getValue() < DEALER_STANDS_AT) {
      const card = this.deck.draw();
      this.dealer.receiveCard(card);
      console.log(`Dealer draws ${card}. Dealer: ${this.dealer.getHand()}`);
    }

    const mine = hand.getValue();
    const theirs = this.dealer.getHand().getValue();
    // The player hasn't busted, so if the dealer busts, the player wins.
    if (this.dealer.getHand().isBust() || mine > theirs) {
      this.player.winChips(BET);
      console.log(`You win ${BET} chips!`);
    } else if (mine === theirs) {
      console.log("Push. It's a tie, nobody wins.");
    } else {
      this.player.loseChips(BET);
      console.log(`Dealer wins. You lose ${BET} chips.`);
    }
  }

  printSummary(): void {
    const change = this.player.Chips() - STARTING_CHIPS;
    // condition ? a : b picks a when the condition is true, otherwise b ("1 round" vs "3 rounds")
    const rounds = this.round === 1 ? "1 round" : `${this.round} rounds`;
    console.log();
    console.log(`=== ${this.player.getName()} leaves the table after ${rounds} ===`);
    // Put a "+" in front of a gain, like "+15". A loss already has its "-", like "-20".
    console.log(`Chips: ${this.player.Chips()} (${change >= 0 ? "+" : ""}${change})`);
  }
}
