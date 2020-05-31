import { assertEquals, assertThrows } from "../../depends.ts";

import { Int32Vector } from "./int32vector.ts";
import { Int32 } from "../numeric/int32.ts";

Deno.test("Int32Vector", () => {
  // constructor
  assertEquals(new Int32Vector().length, new Int32Vector(0).length);
  // Int32Vector from Array<Int32>
  assertEquals(
    new Int32Vector(Array.from([new Int32(Int32.max())])).value_by_index(0)
      .value(),
    Int32.max(),
  );
  const vec = new Int32Vector(2);
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
    new Int32Vector(0).value_by_index(0);
  });
  // concat
  const concatVector = Int32Vector.fromTypedArray(
    new Int32Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Int32Vector.fromTypedArray(new Int32Array([90, 0xAB, 0xCD, 0xEF])),
    ).toTypedArray(),
    Int32Array.from(concatArray.concat([90, 0xAB, 0xCD, 0xEF])),
  );
  // toTypedArray
  assertEquals(new Int32Vector(3).toTypedArray(), new Int32Array(3));
  assertEquals(
    new Int32Vector(3).fill(Int32.max()).toTypedArray(),
    new Int32Array(3).fill(Number(Int32.max())),
  );
  assertEquals(
    new Int32Vector(3).fill(Int32.min()).toTypedArray(),
    new Int32Array(3).fill(Number(Int32.min())),
  );
  // fill
  assertEquals(
    new Int32Vector(3).fill(new Int32(Int32.max())).toTypedArray(),
    new Int32Array(3).fill(Number(Int32.max())),
  );
  assertEquals(
    new Int32Vector(3).fill(Int32.max()).toTypedArray(),
    new Int32Array(3).fill(Number(Int32.max())),
  );
  assertEquals(
    new Int32Vector(3).fill(new Int32(Int32.min())).toTypedArray(),
    new Int32Array(3).fill(Number(Int32.min())),
  );
  assertEquals(
    new Int32Vector(3).fill(Int32.min()).toTypedArray(),
    new Int32Array(3).fill(Number(Int32.min())),
  );
  // fromTypedArray and equals
  assertEquals(
    Int32Vector.fromTypedArray(new Int32Array(3)).equals(new Int32Vector(3)),
    true,
  );
  assertEquals(
    Int32Vector.fromTypedArray(new Int32Array(3)).equals(
      new Int32Vector(3).fill(Int32.max()),
    ),
    false,
  );
  assertEquals(
    Int32Vector.fromTypedArray(new Int32Array(3)).fill(new Int32(Int32.max()))
      .equals(new Int32Vector(3).fill(Int32.max())),
    true,
  );
  // slice
  assertEquals(new Int32Vector(5).slice(0, 3).equals(new Int32Vector(3)), true);
});
