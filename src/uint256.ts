import { Numeric } from "./mod.ts";

const MAX: bigint =
  0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn;
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
  div(value: Uint256): Uint256 {
    return new Uint256(this.#value / value.#value);
  }
  mul(value: Uint256): Uint256 {
    return new Uint256(this.#value * value.#value);
  }
  rem(value: Uint256): Uint256 {
    return new Uint256(this.#value % value.#value);
  }
  exp(value: Uint256): Uint256 {
    return new Uint256(this.#value ** value.#value);
  }
  and(value: Uint256): Uint256 {
    return new Uint256(this.#value & value.#value);
  }
  or(value: Uint256): Uint256 {
    return new Uint256(this.#value | value.#value);
  }
  xor(value: Uint256): Uint256 {
    return new Uint256(this.#value ^ value.#value);
  }
  not(): Uint256 {
    return new Uint256(~this.#value);
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
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
      Number((this.#value >> 248n) & 0xFFn),
      Number((this.#value >> 240n) & 0xFFn),
      Number((this.#value >> 232n) & 0xFFn),
      Number((this.#value >> 224n) & 0xFFn),
      Number((this.#value >> 216n) & 0xFFn),
      Number((this.#value >> 208n) & 0xFFn),
      Number((this.#value >> 200n) & 0xFFn),
      Number((this.#value >> 192n) & 0xFFn),
      Number((this.#value >> 184n) & 0xFFn),
      Number((this.#value >> 176n) & 0xFFn),
      Number((this.#value >> 168n) & 0xFFn),
      Number((this.#value >> 160n) & 0xFFn),
      Number((this.#value >> 152n) & 0xFFn),
      Number((this.#value >> 144n) & 0xFFn),
      Number((this.#value >> 136n) & 0xFFn),
      Number((this.#value >> 128n) & 0xFFn),
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
      Number((this.#value >> 128n) & 0xFFn),
      Number((this.#value >> 136n) & 0xFFn),
      Number((this.#value >> 144n) & 0xFFn),
      Number((this.#value >> 152n) & 0xFFn),
      Number((this.#value >> 160n) & 0xFFn),
      Number((this.#value >> 168n) & 0xFFn),
      Number((this.#value >> 176n) & 0xFFn),
      Number((this.#value >> 184n) & 0xFFn),
      Number((this.#value >> 192n) & 0xFFn),
      Number((this.#value >> 200n) & 0xFFn),
      Number((this.#value >> 208n) & 0xFFn),
      Number((this.#value >> 216n) & 0xFFn),
      Number((this.#value >> 224n) & 0xFFn),
      Number((this.#value >> 232n) & 0xFFn),
      Number((this.#value >> 240n) & 0xFFn),
      Number((this.#value >> 248n) & 0xFFn),
    ]);
  }
}
