import { assertEquals, assertThrows } from "../../depends.ts";

import { Int16Vector } from "./int16vector.ts";
import { Int16 } from "../numeric/int16.ts";

Deno.test("Int16Vector", () => {
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
  // concat
  const concatVector = Int16Vector.fromTypedArray(
    new Int16Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Int16Vector.fromTypedArray(new Int16Array([90, 0xAB, 0xCD, 0xEF])),
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
  // fromTypedArray and equals
  assertEquals(
    Int16Vector.fromTypedArray(new Int16Array(3)).equals(new Int16Vector(3)),
    true,
  );
  assertEquals(
    Int16Vector.fromTypedArray(new Int16Array(3)).equals(
      new Int16Vector(3).fill(Int16.max()),
    ),
    false,
  );
  assertEquals(
    Int16Vector.fromTypedArray(new Int16Array(3)).fill(new Int16(Int16.max()))
      .equals(new Int16Vector(3).fill(Int16.max())),
    true,
  );
  // slice
  assertEquals(new Int16Vector(5).slice(0, 3).equals(new Int16Vector(3)), true);
});