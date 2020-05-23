import { Numeric } from "./mod.ts";

const MAX: number = 65535;
const MIN: number = 0;

export class Uint16 implements Numeric<Uint16> {
  #value: number;
  constructor(value: number) {
    this.#value = value;
  }
  value(): number {
    return this.#value;
  }
  max(): number {
    return MAX;
  }
  min(): number {
    return MIN;
  }
  add(value: Uint16): Uint16 {
    return new Uint16((this.#value + value.#value) & MAX);
  }
  sub(value: Uint16): Uint16 {
    return new Uint16((this.#value - value.#value) & MAX);
  }
  mul(value: Uint16): Uint16 {
    return new Uint16((this.#value * value.#value) & MAX);
  }
  div(value: Uint16): Uint16 {
    return new Uint16((this.#value / value.#value) & MAX);
  }  
}
