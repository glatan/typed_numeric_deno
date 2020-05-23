export interface Numeric<T> {
  value(): number | bigint;
  max(): number | bigint;
  min(): number | bigint;
  add(number: T): T;
  sub(number: T): T;
  mul(number: T): T;
  div(number: T): T;
  rotateLeft(n: number): T;
  rotateRight(n: number): T;
}
