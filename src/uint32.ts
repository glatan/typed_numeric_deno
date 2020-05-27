import { Numeric } from "./mod.ts";

const MAX: bigint = 0xFFFF_FFFFn;
const MIN: bigint = 0n;
const BIT_LENGTH: bigint = 32n;

export class Uint32 implements Numeric<Uint32> {
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
  add(value: Uint32): Uint32 {
    return new Uint32(this.#value + value.#value);
  }
  sub(value: Uint32): Uint32 {
    return new Uint32(this.#value - value.#value);
  }
  div(value: Uint32): Uint32 {
    return new Uint32(this.#value / value.#value);
  }
  mul(value: Uint32): Uint32 {
    return new Uint32(this.#value * value.#value);
  }
  rem(value: Uint32): Uint32 {
    return new Uint32(this.#value % value.#value);
  }
  exp(value: Uint32): Uint32 {
    return new Uint32(this.#value ** value.#value);
  }
  and(value: Uint32): Uint32 {
    return new Uint32(this.#value & value.#value);
  }
  or(value: Uint32): Uint32 {
    return new Uint32(this.#value | value.#value);
  }
  xor(value: Uint32): Uint32 {
    return new Uint32(this.#value ^ value.#value);
  }
  not(): Uint32 {
    return new Uint32(~this.#value);
  }
  logicalLeft(n: bigint): Uint32 {
    return new Uint32(this.#value << n);
  }
  logicalRight(n: bigint): Uint32 {
    return new Uint32(this.#value >> n);
  }
  rotateLeft(n: bigint): Uint32 {
    return new Uint32(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint32 {
    return new Uint32(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Uint32 {
    if (bytes.length === 4) {
      return new Uint32(
        ((BigInt(bytes[0]) << 24n) & 0xFF00_0000n) |
          ((BigInt(bytes[1]) << 16n) & 0xFF_0000n) |
          ((BigInt(bytes[2]) << 8n) & 0xFF00n) |
          (BigInt(bytes[3]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 4",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Uint32 {
    if (bytes.length === 4) {
      return new Uint32(
        ((BigInt(bytes[3]) << 24n) & 0xFF00_0000n) |
          ((BigInt(bytes[2]) << 16n) & 0xFF_0000n) |
          ((BigInt(bytes[1]) << 8n) & 0xFF00n) |
          (BigInt(bytes[0]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 4",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
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
    ]);
  }
}
