import { Numeric } from "./mod.ts";

const MAX: bigint =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;
const MIN: bigint = 0n;
const BIT_LENGTH: bigint = 256n;

export class Uint256 implements Numeric<Uint256> {
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
  add(value: Uint256): Uint256 {
    return new Uint256(this.#value + value.#value);
  }
  sub(value: Uint256): Uint256 {
    return new Uint256(this.#value - value.#value);
  }
  mul(value: Uint256): Uint256 {
    return new Uint256(this.#value * value.#value);
  }
  div(value: Uint256): Uint256 {
    return new Uint256(this.#value / value.#value);
  }
  logicalLeft(n: bigint): Uint256 {
    return new Uint256(this.#value << n);
  }
  logicalRight(n: bigint): Uint256 {
    return new Uint256(this.#value >> n);
  }
  rotateLeft(n: bigint): Uint256 {
    return new Uint256(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint256 {
    return new Uint256(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
}
