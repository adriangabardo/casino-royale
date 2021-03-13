import { InputValidation } from "./InputValidation";

class LineSplitter {
  /**
   * Static method that splits a line of hands into an array of 2 card arrays.
   * @param line - Single line with hands from 2 players, each containing 5 cards.
   */
  static lineSplitter(line: string): [string[], string[]] {
    const cards = line.match(InputValidation.cardValidationGroup);

    if (cards == undefined || cards.length != 10) {
      // Throwing here because its after our validation method, this shouldn't happen.
      throw new Error("Players hands does not contain 10 valid cards.");
    }

    const player1Cards = cards.slice(0, 5).map((card) => card.trim());
    const player2Cards = cards.slice(5).map((card) => card.trim());

    return [player1Cards, player2Cards];
  }
}

export { LineSplitter };
