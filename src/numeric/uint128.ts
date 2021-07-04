import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX = 0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn;
const MIN = 0n;
const BIT_LENGTH = 128n;

export class Uint128 extends Numeric<Uint128, bigint> {
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
  add(value: Uint128): Uint128 {
    return new Uint128(this.inner + value.inner);
  }
  sub(value: Uint128): Uint128 {
    return new Uint128(this.inner - value.inner);
  }
  div(value: Uint128): Uint128 {
    return new Uint128(this.inner / value.inner);
  }
  mul(value: Uint128): Uint128 {
    return new Uint128(this.inner * value.inner);
  }
  rem(value: Uint128): Uint128 {
    return new Uint128(this.inner % value.inner);
  }
  exp(value: Uint128): Uint128 {
    return new Uint128(this.inner ** value.inner);
  }
  and(value: Uint128): Uint128 {
    return new Uint128(this.inner & value.inner);
  }
  or(value: Uint128): Uint128 {
    return new Uint128(this.inner | value.inner);
  }
  xor(value: Uint128): Uint128 {
    return new Uint128(this.inner ^ value.inner);
  }
  not(): Uint128 {
    return new Uint128(~this.inner);
  }
  logicalLeft(n: bigint): Uint128 {
    return new Uint128(this.inner << n);
  }
  logicalRight(n: bigint): Uint128 {
    return new Uint128(this.inner >> n);
  }
  rotateLeft(n: bigint): Uint128 {
    return new Uint128(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint128 {
    return new Uint128(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint128 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint128(
        ((BigInt(tmp[0]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(tmp[1]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(tmp[2]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(tmp[3]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(tmp[4]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(tmp[5]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(tmp[6]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(tmp[7]) << 64n) & (0xFFn << 64n)) |
          ((BigInt(tmp[8]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(tmp[9]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(tmp[10]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(tmp[11]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(tmp[12]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(tmp[13]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(tmp[14]) << 8n) & (0xFFn << 8n)) |
          (BigInt(tmp[15]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 16",
    );
  }
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint128 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint128(
        ((BigInt(tmp[15]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(tmp[14]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(tmp[13]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(tmp[12]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(tmp[11]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(tmp[10]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(tmp[9]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(tmp[8]) << 64n) & (0xFFn << 64n)) |
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
      "Invalid Length Error: Expected byte length is 16",
    );
  }
  toBeBytes(): Uint8Vector {
    return Uint8Vector.from([
      Number((this.inner >> 120n) & 0xFFn),
      Number((this.inner >> 112n) & 0xFFn),
      Number((this.inner >> 104n) & 0xFFn),
      Number((this.inner >> 96n) & 0xFFn),
      Number((this.inner >> 88n) & 0xFFn),
      Number((this.inner >> 80n) & 0xFFn),
      Number((this.inner >> 72n) & 0xFFn),
      Number((this.inner >> 64n) & 0xFFn),
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
      Number((this.inner >> 64n) & 0xFFn),
      Number((this.inner >> 72n) & 0xFFn),
      Number((this.inner >> 80n) & 0xFFn),
      Number((this.inner >> 88n) & 0xFFn),
      Number((this.inner >> 96n) & 0xFFn),
      Number((this.inner >> 104n) & 0xFFn),
      Number((this.inner >> 112n) & 0xFFn),
      Number((this.inner >> 120n) & 0xFFn),
    ]);
  }
}
