"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combinations = void 0;
var Combinations = /** @class */ (function () {
    function Combinations() {
    }
    /**
     * Finds all matching combinations for a specific set of cards
     * @param cards
     */
    Combinations.find = function (cards) {
        // Checks all possible combinations, ranks highest first.
        var combinations = [
            { rank: 0, highestCard: this.highestCard(cards).value },
            this.highCard(cards),
            this.groupings(cards),
            this.straightAndFlush(cards),
            this.fourOfAKind(cards),
            this.royalFlush(cards),
        ].sort(function (a, b) {
            if (a.rank == 0 && b.rank == 0) {
                // If both ranks are 0, sort by highestCard
                return b.highestCard - a.highestCard;
            }
            return b.rank - a.rank;
        });
        return combinations;
    };
    /**
     * Finds the card with highest value in any set of cards
     */
    Combinations.highestCard = function (cards) {
        return cards.sort(function (cardA, cardB) { return cardB.value - cardA.value; })[0];
    };
    /**
     * Finds a high card if cards includes an Ace.
     */
    Combinations.highCard = function (cards) {
        if (cards.filter(function (card) { return card.value == 14; }).length > 0) {
            return {
                rank: 1,
                highestCard: 14,
            };
        }
        return { rank: 0, highestCard: Combinations.highestCard(cards).value };
    };
    /**
     * Finds pair, two pairs, three of a kind and full house. Returns highest of possibilities.
     */
    Combinations.groupings = function (cards) {
        var duplicates = [];
        // Find duplicates
        cards.forEach(function (card) {
            if (cards.filter(function (i) { return i.value == card.value; }).length > 1) {
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
        var combination = [];
        duplicates.forEach(function (duplicate) {
            if (duplicates.filter(function (dup) { return dup.value == duplicate.value; }).length == 3 &&
                duplicates.length == 5) {
                // Full house
                combination.push({
                    rank: 7,
                    highestCard: Combinations.highestCard(duplicates).value,
                });
            }
            else if (duplicates.filter(function (dup) { return dup.value == duplicate.value; }).length == 3 &&
                duplicates.length == 3) {
                // Three of a kind
                combination.push({
                    rank: 4,
                    highestCard: Combinations.highestCard(duplicates).value,
                });
            }
            else if (duplicates.filter(function (dup) { return dup.value == duplicate.value; }).length == 2 &&
                duplicates.length == 4) {
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
        // Return the highest ranked combination from the forEach.
        return combination.sort(function (a, b) { return b.rank - a.rank; })[0];
    };
    /**
     * Returns a straight, if no flush was no found. Returns a straight flush if both.
     */
    Combinations.straightAndFlush = function (cards) {
        var sorted = cards.sort(function (cardA, cardB) { return cardA.value - cardB.value; });
        // Checks all entries that have the same suit as index 0 of sorted. If 5, its flush.
        var isFlush = sorted.filter(function (a) { return a.suit == sorted[0].suit; }).length == 5;
        var isConsecutive = true;
        var i = 0;
        do {
            // Checks if current sorted + 1 is equal to the next value in sorted.
            isConsecutive = sorted[i].value + 1 == sorted[i + 1].value;
            i++;
        } while (isConsecutive == true && i < sorted.length - 1);
        if (isFlush && isConsecutive) {
            // Straight flush
            return { rank: 9, highestCard: Combinations.highestCard(cards).value };
        }
        else if (isFlush) {
            // Flush
            return {
                rank: 6,
                highestCard: Combinations.highestCard(cards).value,
            };
        }
        else if (isConsecutive) {
            // Straight
            return {
                rank: 5,
                highestCard: Combinations.highestCard(cards).value,
            };
        }
        // Not a straight, flush or straight flush. Returning rank 0.
        return { rank: 0, highestCard: Combinations.highestCard(cards).value };
    };
    /**
     * Returns a four of a kind.
     */
    Combinations.fourOfAKind = function (cards) {
        // Only really needs to iterate twice, if second card isn't four of a kind it's not in the set.
        for (var i = 0; i < 2; i++) {
            var kind = cards.filter(function (entry) { return entry.value == cards[i].value; });
            if (kind.length == 4) {
                // Four of a kind found.
                return {
                    rank: 8,
                    highestCard: kind[0].value,
                };
            }
        }
        // Not four of a kind, return rank 0.
        return { rank: 0, highestCard: Combinations.highestCard(cards).value };
    };
    /**
     * Returns a royal flush.
     */
    Combinations.royalFlush = function (cards) {
        var values = cards.map(function (card) { return card.value; });
        var suits = cards.map(function (card) { return card.suit; });
        var sameSuit = suits.filter(function (suit) { return suit == suits[0]; }).length == 5;
        var ten = values.filter(function (value) { return value == 10; }).length == 1;
        var jack = values.filter(function (value) { return value == 11; }).length == 1;
        var queen = values.filter(function (value) { return value == 12; }).length == 1;
        var king = values.filter(function (value) { return value == 13; }).length == 1;
        var ace = values.filter(function (value) { return value == 14; }).length == 1;
        var isRoyal = ten && jack && queen && king && ace && sameSuit;
        if (isRoyal) {
            return {
                rank: 10,
                highestCard: Combinations.highestCard(cards).value,
            };
        }
        // Royal flush not found, returns rank 0.
        return { rank: 0, highestCard: Combinations.highestCard(cards).value };
    };
    return Combinations;
}());
exports.Combinations = Combinations;
