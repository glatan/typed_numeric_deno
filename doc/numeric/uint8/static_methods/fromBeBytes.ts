import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(Uint8.fromBeBytes([1]), new Uint8(1));
assertEquals(Uint8.fromBeBytes(Uint8Array.from([1])), new Uint8(1));
assertEquals(Uint8.fromBeBytes(Uint8Vector.from([1])), new Uint8(1));
assertEquals(Uint8.fromBeBytes([new Uint8(1)]), new Uint8(1));
