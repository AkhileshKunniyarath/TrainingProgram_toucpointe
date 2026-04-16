import 'server-only';

import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'touchpointe_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 12;
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const DEFAULT_SESSION_SECRET = 'touchpointe-admin-session-secret';

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
}

function sign(value) {
  return crypto
    .createHmac('sha256', getSessionSecret())
    .update(value)
    .digest('hex');
}

function encodeSession(payload) {
  const value = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = sign(value);
  return `${value}.${signature}`;
}

function decodeSession(token) {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [value, signature] = token.split('.');
  const expected = sign(value);

  if (!signature || signature.length !== expected.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));

  if (!payload?.exp || Date.now() > payload.exp) {
    return null;
  }

  return payload;
}

export function validateAdminPassword(password) {
  return password === getAdminPassword();
}

export function createAdminSessionToken() {
  return encodeSession({
    role: 'admin',
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return Boolean(decodeSession(session));
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSessionOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

export function getAdminDefaultsNotice() {
  const usingDefaultPassword = !process.env.ADMIN_PASSWORD;
  const usingDefaultSecret = !process.env.ADMIN_SESSION_SECRET;

  return {
    usingDefaultPassword,
    usingDefaultSecret,
    defaultPassword: DEFAULT_ADMIN_PASSWORD,
  };
}
