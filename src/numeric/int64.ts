import { Numeric } from "./mod.ts";

const MAX: bigint = 0x7FFFFFFF_FFFFFFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 64n;

export class Int64 extends Numeric<Int64, bigint> {
  constructor(value: bigint = 0n) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int64の最上位ビットを1にする形で)戻す
      super(((~value + 1n) & MAX) | (MAX + 1n));
    } else if (value === (value | (MAX + 1n))) {
      // Int64での最上位ビットが1の場合
      super(value & (MAX | (MAX + 1n)));
    } else {
      super(value & MAX);
    }
  }
  value(): bigint {
    if ((this.inner | (MAX + 1n)) === this.inner) {
      // Int64での最上位ビットが1の場合
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
  add(value: Int64): Int64 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int64(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num + Num
      return new Int64(value.inner + ~(this.inner & MAX) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num + -Num
      return new Int64(this.inner + ~(value.inner & MAX) + 1n);
    } else {
      // Num + Num
      return new Int64(this.inner + value.inner);
    }
  }
  sub(value: Int64): Int64 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.inner < value.inner) {
        // -Num + Num
        return new Int64(~(this.inner & MAX) + (value.inner & MAX) + 1n);
      } else {
        return new Int64(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
      }
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num - Num
      return new Int64(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num - -Num
      return new Int64(this.inner + (value.inner & MAX));
    } else {
      // Num - Num
      return new Int64(this.inner + ~value.inner + 1n);
    }
  }
  div(value: Int64): Int64 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int64(
        (~(this.inner & MAX) + 1n) / (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int64(~((this.inner & MAX) / value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int64(~(this.inner / (value.inner & MAX)) + 1n);
    } else {
      return new Int64(this.inner / value.inner);
    }
  }
  mul(value: Int64): Int64 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int64(
        (~(this.inner & MAX) + 1n) * (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int64(~((this.inner & MAX) * value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int64(~(this.inner * (value.inner & MAX)) + 1n);
    } else {
      return new Int64(this.inner * value.inner);
    }
  }
  rem(value: Int64): Int64 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int64(
        (~(this.inner & MAX) + 1n) % (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int64(~((this.inner & MAX) % value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int64(this.inner % (value.inner & MAX));
    } else {
      return new Int64(this.inner % value.inner);
    }
  }
  exp(value: Int64): Int64 {
    if (value.inner === 0n) {
      return new Int64(1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      if (value.rem(new Int64(2n)).value() === 0n) {
        return new Int64((this.inner & MAX) ** value.inner);
      } else {
        return new Int64(~((this.inner & MAX) ** value.inner) + 1n);
      }
    } else {
      return new Int64(this.inner ** value.inner);
    }
  }
  and(value: Int64): Int64 {
    return new Int64(this.inner & value.inner);
  }
  or(value: Int64): Int64 {
    return new Int64(this.inner | value.inner);
  }
  xor(value: Int64): Int64 {
    return new Int64(this.inner ^ value.inner);
  }
  not(): Int64 {
    return new Int64(~this.inner);
  }
  logicalLeft(n: bigint): Int64 {
    if (n >= BIT_LENGTH) {
      return new Int64(0n);
    }
    return new Int64(this.inner << n);
  }
  logicalRight(n: bigint): Int64 {
    if (n >= BIT_LENGTH) {
      return new Int64(0n);
    }
    return new Int64(this.inner >> n);
  }
  rotateLeft(n: bigint): Int64 {
    return new Int64(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int64 {
    return new Int64(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Int64 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int64(
        ((BigInt(bytes[0]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(bytes[1]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(bytes[2]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(bytes[3]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(bytes[4]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(bytes[5]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(bytes[6]) << 8n) & (0xFFn << 8n)) |
          (BigInt(bytes[7]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 8",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Int64 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int64(
        ((BigInt(bytes[7]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(bytes[6]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(bytes[5]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(bytes[4]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(bytes[3]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(bytes[2]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(bytes[1]) << 8n) & (0xFFn << 8n)) |
          (BigInt(bytes[0]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 8",
    );
  }
  toBeBytesArray(): Uint8Array {
    return Uint8Array.from([
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
  toLeBytesArray(): Uint8Array {
    return Uint8Array.from([
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
