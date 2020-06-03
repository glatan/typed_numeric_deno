import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint8Vector } from "./uint8vector.ts";
import { Uint64Vector } from "./uint64vector.ts";
import { Uint64 } from "../numeric/uint64.ts";

Deno.test("Uint64Vector.prototype", () => {
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
  // copyWithin
  assertEquals(
    Uint64Vector.from(new BigUint64Array([12n, 34n, 56n, 78n])).copyWithin(
      0,
      0,
      1,
    ).toTypedArray(),
    [12n, 34n, 56n, 78n].copyWithin(0, 0, 1),
  );
  assertEquals(
    Uint64Vector.from(new BigUint64Array([12n, 34n, 56n, 78n])).copyWithin(
      0,
      -2,
      5,
    ).toTypedArray(),
    [12n, 34n, 56n, 78n].copyWithin(0, -2, 5),
  );
  // concat
  const concatVector = Uint64Vector.from(
    new BigUint64Array([12n, 34n, 56n, 78n]),
  );
  const concatArray = [12n, 34n, 56n, 78n];
  assertEquals(
    concatVector.concat(
      Uint64Vector.from(
        new BigUint64Array([90n, 0xABn, 0xCDn, 0xEFn]),
      ),
    ).toTypedArray(),
    BigUint64Array.from(concatArray.concat([90n, 0xABn, 0xCDn, 0xEFn])),
  );
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
  // equals
  assertEquals(new Uint64Vector(5).equals(new Uint64Vector(5)), true);
  assertEquals(
    new Uint64Vector(5).fill(Uint64.max()).equals(new Uint64Vector(5)),
    false,
  );
  assertEquals(
    Uint64Vector.from(new BigUint64Array(3)).fill(
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

Deno.test("Uint64Vector", () => {
  // from
  assertEquals(
    Uint64Vector.from(new BigUint64Array(3).fill(Uint64.max())).toTypedArray(),
    new BigUint64Array(3).fill(Uint64.max()),
  );
  assertEquals(
    Uint64Vector.from([12n, 34n, 56n, 78n]).toTypedArray(),
    new BigUint64Array([12n, 34n, 56n, 78n]),
  );
  assertEquals(
    Uint64Vector.from([new Uint64(12n), new Uint64(34n)]).toTypedArray(),
    new BigUint64Array([12n, 34n]),
  );
  assertEquals(
    Uint64Vector.from([]).toTypedArray(),
    new BigUint64Array([]),
  );
  // fromBeBytes()
  assertEquals(
    Uint64Vector.fromBeBytes(new Uint8Vector(8)).toTypedArray(),
    new Uint64Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint64Vector.fromBeBytes(
      Uint8Vector.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).toTypedArray(),
    Uint64Vector.from([0x12345678_90123456n]).toTypedArray(),
  );
  // fromLeBytes()
  assertEquals(
    Uint64Vector.fromLeBytes(new Uint8Vector(8)).toTypedArray(),
    new Uint64Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint64Vector.fromLeBytes(
      Uint8Vector.from([0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56]),
    ).toTypedArray(),
    Uint64Vector.from([0x56341290_78563412n]).toTypedArray(),
  );
  // of
  assertEquals(
    Uint64Vector.of(100n).toTypedArray(),
    BigUint64Array.of(100n),
  );
  assertEquals(
    Uint64Vector.of(1n, 2n, 3n).toTypedArray(),
    BigUint64Array.of(1n, 2n, 3n),
  );
  assertEquals(
    Uint64Vector.of().toTypedArray(),
    BigUint64Array.of(),
  );
});
