import { Uint64 } from "./uint64.ts";
import { Vector } from "./mod.ts";

export class Uint64Vector extends Vector<Uint64> {
  constructor(arg: number | Array<Uint64>) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint64(0n)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Uint64>);
    }
  }
  fill(value: Uint64 | bigint): Uint64Vector {
    if (typeof value === "bigint") {
      super.fill(new Uint64(value));
    } else {
      super.fill(value);
    }
    return new Uint64Vector(this.inner);
  }
  toTypedArray(): BigUint64Array {
    let array = new BigUint64Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static fromTypedArray(array: BigUint64Array): Uint64Vector {
    const vector = new Uint64Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Uint64(BigInt(array[i])));
    }
    return vector;
  }
}
