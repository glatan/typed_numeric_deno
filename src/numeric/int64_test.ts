import { assertEquals, assertThrows } from "../../depends.ts";

import { Int64 } from "./int64.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

Deno.test("Int64.prototype", () => {
  // constructor
  assertEquals(new Int64().value(), 0n);
  // value()
  assertEquals(new Int64(0xFFFFFFFF_FFFFFFFFn).value(), Int64.min());
  assertEquals(new Int64(-0xFFFFFFFF_FFFFFFFFn).value(), Int64.min());
  assertEquals(new Int64(0n).value(), 0n);
  assertEquals(new Int64(-0n).value(), 0n);
  assertEquals(new Int64(Int64.max() + 1n).value(), 0n);
  assertEquals(new Int64(Int64.min() - 1n).value(), 0n);
  // max()
  assertEquals(Int64.max(), 0x7FFFFFFF_FFFFFFFFn);
  // min()
  assertEquals(Int64.min(), -0x7FFFFFFF_FFFFFFFFn);
  // add()
  assertEquals(new Int64(1n).add(new Int64(2n)).value(), 3n);
  assertEquals(new Int64(Int64.max()).add(new Int64(1n)).value(), 0n);
  assertEquals(new Int64(1n).add(new Int64(-2n)).value(), -1n);
  assertEquals(new Int64(-1n).add(new Int64(2n)).value(), 1n);
  assertEquals(new Int64(-1n).add(new Int64(-2n)).value(), -3n);
  // sub()
  assertEquals(new Int64(3n).sub(new Int64(2n)).value(), 1n);
  assertEquals(new Int64(0n).sub(new Int64(1n)).value(), -1n);
  assertEquals(new Int64(1n).sub(new Int64(-2n)).value(), 3n);
  assertEquals(new Int64(-2n).sub(new Int64(1n)).value(), -3n);
  assertEquals(new Int64(-1n).sub(new Int64(-2n)).value(), 1n);
  // div()
  assertEquals(new Int64(2n).div(new Int64(3n)).value(), 0n);
  assertEquals(new Int64(3n).div(new Int64(2n)).value(), 1n);
  assertEquals(new Int64(4n).div(new Int64(-2n)).value(), -2n);
  assertEquals(new Int64(-4n).div(new Int64(2n)).value(), -2n);
  assertEquals(new Int64(-4n).div(new Int64(-2n)).value(), 2n);
  // mul()
  assertEquals(new Int64(1n).mul(new Int64(2n)).value(), 2n);
  assertEquals(new Int64(1n).mul(new Int64(0n)).value(), 0n);
  assertEquals(new Int64(1n).mul(new Int64(-2n)).value(), -2n);
  assertEquals(new Int64(-1n).mul(new Int64(2n)).value(), -2n);
  assertEquals(new Int64(-1n).mul(new Int64(-2n)).value(), 2n);
  // rem()
  assertEquals(new Int64(2n).rem(new Int64(3n)).value(), 2n);
  assertEquals(new Int64(3n).rem(new Int64(2n)).value(), 1n);
  assertEquals(new Int64(12n).rem(new Int64(-5n)).value(), 2n);
  assertEquals(new Int64(-12n).rem(new Int64(5n)).value(), -2n);
  assertEquals(new Int64(-12n).rem(new Int64(-5n)).value(), -2n);
  // exp()
  assertEquals(new Int64(2n).exp(new Int64(3n)).value(), 8n);
  assertEquals(new Int64(Int64.max()).exp(new Int64(1n)).value(), Int64.max());
  assertEquals(new Int64(Int64.max()).exp(new Int64(0n)).value(), 1n);
  assertThrows((): void => {
    new Int64(Int64.max()).exp(new Int64(Int64.max()));
  });
  assertThrows(() => {
    new Int64(2n).exp(new Int64(-5n));
  });
  assertEquals(new Int64(-2n).exp(new Int64(4n)).value(), 16n);
  assertEquals(new Int64(-2n).exp(new Int64(5n)).value(), -32n);
  assertThrows(() => {
    new Int64(-2n).exp(new Int64(-5n));
  });
  // and()
  assertEquals(new Int64(0n).and(new Int64(0n)).value(), 0n);
  assertEquals(new Int64(Int64.max()).and(new Int64(0n)).value(), 0n);
  assertEquals(
    new Int64(Int64.max()).and(new Int64(Int64.max())).value(),
    Int64.max(),
  );
  // or()
  assertEquals(new Int64(0n).or(new Int64(0n)).value(), 0n);
  assertEquals(new Int64(Int64.max()).or(new Int64(0n)).value(), Int64.max());
  assertEquals(
    new Int64(Int64.max()).or(new Int64(Int64.max())).value(),
    Int64.max(),
  );
  // xor()
  assertEquals(new Int64(0n).xor(new Int64(0n)).value(), 0n);
  assertEquals(new Int64(Int64.max()).xor(new Int64(0n)).value(), Int64.max());
  assertEquals(new Int64(Int64.max()).xor(new Int64(Int64.max())).value(), 0n);
  // not()
  assertEquals(new Int64(0n).not().value(), -1n);
  assertEquals(new Int64(Int64.max()).not().value(), 0n);
  // logicalLeft()
  assertEquals(
    new Int64(0x12345678_90123456n).logicalLeft(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).logicalLeft(32n).value(),
    -0x10123456_00000000n,
  );
  assertEquals(new Int64(0x12345678_90123456n).logicalLeft(64n).value(), 0n);
  assertEquals(new Int64(0x12345678_90123456n).logicalLeft(128n).value(), 0n);
  assertEquals(new Int64(0x12345678_90123456n).logicalLeft(256n).value(), 0n);
  assertEquals(
    new Int64(-0x12345678_90123456n).logicalLeft(0n).value(),
    -0x12345678_90123456n,
  );
  assertEquals(
    new Int64(-0x12345678_90123456n).logicalLeft(32n).value(),
    -0x10123456_00000000n,
  );
  assertEquals(
    new Int64(-0x12345678_90123456n).logicalLeft(33n).value(),
    0x202468AC_00000000n,
  );
  assertEquals(new Int64(-0x12345678_90123456n).logicalLeft(64n).value(), 0n);
  assertEquals(new Int64(-0x12345678_90123456n).logicalLeft(128n).value(), 0n);
  assertEquals(new Int64(-0x12345678_90123456n).logicalLeft(256n).value(), 0n);
  assertEquals(
    new Int64(Int64.max()).logicalLeft(1n).value(),
    -0x7FFFFFFF_FFFFFFFEn,
  );
  assertEquals(
    new Int64(Int64.min()).logicalLeft(1n).value(),
    -0x7FFFFFFF_FFFFFFFEn,
  );
  // logicalRight()
  assertEquals(
    new Int64(0x12345678_90123456n).logicalRight(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).logicalRight(32n).value(),
    0x12345678n,
  );
  assertEquals(new Int64(0x12345678_90123456n).logicalRight(64n).value(), 0n);
  assertEquals(new Int64(0x12345678_90123456n).logicalRight(128n).value(), 0n);
  assertEquals(new Int64(0x12345678_90123456n).logicalRight(256n).value(), 0n);
  assertEquals(
    new Int64(-0x12345678_90123456n).logicalRight(0n).value(),
    -0x12345678_90123456n,
  );
  assertEquals(
    new Int64(-0x12345678_90123456n).logicalRight(32n).value(),
    0x92345678n,
  );
  assertEquals(
    new Int64(-0x12345678_90123456n).logicalRight(33n).value(),
    0x491A2B3Cn,
  );
  assertEquals(new Int64(-0x12345678_90123456n).logicalRight(64n).value(), 0n);
  assertEquals(new Int64(-0x12345678_90123456n).logicalRight(128n).value(), 0n);
  assertEquals(new Int64(-0x12345678_90123456n).logicalRight(256n).value(), 0n);
  assertEquals(
    new Int64(Int64.max()).logicalRight(1n).value(),
    0x3FFFFFFF_FFFFFFFFn,
  );
  assertEquals(new Int64(Int64.min()).logicalRight(1n).value(), Int64.max());
  // rotateLeft()
  assertEquals(
    new Int64(0x12345678_90123456n).rotateLeft(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateLeft(16n).value(),
    0x56789012_34561234n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateLeft(32n).value(),
    -0x10123456_12345678n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateLeft(64n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateLeft(128n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateLeft(256n).value(),
    0x12345678_90123456n,
  );
  // rotateRight()
  assertEquals(
    new Int64(0x12345678_90123456n).rotateRight(0n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateRight(16n).value(),
    0x34561234_56789012n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateRight(32n).value(),
    -0x10123456_12345678n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateRight(64n).value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int64(0x12345678_90123456n).rotateRight(128n).value(),
    0x12345678_90123456n,
  );
  // toBeBytes()
  assertEquals(
    new Int64(0x12345678_90123456n).toBeBytes(),
    Uint8Vector.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
  );
  assertEquals(
    new Int64(Int64.max()).toBeBytes(),
    Uint8Vector.from([0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]),
  );
  assertEquals(new Int64(0n).toBeBytes(), new Uint8Vector(8));
  // toLeBytes()
  assertEquals(
    new Int64(0x12345678_90123456n).toLeBytes(),
    Uint8Vector.from([0x56, 0x34, 0x12, 0x90, 0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Int64(Int64.max()).toLeBytes(),
    Uint8Vector.from([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F]),
  );
  assertEquals(new Int64(0n).toLeBytes(), new Uint8Vector(8));
});

Deno.test("Int64", () => {
  // fromBeBytes()
  assertEquals(
    Int64.fromBeBytes(
      Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).value(),
    new Int64(0x12345678_90123456n).value(),
  );
  assertEquals(
    Int64.fromBeBytes(
      new Uint8Array([0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]),
    ).value(),
    Int64.max(),
  );
  assertEquals(Int64.fromBeBytes(new Uint8Array(8)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int64.fromBeBytes(new Uint8Array(9));
  });
  assertEquals(
    Int64.fromBeBytes(
      Uint8Vector.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).value(),
    new Int64(0x12345678_90123456n).value(),
  );
  assertEquals(
    Int64.fromBeBytes([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]).value(),
    new Int64(0x12345678_90123456n).value(),
  );
  // fromLeBytes()
  assertEquals(
    Int64.fromLeBytes(
      Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).value(),
    new Int64(0x56341290_78563412n).value(),
  );
  assertEquals(
    Int64.fromLeBytes(
      new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F]),
    ).value(),
    Int64.max(),
  );
  assertEquals(Int64.fromLeBytes(new Uint8Array(8)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int64.fromLeBytes(new Uint8Array(9));
  });
  assertEquals(
    Int64.fromLeBytes(
      Uint8Vector.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).value(),
    new Int64(0x56341290_78563412n).value(),
  );
  assertEquals(
    Int64.fromLeBytes([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]).value(),
    new Int64(0x56341290_78563412n).value(),
  );
});
