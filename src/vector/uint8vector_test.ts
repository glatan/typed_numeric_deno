import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint8Vector } from "./uint8vector.ts";
import { Uint8 } from "../numeric/uint8.ts";

Deno.test("Uint8Vector.prototype", () => {
  // constructor
  assertEquals(new Uint8Vector().length, new Uint8Vector(0).length);
  // Uint8Vector from Array<Uint8>
  assertEquals(
    new Uint8Vector(Array.from([new Uint8(Uint8.max())])).value_by_index(0)
      .value(),
    Uint8.max(),
  );
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
  // concat
  const concatVector = Uint8Vector.from(
    new Uint8Array([12, 34, 56, 78]),
  );
  const concatArray = [12, 34, 56, 78];
  assertEquals(
    concatVector.concat(
      Uint8Vector.from(new Uint8Array([90, 0xAB, 0xCD, 0xEF])),
    ).toTypedArray(),
    Uint8Array.from(concatArray.concat([90, 0xAB, 0xCD, 0xEF])),
  );
  // toTypedArray
  assertEquals(new Uint8Vector(3).toTypedArray(), new Uint8Array(3));
  assertEquals(
    new Uint8Vector(3).fill(Uint8.max()).toTypedArray(),
    new Uint8Array(3).fill(Uint8.max()),
  );
  // fill
  assertEquals(
    new Uint8Vector(3).fill(new Uint8(Uint8.max())).toTypedArray(),
    new Uint8Array(3).fill(Uint8.max()),
  );
  assertEquals(
    new Uint8Vector(3).fill(Uint8.max()).toTypedArray(),
    new Uint8Array(3).fill(Uint8.max()),
  );
  assertEquals(
    new Uint8Vector(3).fill(new Uint8(Uint8.min())).toTypedArray(),
    new Uint8Array(3).fill(Uint8.min()),
  );
  assertEquals(
    new Uint8Vector(3).fill(Uint8.min()).toTypedArray(),
    new Uint8Array(3).fill(Uint8.min()),
  );
  // slice
  assertEquals(new Uint8Vector(5).slice(0, 3).equals(new Uint8Vector(3)), true);
  // equals
  assertEquals(new Uint8Vector(5).equals(new Uint8Vector(5)), true);
  assertEquals(
    new Uint8Vector(5).fill(Uint8.max()).equals(new Uint8Vector(5)),
    false,
  );
  // toBeBytesLowerHex
  assertEquals(
    Uint8Vector.from(new Uint8Array([0x12, 0x34, 0xAB, 0xCD]))
      .toBeBytesLowerHex(),
    "1234abcd",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]))
      .toBeBytesLowerHex(),
    "ffffffff",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0, 0, 0, 0]))
      .toBeBytesLowerHex(),
    "00000000",
  );
  // toLeBytesLowerHex
  assertEquals(
    Uint8Vector.from(new Uint8Array([0x12, 0x34, 0xAB, 0xCD]))
      .toLeBytesLowerHex(),
    "cdab3412",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]))
      .toLeBytesLowerHex(),
    "ffffffff",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0, 0, 0, 0]))
      .toLeBytesLowerHex(),
    "00000000",
  );
  // toBeBytesUpperHex
  assertEquals(
    Uint8Vector.from(new Uint8Array([0x12, 0x34, 0xAB, 0xCD]))
      .toBeBytesUpperHex(),
    "1234ABCD",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]))
      .toBeBytesUpperHex(),
    "FFFFFFFF",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0, 0, 0, 0]))
      .toBeBytesUpperHex(),
    "00000000",
  );
  // toLeBytesUpperHex
  assertEquals(
    Uint8Vector.from(new Uint8Array([0x12, 0x34, 0xAB, 0xCD]))
      .toLeBytesUpperHex(),
    "CDAB3412",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF]))
      .toLeBytesUpperHex(),
    "FFFFFFFF",
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([0, 0, 0, 0]))
      .toLeBytesUpperHex(),
    "00000000",
  );
});

Deno.test("Uint8Vector", () => {
  // from
  assertEquals(
    Uint8Vector.from(new Uint8Array(3).fill(Uint8.max())).toTypedArray(),
    new Uint8Array(3).fill(Uint8.max()),
  );
  assertEquals(
    Uint8Vector.from([12, 34, 56, 78]).toTypedArray(),
    new Uint8Array([12, 34, 56, 78]),
  );
  assertEquals(
    Uint8Vector.from([new Uint8(12), new Uint8(34)]).toTypedArray(),
    new Uint8Array([12, 34]),
  );
  assertEquals(
    Uint8Vector.from([]).toTypedArray(),
    new Uint8Array([]),
  );
});
