import { Int16 } from "../numeric/int16.ts";
import { Vector } from "./mod.ts";

export class Int16Vector extends Vector<Int16, number> {
  constructor(arg: number | Int16Array | Array<Int16> | Array<number> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int16(0)));
    } else {
      super(Int16Vector.from(arg).inner);
    }
  }
  copyWithin(
    target: number,
    start = 0,
    end: number = this.length,
  ): Int16Vector {
    super.copyWithin(target, start, end);
    return this;
  }
  concat(other: Int16Vector): Int16Vector {
    return new Int16Vector(this.inner.concat(other.inner));
  }
  fill(
    target: Int16 | number,
    start = 0,
    end: number = this.length,
  ): Int16Vector {
    if (typeof target === "number") {
      super.fill(new Int16(target), start, end);
    } else {
      super.fill(target, start, end);
    }
    return this;
  }
  reverse(): Int16Vector {
    return new Int16Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Int16Vector {
    return new Int16Vector(this.inner.slice(start, end));
  }
  toTypedArray(): Int16Array {
    const array = new Int16Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static from(array: Int16Array | Array<Int16> | Array<number>): Int16Vector {
    const vector = new Int16Vector(0);
    if (array.length !== 0) {
      if (array instanceof Int16Array || typeof array[0] === "number") {
        for (const element of array) {
          vector.push(new Int16(element as number));
        }
      }
      if (array[0] instanceof Int16) {
        if (array) {
          vector.inner = array as Array<Int16>;
        }
      }
    }
    return vector;
  }
  static of(...elementN: Array<Int16> | Array<number>): Int16Vector {
    return Int16Vector.from(elementN);
  }
}
