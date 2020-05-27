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
  static max(): bigint {
    return MAX;
  }
  static min(): bigint {
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
  static fromBeBytes(bytes: Uint8Array): Uint128 {
    if (bytes.length === 16) {
      return new Uint128(
        ((BigInt(bytes[0]) << 120n) & 0xFF000000_00000000_00000000_00000000n) |
          ((BigInt(bytes[1]) << 112n) & 0xFF0000_00000000_00000000_00000000n) |
          ((BigInt(bytes[2]) << 104n) & 0xFF00_00000000_00000000_00000000n) |
          ((BigInt(bytes[3]) << 96n) & 0xFF_00000000_00000000_00000000n) |
          ((BigInt(bytes[4]) << 88n) & 0xFF000000_00000000_00000000n) |
          ((BigInt(bytes[5]) << 80n) & 0xFF0000_00000000_00000000n) |
          ((BigInt(bytes[6]) << 72n) & 0xFF00_00000000_00000000n) |
          ((BigInt(bytes[7]) << 64n) & 0xFF_00000000_00000000n) |
          ((BigInt(bytes[8]) << 56n) & 0xFF000000_00000000n) |
          ((BigInt(bytes[9]) << 48n) & 0xFF0000_00000000n) |
          ((BigInt(bytes[10]) << 40n) & 0xFF00_00000000n) |
          ((BigInt(bytes[11]) << 32n) & 0xFF_00000000n) |
          ((BigInt(bytes[12]) << 24n) & 0xFF000000n) |
          ((BigInt(bytes[13]) << 16n) & 0xFF0000n) |
          ((BigInt(bytes[14]) << 8n) & 0xFF00n) |
          (BigInt(bytes[15]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 16",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Uint128 {
    if (bytes.length === 16) {
      return new Uint128(
        ((BigInt(bytes[15]) << 120n) & 0xFF000000_00000000_00000000_00000000n) |
          ((BigInt(bytes[14]) << 112n) & 0xFF0000_00000000_00000000_00000000n) |
          ((BigInt(bytes[13]) << 104n) & 0xFF00_00000000_00000000_00000000n) |
          ((BigInt(bytes[12]) << 96n) & 0xFF_00000000_00000000_00000000n) |
          ((BigInt(bytes[11]) << 88n) & 0xFF000000_00000000_00000000n) |
          ((BigInt(bytes[10]) << 80n) & 0xFF0000_00000000_00000000n) |
          ((BigInt(bytes[9]) << 72n) & 0xFF00_00000000_00000000n) |
          ((BigInt(bytes[8]) << 64n) & 0xFF_00000000_00000000n) |
          ((BigInt(bytes[7]) << 56n) & 0xFF000000_00000000n) |
          ((BigInt(bytes[6]) << 48n) & 0xFF0000_00000000n) |
          ((BigInt(bytes[5]) << 40n) & 0xFF00_00000000n) |
          ((BigInt(bytes[4]) << 32n) & 0xFF_00000000n) |
          ((BigInt(bytes[3]) << 24n) & 0xFF00_0000n) |
          ((BigInt(bytes[2]) << 16n) & 0xFF_0000n) |
          ((BigInt(bytes[1]) << 8n) & 0xFF00n) |
          (BigInt(bytes[0]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 16",
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
