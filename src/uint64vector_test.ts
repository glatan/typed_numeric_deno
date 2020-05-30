import { assertEquals, assertThrows } from "../depends.ts";

import { Uint64Vector } from "./uint64vector.ts";
import { Uint64 } from "./uint64.ts";

Deno.test("Uint64Vector", () => {
  // constructor
  assertEquals(new Uint64Vector().length, new Uint64Vector(0).length);
  // Uint64Vector from Array<Uint64>
  assertEquals(
    new Uint64Vector(Array.from([new Uint64(Uint64.max())])).value_by_index(0)
      .value(),
    Uint64.max(),
  );
  const vec = new Uint64Vector(2);
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
    new Uint64Vector(0).value_by_index(0);
  });
  // push
  vec.push(new Uint64(0n));
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
  vec.concat(new Uint64Vector(3));
  assertEquals(vec.length, 3);
  // toTypedArray
  assertEquals(new Uint64Vector(3).toTypedArray(), new BigUint64Array(3));
  assertEquals(
    new Uint64Vector(3).fill(Uint64.max()).toTypedArray(),
    new BigUint64Array(3).fill(Uint64.max()),
  );
  // fill
  assertEquals(
    new Uint64Vector(3).fill(new Uint64(Uint64.max())).toTypedArray(),
    new BigUint64Array(3).fill(Uint64.max()),
  );
  assertEquals(
    new Uint64Vector(3).fill(Uint64.max()).toTypedArray(),
    new BigUint64Array(3).fill(Uint64.max()),
  );
  assertEquals(
    new Uint64Vector(3).fill(new Uint64(Uint64.min())).toTypedArray(),
    new BigUint64Array(3).fill(Uint64.min()),
  );
  assertEquals(
    new Uint64Vector(3).fill(Uint64.min()).toTypedArray(),
    new BigUint64Array(3).fill(Uint64.min()),
  );
  // fromTypedArray and equals
  assertEquals(
    Uint64Vector.fromTypedArray(new BigUint64Array(3)).equals(
      new Uint64Vector(3),
    ),
    true,
  );
  assertEquals(
    Uint64Vector.fromTypedArray(new BigUint64Array(3)).equals(
      new Uint64Vector(3).fill(Uint64.max()),
    ),
    false,
  );
  assertEquals(
    Uint64Vector.fromTypedArray(new BigUint64Array(3)).fill(
      new Uint64(Uint64.max()),
    ).equals(new Uint64Vector(3).fill(Uint64.max())),
    true,
  );
  // slice
  assertEquals(
    new Uint64Vector(5).slice(0, 3).equals(new Uint64Vector(3)),
    true,
  );
});
