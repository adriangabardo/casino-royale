"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suit = exports.Card = void 0;
var Suit;
(function (Suit) {
    Suit["D"] = "D";
    Suit["H"] = "H";
    Suit["S"] = "S";
    Suit["C"] = "C";
})(Suit || (Suit = {}));
exports.Suit = Suit;
/**
 * A Card is comprised of a value based on 2-10, Jack(11), Queen(12), King(13), Ace(14)
 * and of a suit of Diamonds, Hearts, Spades or Clubs.
 */
var Card = /** @class */ (function () {
    /**
     * Construct a card from a string value of a valid card.
     * @param card - The card for a player.
     */
    function Card(card) {
        var rawValue = card.slice(0, 1);
        var rawSuit = card.slice(1, 2);
        this.value = this.fetchValue(rawValue);
        this.suit = rawSuit;
    }
    /**
     * Receives a raw value string and returns appropriate number
     * @param rawValue - Raw string value for card
     */
    Card.prototype.fetchValue = function (rawValue) {
        switch (rawValue.toUpperCase()) {
            case "T":
                return 10;
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "A":
                return 14;
            // Not validating numbers < 2 or > 14 because InputValidation should pick that up.
            // Letters other than the ones above will return NaN.
            default:
                return Number(rawValue);
        }
    };
    return Card;
}());
exports.Card = Card;
