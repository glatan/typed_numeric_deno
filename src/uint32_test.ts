import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint32 } from "./uint32.ts";

Deno.test("Uint32", () => {
  // value()
  assertEquals(new Uint32(0x1_0000_0000n).value(), 0n);
  assertEquals(new Uint32(0n).value(), 0n);
  assertEquals(new Uint32(-1n).value(), 0xFFFF_FFFFn);
  // max()
  assertEquals(Uint32.max(), 0xFFFF_FFFFn);
  // min()
  assertEquals(Uint32.min(), 0n);
  // add()
  assertEquals(new Uint32(1n).add(new Uint32(2n)).value(), 3n);
  assertEquals(new Uint32(0xFFFF_FFFFn).add(new Uint32(1n)).value(), 0n);
  // sub()
  assertEquals(new Uint32(3n).sub(new Uint32(2n)).value(), 1n);
  assertEquals(new Uint32(0n).sub(new Uint32(1n)).value(), 0xFFFF_FFFFn);
  // div()
  assertEquals(new Uint32(2n).div(new Uint32(3n)).value(), 0n);
  assertEquals(new Uint32(3n).div(new Uint32(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint32(1n).mul(new Uint32(2n)).value(), 2n);
  assertEquals(new Uint32(1n).mul(new Uint32(0n)).value(), 0n);
  assertEquals(
    new Uint32(0xFFFF_FFFFn).mul(new Uint32(0xFFFF_FFFFn)).value(),
    1n,
  );
  // rem()
  assertEquals(new Uint32(2n).rem(new Uint32(3n)).value(), 2n);
  assertEquals(new Uint32(3n).rem(new Uint32(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint32(2n).exp(new Uint32(3n)).value(), 8n);
  assertEquals(
    new Uint32(0xFFFF_FFFFn).exp(new Uint32(1n)).value(),
    0xFFFF_FFFFn,
  );
  assertEquals(new Uint32(0xFFFF_FFFFn).exp(new Uint32(0n)).value(), 1n);
  assertThrows((): void => {
    new Uint32(0xFFFF_FFFFn).exp(new Uint32(0xFFFF_FFFFn)).value();
  });
  // and()
  assertEquals(new Uint32(0n).and(new Uint32(0n)).value(), 0n);
  assertEquals(new Uint32(0xFFFF_FFFFn).and(new Uint32(0n)).value(), 0n);
  assertEquals(
    new Uint32(0xFFFF_FFFFn).and(new Uint32(0xFFFF_FFFFn)).value(),
    0xFFFF_FFFFn,
  );
  // or()
  assertEquals(new Uint32(0n).or(new Uint32(0n)).value(), 0n);
  assertEquals(
    new Uint32(0xFFFF_FFFFn).or(new Uint32(0n)).value(),
    0xFFFF_FFFFn,
  );
  assertEquals(
    new Uint32(0xFFFF_FFFFn).or(new Uint32(0xFFFF_FFFFn)).value(),
    0xFFFF_FFFFn,
  );
  // xor()
  assertEquals(new Uint32(0n).xor(new Uint32(0n)).value(), 0n);
  assertEquals(
    new Uint32(0xFFFF_FFFFn).xor(new Uint32(0n)).value(),
    0xFFFF_FFFFn,
  );
  assertEquals(
    new Uint32(0xFFFF_FFFFn).xor(new Uint32(0xFFFF_FFFFn)).value(),
    0n,
  );
  // not()
  assertEquals(new Uint32(0n).not().value(), 0xFFFF_FFFFn);
  assertEquals(new Uint32(0xFFFF_FFFFn).not().value(), 0n);
  // logicalLeft()
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(0n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(16n).value(), 0x5678_0000n);
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(32n).value(), 0n);
  assertEquals(new Uint32(0x1234_5678n).logicalLeft(64n).value(), 0n);
  assertEquals(
    new Uint32(0x1234_5678n).logicalLeft(128n).value(),
    0n,
  );
  // logicalRight()
  assertEquals(new Uint32(0x1234_5678n).logicalRight(0n).value(), 0x1234_5678n);
  assertEquals(
    new Uint32(0x1234_5678n).logicalRight(16n).value(),
    0x0000_1234n,
  );
  assertEquals(new Uint32(0x1234_5678n).logicalRight(32n).value(), 0n);
  assertEquals(
    new Uint32(0x1234_5678n).logicalRight(64n).value(),
    0n,
  );
  assertEquals(
    new Uint32(0x1234_5678n).logicalRight(128n).value(),
    0n,
  );
  // rotateLeft()
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(0n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(16n).value(), 0x5678_1234n);
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(32n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateLeft(64n).value(), 0x1234_5678n);
  // rotateRight()
  assertEquals(new Uint32(0x1234_5678n).rotateRight(0n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateRight(16n).value(), 0x5678_1234n);
  assertEquals(new Uint32(0x1234_5678n).rotateRight(32n).value(), 0x1234_5678n);
  assertEquals(new Uint32(0x1234_5678n).rotateRight(64n).value(), 0x1234_5678n);
  // fromBeBytes()
  assertEquals(
    Uint32.fromBeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78]))
      .value(),
    new Uint32(0x1234_5678n).value(),
  );
  assertEquals(
    Uint32.fromBeBytes(new Uint8Array(4).fill(0xFF)).value(),
    Uint32.max(),
  );
  assertEquals(
    Uint32.fromBeBytes(new Uint8Array(4)).value(),
    Uint32.min(),
  );
  assertThrows((): void => {
    // Invalid Length
    Uint32.fromBeBytes(new Uint8Array(5));
  });
  // fromLeBytes()
  assertEquals(
    Uint32.fromLeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78]))
      .value(),
    new Uint32(0x7856_3412n).value(),
  );
  assertEquals(
    Uint32.fromLeBytes(new Uint8Array(4).fill(0xFF)).value(),
    Uint32.max(),
  );
  assertEquals(
    Uint32.fromLeBytes(new Uint8Array(4)).value(),
    Uint32.min(),
  );
  assertThrows((): void => {
    // Invalid Length
    Uint32.fromLeBytes(new Uint8Array(5));
  });
  // toBeBytes()
  assertEquals(
    new Uint32(0x1234_5678n).toBeBytes(),
    new Uint8Array([0x12, 0x34, 0x56, 0x78]),
  );
  assertEquals(
    new Uint32(Uint32.max()).toBeBytes(),
    new Uint8Array(4).fill(0xFF),
  );
  assertEquals(
    new Uint32(Uint32.min()).toBeBytes(),
    new Uint8Array(4),
  );
  // toLeBytes()
  assertEquals(
    new Uint32(0x1234_5678n).toLeBytes(),
    new Uint8Array([0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Uint32(Uint32.max()).toLeBytes(),
    new Uint8Array(4).fill(0xFF),
  );
  assertEquals(
    new Uint32(Uint32.min()).toLeBytes(),
    new Uint8Array(4),
  );
});
