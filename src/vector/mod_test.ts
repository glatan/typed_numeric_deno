import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint8Vector } from "./uint8vector.ts";
import { Uint8 } from "../numeric/uint8.ts";

Deno.test("Vector<Number>", () => {
  // pop
  const popVector = Uint8Vector.fromTypedArray(
    new Uint8Array([12, 34, 56, 78]),
  );
  const popArray = [12, 34, 56, 78];
  assertEquals(
    popVector.length,
    popArray.length,
  );
  assertEquals(
    popVector.pop().value(),
    popArray.pop(),
  );
  assertEquals(
    popVector.length,
    popArray.length,
  );
  assertThrows(() => {
    // TypedVector throw error if it's empty
    Uint8Vector.fromTypedArray(new Uint8Array([])).pop().value();
    // Array return undefined if it's empty
    [].pop();
  });
  // push
  const pushVector = Uint8Vector.fromTypedArray(
    new Uint8Array([12, 34, 56, 78]),
  );
  const pushArray = [12, 34, 56, 78];
  assertEquals(
    pushVector.length,
    pushArray.length,
  );
  pushVector.push(new Uint8(90));
  pushArray.push(90);
  assertEquals(
    pushVector.toTypedArray(),
    Uint8Array.from(pushArray),
  );
  assertEquals(
    pushVector.length,
    pushArray.length,
  );
  // include
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(12),
    ),
    [12, 34, 56, 78].includes(12),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(90),
    ),
    [12, 34, 56, 78].includes(90),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(12),
      3,
    ),
    [12, 34, 56, 78].includes(12, 3),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(12),
      4,
    ),
    [12, 34, 56, 78].includes(12, 4),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(12),
      100,
    ),
    [12, 34, 56, 78].includes(12, 100),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(12),
      -1,
    ),
    [12, 34, 56, 78].includes(12, -1),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).include(
      new Uint8(12),
      -100,
    ),
    [12, 34, 56, 78].includes(12, -100),
  );
  // indexOf
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(12),
    ),
    [12, 34, 56, 78].indexOf(12),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(90),
    ),
    [12, 34, 56, 78].indexOf(90),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(12),
      3,
    ),
    [12, 34, 56, 78].indexOf(12, 3),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(12),
      4,
    ),
    [12, 34, 56, 78].indexOf(12, 4),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(12),
      100,
    ),
    [12, 34, 56, 78].indexOf(12, 100),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(12),
      -1,
    ),
    [12, 34, 56, 78].indexOf(12, -1),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).indexOf(
      new Uint8(12),
      -100,
    ),
    [12, 34, 56, 78].indexOf(12, -100),
  );
  // join
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).join(),
    [12, 34, 56, 78].join(),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).join(""),
    [12, 34, 56, 78].join(""),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).join(", "),
    [12, 34, 56, 78].join(", "),
  );
  assertEquals(Uint8Vector.fromTypedArray(new Uint8Array()).join(), [].join());
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array()).join(""),
    [].join(""),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array()).join(", "),
    [].join(", "),
  );
  // lastIndexOf
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
    ),
    [12, 34, 12, 34].lastIndexOf(12),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(56),
    ),
    [12, 34, 12, 34].lastIndexOf(56),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
      3,
    ),
    [12, 34, 12, 34].lastIndexOf(12, 3),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
      2,
    ),
    [12, 34, 12, 34].lastIndexOf(12, 2),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
      100,
    ),
    [12, 34, 12, 34].lastIndexOf(12, 100),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
      -1,
    ),
    [12, 34, 12, 34].lastIndexOf(12, -1),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
      -2,
    ),
    [12, 34, 12, 34].lastIndexOf(12, -2),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 12, 34])).lastIndexOf(
      new Uint8(12),
      -100,
    ),
    [12, 34, 12, 34].lastIndexOf(12, -100),
  );
  // toString
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78])).toString(),
    [12, 34, 56, 78].toString(),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([12, 34, 56, 78, 90, 0xAB, 0xCD]))
      .toString(),
    [12, 34, 56, 78, 90, 0xAB, 0xCD].toString(),
  );
  assertEquals(
    Uint8Vector.fromTypedArray(new Uint8Array([])).toString(),
    [].toString(),
  );
});
