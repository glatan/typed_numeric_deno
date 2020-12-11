import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX = 0xFFFF;
const MIN = 0;
const BIT_LENGTH = 16;

export class Uint16 extends Numeric<Uint16, number> {
  constructor(value = 0) {
    super(value & MAX);
  }
  value(): number {
    return this.inner;
  }
  static max(): number {
    return MAX;
  }
  static min(): number {
    return MIN;
  }
  add(value: Uint16): Uint16 {
    return new Uint16(this.inner + value.inner);
  }
  sub(value: Uint16): Uint16 {
    return new Uint16(this.inner - value.inner);
  }
  div(value: Uint16): Uint16 {
    return new Uint16(this.inner / value.inner);
  }
  mul(value: Uint16): Uint16 {
    return new Uint16(this.inner * value.inner);
  }
  rem(value: Uint16): Uint16 {
    return new Uint16(this.inner % value.inner);
  }
  exp(value: Uint16): Uint16 {
    return new Uint16(this.inner ** value.inner);
  }
  and(value: Uint16): Uint16 {
    return new Uint16(this.inner & value.inner);
  }
  or(value: Uint16): Uint16 {
    return new Uint16(this.inner | value.inner);
  }
  xor(value: Uint16): Uint16 {
    return new Uint16(this.inner ^ value.inner);
  }
  not(): Uint16 {
    return new Uint16(~this.inner);
  }
  logicalLeft(n: number): Uint16 {
    if (n >= BIT_LENGTH) {
      return new Uint16(0);
    }
    return new Uint16(this.inner << n);
  }
  logicalRight(n: number): Uint16 {
    if (n >= BIT_LENGTH) {
      return new Uint16(0);
    }
    return new Uint16(this.inner >> n);
  }
  rotateLeft(n: number): Uint16 {
    return new Uint16(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Uint16 {
    return new Uint16(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint16(
        ((tmp[0] << 8) & (0xFF << 8)) |
          (tmp[1] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 2",
    );
  }
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint16(
        ((tmp[1] << 8) & (0xFF << 8)) |
          (tmp[0] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 2",
    );
  }
  toBeBytes(): Uint8Vector {
    return Uint8Vector.from([
      (this.inner >> 8) & 0xFF,
      this.inner & 0xFF,
    ]);
  }
  toLeBytes(): Uint8Vector {
    return Uint8Vector.from([
      this.inner & 0xFF,
      (this.inner >> 8) & 0xFF,
    ]);
  }
}
