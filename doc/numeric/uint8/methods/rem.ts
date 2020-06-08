import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(3);
const b = new Uint8(2);
assertEquals(a.rem(b), new Uint8(1));
assertEquals(a.rem(new Uint8(0)), new Uint8(0));
assertEquals(new Uint8(0).rem(new Uint8(1)), new Uint8(0));
