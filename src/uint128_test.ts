import { assertEquals, assertThrows } from "../depends.ts";

import { Uint128 } from "./uint128.ts";

Deno.test("Uint128", () => {
  // constructor
  assertEquals(new Uint128().value(), 0n);
  // value()
  assertEquals(new Uint128(Uint128.max() + 1n).value(), Uint128.min());
  assertEquals(new Uint128(Uint128.min() - 1n).value(), Uint128.max());
  // max()
  assertEquals(Uint128.max(), 0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFFn);
  // min()
  assertEquals(Uint128.min(), 0n);
  // add()
  assertEquals(new Uint128(1n).add(new Uint128(2n)).value(), 3n);
  assertEquals(
    new Uint128(Uint128.max()).add(new Uint128(1n)).value(),
    Uint128.min(),
  );
  // sub()
  assertEquals(new Uint128(3n).sub(new Uint128(2n)).value(), 1n);
  assertEquals(
    new Uint128(Uint128.min()).sub(new Uint128(1n)).value(),
    Uint128.max(),
  );
  // div()
  assertEquals(new Uint128(2n).div(new Uint128(3n)).value(), Uint128.min());
  assertEquals(new Uint128(3n).div(new Uint128(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint128(1n).mul(new Uint128(2n)).value(), 2n);
  assertEquals(
    new Uint128(1n).mul(new Uint128(Uint128.min())).value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(Uint128.max()).mul(new Uint128(Uint128.max())).value(),
    1n,
  );
  // rem()
  assertEquals(new Uint128(2n).rem(new Uint128(3n)).value(), 2n);
  assertEquals(new Uint128(3n).rem(new Uint128(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint128(2n).exp(new Uint128(3n)).value(), 8n);
  assertEquals(
    new Uint128(Uint128.max()).exp(new Uint128(1n)).value(),
    Uint128.max(),
  );
  assertEquals(
    new Uint128(Uint128.max()).exp(new Uint128(Uint128.min())).value(),
    1n,
  );
  assertThrows((): void => {
    // Uncaught RangeError: Maximum BigInt size exceeded
    new Uint128(Uint128.max()).exp(new Uint128(Uint128.max()));
  });
  // and()
  assertEquals(
    new Uint128(Uint128.min()).and(new Uint128(Uint128.min())).value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(Uint128.max()).and(new Uint128(Uint128.min())).value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(Uint128.max()).and(new Uint128(Uint128.max())).value(),
    Uint128.max(),
  );
  // or()
  assertEquals(
    new Uint128(Uint128.min()).or(new Uint128(Uint128.min())).value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(Uint128.max()).or(new Uint128(Uint128.min())).value(),
    Uint128.max(),
  );
  assertEquals(
    new Uint128(Uint128.max()).or(new Uint128(Uint128.max())).value(),
    Uint128.max(),
  );
  // xor()
  assertEquals(
    new Uint128(Uint128.min()).xor(new Uint128(Uint128.min())).value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(Uint128.max()).xor(new Uint128(Uint128.min())).value(),
    Uint128.max(),
  );
  assertEquals(
    new Uint128(Uint128.max()).xor(new Uint128(Uint128.max())).value(),
    Uint128.min(),
  );
  // not()
  assertEquals(new Uint128(Uint128.min()).not().value(), Uint128.max());
  assertEquals(new Uint128(Uint128.max()).not().value(), Uint128.min());
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
    Uint128.min(),
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(256n)
      .value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalLeft(512n)
      .value(),
    Uint128.min(),
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
    0x12345678_90123456n,
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(128n)
      .value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(256n)
      .value(),
    Uint128.min(),
  );
  assertEquals(
    new Uint128(0x12345678_90123456_78901234_56789012n).logicalRight(512n)
      .value(),
    Uint128.min(),
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
  // fromBeBytes()
  assertEquals(
    Uint128.fromBeBytes(
      Uint8Array.from(
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
    ).value(),
    new Uint128(0x12345678_90123456_78901234_56789012n).value(),
  );
  assertEquals(
    Uint128.fromBeBytes(new Uint8Array(16).fill(0xFF)).value(),
    Uint128.max(),
  );
  assertEquals(Uint128.fromBeBytes(new Uint8Array(16)).value(), Uint128.min());
  assertThrows((): void => {
    // Invalid Length
    Uint128.fromBeBytes(new Uint8Array(17));
  });
  // fromLeBytes()
  assertEquals(
    Uint128.fromLeBytes(
      Uint8Array.from(
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
    ).value(),
    new Uint128(0x12907856_34129078_56341290_78563412n).value(),
  );
  assertEquals(
    Uint128.fromLeBytes(new Uint8Array(16).fill(0xFF)).value(),
    Uint128.max(),
  );
  assertEquals(Uint128.fromLeBytes(new Uint8Array(16)).value(), Uint128.min());
  assertThrows((): void => {
    // Invalid Length
    Uint128.fromLeBytes(new Uint8Array(17));
  });
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
    new Uint128(Uint128.max()).toBeBytes(),
    new Uint8Array(16).fill(0xFF),
  );
  assertEquals(new Uint128(Uint128.min()).toBeBytes(), new Uint8Array(16));
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
    new Uint128(Uint128.max()).toLeBytes(),
    new Uint8Array(16).fill(0xFF),
  );
  assertEquals(new Uint128(Uint128.min()).toLeBytes(), new Uint8Array(16));
});
