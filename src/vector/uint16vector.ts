import { Uint16 } from "../numeric/uint16.ts";
import { Vector } from "./mod.ts";

export class Uint16Vector extends Vector<Uint16, number> {
  constructor(arg: number | Array<Uint16> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint16(0)));
    }
    if (arg instanceof Array) {
      super(arg);
    }
  }
  copyWithin(
    target: number,
    start: number = 0,
    end: number = this.length,
  ): Uint16Vector {
    super.copyWithin(target, start, end);
    return this;
  }
  concat(other: Uint16Vector): Uint16Vector {
    return new Uint16Vector(this.inner.concat(other.inner));
  }
  fill(
    target: Uint16 | number,
    start: number = 0,
    end: number = this.length,
  ): Uint16Vector {
    if (typeof target === "number") {
      super.fill(new Uint16(target), start, end);
    } else {
      super.fill(target, start, end);
    }
    return this;
  }
  reverse(): Uint16Vector {
    return new Uint16Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Uint16Vector {
    return new Uint16Vector(this.inner.slice(start, end));
  }
  toTypedArray(): Uint16Array {
    const array = new Uint16Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static from(
    array: Uint16Array | Array<Uint16> | Array<number>,
  ): Uint16Vector {
    const vector = new Uint16Vector(0);
    if (array.length !== 0) {
      if (array instanceof Uint16Array || typeof array[0] === "number") {
        for (const element of array) {
          vector.push(new Uint16(element as number));
        }
      }
      if (array[0] instanceof Uint16) {
        if (array) {
          vector.inner = array as Array<Uint16>;
        }
      }
    }
    return vector;
  }
  static of(...elementN: Array<Uint16> | Array<number>): Uint16Vector {
    return Uint16Vector.from(elementN);
  }
}
