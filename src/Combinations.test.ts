import "mocha";
import { expect } from "chai";
import { Card } from "./Card";

import { Combinations } from "./Combinations";
import { FiveCards } from "./Player";

describe("Combinations", () => {
  describe("highCard", () => {
    it("should return high card if ace is found", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("3D"),
        new Card("4D"),
        new Card("5D"),
        new Card("AJ"),
      ];

      expect(Combinations.highCard(cards)).to.eql({ rank: 1, highestCard: 14 });
    });

    it("should return zero rank if ace is missing", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("3D"),
        new Card("4D"),
        new Card("5D"),
        new Card("3J"),
      ];

      expect(Combinations.highCard(cards)).to.eql({ rank: 0, highestCard: 5 });
    });
  });

  describe("groupings", () => {
    it("should return 0 rank if no duplicates", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("3D"),
        new Card("4D"),
        new Card("5D"),
        new Card("6J"),
      ];

      expect(Combinations.groupings(cards)).to.eql({ rank: 0, highestCard: 6 });
    });

    it("should return pair if single duplicate", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("2D"),
        new Card("4D"),
        new Card("5D"),
        new Card("6J"),
      ];

      expect(Combinations.groupings(cards)).to.eql({ rank: 2, highestCard: 2 });
    });

    it("should return two pairs if two duplicates", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("2D"),
        new Card("4D"),
        new Card("4D"),
        new Card("6J"),
      ];

      expect(Combinations.groupings(cards)).to.eql({ rank: 3, highestCard: 4 });
    });

    it("should return three of a kind if triple", () => {
      let cards: FiveCards = [
        new Card("1D"),
        new Card("2D"),
        new Card("4D"),
        new Card("4D"),
        new Card("4J"),
      ];

      expect(Combinations.groupings(cards)).to.eql({ rank: 4, highestCard: 4 });
    });

    it("should return full house if triple and duplicate", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("2D"),
        new Card("4D"),
        new Card("4D"),
        new Card("4J"),
      ];

      expect(Combinations.groupings(cards)).to.eql({ rank: 7, highestCard: 4 });
    });

    it("should return zero rank if no requirements met", () => {
      let cards: FiveCards = [
        new Card("1D"),
        new Card("2D"),
        new Card("3D"),
        new Card("4D"),
        new Card("5J"),
      ];

      expect(Combinations.groupings(cards)).to.eql({ rank: 0, highestCard: 5 });
    });
  });

  describe("straightAndFlush", () => {
    it("should return straight if cards are in consecutive order", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("3D"),
        new Card("4D"),
        new Card("5D"),
        new Card("6J"),
      ];

      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 5,
        highestCard: 6,
      });
    });

    it("should return flush if cards are all same suit", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("3D"),
        new Card("TD"),
        new Card("5D"),
        new Card("KD"),
      ];

      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 6,
        highestCard: 13,
      });
    });

    it("should return straight flush if cards are all same suit in consecutive order", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("3D"),
        new Card("4D"),
        new Card("5D"),
        new Card("6D"),
      ];

      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 9,
        highestCard: 6,
      });
    });

    it("should return rank 0 if no requirements met", () => {
      let cards: FiveCards = [
        new Card("1D"),
        new Card("3D"),
        new Card("4S"),
        new Card("5D"),
        new Card("6D"),
      ];

      expect(Combinations.straightAndFlush(cards)).to.eql({
        rank: 0,
        highestCard: 6,
      });
    });
  });

  describe("fourOfAKind", () => {
    it("should return four of a kind if 4 cards have the same value", () => {
      let cards: FiveCards = [
        new Card("1D"),
        new Card("1K"),
        new Card("2S"),
        new Card("1D"),
        new Card("1D"),
      ];

      expect(Combinations.fourOfAKind(cards)).to.eql({
        rank: 8,
        highestCard: 1,
      });
    });

    it("should return rank 0 if not four cards of same value", () => {
      let cards: FiveCards = [
        new Card("2D"),
        new Card("1K"),
        new Card("2S"),
        new Card("1D"),
        new Card("1D"),
      ];

      expect(Combinations.fourOfAKind(cards)).to.eql({
        rank: 0,
        highestCard: 2,
      });
    });

    it("should return rank 0 if five cards of same value", () => {
      let cards: FiveCards = [
        new Card("1D"),
        new Card("1K"),
        new Card("1S"),
        new Card("1D"),
        new Card("1D"),
      ];

      expect(Combinations.fourOfAKind(cards)).to.eql({
        rank: 0,
        highestCard: 1,
      });
    });
  });

  describe("royalFlush", () => {
    it("should return a royal flush if all cards are 10, 11, 12, 13, 14 and same suit", () => {
      const sampleCards: FiveCards = [
        new Card("TD"),
        new Card("JD"),
        new Card("QD"),
        new Card("KD"),
        new Card("AD"),
      ];

      expect(Combinations.royalFlush(sampleCards)).to.eql({
        rank: 10,
        highestCard: 14,
      });
    });

    it("should return rank 0 if all cards are 10, 11, 12, 13, 14 and different suit", () => {
      const sampleCards: FiveCards = [
        new Card("TD"),
        new Card("JD"),
        new Card("QD"),
        new Card("KD"),
        new Card("AS"),
      ];

      expect(Combinations.royalFlush(sampleCards)).to.eql({
        rank: 0,
        highestCard: 14,
      });
    });

    it("should return rank 0 if all cards are same suit but not 10, 11, 12, 13, 14", () => {
      const sampleCards: FiveCards = [
        new Card("9D"),
        new Card("JD"),
        new Card("QD"),
        new Card("KD"),
        new Card("8S"),
      ];

      expect(Combinations.royalFlush(sampleCards)).to.eql({
        rank: 0,
        highestCard: 13,
      });
    });
  });
});
