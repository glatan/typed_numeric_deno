export interface Numeric<T> {
  value(): number | bigint;
  max(): number | bigint;
  min(): number | bigint;
  add(number: T): T;
  sub(number: T): T;
  mul(number: T): T;
  div(number: T): T;
  // Bit wise
  // Logical shift
  logicalLeft(n: number | bigint): T;
  logicalRight(n: number| bigint): T;
  // Circular shift(rotate)
  rotateLeft(n: number| bigint): T;
  rotateRight(n: number | bigint): T;
}
