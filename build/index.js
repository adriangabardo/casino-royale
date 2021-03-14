"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.casinoRoyale = void 0;
var fs_1 = __importDefault(require("fs"));
var InputValidation_1 = require("./Helpers/InputValidation");
var LineSplitter_1 = require("./Helpers/LineSplitter");
var Card_1 = require("./Card");
var Player_1 = require("./Player");
var ComparePlayerHands_1 = require("./Helpers/ComparePlayerHands");
/**
 * Main entry method for our library.
 * @param file - File to read stream of player hands from.
 */
var casinoRoyale = function (file) {
    // Return is [string, string] to force 2 players. Array<string> could have n Players.
    var player1Hands = 0;
    var player2Hands = 0;
    var data = fs_1.default.readFileSync(file).toString().split("\n");
    data.forEach(function (line) {
        // Check that the line is valid, otherwise skip it.
        var isValid = InputValidation_1.InputValidation.lineValidation(line);
        if (!isValid) {
            return;
        }
        // Initiating Cards for each player.
        var _a = __read(LineSplitter_1.LineSplitter.lineSplitter(line), 2), player1RawCards = _a[0], player2RawCards = _a[1];
        var playerCards1 = player1RawCards.map(function (line) { return new Card_1.Card(line); });
        var playerCards2 = player2RawCards.map(function (line) { return new Card_1.Card(line); });
        // Initiating player with their respective cards.
        var player1Hand = new Player_1.Player(playerCards1);
        var player2Hand = new Player_1.Player(playerCards2);
        // Comparing players' hands for a winner.
        var winner = ComparePlayerHands_1.comparePlayerHands(player1Hand, player2Hand);
        if (winner.player1) {
            player1Hands++;
        }
        else if (winner.player2) {
            player2Hands++;
        }
        else {
            // Complete tie, do nothing.
        }
    });
    return ["Player 1: " + player1Hands, "Player 2: " + player2Hands];
};
exports.casinoRoyale = casinoRoyale;
