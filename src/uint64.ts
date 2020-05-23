import { Numeric } from "./mod.ts";

const MAX: bigint = 18446744073709551615n;
const MIN: bigint = 0n;
const BIT_LENGTH: bigint = 64n;

export class Uint64 implements Numeric<Uint64> {
  #value: bigint;
  constructor(value: bigint) {
    this.#value = value & MAX;
  }
  value(): bigint {
    return this.#value;
  }
  max(): bigint {
    return MAX;
  }
  min(): bigint {
    return MIN;
  }
  add(value: Uint64): Uint64 {
    return new Uint64(this.#value + value.#value);
  }
  sub(value: Uint64): Uint64 {
    return new Uint64(this.#value - value.#value);
  }
  div(value: Uint64): Uint64 {
    return new Uint64(this.#value / value.#value);
  }
  mul(value: Uint64): Uint64 {
    return new Uint64(this.#value * value.#value);
  }
  rem(value: Uint64): Uint64 {
    return new Uint64(this.#value % value.#value);
  }
  exp(value: Uint64): Uint64 {
    return new Uint64(this.#value ** value.#value);
  }
  logicalLeft(n: bigint): Uint64 {
    return new Uint64(this.#value << n);
  }
  logicalRight(n: bigint): Uint64 {
    return new Uint64(this.#value >> n);
  }
  rotateLeft(n: bigint): Uint64 {
    return new Uint64(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint64 {
    return new Uint64(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
}
