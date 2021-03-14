import { Card } from "./Card";
import { Combination, Combinations } from "./Combinations";
import { FiveCards } from "./Helpers/Types";

class Player {
  cards: FiveCards;
  combinations: Array<Combination>;
  highCard: Card;
  highestRank: Combination;

  /**
   * A Player with a set of 5 cards.
   * The class has all of the player's valid combinations, the highest ranked one, and the players highest card.
   */
  constructor(cards: FiveCards) {
    this.cards = cards;
    this.combinations = Combinations.find(this.cards);
    this.highCard = cards.sort((cardA, cardB) => cardB.value - cardA.value)[0];
    this.highestRank = this.combinations[0];
  }
}

export { Player };
