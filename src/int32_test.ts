import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Int32 } from "./int32.ts";

Deno.test("Int32", () => {
  // value()
  assertEquals(new Int32(0xFFFF_FFFFn).value(), -0x7FFF_FFFFn);
  assertEquals(new Int32(-0xFFFF_FFFFn).value(), -0x7FFF_FFFFn);
  assertEquals(new Int32(0n).value(), 0n);
  assertEquals(new Int32(-0n).value(), 0n);
  assertEquals(new Int32(0x8000_0000n).value(), 0n);
  assertEquals(new Int32(-0x8000_0000n).value(), 0n);
  // max()
  assertEquals(Int32.prototype.max(), 0x7FFF_FFFFn);
  // min()
  assertEquals(Int32.prototype.min(), -0x7FFF_FFFFn);
  // add()
  assertEquals(new Int32(1n).add(new Int32(2n)).value(), 3n);
  assertEquals(new Int32(0x7FFF_FFFFn).add(new Int32(1n)).value(), 0n);
  assertEquals(new Int32(1n).add(new Int32(-2n)).value(), -1n);
  assertEquals(new Int32(-1n).add(new Int32(2n)).value(), 1n);
  assertEquals(new Int32(-1n).add(new Int32(-2n)).value(), -3n);
  // sub()
  assertEquals(new Int32(3n).sub(new Int32(2n)).value(), 1n);
  assertEquals(new Int32(0n).sub(new Int32(1n)).value(), -1n);
  assertEquals(new Int32(1n).sub(new Int32(-2n)).value(), 3n);
  assertEquals(new Int32(-2n).sub(new Int32(1n)).value(), -3n);
  assertEquals(new Int32(-1n).sub(new Int32(-2n)).value(), 1n);
  // div()
  assertEquals(new Int32(2n).div(new Int32(3n)).value(), 0n);
  assertEquals(new Int32(3n).div(new Int32(2n)).value(), 1n);
  assertEquals(new Int32(4n).div(new Int32(-2n)).value(), -2n);
  assertEquals(new Int32(-4n).div(new Int32(2n)).value(), -2n);
  assertEquals(new Int32(-4n).div(new Int32(-2n)).value(), 2n);
  // mul()
  assertEquals(new Int32(1n).mul(new Int32(2n)).value(), 2n);
  assertEquals(new Int32(1n).mul(new Int32(0n)).value(), 0n);
  assertEquals(new Int32(1n).mul(new Int32(-2n)).value(), -2n);
  assertEquals(new Int32(-1n).mul(new Int32(2n)).value(), -2n);
  assertEquals(new Int32(-1n).mul(new Int32(-2n)).value(), 2n);
  // rem()
  assertEquals(new Int32(2n).rem(new Int32(3n)).value(), 2n);
  assertEquals(new Int32(3n).rem(new Int32(2n)).value(), 1n);
  assertEquals(new Int32(12n).rem(new Int32(-5n)).value(), 2n);
  assertEquals(new Int32(-12n).rem(new Int32(5n)).value(), -2n);
  assertEquals(new Int32(-12n).rem(new Int32(-5n)).value(), -2n);
  // exp()
  assertEquals(new Int32(2n).exp(new Int32(3n)).value(), 8n);
  assertEquals(
    new Int32(0x7FFF_FFFFn).exp(new Int32(1n)).value(),
    0x7FFF_FFFFn,
  );
  assertEquals(new Int32(0x7FFF_FFFFn).exp(new Int32(0n)).value(), 1n);
  assertThrows((): void => {
    new Int32(0x7FFF_FFFFn).exp(new Int32(0x7FFF_FFFFn));
  });
  // and()
  assertEquals(new Int32(0n).and(new Int32(0n)).value(), 0n);
  assertEquals(new Int32(0x7FFF_FFFFn).and(new Int32(0n)).value(), 0n);
  assertEquals(
    new Int32(0x7FFF_FFFFn).and(new Int32(0x7FFF_FFFFn)).value(),
    0x7FFF_FFFFn,
  );
  // or()
  assertEquals(new Int32(0n).or(new Int32(0n)).value(), 0n);
  assertEquals(new Int32(0x7FFF_FFFFn).or(new Int32(0n)).value(), 0x7FFF_FFFFn);
  assertEquals(
    new Int32(0x7FFF_FFFFn).or(new Int32(0x7FFF_FFFFn)).value(),
    0x7FFF_FFFFn,
  );
  // xor()
  assertEquals(new Int32(0n).xor(new Int32(0n)).value(), 0n);
  assertEquals(
    new Int32(0x7FFF_FFFFn).xor(new Int32(0n)).value(),
    0x7FFF_FFFFn,
  );
  assertEquals(
    new Int32(0x7FFF_FFFFn).xor(new Int32(0x7FFF_FFFFn)).value(),
    0n,
  );
  // not()
  assertEquals(new Int32(0n).not().value(), -1n);
  assertEquals(new Int32(0x7FFF_FFFFn).not().value(), 0n);
  // logicalLeft()
  assertEquals(new Int32(0x1234_5678n).logicalLeft(0n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).logicalLeft(8n).value(), 0x3456_7800n);
  assertEquals(new Int32(0x1234_5678n).logicalLeft(16n).value(), 0x5678_0000n);
  assertEquals(new Int32(0x1234_5678n).logicalLeft(32n).value(), 0n);
  assertEquals(new Int32(0x1234_5678n).logicalLeft(64n).value(), 0n);
  assertEquals(new Int32(0x1234_5678n).logicalLeft(128n).value(), 0n);
  assertEquals(new Int32(-0x1234_5678n).logicalLeft(0n).value(), -0x1234_5678n);
  assertEquals(new Int32(-0x1234_5678n).logicalLeft(16n).value(), 0x5678_0000n);
  assertEquals(
    new Int32(-0x1234_5678n).logicalLeft(17n).value(),
    -0x2CF0_0000n,
  );
  assertEquals(new Int32(-0x1234_5678n).logicalLeft(32n).value(), 0n);
  assertEquals(new Int32(-0x1234_5678n).logicalLeft(64n).value(), 0n);
  assertEquals(new Int32(-0x1234_5678n).logicalLeft(128n).value(), 0n);
  assertEquals(new Int32(0x7FFF_FFFFn).logicalLeft(1n).value(), -0x7FFF_FFFEn);
  assertEquals(new Int32(-0x7FFF_FFFFn).logicalLeft(1n).value(), -0x7FFF_FFFEn);
  // logicalRight()
  assertEquals(new Int32(0x1234_5678n).logicalRight(0n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(8n).value(), 0x0012_3456n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(16n).value(), 0x0000_1234n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(32n).value(), 0n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(64n).value(), 0n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(128n).value(), 0n);
  assertEquals(
    new Int32(-0x1234_5678n).logicalRight(0n).value(),
    -0x1234_5678n,
  );
  assertEquals(new Int32(-0x1234_5678n).logicalRight(16n).value(), 0x9234n);
  assertEquals(new Int32(-0x1234_5678n).logicalRight(17n).value(), 0x491an);
  assertEquals(new Int32(-0x1234_5678n).logicalRight(32n).value(), 0n);
  assertEquals(new Int32(-0x1234_5678n).logicalRight(64n).value(), 0n);
  assertEquals(new Int32(-0x1234_5678n).logicalRight(128n).value(), 0n);
  assertEquals(new Int32(0x7FFF_FFFFn).logicalRight(1n).value(), 0x3FFF_FFFFn);
  assertEquals(new Int32(-0x7FFF_FFFFn).logicalRight(1n).value(), 0x7FFF_FFFFn);
  // rotateLeft()
  assertEquals(new Int32(0x1234_5678n).rotateLeft(0n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).rotateLeft(8n).value(), 0x3456_7812n);
  assertEquals(new Int32(0x1234_5678n).rotateLeft(16n).value(), 0x5678_1234n);
  assertEquals(new Int32(0x1234_5678n).rotateLeft(32n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).rotateLeft(64n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).rotateLeft(128n).value(), 0x1234_5678n);
  // rotateRight()
  assertEquals(new Int32(0x1234_5678n).rotateRight(0n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).rotateRight(8n).value(), 0x7812_3456n);
  assertEquals(new Int32(0x1234_5678n).rotateRight(16n).value(), 0x5678_1234n);
  assertEquals(new Int32(0x1234_5678n).rotateRight(32n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).rotateRight(64n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).rotateRight(128n).value(), 0x1234_5678n);
  // fromBeBytes()
  assertEquals(
    Int32.prototype.fromBeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78]))
      .value(),
    new Int32(0x1234_5678n).value(),
  );
  assertEquals(
    Int32.prototype.fromBeBytes(new Uint8Array([0x7F, 0xFF, 0xFF, 0xFF]))
      .value(),
    Int32.prototype.max(),
  );
  assertEquals(
    Int32.prototype.fromBeBytes(new Uint8Array(4)).value(),
    0n,
  );
  assertThrows((): void => {
    // Invalid Length
    Int32.prototype.fromBeBytes(new Uint8Array(5));
  });
  // fromLeBytes()
  assertEquals(
    Int32.prototype.fromLeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78]))
      .value(),
    new Int32(0x7856_3412n).value(),
  );
  assertEquals(
    Int32.prototype.fromLeBytes(new Uint8Array([0xFF, 0xFF, 0xFF, 0x7F]))
      .value(),
    Int32.prototype.max(),
  );
  assertEquals(
    Int32.prototype.fromLeBytes(new Uint8Array(4)).value(),
    0n,
  );
  assertThrows((): void => {
    // Invalid Length
    Int32.prototype.fromLeBytes(new Uint8Array(5));
  });
  // toBeBytes()
  assertEquals(
    new Int32(0x1234_5678n).toBeBytes(),
    new Uint8Array([0x12, 0x34, 0x56, 0x78]),
  );
  assertEquals(
    new Int32(Int32.prototype.max()).toBeBytes(),
    new Uint8Array([0x7F, 0xFF, 0xFF, 0xFF]),
  );
  assertEquals(new Int32(0n).toBeBytes(), new Uint8Array(4));
  // toLeBytes()
  assertEquals(
    new Int32(0x1234_5678n).toLeBytes(),
    new Uint8Array([0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Int32(Int32.prototype.max()).toLeBytes(),
    new Uint8Array([0xFF, 0xFF, 0xFF, 0x7F]),
  );
  assertEquals(new Int32(0n).toLeBytes(), new Uint8Array(4));
});
