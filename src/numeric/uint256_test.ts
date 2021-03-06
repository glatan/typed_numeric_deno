import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint256 } from "./uint256.ts";
import { Uint8Vector } from "../vector/uint8vector.ts";

Deno.test("Uint256.prototype", () => {
  // constructor
  assertEquals(new Uint256().value(), 0n);
  // value()
  assertEquals(new Uint256(Uint256.max() + 1n).value(), Uint256.min());
  assertEquals(new Uint256(Uint256.min() - 1n).value(), Uint256.max());
  // max()
  assertEquals(
    Uint256.max(),
    0xFFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFF_FFFFFFFFFFFFFFFFn,
  );
  // min()
  assertEquals(Uint256.min(), Uint256.min());
  // add()
  assertEquals(new Uint256(1n).add(new Uint256(2n)).value(), 3n);
  assertEquals(
    new Uint256(Uint256.max()).add(new Uint256(1n)).value(),
    Uint256.min(),
  );
  // sub()
  assertEquals(new Uint256(3n).sub(new Uint256(2n)).value(), 1n);
  assertEquals(
    new Uint256(Uint256.min()).sub(new Uint256(1n)).value(),
    Uint256.max(),
  );
  // div()
  assertEquals(new Uint256(2n).div(new Uint256(3n)).value(), Uint256.min());
  assertEquals(new Uint256(3n).div(new Uint256(2n)).value(), 1n);
  // mul()
  assertEquals(new Uint256(1n).mul(new Uint256(2n)).value(), 2n);
  assertEquals(
    new Uint256(1n).mul(new Uint256(Uint256.min())).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(Uint256.max()).mul(new Uint256(Uint256.max())).value(),
    1n,
  );
  // rem()
  assertEquals(new Uint256(2n).rem(new Uint256(3n)).value(), 2n);
  assertEquals(new Uint256(3n).rem(new Uint256(2n)).value(), 1n);
  // exp()
  assertEquals(new Uint256(2n).exp(new Uint256(3n)).value(), 8n);
  assertEquals(
    new Uint256(Uint256.max()).exp(new Uint256(1n)).value(),
    Uint256.max(),
  );
  assertEquals(
    new Uint256(Uint256.max()).exp(new Uint256(Uint256.min())).value(),
    1n,
  );
  assertThrows((): void => {
    // Uncaught RangeError: Maximum BigInt size exceeded
    new Uint256(Uint256.max()).exp(new Uint256(Uint256.max()));
  });
  // and()
  assertEquals(
    new Uint256(Uint256.min()).and(new Uint256(Uint256.min())).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(Uint256.max()).and(new Uint256(Uint256.min())).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(Uint256.max()).and(new Uint256(Uint256.max())).value(),
    Uint256.max(),
  );
  // or()
  assertEquals(
    new Uint256(Uint256.min()).or(new Uint256(Uint256.min())).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(Uint256.max()).or(new Uint256(Uint256.min())).value(),
    Uint256.max(),
  );
  assertEquals(
    new Uint256(Uint256.max()).or(new Uint256(Uint256.max())).value(),
    Uint256.max(),
  );
  // xor()
  assertEquals(
    new Uint256(Uint256.min()).xor(new Uint256(Uint256.min())).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(Uint256.max()).xor(new Uint256(Uint256.min())).value(),
    Uint256.max(),
  );
  assertEquals(
    new Uint256(Uint256.max()).xor(new Uint256(Uint256.max())).value(),
    Uint256.min(),
  );
  // not()
  assertEquals(new Uint256(Uint256.min()).not().value(), Uint256.max());
  assertEquals(new Uint256(Uint256.max()).not().value(), Uint256.min());
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
    ).logicalLeft(128n).value(),
    0x3456789012345678_9012345678901234_0000000000000000_0000000000000000n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(256n).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(512n).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalLeft(1024n).value(),
    Uint256.min(),
  );
  // logicalRight()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(0n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(128n).value(),
    0x1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(256n).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(512n).value(),
    Uint256.min(),
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).logicalRight(1024n).value(),
    Uint256.min(),
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
    ).rotateLeft(256n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateLeft(512n).value(),
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
    ).rotateRight(128n).value(),
    0x3456789012345678_9012345678901234_1234567890123456_7890123456789012n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(256n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).rotateRight(512n).value(),
    0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
  );
  // toBeBytes()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toBeBytes(),
    Uint8Vector.from(
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
    new Uint256(Uint256.max()).toBeBytes(),
    new Uint8Vector(32).fill(0xFF),
  );
  assertEquals(
    new Uint256(Uint256.min()).toBeBytes(),
    new Uint8Vector(32),
  );
  // toLeBytes()
  assertEquals(
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).toLeBytes(),
    Uint8Vector.from(
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
    new Uint256(Uint256.max()).toLeBytes(),
    new Uint8Vector(32).fill(0xFF),
  );
  assertEquals(
    new Uint256(Uint256.min()).toLeBytes(),
    new Uint8Vector(32).fill(0),
  );
});

Deno.test("Uint256", () => {
  // fromBeBytes()
  assertEquals(
    Uint256.fromBeBytes(
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
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).value(),
  );
  assertEquals(
    Uint256.fromBeBytes(new Uint8Array(32).fill(0xFF)).value(),
    Uint256.max(),
  );
  assertEquals(Uint256.fromBeBytes(new Uint8Array(32)).value(), Uint256.min());
  assertThrows((): void => {
    // Invalid Length
    Uint256.fromBeBytes(new Uint8Array(33));
  });
  assertEquals(
    Uint256.fromBeBytes(
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
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).value(),
  );
  assertEquals(
    Uint256.fromBeBytes([
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
    new Uint256(
      0x1234567890123456_7890123456789012_3456789012345678_9012345678901234n,
    ).value(),
  );
  // fromLeBytes()
  assertEquals(
    Uint256.fromLeBytes(
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
    new Uint256(
      0x3412907856341290_7856341290785634_1290785634129078_5634129078563412n,
    ).value(),
  );
  assertEquals(
    Uint256.fromLeBytes(new Uint8Array(32).fill(0xFF)).value(),
    Uint256.max(),
  );
  assertEquals(Uint256.fromLeBytes(new Uint8Array(32)).value(), Uint256.min());
  assertThrows((): void => {
    // Invalid Length
    Uint256.fromLeBytes(new Uint8Array(33));
  });
  assertEquals(
    Uint256.fromLeBytes(
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
    new Uint256(
      0x3412907856341290_7856341290785634_1290785634129078_5634129078563412n,
    ).value(),
  );
  assertEquals(
    Uint256.fromLeBytes([
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
    new Uint256(
      0x3412907856341290_7856341290785634_1290785634129078_5634129078563412n,
    ).value(),
  );
});
