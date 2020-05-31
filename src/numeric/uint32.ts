import { Numeric } from "./mod.ts";

const MAX: bigint = 0xFFFF_FFFFn;
const MIN: bigint = 0n;
const BIT_LENGTH: bigint = 32n;

export class Uint32 extends Numeric<Uint32, bigint> {
  constructor(value: bigint = 0n) {
    super(value & MAX);
  }
  value(): bigint {
    return this.inner;
  }
  static max(): bigint {
    return MAX;
  }
  static min(): bigint {
    return MIN;
  }
  add(value: Uint32): Uint32 {
    return new Uint32(this.inner + value.inner);
  }
  sub(value: Uint32): Uint32 {
    return new Uint32(this.inner - value.inner);
  }
  div(value: Uint32): Uint32 {
    return new Uint32(this.inner / value.inner);
  }
  mul(value: Uint32): Uint32 {
    return new Uint32(this.inner * value.inner);
  }
  rem(value: Uint32): Uint32 {
    return new Uint32(this.inner % value.inner);
  }
  exp(value: Uint32): Uint32 {
    return new Uint32(this.inner ** value.inner);
  }
  and(value: Uint32): Uint32 {
    return new Uint32(this.inner & value.inner);
  }
  or(value: Uint32): Uint32 {
    return new Uint32(this.inner | value.inner);
  }
  xor(value: Uint32): Uint32 {
    return new Uint32(this.inner ^ value.inner);
  }
  not(): Uint32 {
    return new Uint32(~this.inner);
  }
  logicalLeft(n: bigint): Uint32 {
    return new Uint32(this.inner << n);
  }
  logicalRight(n: bigint): Uint32 {
    return new Uint32(this.inner >> n);
  }
  rotateLeft(n: bigint): Uint32 {
    return new Uint32(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint32 {
    return new Uint32(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Uint32 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Uint32(
        ((BigInt(bytes[0]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(bytes[1]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(bytes[2]) << 8n) & (0xFFn << 8n)) |
          (BigInt(bytes[3]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 4",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Uint32 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Uint32(
        ((BigInt(bytes[3]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(bytes[2]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(bytes[1]) << 8n) & (0xFFn << 8n)) |
          (BigInt(bytes[0]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 4",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
      Number((this.inner >> 24n) & 0xFFn),
      Number((this.inner >> 16n) & 0xFFn),
      Number((this.inner >> 8n) & 0xFFn),
      Number(this.inner & 0xFFn),
    ]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([
      Number(this.inner & 0xFFn),
      Number((this.inner >> 8n) & 0xFFn),
      Number((this.inner >> 16n) & 0xFFn),
      Number((this.inner >> 24n) & 0xFFn),
    ]);
  }
}
