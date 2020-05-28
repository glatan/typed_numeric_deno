import { Numeric } from "./mod.ts";

const MAX: bigint = 0x7FFFFFFF_FFFFFFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 64n;

export class Int64 implements Numeric<Int64> {
  #value: bigint;
  constructor(value: bigint) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int64の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1n) & MAX) | (MAX + 1n);
    } else if (value === (value | (MAX + 1n))) {
      // Int64での最上位ビットが1の場合
      this.#value = value & (MAX | (MAX + 1n));
    } else {
      this.#value = value & MAX;
    }
  }
  value(): bigint {
    if ((this.#value | (MAX + 1n)) === this.#value) {
      // Int64での最上位ビットが1の場合
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
  add(value: Int64): Int64 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int64(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num + Num
      return new Int64(value.#value + ~(this.#value & MAX) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num + -Num
      return new Int64(this.#value + ~(value.#value & MAX) + 1n);
    } else {
      // Num + Num
      return new Int64(this.#value + value.#value);
    }
  }
  sub(value: Int64): Int64 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int64(~(this.#value & MAX) + (value.#value & MAX) + 1n);
      } else {
        return new Int64(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
      }
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num - Num
      return new Int64(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num - -Num
      return new Int64(this.#value + (value.#value & MAX));
    } else {
      // Num - Num
      return new Int64(this.#value + ~value.#value + 1n);
    }
  }
  div(value: Int64): Int64 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int64(
        (~(this.#value & MAX) + 1n) / (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int64(~((this.#value & MAX) / value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int64(~(this.#value / (value.#value & MAX)) + 1n);
    } else {
      return new Int64(this.#value / value.#value);
    }
  }
  mul(value: Int64): Int64 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int64(
        (~(this.#value & MAX) + 1n) * (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int64(~((this.#value & MAX) * value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int64(~(this.#value * (value.#value & MAX)) + 1n);
    } else {
      return new Int64(this.#value * value.#value);
    }
  }
  rem(value: Int64): Int64 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int64(
        (~(this.#value & MAX) + 1n) % (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int64(~((this.#value & MAX) % value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int64(this.#value % (value.#value & MAX));
    } else {
      return new Int64(this.#value % value.#value);
    }
  }
  exp(value: Int64): Int64 {
    if (value.#value === 0n) {
      return new Int64(1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      if (value.rem(new Int64(2n)).value() === 0n) {
        return new Int64((this.#value & MAX) ** value.#value);
      } else {
        return new Int64(~((this.#value & MAX) ** value.#value) + 1n);
      }
    } else {
      return new Int64(this.#value ** value.#value);
    }
  }
  and(value: Int64): Int64 {
    return new Int64(this.#value & value.#value);
  }
  or(value: Int64): Int64 {
    return new Int64(this.#value | value.#value);
  }
  xor(value: Int64): Int64 {
    return new Int64(this.#value ^ value.#value);
  }
  not(): Int64 {
    return new Int64(~this.#value);
  }
  logicalLeft(n: bigint): Int64 {
    if (n >= BIT_LENGTH) {
      return new Int64(0n);
    }
    return new Int64(this.#value << n);
  }
  logicalRight(n: bigint): Int64 {
    if (n >= BIT_LENGTH) {
      return new Int64(0n);
    }
    return new Int64(this.#value >> n);
  }
  rotateLeft(n: bigint): Int64 {
    return new Int64(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int64 {
    return new Int64(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
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
