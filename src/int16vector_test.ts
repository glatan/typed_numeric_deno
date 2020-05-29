import { assertEquals, assertThrows } from "../depends.ts";

import { Int16Vector } from "./int16vector.ts";
import { Int16 } from "./int16.ts";

Deno.test("Int16Vector", () => {
  const vec = new Int16Vector(2);
  assertEquals(vec.length, 2);
  // Int16Vector from Array<Int16>
  assertEquals(
    new Int16Vector(Array.from([new Int16(Int16.max())])).value_by_index(0)
      .value(),
    Int16.max(),
  );
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
  // push
  vec.push(new Int16(0));
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
  vec.concat(new Int16Vector(3));
  assertEquals(vec.length, 3);
  // toTypedArray
  assertEquals(vec.toTypedArray(), new Int16Array(3));
  // fill
  vec.fill(new Int16(Int16.max()));
  assertEquals(vec.toTypedArray(), new Int16Array(3).fill(Int16.max()));
  vec.fill(new Int16(Int16.min()));
  assertEquals(vec.toTypedArray(), new Int16Array(3).fill(Int16.min()));
  // fromTypedArray and equals
  assertEquals(
    Int16Vector.fromTypedArray(new Int16Array(3)).equals(new Int16Vector(3)),
    true,
  );
  assertEquals(
    Int16Vector.fromTypedArray(new Int16Array(3)).equals(vec),
    false,
  );
  assertEquals(
    Int16Vector.fromTypedArray(new Int16Array(3)).fill(new Int16(Int16.max()))
      .equals(new Int16Vector(3).fill(new Int16(Int16.max()))),
    true,
  );
  // slice
  assertEquals(new Int16Vector(5).slice(0, 3).equals(new Int16Vector(3)), true);
});
