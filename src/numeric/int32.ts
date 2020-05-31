import { Numeric } from "./mod.ts";

const MAX: bigint = 0x7FFF_FFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 32n;

export class Int32 extends Numeric<Int32, bigint> {
  constructor(value: bigint = 0n) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int32の最上位ビットを1にする形で)戻す
      super(((~value + 1n) & MAX) | (MAX + 1n));
    } else if (value === (value | (MAX + 1n))) {
      // Int32での最上位ビットが1の場合
      super(value & (MAX | (MAX + 1n)));
    } else {
      super(value & MAX);
    }
  }
  value(): bigint {
    if ((this.inner | (MAX + 1n)) === this.inner) {
      // Int32での最上位ビットが1の場合
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
  add(value: Int32): Int32 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int32(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num + Num
      return new Int32(value.inner + ~(this.inner & MAX) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num + -Num
      return new Int32(this.inner + ~(value.inner & MAX) + 1n);
    } else {
      // Num + Num
      return new Int32(this.inner + value.inner);
    }
  }
  sub(value: Int32): Int32 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.inner < value.inner) {
        // -Num + Num
        return new Int32(~(this.inner & MAX) + (value.inner & MAX) + 1n);
      } else {
        return new Int32(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
      }
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num - Num
      return new Int32(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num - -Num
      return new Int32(this.inner + (value.inner & MAX));
    } else {
      // Num - Num
      return new Int32(this.inner + ~value.inner + 1n);
    }
  }
  div(value: Int32): Int32 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int32(
        (~(this.inner & MAX) + 1n) / (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int32(~((this.inner & MAX) / value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int32(~(this.inner / (value.inner & MAX)) + 1n);
    } else {
      return new Int32(this.inner / value.inner);
    }
  }
  mul(value: Int32): Int32 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int32(
        (~(this.inner & MAX) + 1n) * (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int32(~((this.inner & MAX) * value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int32(~(this.inner * (value.inner & MAX)) + 1n);
    } else {
      return new Int32(this.inner * value.inner);
    }
  }
  rem(value: Int32): Int32 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int32(
        (~(this.inner & MAX) + 1n) % (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int32(~((this.inner & MAX) % value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int32(this.inner % (value.inner & MAX));
    } else {
      return new Int32(this.inner % value.inner);
    }
  }
  exp(value: Int32): Int32 {
    if (value.inner === 0n) {
      return new Int32(1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      if (value.rem(new Int32(2n)).value() === 0n) {
        return new Int32((this.inner & MAX) ** value.inner);
      } else {
        return new Int32(~((this.inner & MAX) ** value.inner) + 1n);
      }
    } else {
      return new Int32(this.inner ** value.inner);
    }
  }
  and(value: Int32): Int32 {
    return new Int32(this.inner & value.inner);
  }
  or(value: Int32): Int32 {
    return new Int32(this.inner | value.inner);
  }
  xor(value: Int32): Int32 {
    return new Int32(this.inner ^ value.inner);
  }
  not(): Int32 {
    return new Int32(~this.inner);
  }
  logicalLeft(n: bigint): Int32 {
    if (n >= BIT_LENGTH) {
      return new Int32(0n);
    }
    return new Int32(this.inner << n);
  }
  logicalRight(n: bigint): Int32 {
    if (n >= BIT_LENGTH) {
      return new Int32(0n);
    }
    return new Int32(this.inner >> n);
  }
  rotateLeft(n: bigint): Int32 {
    return new Int32(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int32 {
    return new Int32(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Int32 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int32(
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
  static fromLeBytes(bytes: Uint8Array): Int32 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int32(
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
