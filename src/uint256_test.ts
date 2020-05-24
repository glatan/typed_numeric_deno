import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.52.0/testing/asserts.ts";

import { Uint256 } from "./uint256.ts";

Deno.test("Uint256", () => {
  // value()
  assertEquals(
    new Uint256(
      0x1_0000000000000000_0000000000000000_0000000000000000_0000000000000000n,
    ).value(),
    0n,
  );
  assertEquals(new Uint256(0n).value(), 0n);
  assertEquals(new Uint256(-1n).value(), Uint256.prototype.max());
  // max()
  assertEquals(
    Uint256.prototype.max(),
    0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // min()
  assertEquals(Uint256.prototype.min(), 0n);
  // add()
  assertEquals(new Uint256(1n).add(new Uint256(2n)).value(), 3n);
  assertEquals(
    new Uint256(Uint256.prototype.max()).add(new Uint256(1n)).value(),
    0n,
  );
  // sub()
  assertEquals(new Uint256(3n).sub(new Uint256(2n)).value(), 1n);
  assertEquals(
    new Uint256(0n).sub(new Uint256(1n)).value(),
    Uint256.prototype.max(),
  );
  // div()
  assertEquals(new Uint256(2n).div(new Uint256(3n)).value(), 0n);
  assertEquals(new Uint256(3n).div(new Uint256(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint256(1n).mul(new Uint256(2n)).value(), 2n);
  assertEquals(new Uint256(1n).mul(new Uint256(0n)).value(), 0n);
  assertEquals(
    new Uint256(Uint256.prototype.max()).mul(
      new Uint256(Uint256.prototype.max()),
    )
      .value(),
    1n,
  );
  // rem()
  assertEquals(new Uint256(2n).rem(new Uint256(3n)).value(), 2n);
  assertEquals(new Uint256(3n).rem(new Uint256(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint256(2n).exp(new Uint256(3n)).value(), 8n);
  assertEquals(
    new Uint256(Uint256.prototype.max()).exp(new Uint256(1n)).value(),
    Uint256.prototype.max(),
  );
  assertEquals(
    new Uint256(Uint256.prototype.max()).exp(new Uint256(0n)).value(),
    1n,
  );
  assertThrows((): void => {
    // Uncaught RangeError: Maximum BigInt size exceeded
    new Uint256(Uint256.prototype.max()).exp(
      new Uint256(Uint256.prototype.max()),
    );
  });
  // and()
  assertEquals(new Uint256(0n).and(new Uint256(0n)).value(), 0n);
  assertEquals(
    new Uint256(Uint256.prototype.max()).and(new Uint256(0n)).value(),
    0n,
  );
  assertEquals(
    new Uint256(Uint256.prototype.max()).and(
      new Uint256(Uint256.prototype.max()),
    )
      .value(),
    Uint256.prototype.max(),
  );
  // or()
  assertEquals(new Uint256(0n).or(new Uint256(0n)).value(), 0n);
  assertEquals(
    new Uint256(Uint256.prototype.max()).or(new Uint256(0n)).value(),
    Uint256.prototype.max(),
  );
  assertEquals(
    new Uint256(Uint256.prototype.max()).or(
      new Uint256(Uint256.prototype.max()),
    )
      .value(),
    Uint256.prototype.max(),
  );
  // xor()
  assertEquals(new Uint256(0n).xor(new Uint256(0n)).value(), 0n);
  assertEquals(
    new Uint256(Uint256.prototype.max()).xor(new Uint256(0n)).value(),
    Uint256.prototype.max(),
  );
  assertEquals(
    new Uint256(Uint256.prototype.max()).xor(
      new Uint256(Uint256.prototype.max()),
    )
      .value(),
    0n,
  );
  // not()
  assertEquals(new Uint256(0n).not().value(), Uint256.prototype.max());
  assertEquals(new Uint256(Uint256.prototype.max()).not().value(), 0n);
  // logicalLeft()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(128n)
      .value(),
    0x3456789012345678_9012345678901234_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(1024n)
      .value(),
    0n,
  );
  // logicalRight()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(0n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(128n)
      .value(),
    0x0000000000000000_0000000000000000_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(256n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(512n)
      .value(),
    0n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(1024n)
      .value(),
    0n,
  );
  // rotateLeft()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(128n).value(),
    0x3456789012345678_9012345678901234_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(256n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(512n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  // rotateRight()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(128n)
      .value(),
    0x3456789012345678_9012345678901234_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(256n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(512n)
      .value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  // toBeBytes()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toBeBytes(),
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
      ],
    ),
  );
  assertEquals(
    new Uint256(0n).toBeBytes(),
    new Uint8Array(
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ),
  );
  // toLeBytes()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toLeBytes(),
    new Uint8Array(
      [
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
      ],
    ),
  );
  assertEquals(
    new Uint256(0n).toBeBytes(),
    new Uint8Array(
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ),
  );
});
