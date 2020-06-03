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

### TypedNumeric

Int8, Int16, Uint8 and Uint16 are wrapper of number.
Int32, Int64, Int128, Int256, Uint32, Uint64, Uint128 and Uint256 are wrapper of bigint.

```ts
type TypedNumeric = Int8 | Int16 | Int32 | Int64 |Int128 | Int256 | Uint8 | Uint16 | Uint32 | Uint64 | Uint128 | Uint256;
```

### Constructor

```ts
// Create new TypedNumeric
// Int8, Int16, Uint8, Uint16: number
// Int32, Int64, Int128, Int256, Uint32, Uint64, Uint128, Uint256: bigint
// e.g. new Uint8(10), Uint32(10n)
new TypedNumeric(value: number | bigint = 0 | 0n);
```

#### Methods

```ts
// Get value
TypedNumeric.prototype.value(): number | bigint;
// Addition
TypedNumeric.prototype.add(value: TypedNumeric): TypedNumeric;
// Subtraction
TypedNumeric.prototype.sub(value: TypedNumeric): TypedNumeric;
// Division
TypedNumeric.prototype.div(value: TypedNumeric): TypedNumeric;
// Multiplication
TypedNumeric.prototype.mul(value: TypedNumeric): TypedNumeric;
// Remainder
TypedNumeric.prototype.rem(value: TypedNumeric): TypedNumeric;
// Exponentiation
TypedNumeric.prototype.exp(value: TypedNumeric >= 0): TypedNumeric;
// AND
TypedNumeric.prototype.and(value: TypedNumeric): TypedNumeric;
// OR
TypedNumeric.prototype.or(value: TypedNumeric): TypedNumeric;
// XOR
TypedNumeric.prototype.xor(value: TypedNumeric): TypedNumeric;
// NOT
TypedNumeric.prototype.not(value: TypedNumeric): TypedNumeric;
// Logical left shift
TypedNumeric.prototype.logicalLeft(n: TypedNumeric): TypedNumeric;
// Logical right shift
TypedNumeric.prototype.logicalRight(n: TypedNumeric): TypedNumeric;
// Rotate left shift
TypedNumeric.prototype.rotateLeft(n: TypedNumeric): TypedNumeric;
// Rotate right shift
TypedNumeric.prototype.rotateRight(n: TypedNumeric): TypedNumeric;

// Create Uint8Array from TypedNumeric
// to big endian bytes
TypedNumeric.prototype.toBeBytes(): Uint8Array;
// to litle endian bytes
TypedNumeric.prototype.toLeBytes(): Uint8Array;
```

#### Static Methods

```ts
// Get max value
TypedNumeric.max(): number | bigint;
// Get min value
TypedNumeric.min(): number | bigint;

// Create TypedNumeric from Uint8Array
// Uint8Array.length must be equal TypedNumeric byte length.
// e.g. OK: new Uint8Array(4) => Uint32, ERROR: new Uint8Array(3) => Uint32
// from big endian bytes
TypedNumeric.fromBeBytes(Uint8Array): TypedNumeric;
// from little endian bytes
TypedNumeric.fromLeBytes(Uint8Array): TypedNumeric;
```

### TypedVector

TypedVector is wrapper of Array<TypedNumeric>.
This type provide conversion between TypedArray.

```ts
type TypedVector = Int8Vector | Int16Vector | Int32Vector | Int64Vector | Uint8Vector | Uint16Vector | Uint32Vector | Uint64Vector;
```

#### Constructor

```ts
// number: Array Length
// e.g. new Uint8Vector(10).length; 
///  10
// Array<TypedNumeric>: convert Array<TypedNumeric> to TypedVector
// e.g. new Uint8Vector(Array.from([new Uint8(0xFF)])); 
///  Uint8Vector { length: 1, inner { Uint8 {/* value: 0xFF */} } }
new TypedVector(arg: number | Array<TypedNumeric> = 0);
```

#### Methods

```ts
// Array.prototype like
// concat
TypedVector.prototype.concat(other: TypedVector): TypedVector;
// copyWithin
TypedVector.prototype.copyWithin(target: number, start: number, end: number): TypedVector;
// fill
// e.g. Uint8Vector.prototype.fill(value: Uint8): Uint8Vector
TypedVector.prototype.fill(target: TypedNumeric | number 
 bigint, start: number = 0, end: number = 0): TypedVector;
// pop
TypedVector.prototype.pop(): TypedNumeric;
// push
TypedVector.prototype.push(value: TypedNumeric);
// reverse
TypedVector.prototype.reverse(): TypedVector;
// slice
TypedVector.prototype.slice(start: number, end: number): TypedVector;

// Array[index]
TypedVector.prototype.value_by_index(index: number): TypedNumeric;
// compare
TypedVector.prototype.equals(other: TypedVector): boolean;
// toTypedArray
// e.g. Uint8Vector.prototype.toTypedArray(): Uint8Array
TypedVector.prototype.toTypedArray(): TypedArray;

// Only for Uint8Vector
// Create hex string.
// toBeBytesLowerHex
Uint8Vector.prototype.toBeBytesLowerHex(): string;
// toLeBytesLowerHex
Uint8Vector.prototype.toLeBytesLowerHex(): string;
// toBeBytesUpperHex
Uint8Vector.prototype.toBeBytesUpperHex(): string;
// toLeBytesUpperHex
Uint8Vector.prototype.toLeBytesUpperHex(): string;
```

#### Static Methods

```ts
// from
// e.g. Uint8Vector.from(array: Uint8Array | Array<Uint8> | Array<number>): Uint8Vector;
// e.g. Uint64Vector.from(array: Uint64Array | Array<Uint64> | Array<bigint>): Uint64Vector;
TypedVector.from(array: TypedArray | Array<TypedNumeric> | Array<number | bigint>): TypedVector;

// of
TypedVector.of(elementN: Array<TypedNumeric> | Array<number | bigint>): TypedVector;
```
