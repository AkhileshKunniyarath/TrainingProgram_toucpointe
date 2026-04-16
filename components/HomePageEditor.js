'use client';

import { useRef, useState } from 'react';

/* ── shared field components ───────────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="admin-label">
      {children}{required && <span style={{ color: 'rgb(248,113,113)', marginLeft: 4 }}>*</span>}
    </label>
  );
}

function TextField({ label, value, onChange, placeholder, required, multiline, rows = 3 }) {
  return (
    <div className="admin-field-card">
      <Label required={required}>{label}</Label>
      {multiline ? (
        <textarea
          className="admin-field-textarea"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          style={{ marginTop: 6, width: '100%', fontFamily: 'inherit', fontSize: '0.92rem' }}
        />
      ) : (
        <input
          type="text"
          className="registration-input"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ marginTop: 6 }}
        />
      )}
    </div>
  );
}

export function ImageField({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-field-card">
      <Label>{label}</Label>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Preview */}
        {value && (
          <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', maxWidth: 280 }}>
            <img src={value} alt="preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', display: 'block' }} />
            <button
              type="button"
              onClick={() => onChange('')}
              style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', width: 26, height: 26, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>
          </div>
        )}
        {/* URL input */}
        <input
          type="text"
          className="registration-input"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/hero-bg.png or https://..."
        />
        {/* Upload button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : '⬆ Upload Image'}
          </button>
          <span className="text-muted" style={{ fontSize: '0.78rem' }}>JPG, PNG, WebP — max 5 MB</span>
        </div>
        {error && <p style={{ color: 'rgb(248,113,113)', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleUpload(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}

/* ── Section wrapper ───────────────────────────────────────────── */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28, padding: '1.25rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'rgb(129,140,248)', borderBottom: '1px solid rgba(99,102,241,0.2)', paddingBottom: '0.5rem' }}>{title}</h3>
      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {children}
      </div>
    </div>
  );
}

