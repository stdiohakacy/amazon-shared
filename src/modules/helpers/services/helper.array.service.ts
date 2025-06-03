import { HelperArrayServiceInterface } from '../interfaces/helper.array-service.interface';

export class HelperArrayService implements HelperArrayServiceInterface {
  getByIndexFromLeft<T>(array: T[], index: number): T[] {
    return array.slice(0, index + 1);
  }

  getByIndexFromRight<T>(array: T[], index: number): T[] {
    return array.slice(array.length - index - 1);
  }

  getDifference<T>(a: T[], b: T[]): T[] {
    return a.filter((item) => !b.includes(item));
  }

  getIntersection<T>(a: T[], b: T[]): T[] {
    return a.filter((item) => b.includes(item));
  }

  concat<T>(a: T[], b: T[]): T[] {
    return a.concat(b);
  }

  concatUnique<T>(a: T[], b: T[]): T[] {
    return this.unique([...a, ...b]);
  }

  unique<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  equals<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  notEquals<T>(a: T[], b: T[]): boolean {
    return !this.equals(a, b);
  }

  in<T>(a: T[], b: T[]): boolean {
    return a.every((item) => b.includes(item));
  }

  notIn<T>(a: T[], b: T[]): boolean {
    return !this.in(a, b);
  }

  chunk<T>(a: T[], size: number): T[][] {
    if (size <= 0) throw new Error('Chunk size must be greater than 0');
    const result: T[][] = [];
    for (let i = 0; i < a.length; i += size) {
      result.push(a.slice(i, i + size));
    }
    return result;
  }
}
