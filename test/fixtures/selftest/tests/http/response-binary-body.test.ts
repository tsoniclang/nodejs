import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { ServerResponse } from "@tsonic/nodejs/http.js";

export class ResponseBinaryBodyTests {
  end_accepts_uint8_array_chunks(): void {
    const response = new ServerResponse();

    response.write(new Uint8Array([1, 2]));
    const ended = response.end(new Uint8Array([3, 4]));

    Assert.Same(response, ended);
    Assert.True(response.writableEnded);
  }
}

A<ResponseBinaryBodyTests>()
  .method((t) => t.end_accepts_uint8_array_chunks)
  .add(FactAttribute);
