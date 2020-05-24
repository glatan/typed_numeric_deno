import { Numeric } from "./mod.ts";

const MAX: bigint = 0xFFFFFFFF_FFFFFFFFn;
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
  and(value: Uint64): Uint64 {
    return new Uint64(this.#value & value.#value);
  }
  or(value: Uint64): Uint64 {
    return new Uint64(this.#value | value.#value);
  }
  xor(value: Uint64): Uint64 {
    return new Uint64(this.#value ^ value.#value);
  }
  not(): Uint64 {
    return new Uint64(~this.#value);
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
  fromBeBytes(bytes: Uint8Array): Uint64 {
    if (bytes.length === 8) {
      return new Uint64(
        ((BigInt(bytes[0]) << 56n) & 0xFF000000_00000000n) |
          ((BigInt(bytes[1]) << 48n) & 0xFF0000_00000000n) |
          ((BigInt(bytes[2]) << 40n) & 0xFF00_00000000n) |
          ((BigInt(bytes[3]) << 32n) & 0xFF_00000000n) |
          ((BigInt(bytes[4]) << 24n) & 0xFF000000n) |
          ((BigInt(bytes[5]) << 16n) & 0xFF0000n) |
          ((BigInt(bytes[6]) << 8n) & 0xFF00n) |
          (BigInt(bytes[7]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 8",
    );
  }
  fromLeBytes(bytes: Uint8Array): Uint64 {
    if (bytes.length === 8) {
      return new Uint64(
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
      "Invalid Length Error: Expected Uint8Array.prototype.length is 8",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
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
    ]);
  }
}
