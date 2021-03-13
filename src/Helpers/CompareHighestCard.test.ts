import "mocha";
import { expect } from "chai";

import { comparePlayerHands } from "./CompareHighestCard";
import { FiveCards, Player } from "../Player";
import { Card } from "../Card";

describe("comparePlayerHands", () => {
  it("Pair of kings should beat pair of queens", () => {
    const player1Cards: FiveCards = [
      new Card("KD"),
      new Card("KH"),
      new Card("2D"),
      new Card("3D"),
      new Card("5D"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("QD"),
      new Card("QH"),
      new Card("2D"),
      new Card("3D"),
      new Card("5D"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: true, player2: false, tie: false });
  });

  it("Straight jacks should beat straight nines", () => {
    const player1Cards: FiveCards = [
      new Card("5D"),
      new Card("6H"),
      new Card("7D"),
      new Card("8D"),
      new Card("9S"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("7D"),
      new Card("8H"),
      new Card("9D"),
      new Card("TD"),
      new Card("JD"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Pair of kings with high card should beat pair of king with lower card", () => {
    const player1Cards: FiveCards = [
      new Card("KD"),
      new Card("KH"),
      new Card("2D"),
      new Card("3D"),
      new Card("5D"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("KD"),
      new Card("KH"),
      new Card("2D"),
      new Card("3D"),
      new Card("6D"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Full house of kings with high card should beat full house of king with lower card", () => {
    const player1Cards: FiveCards = [
      new Card("KD"),
      new Card("KH"),
      new Card("2D"),
      new Card("2D"),
      new Card("2D"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("KD"),
      new Card("KH"),
      new Card("6D"),
      new Card("6D"),
      new Card("6D"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Pair of 9s should beat pair of 4s", () => {
    const player1Cards: FiveCards = [
      new Card("KD"),
      new Card("QH"),
      new Card("9D"),
      new Card("4D"),
      new Card("4D"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("KD"),
      new Card("QH"),
      new Card("2D"),
      new Card("9D"),
      new Card("9D"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });

  it("Highest card Ace should beat highest card Queen", () => {
    const player1Cards: FiveCards = [
      new Card("5D"),
      new Card("8C"),
      new Card("9S"),
      new Card("JS"),
      new Card("AC"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("2C"),
      new Card("5C"),
      new Card("7D"),
      new Card("8S"),
      new Card("QH"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: true, player2: false, tie: false });
  });

  it("Flush Diamonds should beat 3 aces", () => {
    const player1Cards: FiveCards = [
      new Card("2D"),
      new Card("9C"),
      new Card("AS"),
      new Card("AH"),
      new Card("AC"),
    ];

    const Player1 = new Player(player1Cards);

    const player2Cards: FiveCards = [
      new Card("3D"),
      new Card("6D"),
      new Card("7D"),
      new Card("TD"),
      new Card("QD"),
    ];

    const Player2 = new Player(player2Cards);

    const winner = comparePlayerHands(Player1, Player2);
    expect(winner).to.eql({ player1: false, player2: true, tie: false });
  });
});
