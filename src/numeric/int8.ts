import { Numeric } from "./mod.ts";

const MAX: number = 0x7F;
const MIN: number = -MAX;
const BIT_LENGTH: number = 8;

export class Int8 extends Numeric<Int8, number> {
  constructor(value: number = 0) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int8の最上位ビットを1にする形で)戻す
      super(((~value + 1) & MAX) | (MAX + 1));
    } else if (value === (value | (MAX + 1))) {
      // Int8での最上位ビットが1の場合
      super(value & (MAX | (MAX + 1)));
    } else {
      super(value & MAX);
    }
  }
  value(): number {
    if ((this.inner | (MAX + 1)) === this.inner) {
      // Int8での最上位ビットが1の場合
      return ~(this.inner & MAX) + 1;
    } else {
      return this.inner;
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
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      // -Num + -Num
      return new Int8(~(this.inner & MAX) + ~(value.inner & MAX) + 2);
    } else if (this.inner === (this.inner | (MAX + 1))) {
      // -Num + Num
      return new Int8(value.inner + ~(this.inner & MAX) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      // Num + -Num
      return new Int8(this.inner + ~(value.inner & MAX) + 1);
    } else {
      // Num + Num
      return new Int8(this.inner + value.inner);
    }
  }
  sub(value: Int8): Int8 {
    if (
      // -Num - -Num
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      if (this.inner < value.inner) {
        // -Num + Num
        return new Int8(~(this.inner & MAX) + (value.inner & MAX) + 1);
      } else {
        return new Int8(~(this.inner & MAX) + ~(value.inner & MAX) + 2);
      }
    } else if (this.inner === (this.inner | (MAX + 1))) {
      // -Num - Num
      return new Int8(~(this.inner & MAX) + ~(value.inner & MAX) + 2);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      // Num - -Num
      return new Int8(this.inner + (value.inner & MAX));
    } else {
      // Num - Num
      return new Int8(this.inner + ~value.inner + 1);
    }
  }
  div(value: Int8): Int8 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      return new Int8(
        (~(this.inner & MAX) + 1) / (~(value.inner & MAX) + 1),
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      return new Int8(~((this.inner & MAX) / value.inner) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      return new Int8(~(this.inner / (value.inner & MAX)) + 1);
    } else {
      return new Int8(this.inner / value.inner);
    }
  }
  mul(value: Int8): Int8 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      return new Int8(
        (~(this.inner & MAX) + 1) * (~(value.inner & MAX) + 1),
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      return new Int8(~((this.inner & MAX) * value.inner) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      return new Int8(~(this.inner * (value.inner & MAX)) + 1);
    } else {
      return new Int8(this.inner * value.inner);
    }
  }
  rem(value: Int8): Int8 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      return new Int8(
        (~(this.inner & MAX) + 1) % (~(value.inner & MAX) + 1),
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      return new Int8(~((this.inner & MAX) % value.inner) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      return new Int8(this.inner % (value.inner & MAX));
    } else {
      return new Int8(this.inner % value.inner);
    }
  }
  exp(value: Int8): Int8 {
    if (value.inner === 0) {
      return new Int8(1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      if (value.rem(new Int8(2)).value() === 0) {
        return new Int8((this.inner & MAX) ** value.inner);
      } else {
        return new Int8(~((this.inner & MAX) ** value.inner) + 1);
      }
    } else {
      return new Int8(this.inner ** value.inner);
    }
  }
  and(value: Int8): Int8 {
    return new Int8(this.inner & value.inner);
  }
  or(value: Int8): Int8 {
    return new Int8(this.inner | value.inner);
  }
  xor(value: Int8): Int8 {
    return new Int8(this.inner ^ value.inner);
  }
  not(): Int8 {
    return new Int8(~this.inner);
  }
  logicalLeft(n: number): Int8 {
    if (n >= BIT_LENGTH) {
      return new Int8(0);
    }
    return new Int8(this.inner << n);
  }
  logicalRight(n: number): Int8 {
    if (n >= BIT_LENGTH) {
      return new Int8(0);
    }
    return new Int8(this.inner >> n);
  }
  rotateLeft(n: number): Int8 {
    return new Int8(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Int8 {
    return new Int8(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
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
  toBeBytesArray(): Uint8Array {
    return Uint8Array.from([this.inner]);
  }
  toLeBytesArray(): Uint8Array {
    return Uint8Array.from([this.inner]);
  }
}
