import { Int8 } from "./int8.ts";
import { Vector } from "./mod.ts";

export class Int8Vector extends Vector<Int8> {
  constructor(arg: number | Array<Int8>) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int8(0)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Int8>);
    }
  }
  fill(value: Int8): Int8Vector {
    for (let i = 0; i < this.inner.length; i++) {
      this.inner[i] = value;
    }
    return new Int8Vector(this.inner);
  }
  toTypedArray(): Int8Array {
    let array = new Int8Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static fromTypedArray(array: Int8Array): Int8Vector {
    const vector = new Int8Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Int8(array[i]));
    }
    return vector;
  }
}
