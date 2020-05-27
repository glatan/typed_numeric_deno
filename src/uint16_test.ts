import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint16 } from "./uint16.ts";

Deno.test("Uint16", () => {
  // value()
  assertEquals(new Uint16(Number.MAX_SAFE_INTEGER).value(), Uint16.max());
  assertEquals(new Uint16(Number.MIN_SAFE_INTEGER).value(), 1);
  assertEquals(new Uint16(Uint16.max() + 1).value(), Uint16.min());
  assertEquals(new Uint16(Uint16.min()).value(), Uint16.min());
  assertEquals(new Uint16(Infinity).value(), Uint16.min());
  assertEquals(new Uint16(NaN).value(), Uint16.min());
  // max()
  assertEquals(Uint16.max(), 0xFFFF);
  // min()
  assertEquals(Uint16.min(), 0);
  // add()
  assertEquals(new Uint16(1).add(new Uint16(2)).value(), 3);
  assertEquals(
    new Uint16(Uint16.max()).add(new Uint16(1)).value(),
    Uint16.min(),
  );
  // sub()
  assertEquals(new Uint16(3).sub(new Uint16(2)).value(), 1);
  assertEquals(
    new Uint16(Uint16.min()).sub(new Uint16(1)).value(),
    Uint16.max(),
  );
  // div()
  assertEquals(new Uint16(2).div(new Uint16(3)).value(), Uint16.min());
  assertEquals(new Uint16(3).div(new Uint16(2)).value(), 1);
  // mul()
  assertEquals(new Uint16(1).mul(new Uint16(2)).value(), 2);
  assertEquals(
    new Uint16(1).mul(new Uint16(Uint16.min())).value(),
    Uint16.min(),
  );
  assertEquals(
    new Uint16(Uint16.max()).mul(new Uint16(Uint16.max())).value(),
    1,
  );
  // rem()
  assertEquals(new Uint16(2).rem(new Uint16(3)).value(), 2);
  assertEquals(new Uint16(3).rem(new Uint16(2)).value(), 1);
  // exp()
  assertEquals(new Uint16(2).exp(new Uint16(3)).value(), 8);
  assertEquals(
    new Uint16(Uint16.max()).exp(new Uint16(1)).value(),
    Uint16.max(),
  );
  assertEquals(
    new Uint16(Uint16.max()).exp(new Uint16(Uint16.min())).value(),
    1,
  );
  assertEquals(
    new Uint16(Uint16.max()).exp(new Uint16(Uint16.max())).value(),
    Uint16.min(),
  );
  // and()
  assertEquals(
    new Uint16(Uint16.min()).and(new Uint16(Uint16.min())).value(),
    Uint16.min(),
  );
  assertEquals(
    new Uint16(Uint16.max()).and(new Uint16(Uint16.min())).value(),
    Uint16.min(),
  );
  assertEquals(
    new Uint16(Uint16.max()).and(new Uint16(Uint16.max())).value(),
    Uint16.max(),
  );
  // or()
  assertEquals(
    new Uint16(Uint16.min()).or(new Uint16(Uint16.min())).value(),
    Uint16.min(),
  );
  assertEquals(
    new Uint16(Uint16.max()).or(new Uint16(Uint16.min())).value(),
    Uint16.max(),
  );
  assertEquals(
    new Uint16(Uint16.max()).or(new Uint16(Uint16.max())).value(),
    Uint16.max(),
  );
  // xor()
  assertEquals(
    new Uint16(Uint16.min()).xor(new Uint16(Uint16.min())).value(),
    Uint16.min(),
  );
  assertEquals(
    new Uint16(Uint16.max()).xor(new Uint16(Uint16.min())).value(),
    Uint16.max(),
  );
  assertEquals(
    new Uint16(Uint16.max()).xor(new Uint16(Uint16.max())).value(),
    Uint16.min(),
  );
  // not()
  assertEquals(new Uint16(Uint16.min()).not().value(), Uint16.max());
  assertEquals(new Uint16(Uint16.max()).not().value(), Uint16.min());
  // logicalLeft()
  assertEquals(new Uint16(0x1234).logicalLeft(0).value(), 0x1234);
  assertEquals(new Uint16(0x1234).logicalLeft(8).value(), 0x3400);
  assertEquals(new Uint16(0x1234).logicalLeft(16).value(), Uint16.min());
  assertEquals(new Uint16(0x1234).logicalLeft(32).value(), Uint16.min());
  assertEquals(new Uint16(0x1234).logicalLeft(64).value(), Uint16.min());
  // logicalRight()
  assertEquals(new Uint16(0x1234).logicalRight(0).value(), 0x1234);
  assertEquals(new Uint16(0x1234).logicalRight(8).value(), 0x0012);
  assertEquals(new Uint16(0x1234).logicalRight(16).value(), Uint16.min());
  assertEquals(new Uint16(0x1234).logicalRight(32).value(), Uint16.min());
  assertEquals(new Uint16(0x1234).logicalRight(64).value(), Uint16.min());
  // rotateLeft()
  assertEquals(new Uint16(0x1234).rotateLeft(0).value(), 0x1234);
  assertEquals(new Uint16(0x1234).rotateLeft(8).value(), 0x3412);
  assertEquals(new Uint16(0x1234).rotateLeft(16).value(), 0x1234);
  assertEquals(new Uint16(0x1234).rotateLeft(32).value(), 0x1234);
  // rotateRight()
  assertEquals(new Uint16(0x1234).rotateRight(0).value(), 0x1234);
  assertEquals(new Uint16(0x1234).rotateRight(8).value(), 0x3412);
  assertEquals(new Uint16(0x1234).rotateRight(16).value(), 0x1234);
  assertEquals(new Uint16(0x1234).rotateRight(32).value(), 0x1234);
  // fromBeBytes()
  assertEquals(
    Uint16.fromBeBytes(Uint8Array.from([0x12, 0x34])).value(),
    new Uint16(0x1234).value(),
  );
  assertEquals(
    Uint16.fromBeBytes(new Uint8Array(2).fill(0xFF)).value(),
    Uint16.max(),
  );
  assertEquals(Uint16.fromBeBytes(new Uint8Array(2)).value(), Uint16.min());
  assertThrows((): void => {
    // Invalid Length
    Uint16.fromBeBytes(new Uint8Array(3));
  });
  // fromLeBytes()
  assertEquals(
    Uint16.fromLeBytes(Uint8Array.from([0x12, 0x34])).value(),
    new Uint16(0x3412).value(),
  );
  assertEquals(
    Uint16.fromLeBytes(new Uint8Array(2).fill(0xFF)).value(),
    Uint16.max(),
  );
  assertEquals(Uint16.fromLeBytes(new Uint8Array(2)).value(), Uint16.min());
  assertThrows((): void => {
    // Invalid Length
    Uint16.fromLeBytes(new Uint8Array(3));
  });
  // toBeBytes()
  assertEquals(new Uint16(0x1234).toBeBytes(), new Uint8Array([0x12, 0x34]));
  assertEquals(
    new Uint16(Uint16.max()).toBeBytes(),
    new Uint8Array(2).fill(0xFF),
  );
  assertEquals(new Uint16(Uint16.min()).toBeBytes(), new Uint8Array(2));
  // toLeBytes()
  assertEquals(new Uint16(0x1234).toLeBytes(), new Uint8Array([0x34, 0x12]));
  assertEquals(
    new Uint16(Uint16.max()).toLeBytes(),
    new Uint8Array(2).fill(0xFF),
  );
  assertEquals(new Uint16(Uint16.min()).toLeBytes(), new Uint8Array(2));
});
