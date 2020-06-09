import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX: bigint = 0x7FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 128n;

export class Int128 extends Numeric<Int128, bigint> {
  constructor(value: bigint = 0n) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int128の最上位ビットを1にする形で)戻す
      super(((~value + 1n) & MAX) | (MAX + 1n));
    } else if (value === (value | (MAX + 1n))) {
      // Int128での最上位ビットが1の場合
      super(value & (MAX | (MAX + 1n)));
    } else {
      super(value & MAX);
    }
  }
  value(): bigint {
    if ((this.inner | (MAX + 1n)) === this.inner) {
      // Int128での最上位ビットが1の場合
      return ~(this.inner & MAX) + 1n;
    } else {
      return this.inner;
    }
  }
  static max(): bigint {
    return MAX;
  }
  static min(): bigint {
    return MIN;
  }
  add(value: Int128): Int128 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int128(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num + Num
      return new Int128(value.inner + ~(this.inner & MAX) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num + -Num
      return new Int128(this.inner + ~(value.inner & MAX) + 1n);
    } else {
      // Num + Num
      return new Int128(this.inner + value.inner);
    }
  }
  sub(value: Int128): Int128 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.inner < value.inner) {
        // -Num + Num
        return new Int128(~(this.inner & MAX) + (value.inner & MAX) + 1n);
      } else {
        return new Int128(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
      }
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num - Num
      return new Int128(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num - -Num
      return new Int128(this.inner + (value.inner & MAX));
    } else {
      // Num - Num
      return new Int128(this.inner + ~value.inner + 1n);
    }
  }
  div(value: Int128): Int128 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int128(
        (~(this.inner & MAX) + 1n) / (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int128(~((this.inner & MAX) / value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int128(~(this.inner / (value.inner & MAX)) + 1n);
    } else {
      return new Int128(this.inner / value.inner);
    }
  }
  mul(value: Int128): Int128 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int128(
        (~(this.inner & MAX) + 1n) * (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int128(~((this.inner & MAX) * value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int128(~(this.inner * (value.inner & MAX)) + 1n);
    } else {
      return new Int128(this.inner * value.inner);
    }
  }
  rem(value: Int128): Int128 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int128(
        (~(this.inner & MAX) + 1n) % (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int128(~((this.inner & MAX) % value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int128(this.inner % (value.inner & MAX));
    } else {
      return new Int128(this.inner % value.inner);
    }
  }
  exp(value: Int128): Int128 {
    if (value.inner === 0n) {
      return new Int128(1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      if (value.rem(new Int128(2n)).value() === 0n) {
        return new Int128((this.inner & MAX) ** value.inner);
      } else {
        return new Int128(~((this.inner & MAX) ** value.inner) + 1n);
      }
    } else {
      return new Int128(this.inner ** value.inner);
    }
  }
  and(value: Int128): Int128 {
    return new Int128(this.inner & value.inner);
  }
  or(value: Int128): Int128 {
    return new Int128(this.inner | value.inner);
  }
  xor(value: Int128): Int128 {
    return new Int128(this.inner ^ value.inner);
  }
  not(): Int128 {
    return new Int128(~this.inner);
  }
  logicalLeft(n: bigint): Int128 {
    if (n >= BIT_LENGTH) {
      return new Int128(0n);
    }
    return new Int128(this.inner << n);
  }
  logicalRight(n: bigint): Int128 {
    if (n >= BIT_LENGTH) {
      return new Int128(0n);
    }
    return new Int128(this.inner >> n);
  }
  rotateLeft(n: bigint): Int128 {
    return new Int128(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int128 {
    return new Int128(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Int128 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Int128(
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
  ): Int128 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Int128(
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
