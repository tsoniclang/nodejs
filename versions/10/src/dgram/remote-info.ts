/**
 * Information about the remote endpoint that sent a datagram.
 *
 * Baseline: nodejs-clr/src/nodejs/dgram/RemoteInfo.cs
 */

export class RemoteInfo {
  /** The IP address of the remote endpoint. */
  public address: string = "";

  /** The address family ('IPv4' or 'IPv6'). */
  public family: string = "IPv4";

  /** The port number of the remote endpoint. */
  public port: number = 0;

  /** The size of the message in bytes. */
  public size: number = 0;
}
