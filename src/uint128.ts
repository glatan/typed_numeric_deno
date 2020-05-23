import { Numeric } from "./mod.ts";

const MAX: bigint = 340282366920938463463374607431768211455n;
const MIN: bigint = 0n;

export class Uint128 implements Numeric<Uint128> {
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
  add(value: Uint128): Uint128 {
    return new Uint128((this.#value + value.#value) & MAX);
  }
  sub(value: Uint128): Uint128 {
    return new Uint128((this.#value - value.#value) & MAX);
  }
  mul(value: Uint128): Uint128 {
    return new Uint128((this.#value * value.#value) & MAX);
  }
  div(value: Uint128): Uint128 {
    return new Uint128((this.#value / value.#value) & MAX);
  }  
}
