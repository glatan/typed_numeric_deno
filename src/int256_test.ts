import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Int256 } from "./int256.ts";

Deno.test("Int256", () => {
  // value()
  assertEquals(
    new Int256(
      0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).value(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(
    new Int256(
      -0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).value(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(new Int256(0n).value(), 0n);
  assertEquals(new Int256(-0n).value(), 0n);
  assertEquals(
    new Int256(
      0x8000000000000000_0000000000000000_0000000000000000_0000000000000000n,
    ).value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x8000000000000000_0000000000000000_0000000000000000_0000000000000000n,
    ).value(),
    0n,
  );
  // max()
  assertEquals(
    Int256.prototype.max(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // min()
  assertEquals(
    Int256.prototype.min(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // add()
  assertEquals(new Int256(1n).add(new Int256(2n)).value(), 3n);
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).add(new Int256(1n))
      .value(),
    0n,
  );
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
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).exp(new Int256(1n))
      .value(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).exp(new Int256(0n))
      .value(),
    1n,
  );
  assertThrows((): void => {
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).exp(
      new Int256(
        0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
      ),
    );
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
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).and(new Int256(0n))
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).and(
      new Int256(
        0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
      ),
    )
      .value(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // or()
  assertEquals(new Int256(0n).or(new Int256(0n)).value(), 0n);
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).or(new Int256(0n))
      .value(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).or(
      new Int256(
        0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
      ),
    ).value(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // xor()
  assertEquals(new Int256(0n).xor(new Int256(0n)).value(), 0n);
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).xor(new Int256(0n))
      .value(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).xor(
      new Int256(
        0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
      ),
    )
      .value(),
    0n,
  );
  // not()
  assertEquals(new Int256(0n).not().value(), -1n);
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).not().value(),
    0n,
  );
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
    ).logicalLeft(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(1024n)
      .value(),
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
    ).logicalLeft(128n)
      .value(),
    0x3456789012345678_9012345678901234_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(129n)
      .value(),
    0x68ACF1202468ACF1_202468ACF1202468_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(1024n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).logicalLeft(1n).value(),
    -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFEn,
  );
  assertEquals(
    new Int256(
      -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).logicalLeft(1n).value(),
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
    ).logicalRight(128n)
      .value(),
    0x0000000000000000_0000000000000000_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(1024n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(0n)
      .value(),
    -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(128n)
      .value(),
    0x9234567890123456_7890123456789012n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(129n)
      .value(),
    0x491A2B3C48091A2B_3C48091A2B3C4809n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      -0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(1024n)
      .value(),
    0n,
  );
  assertEquals(
    new Int256(
      0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).logicalRight(1n).value(),
    0x3FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  assertEquals(
    new Int256(
      -0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
    ).logicalRight(1n)
      .value(),
    0x7FFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
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
    ).rotateRight(256n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(512n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(1024n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
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
    Int256.prototype.max(),
  );
  assertEquals(
    Int256.fromBeBytes(new Uint8Array(32)).value(),
    0n,
  );
  assertThrows((): void => {
    // Invalid Length
    Int256.fromBeBytes(new Uint8Array(33));
  });
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
    Int256.prototype.max(),
  );
  assertEquals(
    Int256.fromLeBytes(new Uint8Array(32)).value(),
    0n,
  );
  assertThrows((): void => {
    // Invalid Length
    Int256.fromLeBytes(new Uint8Array(33));
  });
  // toBeBytes()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toBeBytes(),
    new Uint8Array([
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
    new Int256(Int256.prototype.max()).toBeBytes(),
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
  );
  assertEquals(
    new Int256(0n).toBeBytes(),
    new Uint8Array(32),
  );
  // toLeBytes()
  assertEquals(
    new Int256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toLeBytes(),
    new Uint8Array([
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
    new Int256(Int256.prototype.max()).toLeBytes(),
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
  );
  assertEquals(
    new Int256(0n).toLeBytes(),
    new Uint8Array(32),
  );
});
