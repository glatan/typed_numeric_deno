import { Uint8Vector } from "../vector/uint8vector.ts";

export abstract class Numeric<T, N> {
  protected inner: N;
  protected constructor(value: N) {
    this.inner = value;
  }
  // Return T.inner
  abstract value(): N;
  // Return max value of T.
  // static max(): number | bigint;
  // Return min value of T
  // static min(): number | bigint;
  // Wrapping arithmetics
  // Addition
  abstract add(value: T): T;
  // Subtraction
  abstract sub(value: T): T;
  // Division
  abstract div(value: T): T;
  // Multiplication
  abstract mul(value: T): T;
  // Remainder
  abstract rem(value: T): T;
  // Exponentiation
  abstract exp(value: T): T;
  // Bit wise
  // AND
  abstract and(value: T): T;
  // OR
  abstract or(value: T): T;
  // XOR
  abstract xor(value: T): T;
  // NOT
  abstract not(): T;
  // Logical shift
  abstract logicalLeft(n: N): T;
  abstract logicalRight(n: N): T;
  // Circular shift(rotate)
  abstract rotateLeft(n: N): T;
  abstract rotateRight(n: N): T;
  // Create T from Uint8Array
  // Uint8Array to T
  // static fromBeBytes(bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>): T;
  // Uint8Array to T
  // static fromLeBytes(bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>): T;
  // Crate Uint8Array
  // T to big endian Uint8Vector
  abstract toBeBytes(): Uint8Vector;
  // T to little endian Uint8Vector
  abstract toLeBytes(): Uint8Vector;
}
