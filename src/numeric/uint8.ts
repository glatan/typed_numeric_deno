import { Numeric } from "./mod.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

const MAX: number = 0xFF;
const MIN: number = 0;
const BIT_LENGTH: number = 8;

export class Uint8 extends Numeric<Uint8, number> {
  constructor(value: number = 0) {
    super(value & MAX);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * assertEquals(new Uint8(100).value(), 100);
   * assertEquals(new Uint8(0xFF).value(), 255);
   * assertEquals(new Uint8(0x100).value(), 0);
   * assertEquals(new Uint8(0xFFFF).value(), 255);
   * ```
   */
  value(): number {
    return this.inner;
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * assertEquals(Uint8.max(), 255);
   * ```
   */
  static max(): number {
    return MAX;
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * assertEquals(Uint8.min(), 0);
   * ```
   */
  static min(): number {
    return MIN;
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(1);
   * const b = new Uint8(2);
   * assertEquals(a.add(b), new Uint8(3));
   * assertEquals(new Uint8(0xFF).add(new Uint8(1)), new Uint8(0));
   * ```
   */
  add(value: Uint8): Uint8 {
    return new Uint8(this.inner + value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(2);
   * const b = new Uint8(1);
   * assertEquals(a.sub(b), new Uint8(1));
   * assertEquals(new Uint8(0).sub(new Uint8(1)), new Uint8(0xFF));
   * ```
   */
  sub(value: Uint8): Uint8 {
    return new Uint8(this.inner - value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(3);
   * const b = new Uint8(2);
   * const c = new Uint8(1);
   * assertEquals(a.div(b), new Uint8(1));
   * assertEquals(a.div(c), new Uint8(3));
   * assertEquals(new Uint8(0).div(new Uint8(1)), new Uint8(0));
   * assertEquals(new Uint8(0).div(new Uint8(0)), new Uint8(0));
   * ```
   */
  div(value: Uint8): Uint8 {
    return new Uint8(this.inner / value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(3);
   * const b = new Uint8(2);
   * assertEquals(a.mul(b), new Uint8(6));
   * assertEquals(a.mul(new Uint8(0)), new Uint8(0));
   * assertEquals(new Uint8(0).mul(new Uint8(1)), new Uint8(0));
   * ```
   */
  mul(value: Uint8): Uint8 {
    return new Uint8(this.inner * value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(3);
   * const b = new Uint8(2);
   * assertEquals(a.rem(b), new Uint8(1));
   * assertEquals(a.rem(new Uint8(0)), new Uint8(0));
   * assertEquals(new Uint8(0).rem(new Uint8(1)), new Uint8(0));
   * ```
   */
  rem(value: Uint8): Uint8 {
    return new Uint8(this.inner % value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(3);
   * const b = new Uint8(2);
   * assertEquals(a.exp(b), new Uint8(9));
   * assertEquals(a.exp(new Uint8(0)), new Uint8(1));
   * assertEquals(new Uint8(0).exp(new Uint8(1)), new Uint8(0));
   * ```
   */
  exp(value: Uint8): Uint8 {
    return new Uint8(this.inner ** value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1111);
   * const b = new Uint8(0b1010);
   * assertEquals(a.and(b), new Uint8(0b1010));
   * assertEquals(a.and(new Uint8(0)), new Uint8(0));
   * ```
   */
  and(value: Uint8): Uint8 {
    return new Uint8(this.inner & value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1111);
   * const b = new Uint8(0b1010);
   * assertEquals(a.or(b), new Uint8(0b1111));
   * assertEquals(a.or(new Uint8(0)), new Uint8(0b1111));
   * ```
   */
  or(value: Uint8): Uint8 {
    return new Uint8(this.inner | value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1111);
   * const b = new Uint8(0b1010);
   * assertEquals(a.xor(b), new Uint8(0b0101));
   * assertEquals(a.xor(new Uint8(0)), new Uint8(0b1111));
   * ```
   */
  xor(value: Uint8): Uint8 {
    return new Uint8(this.inner ^ value.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1111);
   * assertEquals(a.not(), new Uint8(0b1111_0000));
   * assertEquals(new Uint8(0).not(), new Uint8(Uint8.max()));
   * ```
   */
  not(): Uint8 {
    return new Uint8(~this.inner);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1111);
   * assertEquals(a.logicalLeft(4), new Uint8(0b1111_0000));
   * assertEquals(a.logicalLeft(8), new Uint8(0));
   * ```
   */
  logicalLeft(n: number): Uint8 {
    if (n >= BIT_LENGTH) {
      return new Uint8(0);
    }
    return new Uint8(this.inner << n);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1111_0000);
   * assertEquals(a.logicalRight(4), new Uint8(0b1111));
   * assertEquals(a.logicalRight(8), new Uint8(0));
   * ```
   */
  logicalRight(n: number): Uint8 {
    if (n >= BIT_LENGTH) {
      return new Uint8(0);
    }
    return new Uint8(this.inner >> n);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1100_0011);
   * assertEquals(a.rotateLeft(4), new Uint8(0b0011_1100));
   * assertEquals(a.rotateLeft(8), new Uint8(0b1100_0011));
   * ```
   */
  rotateLeft(n: number): Uint8 {
    return new Uint8(
      (this.inner << (n % BIT_LENGTH)) |
        (this.inner >> ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1100_0011);
   * assertEquals(a.rotateRight(4), new Uint8(0b0011_1100));
   * assertEquals(a.rotateRight(8), new Uint8(0b1100_0011));
   * ```
   */
  rotateRight(n: number): Uint8 {
    return new Uint8(
      (this.inner >> (n % BIT_LENGTH)) |
        (this.inner << ((BIT_LENGTH - n) % BIT_LENGTH)),
    );
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * assertEquals(Uint8.fromBeBytes([1]), new Uint8(1));
   * assertEquals(Uint8.fromBeBytes(Uint8Array.from([1])), new Uint8(1));
   * assertEquals(Uint8.fromBeBytes(Uint8Vector.from([1])), new Uint8(1));
   * assertEquals(Uint8.fromBeBytes([new Uint8(1)]), new Uint8(1));
   * ```
   */
  static fromBeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint8 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint8(tmp[0]);
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 1",
    );
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * assertEquals(Uint8.fromLeBytes([1]), new Uint8(1));
   * assertEquals(Uint8.fromLeBytes(Uint8Array.from([1])), new Uint8(1));
   * assertEquals(Uint8.fromLeBytes(Uint8Vector.from([1])), new Uint8(1));
   * assertEquals(Uint8.fromLeBytes([new Uint8(1)]), new Uint8(1));
   * ```
   */
  static fromLeBytes(
    bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>,
  ): Uint8 {
    if (bytes.length === (BIT_LENGTH / 8)) {
      let tmp = new Uint8Array();
      if (bytes instanceof Uint8Array) {
        tmp = bytes;
      } else if (bytes instanceof Uint8Vector) {
        tmp = bytes.toTypedArray();
      } else {
        tmp = Uint8Vector.from(bytes).toTypedArray();
      }
      return new Uint8(tmp[0]);
    }
    throw new Error(
      "Invalid Length Error: Expected byte length is 1",
    );
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1100_0011);
   * assertEquals(a.toBeBytes(), new Uint8Vector([0b1100_0011]));
   * ```
   */
  toBeBytes(): Uint8Vector {
    return Uint8Vector.from([this.inner]);
  }
  /**
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
   * import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";
   * 
   * const a = new Uint8(0b1100_0011);
   * assertEquals(a.toLeBytes(), new Uint8Vector([0b1100_0011]));
   * ```
   */
  toLeBytes(): Uint8Vector {
    return Uint8Vector.from([this.inner]);
  }
}
