import { assertEquals, assertThrows } from "../depends.ts";

import { Uint8 } from "./uint8.ts";

Deno.test("Uint8", () => {
  // value()
  assertEquals(new Uint8(Number.MAX_SAFE_INTEGER).value(), Uint8.max());
  assertEquals(new Uint8(Number.MIN_SAFE_INTEGER).value(), 1);
  assertEquals(new Uint8(Uint8.max() + 1).value(), Uint8.min());
  assertEquals(new Uint8(Uint8.min()).value(), Uint8.min());
  assertEquals(new Uint8(Infinity).value(), Uint8.min());
  assertEquals(new Uint8(NaN).value(), Uint8.min());
  // max()
  assertEquals(Uint8.max(), 0xFF);
  // min()
  assertEquals(Uint8.min(), 0);
  // add()
  assertEquals(new Uint8(1).add(new Uint8(2)).value(), 3);
  assertEquals(new Uint8(Uint8.max()).add(new Uint8(1)).value(), Uint8.min());
  // sub()
  assertEquals(new Uint8(3).sub(new Uint8(2)).value(), 1);
  assertEquals(new Uint8(Uint8.min()).sub(new Uint8(1)).value(), Uint8.max());
  // div()
  assertEquals(new Uint8(2).div(new Uint8(3)).value(), Uint8.min());
  assertEquals(new Uint8(3).div(new Uint8(2)).value(), 1);
  // mul()
  assertEquals(new Uint8(1).mul(new Uint8(2)).value(), 2);
  assertEquals(new Uint8(1).mul(new Uint8(Uint8.min())).value(), Uint8.min());
  assertEquals(new Uint8(Uint8.max()).mul(new Uint8(Uint8.max())).value(), 1);
  // rem()
  assertEquals(new Uint8(2).rem(new Uint8(3)).value(), 2);
  assertEquals(new Uint8(3).rem(new Uint8(2)).value(), 1);
  // exp()
  assertEquals(new Uint8(2).exp(new Uint8(3)).value(), 8);
  assertEquals(new Uint8(Uint8.max()).exp(new Uint8(1)).value(), Uint8.max());
  assertEquals(new Uint8(Uint8.max()).exp(new Uint8(Uint8.min())).value(), 1);
  assertEquals(
    new Uint8(Uint8.max()).exp(new Uint8(Uint8.max())).value(),
    Uint8.min(),
  );
  // and()
  assertEquals(
    new Uint8(Uint8.min()).and(new Uint8(Uint8.min())).value(),
    Uint8.min(),
  );
  assertEquals(
    new Uint8(Uint8.max()).and(new Uint8(Uint8.min())).value(),
    Uint8.min(),
  );
  assertEquals(
    new Uint8(Uint8.max()).and(new Uint8(Uint8.max())).value(),
    Uint8.max(),
  );
  // or()
  assertEquals(
    new Uint8(Uint8.min()).or(new Uint8(Uint8.min())).value(),
    Uint8.min(),
  );
  assertEquals(
    new Uint8(Uint8.max()).or(new Uint8(Uint8.min())).value(),
    Uint8.max(),
  );
  assertEquals(
    new Uint8(Uint8.max()).or(new Uint8(Uint8.max())).value(),
    Uint8.max(),
  );
  // xor()
  assertEquals(
    new Uint8(Uint8.min()).xor(new Uint8(Uint8.min())).value(),
    Uint8.min(),
  );
  assertEquals(
    new Uint8(Uint8.max()).xor(new Uint8(Uint8.min())).value(),
    Uint8.max(),
  );
  assertEquals(
    new Uint8(Uint8.max()).xor(new Uint8(Uint8.max())).value(),
    Uint8.min(),
  );
  // not()
  assertEquals(new Uint8(Uint8.min()).not().value(), Uint8.max());
  assertEquals(new Uint8(Uint8.max()).not().value(), Uint8.min());
  // logicalLeft()
  assertEquals(new Uint8(0x12).logicalLeft(0).value(), 0x12);
  assertEquals(new Uint8(0x12).logicalLeft(4).value(), 0x20);
  assertEquals(new Uint8(0x12).logicalLeft(8).value(), Uint8.min());
  assertEquals(new Uint8(0x12).logicalLeft(16).value(), Uint8.min());
  assertEquals(new Uint8(0x12).logicalLeft(32).value(), Uint8.min());
  // logicalRight()
  assertEquals(new Uint8(0x12).logicalRight(0).value(), 0x12);
  assertEquals(new Uint8(0x12).logicalRight(4).value(), 0x01);
  assertEquals(new Uint8(0x12).logicalRight(8).value(), Uint8.min());
  assertEquals(new Uint8(0x12).logicalRight(16).value(), Uint8.min());
  assertEquals(new Uint8(0x12).logicalRight(32).value(), Uint8.min());
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
    Uint8.fromBeBytes(Uint8Array.from([0x12])).value(),
    new Uint8(0x12).value(),
  );
  assertEquals(
    Uint8.fromBeBytes(new Uint8Array(1).fill(Uint8.max())).value(),
    Uint8.max(),
  );
  assertEquals(Uint8.fromBeBytes(new Uint8Array(1)).value(), Uint8.min());
  assertThrows((): void => {
    // Invalid Length
    Uint8.fromBeBytes(new Uint8Array(2));
  });
  // fromLeBytes()
  assertEquals(
    Uint8.fromLeBytes(Uint8Array.from([0x12])).value(),
    new Uint8(0x12).value(),
  );
  assertEquals(
    Uint8.fromLeBytes(new Uint8Array(1).fill(Uint8.max())).value(),
    Uint8.max(),
  );
  assertEquals(Uint8.fromLeBytes(new Uint8Array(1)).value(), Uint8.min());
  assertThrows((): void => {
    // Invalid Length
    Uint8.fromLeBytes(new Uint8Array(2));
  });
  // toBeBytes()
  assertEquals(new Uint8(0x12).toBeBytes(), new Uint8Array([0x12]));
  assertEquals(
    new Uint8(Uint8.max()).toBeBytes(),
    new Uint8Array(1).fill(Uint8.max()),
  );
  assertEquals(new Uint8(Uint8.min()).toBeBytes(), new Uint8Array(1));
  // toLeBytes()
  assertEquals(new Uint8(0x12).toLeBytes(), new Uint8Array([0x12]));
  assertEquals(
    new Uint8(Uint8.max()).toLeBytes(),
    new Uint8Array(1).fill(Uint8.max()),
  );
  assertEquals(new Uint8(Uint8.min()).toLeBytes(), new Uint8Array(1));
});
