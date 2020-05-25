import { Numeric } from "./mod.ts";

const MAX: number = 0x7FFF;
const MIN: number = -0x7FFF;
const BIT_LENGTH: number = 16;

export class Int16 implements Numeric<Int16> {
  #value: number;
  constructor(value: number) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int16の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1) & MAX) | 0x8000;
    } else if (value === (value | 0x8000)) {
      // Int16での最上位ビットが1の場合
      this.#value = value & 0xFFFF;
    } else {
      this.#value = value & MAX;
    }
  }
  value(): number {
    if ((this.#value | 0x8000) === this.#value) {
      // Int16での最上位ビットが1の場合
      return ~(this.#value & 0x7FFF) + 1;
    } else {
      return this.#value;
    }
  }
  max(): number {
    return MAX;
  }
  min(): number {
    return MIN;
  }
  add(value: Int16): Int16 {
    if (
      this.#value === (this.#value | 0x8000) &&
      value.#value === (value.#value | 0x8000)
    ) {
      // -Num + -Num
      return new Int16(~(this.#value & 0x7F) + ~(value.#value & 0x7FFF) + 2);
    } else if (this.#value === (this.#value | 0x8000)) {
      // -Num + Num
      return new Int16(value.#value + ~(this.#value & 0x7FFF) + 1);
    } else if (value.#value === (value.#value | 0x8000)) {
      // Num + -Num
      return new Int16(this.#value + ~(value.#value & 0x7FFF) + 1);
    } else {
      // Num + Num
      return new Int16(this.#value + value.#value);
    }
  }
  sub(value: Int16): Int16 {
    if (
      // -Num - -Num
      this.#value === (this.#value | 0x8000) &&
      value.#value === (value.#value | 0x8000)
    ) {
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int16(~(this.#value & 0x7FFF) + (value.#value & 0x7FFF) + 1);
      } else {
        return new Int16(
          ~(this.#value & 0x7FFF) + ~(value.#value & 0x7FFF) + 2,
        );
      }
    } else if (this.#value === (this.#value | 0x8000)) {
      // -Num - Num
      return new Int16(~(this.#value & 0x7FFF) + ~(value.#value & 0x7FFF) + 2);
    } else if (value.#value === (value.#value | 0x8000)) {
      // Num - -Num
      return new Int16(this.#value + (value.#value & 0x7FFF));
    } else {
      // Num - Num
      return new Int16(this.#value + ~value.#value + 1);
    }
  }
  div(value: Int16): Int16 {
    if (
      this.#value === (this.#value | 0x8000) &&
      value.#value === (value.#value | 0x8000)
    ) {
      return new Int16(
        (~(this.#value & 0x7FFF) + 1) / (~(value.#value & 0x7FFF) + 1),
      );
    } else if (this.#value === (this.#value | 0x8000)) {
      return new Int16(~((this.#value & 0x7FFF) / value.#value) + 1);
    } else if (value.#value === (value.#value | 0x8000)) {
      return new Int16(~(this.#value / (value.#value & 0x7FFF)) + 1);
    } else {
      return new Int16(this.#value / value.#value);
    }
  }
  mul(value: Int16): Int16 {
    if (
      this.#value === (this.#value | 0x8000) &&
      value.#value === (value.#value | 0x8000)
    ) {
      return new Int16(
        (~(this.#value & 0x7FFF) + 1) * (~(value.#value & 0x7FFF) + 1),
      );
    } else if (this.#value === (this.#value | 0x8000)) {
      return new Int16(~((this.#value & 0x7FFF) * value.#value) + 1);
    } else if (value.#value === (value.#value | 0x8000)) {
      return new Int16(~(this.#value * (value.#value & 0x7FFF)) + 1);
    } else {
      return new Int16(this.#value * value.#value);
    }
  }
  rem(value: Int16): Int16 {
    return new Int16(this.#value % value.#value);
  }
  exp(value: Int16): Int16 {
    return new Int16(this.#value ** value.#value);
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
  fromBeBytes(bytes: Uint8Array): Int16 {
    if (bytes.length === 2) {
      return new Int16(
        ((bytes[0] << 8) & 0xFF00) |
          (bytes[1] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 2",
    );
  }
  fromLeBytes(bytes: Uint8Array): Int16 {
    if (bytes.length === 2) {
      return new Int16(
        ((bytes[1] << 8) & 0xFF00) |
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
