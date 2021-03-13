import fs from "fs";

import { InputValidation } from "./Helpers/InputValidation";
import { LineSplitter } from "./Helpers/LineSplitter";
import { Card } from "./Card";
import { Player, FiveCards } from "./Player";
import { comparePlayerHands } from "./Helpers/CompareHighestCard";

/**
 * Main entry method for our library.
 * @param file - File to read stream of player hands from.
 */
const casinoRoyale = (file: string): [string, string] => {
  // Return is [string, string] to force 2 players. Array<string> could have n Players.

  var player1Hands = 0;
  var player2Hands = 0;

  const data = fs.readFileSync(file).toString().split("\n");
  data.forEach((line) => {
    // Check that the line is valid, otherwise skip it.
    const isValid = InputValidation.lineValidation(line);
    if (!isValid) {
      return;
    }

    // Initiating Cards for each player.
    const [player1RawCards, player2RawCards] = LineSplitter.lineSplitter(line);
    const playerCards1 = player1RawCards.map((line) => new Card(line));
    const playerCards2 = player2RawCards.map((line) => new Card(line));

    const player1Hand = new Player(playerCards1 as FiveCards);
    const player2Hand = new Player(playerCards2 as FiveCards);

    const winner = comparePlayerHands(player1Hand, player2Hand);
    if (winner.player1) {
      player1Hands++;
    } else if (winner.player2) {
      player2Hands++;
    } else {
      // Complete tie, do nothing.
    }
  });

  return [`Player 1: ${player1Hands}`, `Player 2: ${player2Hands}`];
};

export { casinoRoyale };
