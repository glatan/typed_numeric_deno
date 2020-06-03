import { sprintf } from "../../depends.ts";

import { Uint8 } from "../numeric/uint8.ts";
import { Uint16 } from "../numeric/uint16.ts";
import { Uint32 } from "../numeric/uint32.ts";
import { Uint64 } from "../numeric/uint64.ts";
import { Uint16Vector } from "./uint16vector.ts";
import { Uint32Vector } from "./uint32vector.ts";
import { Uint64Vector } from "./uint64vector.ts";
import { Vector } from "./mod.ts";

export class Uint8Vector extends Vector<Uint8, number> {
  constructor(arg: number | Array<Uint8> = 0) {
    if (typeof arg === "number") {
      super(new Array(arg).fill(new Uint8(0)));
    }
    if (arg instanceof Array) {
      super(arg);
    }
  }
  copyWithin(
    target: number,
    start: number = 0,
    end: number = this.length,
  ): Uint8Vector {
    super.copyWithin(target, start, end);
    return this;
  }
  concat(other: Uint8Vector): Uint8Vector {
    return new Uint8Vector(this.inner.concat(other.inner));
  }
  fill(
    target: Uint8 | number,
    start: number = 0,
    end: number = this.length,
  ): Uint8Vector {
    if (typeof target === "number") {
      super.fill(new Uint8(target), start, end);
    } else {
      super.fill(target, start, end);
    }
    return this;
  }
  reverse(): Uint8Vector {
    return new Uint8Vector(this.inner.reverse());
  }
  slice(start: number, end: number): Uint8Vector {
    return new Uint8Vector(this.inner.slice(start, end));
  }
  toBe16bitWords(): Uint16Vector {
    if (this.length % 2 !== 0) {
      throw new Error(
        "Invalid Length Error: Expected Uint8Vector.prototype.length is multiples of 2",
      );
    }
    const array = new Uint16Vector(this.inner.length / 2);
    for (let i = 0; i < this.inner.length / 2; i++) {
      array.set(
        i,
        Uint16.fromBeBytes(
          Uint8Array.from([
            this.inner[i * 2].value(),
            this.inner[(i * 2) + 1].value(),
          ]),
        ),
      );
    }
    return array;
  }
  toBe32bitWords(): Uint32Vector {
    if (this.length % 4 !== 0) {
      throw new Error(
        "Invalid Length Error: Expected Uint8Vector.prototype.length is multiples of 4",
      );
    }
    const array = new Uint32Vector(this.inner.length / 4);
    for (let i = 0; i < this.inner.length / 4; i++) {
      array.set(
        i,
        Uint32.fromBeBytes(
          Uint8Array.from([
            this.inner[i * 4].value(),
            this.inner[(i * 4) + 1].value(),
            this.inner[(i * 4) + 2].value(),
            this.inner[(i * 4) + 3].value(),
          ]),
        ),
      );
    }
    return array;
  }
  toBe64bitWords(): Uint64Vector {
    if (this.length % 8 !== 0) {
      throw new Error(
        "Invalid Length Error: Expected Uint8Vector.prototype.length is multiples of 8",
      );
    }
    const array = new Uint64Vector(this.inner.length / 8);
    for (let i = 0; i < this.inner.length / 8; i++) {
      array.set(
        i,
        Uint64.fromBeBytes(
          Uint8Array.from([
            this.inner[i * 8].value(),
            this.inner[(i * 8) + 1].value(),
            this.inner[(i * 8) + 2].value(),
            this.inner[(i * 8) + 3].value(),
            this.inner[(i * 8) + 4].value(),
            this.inner[(i * 8) + 5].value(),
            this.inner[(i * 8) + 6].value(),
            this.inner[(i * 8) + 7].value(),
          ]),
        ),
      );
    }
    return array;
  }
  toBeBytesLowerHex(): string {
    let hex = "";
    for (const byte of this.inner) {
      hex += sprintf("%02x", byte.value());
    }
    return hex;
  }
  toBeBytesUpperHex(): string {
    let hex = "";
    for (const byte of this.inner) {
      hex += sprintf("%02X", byte.value());
    }
    return hex;
  }
  toLeBytesLowerHex(): string {
    let hex = "";
    for (const byte of this.reverse().inner) {
      hex += sprintf("%02x", byte.value());
    }
    return hex;
  }
  toLeBytesUpperHex(): string {
    let hex = "";
    for (const byte of this.reverse().inner) {
      hex += sprintf("%02X", byte.value());
    }
    return hex;
  }
  toLe16bitWords(): Uint16Vector {
    if (this.length % 2 !== 0) {
      throw new Error(
        "Invalid Length Error: Expected Uint8Vector.prototype.length is multiples of 2",
      );
    }
    const array = new Uint16Vector(this.inner.length / 2);
    for (let i = 0; i < this.inner.length / 2; i++) {
      array.set(
        i,
        Uint16.fromLeBytes(
          Uint8Array.from([
            this.inner[i * 2].value(),
            this.inner[(i * 2) + 1].value(),
          ]),
        ),
      );
    }
    return array;
  }
  toLe32bitWords(): Uint32Vector {
    if (this.length % 4 !== 0) {
      throw new Error(
        "Invalid Length Error: Expected Uint8Vector.prototype.length is multiples of 4",
      );
    }
    const array = new Uint32Vector(this.inner.length / 4);
    for (let i = 0; i < this.inner.length / 4; i++) {
      array.set(
        i,
        Uint32.fromLeBytes(
          Uint8Array.from([
            this.inner[i * 4].value(),
            this.inner[(i * 4) + 1].value(),
            this.inner[(i * 4) + 2].value(),
            this.inner[(i * 4) + 3].value(),
          ]),
        ),
      );
    }
    return array;
  }
  toLe64bitWords(): Uint64Vector {
    if (this.length % 8 !== 0) {
      throw new Error(
        "Invalid Length Error: Expected Uint8Vector.prototype.length is multiples of 8",
      );
    }
    const array = new Uint64Vector(this.inner.length / 8);
    for (let i = 0; i < this.inner.length / 8; i++) {
      array.set(
        i,
        Uint64.fromLeBytes(
          Uint8Array.from([
            this.inner[i * 8].value(),
            this.inner[(i * 8) + 1].value(),
            this.inner[(i * 8) + 2].value(),
            this.inner[(i * 8) + 3].value(),
            this.inner[(i * 8) + 4].value(),
            this.inner[(i * 8) + 5].value(),
            this.inner[(i * 8) + 6].value(),
            this.inner[(i * 8) + 7].value(),
          ]),
        ),
      );
    }
    return array;
  }
  toTypedArray(): Uint8Array {
    const array = new Uint8Array(this.inner.length);
    for (let i = 0; i < this.inner.length; i++) {
      array[i] = this.inner[i].value();
    }
    return array;
  }
  static from(array: Uint8Array | Array<Uint8> | Array<number>): Uint8Vector {
    const vector = new Uint8Vector(0);
    if (array.length !== 0) {
      if (array instanceof Uint8Array || typeof array[0] === "number") {
        for (const element of array) {
          vector.push(new Uint8(element as number));
        }
      }
      if (array[0] instanceof Uint8) {
        if (array) {
          vector.inner = array as Array<Uint8>;
        }
      }
    }
    return vector;
  }
  static fromBeWords(
    words: Uint16Vector | Uint32Vector | Uint64Vector,
  ): Uint8Vector {
    const bytes = new Uint8Vector();
    for (const word of words) {
      bytes.append(
        Uint8Vector.from(word.toBeBytesArray()),
      );
    }
    return bytes;
  }
  static fromLeWords(
    words: Uint16Vector | Uint32Vector | Uint64Vector,
  ): Uint8Vector {
    const bytes = new Uint8Vector();
    for (const word of words) {
      bytes.append(
        Uint8Vector.from(word.toLeBytesArray()),
      );
    }
    return bytes;
  }
  static of(...elementN: Array<Uint8> | Array<number>): Uint8Vector {
    return Uint8Vector.from(elementN);
  }
}
