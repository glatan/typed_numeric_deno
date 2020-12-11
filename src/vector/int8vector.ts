import { Int8 } from "../numeric/int8.ts";
import { Vector } from "./mod.ts";

export class Int8Vector extends Vector<Int8, number> {
  constructor(arg: number | Int8Array | Array<Int8> | Array<number> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int8(0)));
    } else {
      super(Int8Vector.from(arg).inner);
    }
  }
  copyWithin(
    target: number,
    start = 0,
    end: number = this.length,
  ): Int8Vector {
    super.copyWithin(target, start, end);
    return this;
  }
  concat(other: Int8Vector): Int8Vector {
    return new Int8Vector(this.inner.concat(other.inner));
  }
  fill(
    target: Int8 | number,
    start = 0,
    end: number = this.length,
  ): Int8Vector {
    if (typeof target === "number") {
      super.fill(new Int8(target), start, end);
    } else {
      super.fill(target, start, end);
    }
    return this;
  }
  reverse(): Int8Vector {
    return new Int8Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Int8Vector {
    return new Int8Vector(this.inner.slice(start, end));
  }
  toTypedArray(): Int8Array {
    const array = new Int8Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static from(array: Int8Array | Array<Int8> | Array<number>): Int8Vector {
    const vector = new Int8Vector(0);
    if (array.length !== 0) {
      if (array instanceof Int8Array || typeof array[0] === "number") {
        for (const element of array) {
          vector.push(new Int8(element as number));
        }
      }
      if (array[0] instanceof Int8) {
        if (array) {
          vector.inner = array as Array<Int8>;
        }
      }
    }
    return vector;
  }
  static of(...elementN: Array<Int8> | Array<number>): Int8Vector {
    return Int8Vector.from(elementN);
  }
}
