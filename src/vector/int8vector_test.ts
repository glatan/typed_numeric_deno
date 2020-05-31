import { assertEquals, assertThrows } from "../../depends.ts";

import { Int8Vector } from "./int8vector.ts";
import { Int8 } from "../numeric/int8.ts";

Deno.test("Int8Vector.prototype", () => {
  // constructor
  assertEquals(new Int8Vector().length, new Int8Vector(0).length);
  // Int8Vector from Array<Int8>
  assertEquals(
    new Int8Vector(Array.from([new Int8(Int8.max())])).value_by_index(0)
      .value(),
    Int8.max(),
  );
  const vec = new Int8Vector(2);
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
    new Int8Vector(0).value_by_index(0);
  });
  // concat
  const concatVector = Int8Vector.from(
    new Int8Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Int8Vector.from(new Int8Array([90, 0xAB, 0xCD, 0xEF])),
    ).toTypedArray(),
    Int8Array.from(concatArray.concat([90, 0xAB, 0xCD, 0xEF])),
  );
  // toTypedArray
  assertEquals(new Int8Vector(3).toTypedArray(), new Int8Array(3));
  assertEquals(
    new Int8Vector(3).fill(Int8.max()).toTypedArray(),
    new Int8Array(3).fill(Int8.max()),
  );
  assertEquals(
    new Int8Vector(3).fill(Int8.min()).toTypedArray(),
    new Int8Array(3).fill(Int8.min()),
  );
  // fill
  assertEquals(
    new Int8Vector(3).fill(new Int8(Int8.max())).toTypedArray(),
    new Int8Array(3).fill(Int8.max()),
  );
  assertEquals(
    new Int8Vector(3).fill(Int8.max()).toTypedArray(),
    new Int8Array(3).fill(Int8.max()),
  );
  assertEquals(
    new Int8Vector(3).fill(new Int8(Int8.min())).toTypedArray(),
    new Int8Array(3).fill(Int8.min()),
  );
  assertEquals(
    new Int8Vector(3).fill(Int8.min()).toTypedArray(),
    new Int8Array(3).fill(Int8.min()),
  );
  // equals
  assertEquals(new Int8Vector(5).equals(new Int8Vector(5)), true);
  assertEquals(
    new Int8Vector(5).fill(Int8.max()).equals(new Int8Vector(5)),
    false,
  );
  // slice
  assertEquals(new Int8Vector(5).slice(0, 3).equals(new Int8Vector(3)), true);
});

Deno.test("Int8Vector", () => {
  // from
  assertEquals(
    Int8Vector.from(new Int8Array(3).fill(Int8.max())).toTypedArray(),
    new Int8Array(3).fill(Int8.max()),
  );
  assertEquals(
    Int8Vector.from([12, 34, 56, 78]).toTypedArray(),
    new Int8Array([12, 34, 56, 78]),
  );
  assertEquals(
    Int8Vector.from([new Int8(12), new Int8(34)]).toTypedArray(),
    new Int8Array([12, 34]),
  );
  assertEquals(
    Int8Vector.from([]).toTypedArray(),
    new Int8Array([]),
  );
});
