"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Suit;
(function (Suit) {
    Suit["D"] = "D";
    Suit["H"] = "H";
    Suit["S"] = "S";
    Suit["C"] = "C";
})(Suit || (Suit = {}));
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
            default:
                return Number(rawValue);
        }
    };
    return Card;
}());
exports.Card = Card;
