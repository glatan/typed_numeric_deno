export interface Numeric<T> {
  // Return T.#value
  value(): number | bigint;
  // Return max value of T.
  max(): number | bigint;
  // Return min value of T
  min(): number | bigint;
  // Wrapping arithmetics
  // Addition
  add(value: T): T;
  // Subtraction
  sub(value: T): T;
  // Division
  div(value: T): T;
  // Multiplication
  mul(value: T): T;
  // Remainder
  rem(value: T): T;
  // Exponentiation
  exp(value: T): T;
  // Bit wise
  // AND
  and(value: T): T;
  // OR
  or(value: T): T;
  // XOR
  xor(value: T): T;
  // NOT
  not(): T;
  // Logical shift
  logicalLeft(n: number | bigint): T;
  logicalRight(n: number | bigint): T;
  // Circular shift(rotate)
  rotateLeft(n: number | bigint): T;
  rotateRight(n: number | bigint): T;
  // Create T from Uint8Array
  // Uint8Array to T
  fromBeBytes(bytes: Uint8Array): T;
  // Uint8Array to T
  fromLeBytes(bytes: Uint8Array): T;
  // Crate Uint8Array
  // T to big endian Uint8Array
  toBeBytes(): Uint8Array;
  // T to little endian Uint8Array
  toLeBytes(): Uint8Array;
}
