import { Numeric } from "./mod.ts";

const MAX: number = 0x7FFF;
const MIN: number = -0x7FFF;
const BIT_LENGTH: number = 16;

export class Int16 implements Numeric<Int16> {
  #value: number;
  constructor(value: number) {
    if (value < 0) {
      this.#value = ~((~value + 1) & MAX) + 1;
    } else {
      this.#value = value & MAX;
    }
  }
  value(): number {
    return this.#value;
  }
  max(): number {
    return MAX;
  }
  min(): number {
    return MIN;
  }
  add(value: Int16): Int16 {
    return new Int16(this.#value + value.#value);
  }
  sub(value: Int16): Int16 {
    return new Int16(this.#value - value.#value);
  }
  div(value: Int16): Int16 {
    return new Int16(this.#value / value.#value);
  }
  mul(value: Int16): Int16 {
    return new Int16(this.#value * value.#value);
  }
  rem(value: Int16): Int16 {
    return new Int16(this.#value % value.#value);
  }
  exp(value: Int16): Int16 {
    return new Int16(this.#value ** value.#value);
  }
  and(value: Int16): Int16 {
    return new Int16(this.#value & value.#value);
  }
  or(value: Int16): Int16 {
    return new Int16(this.#value | value.#value);
  }
  xor(value: Int16): Int16 {
    return new Int16(this.#value ^ value.#value);
  }
  not(): Int16 {
    return new Int16(~this.#value);
  }
  logicalLeft(n: number): Int16 {
    if (n >= BIT_LENGTH) {
      return new Int16(0);
    }
    return new Int16(this.#value << n);
  }
  logicalRight(n: number): Int16 {
    if (n >= BIT_LENGTH) {
      return new Int16(0);
    }
    return new Int16(this.#value >> n);
  }
  rotateLeft(n: number): Int16 {
    return new Int16(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Int16 {
    return new Int16(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  fromBeBytes(bytes: Uint8Array): Int16 {
    if (bytes.length === 2) {
      return new Int16(
        ((bytes[0] << 8) & 0xFF00) |
          (bytes[1] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  fromLeBytes(bytes: Uint8Array): Int16 {
    if (bytes.length === 2) {
      return new Int16(
        ((bytes[1] << 8) & 0xFF00) |
          (bytes[0] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([(this.#value >> 8) & 0xFF, this.#value & 0xFF]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([this.#value & 0xFF, (this.#value >> 8) & 0xFF]);
  }
}
