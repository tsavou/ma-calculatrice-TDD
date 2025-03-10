export class Calculatrice {
  private history: { operation: string; result: number }[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.history.push({ operation: `${a} + ${b}`, result });
    return result;
  }

  subtract(a: number, b: number) {
    const result = a - b;
    this.history.push({ operation: `${a} - ${b}`, result });
    return result;
  }

  multiply(a: number, b: number) {
    const result = a * b;
    this.history.push({ operation: `${a} x ${b}`, result });
    return result;
  }

  getHistory(): { operation: string; result: number }[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}
