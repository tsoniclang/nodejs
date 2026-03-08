import { EventEmitter } from "@tsonic/nodejs/index.js";

class CounterEmitter extends EventEmitter {}

export function main(): void {
  const emitter = new CounterEmitter();
  let count = 0;
  emitter.on("tick", () => {
    count = count + 1;
  });

  emitter.emit("tick");
  emitter.emit("tick");

  console.log(count.toString());
}
