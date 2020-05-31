import { Numeric } from "./mod.ts";

const MAX: number = 0xFF;
const MIN: number = 0;
const BIT_LENGTH: number = 8;

export class Uint8 extends Numeric<Uint8, number> {
  constructor(value: number = 0) {
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
  add(value: Uint8): Uint8 {
    return new Uint8(this.inner + value.inner);
  }
  sub(value: Uint8): Uint8 {
    return new Uint8(this.inner - value.inner);
  }
  div(value: Uint8): Uint8 {
    return new Uint8(this.inner / value.inner);
  }
  mul(value: Uint8): Uint8 {
    return new Uint8(this.inner * value.inner);
  }
  rem(value: Uint8): Uint8 {
    return new Uint8(this.inner % value.inner);
  }
  exp(value: Uint8): Uint8 {
    return new Uint8(this.inner ** value.inner);
  }
  and(value: Uint8): Uint8 {
    return new Uint8(this.inner & value.inner);
  }
  or(value: Uint8): Uint8 {
    return new Uint8(this.inner | value.inner);
  }
  xor(value: Uint8): Uint8 {
    return new Uint8(this.inner ^ value.inner);
  }
  not(): Uint8 {
    return new Uint8(~this.inner);
  }
  logicalLeft(n: number): Uint8 {
    if (n >= BIT_LENGTH) {
      return new Uint8(0);
    }
    return new Uint8(this.inner << n);
  }
  logicalRight(n: number): Uint8 {
    if (n >= BIT_LENGTH) {
      return new Uint8(0);
    }
    return new Uint8(this.inner >> n);
  }
  rotateLeft(n: number): Uint8 {
    return new Uint8(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Uint8 {
    return new Uint8(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Uint8 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Uint8(bytes[0]);
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 1",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Uint8 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Uint8(bytes[0]);
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 1",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([this.inner]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([this.inner]);
  }
}
