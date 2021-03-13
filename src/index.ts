import readline from "readline";
import fs from "fs";

import { InputValidation } from "./Helpers/InputValidation";
import { LineSplitter } from "./Helpers/LineSplitter";
import { Card } from "./Card";

/**
 * Main entry method for our library.
 * @param file - File to read stream of player hands from.
 */
const casinoRoyale = (file: string): [string, string] => {
  // Return is [string, string] to force 2 players. Array<string> could have n Players.

  var player1Hands = 0;
  var player2Hands = 0;

  const readInterface = readline.createInterface({
    input: fs.createReadStream(file),
  });

  readInterface.on("line", function (line) {
    // Check that the line is valid, otherwise skip it.
    const isValid = InputValidation.lineValidation(line);
    if (!isValid) {
      return;
    }

    // Initiating Cards for each player.
    const [player1RawCards, player2RawCards] = LineSplitter.lineSplitter(line);
    const playerCards1 = player1RawCards.map((line) => new Card(line));
    const playerCards2 = player2RawCards.map((line) => new Card(line));

    console.log({ playerCards1, playerCards2 });
  });

  return [`Player 1: ${player1Hands} hands`, `Player 2: ${player2Hands} hands`];
};

export { casinoRoyale };
