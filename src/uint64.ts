import { Numeric } from "./mod.ts";

const MAX: bigint = 18446744073709551615n;
const MIN: bigint = 0n;

export class Uint64 implements Numeric<Uint64> {
  #value: bigint;
  constructor(value: bigint) {
    this.#value = value;
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
    return new Uint64((this.#value + value.#value) & MAX);
  }
  sub(value: Uint64): Uint64 {
    return new Uint64((this.#value - value.#value) & MAX);
  }
  mul(value: Uint64): Uint64 {
    return new Uint64((this.#value * value.#value) & MAX);
  }
  div(value: Uint64): Uint64 {
    return new Uint64((this.#value / value.#value) & MAX);
  }
}
