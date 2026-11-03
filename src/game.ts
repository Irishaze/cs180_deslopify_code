import { Deck } from "./deck.js";
import { Dealer } from "./dealer.js";
import { Player } from "./player.js";

export const STARTING_CHIPS = 100;
export const BET = 10;
const DEALER_STANDS_AT = 17; // The dealer keeps hitting until they reach 16

/** Runs rounds of blackjack between one player and the dealer. */
export class Game {
  player: Player;
  private deck: Deck;
  private dealer = new Dealer();
  private round = 0;

  constructor(playerName: string) {
    this.deck = new Deck();
    this.player = new Player(playerName, STARTING_CHIPS);
  }

  canAffordBet(): boolean {
    return this.player.getChips() >= BET;
  }

  /** Deals two cards each. The dealer's second card stays face down. */
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

    // Show the round header, the dealer's face-up card and the player's hand
    console.log();
    console.log(`=== Round ${this.round} | ${this.player.getName()} has ${this.player.getChips()} chips | Bet: ${BET} ===`);
    console.log(`Dealer shows: ${this.dealer.getHand().getFirstCard()}`);
    console.log(`Your hand:    ${this.player.getHand()}`);
  }

  /** The player may keep hitting until they reach 21 or bust. */
  playerCanHit(): boolean {
    return this.player.getHand().getValue() < 21;
  }

  /** The player takes one more card from the deck. */
  hit(): void {
    const card = this.deck.draw();
    this.player.receiveCard(card);
    console.log(`You draw ${card}. Your hand: ${this.player.getHand()}`);
  }

  /** Dealer plays out their hand, then the bet is settled. */
  handle2(): void {
    const hand = this.player.getHand();

    // 1. If the player went over 21, they lose right away. The dealer doesn't play.
    if (hand.isBust()) {
      this.player.loseChips(BET);
      console.log(`Bust! You lose ${BET} chips.`);
      return;
    }

    // 2. Turn over the dealer's hidden card.
    console.log(`Dealer reveals: ${this.dealer.getHand()}`);

    // 3. A blackjack pays 1.5 times the bet, unless the dealer has one too.
    //    The dealer doesn't need to draw: a blackjack only counts with the first two cards,
    //    and any other 21 still loses to the player's blackjack.
    if (hand.isBlackjack() && !this.dealer.getHand().isBlackjack()) {
      const payout = (BET * 3) / 2;
      this.player.winChips(payout);
      console.log(`Blackjack! You win ${payout} chips.`);
      return;
    }

    // 4. The dealer has no choice: keep drawing until the total is 17 or more.
    while (this.dealer.getHand().getValue() < DEALER_STANDS_AT) {
      const card = this.deck.draw();
      this.dealer.receiveCard(card);
      console.log(`Dealer draws ${card}. Dealer: ${this.dealer.getHand()}`);
    }

    // 5. Compare totals. A dealer who went over 21 loses to any player still in the game.
    const mine = hand.getValue();
    const theirs = this.dealer.getHand().getValue();
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

  /** Prints how many rounds were played and how many chips were won or lost. */
  printSummary(): void {
    const change = this.player.getChips() - STARTING_CHIPS;
    // condition ? a : b picks a when the condition is true, otherwise b ("1 round" vs "3 rounds")
    const rounds = this.round === 1 ? "1 round" : `${this.round} rounds`;
    console.log();
    console.log(`=== ${this.player.getName()} leaves the table after ${rounds} ===`);
    // Put a "+" in front of a gain, like "+15". A loss already has its "-", like "-20".
    console.log(`Chips: ${this.player.getChips()} (${change >= 0 ? "+" : ""}${change})`);
  }
}
