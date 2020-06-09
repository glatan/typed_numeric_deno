import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX: number = 0x7FFF;
const MIN: number = -MAX;
const BIT_LENGTH: number = 16;

export class Int16 extends Numeric<Int16, number> {
  constructor(value: number = 0) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int16の最上位ビットを1にする形で)戻す
      super(((~value + 1) & MAX) | (MAX + 1));
    } else if (value === (value | (MAX + 1))) {
      // Int16での最上位ビットが1の場合
      super(value & (MAX | (MAX + 1)));
    } else {
      super(value & MAX);
    }
  }
  value(): number {
    if ((this.inner | (MAX + 1)) === this.inner) {
      // Int16での最上位ビットが1の場合
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
  add(value: Int16): Int16 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      // -Num + -Num
      return new Int16(~(this.inner & 0x7F) + ~(value.inner & MAX) + 2);
    } else if (this.inner === (this.inner | (MAX + 1))) {
      // -Num + Num
      return new Int16(value.inner + ~(this.inner & MAX) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      // Num + -Num
      return new Int16(this.inner + ~(value.inner & MAX) + 1);
    } else {
      // Num + Num
      return new Int16(this.inner + value.inner);
    }
  }
  sub(value: Int16): Int16 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      // -Num - -Num
      if (this.inner < value.inner) {
        // -Num + Num
        return new Int16(~(this.inner & MAX) + (value.inner & MAX) + 1);
      } else {
        return new Int16(~(this.inner & MAX) + ~(value.inner & MAX) + 2);
      }
    } else if (this.inner === (this.inner | (MAX + 1))) {
      // -Num - Num
      return new Int16(~(this.inner & MAX) + ~(value.inner & MAX) + 2);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      // Num - -Num
      return new Int16(this.inner + (value.inner & MAX));
    } else {
      // Num - Num
      return new Int16(this.inner + ~value.inner + 1);
    }
  }
  div(value: Int16): Int16 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      return new Int16(
        (~(this.inner & MAX) + 1) / (~(value.inner & MAX) + 1),
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      return new Int16(~((this.inner & MAX) / value.inner) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      return new Int16(~(this.inner / (value.inner & MAX)) + 1);
    } else {
      return new Int16(this.inner / value.inner);
    }
  }
  mul(value: Int16): Int16 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      return new Int16(
        (~(this.inner & MAX) + 1) * (~(value.inner & MAX) + 1),
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      return new Int16(~((this.inner & MAX) * value.inner) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      return new Int16(~(this.inner * (value.inner & MAX)) + 1);
    } else {
      return new Int16(this.inner * value.inner);
    }
  }
  rem(value: Int16): Int16 {
    if (
      this.inner === (this.inner | (MAX + 1)) &&
      value.inner === (value.inner | (MAX + 1))
    ) {
      return new Int16(
        (~(this.inner & MAX) + 1) % (~(value.inner & MAX) + 1),
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      return new Int16(~((this.inner & MAX) % value.inner) + 1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      return new Int16(this.inner % (value.inner & MAX));
    } else {
      return new Int16(this.inner % value.inner);
    }
  }
  exp(value: Int16): Int16 {
    if (value.inner === 0) {
      return new Int16(1);
    } else if (value.inner === (value.inner | (MAX + 1))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.inner === (this.inner | (MAX + 1))) {
      if (value.rem(new Int16(2)).value() === 0) {
        return new Int16((this.inner & MAX) ** value.inner);
      } else {
        return new Int16(~((this.inner & MAX) ** value.inner) + 1);
      }
    } else {
      return new Int16(this.inner ** value.inner);
    }
  }
  and(value: Int16): Int16 {
    return new Int16(this.inner & value.inner);
  }
  or(value: Int16): Int16 {
    return new Int16(this.inner | value.inner);
  }
  xor(value: Int16): Int16 {
    return new Int16(this.inner ^ value.inner);
  }
  not(): Int16 {
    return new Int16(~this.inner);
  }
  logicalLeft(n: number): Int16 {
    if (n >= BIT_LENGTH) {
      return new Int16(0);
    }
    return new Int16(this.inner << n);
  }
  logicalRight(n: number): Int16 {
    if (n >= BIT_LENGTH) {
      return new Int16(0);
    }
    return new Int16(this.inner >> n);
  }
  rotateLeft(n: number): Int16 {
    return new Int16(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: number): Int16 {
    return new Int16(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Int16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Int16(
        ((tmp[0] << 8) & (0xFF << 8)) |
          (tmp[1] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 2",
    );
  }
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Int16 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Int16(
        ((tmp[1] << 8) & (0xFF << 8)) |
          (tmp[0] & 0xFF),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 2",
    );
  }
  toBeBytes(): Uint8Vector {
    return Uint8Vector.from([(this.inner >> 8) & 0xFF, this.inner & 0xFF]);
  }
  toLeBytes(): Uint8Vector {
    return Uint8Vector.from([this.inner & 0xFF, (this.inner >> 8) & 0xFF]);
  }
}
