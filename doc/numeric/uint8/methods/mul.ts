import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(3);
const b = new Uint8(2);
assertEquals(a.mul(b), new Uint8(6));
assertEquals(a.mul(new Uint8(0)), new Uint8(0));
assertEquals(new Uint8(0).mul(new Uint8(1)), new Uint8(0));
