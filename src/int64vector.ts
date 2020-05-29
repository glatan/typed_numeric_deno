import { Int64 } from "./int64.ts";
import { Vector } from "./mod.ts";

export class Int64Vector extends Vector<Int64> {
  constructor(arg: number | Array<Int64>) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int64(0n)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Int64>);
    }
  }
  fill(value: Int64): Int64Vector {
    for (let i = 0; i < this.inner.length; i++) {
      this.inner[i] = value;
    }
    return new Int64Vector(this.inner);
  }
  toTypedArray(): BigInt64Array {
    let array = new BigInt64Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static fromTypedArray(array: BigInt64Array): Int64Vector {
    const vector = new Int64Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Int64(BigInt(array[i])));
    }
    return vector;
  }
}
