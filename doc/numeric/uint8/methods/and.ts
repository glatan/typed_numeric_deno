import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);
const b = new Uint8(0b1010);
assertEquals(a.and(b), new Uint8(0b1010));
assertEquals(a.and(new Uint8(0)), new Uint8(0));
