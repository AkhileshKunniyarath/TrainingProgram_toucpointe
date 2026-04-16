const fs = require('fs');
const path = './app/globals.css';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Find the index of the line that starts the first admin section
const adminStartIndex = lines.findIndex(line => line.includes('.admin-page-shell {'));

if (adminStartIndex > -1) {
  const coreCss = lines.slice(0, adminStartIndex).join('\n');
  const premiumAdminCss = `
/* ══════════════════════════════════════════════════════════════════
    ADMIN PANEL UI LAYOUT - PREMIUM REDESIGN
══════════════════════════════════════════════════════════════════ */

/* ─── Layout Shell ─── */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #0b0f19;
  background-image: 
    radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.06) 0%, transparent 40%);
  color: #e2e8f0;
  font-family: var(--font-inter), system-ui, sans-serif;
  overflow: hidden;
}

/* ─── Mobile Header & Overlay ─── */
.admin-mobile-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 40;
}

.admin-menu-toggle {
  background: none;
  border: none;
  color: #cbd5e1;
  padding: 0.5rem;
  margin: -0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 45;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.admin-sidebar-overlay.is-visible {
  display: block;
  opacity: 1;
}

/* ─── Sidebar ─── */
.admin-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: rgba(15, 20, 35, 0.6);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 50;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.admin-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
}

.admin-sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
}

/* Header/Brand */
.admin-sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.admin-logo {
  width: 2.25rem;
  height: 2.25rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-brand-text-block {
  display: flex;
  flex-direction: column;
}

.admin-brand-title {
  font-weight: 700;
  color: #fff;
  font-size: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.admin-brand-subtitle {
  font-size: 0.75rem;
  color: #818cf8;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.admin-sidebar-close {
  display: none;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #94a3b8;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Navigation */
.admin-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-nav::-webkit-scrollbar { width: 4px; }
.admin-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

.admin-nav-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-nav-heading {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  padding: 0 0.75rem;
  margin: 0;
}

.admin-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.admin-nav-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #e2e8f0;
}

.admin-nav-item.is-active {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

.admin-nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  opacity: 0.8;
}

.admin-nav-item.is-active .admin-nav-icon {
  opacity: 1;
}

/* User Footer */
.admin-sidebar-footer {
  padding: 1.25rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(11, 15, 25, 0.4);
}

.admin-user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.5rem;
}

.admin-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.admin-user-details {
  display: flex;
  flex-direction: column;
}

.admin-user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #e2e8f0;
}

.admin-user-role {
  font-size: 0.75rem;
  color: #64748b;
}

.admin-logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

/* ─── Main Content Area ─── */
.admin-main {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  scrollbar-width: thin;
}

.admin-main::-webkit-scrollbar { width: 8px; }
.admin-main::-webkit-scrollbar-track { background: transparent; }
.admin-main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

.admin-main-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Topbar */
.admin-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-topbar-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-page-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: #818cf8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-page-titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.admin-page-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
  max-width: 40ch;
}

.admin-topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-btn-cancel,
.admin-btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  height: auto;
  min-width: 0;
  border-radius: 0.5rem;
  cursor: pointer;
}

.admin-btn-cancel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.admin-btn-save {
  background: var(--gradient-primary);
  border: none;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.admin-btn-cancel:hover { background: rgba(255,255,255,0.08); }
.admin-btn-save:hover { filter: brightness(1.1); transform: translateY(-1px); }

/* Alert Settings */
.admin-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.admin-alert-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #86efac;
}

.admin-alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.admin-alert-icon {
  display: flex;
  align-items: center;
}

/* Editor Container & Fields */
.admin-editor-container {
  background: rgba(15, 20, 35, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.25rem;
  padding: 1.5rem;
}

.admin-field-card {
  margin-bottom: 1.25rem;
}

.admin-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 0.4rem;
}

.admin-input,
.admin-textarea {
  width: 100%;
  background: rgba(8, 11, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  border-radius: 0.5rem;
  padding: 0.6rem 0.8rem;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.admin-input:focus,
.admin-textarea:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.admin-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Toggle Switch */
.admin-toggle-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: #e2e8f0;
  font-size: 0.9rem;
  user-select: none;
}

.admin-toggle {
  width: 2.5rem;
  height: 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  position: relative;
  transition: background 0.3s;
}

.admin-toggle.active {
  background: #6366f1;
}

.admin-toggle-knob {
  width: 1rem;
  height: 1rem;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  transition: left 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.admin-toggle.active .admin-toggle-knob {
  left: 1.375rem;
}

/* Arrays */
.admin-array {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-array-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
}

.admin-array-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.admin-inline-button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-inline-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.admin-inline-button-danger {
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.05);
}

.admin-inline-button-danger:hover {
  background: rgba(239, 68, 68, 0.15);
}

/* Nested Object Grid */
.admin-object-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Auth Pages */
.admin-login-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #0b0f19;
  background-image: radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
}

.admin-login-card {
  width: 100%;
  max-width: 440px;
  background: rgba(15, 20, 35, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 24px 80px rgba(0,0,0,0.4);
}

/* Mobile Responsive Adjustments */
@media (max-width: 1024px) {
  .admin-mobile-header {
    display: flex;
  }
  
  .admin-layout {
    flex-direction: column;
  }

  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    box-shadow: 4px 0 24px rgba(0,0,0,0.5);
  }

  .admin-sidebar.is-open {
    transform: translateX(0);
  }

  .admin-sidebar-close {
    display: flex;
  }

  .admin-main {
    padding-top: 4rem; /* space for mobile header */
  }

  .admin-main-inner {
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .admin-topbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .admin-topbar-actions {
    width: 100%;
  }

  .admin-btn-cancel,
  .admin-btn-save {
    flex: 1;
    justify-content: center;
  }

  .admin-editor-container {
    padding: 1rem;
  }
}
`;

  fs.writeFileSync(path, coreCss + '\n' + premiumAdminCss);
  console.log('Successfully updated globals.css with premium admin UI classes!');
} else {
  console.log('Could not find .admin-page-shell selector in globals.css');
}
