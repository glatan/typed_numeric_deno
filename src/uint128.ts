import { Numeric } from "./mod.ts";

const MAX: bigint = 340282366920938463463374607431768211455n;
const MIN: bigint = 0n;
const BIT_LENGTH: bigint = 128n;

export class Uint128 implements Numeric<Uint128> {
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
  add(value: Uint128): Uint128 {
    return new Uint128(this.#value + value.#value);
  }
  sub(value: Uint128): Uint128 {
    return new Uint128(this.#value - value.#value);
  }
  div(value: Uint128): Uint128 {
    return new Uint128(this.#value / value.#value);
  }
  mul(value: Uint128): Uint128 {
    return new Uint128(this.#value * value.#value);
  }
  rem(value: Uint128): Uint128 {
    return new Uint128(this.#value % value.#value);
  }
  exp(value: Uint128): Uint128 {
    return new Uint128(this.#value ** value.#value);
  }
  logicalLeft(n: bigint): Uint128 {
    return new Uint128(this.#value << n);
  }
  logicalRight(n: bigint): Uint128 {
    return new Uint128(this.#value >> n);
  }
  rotateLeft(n: bigint): Uint128 {
    return new Uint128(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint128 {
    return new Uint128(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
}
