enum Suit {
  D = "D",
  H = "H",
  S = "S",
  C = "C",
}

class Card {
  value: number;
  suit: Suit;

  /**
   * Construct a card from a string value of a valid card.
   * @param card - The card for a player.
   */
  constructor(card: string) {
    const rawValue = card.slice(0, 1);
    const rawSuit = card.slice(1, 2);

    this.value = this.fetchValue(rawValue);
    this.suit = rawSuit as Suit;
  }

  /**
   * Receives a raw value string and returns appropriate number
   * @param rawValue - Raw string value for card
   */
  private fetchValue(rawValue: string): number {
    switch (rawValue.toUpperCase()) {
      case "T":
        return 10;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "A":
        return 14;

      default:
        return Number(rawValue);
    }
  }
}

export { Card };
