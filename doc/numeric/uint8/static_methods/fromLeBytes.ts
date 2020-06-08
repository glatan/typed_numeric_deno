import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(Uint8.fromLeBytes([1]), new Uint8(1));
assertEquals(Uint8.fromLeBytes(Uint8Array.from([1])), new Uint8(1));
assertEquals(Uint8.fromLeBytes(Uint8Vector.from([1])), new Uint8(1));
assertEquals(Uint8.fromLeBytes([new Uint8(1)]), new Uint8(1));
