'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm({ defaultPasswordNotice }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Enter the admin password to manage website content.');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();

    startTransition(async () => {
      setMessage('Signing in...');

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.error || 'Unable to sign in');
        return;
      }

      router.push('/admin');
      router.refresh();
    });
  };

  return (
    <div className="admin-login-card glass-card">
      <div className="admin-login-header">
        <p className="registration-eyebrow">Admin Access</p>
        <h1 className="admin-title">Sign in to the admin panel</h1>
        <p className="text-muted">
          Update page content, registration copy, and website details from simple form fields.
        </p>
      </div>

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <label htmlFor="adminPassword" className="admin-label">
          Password
        </label>
        <input
          id="adminPassword"
          type="password"
          className="registration-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter admin password"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="admin-editor-meta">
        <span>{message}</span>
      </div>

      {defaultPasswordNotice ? (
        <div className="admin-default-notice">
          <strong>Default setup detected.</strong> Current fallback password: <code>admin123</code>.
          Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> in your environment for secure production use.
        </div>
      ) : null}
    </div>
  );
}
