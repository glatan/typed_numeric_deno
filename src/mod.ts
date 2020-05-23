export interface Numeric<T> {
  // Return T.#value
  value(): number | bigint;
  // Return max value of T.
  max(): number | bigint;
  // Return min value of T
  min(): number | bigint;
  // Wrapping arithmetics
  // Addition
  add(number: T): T;
  // Subtraction
  sub(number: T): T;
  // Division
  div(number: T): T;
  // Multiplication
  mul(number: T): T;
  // Remainder
  rem(number: T): T;
  // Exponentiation
  exp(number: T): T;
  // Bit wise
  // AND
  and(number: T): T;
  // OR
  or(number: T): T;
  // XOR
  xor(number: T): T;
  // NOT
  not(): T;
  // Logical shift
  logicalLeft(n: number | bigint): T;
  logicalRight(n: number | bigint): T;
  // Circular shift(rotate)
  rotateLeft(n: number | bigint): T;
  rotateRight(n: number | bigint): T;
  // Crate Uint8Array
  // T to big endian Uint8Array
  toBeBytes(): Uint8Array;
  // T to little endian Uint8Array
  toLeBytes(): Uint8Array;
}
