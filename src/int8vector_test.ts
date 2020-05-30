import { assertEquals, assertThrows } from "../depends.ts";

import { Int8Vector } from "./int8vector.ts";
import { Int8 } from "./int8.ts";

Deno.test("Int8Vector", () => {
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
  // push
  vec.push(new Int8(0));
  assertEquals(vec.length, 3);
  // pop
  assertEquals(vec.pop().value(), 0);
  assertEquals(vec.length, 2);
  assertEquals(vec.pop().value(), 0);
  assertEquals(vec.length, 1);
  assertEquals(vec.pop().value(), 0);
  assertEquals(vec.length, 0);
  assertThrows(() => {
    // This Vector<T> is empty.
    vec.pop();
  });
  assertEquals(vec.length, 0);
  // concat
  vec.concat(new Int8Vector(3));
  assertEquals(vec.length, 3);
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
  // fromTypedArray and equals
  assertEquals(
    Int8Vector.fromTypedArray(new Int8Array(3)).equals(new Int8Vector(3)),
    true,
  );
  assertEquals(
    Int8Vector.fromTypedArray(new Int8Array(3)).equals(
      new Int8Vector(3).fill(Int8.max()),
    ),
    false,
  );
  assertEquals(
    Int8Vector.fromTypedArray(new Int8Array(3)).fill(new Int8(Int8.max()))
      .equals(new Int8Vector(3).fill(Int8.max())),
    true,
  );
  // slice
  assertEquals(new Int8Vector(5).slice(0, 3).equals(new Int8Vector(3)), true);
});
