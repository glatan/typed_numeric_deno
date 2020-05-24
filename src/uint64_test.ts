import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint64 } from "./uint64.ts";

Deno.test("Uint64", () => {
  // value()
  assertEquals(new Uint64(0x1_00000000_00000000n).value(), 0n);
  assertEquals(new Uint64(0n).value(), 0n);
  assertEquals(new Uint64(-1n).value(), 0xFFFFFFFF_FFFFFFFFn);
  // max()
  assertEquals(Uint64.prototype.max(), 0xFFFFFFFF_FFFFFFFFn);
  // min()
  assertEquals(Uint64.prototype.min(), 0n);
  // add()
  assertEquals(new Uint64(1n).add(new Uint64(2n)).value(), 3n);
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).add(new Uint64(1n)).value(),
    0n,
  );
  // sub()
  assertEquals(new Uint64(3n).sub(new Uint64(2n)).value(), 1n);
  assertEquals(
    new Uint64(0n).sub(new Uint64(1n)).value(),
    0xFFFFFFFF_FFFFFFFFn,
  );
  // div()
  assertEquals(new Uint64(2n).div(new Uint64(3n)).value(), 0n);
  assertEquals(new Uint64(3n).div(new Uint64(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint64(1n).mul(new Uint64(2n)).value(), 2n);
  assertEquals(new Uint64(1n).mul(new Uint64(0n)).value(), 0n);
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).mul(new Uint64(0xFFFFFFFF_FFFFFFFFn))
      .value(),
    1n,
  );
  // rem()
  assertEquals(new Uint64(2n).rem(new Uint64(3n)).value(), 2n);
  assertEquals(new Uint64(3n).rem(new Uint64(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint64(2n).exp(new Uint64(3n)).value(), 8n);
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).exp(new Uint64(1n)).value(),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).exp(new Uint64(0n)).value(),
    1n,
  );
  assertThrows((): void => {
    // Uncaught RangeError: Maximum BigInt size exceeded
    new Uint64(0xFFFFFFFF_FFFFFFFFn).exp(new Uint64(0xFFFFFFFF_FFFFFFFFn));
  });
  // and()
  assertEquals(new Uint64(0n).and(new Uint64(0n)).value(), 0n);
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).and(new Uint64(0n)).value(),
    0n,
  );
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).and(new Uint64(0xFFFFFFFF_FFFFFFFFn))
      .value(),
    0xFFFFFFFF_FFFFFFFFn,
  );
  // or()
  assertEquals(new Uint64(0n).or(new Uint64(0n)).value(), 0n);
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).or(new Uint64(0n)).value(),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).or(new Uint64(0xFFFFFFFF_FFFFFFFFn))
      .value(),
    0xFFFFFFFF_FFFFFFFFn,
  );
  // xor()
  assertEquals(new Uint64(0n).xor(new Uint64(0n)).value(), 0n);
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).xor(new Uint64(0n)).value(),
    0xFFFFFFFF_FFFFFFFFn,
  );
  assertEquals(
    new Uint64(0xFFFFFFFF_FFFFFFFFn).xor(new Uint64(0xFFFFFFFF_FFFFFFFFn))
      .value(),
    0n,
  );
  // not()
  assertEquals(new Uint64(0n).not().value(), 0xFFFFFFFF_FFFFFFFFn);
  assertEquals(new Uint64(0xFFFFFFFF_FFFFFFFFn).not().value(), 0n);
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
    0n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(128n).value(),
    0n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalLeft(256n).value(),
    0n,
  );
  // logicalRight()
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(32n).value(),
    0x00000000_12345678n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(64n).value(),
    0n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(128n).value(),
    0n,
  );
  assertEquals(
    new Uint64(0x12345678_90123456n).logicalRight(256n).value(),
    0n,
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
    Uint64.prototype.fromBeBytes(
      Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    )
      .value(),
    new Uint64(0x12345678_90123456n).value(),
  );
  assertEquals(
    Uint64.prototype.fromBeBytes(
      Uint8Array.from([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]),
    )
      .value(),
    Uint64.prototype.max(),
  );
  assertEquals(
    Uint64.prototype.fromBeBytes(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]))
      .value(),
    Uint64.prototype.min(),
  );
  // fromLeBytes()
  assertEquals(
    Uint64.prototype.fromLeBytes(
      Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    )
      .value(),
    new Uint64(0x56341290_78563412n).value(),
  );
  assertEquals(
    Uint64.prototype.fromLeBytes(
      Uint8Array.from([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]),
    )
      .value(),
    Uint64.prototype.max(),
  );
  assertEquals(
    Uint64.prototype.fromLeBytes(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]))
      .value(),
    Uint64.prototype.min(),
  );
  // toBeBytes()
  assertEquals(
    new Uint64(0x12345678_90123456n).toBeBytes(),
    new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
  );
  assertEquals(
    new Uint64(0n).toBeBytes(),
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
  );
  // toLeBytes()
  assertEquals(
    new Uint64(0x12345678_90123456n).toLeBytes(),
    new Uint8Array([0x56, 0x34, 0x12, 0x90, 0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Uint64(0n).toBeBytes(),
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
  );
});
