import { Numeric } from "./mod.ts";

const MAX: number = 4294967295;
const MIN: number = 0;
const BIT_LENGTH: number = 32;

export class Uint32 implements Numeric<Uint32> {
  #value: number;
  constructor(value: number) {
    this.#value = value;
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
  add(value: Uint32): Uint32 {
    return new Uint32((this.#value + value.#value) & MAX);
  }
  sub(value: Uint32): Uint32 {
    return new Uint32((this.#value - value.#value) & MAX);
  }
  mul(value: Uint32): Uint32 {
    return new Uint32((this.#value * value.#value) & MAX);
  }
  div(value: Uint32): Uint32 {
    return new Uint32((this.#value / value.#value) & MAX);
  }
  logicalLeft(n: number): Uint32 {
    return new Uint32(this.#value << n)
  }
  logicalRight(n: number): Uint32 {
    return new Uint32(this.#value >> n)
  }
  rotateLeft(n: number): Uint32 {
    return new Uint32((this.#value << (n % BIT_LENGTH)) | (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)));
  }
  rotateRight(n: number): Uint32 {
    return new Uint32((this.#value >> (n % BIT_LENGTH)) | (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)));
  }
}
