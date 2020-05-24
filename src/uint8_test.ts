import { assertEquals } from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint8 } from "./uint8.ts";

Deno.test("Uint8", () => {
  // value()
  assertEquals(new Uint8(Number.MAX_SAFE_INTEGER).value(), 0xFF);
  assertEquals(new Uint8(Number.MIN_SAFE_INTEGER).value(), 0x01);
  assertEquals(new Uint8(0x100).value(), 0);
  assertEquals(new Uint8(0).value(), 0);
  assertEquals(new Uint8(-1).value(), 0xFF);
  assertEquals(new Uint8(Infinity).value(), 0);
  assertEquals(new Uint8(NaN).value(), 0);
  // max()
  assertEquals(Uint8.prototype.max(), 0xFF);
  // min()
  assertEquals(Uint8.prototype.min(), 0);
  // add()
  assertEquals(new Uint8(1).add(new Uint8(2)).value(), 3);
  assertEquals(new Uint8(0xFF).add(new Uint8(1)).value(), 0);
  // sub()
  assertEquals(new Uint8(3).sub(new Uint8(2)).value(), 1);
  assertEquals(new Uint8(0).sub(new Uint8(1)).value(), 0xFF);
  // div()
  assertEquals(new Uint8(2).div(new Uint8(3)).value(), 0);
  assertEquals(new Uint8(3).div(new Uint8(2)).value(), 1);
  // mul()
  assertEquals(new Uint8(1).mul(new Uint8(2)).value(), 2);
  assertEquals(new Uint8(1).mul(new Uint8(0)).value(), 0);
  assertEquals(new Uint8(0xFF).mul(new Uint8(0xFF)).value(), 1);
  // rem()
  assertEquals(new Uint8(2).rem(new Uint8(3)).value(), 2);
  assertEquals(new Uint8(3).rem(new Uint8(2)).value(), 1);
  // exp()
  assertEquals(new Uint8(2).exp(new Uint8(3)).value(), 8);
  assertEquals(new Uint8(0xFF).exp(new Uint8(1)).value(), 0xFF);
  assertEquals(new Uint8(0xFF).exp(new Uint8(0)).value(), 1);
  assertEquals(new Uint8(0xFF).exp(new Uint8(0xFF)).value(), 0);
  // and()
  assertEquals(new Uint8(0).and(new Uint8(0)).value(), 0);
  assertEquals(new Uint8(0xFF).and(new Uint8(0)).value(), 0);
  assertEquals(new Uint8(0xFF).and(new Uint8(0xFF)).value(), 0xFF);
  // or()
  assertEquals(new Uint8(0).or(new Uint8(0)).value(), 0);
  assertEquals(new Uint8(0xFF).or(new Uint8(0)).value(), 0xFF);
  assertEquals(new Uint8(0xFF).or(new Uint8(0xFF)).value(), 0xFF);
  // xor()
  assertEquals(new Uint8(0).xor(new Uint8(0)).value(), 0);
  assertEquals(new Uint8(0xFF).xor(new Uint8(0)).value(), 0xFF);
  assertEquals(new Uint8(0xFF).xor(new Uint8(0xFF)).value(), 0);
  // not()
  assertEquals(new Uint8(0).not().value(), 0xFF);
  assertEquals(new Uint8(0xFF).not().value(), 0);
  // logicalLeft()
  assertEquals(new Uint8(0x12).logicalLeft(0).value(), 0x12);
  assertEquals(new Uint8(0x12).logicalLeft(4).value(), 0x20);
  assertEquals(new Uint8(0x12).logicalLeft(8).value(), 0);
  assertEquals(new Uint8(0x12).logicalLeft(16).value(), 0);
  assertEquals(new Uint8(0x12).logicalLeft(32).value(), 0);
  // logicalRight()
  assertEquals(new Uint8(0x12).logicalRight(0).value(), 0x12);
  assertEquals(new Uint8(0x12).logicalRight(4).value(), 0x01);
  assertEquals(new Uint8(0x12).logicalRight(8).value(), 0);
  assertEquals(new Uint8(0x12).logicalRight(16).value(), 0);
  assertEquals(new Uint8(0x12).logicalRight(32).value(), 0);
  // rotateLeft()
  assertEquals(new Uint8(0x12).rotateLeft(0).value(), 0x12);
  assertEquals(new Uint8(0x12).rotateLeft(4).value(), 0x21);
  assertEquals(new Uint8(0x12).rotateLeft(8).value(), 0x12);
  assertEquals(new Uint8(0x12).rotateLeft(16).value(), 0x12);
  // rotateRight()
  assertEquals(new Uint8(0x12).rotateRight(0).value(), 0x12);
  assertEquals(new Uint8(0x12).rotateRight(4).value(), 0x21);
  assertEquals(new Uint8(0x12).rotateRight(8).value(), 0x12);
  assertEquals(new Uint8(0x12).rotateRight(16).value(), 0x12);
  // fromBeBytes()
  assertEquals(
    Uint8.prototype.fromBeBytes(Uint8Array.from([0x12])).value(),
    new Uint8(0x12).value(),
  );
  assertEquals(
    Uint8.prototype.fromBeBytes(new Uint8Array(1).fill(0xFF)).value(),
    Uint8.prototype.max(),
  );
  assertEquals(
    Uint8.prototype.fromBeBytes(new Uint8Array(1)).value(),
    Uint8.prototype.min(),
  );
  // fromLeBytes()
  assertEquals(
    Uint8.prototype.fromLeBytes(Uint8Array.from([0x12])).value(),
    new Uint8(0x12).value(),
  );
  assertEquals(
    Uint8.prototype.fromLeBytes(new Uint8Array(1).fill(0xFF)).value(),
    Uint8.prototype.max(),
  );
  assertEquals(
    Uint8.prototype.fromLeBytes(new Uint8Array(1)).value(),
    Uint8.prototype.min(),
  );
  // toBeBytes()
  assertEquals(new Uint8(0x12).toBeBytes(), new Uint8Array([0x12]));
  assertEquals(
    new Uint8(Uint8.prototype.max()).toBeBytes(),
    new Uint8Array(1).fill(0xFF),
  );
  assertEquals(new Uint8(Uint8.prototype.min()).toBeBytes(), new Uint8Array(1));
  // toLeBytes()
  assertEquals(new Uint8(0x12).toLeBytes(), new Uint8Array([0x12]));
  assertEquals(
    new Uint8(Uint8.prototype.max()).toLeBytes(),
    new Uint8Array(1).fill(0xFF),
  );
  assertEquals(new Uint8(Uint8.prototype.min()).toLeBytes(), new Uint8Array(1));
});
