import { Int32 } from "../numeric/int32.ts";
import { Vector } from "./mod.ts";

export class Int32Vector extends Vector<Int32> {
  constructor(arg: number | Array<Int32> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int32(0n)));
    }
    if (arg instanceof Array) {
      super(arg);
    }
  }
  concat(other: Int32Vector): Int32Vector {
    return new Int32Vector(this.inner.concat(other.inner));
  }
  fill(value: Int32 | bigint): Int32Vector {
    if (typeof value === "bigint") {
      super.fill(new Int32(value));
    } else {
      super.fill(value);
    }
    return new Int32Vector(this.inner);
  }
  reverse(): Int32Vector {
    return new Int32Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Int32Vector {
    return new Int32Vector(this.inner.slice(start, end));
  }
  toTypedArray(): Int32Array {
    let array = new Int32Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = Number(this.inner[i].value());
    }
    return array;
  }
  static from(array: Int32Array | Array<Int32> | Array<bigint>): Int32Vector {
    const vector = new Int32Vector(0);
    if (array.length !== 0) {
      if (array instanceof Int32Array) {
        for (const element of array) {
          vector.push(new Int32(BigInt(element)));
        }
      }
      if (typeof array[0] === "bigint") {
        for (const element of array) {
          vector.push(new Int32(element as bigint));
        }
      }
      if (array[0] instanceof Int32) {
        if (array) {
          vector.inner = array as Array<Int32>;
        }
      }
    }
    return vector;
  }
  static of(...elementN: Array<Int32> | Array<bigint>): Int32Vector {
    return Int32Vector.from(elementN);
  }
}
