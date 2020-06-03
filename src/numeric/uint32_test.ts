import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint32 } from "./uint32.ts";

Deno.test("Uint32", () => {
  // constructor
  assertEquals(new Uint32().value(), 0n);
  // value()
  assertEquals(new Uint32(Uint32.max() + 1n).value(), Uint32.min());
  assertEquals(new Uint32(Uint32.min() - 1n).value(), Uint32.max());
  // max()
  assertEquals(Uint32.max(), 0xFFFF_FFFFn);
  // min()
  assertEquals(Uint32.min(), 0n);
  // add()
  assertEquals(new Uint32(1n).add(new Uint32(2n)).value(), 3n);
  assertEquals(
    new Uint32(Uint32.max()).add(new Uint32(1n)).value(),
    Uint32.min(),
  );
  // sub()
  assertEquals(new Uint32(3n).sub(new Uint32(2n)).value(), 1n);
  assertEquals(
    new Uint32(Uint32.min()).sub(new Uint32(1n)).value(),
    Uint32.max(),
  );
  // div()
  assertEquals(new Uint32(2n).div(new Uint32(3n)).value(), Uint32.min());
  assertEquals(new Uint32(3n).div(new Uint32(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint32(1n).mul(new Uint32(2n)).value(), 2n);
  assertEquals(
    new Uint32(1n).mul(new Uint32(Uint32.min())).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(Uint32.max()).mul(new Uint32(Uint32.max())).value(),
    1n,
  );
  // rem()
  assertEquals(new Uint32(2n).rem(new Uint32(3n)).value(), 2n);
  assertEquals(new Uint32(3n).rem(new Uint32(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint32(2n).exp(new Uint32(3n)).value(), 8n);
  assertEquals(
    new Uint32(Uint32.max()).exp(new Uint32(1n)).value(),
    Uint32.max(),
  );
  assertEquals(
    new Uint32(Uint32.max()).exp(new Uint32(Uint32.min())).value(),
    1n,
  );
  assertThrows((): void => {
    new Uint32(Uint32.max()).exp(new Uint32(Uint32.max())).value();
  });
  // and()
  assertEquals(
    new Uint32(Uint32.min()).and(new Uint32(Uint32.min())).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(Uint32.max()).and(new Uint32(Uint32.min())).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(Uint32.max()).and(new Uint32(Uint32.max())).value(),
    Uint32.max(),
  );
  // or()
  assertEquals(
    new Uint32(Uint32.min()).or(new Uint32(Uint32.min())).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(Uint32.max()).or(new Uint32(Uint32.min())).value(),
    Uint32.max(),
  );
  assertEquals(
    new Uint32(Uint32.max()).or(new Uint32(Uint32.max())).value(),
    Uint32.max(),
  );
  // xor()
  assertEquals(
    new Uint32(Uint32.min()).xor(new Uint32(Uint32.min())).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(Uint32.max()).xor(new Uint32(Uint32.min())).value(),
    Uint32.max(),
  );
  assertEquals(
    new Uint32(Uint32.max()).xor(new Uint32(Uint32.max())).value(),
    Uint32.min(),
  );
  // not()
  assertEquals(new Uint32(Uint32.min()).not().value(), Uint32.max());
  assertEquals(new Uint32(Uint32.max()).not().value(), Uint32.min());
  // logicalLeft()
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(0n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(16n).value(), 0x5678_0000n);
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(32n).value(), Uint32.min());
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(64n).value(), Uint32.min());
  assertEquals(
    new Uint32(0x1234_5678n).logicalLeft(128n).value(),
    Uint32.min(),
  );
  // logicalRight()
  assertEquals(new Uint32(0x1234_5678n).logicalRight(0n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).logicalRight(16n).value(), 0x1234n);
  assertEquals(
    new Uint32(0x1234_5678n).logicalRight(32n).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(0x1234_5678n).logicalRight(64n).value(),
    Uint32.min(),
  );
  assertEquals(
    new Uint32(0x1234_5678n).logicalRight(128n).value(),
    Uint32.min(),
  );
  // rotateLeft()
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(0n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(16n).value(), 0x5678_1234n);
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(32n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(64n).value(), 0x1234_5678n);
  // rotateRight()
  assertEquals(
    new Uint32(0x1234_5678n).rotateRight(0n).value(),
    0x1234_5678n,
  );
  assertEquals(new Uint32(0x1234_5678n).rotateRight(16n).value(), 0x5678_1234n);
  assertEquals(new Uint32(0x1234_5678n).rotateRight(32n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateRight(64n).value(), 0x1234_5678n);
  // fromBeBytes()
  assertEquals(
    Uint32.fromBeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78])).value(),
    new Uint32(0x1234_5678n).value(),
  );
  assertEquals(
    Uint32.fromBeBytes(new Uint8Array(4).fill(0xFF)).value(),
    Uint32.max(),
  );
  assertEquals(Uint32.fromBeBytes(new Uint8Array(4)).value(), Uint32.min());
  assertThrows((): void => {
    // Invalid Length
    Uint32.fromBeBytes(new Uint8Array(5));
  });
  // fromLeBytes()
  assertEquals(
    Uint32.fromLeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78])).value(),
    new Uint32(0x7856_3412n).value(),
  );
  assertEquals(
    Uint32.fromLeBytes(new Uint8Array(4).fill(0xFF)).value(),
    Uint32.max(),
  );
  assertEquals(Uint32.fromLeBytes(new Uint8Array(4)).value(), Uint32.min());
  assertThrows((): void => {
    // Invalid Length
    Uint32.fromLeBytes(new Uint8Array(5));
  });
  // toBeBytesArray()
  assertEquals(
    new Uint32(0x1234_5678n).toBeBytesArray(),
    new Uint8Array([0x12, 0x34, 0x56, 0x78]),
  );
  assertEquals(
    new Uint32(Uint32.max()).toBeBytesArray(),
    new Uint8Array(4).fill(0xFF),
  );
  assertEquals(new Uint32(Uint32.min()).toBeBytesArray(), new Uint8Array(4));
  // toLeBytesArray()
  assertEquals(
    new Uint32(0x1234_5678n).toLeBytesArray(),
    new Uint8Array([0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Uint32(Uint32.max()).toLeBytesArray(),
    new Uint8Array(4).fill(0xFF),
  );
  assertEquals(new Uint32(Uint32.min()).toLeBytesArray(), new Uint8Array(4));
});