/* ── Array item editor ────────────────────────────────────────── */
function ArraySection({ title, items, setItems, renderItem, createEmpty }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ fontSize: '1.1rem', color: 'rgb(129,140,248)', margin: 0 }}>{title}</h3>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
          onClick={() => setItems([...items, createEmpty()])}
        >
          + Add
        </button>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((item, i) => (
          <div key={i} className="admin-array-item">
            <div className="admin-array-item-header">
              <strong style={{ fontSize: '0.9rem' }}>#{i + 1}</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                {i > 0 && (
                  <button type="button" className="admin-inline-button" onClick={() => {
                    const next = [...items]; [next[i - 1], next[i]] = [next[i], next[i - 1]]; setItems(next);
                  }}>↑</button>
                )}
                {i < items.length - 1 && (
                  <button type="button" className="admin-inline-button" onClick={() => {
                    const next = [...items]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; setItems(next);
                  }}>↓</button>
                )}
                <button type="button" className="admin-inline-button" style={{ borderColor: 'rgba(248,113,113,0.3)', color: 'rgb(248,113,113)' }}
                  onClick={() => setItems(items.filter((_, j) => j !== i))}>Remove</button>
              </div>
            </div>
            {renderItem(item, (patch) => {
              const next = [...items];
              next[i] = { ...item, ...patch };
              setItems(next);
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  HOME PAGE EDITOR                                              */
/* ═══════════════════════════════════════════════════════════════ */
export function HomePageEditor({ value, onChange }) {
  const set = (key, val) => onChange({ ...value, [key]: val });
  const setNested = (parentKey, childKey, val) =>
    onChange({ ...value, [parentKey]: { ...value[parentKey], [childKey]: val } });
  const setDeep = (parentKey, childKey, subKey, val) =>
    onChange({ ...value, [parentKey]: { ...value[parentKey], [childKey]: { ...(value[parentKey]?.[childKey] || {}), [subKey]: val } } });

  const stats = value.stats || [];
  const whyPoints = value.whySection?.points || [];
  const costItems = value.whySection?.costItems || [];
  const smbPrograms = value.smbSection?.programs || [];
  const studentPrograms = value.studentsSection?.programs || [];
  const fp = value.studentsSection?.featuredProgram || {};

  return (
    <div>
      {/* ── Page Meta ── */}
      <Section title="Page Meta">
        <TextField label="Browser Tab Title" value={value.title} onChange={(v) => set('title', v)} />
      </Section>

      {/* ── Hero ── */}
      <Section title="Hero Section">
        <TextField label="Badge Text" value={value.heroBadge} onChange={(v) => set('heroBadge', v)} placeholder="Accelerate Your Tech Journey" />
        <TextField label="Heading Line 1" value={value.heroHeading} onChange={(v) => set('heroHeading', v)} placeholder="Empowering Futures with" />
        <TextField label="Heading Highlight (gradient)" value={value.heroHeadingHighlight} onChange={(v) => set('heroHeadingHighlight', v)} placeholder="Advanced Tech Training" />
        <TextField label="Subtitle Paragraph" value={value.heroSubtitle} onChange={(v) => set('heroSubtitle', v)} multiline rows={3} />
        <TextField label="CTA — For Businesses" value={value.heroCtaBusiness} onChange={(v) => set('heroCtaBusiness', v)} />
        <TextField label="CTA — For Students" value={value.heroCtaStudents} onChange={(v) => set('heroCtaStudents', v)} />
        <ImageField label="Hero Background Image" value={value.heroBgImage} onChange={(v) => set('heroBgImage', v)} />
      </Section>

      {/* ── Stats ── */}
      <ArraySection
        title="Stats Cards"
        items={stats}
        setItems={(v) => set('stats', v)}
        createEmpty={() => ({ value: '', label: '', icon: 'trending-up', tone: 'indigo' })}
        renderItem={(item, patch) => (
          <div style={{ display: 'grid', gap: 8 }}>
            <TextField label="Number / Value" value={item.value} onChange={(v) => patch({ value: v })} placeholder="95%" />
            <TextField label="Label" value={item.label} onChange={(v) => patch({ label: v })} placeholder="Career Placement Rate" />
            <TextField label="Icon name (lucide)" value={item.icon} onChange={(v) => patch({ icon: v })} placeholder="trending-up" />
            <TextField label="Color tone (indigo / cyan / pink)" value={item.tone} onChange={(v) => patch({ tone: v })} placeholder="indigo" />
          </div>
        )}
      />

      {/* ── Why Train ── */}
      <Section title="Why Train? Section">
        <TextField label="Section Heading" value={value.whySection?.heading} onChange={(v) => setNested('whySection', 'heading', v)} />
        <TextField label="Heading Highlight" value={value.whySection?.headingHighlight} onChange={(v) => setNested('whySection', 'headingHighlight', v)} />
        <TextField label="Subtitle" value={value.whySection?.subtitle} onChange={(v) => setNested('whySection', 'subtitle', v)} multiline rows={2} />
        <TextField label="Cost Box Title" value={value.whySection?.costBoxTitle} onChange={(v) => setNested('whySection', 'costBoxTitle', v)} />
        <TextField label="Cost Box CTA Line" value={value.whySection?.costCta} onChange={(v) => setNested('whySection', 'costCta', v)} />
      </Section>

      <ArraySection
        title="Why Train — Reason Cards"
        items={whyPoints}
        setItems={(v) => onChange({ ...value, whySection: { ...value.whySection, points: v } })}
        createEmpty={() => ({ icon: 'trending-down', tone: 'red', title: '', description: '' })}
        renderItem={(item, patch) => (
          <div style={{ display: 'grid', gap: 8 }}>
            <TextField label="Card Title" value={item.title} onChange={(v) => patch({ title: v })} />
            <TextField label="Description" value={item.description} onChange={(v) => patch({ description: v })} multiline rows={3} />
            <TextField label="Icon name" value={item.icon} onChange={(v) => patch({ icon: v })} placeholder="trending-down" />
            <TextField label="Color tone (red / indigo / cyan)" value={item.tone} onChange={(v) => patch({ tone: v })} />
          </div>
        )}
      />

      <ArraySection
        title="Why Train — Cost Items (bullet list)"
        items={costItems}
        setItems={(v) => onChange({ ...value, whySection: { ...value.whySection, costItems: v } })}
        createEmpty={() => ''}
        renderItem={(item, patch) => (
          <TextField label="Bullet text" value={item} onChange={(v) => patch(v)} />
        )}
      />

      {/* ── SMB ── */}
      <Section title="Business Programs Section">
        <TextField label="Badge" value={value.smbSection?.badge} onChange={(v) => setNested('smbSection', 'badge', v)} />
        <TextField label="Heading" value={value.smbSection?.heading} onChange={(v) => setNested('smbSection', 'heading', v)} />
        <TextField label="Heading Highlight" value={value.smbSection?.headingHighlight} onChange={(v) => setNested('smbSection', 'headingHighlight', v)} />
        <TextField label="Subtitle" value={value.smbSection?.subtitle} onChange={(v) => setNested('smbSection', 'subtitle', v)} multiline rows={2} />
      </Section>

      <ArraySection
        title="Business Program Cards"
        items={smbPrograms}
        setItems={(v) => onChange({ ...value, smbSection: { ...value.smbSection, programs: v } })}
        createEmpty={() => ({ icon: 'megaphone', title: '', formats: '', description: '', featured: false, featuredLabel: '' })}
        renderItem={(item, patch) => (
          <div style={{ display: 'grid', gap: 8 }}>
            <TextField label="Title" value={item.title} onChange={(v) => patch({ title: v })} />
            <TextField label="Description" value={item.description} onChange={(v) => patch({ description: v })} multiline rows={3} />
            <TextField label="Formats (use • to separate)" value={item.formats} onChange={(v) => patch({ formats: v })} placeholder="1-Day Workshop • 1-Week Intensive" />
            <TextField label="Icon name" value={item.icon} onChange={(v) => patch({ icon: v })} placeholder="megaphone" />
            <label className="admin-checkbox-row">
              <input type="checkbox" checked={!!item.featured} onChange={(e) => patch({ featured: e.target.checked })} />
              <span>Mark as Featured / Most Popular</span>
            </label>
            {item.featured && (
              <TextField label="Featured Label text" value={item.featuredLabel} onChange={(v) => patch({ featuredLabel: v })} placeholder="Most Popular" />
            )}
          </div>
        )}
      />

      {/* ── Students ── */}
      <Section title="Students Section — Header">
        <TextField label="Badge" value={value.studentsSection?.badge} onChange={(v) => setNested('studentsSection', 'badge', v)} />
        <TextField label="Heading" value={value.studentsSection?.heading} onChange={(v) => setNested('studentsSection', 'heading', v)} />
        <TextField label="Heading Highlight" value={value.studentsSection?.headingHighlight} onChange={(v) => setNested('studentsSection', 'headingHighlight', v)} />
        <TextField label="Subtitle" value={value.studentsSection?.subtitle} onChange={(v) => setNested('studentsSection', 'subtitle', v)} multiline rows={2} />
        <TextField label="Single-track label" value={value.studentsSection?.singleTrackLabel} onChange={(v) => setNested('studentsSection', 'singleTrackLabel', v)} />
      </Section>

      <Section title="Students — Featured Program (Bootcamp)">
        <TextField label="Badge" value={fp.badge} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'badge', v)} />
        <TextField label="Title" value={fp.title} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'title', v)} />
        <TextField label="Format" value={fp.format} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'format', v)} placeholder="10-Day Intensive" />
        <TextField label="Age Requirement" value={fp.ageRequirement} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'ageRequirement', v)} placeholder="Age 14+" />
        <TextField label="Description" value={fp.description} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'description', v)} multiline rows={3} />
        <TextField label="View Syllabus Label" value={fp.ctaLabel} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'ctaLabel', v)} />
        <TextField label="View Syllabus Link" value={fp.ctaHref} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'ctaHref', v)} placeholder="/syllabus" />
        <TextField label="Enroll Button Label" value={fp.enrollLabel} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'enrollLabel', v)} />
        <ImageField label="Featured Program Image" value={fp.image} onChange={(v) => setDeep('studentsSection', 'featuredProgram', 'image', v)} />
      </Section>

      <ArraySection
        title="Student Program Cards"
        items={studentPrograms}
        setItems={(v) => onChange({ ...value, studentsSection: { ...value.studentsSection, programs: v } })}
        createEmpty={() => ({ icon: 'cpu', tone: 'cyan', badge: '', title: '', formats: '', description: '', ctaLabel: 'Apply Now' })}
        renderItem={(item, patch) => (
          <div style={{ display: 'grid', gap: 8 }}>
            <TextField label="Title" value={item.title} onChange={(v) => patch({ title: v })} />
            <TextField label="Badge label" value={item.badge} onChange={(v) => patch({ badge: v })} placeholder="High Demand" />
            <TextField label="Description" value={item.description} onChange={(v) => patch({ description: v })} multiline rows={3} />
            <TextField label="Formats (use • to separate)" value={item.formats} onChange={(v) => patch({ formats: v })} />
            <TextField label="CTA Button label" value={item.ctaLabel} onChange={(v) => patch({ ctaLabel: v })} />
            <TextField label="Icon name" value={item.icon} onChange={(v) => patch({ icon: v })} />
            <TextField label="Color tone (cyan / indigo / pink)" value={item.tone} onChange={(v) => patch({ tone: v })} />
          </div>
        )}
      />

      {/* ── Footer ── */}
      <Section title="Footer">
        <TextField label="Tagline" value={value.footer?.tagline} onChange={(v) => setNested('footer', 'tagline', v)} multiline rows={2} />
        <TextField label="Registration Badge" value={value.footer?.registrationBadge} onChange={(v) => setNested('footer', 'registrationBadge', v)} />
        <TextField label="Copyright text" value={value.footer?.copyright} onChange={(v) => setNested('footer', 'copyright', v)} />
      </Section>
    </div>
  );
}
