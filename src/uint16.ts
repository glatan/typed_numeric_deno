import { Numeric } from "./mod.ts";

const MAX: number = 0xFFFF;
const MIN: number = 0;
const BIT_LENGTH: number = 16;

export class Uint16 implements Numeric<Uint16> {
  #value: number;
  constructor(value: number = 0) {
    this.#value = value & MAX;
  }
  value(): number {
    return this.#value;
  }
  static max(): number {
    return MAX;
  }
  static min(): number {
    return MIN;
  }
  add(value: Uint16): Uint16 {
    return new Uint16(this.#value + value.#value);
  }
  sub(value: Uint16): Uint16 {
    return new Uint16(this.#value - value.#value);
  }
  div(value: Uint16): Uint16 {
    return new Uint16(this.#value / value.#value);
  }
  mul(value: Uint16): Uint16 {
    return new Uint16(this.#value * value.#value);
  }
  rem(value: Uint16): Uint16 {
    return new Uint16(this.#value % value.#value);
  }
  exp(value: Uint16): Uint16 {
    return new Uint16(this.#value ** value.#value);
  }
  and(value: Uint16): Uint16 {
    return new Uint16(this.#value & value.#value);
  }
  or(value: Uint16): Uint16 {
    return new Uint16(this.#value | value.#value);
  }
  xor(value: Uint16): Uint16 {
    return new Uint16(this.#value ^ value.#value);
  }
  not(): Uint16 {
    return new Uint16(~this.#value);
  }
  logicalLeft(n: number): Uint16 {
    if (n >= BIT_LENGTH) {
      return new Uint16(0);
    }
    return new Uint16(this.#value << n);
  }
  logicalRight(n: number): Uint16 {
    if (n >= BIT_LENGTH) {
      return new Uint16(0);
    }
    return new Uint16(this.#value >> n);
  }
  rotateLeft(n: number): Uint16 {
    return new Uint16(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Uint16 {
    return new Uint16(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Uint16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Uint16(
        ((bytes[0] << 8) & (0xFF << 8)) |
          (bytes[1] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Uint16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Uint16(
        ((bytes[1] << 8) & (0xFF << 8)) |
          (bytes[0] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
      (this.#value >> 8) & 0xFF,
      this.#value & 0xFF,
    ]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([
      this.#value & 0xFF,
      (this.#value >> 8) & 0xFF,
    ]);
  }
}
