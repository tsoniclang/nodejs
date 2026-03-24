/**
 * Port of nodejs-clr/tests/nodejs.Tests/http/Server.tests.cs
 *
 * Tests that can run without actual OS network substrate are ported directly.
 * Tests requiring real HTTP traffic (client <-> server round-trip) are marked
 * with TODO comments — they need the substrate to be wired up before they
 * can pass end-to-end.
 */
import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import type { int } from "@tsonic/core/types.js";
import { HttpClient } from "@tsonic/dotnet/System.Net.Http.js";
import {
  AddressInfo,
  createServer,
  Server,
  ServerResponse,
  IncomingMessage,
  validateHeaderName,
  validateHeaderValue,
  maxHeaderSize,
  RequestOptions,
  ClientRequest,
} from "@tsonic/nodejs/http.js";

export class HttpServerTests {
  public createServer_returns_server_instance(): void {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.end("OK");
      }
    );
    Assert.NotNull(server);
    Assert.False(server.listening);
  }

  public server_listen_sets_listening_property(): void {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.end("OK");
      }
    );

    Assert.False(server.listening);

    server.listen(0 as int);

    Assert.True(server.listening);

    server.close();
    Assert.False(server.listening);
  }

  public server_address_returns_bound_address_info(): void {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.end("OK");
      }
    );

    server.listen(8080 as int, "127.0.0.1");

    const addr = server.address() as AddressInfo | null;
    Assert.NotNull(addr);

    if (addr === null) {
      server.close();
      Assert.True(false);
      return;
    }

    Assert.Equal(8080, addr.port);
    Assert.Equal("127.0.0.1", addr.address);
    Assert.Equal("IPv4", addr.family);

    server.close();
  }

  public server_close_stops_listening(): void {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.end("OK");
      }
    );

    server.listen(0 as int);
    Assert.True(server.listening);

    server.close();
    Assert.False(server.listening);
    Assert.Null(server.address());
  }

  public server_listen_callback_is_invoked(): void {
    let callbackInvoked = false;

    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.end("OK");
      }
    );

    server.listen(0 as int, "127.0.0.1", () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
    server.close();
  }

  public async server_round_trips_real_http_requests(): Promise<void> {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("pong");
      }
    );

    server.listen(0 as int, "127.0.0.1");

    const addr = server.address() as AddressInfo | null;
    Assert.NotNull(addr);

    if (addr === null) {
      server.close();
      Assert.True(false);
      return;
    }

    const client = new HttpClient();

    try {
      const body = await client.GetStringAsync(
        `http://127.0.0.1:${addr.port.toString()}/ping`
      );

      Assert.Equal("pong", body);
    } finally {
      client.Dispose();
      server.close();
    }
  }

  public async server_round_trips_localhost_when_host_is_unspecified(): Promise<void> {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("pong");
      }
    );

    server.listen(0 as int);

    const addr = server.address() as AddressInfo | null;
    Assert.NotNull(addr);

    if (addr === null) {
      server.close();
      Assert.True(false);
      return;
    }

    const client = new HttpClient();

    try {
      const body = await client.GetStringAsync(
        `http://localhost:${addr.port.toString()}/ping`
      );

      Assert.Equal("pong", body);
    } finally {
      client.Dispose();
      server.close();
    }
  }

  public server_listen_with_out_of_range_port_throws(): void {
    const server = createServer(
      (_req: IncomingMessage, res: ServerResponse) => {
        res.end("OK");
      }
    );

    let threw = false;
    try {
      server.listen(70000 as int);
    } catch {
      threw = true;
    }

    Assert.True(threw);
  }

  public server_timeout_properties_have_correct_defaults(): void {
    const server = new Server();

    Assert.Equal(0, server.timeout);
    Assert.Equal(60000, server.headersTimeout);
    Assert.Equal(300000, server.requestTimeout);
    Assert.Equal(5000, server.keepAliveTimeout);
  }

  public server_timeout_properties_are_settable(): void {
    const server = new Server();

    server.timeout = 10000 as int;
    server.headersTimeout = 30000 as int;
    server.requestTimeout = 120000 as int;
    server.keepAliveTimeout = 2000 as int;

    Assert.Equal(10000, server.timeout);
    Assert.Equal(30000, server.headersTimeout);
    Assert.Equal(120000, server.requestTimeout);
    Assert.Equal(2000, server.keepAliveTimeout);
  }

  public server_response_status_code_default_is_200(): void {
    const response = new ServerResponse();
    Assert.Equal(200, response.statusCode);
  }

  public server_response_writeHead_sets_status_and_headers(): void {
    const response = new ServerResponse();

    const headers = new Map<string, string>();
    headers.set("Content-Type", "text/plain");

    response.writeHead(201 as int, "Created", headers);

    Assert.Equal(201, response.statusCode);
    Assert.Equal("Created", response.statusMessage);
    Assert.True(response.headersSent);
    Assert.Equal("text/plain", response.getHeader("Content-Type"));
  }

  public server_response_setHeader_and_getHeader(): void {
    const response = new ServerResponse();

    response.setHeader("X-Custom", "value");

    Assert.Equal("value", response.getHeader("X-Custom"));
    Assert.True(response.hasHeader("X-Custom"));

    response.removeHeader("X-Custom");
    Assert.False(response.hasHeader("X-Custom"));
    Assert.Null(response.getHeader("X-Custom"));
  }

  public server_response_end_sets_finished(): void {
    const response = new ServerResponse();
    Assert.False(response.finished);

    response.end();
    Assert.True(response.finished);
  }

  public server_response_end_emits_finish_event(): void {
    const response = new ServerResponse();
    let finishEmitted = false;

    response.on("finish", () => {
      finishEmitted = true;
    });

    response.end();
    Assert.True(finishEmitted);
  }

  public validate_header_name_rejects_empty_string(): void {
    let threw = false;
    try {
      validateHeaderName("");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public validate_header_name_accepts_valid_names(): void {
    // Should not throw
    validateHeaderName("Content-Type");
    validateHeaderName("X-Custom-Header");
    validateHeaderName("Accept");
    Assert.True(true);
  }

  public validate_header_value_rejects_control_characters(): void {
    let threw = false;
    try {
      validateHeaderValue("X-Bad", "\x00bad");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public max_header_size_is_16kb(): void {
    Assert.Equal(16384, maxHeaderSize);
  }

  public client_request_properties_reflect_options(): void {
    const options = new RequestOptions();
    options.hostname = "example.com";
    options.port = 8080 as int;
    options.path = "/api/test";
    options.method = "POST";

    const req = new ClientRequest(options);

    Assert.Equal("/api/test", req.path);
    Assert.Equal("POST", req.method);
    Assert.Equal("example.com", req.host);
    Assert.Equal("http:", req.protocol);
    Assert.False(req.aborted);
  }

  public client_request_set_and_get_headers(): void {
    const options = new RequestOptions();
    const req = new ClientRequest(options);

    req.setHeader("Content-Type", "application/json");
    Assert.Equal("application/json", req.getHeader("Content-Type"));

    const names = req.getHeaderNames();
    Assert.True(names.length > 0);

    req.removeHeader("Content-Type");
    Assert.Null(req.getHeader("Content-Type"));
  }

  public client_request_abort_sets_aborted_flag(): void {
    const options = new RequestOptions();
    const req = new ClientRequest(options);

    Assert.False(req.aborted);
    req.abort();
    Assert.True(req.aborted);
  }

  public client_request_abort_emits_event(): void {
    const options = new RequestOptions();
    const req = new ClientRequest(options);
    let abortEmitted = false;

    req.on("abort", () => {
      abortEmitted = true;
    });

    req.abort();
    Assert.True(abortEmitted);
  }

  public incoming_message_defaults(): void {
    const msg = new IncomingMessage();

    Assert.Null(msg.method);
    Assert.Null(msg.url);
    Assert.Equal("1.1", msg.httpVersion);
    Assert.Null(msg.statusCode);
    Assert.Null(msg.statusMessage);
    Assert.False(msg.complete);
  }

  public incoming_message_destroy_marks_complete(): void {
    const msg = new IncomingMessage();
    let closeEmitted = false;

    msg.on("close", () => {
      closeEmitted = true;
    });

    msg.destroy();
    Assert.True(msg.complete);
    Assert.True(closeEmitted);
  }
}

A.on(HttpServerTests)
  .method((t) => t.createServer_returns_server_instance)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_listen_sets_listening_property)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_address_returns_bound_address_info)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_close_stops_listening)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_listen_callback_is_invoked)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_listen_with_out_of_range_port_throws)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_timeout_properties_have_correct_defaults)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_timeout_properties_are_settable)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_response_status_code_default_is_200)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_response_writeHead_sets_status_and_headers)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_response_setHeader_and_getHeader)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_response_end_sets_finished)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.server_response_end_emits_finish_event)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.validate_header_name_rejects_empty_string)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.validate_header_name_accepts_valid_names)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.validate_header_value_rejects_control_characters)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.max_header_size_is_16kb)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.client_request_properties_reflect_options)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.client_request_set_and_get_headers)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.client_request_abort_sets_aborted_flag)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.client_request_abort_emits_event)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.incoming_message_defaults)
  .add(FactAttribute);
A.on(HttpServerTests)
  .method((t) => t.incoming_message_destroy_marks_complete)
  .add(FactAttribute);
