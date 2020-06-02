import { assertEquals, assertThrows } from "../../depends.ts";

import { Int16Vector } from "./int16vector.ts";
import { Int16 } from "../numeric/int16.ts";

Deno.test("Int16Vector.prototype", () => {
  // constructor
  assertEquals(new Int16Vector().length, new Int16Vector(0).length);
  // Int16Vector from Array<Int16>
  assertEquals(
    new Int16Vector(Array.from([new Int16(Int16.max())])).value_by_index(0)
      .value(),
    Int16.max(),
  );
  const vec = new Int16Vector(2);
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
    new Int16Vector(0).value_by_index(0);
  });
  // copyWithin
  assertEquals(
    Int16Vector.from(new Int16Array([12, 34, 56, 78])).copyWithin(
      0,
      0,
      1,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, 0, 1),
  );
  assertEquals(
    Int16Vector.from(new Int16Array([12, 34, 56, 78])).copyWithin(
      0,
      -2,
      5,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, -2, 5),
  );
  // concat
  const concatVector = Int16Vector.from(
    new Int16Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Int16Vector.from(new Int16Array([90, 0xAB, 0xCD, 0xEF])),
    ).toTypedArray(),
    Int16Array.from(concatArray.concat([90, 0xAB, 0xCD, 0xEF])),
  );
  // toTypedArray
  assertEquals(new Int16Vector(3).toTypedArray(), new Int16Array(3));
  assertEquals(
    new Int16Vector(3).fill(Int16.max()).toTypedArray(),
    new Int16Array(3).fill(Int16.max()),
  );
  assertEquals(
    new Int16Vector(3).fill(Int16.min()).toTypedArray(),
    new Int16Array(3).fill(Int16.min()),
  );
  // fill
  assertEquals(
    new Int16Vector(3).fill(new Int16(Int16.max())).toTypedArray(),
    new Int16Array(3).fill(Int16.max()),
  );
  assertEquals(
    new Int16Vector(3).fill(Int16.max()).toTypedArray(),
    new Int16Array(3).fill(Int16.max()),
  );
  assertEquals(
    new Int16Vector(3).fill(new Int16(Int16.min())).toTypedArray(),
    new Int16Array(3).fill(Int16.min()),
  );
  assertEquals(
    new Int16Vector(3).fill(Int16.min()).toTypedArray(),
    new Int16Array(3).fill(Int16.min()),
  );
  // equals
  assertEquals(new Int16Vector(5).equals(new Int16Vector(5)), true);
  assertEquals(
    new Int16Vector(5).fill(Int16.max()).equals(new Int16Vector(5)),
    false,
  );
  // slice
  assertEquals(new Int16Vector(5).slice(0, 3).equals(new Int16Vector(3)), true);
});

Deno.test("Int16Vector", () => {
  // from
  assertEquals(
    Int16Vector.from(new Int16Array(3).fill(Int16.max())).toTypedArray(),
    new Int16Array(3).fill(Int16.max()),
  );
  assertEquals(
    Int16Vector.from([12, 34, 56, 78]).toTypedArray(),
    new Int16Array([12, 34, 56, 78]),
  );
  assertEquals(
    Int16Vector.from([new Int16(12), new Int16(34)]).toTypedArray(),
    new Int16Array([12, 34]),
  );
  assertEquals(
    Int16Vector.from([]).toTypedArray(),
    new Int16Array([]),
  );
  // of
  assertEquals(
    Int16Vector.of(100).toTypedArray(),
    Int16Array.of(100),
  );
  assertEquals(
    Int16Vector.of(1, 2, 3).toTypedArray(),
    Int16Array.of(1, 2, 3),
  );
  assertEquals(
    Int16Vector.of().toTypedArray(),
    Int16Array.of(),
  );
});
