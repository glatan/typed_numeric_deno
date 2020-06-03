import { assertEquals, assertThrows } from "../../depends.ts";

import { Int128 } from "./int128.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

Deno.test("Int128", () => {
  // constructor
  assertEquals(new Int128().value(), 0n);
  // value()
  assertEquals(
    new Int128(0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn).value(),
    Int128.min(),
  );
  assertEquals(
    new Int128(-0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn).value(),
    Int128.min(),
  );
  assertEquals(new Int128(0n).value(), 0n);
  assertEquals(new Int128(-0n).value(), 0n);
  assertEquals(new Int128(Int128.max() + 1n).value(), 0n);
  assertEquals(new Int128(Int128.min() - 1n).value(), 0n);
  // max()
  assertEquals(Int128.max(), 0x7FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn);
  // min()
  assertEquals(Int128.min(), -0x7FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn);
  // add()
  assertEquals(new Int128(1n).add(new Int128(2n)).value(), 3n);
  assertEquals(
    new Int128(Int128.max()).add(new Int128(1n))
      .value(),
    0n,
  );
  assertEquals(new Int128(1n).add(new Int128(-2n)).value(), -1n);
  assertEquals(new Int128(-1n).add(new Int128(2n)).value(), 1n);
  assertEquals(new Int128(-1n).add(new Int128(-2n)).value(), -3n);
  // sub()
  assertEquals(new Int128(3n).sub(new Int128(2n)).value(), 1n);
  assertEquals(new Int128(0n).sub(new Int128(1n)).value(), -1n);
  assertEquals(new Int128(1n).sub(new Int128(-2n)).value(), 3n);
  assertEquals(new Int128(-2n).sub(new Int128(1n)).value(), -3n);
  assertEquals(new Int128(-1n).sub(new Int128(-2n)).value(), 1n);
  // div()
  assertEquals(new Int128(2n).div(new Int128(3n)).value(), 0n);
  assertEquals(new Int128(3n).div(new Int128(2n)).value(), 1n);
  assertEquals(new Int128(4n).div(new Int128(-2n)).value(), -2n);
  assertEquals(new Int128(-4n).div(new Int128(2n)).value(), -2n);
  assertEquals(new Int128(-4n).div(new Int128(-2n)).value(), 2n);
  // mul()
  assertEquals(new Int128(1n).mul(new Int128(2n)).value(), 2n);
  assertEquals(new Int128(1n).mul(new Int128(0n)).value(), 0n);
  assertEquals(new Int128(1n).mul(new Int128(-2n)).value(), -2n);
  assertEquals(new Int128(-1n).mul(new Int128(2n)).value(), -2n);
  assertEquals(new Int128(-1n).mul(new Int128(-2n)).value(), 2n);
  // rem()
  assertEquals(new Int128(2n).rem(new Int128(3n)).value(), 2n);
  assertEquals(new Int128(3n).rem(new Int128(2n)).value(), 1n);
  assertEquals(new Int128(12n).rem(new Int128(-5n)).value(), 2n);
  assertEquals(new Int128(-12n).rem(new Int128(5n)).value(), -2n);
  assertEquals(new Int128(-12n).rem(new Int128(-5n)).value(), -2n);
  // exp()
  assertEquals(new Int128(2n).exp(new Int128(3n)).value(), 8n);
  assertEquals(
    new Int128(Int128.max()).exp(new Int128(1n))
      .value(),
    Int128.max(),
  );
  assertEquals(
    new Int128(Int128.max()).exp(new Int128(0n))
      .value(),
    1n,
  );
  assertThrows((): void => {
    new Int128(Int128.max()).exp(
      new Int128(Int128.max()),
    );
  });
  assertThrows(() => {
    new Int128(2n).exp(new Int128(-5n));
  });
  assertEquals(new Int128(-2n).exp(new Int128(4n)).value(), 16n);
  assertEquals(new Int128(-2n).exp(new Int128(5n)).value(), -32n);
  assertThrows(() => {
    new Int128(-2n).exp(new Int128(-5n));
  });
  // and()
  assertEquals(new Int128(0n).and(new Int128(0n)).value(), 0n);
  assertEquals(
    new Int128(Int128.max()).and(new Int128(0n))
      .value(),
    0n,
  );
  assertEquals(
    new Int128(Int128.max()).and(
      new Int128(Int128.max()),
    )
      .value(),
    Int128.max(),
  );
  // or()
  assertEquals(new Int128(0n).or(new Int128(0n)).value(), 0n);
  assertEquals(
    new Int128(Int128.max()).or(new Int128(0n))
      .value(),
    Int128.max(),
  );
  assertEquals(
    new Int128(Int128.max()).or(
      new Int128(Int128.max()),
    ).value(),
    Int128.max(),
  );
  // xor()
  assertEquals(new Int128(0n).xor(new Int128(0n)).value(), 0n);
  assertEquals(
    new Int128(Int128.max()).xor(new Int128(0n))
      .value(),
    Int128.max(),
  );
  assertEquals(
    new Int128(Int128.max()).xor(
      new Int128(Int128.max()),
    )
      .value(),
    0n,
  );
  // not()
  assertEquals(new Int128(0n).not().value(), -1n);
  assertEquals(
    new Int128(Int128.max()).not().value(),
    0n,
  );
  // logicalLeft()
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalLeft(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalLeft(64n).value(),
    0x78901234_56789012_00000000_00000000n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalLeft(128n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalLeft(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalLeft(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalLeft(0n).value(),
    -0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalLeft(64n)
      .value(),
    0x78901234_56789012_00000000_00000000n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalLeft(65n)
      .value(),
    -0x71202468_ACF12024_00000000_00000000n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalLeft(128n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalLeft(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalLeft(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(Int128.max()).logicalLeft(1n).value(),
    -0x7FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFEn,
  );
  assertEquals(
    new Int128(Int128.min()).logicalLeft(1n).value(),
    -0x7FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFEn,
  );
  // logicalRight()
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalRight(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalRight(64n)
      .value(),
    0x12345678_90123456n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalRight(128n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalRight(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).logicalRight(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalRight(0n)
      .value(),
    -0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalRight(64n)
      .value(),
    0x92345678_90123456n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalRight(65n)
      .value(),
    0x491A2B3C_48091A2Bn,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalRight(128n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalRight(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(-0x12345678_90123456_78901234_56789012n).logicalRight(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Int128(Int128.max()).logicalRight(1n).value(),
    0x3FFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn,
  );
  assertEquals(
    new Int128(Int128.min()).logicalRight(1n)
      .value(),
    Int128.max(),
  );
  // rotateLeft()
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateLeft(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateLeft(32n).value(),
    -0x10123456_78901234_56789012_12345678n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateLeft(64n).value(),
    0x78901234_56789012_12345678_90123456n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateLeft(128n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateLeft(256n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateLeft(512n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  // rotateRight()
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateRight(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateRight(32n).value(),
    0x56789012_12345678_90123456_78901234n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateRight(64n).value(),
    0x78901234_56789012_12345678_90123456n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateRight(128n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateRight(256n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).rotateRight(512n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  // fromBeBytes()
  assertEquals(
    Int128.fromBeBytes(
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
      ]),
    ).value(),
    new Int128(0x12345678_90123456_78901234_56789012n).value(),
  );
  assertEquals(
    Int128.fromBeBytes(
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
        ],
      ),
    ).value(),
    Int128.max(),
  );
  assertEquals(Int128.fromBeBytes(new Uint8Array(16)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int128.fromBeBytes(new Uint8Array(17));
  });
  // fromLeBytes()
  assertEquals(
    Int128.fromLeBytes(
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
      ]),
    ).value(),
    new Int128(0x12907856_34129078_56341290_78563412n).value(),
  );
  assertEquals(
    Int128.fromLeBytes(
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
          0x7F,
        ],
      ),
    ).value(),
    Int128.max(),
  );
  assertEquals(Int128.fromLeBytes(new Uint8Array(16)).value(), 0n);
  assertThrows((): void => {
    // Invalid Length
    Int128.fromLeBytes(new Uint8Array(17));
  });
  // toBeBytes()
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).toBeBytes(),
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
    ]),
  );
  assertEquals(
    new Int128(Int128.max()).toBeBytes(),
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
      ],
    ),
  );
  assertEquals(new Int128(0n).toBeBytes(), new Uint8Vector(16));
  // toLeBytes()
  assertEquals(
    new Int128(0x12345678_90123456_78901234_56789012n).toLeBytes(),
    Uint8Vector.from([
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
    new Int128(Int128.max()).toLeBytes(),
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
        0x7F,
      ],
    ),
  );
  assertEquals(new Int128(0n).toLeBytes(), new Uint8Vector(16));
});
