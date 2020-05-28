import { Numeric } from "./mod.ts";

const MAX: number = 0x7F;
const MIN: number = -MAX;
const BIT_LENGTH: number = 8;

export class Int8 implements Numeric<Int8> {
  #value: number;
  constructor(value: number) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int8の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1) & MAX) | (MAX + 1);
    } else if (value === (value | (MAX + 1))) {
      // Int8での最上位ビットが1の場合
      this.#value = value & (MAX | (MAX + 1));
    } else {
      this.#value = value & MAX;
    }
  }
  value(): number {
    if ((this.#value | (MAX + 1)) === this.#value) {
      // Int8での最上位ビットが1の場合
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
  add(value: Int8): Int8 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      // -Num + -Num
      return new Int8(~(this.#value & MAX) + ~(value.#value & MAX) + 2);
    } else if (this.#value === (this.#value | (MAX + 1))) {
      // -Num + Num
      return new Int8(value.#value + ~(this.#value & MAX) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      // Num + -Num
      return new Int8(this.#value + ~(value.#value & MAX) + 1);
    } else {
      // Num + Num
      return new Int8(this.#value + value.#value);
    }
  }
  sub(value: Int8): Int8 {
    if (
      // -Num - -Num
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int8(~(this.#value & MAX) + (value.#value & MAX) + 1);
      } else {
        return new Int8(~(this.#value & MAX) + ~(value.#value & MAX) + 2);
      }
    } else if (this.#value === (this.#value | (MAX + 1))) {
      // -Num - Num
      return new Int8(~(this.#value & MAX) + ~(value.#value & MAX) + 2);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      // Num - -Num
      return new Int8(this.#value + (value.#value & MAX));
    } else {
      // Num - Num
      return new Int8(this.#value + ~value.#value + 1);
    }
  }
  div(value: Int8): Int8 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      return new Int8(
        (~(this.#value & MAX) + 1) / (~(value.#value & MAX) + 1),
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      return new Int8(~((this.#value & MAX) / value.#value) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      return new Int8(~(this.#value / (value.#value & MAX)) + 1);
    } else {
      return new Int8(this.#value / value.#value);
    }
  }
  mul(value: Int8): Int8 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      return new Int8(
        (~(this.#value & MAX) + 1) * (~(value.#value & MAX) + 1),
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      return new Int8(~((this.#value & MAX) * value.#value) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      return new Int8(~(this.#value * (value.#value & MAX)) + 1);
    } else {
      return new Int8(this.#value * value.#value);
    }
  }
  rem(value: Int8): Int8 {
    if (
      this.#value === (this.#value | (MAX + 1)) &&
      value.#value === (value.#value | (MAX + 1))
    ) {
      return new Int8(
        (~(this.#value & MAX) + 1) % (~(value.#value & MAX) + 1),
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      return new Int8(~((this.#value & MAX) % value.#value) + 1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      return new Int8(this.#value % (value.#value & MAX));
    } else {
      return new Int8(this.#value % value.#value);
    }
  }
  exp(value: Int8): Int8 {
    if (value.#value === 0) {
      return new Int8(1);
    } else if (value.#value === (value.#value | (MAX + 1))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.#value === (this.#value | (MAX + 1))) {
      if (value.rem(new Int8(2)).value() === 0) {
        return new Int8((this.#value & MAX) ** value.#value);
      } else {
        return new Int8(~((this.#value & MAX) ** value.#value) + 1);
      }
    } else {
      return new Int8(this.#value ** value.#value);
    }
  }
  and(value: Int8): Int8 {
    return new Int8(this.#value & value.#value);
  }
  or(value: Int8): Int8 {
    return new Int8(this.#value | value.#value);
  }
  xor(value: Int8): Int8 {
    return new Int8(this.#value ^ value.#value);
  }
  not(): Int8 {
    return new Int8(~this.#value);
  }
  logicalLeft(n: number): Int8 {
    if (n >= BIT_LENGTH) {
      return new Int8(0);
    }
    return new Int8(this.#value << n);
  }
  logicalRight(n: number): Int8 {
    if (n >= BIT_LENGTH) {
      return new Int8(0);
    }
    return new Int8(this.#value >> n);
  }
  rotateLeft(n: number): Int8 {
    return new Int8(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Int8 {
    return new Int8(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Int8 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Int8(bytes[0]);
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 1",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Int8 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      return new Int8(bytes[0]);
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 1",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([this.#value]);
  }
  toLeBytes(): Uint8Array {
    return Uint8Array.from([this.#value]);
  }
}
