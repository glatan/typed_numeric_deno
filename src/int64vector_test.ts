import { assertEquals, assertThrows } from "../depends.ts";

import { Int64Vector } from "./int64vector.ts";
import { Int64 } from "./int64.ts";

Deno.test("Int64Vector", () => {
  const vec = new Int64Vector(2);
  assertEquals(vec.length, 2);
  // Int64Vector from Array<Int64>
  assertEquals(
    new Int64Vector(Array.from([new Int64(Int64.max())])).value_by_index(0)
      .value(),
    Int64.max(),
  );
  // value_by_index
  assertEquals(vec.value_by_index(0).value(), 0n);
  assertEquals(vec.value_by_index(1).value(), 0n);
  assertThrows(() => {
    // Index out of range
    vec.value_by_index(2);
  });
  assertThrows(() => {
    // This Vector<T> is empty.
    new Int64Vector(0).value_by_index(0);
  });
  // push
  vec.push(new Int64(0n));
  assertEquals(vec.length, 3);
  // pop
  assertEquals(vec.pop().value(), 0n);
  assertEquals(vec.length, 2);
  assertEquals(vec.pop().value(), 0n);
  assertEquals(vec.length, 1);
  assertEquals(vec.pop().value(), 0n);
  assertEquals(vec.length, 0);
  assertThrows(() => {
    // This Vector<T> is empty.
    vec.pop();
  });
  assertEquals(vec.length, 0);
  // concat
  vec.concat(new Int64Vector(3));
  assertEquals(vec.length, 3);
  // toTypedArray
  assertEquals(vec.toTypedArray(), new BigInt64Array(3));
  assertEquals(
    new Int64Vector(5).fill(new Int64(Int64.max())).toTypedArray(),
    new BigInt64Array(5).fill(Int64.max()),
  );
  // fill
  vec.fill(new Int64(Int64.max()));
  assertEquals(
    vec.toTypedArray(),
    new BigInt64Array(3).fill(Int64.max()),
  );
  // fromTypedArray and equals
  assertEquals(
    Int64Vector.fromTypedArray(new BigInt64Array(3)).equals(new Int64Vector(3)),
    true,
  );
  assertEquals(
    Int64Vector.fromTypedArray(new BigInt64Array(3)).equals(vec),
    false,
  );
  assertEquals(
    Int64Vector.fromTypedArray(new BigInt64Array(3)).fill(
      new Int64(Int64.max()),
    ).equals(vec),
    true,
  );
  assertEquals(
    Int64Vector.fromTypedArray(
      new BigInt64Array(5).fill(Int64.max()),
    ).equals(new Int64Vector(5).fill(new Int64(Int64.max()))),
    true,
  );
  // slice
  assertEquals(
    new Int64Vector(5).slice(0, 3).equals(new Int64Vector(3)),
    true,
  );
});