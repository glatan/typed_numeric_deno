# Typed Numeric

Typed numeric for Deno.

## About

This library provides Int{8, 16, 32, 64, 128, 256} and Uint{8, 16, 32, 64, 128, 256}.

## Example

```ts
import { Uint32 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint32(200n);
const b = new Uint32(100n);

console.log(a.add(b).value()); // 300n
console.log(a.sub(b).value()); // 100n
console.log(a.div(b).value()); // 2n
console.log(a.mul(b).value()); // 20000n

const c = new Uint32(0x1234_5678n);

console.log(c.toBeBytes()); // [18, 52, 86, 120]([0x12, 0x34, 0x56, 0x78])
console.log(c.toLeBytes()); // [120, 86, 52, 18]([0x78, 0x56, 0x34, 0x12])

const d = Uint32.fromBeBytes(
  new Uint8Array([0x12, 0x34, 0x56, 0x78]),
);
const e = Uint32.fromLeBytes(
  new Uint8Array([0x12, 0x34, 0x56, 0x78]),
);

console.log(d.value()); // 305419896n(0x1234_5678n)
console.log(e.value()); // 2018915346n(0x7856_3412n)
```

## Usage

### Methods

```ts
// Create new TypedNumeric
// Int8, Int16, Uint8, Uint16: number
// Int32, Int64, Int128, Int256, Uint32, Uint64, Uint128, Uint256: bigint
new TypedNumeric(value: number | bigint)

// Get value
TypedNumeric.prototype.value(): number | bigint

// Addition
TypedNumeric.prototype.add(value: TypedNumeric): TypedNumeric

// Subtraction
TypedNumeric.prototype.sub(value: TypedNumeric): TypedNumeric

// Division
TypedNumeric.prototype.div(value: TypedNumeric): TypedNumeric

// Multiplication
TypedNumeric.prototype.mul(value: TypedNumeric): TypedNumeric

// Remainder
TypedNumeric.prototype.rem(value: TypedNumeric): TypedNumeric

// Exponentiation
TypedNumeric.prototype.exp(value: TypedNumeric >= 0): TypedNumeric

// AND
TypedNumeric.prototype.and(value: TypedNumeric): TypedNumeric

// OR
TypedNumeric.prototype.or(value: TypedNumeric): TypedNumeric

// XOR
TypedNumeric.prototype.xor(value: TypedNumeric): TypedNumeric

// NOT
TypedNumeric.prototype.not(value: TypedNumeric): TypedNumeric

// Logical left shift
TypedNumeric.prototype.logicalLeft(n: TypedNumeric): TypedNumeric

// Logical right shift
TypedNumeric.prototype.logicalRight(n: TypedNumeric): TypedNumeric

// Rotate left shift
TypedNumeric.prototype.rotateLeft(n: TypedNumeric): TypedNumeric

// Rotate right shift
TypedNumeric.prototype.rotateRight(n: TypedNumeric): TypedNumeric

// Create Uint8Array from TypedNumeric

// to big endian bytes
TypedNumeric.prototype.toBeBytes(): Uint8Array

// to litle endian bytes
TypedNumeric.prototype.toLeBytes(): Uint8Array
```

### Static Methods

```ts
// Get max value
TypedNumeric.max(): number | bigint

// Get min value
TypedNumeric.min(): number | bigint

// Create TypedNumeric from Uint8Array
// Uint8Array.length must be equal TypedNumeric byte length.
// e.g. OK: new Uint8Array(4) => Uint32, ERROR: new Uint8Array(3) => Uint32

// from big endian bytes
TypedNumeric.fromBeBytes(Uint8Array): TypedNumeric

// from little endian bytes
TypedNumeric.fromLeBytes(Uint8Array): TypedNumeric
```
