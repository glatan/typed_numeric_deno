import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX =
  0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn;
const MIN = -MAX;
const BIT_LENGTH = 256n;

export class Int256 extends Numeric<Int256, bigint> {
  constructor(value = 0n) {
    if (value < 0) {
      // 一度符号を外してからマスク、その後符号を(Int256の最上位ビットを1にする形で)戻す
      super(((~value + 1n) & MAX) | (MAX + 1n));
    } else if (value === (value | (MAX + 1n))) {
      // Int256での最上位ビットが1の場合
      super(value & (MAX | (MAX + 1n)));
    } else {
      super(value & MAX);
    }
  }
  value(): bigint {
    if ((this.inner | (MAX + 1n)) === this.inner) {
      // Int256での最上位ビットが1の場合
      return ~(this.inner & MAX) + 1n;
    } else {
      return this.inner;
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
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num + -Num
      return new Int256(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num + Num
      return new Int256(value.inner + ~(this.inner & MAX) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num + -Num
      return new Int256(this.inner + ~(value.inner & MAX) + 1n);
    } else {
      // Num + Num
      return new Int256(this.inner + value.inner);
    }
  }
  sub(value: Int256): Int256 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      // -Num - -Num
      if (this.inner < value.inner) {
        // -Num + Num
        return new Int256(~(this.inner & MAX) + (value.inner & MAX) + 1n);
      } else {
        return new Int256(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
      }
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      // -Num - Num
      return new Int256(~(this.inner & MAX) + ~(value.inner & MAX) + 2n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      // Num - -Num
      return new Int256(this.inner + (value.inner & MAX));
    } else {
      // Num - Num
      return new Int256(this.inner + ~value.inner + 1n);
    }
  }
  div(value: Int256): Int256 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int256(
        (~(this.inner & MAX) + 1n) / (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int256(~((this.inner & MAX) / value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int256(~(this.inner / (value.inner & MAX)) + 1n);
    } else {
      return new Int256(this.inner / value.inner);
    }
  }
  mul(value: Int256): Int256 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int256(
        (~(this.inner & MAX) + 1n) * (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int256(~((this.inner & MAX) * value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int256(~(this.inner * (value.inner & MAX)) + 1n);
    } else {
      return new Int256(this.inner * value.inner);
    }
  }
  rem(value: Int256): Int256 {
    if (
      this.inner === (this.inner | (MAX + 1n)) &&
      value.inner === (value.inner | (MAX + 1n))
    ) {
      return new Int256(
        (~(this.inner & MAX) + 1n) % (~(value.inner & MAX) + 1n),
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      return new Int256(~((this.inner & MAX) % value.inner) + 1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      return new Int256(this.inner % (value.inner & MAX));
    } else {
      return new Int256(this.inner % value.inner);
    }
  }
  exp(value: Int256): Int256 {
    if (value.inner === 0n) {
      return new Int256(1n);
    } else if (value.inner === (value.inner | (MAX + 1n))) {
      throw new Error(
        "Invalid Value Error: Expected value is greater than 0",
      );
    } else if (this.inner === (this.inner | (MAX + 1n))) {
      if (value.rem(new Int256(2n)).value() === 0n) {
        return new Int256((this.inner & MAX) ** value.inner);
      } else {
        return new Int256(~((this.inner & MAX) ** value.inner) + 1n);
      }
    } else {
      return new Int256(this.inner ** value.inner);
    }
  }
  and(value: Int256): Int256 {
    return new Int256(this.inner & value.inner);
  }
  or(value: Int256): Int256 {
    return new Int256(this.inner | value.inner);
  }
  xor(value: Int256): Int256 {
    return new Int256(this.inner ^ value.inner);
  }
  not(): Int256 {
    return new Int256(~this.inner);
  }
  logicalLeft(n: bigint): Int256 {
    if (n >= BIT_LENGTH) {
      return new Int256(0n);
    }
    return new Int256(this.inner << n);
  }
  logicalRight(n: bigint): Int256 {
    if (n >= BIT_LENGTH) {
      return new Int256(0n);
    }
    return new Int256(this.inner >> n);
  }
  rotateLeft(n: bigint): Int256 {
    return new Int256(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Int256 {
    return new Int256(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Int256 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Int256(
        ((BigInt(tmp[0]) << 248n) & (0xFFn << 248n)) |
          ((BigInt(tmp[1]) << 240n) & (0xFFn << 240n)) |
          ((BigInt(tmp[2]) << 232n) & (0xFFn << 232n)) |
          ((BigInt(tmp[3]) << 224n) & (0xFFn << 224n)) |
          ((BigInt(tmp[4]) << 216n) & (0xFFn << 216n)) |
          ((BigInt(tmp[5]) << 208n) & (0xFFn << 208n)) |
          ((BigInt(tmp[6]) << 200n) & (0xFFn << 200n)) |
          ((BigInt(tmp[7]) << 192n) & (0xFFn << 192n)) |
          ((BigInt(tmp[8]) << 184n) & (0xFFn << 184n)) |
          ((BigInt(tmp[9]) << 176n) & (0xFFn << 176n)) |
          ((BigInt(tmp[10]) << 168n) & (0xFFn << 168n)) |
          ((BigInt(tmp[11]) << 160n) & (0xFFn << 160n)) |
          ((BigInt(tmp[12]) << 152n) & (0xFFn << 152n)) |
          ((BigInt(tmp[13]) << 144n) & (0xFFn << 144n)) |
          ((BigInt(tmp[14]) << 136n) & (0xFFn << 136n)) |
          ((BigInt(tmp[15]) << 128n) & (0xFFn << 128n)) |
          ((BigInt(tmp[16]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(tmp[17]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(tmp[18]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(tmp[19]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(tmp[20]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(tmp[21]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(tmp[22]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(tmp[23]) << 64n) & (0xFFn << 64n)) |
          ((BigInt(tmp[24]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(tmp[25]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(tmp[26]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(tmp[27]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(tmp[28]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(tmp[29]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(tmp[30]) << 8n) & (0xFFn << 8n)) |
          (BigInt(tmp[31]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 32",
    );
  }
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Int256 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array(0);
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Int256(
        ((BigInt(tmp[31]) << 248n) & (0xFFn << 248n)) |
          ((BigInt(tmp[30]) << 240n) & (0xFFn << 240n)) |
          ((BigInt(tmp[29]) << 232n) & (0xFFn << 232n)) |
          ((BigInt(tmp[28]) << 224n) & (0xFFn << 224n)) |
          ((BigInt(tmp[27]) << 216n) & (0xFFn << 216n)) |
          ((BigInt(tmp[26]) << 208n) & (0xFFn << 208n)) |
          ((BigInt(tmp[25]) << 200n) & (0xFFn << 200n)) |
          ((BigInt(tmp[24]) << 192n) & (0xFFn << 192n)) |
          ((BigInt(tmp[23]) << 184n) & (0xFFn << 184n)) |
          ((BigInt(tmp[22]) << 176n) & (0xFFn << 176n)) |
          ((BigInt(tmp[21]) << 168n) & (0xFFn << 168n)) |
          ((BigInt(tmp[20]) << 160n) & (0xFFn << 160n)) |
          ((BigInt(tmp[19]) << 152n) & (0xFFn << 152n)) |
          ((BigInt(tmp[18]) << 144n) & (0xFFn << 144n)) |
          ((BigInt(tmp[17]) << 136n) & (0xFFn << 136n)) |
          ((BigInt(tmp[16]) << 128n) & (0xFFn << 128n)) |
          ((BigInt(tmp[15]) << 120n) & (0xFFn << 120n)) |
          ((BigInt(tmp[14]) << 112n) & (0xFFn << 112n)) |
          ((BigInt(tmp[13]) << 104n) & (0xFFn << 104n)) |
          ((BigInt(tmp[12]) << 96n) & (0xFFn << 96n)) |
          ((BigInt(tmp[11]) << 88n) & (0xFFn << 88n)) |
          ((BigInt(tmp[10]) << 80n) & (0xFFn << 80n)) |
          ((BigInt(tmp[9]) << 72n) & (0xFFn << 72n)) |
          ((BigInt(tmp[8]) << 64n) & (0xFFn << 64n)) |
          ((BigInt(tmp[7]) << 56n) & (0xFFn << 56n)) |
          ((BigInt(tmp[6]) << 48n) & (0xFFn << 48n)) |
          ((BigInt(tmp[5]) << 40n) & (0xFFn << 40n)) |
          ((BigInt(tmp[4]) << 32n) & (0xFFn << 32n)) |
          ((BigInt(tmp[3]) << 24n) & (0xFFn << 24n)) |
          ((BigInt(tmp[2]) << 16n) & (0xFFn << 16n)) |
          ((BigInt(tmp[1]) << 8n) & (0xFFn << 8n)) |
          (BigInt(tmp[0]) & 0xFFn),
      );
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 32",
    );
  }
  toBeBytes(): Uint8Vector {
    return Uint8Vector.from([
      Number((this.inner >> 248n) & 0xFFn),
      Number((this.inner >> 240n) & 0xFFn),
      Number((this.inner >> 232n) & 0xFFn),
      Number((this.inner >> 224n) & 0xFFn),
      Number((this.inner >> 216n) & 0xFFn),
      Number((this.inner >> 208n) & 0xFFn),
      Number((this.inner >> 200n) & 0xFFn),
      Number((this.inner >> 192n) & 0xFFn),
      Number((this.inner >> 184n) & 0xFFn),
      Number((this.inner >> 176n) & 0xFFn),
      Number((this.inner >> 168n) & 0xFFn),
      Number((this.inner >> 160n) & 0xFFn),
      Number((this.inner >> 152n) & 0xFFn),
      Number((this.inner >> 144n) & 0xFFn),
      Number((this.inner >> 136n) & 0xFFn),
      Number((this.inner >> 128n) & 0xFFn),
      Number((this.inner >> 120n) & 0xFFn),
      Number((this.inner >> 112n) & 0xFFn),
      Number((this.inner >> 104n) & 0xFFn),
      Number((this.inner >> 96n) & 0xFFn),
      Number((this.inner >> 88n) & 0xFFn),
      Number((this.inner >> 80n) & 0xFFn),
      Number((this.inner >> 72n) & 0xFFn),
      Number((this.inner >> 64n) & 0xFFn),
      Number((this.inner >> 56n) & 0xFFn),
      Number((this.inner >> 48n) & 0xFFn),
      Number((this.inner >> 40n) & 0xFFn),
      Number((this.inner >> 32n) & 0xFFn),
      Number((this.inner >> 24n) & 0xFFn),
      Number((this.inner >> 16n) & 0xFFn),
      Number((this.inner >> 8n) & 0xFFn),
      Number(this.inner & 0xFFn),
    ]);
  }
  toLeBytes(): Uint8Vector {
    return Uint8Vector.from([
      Number(this.inner & 0xFFn),
      Number((this.inner >> 8n) & 0xFFn),
      Number((this.inner >> 16n) & 0xFFn),
      Number((this.inner >> 24n) & 0xFFn),
      Number((this.inner >> 32n) & 0xFFn),
      Number((this.inner >> 40n) & 0xFFn),
      Number((this.inner >> 48n) & 0xFFn),
      Number((this.inner >> 56n) & 0xFFn),
      Number((this.inner >> 64n) & 0xFFn),
      Number((this.inner >> 72n) & 0xFFn),
      Number((this.inner >> 80n) & 0xFFn),
      Number((this.inner >> 88n) & 0xFFn),
      Number((this.inner >> 96n) & 0xFFn),
      Number((this.inner >> 104n) & 0xFFn),
      Number((this.inner >> 112n) & 0xFFn),
      Number((this.inner >> 120n) & 0xFFn),
      Number((this.inner >> 128n) & 0xFFn),
      Number((this.inner >> 136n) & 0xFFn),
      Number((this.inner >> 144n) & 0xFFn),
      Number((this.inner >> 152n) & 0xFFn),
      Number((this.inner >> 160n) & 0xFFn),
      Number((this.inner >> 168n) & 0xFFn),
      Number((this.inner >> 176n) & 0xFFn),
      Number((this.inner >> 184n) & 0xFFn),
      Number((this.inner >> 192n) & 0xFFn),
      Number((this.inner >> 200n) & 0xFFn),
      Number((this.inner >> 208n) & 0xFFn),
      Number((this.inner >> 216n) & 0xFFn),
      Number((this.inner >> 224n) & 0xFFn),
      Number((this.inner >> 232n) & 0xFFn),
      Number((this.inner >> 240n) & 0xFFn),
      Number((this.inner >> 248n) & 0xFFn),
    ]);
  }
}
