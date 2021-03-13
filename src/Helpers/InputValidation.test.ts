import { expect } from "chai";
import "mocha";

import { InputValidation } from "./InputValidation";

describe("InputValidation", () => {
  describe("lineValidation", () => {
    it("Each valid test line should return true", () => {
      const validLines = [
        "9C 9D 8D 7C 3C 2S KD TH 9H 8H",
        "6C 5H AS 4H 7S 2S KD 7H 2C AC",
        "5H JS AD 8H TC KS QC 9C 5D 6H",
        "6C 8S 3S TS 4S AH 6S KS 8D 5D",
        "AS TC 8C 3H 3C AD 5H 8D 5C 2H",
      ];

      validLines.forEach((line) => {
        expect(InputValidation.lineValidation(line)).to.equal(true);
      });
    });

    it("Each invalid test line should return false", () => {
      const validLines = [
        "9C 9D 8D 7C 3C 2S KD TH 9H 8W",
        "6C 5H AS 4H 7S 2S KD 7H AC",
        "5H JS AD 8H TC KS QC 9C 5D 6H AA",
        "5H JS AD 8H TC KS QC 9C 5D 6H AA this is an even bigger line",
        "6C 8S 3S 10S 4S AH 6S KS 8D 5D",
        "AS TC 8C 3H 99 AA 23 42 AD KH",
      ];

      validLines.forEach((line) => {
        expect(InputValidation.lineValidation(line)).to.equal(false);
      });
    });
  });
});
