import { test, expect } from "@playwright/test";

test.describe("Simple calculator", () => {
  test("should add two numbers", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='2']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("5");
  });

  test("should subtract two numbers", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='5']");
    await page.click("button[data-value='-']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("2");
  });

  test("should multiply two numbers", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='4']");
    await page.click("button[data-value='x']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("12");
  });

  test("should handle decimal numbers", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='1']");
    await page.click("button[data-value='.']");
    await page.click("button[data-value='5']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='2']");
    await page.click("button[data-value='.']");
    await page.click("button[data-value='5']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("4");
  });

  test("should clear the display", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='1']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("4");

    await page.click("button[data-value='C']");
    const clearedResult = await page.inputValue("#display");
    expect(clearedResult).toBe("");
  });
});

test.describe("Negative Tests", () => {
  test("should add two negative numbers", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='-']");
    await page.click("button[data-value='1']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='-']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("-4");
  });

  test("should subtract a negative number from a positive number", async ({
    page,
  }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='5']");
    await page.click("button[data-value='-']");
    await page.click("button[data-value='-']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("8");
  });

  test("should multiply two negative numbers", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='-']");
    await page.click("button[data-value='2']");
    await page.click("button[data-value='x']");
    await page.click("button[data-value='-']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("6");
  });
});

test.describe("Error handling", () => {
  test("should handle empty input", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toContain("Invalid");
  });

  test("should handle division by zero", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='8']");
    await page.click("button[data-value='/']");
    await page.click("button[data-value='0']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");
    expect(result).toBe("Division by zero");
  });

  test("should handle invalid input", async ({ page }) => {
    await page.goto("localhost:5173");
    await page.click("button[data-value='8']");
    await page.click("button[data-value='x']");
    await page.click("button[data-value='=']");

    const result = await page.inputValue("#display");

    expect(result).toContain("Invalid");
  });

  test("should handle invalid input if there is only one number", async ({
    page,
  }) => {
    await page.goto("localhost:5173");
    await page.click("button[data-value='8']");
    await page.click("button[data-value='=']");
    const result = await page.inputValue("#display");
    expect(result).toContain("Invalid");
  });

  test("should handle invalid input if this is not a number", async ({
    page,
  }) => {
    await page.goto("localhost:5173");

    const input = await page.locator("#display");
    await input.fill("abc");
    await page.click("button[data-value='=']");
    const result = await page.inputValue("#display");
    expect(result).toContain("Invalid");
  });
});

test.describe("History Tests", () => {
  test("should display the history of operations", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='2']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");
    await page.click("button[data-value='C']");

    await page.click("button[data-value='5']");
    await page.click("button[data-value='-']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");
    await page.click("button[data-value='C']");

    await page.click("button[data-value='4']");
    await page.click("button[data-value='x']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");
    await page.click("button[data-value='C']");

    const history = await page.locator("#history").textContent();
    expect(history).toContain("2 + 3 = 5");
    expect(history).toContain("5 - 3 = 2");
    expect(history).toContain("4 x 3 = 12");
  });

  test("should clear the history", async ({ page }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='2']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    const historyBeforeClear = await page.locator("#history").textContent();
    expect(historyBeforeClear).toContain("2 + 3 = 5");

    await page.click("button[data-value='clear-history']");

    const historyAfterClear = await page.locator("#history").textContent();
    expect(historyAfterClear).toBe("");
  });

  test("should display the history correctly after clearing the display", async ({
    page,
  }) => {
    await page.goto("localhost:5173");

    await page.click("button[data-value='2']");
    await page.click("button[data-value='+']");
    await page.click("button[data-value='3']");
    await page.click("button[data-value='=']");

    await page.click("button[data-value='C']"); // Clear display

    const history = await page.locator("#history").textContent();
    expect(history).toContain("2 + 3 = 5");
  });
});
