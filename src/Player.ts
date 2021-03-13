import { Card } from "./Card";
import { Combination, Combinations } from "./Combinations";

type FiveCards = [Card, Card, Card, Card, Card]; // Array of specifically 5 cards

class Player {
  cards: FiveCards;
  combinations: Array<Combination>;
  highCard: Card;
  highestRank: Combination;

  constructor(cards: FiveCards) {
    this.cards = cards;
    this.combinations = Combinations.find(this.cards);
    this.highCard = cards.sort((cardA, cardB) => cardB.value - cardA.value)[0];
    this.highestRank = this.combinations[0];
  }
}

export { Player, FiveCards };
