import { assertEquals, assertThrows } from "../../depends.ts";

import { Uint8 } from "../numeric/uint8.ts";
import { Uint16 } from "../numeric/uint16.ts";
import { Uint32 } from "../numeric/uint32.ts";
import { Uint64 } from "../numeric/uint64.ts";
import { Uint8Vector } from "./uint8vector.ts";
import { Uint16Vector } from "./uint16vector.ts";
import { Uint32Vector } from "./uint32vector.ts";
import { Uint64Vector } from "./uint64vector.ts";

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
  // copyWithin
  assertEquals(
    Uint8Vector.from(new Uint8Array([12, 34, 56, 78])).copyWithin(
      0,
      0,
      1,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, 0, 1),
  );
  assertEquals(
    Uint8Vector.from(new Uint8Array([12, 34, 56, 78])).copyWithin(
      0,
      -2,
      5,
    ).toTypedArray(),
    [12, 34, 56, 78].copyWithin(0, -2, 5),
  );
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
  // toBe16bitWords
  assertEquals(
    new Uint8Vector(2).toBe16bitWords().toTypedArray(),
    new Uint16Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint8Vector.of(0x12, 0x34).toBe16bitWords().toTypedArray(),
    Uint16Vector.of(0x1234).toTypedArray(),
  );
  assertThrows(() => {
    new Uint8Vector(3).toBe16bitWords();
  });
  // toBe32bitWords
  assertEquals(
    new Uint8Vector(4).toBe32bitWords().toTypedArray(),
    new Uint32Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint8Vector.of(0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56)
      .toBe32bitWords().toTypedArray(),
    Uint32Vector.of(0x1234_5678n, 0x9012_3456n).toTypedArray(),
  );
  assertThrows(() => {
    new Uint8Vector(5).toBe32bitWords();
  });
  // toBe64bitWords
  assertEquals(
    new Uint8Vector(8).toBe64bitWords().toTypedArray(),
    new Uint64Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint8Vector.of(
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
    )
      .toBe64bitWords().toTypedArray(),
    Uint64Vector.of(0x12345678_90123456n, 0x78901234_56789012n).toTypedArray(),
  );
  assertThrows(() => {
    new Uint8Vector(9).toBe64bitWords();
  });
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
  // toLe16bitWords
  assertEquals(
    new Uint8Vector(2).toLe16bitWords().toTypedArray(),
    new Uint16Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint8Vector.of(0x12, 0x34).toLe16bitWords().toTypedArray(),
    Uint16Vector.of(0x3412).toTypedArray(),
  );
  assertThrows(() => {
    new Uint8Vector(3).toLe16bitWords();
  });
  // toLe32bitWords
  assertEquals(
    new Uint8Vector(4).toLe32bitWords().toTypedArray(),
    new Uint32Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint8Vector.of(0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56)
      .toLe32bitWords().toTypedArray(),
    Uint32Vector.of(0x7856_3412n, 0x5634_1290n).toTypedArray(),
  );
  assertThrows(() => {
    new Uint8Vector(5).toLe32bitWords();
  });
  // toLe64bitWords
  assertEquals(
    new Uint8Vector(8).toLe64bitWords().toTypedArray(),
    new Uint64Vector(1).toTypedArray(),
  );
  assertEquals(
    Uint8Vector.of(
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
    )
      .toLe64bitWords().toTypedArray(),
    Uint64Vector.of(0x56341290_78563412n, 0x12907856_34129078n).toTypedArray(),
  );
  assertThrows(() => {
    new Uint8Vector(9).toLe64bitWords();
  });
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
  // fromBeWords
  // 16bit words
  assertEquals(
    Uint8Vector.fromBeWords(Uint16Vector.of(0x1234, 0x5678)),
    Uint8Vector.of(0x12, 0x34, 0x56, 0x78),
  );
  assertEquals(
    Uint8Vector.fromBeWords(new Uint16Vector()),
    new Uint8Vector(),
  );
  assertEquals(
    Uint8Vector.fromBeWords(Uint16Vector.of(Uint16.max())),
    new Uint8Vector(2).fill(Uint8.max()),
  );
  // 32bit words
  assertEquals(
    Uint8Vector.fromBeWords(Uint32Vector.of(0x1234_5678n, 0x9012_3456n)),
    Uint8Vector.of(0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56),
  );
  assertEquals(
    Uint8Vector.fromBeWords(new Uint32Vector()),
    new Uint8Vector(),
  );
  assertEquals(
    Uint8Vector.fromBeWords(Uint32Vector.of(Uint32.max())),
    new Uint8Vector(4).fill(Uint8.max()),
  );
  // 64bit words
  assertEquals(
    Uint8Vector.fromBeWords(
      Uint64Vector.of(0x12345678_90123456n, 0x78901234_56789012n),
    ),
    Uint8Vector.of(
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
      0x34,
      0x56,
      0x78,
      0x90,
      0x12,
    ),
  );
  assertEquals(
    Uint8Vector.fromBeWords(new Uint64Vector()),
    new Uint8Vector(),
  );
  assertEquals(
    Uint8Vector.fromBeWords(Uint64Vector.of(Uint64.max())),
    new Uint8Vector(8).fill(Uint8.max()),
  );
  // fromLeWords
  // 16bit words
  assertEquals(
    Uint8Vector.fromLeWords(Uint16Vector.of(0x1234, 0x5678)),
    Uint8Vector.of(0x34, 0x12, 0x78, 0x56),
  );
  assertEquals(
    Uint8Vector.fromLeWords(new Uint16Vector()),
    new Uint8Vector(),
  );
  assertEquals(
    Uint8Vector.fromLeWords(Uint16Vector.of(Uint16.max())),
    new Uint8Vector(2).fill(Uint8.max()),
  );
  // 32bit words
  assertEquals(
    Uint8Vector.fromLeWords(Uint32Vector.of(0x1234_5678n, 0x9012_3456n)),
    Uint8Vector.of(0x78, 0x56, 0x34, 0x12, 0x56, 0x34, 0x12, 0x90),
  );
  assertEquals(
    Uint8Vector.fromLeWords(new Uint32Vector()),
    new Uint8Vector(),
  );
  assertEquals(
    Uint8Vector.fromLeWords(Uint32Vector.of(Uint32.max())),
    new Uint8Vector(4).fill(Uint8.max()),
  );
  // 64bit words
  assertEquals(
    Uint8Vector.fromLeWords(
      Uint64Vector.from([0x12345678_90123456n, 0x78901234_56789012n]),
    ),
    Uint8Vector.of(
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x12,
      0x90,
      0x78,
      0x56,
      0x34,
      0x12,
      0x90,
      0x78,
    ),
  );
  assertEquals(
    Uint8Vector.fromLeWords(new Uint64Vector()),
    new Uint8Vector(),
  );
  assertEquals(
    Uint8Vector.fromLeWords(Uint64Vector.of(Uint64.max())),
    new Uint8Vector(8).fill(Uint8.max()),
  );
  // of
  assertEquals(
    Uint8Vector.of(100).toTypedArray(),
    Uint8Array.of(100),
  );
  assertEquals(
    Uint8Vector.of(1, 2, 3).toTypedArray(),
    Uint8Array.of(1, 2, 3),
  );
  assertEquals(
    Uint8Vector.of().toTypedArray(),
    Uint8Array.of(),
  );
});
