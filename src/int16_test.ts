import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Int16 } from "./int16.ts";

Deno.test("Int16", () => {
  // value()
  assertEquals(new Int16(Number.MAX_SAFE_INTEGER).value(), 0x7FFF);
  assertEquals(new Int16(Number.MIN_SAFE_INTEGER).value(), -0x7FFF);
  assertEquals(new Int16(0).value(), 0);
  assertEquals(new Int16(-0).value(), 0);
  assertEquals(new Int16(0x8000).value(), 0);
  assertEquals(new Int16(-0x8000).value(), 0);
  assertEquals(new Int16(Infinity).value(), 0);
  assertEquals(new Int16(-Infinity).value(), 0);
  assertEquals(new Int16(NaN).value(), 0);
  assertEquals(new Int16(-NaN).value(), 0);
  // max()
  assertEquals(Int16.prototype.max(), 0x7FFF);
  // min()
  assertEquals(Int16.prototype.min(), -0x7FFF);
  // add()
  assertEquals(new Int16(1).add(new Int16(2)).value(), 3);
  assertEquals(new Int16(0x7FFF).add(new Int16(1)).value(), 0);
  assertEquals(new Int16(1).add(new Int16(-2)).value(), -1);
  assertEquals(new Int16(-1).add(new Int16(2)).value(), 1);
  assertEquals(new Int16(-1).add(new Int16(-2)).value(), -3);
  // sub()
  assertEquals(new Int16(3).sub(new Int16(2)).value(), 1);
  assertEquals(new Int16(0).sub(new Int16(1)).value(), -1);
  assertEquals(new Int16(1).sub(new Int16(-2)).value(), 3);
  assertEquals(new Int16(-2).sub(new Int16(1)).value(), -3);
  assertEquals(new Int16(-1).sub(new Int16(-2)).value(), 1);
  // div()
  assertEquals(new Int16(2).div(new Int16(3)).value(), 0);
  assertEquals(new Int16(3).div(new Int16(2)).value(), 1);
  assertEquals(new Int16(4).div(new Int16(-2)).value(), -2);
  assertEquals(new Int16(-4).div(new Int16(2)).value(), -2);
  assertEquals(new Int16(-4).div(new Int16(-2)).value(), 2);
  // mul()
  assertEquals(new Int16(1).mul(new Int16(2)).value(), 2);
  assertEquals(new Int16(1).mul(new Int16(0)).value(), 0);
  assertEquals(new Int16(1).mul(new Int16(-2)).value(), -2);
  assertEquals(new Int16(-1).mul(new Int16(2)).value(), -2);
  assertEquals(new Int16(-1).mul(new Int16(-2)).value(), 2);
  // rem()
  assertEquals(new Int16(2).rem(new Int16(3)).value(), 2);
  assertEquals(new Int16(3).rem(new Int16(2)).value(), 1);
  assertEquals(new Int16(12).rem(new Int16(-5)).value(), 2);
  assertEquals(new Int16(-12).rem(new Int16(5)).value(), -2);
  assertEquals(new Int16(-12).rem(new Int16(-5)).value(), -2);
  // exp()
  assertEquals(new Int16(2).exp(new Int16(3)).value(), 8);
  assertEquals(new Int16(0x7FFF).exp(new Int16(1)).value(), 0x7FFF);
  assertEquals(new Int16(0x7FFF).exp(new Int16(0)).value(), 1);
  assertEquals(new Int16(0x7FFF).exp(new Int16(0x7FFF)).value(), 0);
  // and()
  assertEquals(new Int16(0).and(new Int16(0)).value(), 0);
  assertEquals(new Int16(0x7FFF).and(new Int16(0)).value(), 0);
  assertEquals(new Int16(0x7FFF).and(new Int16(0x7FFF)).value(), 0x7FFF);
  // or()
  assertEquals(new Int16(0).or(new Int16(0)).value(), 0);
  assertEquals(new Int16(0x7FFF).or(new Int16(0)).value(), 0x7FFF);
  assertEquals(new Int16(0x7FFF).or(new Int16(0x7FFF)).value(), 0x7FFF);
  // xor()
  assertEquals(new Int16(0).xor(new Int16(0)).value(), 0);
  assertEquals(new Int16(0x7FFF).xor(new Int16(0)).value(), 0x7FFF);
  assertEquals(new Int16(0x7FFF).xor(new Int16(0x7FFF)).value(), 0);
  // not()
  assertEquals(new Int16(0).not().value(), -1);
  assertEquals(new Int16(0x7FFF).not().value(), 0);
  // logicalLeft()
  assertEquals(new Int16(0x1234).logicalLeft(0).value(), 0x1234);
  assertEquals(new Int16(0x1234).logicalLeft(4).value(), 0x2340);
  assertEquals(new Int16(0x1234).logicalLeft(8).value(), 0x3400);
  assertEquals(new Int16(0x1234).logicalLeft(16).value(), 0);
  assertEquals(new Int16(0x1234).logicalLeft(32).value(), 0);
  assertEquals(new Int16(0x1234).logicalLeft(64).value(), 0);
  assertEquals(new Int16(-0x1234).logicalLeft(0).value(), -0x1234);
  assertEquals(new Int16(-0x1234).logicalLeft(8).value(), 0x3400);
  assertEquals(new Int16(-0x1234).logicalLeft(9).value(), 0x6800);
  assertEquals(new Int16(-0x1234).logicalLeft(16).value(), 0);
  assertEquals(new Int16(-0x1234).logicalLeft(32).value(), 0);
  assertEquals(new Int16(-0x1234).logicalLeft(64).value(), 0);
  assertEquals(new Int16(0x7FFF).logicalLeft(1).value(), -0x7FFE);
  assertEquals(new Int16(-0x7FFF).logicalLeft(1).value(), -0x7FFE);
  // logicalRight()
  assertEquals(new Int16(0x1234).logicalRight(0).value(), 0x1234);
  assertEquals(new Int16(0x1234).logicalRight(4).value(), 0x123);
  assertEquals(new Int16(0x1234).logicalRight(8).value(), 0x12);
  assertEquals(new Int16(0x1234).logicalRight(16).value(), 0);
  assertEquals(new Int16(0x1234).logicalRight(32).value(), 0);
  assertEquals(new Int16(0x1234).logicalRight(64).value(), 0);
  assertEquals(new Int16(-0x1234).logicalRight(0).value(), -0x1234);
  assertEquals(new Int16(-0x1234).logicalRight(8).value(), 0x92);
  assertEquals(new Int16(-0x1234).logicalRight(9).value(), 0x49);
  assertEquals(new Int16(-0x1234).logicalRight(16).value(), 0);
  assertEquals(new Int16(-0x1234).logicalRight(32).value(), 0);
  assertEquals(new Int16(-0x1234).logicalRight(64).value(), 0);
  assertEquals(new Int16(0x7FFF).logicalRight(1).value(), 0x3FFF);
  assertEquals(new Int16(-0x7FFF).logicalRight(1).value(), 0x7FFF);
  // rotateLeft()
  assertEquals(new Int16(0x1234).rotateLeft(0).value(), 0x1234);
  assertEquals(new Int16(0x1234).rotateLeft(4).value(), 0x2341);
  assertEquals(new Int16(0x1234).rotateLeft(8).value(), 0x3412);
  assertEquals(new Int16(0x1234).rotateLeft(16).value(), 0x1234);
  assertEquals(new Int16(0x1234).rotateLeft(32).value(), 0x1234);
  assertEquals(new Int16(0x1234).rotateLeft(64).value(), 0x1234);
  // rotateRight()
  assertEquals(new Int16(0x1234).rotateRight(0).value(), 0x1234);
  assertEquals(new Int16(0x1234).rotateRight(4).value(), 0x4123);
  assertEquals(new Int16(0x1234).rotateRight(8).value(), 0x3412);
  assertEquals(new Int16(0x1234).rotateRight(16).value(), 0x1234);
  assertEquals(new Int16(0x1234).rotateRight(32).value(), 0x1234);
  assertEquals(new Int16(0x1234).rotateRight(64).value(), 0x1234);
  // fromBeBytes()
  assertEquals(
    Int16.prototype.fromBeBytes(Uint8Array.from([0x12, 0x34])).value(),
    new Int16(0x1234).value(),
  );
  assertEquals(
    Int16.prototype.fromBeBytes(new Uint8Array([0x7F, 0xFF])).value(),
    Int16.prototype.max(),
  );
  assertEquals(
    Int16.prototype.fromBeBytes(new Uint8Array(2)).value(),
    0,
  );
  assertThrows((): void => {
    // Invalid Length
    Int16.prototype.fromBeBytes(new Uint8Array(3));
  });
  // fromLeBytes()
  assertEquals(
    Int16.prototype.fromLeBytes(Uint8Array.from([0x12, 0x34])).value(),
    new Int16(0x3412).value(),
  );
  assertEquals(
    Int16.prototype.fromLeBytes(new Uint8Array([0xFF, 0x7F])).value(),
    Int16.prototype.max(),
  );
  assertEquals(
    Int16.prototype.fromLeBytes(new Uint8Array(2)).value(),
    0,
  );
  assertThrows((): void => {
    // Invalid Length
    Int16.prototype.fromLeBytes(new Uint8Array(3));
  });
  // toBeBytes()
  assertEquals(new Int16(0x1234).toBeBytes(), new Uint8Array([0x12, 0x34]));
  assertEquals(
    new Int16(Int16.prototype.max()).toBeBytes(),
    new Uint8Array([0x7F, 0xFF]),
  );
  assertEquals(new Int16(0).toBeBytes(), new Uint8Array(2));
  // toLeBytes()
  assertEquals(new Int16(0x1234).toLeBytes(), new Uint8Array([0x34, 0x12]));
  assertEquals(
    new Int16(Int16.prototype.max()).toLeBytes(),
    new Uint8Array([0xFF, 0x7F]),
  );
  assertEquals(new Int16(0).toLeBytes(), new Uint8Array(2));
});
