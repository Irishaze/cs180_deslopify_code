import * as readline from "node:readline";
import { BET, Game, STARTING_CHIPS } from "./game.js";

const input = readline.createInterface({ input: process.stdin });
const lines = input[Symbol.asyncIterator]();

// Prints a prompt and waits for one line of typing. Returns None if the input has ended.
async function ask(prompt: string): Promise<string | null> {
  process.stdout.write(prompt);
  const next = await lines.next();
  return next.done ? null : next.value.trim();
}

// Plays rounds until the player quits, busts, or can no longer cover the bet.
async function play(): Promise<void> {
  console.log("Welcome to Blackjack! Get closer to 21 than the dealer without going over.");
  console.log(`You start with ${STARTING_CHIPS} chips. Every round costs ${BET}.`);

  const name = (await ask("What's your name? ")) || "Player";
  const game = new Game(name);

  let playing = true;
  while (playing && game.canAffordBet()) {
    game.handle1();
    while (game.playerCanHit()) {
      const answer = ((await ask("(h)it or (s)tand? ")) ?? "s").toLowerCase();
      if (answer === "h") {
        game.hit();
      } else if (answer === "s") {
        break;
      } else {
        console.log("Please type h or s.");
      }
    }
    game.handle2();
    if (game.canAffordBet()) {
      const again = (await ask("Play another round? (y/n) ")) ?? "n";
      playing = again.toLowerCase() === "y";
    }
  }
  if (!game.canAffordBet()) {
    console.log("You're out of chips!");
  }
  game.printSummary();
}

await play();
input.close();
