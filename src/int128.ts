import { Numeric } from "./mod.ts";

const MAX: bigint = 0x7FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 128n;

export class Int128 implements Numeric<Int128> {
  #value: bigint;
  constructor(value: bigint) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int128の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1n) & MAX) |
        (MAX + 1n);
    } else if (value === (value | (MAX + 1n))) {
      // Int128での最上位ビットが1の場合
      this.#value = value & (MAX | (MAX + 1n));
    } else {
      this.#value = value & MAX;
    }
  }
  value(): bigint {
    if ((this.#value | (MAX + 1n)) === this.#value) {
      // Int128での最上位ビットが1の場合
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
  add(value: Int128): Int128 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int128(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num + Num
      return new Int128(value.#value + ~(this.#value & MAX) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num + -Num
      return new Int128(this.#value + ~(value.#value & MAX) + 1n);
    } else {
      // Num + Num
      return new Int128(this.#value + value.#value);
    }
  }
  sub(value: Int128): Int128 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int128(~(this.#value & MAX) + (value.#value & MAX) + 1n);
      } else {
        return new Int128(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
      }
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num - Num
      return new Int128(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num - -Num
      return new Int128(this.#value + (value.#value & MAX));
    } else {
      // Num - Num
      return new Int128(this.#value + ~value.#value + 1n);
    }
  }
  div(value: Int128): Int128 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int128(
        (~(this.#value & MAX) + 1n) / (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int128(~((this.#value & MAX) / value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int128(~(this.#value / (value.#value & MAX)) + 1n);
    } else {
      return new Int128(this.#value / value.#value);
    }
  }
  mul(value: Int128): Int128 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int128(
        (~(this.#value & MAX) + 1n) * (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int128(~((this.#value & MAX) * value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int128(~(this.#value * (value.#value & MAX)) + 1n);
    } else {
      return new Int128(this.#value * value.#value);
    }
  }
  rem(value: Int128): Int128 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int128(
        (~(this.#value & MAX) + 1n) % (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int128(~((this.#value & MAX) % value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int128(this.#value % (value.#value & MAX));
    } else {
      return new Int128(this.#value % value.#value);
    }
  }
  exp(value: Int128): Int128 {
    if (value.#value === 0n) {
      return new Int128(1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      if (value.rem(new Int128(2n)).value() === 0n) {
        return new Int128((this.#value & MAX) ** value.#value);
      } else {
        return new Int128(~((this.#value & MAX) ** value.#value) + 1n);
      }
    } else {
      return new Int128(this.#value ** value.#value);
    }
  }
  and(value: Int128): Int128 {
    return new Int128(this.#value & value.#value);
  }
  or(value: Int128): Int128 {
    return new Int128(this.#value | value.#value);
  }
  xor(value: Int128): Int128 {
    return new Int128(this.#value ^ value.#value);
  }
  not(): Int128 {
    return new Int128(~this.#value);
  }
  logicalLeft(n: bigint): Int128 {
    if (n >= BIT_LENGTH) {
      return new Int128(0n);
    }
    return new Int128(this.#value << n);
  }
  logicalRight(n: bigint): Int128 {
    if (n >= BIT_LENGTH) {
      return new Int128(0n);
    }
    return new Int128(this.#value >> n);
  }
  rotateLeft(n: bigint): Int128 {
    return new Int128(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int128 {
    return new Int128(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Int128 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int128(
        ((BigInt(bytes[0]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(bytes[1]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(bytes[2]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(bytes[3]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(bytes[4]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(bytes[5]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(bytes[6]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(bytes[7]) << 64n) & (0xFFn << 64n)) |
          ((BigInt(bytes[8]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(bytes[9]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(bytes[10]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(bytes[11]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(bytes[12]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(bytes[13]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(bytes[14]) << 8n) & (0xFFn << 8n)) |
          (BigInt(bytes[15]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 16",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Int128 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int128(
        ((BigInt(bytes[15]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(bytes[14]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(bytes[13]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(bytes[12]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(bytes[11]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(bytes[10]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(bytes[9]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(bytes[8]) << 64n) & (0xFFn << 64n)) |
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
      "Invalid Length Error: Expected Uint8Array.prototype.length is 16",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
      Number((this.#value >> 120n) & 0xFFn),
      Number((this.#value >> 112n) & 0xFFn),
      Number((this.#value >> 104n) & 0xFFn),
      Number((this.#value >> 96n) & 0xFFn),
      Number((this.#value >> 88n) & 0xFFn),
      Number((this.#value >> 80n) & 0xFFn),
      Number((this.#value >> 72n) & 0xFFn),
      Number((this.#value >> 64n) & 0xFFn),
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
      Number((this.#value >> 64n) & 0xFFn),
      Number((this.#value >> 72n) & 0xFFn),
      Number((this.#value >> 80n) & 0xFFn),
      Number((this.#value >> 88n) & 0xFFn),
      Number((this.#value >> 96n) & 0xFFn),
      Number((this.#value >> 104n) & 0xFFn),
      Number((this.#value >> 112n) & 0xFFn),
      Number((this.#value >> 120n) & 0xFFn),
    ]);
  }
}
