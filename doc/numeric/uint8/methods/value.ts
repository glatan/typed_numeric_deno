import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Uint8 } from "https://deno.land/x/typed_numeric/mod.ts";

assertEquals(new Uint8(100).value(), 100);
assertEquals(new Uint8(0xFF).value(), 255);
assertEquals(new Uint8(0x100).value(), 0);
assertEquals(new Uint8(0xFFFF).value(), 255);
