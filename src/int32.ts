import { Numeric } from "./mod.ts";

const MAX: bigint = 0x7FFF_FFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 32n;

export class Int32 implements Numeric<Int32> {
  #value: bigint;
  constructor(value: bigint = 0n) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int32の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1n) & MAX) | (MAX + 1n);
    } else if (value === (value | (MAX + 1n))) {
      // Int32での最上位ビットが1の場合
      this.#value = value & (MAX | (MAX + 1n));
    } else {
      this.#value = value & MAX;
    }
  }
  value(): bigint {
    if ((this.#value | (MAX + 1n)) === this.#value) {
      // Int32での最上位ビットが1の場合
      return ~(this.#value & MAX) + 1n;
    } else {
      return this.#value;
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
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int32(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num + Num
      return new Int32(value.#value + ~(this.#value & MAX) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num + -Num
      return new Int32(this.#value + ~(value.#value & MAX) + 1n);
    } else {
      // Num + Num
      return new Int32(this.#value + value.#value);
    }
  }
  sub(value: Int32): Int32 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int32(~(this.#value & MAX) + (value.#value & MAX) + 1n);
      } else {
        return new Int32(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
      }
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num - Num
      return new Int32(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num - -Num
      return new Int32(this.#value + (value.#value & MAX));
    } else {
      // Num - Num
      return new Int32(this.#value + ~value.#value + 1n);
    }
  }
  div(value: Int32): Int32 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int32(
        (~(this.#value & MAX) + 1n) / (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int32(~((this.#value & MAX) / value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int32(~(this.#value / (value.#value & MAX)) + 1n);
    } else {
      return new Int32(this.#value / value.#value);
    }
  }
  mul(value: Int32): Int32 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int32(
        (~(this.#value & MAX) + 1n) * (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int32(~((this.#value & MAX) * value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int32(~(this.#value * (value.#value & MAX)) + 1n);
    } else {
      return new Int32(this.#value * value.#value);
    }
  }
  rem(value: Int32): Int32 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int32(
        (~(this.#value & MAX) + 1n) % (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int32(~((this.#value & MAX) % value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int32(this.#value % (value.#value & MAX));
    } else {
      return new Int32(this.#value % value.#value);
    }
  }
  exp(value: Int32): Int32 {
    if (value.#value === 0n) {
      return new Int32(1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      if (value.rem(new Int32(2n)).value() === 0n) {
        return new Int32((this.#value & MAX) ** value.#value);
      } else {
        return new Int32(~((this.#value & MAX) ** value.#value) + 1n);
      }
    } else {
      return new Int32(this.#value ** value.#value);
    }
  }
  and(value: Int32): Int32 {
    return new Int32(this.#value & value.#value);
  }
  or(value: Int32): Int32 {
    return new Int32(this.#value | value.#value);
  }
  xor(value: Int32): Int32 {
    return new Int32(this.#value ^ value.#value);
  }
  not(): Int32 {
    return new Int32(~this.#value);
  }
  logicalLeft(n: bigint): Int32 {
    if (n >= BIT_LENGTH) {
      return new Int32(0n);
    }
    return new Int32(this.#value << n);
  }
  logicalRight(n: bigint): Int32 {
    if (n >= BIT_LENGTH) {
      return new Int32(0n);
    }
    return new Int32(this.#value >> n);
  }
  rotateLeft(n: bigint): Int32 {
    return new Int32(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int32 {
    return new Int32(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
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
