import assert from 'node:assert/strict';
import { test } from 'node:test';

import { resolveInitialConnectionClose } from '../src/utils/initial-connection-close';

test('saved session rejected with 401 before any QR is cleared', () => {
  assert.equal(resolveInitialConnectionClose(401), 'clear-session');
});

test('other close codes before any QR keep waiting for the QR', () => {
  for (const statusCode of [undefined, 408, 428, 440, 500, 503, 515]) {
    assert.equal(resolveInitialConnectionClose(statusCode), 'wait-for-qr');
  }
});
