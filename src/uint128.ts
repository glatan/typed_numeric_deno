import { Numeric } from "./mod.ts";

const MAX: bigint = 0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn;
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
  and(value: Uint128): Uint128 {
    return new Uint128(this.#value & value.#value);
  }
  or(value: Uint128): Uint128 {
    return new Uint128(this.#value | value.#value);
  }
  xor(value: Uint128): Uint128 {
    return new Uint128(this.#value ^ value.#value);
  }
  not(): Uint128 {
    return new Uint128(~this.#value);
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
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
      Number((this.#value >> 120n) & 0xFFn),
      Number((this.#value >> 112n) & 0xFFn),
      Number((this.#value >> 104n) & 0xFFn),
      Number((this.#value >> 96n) & 0xFFn),
      Number((this.#value >> 88n) & 0xFFn),
      Number((this.#value >> 80n) & 0xFFn),
      Number((this.#value >> 72n) & 0xFFn),
      Number((this.#value >> 64n) & 0xFFn),
      Number((this.#value >> 56n) & 0xFFn),
      Number((this.#value >> 48n) & 0xFFn),
      Number((this.#value >> 40n) & 0xFFn),
      Number((this.#value >> 32n) & 0xFFn),
      Number((this.#value >> 24n) & 0xFFn),
      Number((this.#value >> 16n) & 0xFFn),
      Number((this.#value >> 8n) & 0xFFn),
      Number(this.#value & 0xFFn),
    ]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([
      Number(this.#value & 0xFFn),
      Number((this.#value >> 8n) & 0xFFn),
      Number((this.#value >> 16n) & 0xFFn),
      Number((this.#value >> 24n) & 0xFFn),
      Number((this.#value >> 32n) & 0xFFn),
      Number((this.#value >> 40n) & 0xFFn),
      Number((this.#value >> 48n) & 0xFFn),
      Number((this.#value >> 56n) & 0xFFn),
      Number((this.#value >> 64n) & 0xFFn),
      Number((this.#value >> 72n) & 0xFFn),
      Number((this.#value >> 80n) & 0xFFn),
      Number((this.#value >> 88n) & 0xFFn),
      Number((this.#value >> 96n) & 0xFFn),
      Number((this.#value >> 104n) & 0xFFn),
      Number((this.#value >> 112n) & 0xFFn),
      Number((this.#value >> 120n) & 0xFFn),
    ]);
  }
}
