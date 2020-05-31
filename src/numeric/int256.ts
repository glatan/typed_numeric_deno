import { Numeric } from "./mod.ts";

const MAX: bigint =
  0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn;
const MIN: bigint = -MAX;
const BIT_LENGTH: bigint = 256n;

export class Int256 implements Numeric<Int256> {
  #value: bigint;
  constructor(value: bigint = 0n) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int256の最上位ビットを1にする形で)戻す
      this.#value = ((~value + 1n) & MAX) | (MAX + 1n);
    } else if (value === (value | (MAX + 1n))) {
      // Int256での最上位ビットが1の場合
      this.#value = value & (MAX | (MAX + 1n));
    } else {
      this.#value = value & MAX;
    }
  }
  value(): bigint {
    if ((this.#value | (MAX + 1n)) === this.#value) {
      // Int256での最上位ビットが1の場合
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
  add(value: Int256): Int256 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int256(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num + Num
      return new Int256(value.#value + ~(this.#value & MAX) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num + -Num
      return new Int256(this.#value + ~(value.#value & MAX) + 1n);
    } else {
      // Num + Num
      return new Int256(this.#value + value.#value);
    }
  }
  sub(value: Int256): Int256 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.#value < value.#value) {
        // -Num + Num
        return new Int256(~(this.#value & MAX) + (value.#value & MAX) + 1n);
      } else {
        return new Int256(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
      }
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      // -Num - Num
      return new Int256(~(this.#value & MAX) + ~(value.#value & MAX) + 2n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      // Num - -Num
      return new Int256(this.#value + (value.#value & MAX));
    } else {
      // Num - Num
      return new Int256(this.#value + ~value.#value + 1n);
    }
  }
  div(value: Int256): Int256 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int256(
        (~(this.#value & MAX) + 1n) / (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int256(~((this.#value & MAX) / value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int256(~(this.#value / (value.#value & MAX)) + 1n);
    } else {
      return new Int256(this.#value / value.#value);
    }
  }
  mul(value: Int256): Int256 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int256(
        (~(this.#value & MAX) + 1n) * (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int256(~((this.#value & MAX) * value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int256(~(this.#value * (value.#value & MAX)) + 1n);
    } else {
      return new Int256(this.#value * value.#value);
    }
  }
  rem(value: Int256): Int256 {
    if (
      this.#value === (this.#value | (MAX + 1n)) &&
      value.#value === (value.#value | (MAX + 1n))
    ) {
      return new Int256(
        (~(this.#value & MAX) + 1n) % (~(value.#value & MAX) + 1n),
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      return new Int256(~((this.#value & MAX) % value.#value) + 1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      return new Int256(this.#value % (value.#value & MAX));
    } else {
      return new Int256(this.#value % value.#value);
    }
  }
  exp(value: Int256): Int256 {
    if (value.#value === 0n) {
      return new Int256(1n);
    } else if (value.#value === (value.#value | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.#value === (this.#value | (MAX + 1n))) {
      if (value.rem(new Int256(2n)).value() === 0n) {
        return new Int256((this.#value & MAX) ** value.#value);
      } else {
        return new Int256(~((this.#value & MAX) ** value.#value) + 1n);
      }
    } else {
      return new Int256(this.#value ** value.#value);
    }
  }
  and(value: Int256): Int256 {
    return new Int256(this.#value & value.#value);
  }
  or(value: Int256): Int256 {
    return new Int256(this.#value | value.#value);
  }
  xor(value: Int256): Int256 {
    return new Int256(this.#value ^ value.#value);
  }
  not(): Int256 {
    return new Int256(~this.#value);
  }
  logicalLeft(n: bigint): Int256 {
    if (n >= BIT_LENGTH) {
      return new Int256(0n);
    }
    return new Int256(this.#value << n);
  }
  logicalRight(n: bigint): Int256 {
    if (n >= BIT_LENGTH) {
      return new Int256(0n);
    }
    return new Int256(this.#value >> n);
  }
  rotateLeft(n: bigint): Int256 {
    return new Int256(
      (this.#value << (n % BIT_LENGTH)) |
        (this.#value >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int256 {
    return new Int256(
      (this.#value >> (n % BIT_LENGTH)) |
        (this.#value << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(bytes: Uint8Array): Int256 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int256(
        ((BigInt(bytes[0]) << 248n) & (0xFFn << 248n)) |
          ((BigInt(bytes[1]) << 240n) & (0xFFn << 240n)) |
          ((BigInt(bytes[2]) << 232n) & (0xFFn << 232n)) |
          ((BigInt(bytes[3]) << 224n) & (0xFFn << 224n)) |
          ((BigInt(bytes[4]) << 216n) & (0xFFn << 216n)) |
          ((BigInt(bytes[5]) << 208n) & (0xFFn << 208n)) |
          ((BigInt(bytes[6]) << 200n) & (0xFFn << 200n)) |
          ((BigInt(bytes[7]) << 192n) & (0xFFn << 192n)) |
          ((BigInt(bytes[8]) << 184n) & (0xFFn << 184n)) |
          ((BigInt(bytes[9]) << 176n) & (0xFFn << 176n)) |
          ((BigInt(bytes[10]) << 168n) & (0xFFn << 168n)) |
          ((BigInt(bytes[11]) << 160n) & (0xFFn << 160n)) |
          ((BigInt(bytes[12]) << 152n) & (0xFFn << 152n)) |
          ((BigInt(bytes[13]) << 144n) & (0xFFn << 144n)) |
          ((BigInt(bytes[14]) << 136n) & (0xFFn << 136n)) |
          ((BigInt(bytes[15]) << 128n) & (0xFFn << 128n)) |
          ((BigInt(bytes[16]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(bytes[17]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(bytes[18]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(bytes[19]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(bytes[20]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(bytes[21]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(bytes[22]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(bytes[23]) << 64n) & (0xFFn << 64n)) |
          ((BigInt(bytes[24]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(bytes[25]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(bytes[26]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(bytes[27]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(bytes[28]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(bytes[29]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(bytes[30]) << 8n) & (0xFFn << 8n)) |
          (BigInt(bytes[31]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected Uint8Array.prototype.length is 32",
    );
  }
  static fromLeBytes(bytes: Uint8Array): Int256 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      return new Int256(
        ((BigInt(bytes[31]) << 248n) & (0xFFn << 248n)) |
          ((BigInt(bytes[30]) << 240n) & (0xFFn << 240n)) |
          ((BigInt(bytes[29]) << 232n) & (0xFFn << 232n)) |
          ((BigInt(bytes[28]) << 224n) & (0xFFn << 224n)) |
          ((BigInt(bytes[27]) << 216n) & (0xFFn << 216n)) |
          ((BigInt(bytes[26]) << 208n) & (0xFFn << 208n)) |
          ((BigInt(bytes[25]) << 200n) & (0xFFn << 200n)) |
          ((BigInt(bytes[24]) << 192n) & (0xFFn << 192n)) |
          ((BigInt(bytes[23]) << 184n) & (0xFFn << 184n)) |
          ((BigInt(bytes[22]) << 176n) & (0xFFn << 176n)) |
          ((BigInt(bytes[21]) << 168n) & (0xFFn << 168n)) |
          ((BigInt(bytes[20]) << 160n) & (0xFFn << 160n)) |
          ((BigInt(bytes[19]) << 152n) & (0xFFn << 152n)) |
          ((BigInt(bytes[18]) << 144n) & (0xFFn << 144n)) |
          ((BigInt(bytes[17]) << 136n) & (0xFFn << 136n)) |
          ((BigInt(bytes[16]) << 128n) & (0xFFn << 128n)) |
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
      "Invalid Length Error: Expected Uint8Array.prototype.length is 32",
    );
  }
  toBeBytes(): Uint8Array {
    return Uint8Array.from([
      Number((this.#value >> 248n) & 0xFFn),
      Number((this.#value >> 240n) & 0xFFn),
      Number((this.#value >> 232n) & 0xFFn),
      Number((this.#value >> 224n) & 0xFFn),
      Number((this.#value >> 216n) & 0xFFn),
      Number((this.#value >> 208n) & 0xFFn),
      Number((this.#value >> 200n) & 0xFFn),
      Number((this.#value >> 192n) & 0xFFn),
      Number((this.#value >> 184n) & 0xFFn),
      Number((this.#value >> 176n) & 0xFFn),
      Number((this.#value >> 168n) & 0xFFn),
      Number((this.#value >> 160n) & 0xFFn),
      Number((this.#value >> 152n) & 0xFFn),
      Number((this.#value >> 144n) & 0xFFn),
      Number((this.#value >> 136n) & 0xFFn),
      Number((this.#value >> 128n) & 0xFFn),
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
      Number((this.#value >> 128n) & 0xFFn),
      Number((this.#value >> 136n) & 0xFFn),
      Number((this.#value >> 144n) & 0xFFn),
      Number((this.#value >> 152n) & 0xFFn),
      Number((this.#value >> 160n) & 0xFFn),
      Number((this.#value >> 168n) & 0xFFn),
      Number((this.#value >> 176n) & 0xFFn),
      Number((this.#value >> 184n) & 0xFFn),
      Number((this.#value >> 192n) & 0xFFn),
      Number((this.#value >> 200n) & 0xFFn),
      Number((this.#value >> 208n) & 0xFFn),
      Number((this.#value >> 216n) & 0xFFn),
      Number((this.#value >> 224n) & 0xFFn),
      Number((this.#value >> 232n) & 0xFFn),
      Number((this.#value >> 240n) & 0xFFn),
      Number((this.#value >> 248n) & 0xFFn),
    ]);
  }
}