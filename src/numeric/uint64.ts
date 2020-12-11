import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX = 0xFFFFFFFF_FFFFFFFFn;
const MIN = 0n;
const BIT_LENGTH = 64n;

export class Uint64 extends Numeric<Uint64, bigint> {
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
  add(value: Uint64): Uint64 {
    return new Uint64(this.inner + value.inner);
  }
  sub(value: Uint64): Uint64 {
    return new Uint64(this.inner - value.inner);
  }
  div(value: Uint64): Uint64 {
    return new Uint64(this.inner / value.inner);
  }
  mul(value: Uint64): Uint64 {
    return new Uint64(this.inner * value.inner);
  }
  rem(value: Uint64): Uint64 {
    return new Uint64(this.inner % value.inner);
  }
  exp(value: Uint64): Uint64 {
    return new Uint64(this.inner ** value.inner);
  }
  and(value: Uint64): Uint64 {
    return new Uint64(this.inner & value.inner);
  }
  or(value: Uint64): Uint64 {
    return new Uint64(this.inner | value.inner);
  }
  xor(value: Uint64): Uint64 {
    return new Uint64(this.inner ^ value.inner);
  }
  not(): Uint64 {
    return new Uint64(~this.inner);
  }
  logicalLeft(n: bigint): Uint64 {
    return new Uint64(this.inner << n);
  }
  logicalRight(n: bigint): Uint64 {
    return new Uint64(this.inner >> n);
  }
  rotateLeft(n: bigint): Uint64 {
    return new Uint64(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint64 {
    return new Uint64(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint64 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint64(
        ((BigInt(tmp[0]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(tmp[1]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(tmp[2]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(tmp[3]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(tmp[4]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(tmp[5]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(tmp[6]) << 8n) & (0xFFn << 8n)) |
          (BigInt(tmp[7]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 8",
    );
  }
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint64 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint64(
        ((BigInt(tmp[7]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(tmp[6]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(tmp[5]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(tmp[4]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(tmp[3]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(tmp[2]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(tmp[1]) << 8n) & (0xFFn << 8n)) |
          (BigInt(tmp[0]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 8",
    );
  }
  toBeBytes(): Uint8Vector {
    return Uint8Vector.from([
      Number((this.inner >> 56n) & 0xFFn),
      Number((this.inner >> 48n) & 0xFFn),
      Number((this.inner >> 40n) & 0xFFn),
      Number((this.inner >> 32n) & 0xFFn),
      Number((this.inner >> 24n) & 0xFFn),
      Number((this.inner >> 16n) & 0xFFn),
      Number((this.inner >> 8n) & 0xFFn),
      Number(this.inner & 0xFFn),
    ]);
  }
  toLeBytes(): Uint8Vector {
    return Uint8Vector.from([
      Number(this.inner & 0xFFn),
      Number((this.inner >> 8n) & 0xFFn),
      Number((this.inner >> 16n) & 0xFFn),
      Number((this.inner >> 24n) & 0xFFn),
      Number((this.inner >> 32n) & 0xFFn),
      Number((this.inner >> 40n) & 0xFFn),
      Number((this.inner >> 48n) & 0xFFn),
      Number((this.inner >> 56n) & 0xFFn),
    ]);
  }
}
