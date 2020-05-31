import { assertEquals, assertThrows } from "../../depends.ts";

import { Int64Vector } from "./int64vector.ts";
import { Int64 } from "../numeric/int64.ts";

Deno.test("Int64Vector", () => {
  // constructor
  assertEquals(new Int64Vector().length, new Int64Vector(0).length);
  // Int64Vector from Array<Int64>
  assertEquals(
    new Int64Vector(Array.from([new Int64(Int64.max())])).value_by_index(0)
      .value(),
    Int64.max(),
  );
  const vec = new Int64Vector(2);
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
    new Int64Vector(0).value_by_index(0);
  });
  // concat
  const concatVector = Int64Vector.fromTypedArray(
    new BigInt64Array([12n, 34n, 56n, 78n]),
  );
  const concatArray = [12n, 34n, 56n, 78n];
  assertEquals(
    concatVector.concat(
      Int64Vector.fromTypedArray(new BigInt64Array([90n, 0xABn, 0xCDn, 0xEFn])),
    ).toTypedArray(),
    BigInt64Array.from(concatArray.concat([90n, 0xABn, 0xCDn, 0xEFn])),
  );
  // toTypedArray
  assertEquals(new Int64Vector(3).toTypedArray(), new BigInt64Array(3));
  assertEquals(
    new Int64Vector(3).fill(Int64.max()).toTypedArray(),
    new BigInt64Array(3).fill(Int64.max()),
  );
  assertEquals(
    new Int64Vector(3).fill(Int64.min()).toTypedArray(),
    new BigInt64Array(3).fill(Int64.min()),
  );
  // fill
  assertEquals(
    new Int64Vector(3).fill(new Int64(Int64.max())).toTypedArray(),
    new BigInt64Array(3).fill(Int64.max()),
  );
  assertEquals(
    new Int64Vector(3).fill(Int64.max()).toTypedArray(),
    new BigInt64Array(3).fill(Int64.max()),
  );
  assertEquals(
    new Int64Vector(3).fill(new Int64(Int64.min())).toTypedArray(),
    new BigInt64Array(3).fill(Int64.min()),
  );
  assertEquals(
    new Int64Vector(3).fill(Int64.min()).toTypedArray(),
    new BigInt64Array(3).fill(Int64.min()),
  );
  // fromTypedArray and equals
  assertEquals(
    Int64Vector.fromTypedArray(new BigInt64Array(3)).equals(new Int64Vector(3)),
    true,
  );
  assertEquals(
    Int64Vector.fromTypedArray(new BigInt64Array(3)).equals(
      new Int64Vector(3).fill(Int64.max()),
    ),
    false,
  );
  assertEquals(
    Int64Vector.fromTypedArray(new BigInt64Array(3)).fill(
      new Int64(Int64.max()),
    )
      .equals(new Int64Vector(3).fill(Int64.max())),
    true,
  );
  // slice
  assertEquals(new Int64Vector(5).slice(0, 3).equals(new Int64Vector(3)), true);
});
