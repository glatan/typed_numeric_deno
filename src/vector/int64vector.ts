import { Int64 } from "../numeric/int64.ts";
import { Vector } from "./mod.ts";

export class Int64Vector extends Vector<Int64, bigint> {
  constructor(arg: number | Array<Int64> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int64(0n)));
    }
    if (arg instanceof Array) {
      super(arg);
    }
  }
  concat(other: Int64Vector): Int64Vector {
    return new Int64Vector(this.inner.concat(other.inner));
  }
  fill(value: Int64 | bigint): Int64Vector {
    if (typeof value === "bigint") {
      super.fill(new Int64(value));
    } else {
      super.fill(value);
    }
    return new Int64Vector(this.inner);
  }
  reverse(): Int64Vector {
    return new Int64Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Int64Vector {
    return new Int64Vector(this.inner.slice(start, end));
  }
  toTypedArray(): BigInt64Array {
    let array = new BigInt64Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static from(
    array: BigInt64Array | Array<Int64> | Array<bigint>,
  ): Int64Vector {
    const vector = new Int64Vector(0);
    if (array.length !== 0) {
      if (array instanceof BigInt64Array || typeof array[0] === "bigint") {
        for (const element of array) {
          vector.push(new Int64(element as bigint));
        }
      }
      if (array[0] instanceof Int64) {
        if (array) {
          vector.inner = array as Array<Int64>;
        }
      }
    }
    return vector;
  }
  static of(...elementN: Array<Int64> | Array<bigint>): Int64Vector {
    return Int64Vector.from(elementN);
  }
}
