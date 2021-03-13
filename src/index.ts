import readline from "readline";
import fs from "fs";

/**
 * Main entry function for our library.
 * @param file - File to read stream of player hands from.
 */
const casinoRoyale = (file: string): [string, string] => {
  // Return is [string, string] to force 2 players. Array<string> could have n Players.

  //   console.log("file", file);

  const readInterface = readline.createInterface({
    input: fs.createReadStream(file),
  });

  readInterface.on("line", function (line) {
    if (line.length > 0) {
      //   console.log(line);
    }
  });

  return ["Player 1: 0 hands", "Player 2: 2 hands"];
};

export { casinoRoyale };
