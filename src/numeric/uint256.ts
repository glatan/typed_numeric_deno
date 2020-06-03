import { Numeric } from "./mod.ts";
import { Uint8 } from "./uint8.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX: bigint =
  0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn;
const MIN: bigint = 0n;
const BIT_LENGTH: bigint = 256n;

export class Uint256 extends Numeric<Uint256, bigint> {
  constructor(value: bigint = 0n) {
    super(value & MAX);
  }
  value(): bigint {
    return this.inner;
  }
  static max(): bigint {
    return MAX;
  }
  static min(): bigint {
    return MIN;
  }
  add(value: Uint256): Uint256 {
    return new Uint256(this.inner + value.inner);
  }
  sub(value: Uint256): Uint256 {
    return new Uint256(this.inner - value.inner);
  }
  div(value: Uint256): Uint256 {
    return new Uint256(this.inner / value.inner);
  }
  mul(value: Uint256): Uint256 {
    return new Uint256(this.inner * value.inner);
  }
  rem(value: Uint256): Uint256 {
    return new Uint256(this.inner % value.inner);
  }
  exp(value: Uint256): Uint256 {
    return new Uint256(this.inner ** value.inner);
  }
  and(value: Uint256): Uint256 {
    return new Uint256(this.inner & value.inner);
  }
  or(value: Uint256): Uint256 {
    return new Uint256(this.inner | value.inner);
  }
  xor(value: Uint256): Uint256 {
    return new Uint256(this.inner ^ value.inner);
  }
  not(): Uint256 {
    return new Uint256(~this.inner);
  }
  logicalLeft(n: bigint): Uint256 {
    return new Uint256(this.inner << n);
  }
  logicalRight(n: bigint): Uint256 {
    return new Uint256(this.inner >> n);
  }
  rotateLeft(n: bigint): Uint256 {
    return new Uint256(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  rotateRight(n: bigint): Uint256 {
    return new Uint256(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint256 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint256(
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
      "Invalid Length Error: Expected Uint8Array.prototype.length is 32",
    );
  }
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint256 {
    if (bytes.length === (Number(BIT_LENGTH) / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint256(
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
      "Invalid Length Error: Expected Uint8Array.prototype.length is 32",
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
