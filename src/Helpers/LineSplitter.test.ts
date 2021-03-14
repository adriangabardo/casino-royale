import { expect } from "chai";

import { LineSplitter } from "./LineSplitter";

describe("LineSplitter", () => {
  describe("lineSplitter", () => {
    it("Should split each valid line into the expected return", () => {
      const testCases: Array<{ line: string; result: [string[], string[]] }> = [
        {
          line: "9C 9D 8D 7C 3C 2S KD TH 9H 8H",
          result: [
            ["9C", "9D", "8D", "7C", "3C"],
            ["2S", "KD", "TH", "9H", "8H"],
          ],
        },
        {
          line: "6C 5H AS 4H 7S 2S KD 7H 2C AC",
          result: [
            ["6C", "5H", "AS", "4H", "7S"],
            ["2S", "KD", "7H", "2C", "AC"],
          ],
        },
        {
          line: "6C5HAS4H7S2SKD7H2CAC",
          result: [
            ["6C", "5H", "AS", "4H", "7S"],
            ["2S", "KD", "7H", "2C", "AC"],
          ],
        },
      ];

      testCases.forEach((testCase) => {
        const result = LineSplitter.lineSplitter(testCase.line);
        expect(result).to.eql(testCase.result);
      });
    });

    it("Should throw error for each invalid line", () => {
      const testCases: string[] = [
        "",
        "i am not even a line of player hands",
        "ABCDEFGHIJKLMNOP",
        "Currently listening to Beat 54 by Jungle. Life is good.",
        "9C 9D 8D 7C 3C 2S KD TH 9H 8H 9H",
      ];

      testCases.forEach((testCase) => {
        expect(() => LineSplitter.lineSplitter(testCase)).to.throw(
          "Players hands does not contain 10 valid cards."
        );
      });
    });
  });
});
