import { Uint32 } from "./uint32.ts";
import { Vector } from "./mod.ts";

export class Uint32Vector extends Vector<Uint32> {
  constructor(arg: number | Array<Uint32>) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint32(0n)));
    }
    if (arg instanceof Array) {
      super(arg as Array<Uint32>);
    }
  }
  fill(value: Uint32 | bigint): Uint32Vector {
    if (typeof value === "bigint") {
      super.fill(new Uint32(value));
    } else {
      super.fill(value) as Uint32Vector;
    }
    return new Uint32Vector(this.inner);
  }
  toTypedArray(): Uint32Array {
    let array = new Uint32Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = Number(this.inner[i].value());
    }
    return array;
  }
  static fromTypedArray(array: Uint32Array): Uint32Vector {
    const vector = new Uint32Vector(0);
    for (let i = 0; i < array.length; i++) {
      vector.push(new Uint32(BigInt(array[i])));
    }
    return vector;
  }
}
