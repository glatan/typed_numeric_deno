import { Numeric } from "./mod.ts";

const MAX: number = 0xFF;
const MIN: number = 0;
const BIT_LENGTH: number = 8;

export class Uint8 implements Numeric<Uint8> {
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
  add(value: Uint8): Uint8 {
    return new Uint8(this.#value + value.#value);
  }
  sub(value: Uint8): Uint8 {
    return new Uint8(this.#value - value.#value);
  }
  div(value: Uint8): Uint8 {
    return new Uint8(this.#value / value.#value);
  }
  mul(value: Uint8): Uint8 {
    return new Uint8(this.#value * value.#value);
  }
  rem(value: Uint8): Uint8 {
    return new Uint8(this.#value % value.#value);
  }
  exp(value: Uint8): Uint8 {
    return new Uint8(this.#value ** value.#value);
  }
  and(value: Uint8): Uint8 {
    return new Uint8(this.#value & value.#value);
  }
  or(value: Uint8): Uint8 {
    return new Uint8(this.#value | value.#value);
  }
  xor(value: Uint8): Uint8 {
    return new Uint8(this.#value ^ value.#value);
  }
  not(): Uint8 {
    return new Uint8(~this.#value);
  }
  logicalLeft(n: number): Uint8 {
    return new Uint8(this.#value << n);
  }
  logicalRight(n: number): Uint8 {
    return new Uint8(this.#value >> n);
  }
  rotateLeft(n: number): Uint8 {
    return new Uint8(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Uint8 {
    return new Uint8(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([this.#value]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([this.#value]);
  }
}
