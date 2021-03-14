import { expect } from "chai";

import { comparePlayerHands } from "./ComparePlayerHands";
import { Player } from "../Player";
import { Card } from "../Card";
import { FiveCards } from "./Types";

describe("comparePlayerHands", () => {
  /**
   * Testing helper only. Receives string array and transforms into FiveCards.
   */
  const cardFactory = (cards: string[]): FiveCards => {
    return cards.map((card) => new Card(card)) as FiveCards;
  };

  it("Pair of kings should beat pair of queens", () => {
    const player1Cards: FiveCards = cardFactory(["KD", "KH", "2D", "3D", "5D"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["QD", "QH", "2D", "3D", "5D"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: true, player2: false, tie: false });
  });

  it("Straight jacks should beat straight nines", () => {
    const player1Cards: FiveCards = cardFactory(["5D", "6H", "7D", "8D", "9S"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["7D", "8H", "9D", "TD", "JD"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Pair of kings with high card should beat pair of king with lower card", () => {
    const player1Cards: FiveCards = cardFactory(["KD", "KH", "2D", "3D", "5D"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["KD", "KH", "2D", "3D", "6D"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Full house of kings with high card should beat full house of king with lower card", () => {
    const player1Cards: FiveCards = cardFactory(["KD", "KH", "2D", "2D", "2D"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["KD", "KH", "6D", "6D", "6D"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Pair of 9s should beat pair of 4s", () => {
    const player1Cards: FiveCards = cardFactory(["KD", "QH", "9D", "4D", "4D"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["KD", "QH", "2D", "9D", "9D"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Highest card Ace should beat highest card Queen", () => {
    const player1Cards: FiveCards = cardFactory(["5D", "8C", "9S", "JS", "AC"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["2C", "5C", "7D", "8S", "QH"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: true, player2: false, tie: false });
  });

  it("Flush Diamonds should beat 3 aces", () => {
    const player1Cards: FiveCards = cardFactory(["2D", "9C", "AS", "AH", "AC"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["3D", "6D", "7D", "TD", "QD"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Exactly same hands should tie completely", () => {
    const player1Cards: FiveCards = cardFactory(["1D", "2D", "3D", "4D", "5D"]);
    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = cardFactory(["1D", "2D", "3D", "4D", "5D"]);
    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: false, tie: true });
  });
});
