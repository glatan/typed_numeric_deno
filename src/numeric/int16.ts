import { Numeric } from "./mod.ts";

const MAX: number = 0x7FFF;
const MIN: number = -MAX;
const BIT_LENGTH: number = 16;

export class Int16 implements Numeric<Int16> {
  #value: number;
  constructor(value: number = 0) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int16の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1) & MAX) | (MAX + 1);
    } else if (value === (value | (MAX + 1))) {
      // Int16での最上位ビットが1の場合
      this.#value = value & (MAX | (MAX + 1));
    } else {
      this.#value = value & MAX;
    }
  }
  value(): number {
    if ((this.#value | (MAX + 1)) === this.#value) {
      // Int16での最上位ビットが1の場合
      return ~(this.#value & MAX) + 1;
    } else {
      return this.#value;
    }
  }
  static max(): number {
    return MAX;
  }
  static min(): number {
    return MIN;
  }
  add(value: Int16): Int16 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      // -Num + -Num
      return new Int16(~(this.#value & 0x7F) + ~(value.#value & MAX) + 2);
    } else if (this.#value === (this.#value | (MAX + 1))) {
      // -Num + Num
      return new Int16(value.#value + ~(this.#value & MAX) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      // Num + -Num
      return new Int16(this.#value + ~(value.#value & MAX) + 1);
    } else {
      // Num + Num
      return new Int16(this.#value + value.#value);
    }
  }
  sub(value: Int16): Int16 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      // -Num - -Num
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int16(~(this.#value & MAX) + (value.#value & MAX) + 1);
      } else {
        return new Int16(~(this.#value & MAX) + ~(value.#value & MAX) + 2);
      }
    } else if (this.#value === (this.#value | (MAX + 1))) {
      // -Num - Num
      return new Int16(~(this.#value & MAX) + ~(value.#value & MAX) + 2);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      // Num - -Num
      return new Int16(this.#value + (value.#value & MAX));
    } else {
      // Num - Num
      return new Int16(this.#value + ~value.#value + 1);
    }
  }
  div(value: Int16): Int16 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      return new Int16(
        (~(this.#value & MAX) + 1) / (~(value.#value & MAX) + 1),
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      return new Int16(~((this.#value & MAX) / value.#value) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      return new Int16(~(this.#value / (value.#value & MAX)) + 1);
    } else {
      return new Int16(this.#value / value.#value);
    }
  }
  mul(value: Int16): Int16 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      return new Int16(
        (~(this.#value & MAX) + 1) * (~(value.#value & MAX) + 1),
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      return new Int16(~((this.#value & MAX) * value.#value) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      return new Int16(~(this.#value * (value.#value & MAX)) + 1);
    } else {
      return new Int16(this.#value * value.#value);
    }
  }
  rem(value: Int16): Int16 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      return new Int16(
        (~(this.#value & MAX) + 1) % (~(value.#value & MAX) + 1),
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      return new Int16(~((this.#value & MAX) % value.#value) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      return new Int16(this.#value % (value.#value & MAX));
    } else {
      return new Int16(this.#value % value.#value);
    }
  }
  exp(value: Int16): Int16 {
    if (value.#value === 0) {
      return new Int16(1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      if (value.rem(new Int16(2)).value() === 0) {
        return new Int16((this.#value & MAX) ** value.#value);
      } else {
        return new Int16(~((this.#value & MAX) ** value.#value) + 1);
      }
    } else {
      return new Int16(this.#value ** value.#value);
    }
  }
  and(value: Int16): Int16 {
    return new Int16(this.#value & value.#value);
  }
  or(value: Int16): Int16 {
    return new Int16(this.#value | value.#value);
  }
  xor(value: Int16): Int16 {
    return new Int16(this.#value ^ value.#value);
  }
  not(): Int16 {
    return new Int16(~this.#value);
  }
  logicalLeft(n: number): Int16 {
    if (n >= BIT_LENGTH) {
      return new Int16(0);
    }
    return new Int16(this.#value << n);
  }
  logicalRight(n: number): Int16 {
    if (n >= BIT_LENGTH) {
      return new Int16(0);
    }
    return new Int16(this.#value >> n);
  }
  rotateLeft(n: number): Int16 {
    return new Int16(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Int16 {
    return new Int16(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Int16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Int16(
        ((bytes[0] << 8) & (0xFF << 8)) |
          (bytes[1] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Int16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Int16(
        ((bytes[1] << 8) & (0xFF << 8)) |
          (bytes[0] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([(this.#value >> 8) & 0xFF, this.#value & 0xFF]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([this.#value & 0xFF, (this.#value >> 8) & 0xFF]);
  }
}
