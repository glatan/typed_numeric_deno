declare -r MODULE_NAME='Uint8'

declare -A METHODS
declare -A STATIC_METHODS

METHODS[value]='
// Uint8Array.protptype.value(): number;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(new Uint8(100).value(), 100);
assertEquals(new Uint8(0xFF).value(), 255);
assertEquals(new Uint8(0x100).value(), 0);
assertEquals(new Uint8(0xFFFF).value(), 255);
'

METHODS[add]='
// Uint8Array.protptype.add(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(1);
const b = new Uint8(2);

assertEquals(a.add(b), new Uint8(3));
assertEquals(new Uint8(0xFF).add(new Uint8(1)), new Uint8(0));
'

METHODS[sub]='
// Uint8Array.protptype.sub(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(2);
const b = new Uint8(1);

assertEquals(a.sub(b), new Uint8(1));
assertEquals(new Uint8(0).sub(new Uint8(1)), new Uint8(0xFF));
'

METHODS[div]='
// Uint8Array.protptype.div(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(3);
const b = new Uint8(2);
const c = new Uint8(1);

assertEquals(a.div(b), new Uint8(1));
assertEquals(a.div(c), new Uint8(3));
assertEquals(new Uint8(0).div(new Uint8(1)), new Uint8(0));
assertEquals(new Uint8(0).div(new Uint8(0)), new Uint8(0));
'

METHODS[mul]='
// Uint8Array.protptype.mul(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(3);
const b = new Uint8(2);

assertEquals(a.mul(b), new Uint8(6));
assertEquals(a.mul(new Uint8(0)), new Uint8(0));
assertEquals(new Uint8(0).mul(new Uint8(1)), new Uint8(0));
'

METHODS[rem]='
// Uint8Array.protptype.rem(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(3);
const b = new Uint8(2);

assertEquals(a.rem(b), new Uint8(1));
assertEquals(a.rem(new Uint8(0)), new Uint8(0));
assertEquals(new Uint8(0).rem(new Uint8(1)), new Uint8(0));
'

METHODS[exp]='
// Uint8Array.protptype.exp(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(3);
const b = new Uint8(2);

assertEquals(a.exp(b), new Uint8(9));
assertEquals(a.exp(new Uint8(0)), new Uint8(1));
assertEquals(new Uint8(0).exp(new Uint8(1)), new Uint8(0));
'

METHODS[and]='
// Uint8Array.protptype.and(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);
const b = new Uint8(0b1010);

assertEquals(a.and(b), new Uint8(0b1010));
assertEquals(a.and(new Uint8(0)), new Uint8(0));
'

METHODS[or]='
// Uint8Array.protptype.or(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);
const b = new Uint8(0b1010);

assertEquals(a.or(b), new Uint8(0b1111));
assertEquals(a.or(new Uint8(0)), new Uint8(0b1111));
'

METHODS[xor]='
// Uint8Array.protptype.xor(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);
const b = new Uint8(0b1010);

assertEquals(a.xor(b), new Uint8(0b0101));
assertEquals(a.xor(new Uint8(0)), new Uint8(0b1111));
'

METHODS[not]='
// Uint8Array.protptype.not(value: Uint8): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);

assertEquals(a.not(), new Uint8(0b1111_0000));
assertEquals(new Uint8(0).not(), new Uint8(Uint8.max()));
'

METHODS[logicalLeft]='
// Uint8Array.protptype.logicalLeft(n: number): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);

assertEquals(a.logicalLeft(4), new Uint8(0b1111_0000));
assertEquals(a.logicalLeft(8), new Uint8(0));
'

METHODS[logicalRight]='
// Uint8Array.protptype.logicalRight(n: number): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111_0000);

assertEquals(a.logicalRight(4), new Uint8(0b1111));
assertEquals(a.logicalRight(8), new Uint8(0));
'

METHODS[rotateLeft]='
// Uint8Array.protptype.rotateLeft(n: number): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1100_0011);

assertEquals(a.rotateLeft(4), new Uint8(0b0011_1100));
assertEquals(a.rotateLeft(8), new Uint8(0b1100_0011));
'

METHODS[rotateRight]='
// Uint8Array.protptype.rotateRight(n: number): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1100_0011);

assertEquals(a.rotateRight(4), new Uint8(0b0011_1100));
assertEquals(a.rotateRight(8), new Uint8(0b1100_0011));
'

METHODS[toBeBytes]='
// Uint8Array.protptype.toBeBytes(): Uint8Vector;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1100_0011);

assertEquals(a.toBeBytes(), new Uint8Vector([0b1100_0011]));
'

METHODS[toLeBytes]='
// Uint8Array.protptype.toLeBytes(): Uint8Vector;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1100_0011);

assertEquals(a.toLeBytes(), new Uint8Vector([0b1100_0011]));
'

STATIC_METHODS[fromBeBytes]='
// Uint8Array.protptype.fromBeBytes(bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(Uint8.fromBeBytes([1]), new Uint8(1));
assertEquals(Uint8.fromBeBytes(Uint8Array.from([1])), new Uint8(1));
assertEquals(Uint8.fromBeBytes(Uint8Vector.from([1])), new Uint8(1));
assertEquals(Uint8.fromBeBytes([new Uint8(1)]), new Uint8(1));
'

STATIC_METHODS[fromLeBytes]='
// Uint8Array.protptype.fromLeBytes(bytes: Uint8Array | Uint8Vector | Array<Uint8> | Array<number>): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(Uint8.fromLeBytes([1]), new Uint8(1));
assertEquals(Uint8.fromLeBytes(Uint8Array.from([1])), new Uint8(1));
assertEquals(Uint8.fromLeBytes(Uint8Vector.from([1])), new Uint8(1));
assertEquals(Uint8.fromLeBytes([new Uint8(1)]), new Uint8(1));
'

STATIC_METHODS[max]='
// Uint8Array.protptype.max(): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(Uint8.max(), 255);
'

STATIC_METHODS[min]='
// Uint8Array.protptype.min(): Uint8;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(Uint8.min(), 0);
'

