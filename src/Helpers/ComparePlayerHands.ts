import { Player } from "../Player";

/**
 * Compare the hands of two players to check hand ranks, followed by highest cards.
 * @param player1 - First player to compare
 * @param player2 - Second player to compare
 * @returns Object of booleans declaring who the winner is, or a complete tie.
 */
const comparePlayerHands = (
  player1: Player,
  player2: Player
): { player1: boolean; player2: boolean; tie: boolean } => {
  // Checks the rank of players hands

  var winner: { player1: boolean; player2: boolean; tie: boolean } = {
    player1: player1.highestRank.rank > player2.highestRank.rank,
    player2: player2.highestRank.rank > player1.highestRank.rank,
    tie: false,
  };

  // Returns if a player won

  if (winner.player1 == true || winner.player2 == true) {
    return winner;
  }

  // Checks the highest card of each players highest rank

  winner = {
    player1: player1.highestRank.highestCard > player2.highestRank.highestCard,
    player2: player1.highestRank.highestCard < player2.highestRank.highestCard,
    tie: false,
  };

  // Returns if a player won

  if (winner.player1 == true || winner.player2 == true) {
    return winner;
  }

  // A winner couldn't be found, so comparing both hands of players for highest card

  const player1CardsDescending = player1.cards.sort(
    (cardA, cardB) => cardB.value - cardA.value
  );

  const player2CardsDescending = player2.cards.sort(
    (cardA, cardB) => cardB.value - cardA.value
  );

  var i = 0;
  do {
    const p1Card = player1CardsDescending[i];
    const p2Card = player2CardsDescending[i];

    if (p1Card.value > p2Card.value) {
      winner.player1 = true;
      break;
    } else if (p2Card.value > p1Card.value) {
      winner.player2 = true;
      break;
    }

    i++;
  } while (
    i < player1CardsDescending.length &&
    i < player2CardsDescending.length
  );

  if (winner.player1 == false && winner.player2 == false) {
    // In case we still have no winner, declare tie
    winner.tie = true;
  }

  // Final return statement

  return winner;
};

export { comparePlayerHands };
