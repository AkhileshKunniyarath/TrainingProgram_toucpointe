'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { HomePageEditor } from './HomePageEditor';
import SyllabusPageEditor from './SyllabusPageEditor';

/* ─── Icon SVGs ─────────────────────────────────────────────────── */
const Icons = {
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  list: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  graduation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  form: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  cpu: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#gradient-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  save: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  logout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  alert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
};

/* ─── Generic JSON tree editor (fallback) ──────────────────────── */
function labelize(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function deepClone(v) { return JSON.parse(JSON.stringify(v)); }

function getValueAtPath(obj, path) {
  return path.reduce((cur, seg) => cur?.[seg], obj);
}

function setValueAtPath(obj, path, val) {
  const d = deepClone(obj);
  let cur = d;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
  cur[path[path.length - 1]] = val;
  return d;
}

function removeAtPath(obj, path) {
  const d = deepClone(obj);
  let cur = d;
  for (let i = 0; i < path.length - 2; i++) cur = cur[path[i]];
  cur[path[path.length - 2]].splice(path[path.length - 1], 1);
  return d;
}

function createEmptyValue(t) {
  if (Array.isArray(t)) return [];
  if (typeof t === 'object' && t !== null)
    return Object.fromEntries(Object.entries(t).map(([k, v]) => [k, createEmptyValue(v)]));
  if (typeof t === 'boolean') return false;
  if (typeof t === 'number') return 0;
  return '';
}

function appendAtPath(obj, path, tmpl) {
  const d = deepClone(obj);
  let cur = d;
  for (const s of path) cur = cur[s];
  cur.push(createEmptyValue(tmpl));
  return d;
}

function isLong(key, val) {
  const k = key.toLowerCase();
  return typeof val === 'string' && (
    val.includes('\n') || val.length > 120 ||
    k.includes('description') || k.includes('paragraph') || k.includes('content')
  );
}

function ScopeEditor({ nodeKey, value, path, rootContent, setRootContent }) {
  if (Array.isArray(value)) {
    const tmpl = value[0] ?? '';
    return (
      <div className="admin-array">
        {value.map((item, i) => (
          <div key={`${path.join('.')}.${i}`} className="admin-array-item">
            <div className="admin-array-item-header">
              <strong>{labelize(nodeKey)} {i + 1}</strong>
              <button type="button" className="admin-inline-button admin-inline-button-danger"
                onClick={() => setRootContent((c) => removeAtPath(c, [...path, i]))}>Remove</button>
            </div>
            <ScopeEditor nodeKey={`${nodeKey}-${i}`} value={item} path={[...path, i]}
              rootContent={rootContent} setRootContent={setRootContent} />
          </div>
        ))}
        <button type="button" className="admin-inline-button"
          onClick={() => setRootContent((c) => appendAtPath(c, path, tmpl))}>
          + Add {labelize(nodeKey)}
        </button>
      </div>
    );
  }
  if (typeof value === 'object' && value !== null) {
    return (
      <div className="admin-object-grid">
        {Object.entries(value).map(([k, v]) => (
          <div key={`${path.join('.')}.${k}`} className="admin-field-card">
            <label className="admin-label">{labelize(k)}</label>
            <ScopeEditor nodeKey={k} value={v} path={[...path, k]}
              rootContent={rootContent} setRootContent={setRootContent} />
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <label className="admin-toggle-row">
        <div className={`admin-toggle ${value ? 'active' : ''}`}>
           <div className="admin-toggle-knob"></div>
        </div>
        <input type="checkbox" checked={value} style={{ display: 'none' }}
          onChange={(e) => setRootContent((c) => setValueAtPath(c, path, e.target.checked))} />
        <span>Enabled</span>
      </label>
    );
  }
  if (typeof value === 'number') {
    return (
      <input type="number" className="admin-input" value={value}
        onChange={(e) => setRootContent((c) => setValueAtPath(c, path, Number(e.target.value)))} />
    );
  }
  if (isLong(nodeKey, value)) {
    return (
      <textarea className="admin-textarea" value={value ?? ''}
        onChange={(e) => setRootContent((c) => setValueAtPath(c, path, e.target.value))} rows={4} />
    );
  }
  return (
    <input type="text" className="admin-input" value={value ?? ''}
      onChange={(e) => setRootContent((c) => setValueAtPath(c, path, e.target.value))} />
  );
}

/* ─── Scope config ─────────────────────────────────────────────── */
const SCOPES = [
  {
    id: 'site',
    label: 'Global Configuration',
    desc: 'Update brand details, contact methods, and site-wide metadata.',
    path: ['site'],
    custom: null,
    icon: 'settings',
    group: 'site',
  },
  {
    id: 'home',
    label: 'Landing Page',
    desc: 'Manage the primary hero section, featured programs, and core statistics.',
    path: ['pages', 'index'],
    custom: 'home',
    icon: 'home',
    group: 'pages',
  },
  {
    id: 'syllabus',
    label: 'Course Syllabus',
    desc: 'Establish the week-by-week curriculum, topics, and daily timeline slots.',
    path: ['pages', 'syllabus'],
    custom: 'syllabus',
    icon: 'list',
    group: 'pages',
  },
  {
    id: 'training',
    label: 'Training Program',
    desc: 'Refine the training overview, AI details, instructor profiles, and CTAs.',
    path: ['pages', 'training'],
    custom: null,
    icon: 'graduation',
    group: 'pages',
  },
  {
    id: 'register',
    label: 'Registration Flow',
    desc: 'Customize the intake form fields, agreements, and step-by-step labels.',
    path: ['pages', 'register'],
    custom: null,
    icon: 'form',
    group: 'pages',
  },
];

/* ─── Main component ────────────────────────────────────────────── */
export default function ContentAdminClient({ initialContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeId, setActiveId] = useState('site');
  const [status, setStatus] = useState({ type: 'idle', text: 'All changes are saved locally. Click save when ready.' });
  const [isPending, startTransition] = useTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = SCOPES.find((s) => s.id === activeId) || SCOPES[0];
  const activeValue = getValueAtPath(content, active.path);

  const handleCustomChange = (val) => {
    setContent((prev) => setValueAtPath(prev, active.path, val));
    setStatus({ type: 'unsaved', text: 'You have unsaved changes.' });
  };

  const handleSave = () => {
    startTransition(async () => {
      setStatus({ type: 'idle', text: 'Pushing changes to server...' });
      try {
        const res = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content),
        });
        const payload = await res.json();
        if (!res.ok) throw new Error(payload.error || 'Failed to update content.');
        setContent(payload);
        setStatus({ type: 'success', text: 'Success! Your website has been updated.' });
        router.refresh();
      } catch (err) {
        setStatus({ type: 'error', text: err.message });
      }
    });
  };

  const selectScope = (id) => {
    setActiveId(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderEditor = () => {
    if (active.custom === 'home') return <HomePageEditor value={activeValue || {}} onChange={handleCustomChange} />;
    if (active.custom === 'syllabus') return <SyllabusPageEditor value={activeValue || {}} onChange={handleCustomChange} />;
    return (
      <ScopeEditor nodeKey={active.id} value={activeValue} path={active.path}
        rootContent={content} setRootContent={setContent} />
    );
  };

  const siteScopes = SCOPES.filter((s) => s.group === 'site');
  const pageScopes = SCOPES.filter((s) => s.group === 'pages');

  return (
    <div className="admin-layout">
      {/* ═══ MOBILE HEADER & OVERLAY ═══ */}
      <header className="admin-mobile-header">
        <div className="admin-brand mobile-brand">
          <div className="admin-logo">{Icons.cpu}</div>
          <span className="admin-brand-text">Touchpointe<span className="text-light">.digital</span></span>
        </div>
        <button className="admin-menu-toggle" onClick={() => setSidebarOpen(true)}>
          {Icons.menu}
        </button>
      </header>

      <div className={`admin-sidebar-overlay ${sidebarOpen ? 'is-visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* ═══ SIDEBAR ═══ */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar-inner">
          
          {/* Brand Heading */}
          <div className="admin-sidebar-header">
            <div className="admin-brand">
              <div className="admin-logo">{Icons.cpu}</div>
              <div className="admin-brand-text-block">
                <span className="admin-brand-title">Touchpointe</span>
                <span className="admin-brand-subtitle">Admin System</span>
              </div>
            </div>
            <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}>
              {Icons.close}
            </button>
          </div>

          {/* Nav List */}
          <nav className="admin-nav">
            <div className="admin-nav-group">
              <h4 className="admin-nav-heading">Platform</h4>
              <ul className="admin-nav-list">
                {siteScopes.map((scope) => (
                  <li key={scope.id}>
                    <button className={`admin-nav-item ${scope.id === activeId ? 'is-active' : ''}`} onClick={() => selectScope(scope.id)}>
                      <span className="admin-nav-icon">{Icons[scope.icon]}</span>
                      <span className="admin-nav-label">{scope.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="admin-nav-group">
              <h4 className="admin-nav-heading">Web Pages</h4>
              <ul className="admin-nav-list">
                {pageScopes.map((scope) => (
                  <li key={scope.id}>
                    <button className={`admin-nav-item ${scope.id === activeId ? 'is-active' : ''}`} onClick={() => selectScope(scope.id)}>
                      <span className="admin-nav-icon">{Icons[scope.icon]}</span>
                      <span className="admin-nav-label">{scope.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* User & Actions Footer */}
          <div className="admin-sidebar-footer">
            <div className="admin-user-profile">
              <div className="admin-avatar">AD</div>
              <div className="admin-user-details">
                <div className="admin-user-name">Administrator</div>
                <div className="admin-user-role">Super Admin</div>
              </div>
            </div>
            <button className="admin-logout-btn" onClick={() => fetch('/api/admin/logout', { method: 'POST' }).then(() => router.push('/admin/login'))}>
               {Icons.logout} Log out session
            </button>
          </div>

        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="admin-main">
        <div className="admin-main-inner">
          
          {/* Header Action Bar */}
          <header className="admin-topbar">
            <div className="admin-topbar-info">
              <div className="admin-page-icon">{Icons[active.icon]}</div>
              <div className="admin-page-titles">
                <h1 className="admin-page-title">{active.label}</h1>
                <p className="admin-page-desc">{active.desc}</p>
              </div>
            </div>

            <div className="admin-topbar-actions">
              <button className="btn btn-secondary admin-btn-cancel" onClick={() => setContent(initialContent)}>Revert</button>
              <button 
                className="btn btn-primary admin-btn-save" 
                onClick={handleSave} 
                disabled={isPending}
              >
                {Icons.save} {isPending ? 'Publishing...' : 'Publish Changes'}
              </button>
            </div>
          </header>

          {/* Status Alert */}
          {status.type !== 'idle' && status.type !== 'unsaved' && (
            <div className={`admin-alert admin-alert-${status.type}`}>
               <span className="admin-alert-icon">{status.type === 'success' ? Icons.check : Icons.alert}</span>
               {status.text}
            </div>
          )}

          {/* Editor Container */}
          <div className="admin-editor-container">
            {renderEditor()}
          </div>

        </div>
      </main>
    </div>
  );
}
