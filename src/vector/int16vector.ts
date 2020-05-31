import { Int16 } from "../numeric/int16.ts";
import { Vector } from "./mod.ts";

export class Int16Vector extends Vector<Int16> {
  constructor(arg: number | Array<Int16> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Int16(0)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Int16>);
    }
  }
  concat(other: Int16Vector): Int16Vector {
    return new Int16Vector(this.inner.concat(other.inner));
  }
  fill(value: Int16 | number): Int16Vector {
    if (typeof value === "number") {
      super.fill(new Int16(value));
    } else {
      super.fill(value);
    }
    return new Int16Vector(this.inner);
  }
  reverse(): Int16Vector {
    return new Int16Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Int16Vector {
    return new Int16Vector(this.inner.slice(start, end));
  }
  toTypedArray(): Int16Array {
    let array = new Int16Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static fromTypedArray(array: Int16Array): Int16Vector {
    const vector = new Int16Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Int16(array[i]));
    }
    return vector;
  }
}
