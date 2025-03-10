import { expect, it, describe, beforeEach } from "vitest";
import { Calculatrice } from "../src/calculatrice";

describe("Calculatrice class", () => {
  let calculatrice: Calculatrice;
  beforeEach(() => {
    calculatrice = new Calculatrice();
  });

  describe("Addition", () => {
    it("should add two positive numbers", () => {
      expect(calculatrice.add(2, 3)).toBe(5);
    });

    it("should add a positive and a negative number", () => {
      expect(calculatrice.add(2, -3)).toBe(-1);
    });

    it("should add two negative numbers", () => {
      expect(calculatrice.add(-2, -3)).toBe(-5);
    });
  });

  describe("Subtraction", () => {
    it("should subtract two positive numbers", () => {
      expect(calculatrice.subtract(5, 3)).toBe(2);
    });

    it("should subtract a positive and a negative number", () => {
      expect(calculatrice.subtract(5, -3)).toBe(8);
    });

    it("should subtract two negative numbers", () => {
      expect(calculatrice.subtract(-5, -3)).toBe(-2);
    });
  });

  describe("Multiplication", () => {
    it("should multiply two positive numbers", () => {
      expect(calculatrice.multiply(2, 3)).toBe(6);
    });

    it("should multiply a positive and a negative number", () => {
      expect(calculatrice.multiply(2, -3)).toBe(-6);
    });

    it("should multiply two negative numbers", () => {
      expect(calculatrice.multiply(-2, -3)).toBe(6);
    });
  });

  describe("History", () => {
    it("should return an empty array if no calculations have been made", () => {
      expect(calculatrice.getHistory()).toEqual([]);
    });

    it("should add a calculation to the History", () => {
      calculatrice.add(2, 3);
      expect(calculatrice.getHistory()).toEqual([
        { operation: "2 + 3", result: 5 },
      ]);
    });

    it("should clear the History", () => {
      calculatrice.add(2, 3);
      calculatrice.clearHistory();
      expect(calculatrice.getHistory()).toEqual([]);
    });

    it("should keep the History after multiple calculations", () => {
      calculatrice.add(2, 3);
      calculatrice.subtract(5, 3);
      calculatrice.multiply(2, 3);
      expect(calculatrice.getHistory()).toEqual([
        { operation: "2 + 3", result: 5 },
        { operation: "5 - 3", result: 2 },
        { operation: "2 * 3", result: 6 },
      ]);
    });
  });
});