import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint64 } from "./uint64.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

Deno.test("Uint64", () => {
  // constructor
  assertEquals(new Uint64().value(), 0n);
  // value()
  assertEquals(new Uint64(Uint64.max() + 1n).value(), Uint64.min());
  assertEquals(new Uint64(Uint64.min() - 1n).value(), Uint64.max());
  // max()
  assertEquals(Uint64.max(), 0xFFFFFFFF_FFFFFFFFn);
  // min()
  assertEquals(Uint64.min(), 0n);
  // add()
  assertEquals(new Uint64(1n).add(new Uint64(2n)).value(), 3n);
  assertEquals(
    new Uint64(Uint64.max()).add(new Uint64(1n)).value(),
    Uint64.min(),
  );
  // sub()
  assertEquals(new Uint64(3n).sub(new Uint64(2n)).value(), 1n);
  assertEquals(
    new Uint64(Uint64.min()).sub(new Uint64(1n)).value(),
    Uint64.max(),
  );
  // div()
  assertEquals(new Uint64(2n).div(new Uint64(3n)).value(), Uint64.min());
  assertEquals(new Uint64(3n).div(new Uint64(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint64(1n).mul(new Uint64(2n)).value(), 2n);
  assertEquals(
    new Uint64(1n).mul(new Uint64(Uint64.min())).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(Uint64.max()).mul(new Uint64(Uint64.max())).value(),
    1n,
  );
  // rem()
  assertEquals(new Uint64(2n).rem(new Uint64(3n)).value(), 2n);
  assertEquals(new Uint64(3n).rem(new Uint64(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint64(2n).exp(new Uint64(3n)).value(), 8n);
  assertEquals(
    new Uint64(Uint64.max()).exp(new Uint64(1n)).value(),
    Uint64.max(),
  );
  assertEquals(
    new Uint64(Uint64.max()).exp(new Uint64(Uint64.min())).value(),
    1n,
  );
  assertThrows((): void => {
    // Uncaught RangeError: Maximum BigInt size exceeded
    new Uint64(Uint64.max()).exp(new Uint64(Uint64.max()));
  });
  // and()
  assertEquals(
    new Uint64(Uint64.min()).and(new Uint64(Uint64.min())).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(Uint64.max()).and(new Uint64(Uint64.min())).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(Uint64.max()).and(new Uint64(Uint64.max())).value(),
    Uint64.max(),
  );
  // or()
  assertEquals(
    new Uint64(Uint64.min()).or(new Uint64(Uint64.min())).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(Uint64.max()).or(new Uint64(Uint64.min())).value(),
    Uint64.max(),
  );
  assertEquals(
    new Uint64(Uint64.max()).or(new Uint64(Uint64.max())).value(),
    Uint64.max(),
  );
  // xor()
  assertEquals(
    new Uint64(Uint64.min()).xor(new Uint64(Uint64.min())).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(Uint64.max()).xor(new Uint64(Uint64.min())).value(),
    Uint64.max(),
  );
  assertEquals(
    new Uint64(Uint64.max()).xor(new Uint64(Uint64.max())).value(),
    Uint64.min(),
  );
  // not()
  assertEquals(new Uint64(Uint64.min()).not().value(), Uint64.max());
  assertEquals(new Uint64(Uint64.max()).not().value(), Uint64.min());
  // logicalLeft()
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(32n).value(),
    0x90123456_00000000n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(64n).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(128n).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(256n).value(),
    Uint64.min(),
  );
  // logicalRight()
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(32n).value(),
    0x12345678n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(64n).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(128n).value(),
    Uint64.min(),
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(256n).value(),
    Uint64.min(),
  );
  // rotateLeft()
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateLeft(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateLeft(32n).value(),
    0x90123456_12345678n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateLeft(64n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateLeft(128n).value(),
    0x12345678_90123456n,
  );
  // rotateRight()
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateRight(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateRight(32n).value(),
    0x90123456_12345678n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateRight(64n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).rotateRight(128n).value(),
    0x12345678_90123456n,
  );
  // fromBeBytes()
  assertEquals(
    Uint64.fromBeBytes(
      Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).value(),
    new Uint64(0x12345678_90123456n).value(),
  );
  assertEquals(
    Uint64.fromBeBytes(new Uint8Array(8).fill(0xFF)).value(),
    Uint64.max(),
  );
  assertEquals(Uint64.fromBeBytes(new Uint8Array(8)).value(), Uint64.min());
  assertThrows((): void => {
    // Invalid Length
    Uint64.fromBeBytes(new Uint8Array(9));
  });
  // fromLeBytes()
  assertEquals(
    Uint64.fromLeBytes(
      Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).value(),
    new Uint64(0x56341290_78563412n).value(),
  );
  assertEquals(
    Uint64.fromLeBytes(new Uint8Array(8).fill(0xFF)).value(),
    Uint64.max(),
  );
  assertEquals(Uint64.fromLeBytes(new Uint8Array(8)).value(), Uint64.min());
  assertThrows((): void => {
    // Invalid Length
    Uint64.fromLeBytes(new Uint8Array(9));
  });
  // toBeBytes()
  assertEquals(
    new Uint64(0x12345678_90123456n).toBeBytes(),
    Uint8Vector.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
  );
  assertEquals(
    new Uint64(Uint64.max()).toBeBytes(),
    new Uint8Vector(8).fill(0xFF),
  );
  assertEquals(new Uint64(Uint64.min()).toBeBytes(), new Uint8Vector(8));
  // toLeBytes()
  assertEquals(
    new Uint64(0x12345678_90123456n).toLeBytes(),
    Uint8Vector.from([0x56, 0x34, 0x12, 0x90, 0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Uint64(Uint64.max()).toLeBytes(),
    new Uint8Vector(8).fill(0xFF),
  );
  assertEquals(new Uint64(Uint64.min()).toLeBytes(), new Uint8Vector(8));
});
