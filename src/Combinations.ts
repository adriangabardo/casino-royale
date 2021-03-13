import { Card } from "./Card";
import { FiveCards } from "./Player";

/**
 * A combination determined by specific rulesets
 */
interface Combination {
  rank: number;
  highestCard: number;
}

class Combinations {
  /**
   * Finds all matching combinations for a specific set of cards
   * @param cards
   */
  static find(cards: FiveCards): Array<Combination> {
    // Checks all possible combinations, ranks highest first.
    let combinations = [
      { rank: 0, highestCard: this.highestCard(cards).value },
      this.highCard(cards),
      this.groupings(cards),
      this.straightAndFlush(cards),
      this.fourOfAKind(cards),
      this.royalFlush(cards),
    ].sort((a, b) => {
      if (a.rank == 0 && b.rank == 0) {
        // If both ranks are 0, sort by highestCard
        return b.highestCard - a.highestCard;
      }

      return b.rank - a.rank;
    });

    return combinations;
  }

  /**
   * Finds the card with highest value in any set of cards
   */
  static highestCard(cards: Array<Card>): Card {
    return cards.sort((cardA, cardB) => cardB.value - cardA.value)[0];
  }

  static highCard(cards: FiveCards): Combination {
    if (cards.filter((card) => card.value == 14).length > 0) {
      return {
        rank: 1,
        highestCard: 14,
      };
    }

    return { rank: 0, highestCard: Combinations.highestCard(cards).value };
  }

  /**
   * Finds pair, two pairs, three of a kind and full house. Returns highest of possibilities.
   */
  static groupings(cards: FiveCards): Combination {
    let duplicates: Array<Card> = [];

    // Find duplicates
    cards.forEach((card) => {
      if (cards.filter((i) => i.value == card.value).length > 1) {
        // Found multiple cards, pushing card to duplicates array
        duplicates.push(card);
      }
    });

    if (duplicates.length < 2) {
      return { rank: 0, highestCard: Combinations.highestCard(cards).value };
    }

    if (duplicates.length == 2) {
      // Single pair
      return {
        rank: 2,
        highestCard: Combinations.highestCard(duplicates).value,
      };
    }

    var combination: Array<Combination> = [];
    duplicates.forEach((duplicate) => {
      if (
        duplicates.filter((dup) => dup.value == duplicate.value).length == 3 &&
        duplicates.length == 5
      ) {
        // Full house
        combination.push({
          rank: 7,
          highestCard: Combinations.highestCard(duplicates).value,
        });
      } else if (
        duplicates.filter((dup) => dup.value == duplicate.value).length == 3 &&
        duplicates.length == 3
      ) {
        // Three of a kind
        combination.push({
          rank: 4,
          highestCard: Combinations.highestCard(duplicates).value,
        });
      } else if (
        duplicates.filter((dup) => dup.value == duplicate.value).length == 2 &&
        duplicates.length == 4
      ) {
        // Two pairs
        combination.push({
          rank: 3,
          highestCard: Combinations.highestCard(duplicates).value,
        });
      }
    });

    if (combination.length == 0) {
      return { rank: 0, highestCard: Combinations.highestCard(cards).value };
    }

    return combination.sort((a, b) => b.rank - a.rank)[0];
  }

  /**
   * Returns a straight, if no flush was no found. Returns a straight flush if both.
   */
  static straightAndFlush(cards: FiveCards): Combination {
    const sorted = cards.sort((cardA, cardB) => cardA.value - cardB.value);

    // Checks all entries that have the same suit as index 0 of sorted. If 5, its flush.
    const isFlush = sorted.filter((a) => a.suit == sorted[0].suit).length == 5;

    var isConsecutive: boolean = true;
    var i = 0;
    do {
      isConsecutive = sorted[i].value + 1 == sorted[i + 1].value;
      i++;
    } while (isConsecutive == true && i < sorted.length - 1);

    if (isFlush && isConsecutive) {
      return { rank: 9, highestCard: Combinations.highestCard(cards).value };
    } else if (isFlush) {
      return {
        rank: 6,
        highestCard: Combinations.highestCard(cards).value,
      };
    } else if (isConsecutive) {
      return {
        rank: 5,
        highestCard: Combinations.highestCard(cards).value,
      };
    }

    return { rank: 0, highestCard: Combinations.highestCard(cards).value };
  }

  /**
   * Returns a four of a kind.
   */
  static fourOfAKind(cards: FiveCards): Combination {
    for (var i = 0; i < cards.length; i++) {
      const kind = cards.filter((entry) => entry.value == cards[i].value);
      if (kind.length == 4) {
        return {
          rank: 8,
          highestCard: kind[0].value,
        };
      }
    }

    return { rank: 0, highestCard: Combinations.highestCard(cards).value };
  }

  static royalFlush(cards: FiveCards): Combination {
    const values = cards.map((card) => card.value);
    const suits = cards.map((card) => card.suit);

    const sameSuit = suits.filter((suit) => suit == suits[0]).length == 5;
    const ten = values.filter((value) => value == 10).length == 1;
    const jack = values.filter((value) => value == 11).length == 1;
    const queen = values.filter((value) => value == 12).length == 1;
    const king = values.filter((value) => value == 13).length == 1;
    const ace = values.filter((value) => value == 14).length == 1;

    const isRoyal = ten && jack && queen && king && ace && sameSuit;
    if (isRoyal) {
      return {
        rank: 10,
        highestCard: Combinations.highestCard(cards).value,
      };
    }

    return { rank: 0, highestCard: Combinations.highestCard(cards).value };
  }
}

export { Combination, Combinations };
