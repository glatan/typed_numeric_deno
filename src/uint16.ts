import { Numeric } from "./mod.ts";

const MAX: number = 65535;
const MIN: number = 0;
const BIT_LENGTH: number = 16;

export class Uint16 implements Numeric<Uint16> {
  #value: number;
  constructor(value: number) {
    this.#value = value & MAX;
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
    return new Uint16(this.#value << n);
  }
  logicalRight(n: number): Uint16 {
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
