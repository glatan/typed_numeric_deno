import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint8 } from "../numeric/uint8.ts";
import { Uint32 } from "../numeric/uint32.ts";
import { Uint8Vector } from "./uint8vector.ts";
import { Uint32Vector } from "./uint32vector.ts";

Deno.test("Uint32Vector.prototype", () => {
  // constructor
  assertEquals(new Uint32Vector().length, new Uint32Vector(0).length);
  // Uint32Vector from Array<Uint32>
  assertEquals(
    new Uint32Vector(Array.from([new Uint32(Uint32.max())])).value_by_index(0)
      .value(),
    Uint32.max(),
  );
  const vec = new Uint32Vector(2);
  assertEquals(vec.length, 2);
  // value_by_index
  assertEquals(vec.value_by_index(0).value(), 0n);
  assertEquals(vec.value_by_index(1).value(), 0n);
  assertThrows(() => {
    // Index out of range
    vec.value_by_index(2);
  });
  assertThrows(() => {
    // This Vector<T> is empty.
    new Uint32Vector(0).value_by_index(0);
  });
  // copyWithin
  assertEquals(
    Uint32Vector.from(new Uint32Array([12, 34, 56, 78])).copyWithin(
      0,
      0,
      1,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, 0, 1),
  );
  assertEquals(
    Uint32Vector.from(new Uint32Array([12, 34, 56, 78])).copyWithin(
      0,
      -2,
      5,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, -2, 5),
  );
  // concat
  const concatVector = Uint32Vector.from(
    new Uint32Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Uint32Vector.from(new Uint32Array([90, 0xAB, 0xCD, 0xEF])),
    ).toTypedArray(),
    Uint32Array.from(concatArray.concat([90, 0xAB, 0xCD, 0xEF])),
  );
  // toBeBytes
  assertEquals(
    Uint32Vector.of(0x1234_5678n, 0x9012_3456n).toBeBytes(),
    Uint8Vector.of(0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56),
  );
  assertEquals(
    new Uint32Vector().toBeBytes(),
    new Uint8Vector(),
  );
  assertEquals(
    new Uint32Vector().fill(Uint32.max()).toBeBytes(),
    new Uint8Vector().fill(Uint8.max()),
  );
  // toLeBytes
  assertEquals(
    Uint32Vector.of(0x1234_5678n, 0x9012_3456n).toLeBytes(),
    Uint8Vector.of(0x78, 0x56, 0x34, 0x12, 0x56, 0x34, 0x12, 0x90),
  );
  assertEquals(
    new Uint32Vector().toLeBytes(),
    new Uint8Vector(),
  );
  assertEquals(
    new Uint32Vector().fill(Uint32.max()).toLeBytes(),
    new Uint8Vector().fill(Uint8.max()),
  );
  // toTypedArray
  assertEquals(new Uint32Vector(3).toTypedArray(), new Uint32Array(3));
  assertEquals(
    new Uint32Vector(3).fill(Uint32.max()).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  // fill
  assertEquals(
    new Uint32Vector(3).fill(new Uint32(Uint32.max())).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  assertEquals(
    new Uint32Vector(3).fill(Uint32.max()).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  assertEquals(
    new Uint32Vector(3).fill(new Uint32(Uint32.min())).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.min())),
  );
  assertEquals(
    new Uint32Vector(3).fill(Uint32.min()).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.min())),
  );
  // equals
  assertEquals(new Uint32Vector(5).equals(new Uint32Vector(5)), true);
  assertEquals(
    new Uint32Vector(5).fill(Uint32.max()).equals(new Uint32Vector(5)),
    false,
  );
  // slice
  assertEquals(
    new Uint32Vector(5).slice(0, 3).equals(new Uint32Vector(3)),
    true,
  );
});

Deno.test("Uint32Vector", () => {
  // from
  assertEquals(
    Uint32Vector.from(new Uint32Array(3).fill(Number(Uint32.max())))
      .toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  assertEquals(
    Uint32Vector.from([12n, 34n, 56n, 78n]).toTypedArray(),
    new Uint32Array([12, 34, 56, 78]),
  );
  assertEquals(
    Uint32Vector.from([new Uint32(12n), new Uint32(34n)]).toTypedArray(),
    new Uint32Array([12, 34]),
  );
  assertEquals(
    Uint32Vector.from([]).toTypedArray(),
    new Uint32Array([]),
  );
  // fromBeBytes()
  assertEquals(
    Uint32Vector.fromBeBytes(new Uint8Vector(4)).toTypedArray(),
    new Uint32Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint32Vector.fromBeBytes(
      Uint8Vector.of(0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56),
    ).toTypedArray(),
    Uint32Vector.of(0x1234_5678n, 0x9012_3456n).toTypedArray(),
  );
  // fromLeBytes()
  assertEquals(
    Uint32Vector.fromLeBytes(new Uint8Vector(4)).toTypedArray(),
    new Uint32Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint32Vector.fromLeBytes(
      Uint8Vector.of(0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56),
    ).toTypedArray(),
    Uint32Vector.of(0x7856_3412n, 0x5634_1290n).toTypedArray(),
  );
  // of
  assertEquals(
    Uint32Vector.of(100n).toTypedArray(),
    Uint32Array.of(100),
  );
  assertEquals(
    Uint32Vector.of(1n, 2n, 3n).toTypedArray(),
    Uint32Array.of(1, 2, 3),
  );
  assertEquals(
    Uint32Vector.of().toTypedArray(),
    Uint32Array.of(),
  );
});
