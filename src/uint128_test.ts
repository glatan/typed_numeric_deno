import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint128 } from "./uint128.ts";

Deno.test("Uint128", () => {
  // value()
  assertEquals(
    new Uint128(0x1_00000000_00000000_00000000_00000000n).value(),
    0n,
  );
  assertEquals(new Uint128(0n).value(), 0n);
  assertEquals(new Uint128(-1n).value(), Uint128.prototype.max());
  // max()
  assertEquals(Uint128.prototype.max(), 0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn);
  // min()
  assertEquals(Uint128.prototype.min(), 0n);
  // add()
  assertEquals(new Uint128(1n).add(new Uint128(2n)).value(), 3n);
  assertEquals(
    new Uint128(Uint128.prototype.max()).add(new Uint128(1n)).value(),
    0n,
  );
  // sub()
  assertEquals(new Uint128(3n).sub(new Uint128(2n)).value(), 1n);
  assertEquals(
    new Uint128(0n).sub(new Uint128(1n)).value(),
    Uint128.prototype.max(),
  );
  // div()
  assertEquals(new Uint128(2n).div(new Uint128(3n)).value(), 0n);
  assertEquals(new Uint128(3n).div(new Uint128(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint128(1n).mul(new Uint128(2n)).value(), 2n);
  assertEquals(new Uint128(1n).mul(new Uint128(0n)).value(), 0n);
  assertEquals(
    new Uint128(Uint128.prototype.max()).mul(
      new Uint128(Uint128.prototype.max()),
    )
      .value(),
    1n,
  );
  // rem()
  assertEquals(new Uint128(2n).rem(new Uint128(3n)).value(), 2n);
  assertEquals(new Uint128(3n).rem(new Uint128(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint128(2n).exp(new Uint128(3n)).value(), 8n);
  assertEquals(
    new Uint128(Uint128.prototype.max()).exp(new Uint128(1n)).value(),
    Uint128.prototype.max(),
  );
  assertEquals(
    new Uint128(Uint128.prototype.max()).exp(new Uint128(0n)).value(),
    1n,
  );
  assertThrows((): void => {
    // Uncaught RangeError: Maximum BigInt size exceeded
    new Uint128(Uint128.prototype.max()).exp(
      new Uint128(Uint128.prototype.max()),
    );
  });
  // and()
  assertEquals(new Uint128(0n).and(new Uint128(0n)).value(), 0n);
  assertEquals(
    new Uint128(Uint128.prototype.max()).and(new Uint128(0n)).value(),
    0n,
  );
  assertEquals(
    new Uint128(Uint128.prototype.max()).and(
      new Uint128(Uint128.prototype.max()),
    )
      .value(),
    Uint128.prototype.max(),
  );
  // or()
  assertEquals(new Uint128(0n).or(new Uint128(0n)).value(), 0n);
  assertEquals(
    new Uint128(Uint128.prototype.max()).or(new Uint128(0n)).value(),
    Uint128.prototype.max(),
  );
  assertEquals(
    new Uint128(Uint128.prototype.max()).or(
      new Uint128(Uint128.prototype.max()),
    )
      .value(),
    Uint128.prototype.max(),
  );
  // xor()
  assertEquals(new Uint128(0n).xor(new Uint128(0n)).value(), 0n);
  assertEquals(
    new Uint128(Uint128.prototype.max()).xor(new Uint128(0n)).value(),
    Uint128.prototype.max(),
  );
  assertEquals(
    new Uint128(Uint128.prototype.max()).xor(
      new Uint128(Uint128.prototype.max()),
    )
      .value(),
    0n,
  );
  // not()
  assertEquals(new Uint128(0n).not().value(), Uint128.prototype.max());
  assertEquals(new Uint128(Uint128.prototype.max()).not().value(), 0n);
  // logicalLeft()
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(64n)
      .value(),
    0x78901234_56789012_00000000_00000000n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(128n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(512n)
      .value(),
    0n,
  );
  // logicalRight()
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(0n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(64n)
      .value(),
    0x00000000_00000000_12345678_90123456n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(128n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(512n)
      .value(),
    0n,
  );
  // rotateLeft()
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateLeft(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateLeft(64n).value(),
    0x78901234_56789012_12345678_90123456n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateLeft(128n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateLeft(256n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  // rotateRight()
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateRight(0n).value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateRight(64n)
      .value(),
    0x78901234_56789012_12345678_90123456n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateRight(128n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).rotateRight(256n)
      .value(),
    0x12345678_90123456_78901234_56789012n,
  );
  // toBeBytes()
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).toBeBytes(),
    new Uint8Array(
      [
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
      ],
    ),
  );
  assertEquals(
    new Uint128(0n).toBeBytes(),
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  );
  // toLeBytes()
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).toLeBytes(),
    new Uint8Array(
      [
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
      ],
    ),
  );
  assertEquals(
    new Uint128(0n).toBeBytes(),
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  );
});
