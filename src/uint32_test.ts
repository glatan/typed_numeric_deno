import { assertEquals } from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint32 } from "./uint32.ts";

Deno.test("Uint32", () => {
  // value()
  assertEquals(new Uint32(Number.MAX_SAFE_INTEGER).value(), 0xFFFF_FFFF);
  assertEquals(new Uint32(Number.MIN_SAFE_INTEGER).value(), 0x01);
  assertEquals(new Uint32(0x1_0000_0000).value(), 0);
  assertEquals(new Uint32(0).value(), 0);
  assertEquals(new Uint32(-1).value(), 0xFFFF_FFFF);
  assertEquals(new Uint32(Infinity).value(), 0);
  assertEquals(new Uint32(NaN).value(), 0);
  // max()
  assertEquals(Uint32.prototype.max(), 0xFFFF_FFFF);
  // min()
  assertEquals(Uint32.prototype.min(), 0);
  // add()
  assertEquals(new Uint32(1).add(new Uint32(2)).value(), 3);
  assertEquals(new Uint32(0xFFFF_FFFF).add(new Uint32(1)).value(), 0);
  // sub()
  assertEquals(new Uint32(3).sub(new Uint32(2)).value(), 1);
  assertEquals(new Uint32(0).sub(new Uint32(1)).value(), 0xFFFF_FFFF);
  // div()
  assertEquals(new Uint32(2).div(new Uint32(3)).value(), 0);
  assertEquals(new Uint32(3).div(new Uint32(2)).value(), 1);
  // mul()
  assertEquals(new Uint32(1).mul(new Uint32(2)).value(), 2);
  assertEquals(new Uint32(1).mul(new Uint32(0)).value(), 0);
  assertEquals(
    new Uint32(0xFFFF_FFFF).mul(new Uint32(0xFFFF_FFFF)).value(),
    0,
  );
  // rem()
  assertEquals(new Uint32(2).rem(new Uint32(3)).value(), 2);
  assertEquals(new Uint32(3).rem(new Uint32(2)).value(), 1);
  // exp()
  assertEquals(new Uint32(2).exp(new Uint32(3)).value(), 8);
  assertEquals(
    new Uint32(0xFFFF_FFFF).exp(new Uint32(1)).value(),
    0xFFFF_FFFF,
  );
  assertEquals(new Uint32(0xFFFF_FFFF).exp(new Uint32(0)).value(), 1);
  assertEquals(
    new Uint32(0xFFFF_FFFF).exp(new Uint32(0xFFFF_FFFF)).value(),
    0,
  );
  // and()
  assertEquals(new Uint32(0).and(new Uint32(0)).value(), 0);
  assertEquals(new Uint32(0xFFFF_FFFF).and(new Uint32(0)).value(), 0);
  assertEquals(
    new Uint32(0xFFFF_FFFF).and(new Uint32(0xFFFF_FFFF)).value(),
    0xFFFF_FFFF,
  );
  // or()
  assertEquals(new Uint32(0).or(new Uint32(0)).value(), 0);
  assertEquals(new Uint32(0xFFFF_FFFF).or(new Uint32(0)).value(), 0xFFFF_FFFF);
  assertEquals(
    new Uint32(0xFFFF_FFFF).or(new Uint32(0xFFFF_FFFF)).value(),
    0xFFFF_FFFF,
  );
  // xor()
  assertEquals(new Uint32(0).xor(new Uint32(0)).value(), 0);
  assertEquals(
    new Uint32(0xFFFF_FFFF).xor(new Uint32(0)).value(),
    0xFFFF_FFFF,
  );
  assertEquals(
    new Uint32(0xFFFF_FFFF).xor(new Uint32(0xFFFF_FFFF)).value(),
    0,
  );
  // not()
  assertEquals(new Uint32(0).not().value(), 0xFFFF_FFFF);
  assertEquals(new Uint32(0xFFFF_FFFF).not().value(), 0);
  // logicalLeft()
  assertEquals(new Uint32(0x1234_5678).logicalLeft(0).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).logicalLeft(16).value(), 0x5678_0000);
  // assertEquals(new Uint32(0x1234_5678).logicalLeft(32).value(), 0);
  assertEquals(new Uint32(0x1234_5678).logicalLeft(64).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).logicalLeft(128).value(), 0x1234_5678);
  // logicalRight()
  assertEquals(new Uint32(0x1234_5678).logicalRight(0).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).logicalRight(16).value(), 0x0000_1234);
  // assertEquals(new Uint32(0x1234_5678).logicalRight(32).value(), 0);
  assertEquals(new Uint32(0x1234_5678).logicalRight(64).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).logicalRight(128).value(), 0x1234_5678);
  // rotateLeft()
  assertEquals(new Uint32(0x1234_5678).rotateLeft(0).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).rotateLeft(16).value(), 0x5678_1234);
  assertEquals(new Uint32(0x1234_5678).rotateLeft(32).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).rotateLeft(64).value(), 0x1234_5678);
  // rotateRight()
  assertEquals(new Uint32(0x1234_5678).rotateRight(0).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).rotateRight(16).value(), 0x5678_1234);
  assertEquals(new Uint32(0x1234_5678).rotateRight(32).value(), 0x1234_5678);
  assertEquals(new Uint32(0x1234_5678).rotateRight(64).value(), 0x1234_5678);
  // toBeBytes()
  assertEquals(
    new Uint32(0x1234_5678).toBeBytes(),
    new Uint8Array([0x12, 0x34, 0x56, 0x78]),
  );
  assertEquals(new Uint32(0).toBeBytes(), new Uint8Array([0, 0, 0, 0]));
  // toLeBytes()
  assertEquals(
    new Uint32(0x1234_5678).toLeBytes(),
    new Uint8Array([0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(new Uint32(0).toBeBytes(), new Uint8Array([0, 0, 0, 0]));
});
