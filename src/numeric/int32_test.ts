import { assertEquals, assertThrows } from "../../depends.ts";

import { Int32 } from "./int32.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

Deno.test("Int32.prototype", () => {
  // constructor
  assertEquals(new Int32().value(), 0n);
  // value()
  assertEquals(new Int32(0xFFFF_FFFFn).value(), Int32.min());
  assertEquals(new Int32(-0xFFFF_FFFFn).value(), Int32.min());
  assertEquals(new Int32(0n).value(), 0n);
  assertEquals(new Int32(-0n).value(), 0n);
  assertEquals(new Int32(Int32.max() + 1n).value(), 0n);
  assertEquals(new Int32(Int32.min() - 1n).value(), 0n);
  // max()
  assertEquals(Int32.max(), 0x7FFF_FFFFn);
  // min()
  assertEquals(Int32.min(), -Int32.max());
  // add()
  assertEquals(new Int32(1n).add(new Int32(2n)).value(), 3n);
  assertEquals(new Int32(Int32.max()).add(new Int32(1n)).value(), 0n);
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
  assertEquals(new Int32(Int32.max()).exp(new Int32(1n)).value(), Int32.max());
  assertEquals(new Int32(Int32.max()).exp(new Int32(0n)).value(), 1n);
  assertThrows((): void => {
    new Int32(Int32.max()).exp(new Int32(Int32.max()));
  });
  assertThrows(() => {
    new Int32(2n).exp(new Int32(-5n));
  });
  assertEquals(new Int32(-2n).exp(new Int32(4n)).value(), 16n);
  assertEquals(new Int32(-2n).exp(new Int32(5n)).value(), -32n);
  assertThrows(() => {
    new Int32(-2n).exp(new Int32(-5n));
  });
  // and()
  assertEquals(new Int32(0n).and(new Int32(0n)).value(), 0n);
  assertEquals(new Int32(Int32.max()).and(new Int32(0n)).value(), 0n);
  assertEquals(
    new Int32(Int32.max()).and(new Int32(Int32.max())).value(),
    Int32.max(),
  );
  // or()
  assertEquals(new Int32(0n).or(new Int32(0n)).value(), 0n);
  assertEquals(new Int32(Int32.max()).or(new Int32(0n)).value(), Int32.max());
  assertEquals(
    new Int32(Int32.max()).or(new Int32(Int32.max())).value(),
    Int32.max(),
  );
  // xor()
  assertEquals(new Int32(0n).xor(new Int32(0n)).value(), 0n);
  assertEquals(new Int32(Int32.max()).xor(new Int32(0n)).value(), Int32.max());
  assertEquals(new Int32(Int32.max()).xor(new Int32(Int32.max())).value(), 0n);
  // not()
  assertEquals(new Int32(0n).not().value(), -1n);
  assertEquals(new Int32(Int32.max()).not().value(), 0n);
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
  assertEquals(new Int32(Int32.max()).logicalLeft(1n).value(), -0x7FFF_FFFEn);
  assertEquals(new Int32(Int32.min()).logicalLeft(1n).value(), -0x7FFF_FFFEn);
  // logicalRight()
  assertEquals(new Int32(0x1234_5678n).logicalRight(0n).value(), 0x1234_5678n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(8n).value(), 0x0012_3456n);
  assertEquals(new Int32(0x1234_5678n).logicalRight(16n).value(), 0x1234n);
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
  assertEquals(new Int32(Int32.max()).logicalRight(1n).value(), 0x3FFF_FFFFn);
  assertEquals(new Int32(Int32.min()).logicalRight(1n).value(), Int32.max());
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
  // toBeBytes()
  assertEquals(
    new Int32(0x1234_5678n).toBeBytes(),
    Uint8Vector.from([0x12, 0x34, 0x56, 0x78]),
  );
  assertEquals(
    new Int32(Int32.max()).toBeBytes(),
    Uint8Vector.from([0x7F, 0xFF, 0xFF, 0xFF]),
  );
  assertEquals(new Int32(0n).toBeBytes(), new Uint8Vector(4));
  // toLeBytes()
  assertEquals(
    new Int32(0x1234_5678n).toLeBytes(),
    Uint8Vector.from([0x78, 0x56, 0x34, 0x12]),
  );
  assertEquals(
    new Int32(Int32.max()).toLeBytes(),
    Uint8Vector.from([0xFF, 0xFF, 0xFF, 0x7F]),
  );
  assertEquals(new Int32(0n).toLeBytes(), new Uint8Vector(4));
});

Deno.test("Int32", () => {
  // fromBeBytes()
  assertEquals(
    Int32.fromBeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78])).value(),
    new Int32(0x1234_5678n).value(),
  );
  assertEquals(
    Int32.fromBeBytes(new Uint8Array([0x7F, 0xFF, 0xFF, 0xFF])).value(),
    Int32.max(),
  );
  assertEquals(Int32.fromBeBytes(new Uint8Array(4)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int32.fromBeBytes(new Uint8Array(5));
  });
  assertEquals(
    Int32.fromBeBytes(Uint8Vector.from([0x12, 0x34, 0x56, 0x78])).value(),
    new Int32(0x1234_5678n).value(),
  );
  assertEquals(
    Int32.fromBeBytes([0x12, 0x34, 0x56, 0x78]).value(),
    new Int32(0x1234_5678n).value(),
  );
  // fromLeBytes()
  assertEquals(
    Int32.fromLeBytes(Uint8Array.from([0x12, 0x34, 0x56, 0x78])).value(),
    new Int32(0x7856_3412n).value(),
  );
  assertEquals(
    Int32.fromLeBytes(new Uint8Array([0xFF, 0xFF, 0xFF, 0x7F])).value(),
    Int32.max(),
  );
  assertEquals(Int32.fromLeBytes(new Uint8Array(4)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int32.fromLeBytes(new Uint8Array(5));
  });
  assertEquals(
    Int32.fromLeBytes(Uint8Vector.from([0x12, 0x34, 0x56, 0x78])).value(),
    new Int32(0x7856_3412n).value(),
  );
  assertEquals(
    Int32.fromLeBytes([0x12, 0x34, 0x56, 0x78]).value(),
    new Int32(0x7856_3412n).value(),
  );
});
