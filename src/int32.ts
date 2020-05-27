import { Numeric } from "./mod.ts";

const MAX: bigint = 0x7FFF_FFFFn;
const MIN: bigint = -0x7FFF_FFFFn;
const BIT_LENGTH: bigint = 32n;

export class Int32 implements Numeric<Int32> {
  #value: bigint;
  constructor(value: bigint) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int32の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1n) & MAX) | 0x8000_0000n;
    } else if (value === (value | 0x8000_0000n)) {
      // Int32での最上位ビットが1の場合
      this.#value = value & 0xFFFF_FFFFn;
    } else {
      this.#value = value & MAX;
    }
  }
  value(): bigint {
    if ((this.#value | 0x8000_0000n) === this.#value) {
      // Int32での最上位ビットが1の場合
      return ~(this.#value & 0x7FFF_FFFFn) + 1n;
    } else {
      return this.#value;
    }
  }
  max(): bigint {
    return MAX;
  }
  min(): bigint {
    return MIN;
  }
  add(value: Int32): Int32 {
    if (
      this.#value === (this.#value | 0x8000_0000n) &&
      value.#value === (value.#value | 0x8000_0000n)
    ) {
      // -Num + -Num
      return new Int32(
        ~(this.#value & 0x7FFF_FFFFn) + ~(value.#value & 0x7FFF_FFFFn) + 2n,
      );
    } else if (this.#value === (this.#value | 0x8000_0000n)) {
      // -Num + Num
      return new Int32(value.#value + ~(this.#value & 0x7FFF_FFFFn) + 1n);
    } else if (value.#value === (value.#value | 0x8000_0000n)) {
      // Num + -Num
      return new Int32(this.#value + ~(value.#value & 0x7FFF_FFFFn) + 1n);
    } else {
      // Num + Num
      return new Int32(this.#value + value.#value);
    }
  }
  sub(value: Int32): Int32 {
    if (
      // -Num - -Num
      this.#value === (this.#value | 0x8000_0000n) &&
      value.#value === (value.#value | 0x8000_0000n)
    ) {
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int32(
          ~(this.#value & 0x7FFF_FFFFn) + (value.#value & 0x7FFF_FFFFn) + 1n,
        );
      } else {
        return new Int32(
          ~(this.#value & 0x7FFF_FFFFn) + ~(value.#value & 0x7FFF_FFFFn) + 2n,
        );
      }
    } else if (this.#value === (this.#value | 0x8000_0000n)) {
      // -Num - Num
      return new Int32(
        ~(this.#value & 0x7FFF_FFFFn) + ~(value.#value & 0x7FFF_FFFFn) + 2n,
      );
    } else if (value.#value === (value.#value | 0x8000_0000n)) {
      // Num - -Num
      return new Int32(this.#value + (value.#value & 0x7FFF_FFFFn));
    } else {
      // Num - Num
      return new Int32(this.#value + ~value.#value + 1n);
    }
  }
  div(value: Int32): Int32 {
    if (
      this.#value === (this.#value | 0x8000_0000n) &&
      value.#value === (value.#value | 0x8000_0000n)
    ) {
      return new Int32(
        (~(this.#value & 0x7FFF_FFFFn) + 1n) /
          (~(value.#value & 0x7FFF_FFFFn) + 1n),
      );
    } else if (this.#value === (this.#value | 0x8000_0000n)) {
      return new Int32(~((this.#value & 0x7FFF_FFFFn) / value.#value) + 1n);
    } else if (value.#value === (value.#value | 0x8000_0000n)) {
      return new Int32(~(this.#value / (value.#value & 0x7FFF_FFFFn)) + 1n);
    } else {
      return new Int32(this.#value / value.#value);
    }
  }
  mul(value: Int32): Int32 {
    if (
      this.#value === (this.#value | 0x8000_0000n) &&
      value.#value === (value.#value | 0x8000_0000n)
    ) {
      return new Int32(
        (~(this.#value & 0x7FFF_FFFFn) + 1n) *
          (~(value.#value & 0x7FFF_FFFFn) + 1n),
      );
    } else if (this.#value === (this.#value | 0x8000_0000n)) {
      return new Int32(~((this.#value & 0x7FFF_FFFFn) * value.#value) + 1n);
    } else if (value.#value === (value.#value | 0x8000_0000n)) {
      return new Int32(~(this.#value * (value.#value & 0x7FFF_FFFFn)) + 1n);
    } else {
      return new Int32(this.#value * value.#value);
    }
  }
  rem(value: Int32): Int32 {
    if (
      this.#value === (this.#value | 0x8000_0000n) &&
      value.#value === (value.#value | 0x8000_0000n)
    ) {
      return new Int32(
        (~(this.#value & 0x7FFF_FFFFn) + 1n) %
          (~(value.#value & 0x7FFF_FFFFn) + 1n),
      );
    } else if (this.#value === (this.#value | 0x8000_0000n)) {
      return new Int32(~((this.#value & 0x7FFF_FFFFn) % value.#value) + 1n);
    } else if (value.#value === (value.#value | 0x8000_0000n)) {
      return new Int32(this.#value % (value.#value & 0x7FFF_FFFFn));
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
  fromBeBytes(bytes: Uint8Array): Int32 {
    if (bytes.length === 4) {
      return new Int32(
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
  fromLeBytes(bytes: Uint8Array): Int32 {
    if (bytes.length === 4) {
      return new Int32(
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
