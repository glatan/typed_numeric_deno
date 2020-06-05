import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint8 } from "../numeric/uint8.ts";
import { Uint16 } from "../numeric/uint16.ts";
import { Uint8Vector } from "./uint8vector.ts";
import { Uint16Vector } from "./uint16vector.ts";

Deno.test("Uint16Vector.prototype", () => {
  // constructor
  assertEquals(new Uint16Vector().length, new Uint16Vector(0).length);
  // Uint16Vector from Array<Uint16>
  assertEquals(
    new Uint16Vector(Array.from([new Uint16(Uint16.max())])).value_by_index(0)
      .value(),
    Uint16.max(),
  );
  const vec = new Uint16Vector(2);
  assertEquals(vec.length, 2);
  // value_by_index
  assertEquals(vec.value_by_index(0).value(), 0);
  assertEquals(vec.value_by_index(1).value(), 0);
  assertThrows(() => {
    // Index out of range
    vec.value_by_index(2);
  });
  assertThrows(() => {
    // This Vector<T> is empty.
    new Uint16Vector(0).value_by_index(0);
  });
  // copyWithin
  assertEquals(
    Uint16Vector.from(new Uint16Array([12, 34, 56, 78])).copyWithin(
      0,
      0,
      1,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, 0, 1),
  );
  assertEquals(
    Uint16Vector.from(new Uint16Array([12, 34, 56, 78])).copyWithin(
      0,
      -2,
      5,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, -2, 5),
  );
  // concat
  const concatVector = Uint16Vector.from(
    new Uint16Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Uint16Vector.from(new Uint16Array([90, 0xAB, 0xCD, 0xEF])),
    ).toTypedArray(),
    Uint16Array.from(concatArray.concat([90, 0xAB, 0xCD, 0xEF])),
  );
  // toBeBytes
  assertEquals(
    Uint16Vector.of(0x1234, 0x5678).toBeBytes(),
    Uint8Vector.of(0x12, 0x34, 0x56, 0x78),
  );
  assertEquals(
    new Uint16Vector().toBeBytes(),
    new Uint8Vector(),
  );
  assertEquals(
    new Uint16Vector().fill(Uint16.max()).toBeBytes(),
    new Uint8Vector().fill(Uint8.max()),
  );
  // toLeBytes
  assertEquals(
    Uint16Vector.of(0x1234, 0x5678).toLeBytes(),
    Uint8Vector.of(0x34, 0x12, 0x78, 0x56),
  );
  assertEquals(
    new Uint16Vector().toLeBytes(),
    new Uint8Vector(),
  );
  assertEquals(
    new Uint16Vector().fill(Uint16.max()).toLeBytes(),
    new Uint8Vector().fill(Uint8.max()),
  );
  // toTypedArray
  assertEquals(new Uint16Vector(3).toTypedArray(), new Uint16Array(3));
  assertEquals(
    new Uint16Vector(3).fill(Uint16.max()).toTypedArray(),
    new Uint16Array(3).fill(Uint16.max()),
  );
  // fill
  assertEquals(
    new Uint16Vector(3).fill(new Uint16(Uint16.max())).toTypedArray(),
    new Uint16Array(3).fill(Uint16.max()),
  );
  assertEquals(
    new Uint16Vector(3).fill(Uint16.max()).toTypedArray(),
    new Uint16Array(3).fill(Uint16.max()),
  );
  assertEquals(
    new Uint16Vector(3).fill(new Uint16(Uint16.min())).toTypedArray(),
    new Uint16Array(3).fill(Uint16.min()),
  );
  assertEquals(
    new Uint16Vector(3).fill(Uint16.min()).toTypedArray(),
    new Uint16Array(3).fill(Uint16.min()),
  );
  // equals
  assertEquals(new Uint16Vector(5).equals(new Uint16Vector(5)), true);
  assertEquals(
    new Uint16Vector(5).fill(Uint16.max()).equals(new Uint16Vector(5)),
    false,
  );
  // slice
  assertEquals(
    new Uint16Vector(5).slice(0, 3).equals(new Uint16Vector(3)),
    true,
  );
});

Deno.test("Uint16Vector", () => {
  // from
  assertEquals(
    Uint16Vector.from(new Uint16Array(3).fill(Uint16.max())).toTypedArray(),
    new Uint16Array(3).fill(Uint16.max()),
  );
  assertEquals(
    Uint16Vector.from([12, 34, 56, 78]).toTypedArray(),
    new Uint16Array([12, 34, 56, 78]),
  );
  assertEquals(
    Uint16Vector.from([new Uint16(12), new Uint16(34)]).toTypedArray(),
    new Uint16Array([12, 34]),
  );
  assertEquals(
    Uint16Vector.from([]).toTypedArray(),
    new Uint16Array([]),
  );
  // fromBeBytes()
  assertEquals(
    Uint16Vector.fromBeBytes(new Uint8Vector(2)).toTypedArray(),
    new Uint16Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint16Vector.fromBeBytes(Uint8Vector.of(0x12, 0x34, 0x56, 0x78))
      .toTypedArray(),
    Uint16Vector.from([0x1234, 0x5678]).toTypedArray(),
  );
  // fromLeBytes()
  assertEquals(
    Uint16Vector.fromLeBytes(new Uint8Vector(2)).toTypedArray(),
    new Uint16Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint16Vector.fromLeBytes(Uint8Vector.of(0x12, 0x34, 0x56, 0x78))
      .toTypedArray(),
    Uint16Vector.of(0x3412, 0x7856).toTypedArray(),
  );
  // of
  assertEquals(
    Uint16Vector.of(100).toTypedArray(),
    Uint16Array.of(100),
  );
  assertEquals(
    Uint16Vector.of(1, 2, 3).toTypedArray(),
    Uint16Array.of(1, 2, 3),
  );
  assertEquals(
    Uint16Vector.of().toTypedArray(),
    Uint16Array.of(),
  );
});
