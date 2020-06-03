import { Uint32 } from "https://deno.land/x/typed_numeric/mod.ts";

const a = new Uint32(200n);
const b = new Uint32(100n);

console.log(a.add(b).value()); // 300n
console.log(a.sub(b).value()); // 100n
console.log(a.div(b).value()); // 2n
console.log(a.mul(b).value()); // 20000n

const c = new Uint32(0x1234_5678n);

console.log(c.toBeBytesArray()); // [18, 52, 86, 120]([0x12, 0x34, 0x56, 0x78])
console.log(c.toLeBytesArray()); // [120, 86, 52, 18]([0x78, 0x56, 0x34, 0x12])

const d = Uint32.fromBeBytes(
  new Uint8Array([0x12, 0x34, 0x56, 0x78]),
);
const e = Uint32.fromLeBytes(
  new Uint8Array([0x12, 0x34, 0x56, 0x78]),
);

console.log(d.value()); // 305419896n(0x1234_5678n)
console.log(e.value()); // 2018915346n(0x7856_3412n)
