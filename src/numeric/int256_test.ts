import { assertEquals, assertThrows } from "../../depends.ts";

import { Int256 } from "./int256.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

Deno.test("Int256.prototype", () => {
  // constructor
  assertEquals(new Int256().value(), 0n);
  // value()
  assertEquals(
    new Int256(
      0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).value(),
    Int256.min(),
  );
  assertEquals(
    new Int256(
      -0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).value(),
    Int256.min(),
  );
  assertEquals(new Int256(0n).value(), 0n);
  assertEquals(new Int256(-0n).value(), 0n);
  assertEquals(new Int256(Int256.max() + 1n).value(), 0n);
  assertEquals(new Int256(Int256.min() - 1n).value(), 0n);
  // max()
  assertEquals(
    Int256.max(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // min()
  assertEquals(
    Int256.min(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // add()
  assertEquals(new Int256(1n).add(new Int256(2n)).value(), 3n);
  assertEquals(new Int256(Int256.max()).add(new Int256(1n)).value(), 0n);
  assertEquals(new Int256(1n).add(new Int256(-2n)).value(), -1n);
  assertEquals(new Int256(-1n).add(new Int256(2n)).value(), 1n);
  assertEquals(new Int256(-1n).add(new Int256(-2n)).value(), -3n);
  // sub()
  assertEquals(new Int256(3n).sub(new Int256(2n)).value(), 1n);
  assertEquals(new Int256(0n).sub(new Int256(1n)).value(), -1n);
  assertEquals(new Int256(1n).sub(new Int256(-2n)).value(), 3n);
  assertEquals(new Int256(-2n).sub(new Int256(1n)).value(), -3n);
  assertEquals(new Int256(-1n).sub(new Int256(-2n)).value(), 1n);
  // div()
  assertEquals(new Int256(2n).div(new Int256(3n)).value(), 0n);
  assertEquals(new Int256(3n).div(new Int256(2n)).value(), 1n);
  assertEquals(new Int256(4n).div(new Int256(-2n)).value(), -2n);
  assertEquals(new Int256(-4n).div(new Int256(2n)).value(), -2n);
  assertEquals(new Int256(-4n).div(new Int256(-2n)).value(), 2n);
  // mul()
  assertEquals(new Int256(1n).mul(new Int256(2n)).value(), 2n);
  assertEquals(new Int256(1n).mul(new Int256(0n)).value(), 0n);
  assertEquals(new Int256(1n).mul(new Int256(-2n)).value(), -2n);
  assertEquals(new Int256(-1n).mul(new Int256(2n)).value(), -2n);
  assertEquals(new Int256(-1n).mul(new Int256(-2n)).value(), 2n);
  // rem()
  assertEquals(new Int256(2n).rem(new Int256(3n)).value(), 2n);
  assertEquals(new Int256(3n).rem(new Int256(2n)).value(), 1n);
  assertEquals(new Int256(12n).rem(new Int256(-5n)).value(), 2n);
  assertEquals(new Int256(-12n).rem(new Int256(5n)).value(), -2n);
  assertEquals(new Int256(-12n).rem(new Int256(-5n)).value(), -2n);
  // exp()
  assertEquals(new Int256(2n).exp(new Int256(3n)).value(), 8n);
  assertEquals(
    new Int256(Int256.max()).exp(new Int256(1n)).value(),
    Int256.max(),
  );
  assertEquals(new Int256(Int256.max()).exp(new Int256(0n)).value(), 1n);
  assertThrows((): void => {
    new Int256(Int256.max()).exp(new Int256(Int256.max()));
  });
  assertThrows(() => {
    new Int256(2n).exp(new Int256(-5n));
  });
  assertEquals(new Int256(-2n).exp(new Int256(4n)).value(), 16n);
  assertEquals(new Int256(-2n).exp(new Int256(5n)).value(), -32n);
  assertThrows(() => {
    new Int256(-2n).exp(new Int256(-5n));
  });
  // and()
  assertEquals(new Int256(0n).and(new Int256(0n)).value(), 0n);
  assertEquals(new Int256(Int256.max()).and(new Int256(0n)).value(), 0n);
  assertEquals(
    new Int256(Int256.max()).and(new Int256(Int256.max())).value(),
    Int256.max(),
  );
  // or()
  assertEquals(new Int256(0n).or(new Int256(0n)).value(), 0n);
  assertEquals(
    new Int256(Int256.max()).or(new Int256(0n)).value(),
    Int256.max(),
  );
  assertEquals(
    new Int256(Int256.max()).or(new Int256(Int256.max())).value(),
    Int256.max(),
  );
  // xor()
  assertEquals(new Int256(0n).xor(new Int256(0n)).value(), 0n);
  assertEquals(
    new Int256(Int256.max()).xor(new Int256(0n)).value(),
    Int256.max(),
  );
  assertEquals(
    new Int256(Int256.max()).xor(new Int256(Int256.max())).value(),
    0n,
  );
  // not()
  assertEquals(new Int256(0n).not().value(), -1n);
  assertEquals(new Int256(Int256.max()).not().value(), 0n);
  // logicalLeft()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(128n).value(),
    0x3456789012345678_9012345678901234_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(256n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(512n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(1024n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(0n).value(),
    -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(128n).value(),
    0x3456789012345678_9012345678901234_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(129n).value(),
    0x68ACF1202468ACF1_202468ACF1202468_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(256n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(512n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(1024n).value(),
    0n,
  );
  assertEquals(
    new Int256(Int256.max()).logicalLeft(1n).value(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFEn,
  );
  assertEquals(
    new Int256(Int256.min()).logicalLeft(1n).value(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFEn,
  );
  // logicalRight()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(128n).value(),
    0x0000000000000000_0000000000000000_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(256n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(512n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(1024n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(0n).value(),
    -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(128n).value(),
    0x9234567890123456_7890123456789012n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(129n).value(),
    0x491A2B3C48091A2B_3C48091A2B3C4809n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(256n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(512n).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(1024n).value(),
    0n,
  );
  assertEquals(
    new Int256(Int256.max()).logicalRight(1n).value(),
    0x3FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(new Int256(Int256.min()).logicalRight(1n).value(), Int256.max());
  // rotateLeft()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(64n).value(),
    0x7890123456789012_3456789012345678_9012345678901234_1234567890123456n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(128n).value(),
    0x3456789012345678_9012345678901234_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(256n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(512n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(1024n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  // rotateRight()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(64n).value(),
    -0x1012345678901234_1234567890123456_7890123456789012_3456789012345678n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(128n).value(),
    0x3456789012345678_9012345678901234_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(256n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(512n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(1024n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  // toBeBytes()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toBeBytes(),
    Uint8Vector.from([
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
    ]),
  );
  assertEquals(
    new Int256(Int256.max()).toBeBytes(),
    Uint8Vector.from(
      [
        0x7F,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
      ],
    ),
  );
  assertEquals(new Int256(0n).toBeBytes(), new Uint8Vector(32));
  // toLeBytes()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toLeBytes(),
    Uint8Vector.from([
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
    ]),
  );
  assertEquals(
    new Int256(Int256.max()).toLeBytes(),
    Uint8Vector.from(
      [
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0x7F,
      ],
    ),
  );
  assertEquals(new Int256(0n).toLeBytes(), new Uint8Vector(32));
});

Deno.test("Int256", () => {
  // fromBeBytes()
  assertEquals(
    Int256.fromBeBytes(
      Uint8Array.from([
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
      ]),
    ).value(),
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).value(),
  );
  assertEquals(
    Int256.fromBeBytes(
      new Uint8Array(
        [
          0x7F,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
        ],
      ),
    ).value(),
    Int256.max(),
  );
  assertEquals(Int256.fromBeBytes(new Uint8Array(32)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int256.fromBeBytes(new Uint8Array(33));
  });
  assertEquals(
    Int256.fromBeBytes(
      Uint8Vector.from([
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
      ]),
    ).value(),
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).value(),
  );
  assertEquals(
    Int256.fromBeBytes([
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
    ]).value(),
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).value(),
  );
  // fromLeBytes()
  assertEquals(
    Int256.fromLeBytes(
      Uint8Array.from([
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
      ]),
    ).value(),
    new Int256(
      0x3412907856341290_7856341290785634_1290785634129078_5634129078563412n,
    ).value(),
  );
  assertEquals(
    Int256.fromLeBytes(
      new Uint8Array(
        [
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0xFF,
          0x7F,
        ],
      ),
    ).value(),
    Int256.max(),
  );
  assertEquals(Int256.fromLeBytes(new Uint8Array(32)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int256.fromLeBytes(new Uint8Array(33));
  });
  assertEquals(
    Int256.fromLeBytes(
      Uint8Vector.from([
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
        0x56,
        0x78,
        0x90,
        0x12,
        0x34,
      ]),
    ).value(),
    new Int256(
      0x3412907856341290_7856341290785634_1290785634129078_5634129078563412n,
    ).value(),
  );
  assertEquals(
    Int256.fromLeBytes([
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
    ]).value(),
    new Int256(
      0x3412907856341290_7856341290785634_1290785634129078_5634129078563412n,
    ).value(),
  );
});
