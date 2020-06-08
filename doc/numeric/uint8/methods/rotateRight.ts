import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1100_0011);
assertEquals(a.rotateRight(4), new Uint8(0b0011_1100));
assertEquals(a.rotateRight(8), new Uint8(0b1100_0011));
