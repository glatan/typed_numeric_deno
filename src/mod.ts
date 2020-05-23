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
  // Logical shift
  logicalLeft(n: number | bigint): T;
  logicalRight(n: number | bigint): T;
  // Circular shift(rotate)
  rotateLeft(n: number | bigint): T;
  rotateRight(n: number | bigint): T;
}
