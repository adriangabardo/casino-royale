import { expect } from "chai";
import { Card, Suit } from "./Card";

describe("Card", () => {
  it("Each string should be matched to a correct number and suit", () => {
    const cardObjects: {
      card: string;
      expectedNumber: number;
      expectedSuit: Suit;
    }[] = [
      {
        card: "2D",
        expectedNumber: 2,
        expectedSuit: Suit.D,
      },
      {
        card: "3H",
        expectedNumber: 3,
        expectedSuit: Suit.H,
      },
      {
        card: "4C",
        expectedNumber: 4,
        expectedSuit: Suit.C,
      },
      {
        card: "5S",
        expectedNumber: 5,
        expectedSuit: Suit.S,
      },
      {
        card: "6D",
        expectedNumber: 6,
        expectedSuit: Suit.D,
      },
      {
        card: "7D",
        expectedNumber: 7,
        expectedSuit: Suit.D,
      },
      {
        card: "8D",
        expectedNumber: 8,
        expectedSuit: Suit.D,
      },
      {
        card: "9D",
        expectedNumber: 9,
        expectedSuit: Suit.D,
      },
      {
        card: "TD",
        expectedNumber: 10,
        expectedSuit: Suit.D,
      },
      {
        card: "JD",
        expectedNumber: 11,
        expectedSuit: Suit.D,
      },
      {
        card: "QD",
        expectedNumber: 12,
        expectedSuit: Suit.D,
      },
      {
        card: "KD",
        expectedNumber: 13,
        expectedSuit: Suit.D,
      },
      {
        card: "AD",
        expectedNumber: 14,
        expectedSuit: Suit.D,
      },
    ];

    cardObjects.forEach((cardObj) => {
      let card = new Card(cardObj.card);
      expect(card.value).to.equal(cardObj.expectedNumber);
      expect(card.suit).to.eql(cardObj.expectedSuit);
    });
  });

  it("Should give NaN if number is not an expected value", () => {
    const testCard = new Card("XD");
    expect(testCard.value).to.eql(NaN);
  });
});
