import { Numeric } from "./mod.ts";

const MAX: bigint =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;
const MIN: bigint = 0n;

export class Uint256 implements Numeric<Uint256> {
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
  add(value: Uint256): Uint256 {
    return new Uint256((this.#value + value.#value) & MAX);
  }
  sub(value: Uint256): Uint256 {
    return new Uint256((this.#value - value.#value) & MAX);
  }
  mul(value: Uint256): Uint256 {
    return new Uint256((this.#value * value.#value) & MAX);
  }
  div(value: Uint256): Uint256 {
    return new Uint256((this.#value / value.#value) & MAX);
  }
}
