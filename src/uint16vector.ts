import { Uint16 } from "./uint16.ts";
import { Vector } from "./mod.ts";

export class Uint16Vector extends Vector<Uint16> {
  constructor(arg: number | Array<Uint16>) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint16(0)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Uint16>);
    }
  }
  fill(value: Uint16): Uint16Vector {
    for (let i = 0; i < this.inner.length; i++) {
      this.inner[i] = value;
    }
    return new Uint16Vector(this.inner);
  }
  toTypedArray(): Uint16Array {
    let array = new Uint16Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static fromTypedArray(array: Uint16Array): Uint16Vector {
    const vector = new Uint16Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Uint16(array[i]));
    }
    return vector;
  }
}
