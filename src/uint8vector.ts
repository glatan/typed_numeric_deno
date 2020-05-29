import { Uint8 } from "./uint8.ts";
import { Vector } from "./mod.ts";

export class Uint8Vector extends Vector<Uint8> {
  constructor(arg: number | Array<Uint8>) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint8(0)));
    }
    if (arg instanceof Uint8Array) {
      super(arg as Array<Uint8>);
    }
  }
  toTypedArray(): Uint8Array {
    let array = new Uint8Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static fromTypedArray(array: Uint8Array): Uint8Vector {
    const vector = new Uint8Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Uint8(array[i]));
    }
    return vector;
  }
}