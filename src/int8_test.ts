import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Int8 } from "./int8.ts";

Deno.test("Int8", () => {
  // value()
  assertEquals(new Int8(Number.MAX_SAFE_INTEGER).value(), 0x7F);
  assertEquals(new Int8(Number.MIN_SAFE_INTEGER).value(), -0x7F);
  assertEquals(new Int8(0).value(), 0);
  assertEquals(new Int8(-0).value(), 0);
  assertEquals(new Int8(0x80).value(), 0);
  assertEquals(new Int8(-0x80).value(), 0);
  assertEquals(new Int8(Infinity).value(), 0);
  assertEquals(new Int8(-Infinity).value(), 0);
  assertEquals(new Int8(NaN).value(), 0);
  assertEquals(new Int8(-NaN).value(), 0);
  // max()
  assertEquals(Int8.prototype.max(), 0x7F);
  // min()
  assertEquals(Int8.prototype.min(), -0x7F);
  // add()
  assertEquals(new Int8(1).add(new Int8(2)).value(), 3);
  assertEquals(new Int8(0x7F).add(new Int8(1)).value(), 0);
  assertEquals(new Int8(1).add(new Int8(-2)).value(), -1);
  assertEquals(new Int8(-1).add(new Int8(2)).value(), 1);
  assertEquals(new Int8(-1).add(new Int8(-2)).value(), -3);
  // sub()
  assertEquals(new Int8(3).sub(new Int8(2)).value(), 1);
  assertEquals(new Int8(0).sub(new Int8(1)).value(), -1);
  assertEquals(new Int8(1).sub(new Int8(-2)).value(), 3);
  assertEquals(new Int8(-2).sub(new Int8(1)).value(), -3);
  assertEquals(new Int8(-1).sub(new Int8(-2)).value(), 1);
  // div()
  assertEquals(new Int8(2).div(new Int8(3)).value(), 0);
  assertEquals(new Int8(3).div(new Int8(2)).value(), 1);
  assertEquals(new Int8(4).div(new Int8(-2)).value(), -2);
  assertEquals(new Int8(-4).div(new Int8(2)).value(), -2);
  assertEquals(new Int8(-4).div(new Int8(-2)).value(), 2);
  // mul()
  assertEquals(new Int8(1).mul(new Int8(2)).value(), 2);
  assertEquals(new Int8(1).mul(new Int8(0)).value(), 0);
  assertEquals(new Int8(1).mul(new Int8(-2)).value(), -2);
  assertEquals(new Int8(-1).mul(new Int8(2)).value(), -2);
  assertEquals(new Int8(-1).mul(new Int8(-2)).value(), 2);
  // rem()
  assertEquals(new Int8(2).rem(new Int8(3)).value(), 2);
  assertEquals(new Int8(3).rem(new Int8(2)).value(), 1);
  // exp()
  assertEquals(new Int8(2).exp(new Int8(3)).value(), 8);
  assertEquals(new Int8(0x7F).exp(new Int8(1)).value(), 0x7F);
  assertEquals(new Int8(0x7F).exp(new Int8(0)).value(), 1);
  assertEquals(new Int8(0x7F).exp(new Int8(0x7F)).value(), 0);
  // and()
  assertEquals(new Int8(0).and(new Int8(0)).value(), 0);
  assertEquals(new Int8(0x7F).and(new Int8(0)).value(), 0);
  assertEquals(new Int8(0x7F).and(new Int8(0x7F)).value(), 0x7F);
  assertEquals(new Int8(-0x7F).and(new Int8(0x7F)).value(), 0x7F);
  // or()
  assertEquals(new Int8(0).or(new Int8(0)).value(), 0);
  assertEquals(new Int8(0x7F).or(new Int8(0)).value(), 0x7F);
  assertEquals(new Int8(0x7F).or(new Int8(0x7F)).value(), 0x7F);
  // xor()
  assertEquals(new Int8(0).xor(new Int8(0)).value(), 0);
  assertEquals(new Int8(0x7F).xor(new Int8(0)).value(), 0x7F);
  assertEquals(new Int8(0x7F).xor(new Int8(0x7F)).value(), 0);
  // not()
  assertEquals(new Int8(0).not().value(), -1);
  assertEquals(new Int8(0x7F).not().value(), 0);
  // logicalLeft()
  assertEquals(new Int8(0x12).logicalLeft(0).value(), 0x12);
  assertEquals(new Int8(0x12).logicalLeft(2).value(), 0x48);
  assertEquals(new Int8(0x12).logicalLeft(4).value(), 0x20);
  assertEquals(new Int8(0x12).logicalLeft(8).value(), 0);
  assertEquals(new Int8(0x12).logicalLeft(16).value(), 0);
  assertEquals(new Int8(0x12).logicalLeft(32).value(), 0);
  assertEquals(new Int8(-0x12).logicalLeft(0).value(), -0x12);
  assertEquals(new Int8(-0x12).logicalLeft(4).value(), 0x20);
  assertEquals(new Int8(-0x12).logicalLeft(5).value(), 0x40);
  assertEquals(new Int8(-0x12).logicalLeft(8).value(), 0);
  assertEquals(new Int8(-0x12).logicalLeft(16).value(), 0);
  assertEquals(new Int8(-0x12).logicalLeft(32).value(), 0);
  assertEquals(new Int8(127).logicalLeft(1).value(), -126);
  assertEquals(new Int8(-127).logicalLeft(1).value(), -126);
  // logicalRight()
  assertEquals(new Int8(0x12).logicalRight(0).value(), 0x12);
  assertEquals(new Int8(0x12).logicalRight(2).value(), 0x04);
  assertEquals(new Int8(0x12).logicalRight(4).value(), 0x01);
  assertEquals(new Int8(0x12).logicalRight(8).value(), 0);
  assertEquals(new Int8(0x12).logicalRight(16).value(), 0);
  assertEquals(new Int8(0x12).logicalRight(32).value(), 0);
  assertEquals(new Int8(-0x12).logicalRight(0).value(), -0x12);
  assertEquals(new Int8(-0x12).logicalRight(4).value(), 0x09);
  assertEquals(new Int8(-0x12).logicalRight(7).value(), 1);
  assertEquals(new Int8(-0x12).logicalRight(8).value(), 0);
  assertEquals(new Int8(-0x12).logicalRight(16).value(), 0);
  assertEquals(new Int8(-0x12).logicalRight(32).value(), 0);
  assertEquals(new Int8(127).logicalRight(1).value(), 63);
  assertEquals(new Int8(-127).logicalRight(1).value(), 127);
  // rotateLeft()
  assertEquals(new Int8(0x12).rotateLeft(0).value(), 0x12);
  assertEquals(new Int8(0x12).rotateLeft(2).value(), 0x48);
  assertEquals(new Int8(0x12).rotateLeft(4).value(), 0x21);
  assertEquals(new Int8(0x12).rotateLeft(8).value(), 0x12);
  assertEquals(new Int8(0x12).rotateLeft(16).value(), 0x12);
  // rotateRight()
  assertEquals(new Int8(0x12).rotateRight(0).value(), 0x12);
  assertEquals(new Int8(0x12).rotateRight(2).value(), -0x04);
  assertEquals(new Int8(0x12).rotateRight(4).value(), 0x21);
  assertEquals(new Int8(0x12).rotateRight(8).value(), 0x12);
  assertEquals(new Int8(0x12).rotateRight(16).value(), 0x12);
  // fromBeBytes()
  assertEquals(
    Int8.prototype.fromBeBytes(Uint8Array.from([0x12])).value(),
    new Int8(0x12).value(),
  );
  assertEquals(
    Int8.prototype.fromBeBytes(new Uint8Array(1).fill(0x7F)).value(),
    Int8.prototype.max(),
  );
  assertEquals(
    Int8.prototype.fromBeBytes(new Uint8Array(1)).value(),
    0,
  );
  assertThrows((): void => {
    // Invalid Length
    Int8.prototype.fromBeBytes(new Uint8Array(2));
  });
  // fromLeBytes()
  assertEquals(
    Int8.prototype.fromLeBytes(Uint8Array.from([0x12])).value(),
    new Int8(0x12).value(),
  );
  assertEquals(
    Int8.prototype.fromLeBytes(new Uint8Array(1).fill(0x7F)).value(),
    Int8.prototype.max(),
  );
  assertEquals(
    Int8.prototype.fromLeBytes(new Uint8Array(1)).value(),
    0,
  );
  assertThrows((): void => {
    // Invalid Length
    Int8.prototype.fromLeBytes(new Uint8Array(2));
  });
  // toBeBytes()
  assertEquals(new Int8(0x12).toBeBytes(), new Uint8Array([0x12]));
  assertEquals(
    new Int8(Int8.prototype.max()).toBeBytes(),
    new Uint8Array(1).fill(0x7F),
  );
  assertEquals(new Int8(0).toBeBytes(), new Uint8Array(1));
  // toLeBytes()
  assertEquals(new Int8(0x12).toLeBytes(), new Uint8Array([0x12]));
  assertEquals(
    new Int8(Int8.prototype.max()).toLeBytes(),
    new Uint8Array(1).fill(0x7F),
  );
  assertEquals(new Int8(0).toLeBytes(), new Uint8Array(1));
});
