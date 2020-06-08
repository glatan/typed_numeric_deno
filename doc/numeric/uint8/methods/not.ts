import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint8(0b1111);
assertEquals(a.not(), new Uint8(0b1111_0000));
assertEquals(new Uint8(0).not(), new Uint8(Uint8.max()));
