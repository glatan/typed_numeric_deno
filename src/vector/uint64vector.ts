import { Uint64 } from "../numeric/uint64.ts";
import { Vector } from "./mod.ts";

export class Uint64Vector extends Vector<Uint64> {
  constructor(arg: number | Array<Uint64> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint64(0n)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Uint64>);
    }
  }
  concat(other: Uint64Vector): Uint64Vector {
    return new Uint64Vector(this.inner.concat(other.inner));
  }
  fill(value: Uint64 | bigint): Uint64Vector {
    if (typeof value === "bigint") {
      super.fill(new Uint64(value));
    } else {
      super.fill(value);
    }
    return new Uint64Vector(this.inner);
  }
  reverse(): Uint64Vector {
    return new Uint64Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Uint64Vector {
    return new Uint64Vector(this.inner.slice(start, end));
  }
  toTypedArray(): BigUint64Array {
    let array = new BigUint64Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static from(
    array: BigUint64Array | Array<Uint64> | Array<bigint>,
  ): Uint64Vector {
    const vector = new Uint64Vector(0);
    if (array.length !== 0) {
      if (array instanceof BigUint64Array || typeof array[0] === "bigint") {
        for (const element of array) {
          vector.push(new Uint64(element as bigint));
        }
      }
      if (array[0] instanceof Uint64) {
        if (array) {
          vector.inner = array as Array<Uint64>;
        }
      }
    }
    return vector;
  }
}
