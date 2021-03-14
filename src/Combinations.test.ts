import { expect } from "chai";
import { Card } from "./Card";

import { Combinations } from "./Combinations";
import { FiveCards } from "./Helpers/Types";

describe("Combinations", () => {
  /**
   * Testing helper only. Receives string array and transforms into FiveCards.
   */
  const cardFactory = (cards: string[]): FiveCards => {
    return cards.map((card) => new Card(card)) as FiveCards;
  };

  describe("highCard", () => {
    it("should return high card if ace is found", () => {
      let cards: FiveCards = cardFactory(["2D", "3D", "4D", "5D", "AJ"]);
      expect(Combinations.highCard(cards)).to.eql({ rank: 1, highestCard: 14 });
    });

    it("should return zero rank if ace is missing", () => {
      let cards: FiveCards = cardFactory(["2D", "3D", "4D", "5D", "3J"]);
      expect(Combinations.highCard(cards)).to.eql({ rank: 0, highestCard: 5 });
    });
  });

  describe("groupings", () => {
    it("should return 0 rank if no duplicates", () => {
      let cards: FiveCards = cardFactory(["2D", "3D", "4D", "5D", "6J"]);
      expect(Combinations.groupings(cards)).to.eql({ rank: 0, highestCard: 6 });
    });

    it("should return pair if single duplicate", () => {
      let cards: FiveCards = cardFactory(["2D", "2D", "4D", "5D", "6J"]);
      expect(Combinations.groupings(cards)).to.eql({ rank: 2, highestCard: 2 });
    });

    it("should return two pairs if two duplicates", () => {
      let cards: FiveCards = cardFactory(["2D", "2D", "4D", "4D", "6J"]);
      expect(Combinations.groupings(cards)).to.eql({ rank: 3, highestCard: 4 });
    });

    it("should return three of a kind if triple", () => {
      let cards: FiveCards = cardFactory(["1D", "2D", "4D", "4D", "4J"]);
      expect(Combinations.groupings(cards)).to.eql({ rank: 4, highestCard: 4 });
    });

    it("should return full house if triple and duplicate", () => {
      let cards: FiveCards = cardFactory(["2D", "2D", "4D", "4D", "4J"]);
      expect(Combinations.groupings(cards)).to.eql({ rank: 7, highestCard: 4 });
    });

    it("should return zero rank if no requirements met", () => {
      let cards: FiveCards = cardFactory(["1D", "2D", "3D", "4D", "5J"]);
      expect(Combinations.groupings(cards)).to.eql({ rank: 0, highestCard: 5 });
    });
  });

  describe("straightAndFlush", () => {
    it("should return straight if cards are in consecutive order", () => {
      let cards: FiveCards = cardFactory(["2D", "3D", "4D", "5D", "6J"]);
      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 5,
        highestCard: 6,
      });
    });

    it("should return flush if cards are all same suit", () => {
      let cards: FiveCards = cardFactory(["2D", "3D", "TD", "5D", "KD"]);
      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 6,
        highestCard: 13,
      });
    });

    it("should return straight flush if cards are all same suit in consecutive order", () => {
      let cards: FiveCards = cardFactory(["2D", "3D", "4D", "5D", "6D"]);
      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 9,
        highestCard: 6,
      });
    });

    it("should return rank 0 if no requirements met", () => {
      let cards: FiveCards = cardFactory(["1D", "3D", "4S", "5D", "6D"]);
      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 0,
        highestCard: 6,
      });
    });
  });

  describe("fourOfAKind", () => {
    it("should return four of a kind if 4 cards have the same value", () => {
      let cards: FiveCards = cardFactory(["1D", "1K", "2S", "1D", "1D"]);
      expect(Combinations.fourOfAKind(cards)).to.eql({
        rank: 8,
        highestCard: 1,
      });
    });

    it("should return rank 0 if not four cards of same value", () => {
      let cards: FiveCards = cardFactory(["2D", "1K", "2S", "1D", "1D"]);
      expect(Combinations.fourOfAKind(cards)).to.eql({
        rank: 0,
        highestCard: 2,
      });
    });

    it("should return rank 0 if five cards of same value", () => {
      let cards: FiveCards = cardFactory(["1D", "1K", "1S", "1D", "1D"]);
      expect(Combinations.fourOfAKind(cards)).to.eql({
        rank: 0,
        highestCard: 1,
      });
    });
  });

  describe("royalFlush", () => {
    it("should return a royal flush if all cards are 10, 11, 12, 13, 14 and same suit", () => {
      const cards: FiveCards = cardFactory(["TD", "JD", "QD", "KD", "AD"]);
      expect(Combinations.royalFlush(cards)).to.eql({
        rank: 10,
        highestCard: 14,
      });
    });

    it("should return rank 0 if all cards are 10, 11, 12, 13, 14 and different suit", () => {
      const cards: FiveCards = cardFactory(["TD", "JD", "QD", "KD", "AS"]);
      expect(Combinations.royalFlush(cards)).to.eql({
        rank: 0,
        highestCard: 14,
      });
    });

    it("should return rank 0 if all cards are same suit but not 10, 11, 12, 13, 14", () => {
      const cards: FiveCards = cardFactory(["9D", "JD", "QD", "KD", "8S"]);

      expect(Combinations.royalFlush(cards)).to.eql({
        rank: 0,
        highestCard: 13,
      });
    });
  });
});
