"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Combinations_1 = require("./Combinations");
var Player = /** @class */ (function () {
    /**
     * A Player with a set of 5 cards.
     * The class has all of the player's valid combinations, the highest ranked one, and the players highest card.
     */
    function Player(cards) {
        this.cards = cards;
        this.combinations = Combinations_1.Combinations.find(this.cards);
        this.highCard = cards.sort(function (cardA, cardB) { return cardB.value - cardA.value; })[0];
        this.highestRank = this.combinations[0];
    }
    return Player;
}());
exports.Player = Player;
