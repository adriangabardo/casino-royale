"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSplitter = void 0;
var InputValidation_1 = require("./InputValidation");
var LineSplitter = /** @class */ (function () {
    function LineSplitter() {
    }
    /**
     * Static method that splits a line of hands into an array of 2 card arrays.
     * @param line - Single line with hands from 2 players, each containing 5 cards.
     */
    LineSplitter.lineSplitter = function (line) {
        var cards = line.match(InputValidation_1.InputValidation.cardValidationGroup);
        if (cards == undefined || cards.length != 10) {
            // Throwing here because its after our validation method, this shouldn't happen.
            throw new Error("Players hands does not contain 10 valid cards.");
        }
        var player1Cards = cards.slice(0, 5).map(function (card) { return card.trim(); });
        var player2Cards = cards.slice(5).map(function (card) { return card.trim(); });
        return [player1Cards, player2Cards];
    };
    return LineSplitter;
}());
exports.LineSplitter = LineSplitter;
