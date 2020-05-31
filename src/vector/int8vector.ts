import { Int8 } from "../numeric/int8.ts";
import { Vector } from "./mod.ts";

export class Int8Vector extends Vector<Int8> {
  constructor(arg: number | Array<Int8> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int8(0)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Int8>);
    }
  }
  concat(other: Int8Vector): Int8Vector {
    super.concat(other);
    return new Int8Vector(this.inner);
  }
  fill(value: Int8 | number): Int8Vector {
    if (typeof value === "number") {
      super.fill(new Int8(value));
    } else {
      super.fill(value);
    }
    return new Int8Vector(this.inner);
  }
  reverse(): Int8Vector {
    return new Int8Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Int8Vector {
    return new Int8Vector(this.inner.slice(start, end));
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
