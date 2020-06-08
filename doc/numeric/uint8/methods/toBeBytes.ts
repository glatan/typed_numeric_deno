import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";
import { Uint8Vector } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1100_0011);
assertEquals(a.toBeBytes(), new Uint8Vector([0b1100_0011]));
