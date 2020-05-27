# Typed Numeric

Typed numeric for Deno.

## About

This library provides Int{8, 16, 32, 64, 128, 256} and Uint{8, 16, 32, 64, 128, 256}.

## Example

```ts
import { Uint32 } from "./mod.ts";

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
console.log(e.value()); // 2018915346n(0x78563412n)
```

## Usage

```ts
// Create new TypedNumeric
// Int8, Int16, Uint8, Uint16: number
// Int32, Int64, Int128, Int256, Uint32, Uint64, Uint128, Uint256: bigint
new TypedNumeric(value: number | bigint)

// Get value
TypedNumeric.prototype.value(): number | bigint

// Get max value
TypedNumeric.max(): number | bigint

// Get min value
TypedNumeric.min(): number | bigint

// Addition
TypedNumeric.prototype.add(TypedNumeric)

// Subtraction
TypedNumeric.prototype.sub(TypedNumeric)

// Division
TypedNumeric.prototype.div(TypedNumeric)

// Multiplication
TypedNumeric.prototype.mul(TypedNumeric)

// Remainder
TypedNumeric.prototype.rem(TypedNumeric)

// Exponentiation
TypedNumeric.prototype.exp(TypedNumeric >= 0)

// AND
TypedNumeric.prototype.and(TypedNumeric)

// OR
TypedNumeric.prototype.or(TypedNumeric)

// XOR
TypedNumeric.prototype.xor(TypedNumeric)

// NOT
TypedNumeric.prototype.not(TypedNumeric)

// Logical left shift
TypedNumeric.prototype.logicalLeft(TypedNumeric)

// Logical right shift
TypedNumeric.prototype.logicalRight(TypedNumeric)

// Rotate left shift
TypedNumeric.prototype.rotateLeft(TypedNumeric)

// Rotate right shift
TypedNumeric.prototype.rotateRight(TypedNumeric)

// Create TypedNumeric from Uint8Array
// Uint8Array.length must be equal TypedNumeric byte length.
// e.g. OK: new Uint8Array(4) => Uint32, ERROR: new Uint8Array(3) => Uint32

// from big endian bytes
TypedNumeric.fromBeBytes(TypedNumeric)

// from little endian bytes
TypedNumeric.fromLeBytes(TypedNumeric)

// Create Uint8Array from TypedNumeric

// to big endian bytes
TypedNumeric.prototype.toBeBytes(TypedNumeric)

// to litle endian bytes
TypedNumeric.prototype.toLeBytes(TypedNumeric)
```
