'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm({ defaultPasswordNotice }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [statusType, setStatusType] = useState('idle');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();

    startTransition(async () => {
      setMessage('Authenticating...');
      setStatusType('idle');

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.error || 'Invalid credential provided.');
        setStatusType('error');
        return;
      }

      setMessage('Success. Redirecting...');
      setStatusType('success');
      router.push('/admin');
      router.refresh();
    });
  };

  return (
    <div className="admin-login-card">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: '3.5rem',
          height: '3.5rem',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#818cf8' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Admin Portal
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '100%', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
          Enter your master password to access system configurations and site content.
        </p>

        {message && (
          <div className={`admin-alert ${statusType === 'error' ? 'admin-alert-error' : statusType === 'success' ? 'admin-alert-success' : ''}`} style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            {statusType === 'error' && (
              <span className="admin-alert-icon" style={{ marginRight: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </span>
            )}
            {message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="adminPassword" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem' }}>
            Master Password
          </label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '1rem', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#64748b' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
            </div>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter secure password..."
              className="admin-input"
              style={{ width: '100%', paddingLeft: '2.75rem', paddingRight: '1rem', height: '3rem', fontSize: '0.95rem' }}
              required
              suppressHydrationWarning
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="admin-btn-save"
          style={{ width: '100%', height: '3rem', fontSize: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}
          suppressHydrationWarning
        >
          {isPending ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
               Authenticating...
            </span>
          ) : 'Authenticate to Continue'}
        </button>
      </form>

      {defaultPasswordNotice ? (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          borderRadius: '0.75rem', 
          background: 'rgba(245, 158, 11, 0.1)', 
          border: '1px solid rgba(245, 158, 11, 0.2)', 
          color: '#fcd34d', 
          fontSize: '0.85rem', 
          lineHeight: 1.5 
        }}>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>! Setup Warning</strong> 
          Current fallback password is <code>admin123</code>. You must set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> in the environment variables to secure this application for production.
        </div>
      ) : null}
    </div>
  );
}
