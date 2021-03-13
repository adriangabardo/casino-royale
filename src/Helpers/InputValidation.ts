class InputValidation {
  // Regex for [2-9TJQKA] [DHSC] [Optional Whitespace] [Negative Lookahead].
  // First set is card value, second is card suit.
  // Matches an optional whitespace as well and does a negative lookahead to make sure line ends.

  /**
   * Regex to match 10 cards in a line and no more characters found after 10 cards.
   */
  static lineValidationGroup = new RegExp(
    "([2-9TJQKA]{1}[DHSC]{1}[\\s]?){10}(?!.)",
    "i"
  );

  /**
   * Regex to match a single card in a line.
   */
  static cardValidationGroup = new RegExp(
    "([2-9TJQKA]{1}[DHSC]{1}[\\s]?){1}",
    "ig"
  );

  /**
   * Static helper method to check the validity of a received input.
   * @param line - Line of 2 players hands. Should be 10 cards total.
   */
  static lineValidation(line: string): boolean {
    return this.lineValidationGroup.test(line);
  }
}

export { InputValidation };
