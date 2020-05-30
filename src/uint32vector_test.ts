import { assertEquals, assertThrows } from "../depends.ts";

import { Uint32Vector } from "./uint32vector.ts";
import { Uint32 } from "./uint32.ts";

Deno.test("Uint32Vector", () => {
  const vec = new Uint32Vector(2);
  assertEquals(vec.length, 2);
  // Uint32Vector from Array<Uint32>
  assertEquals(
    new Uint32Vector(Array.from([new Uint32(Uint32.max())])).value_by_index(0)
      .value(),
    Uint32.max(),
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
    new Uint32Vector(0).value_by_index(0);
  });
  // push
  vec.push(new Uint32(0n));
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
  vec.concat(new Uint32Vector(3));
  assertEquals(vec.length, 3);
  // toTypedArray
  assertEquals(new Uint32Vector(3).toTypedArray(), new Uint32Array(3));
  assertEquals(
    new Uint32Vector(3).fill(Uint32.max()).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  // fill
  assertEquals(
    new Uint32Vector(3).fill(new Uint32(Uint32.max())).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  assertEquals(
    new Uint32Vector(3).fill(Uint32.max()).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.max())),
  );
  assertEquals(
    new Uint32Vector(3).fill(new Uint32(Uint32.min())).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.min())),
  );
  assertEquals(
    new Uint32Vector(3).fill(Uint32.min()).toTypedArray(),
    new Uint32Array(3).fill(Number(Uint32.min())),
  );
  // fromTypedArray and equals
  assertEquals(
    Uint32Vector.fromTypedArray(new Uint32Array(3)).equals(new Uint32Vector(3)),
    true,
  );
  assertEquals(
    Uint32Vector.fromTypedArray(new Uint32Array(3)).equals(
      new Uint32Vector(3).fill(Uint32.max()),
    ),
    false,
  );
  assertEquals(
    Uint32Vector.fromTypedArray(new Uint32Array(3)).fill(
      new Uint32(Uint32.max()),
    ).equals(new Uint32Vector(3).fill(Uint32.max())),
    true,
  );
  // slice
  assertEquals(
    new Uint32Vector(5).slice(0, 3).equals(new Uint32Vector(3)),
    true,
  );
});
