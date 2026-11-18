/** Baileys DisconnectReason.loggedOut: the server no longer accepts the saved session. */
const LOGGED_OUT = 401;

export type InitialConnectionCloseAction = 'clear-session' | 'wait-for-qr';

/**
 * What to do when the socket closes before any QR code was generated and the
 * instance has no known number yet (first connection after a process start).
 *
 * A 401 at that point means the saved session was rejected. It has to be
 * cleared, otherwise every later connect reuses the same dead credentials and
 * no QR code is ever generated.
 */
export function resolveInitialConnectionClose(statusCode: number | undefined): InitialConnectionCloseAction {
  return statusCode === LOGGED_OUT ? 'clear-session' : 'wait-for-qr';
}
