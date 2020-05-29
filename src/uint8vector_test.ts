import { assertEquals, assertThrows } from "../depends.ts";

import { Uint8Vector } from "./uint8vector.ts";
import { Uint8 } from "./uint8.ts";

Deno.test("Uint8Vector", () => {
  const vec = new Uint8Vector(2);
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
    new Uint8Vector(0).value_by_index(0);
  });
  // push
  vec.push(new Uint8(0));
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
  vec.concat(new Uint8Vector(3));
  assertEquals(vec.length, 3);
  // toTypedArray
  assertEquals(vec.toTypedArray(), new Uint8Array(3));
  // fill
  vec.fill(new Uint8(Uint8.max()));
  assertEquals(vec.toTypedArray(), new Uint8Array(3).fill(Uint8.max()));
  // fromTypedArray and equals
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array(3)).equals(new Uint8Vector(3)),
    true,
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array(3)).equals(vec),
    false,
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array(3)).fill(new Uint8(Uint8.max()))
      .equals(vec),
    true,
  );
  // slice
  assertEquals(new Uint8Vector(5).slice(0, 3).equals(new Uint8Vector(3)), true);
});
