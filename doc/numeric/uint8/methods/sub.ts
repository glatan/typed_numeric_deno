import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(2);
const b = new Uint8(1);
assertEquals(a.sub(b), new Uint8(1));
assertEquals(new Uint8(0).sub(new Uint8(1)), new Uint8(0xFF));
