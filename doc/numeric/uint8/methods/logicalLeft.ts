import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);
assertEquals(a.logicalLeft(4), new Uint8(0b1111_0000));
assertEquals(a.logicalLeft(8), new Uint8(0));
