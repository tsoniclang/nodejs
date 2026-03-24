/**
 * Port of nodejs-clr/tests/nodejs.Tests/http/JsSurfaceContract.tests.cs
 *
 * Validates that integer-backed members and method signatures compile
 * against exact numeric contracts.
 */
import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import type { int } from "@tsonic/core/types.js";
import {
  Server,
  ServerResponse,
  IncomingMessage,
} from "@tsonic/nodejs/http.js";

export class HttpSurfaceContractTests {
  public integer_backed_members_compile_against_exact_numeric_contracts(): void {
    const server = new Server();
    const response = new ServerResponse();
    const incoming = new IncomingMessage();

    const timeout: number = server.timeout;
    const headersTimeout: number = server.headersTimeout;
    const requestTimeout: number = server.requestTimeout;
    const keepAliveTimeout: number = server.keepAliveTimeout;
    const statusCode: number = response.statusCode;
    const incomingStatusCode: number | null = incoming.statusCode;
    const address = server.address();

    server.timeout = timeout;
    server.headersTimeout = headersTimeout;
    server.requestTimeout = requestTimeout;
    server.keepAliveTimeout = keepAliveTimeout;
    response.statusCode = statusCode;

    // Ensure the incomingStatusCode binding is used
    Assert.Null(incomingStatusCode);
    Assert.Null(address);
  }

  public integer_backed_methods_compile_against_exact_numeric_contracts(): void {
    const server = new Server();
    const response = new ServerResponse();
    const incoming = new IncomingMessage();

    const listenResult: Server = server.listen(
      0,
      "127.0.0.1",
      128,
      () => undefined
    );
    Assert.True(listenResult.listening);
    listenResult.close();

    const listenPath =
      server.listen as unknown as (
        path: string,
        callback?: (() => void) | null
      ) => Server;
    Assert.NotNull(listenPath);

    const serverTimeoutResult: Server = server.setTimeout(
      1000 as int,
      () => undefined
    );
    Assert.NotNull(serverTimeoutResult);

    const incomingTimeoutResult: IncomingMessage = incoming.setTimeout(
      1000 as int,
      () => undefined
    );
    Assert.NotNull(incomingTimeoutResult);

    const responseTimeoutResult: ServerResponse = response.setTimeout(
      1000 as int,
      () => undefined
    );
    Assert.NotNull(responseTimeoutResult);

    const writeHeadResult: ServerResponse = response.writeHead(
      204 as int,
      "No Content",
      new Map<string, string>()
    );
    Assert.NotNull(writeHeadResult);
  }
}

A.on(HttpSurfaceContractTests)
  .method(
    (t) => t.integer_backed_members_compile_against_exact_numeric_contracts
  )
  .add(FactAttribute);
A.on(HttpSurfaceContractTests)
  .method(
    (t) => t.integer_backed_methods_compile_against_exact_numeric_contracts
  )
  .add(FactAttribute);
