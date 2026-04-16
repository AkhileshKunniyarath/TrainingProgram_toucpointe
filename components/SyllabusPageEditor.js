'use client';

import { ImageField } from './HomePageEditor';

function Label({ children }) {
  return <label className="admin-label">{children}</label>;
}

function TextField({ label, value, onChange, placeholder, multiline, rows = 3 }) {
  return (
    <div className="admin-field-card">
      <Label>{label}</Label>
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

/* Edits a single time slot */
function SlotEditor({ slot, onChange, onRemove, tone }) {
  const badgeBg = tone === 'cyan' ? 'rgba(6,182,212,0.1)' : 'rgba(99,102,241,0.1)';
  const badgeColor = tone === 'cyan' ? 'rgb(34,211,238)' : 'rgb(129,140,248)';

  return (
    <div style={{ padding: '0.75rem', borderRadius: '0.75rem', border: `1px solid ${slot.isBreak ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`, background: slot.isBreak ? 'transparent' : 'rgba(255,255,255,0.02)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, background: slot.isBreak ? 'rgba(255,255,255,0.05)' : badgeBg, color: slot.isBreak ? 'var(--text-muted)' : badgeColor, padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.73rem', fontWeight: 600, minWidth: 90, textAlign: 'center' }}>
        {slot.time || 'Time'}
      </div>
      <div style={{ flex: 1, display: 'grid', gap: 6 }}>
        <input
          type="text"
          className="registration-input"
          value={slot.time ?? ''}
          onChange={(e) => onChange({ ...slot, time: e.target.value })}
          placeholder="0:00 - 0:30"
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}
        />
        <input
          type="text"
          className="registration-input"
          value={slot.heading ?? ''}
          onChange={(e) => onChange({ ...slot, heading: e.target.value })}
          placeholder="Heading / topic title"
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.7rem' }}
        />
        {!slot.isBreak && (
          <textarea
            className="admin-field-textarea"
            value={slot.detail ?? ''}
            onChange={(e) => onChange({ ...slot, detail: e.target.value })}
            placeholder="Slot description..."
            rows={2}
            style={{ fontSize: '0.82rem', fontFamily: 'inherit' }}
          />
        )}
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={!!slot.isBreak} onChange={(e) => onChange({ ...slot, isBreak: e.target.checked })} />
          Mark as Break slot
        </label>
      </div>
      <button type="button" className="admin-inline-button" style={{ borderColor: 'rgba(248,113,113,0.3)', color: 'rgb(248,113,113)', flexShrink: 0 }} onClick={onRemove}>×</button>
    </div>
  );
}

/* Edits a single day */
function DayEditor({ day, onChange, onRemove, tone }) {
  const setSlots = (slots) => onChange({ ...day, slots });
  const addSlot = () => setSlots([...(day.slots || []), { time: '', heading: '', detail: '', isBreak: false }]);

  return (
    <div className="admin-array-item">
      <div className="admin-array-item-header">
        <input
          type="text"
          className="registration-input"
          value={day.title ?? ''}
          onChange={(e) => onChange({ ...day, title: e.target.value })}
          placeholder="Day X: Title"
          style={{ fontSize: '0.92rem', flex: 1 }}
        />
        <button type="button" className="admin-inline-button" style={{ borderColor: 'rgba(248,113,113,0.3)', color: 'rgb(248,113,113)' }} onClick={onRemove}>Remove day</button>
      </div>

      <div style={{ display: 'grid', gap: 8, paddingLeft: 4 }}>
        {(day.slots || []).map((slot, si) => (
          <SlotEditor
            key={si}
            slot={slot}
            tone={tone}
            onChange={(updated) => {
              const next = [...day.slots];
              next[si] = updated;
              setSlots(next);
            }}
            onRemove={() => setSlots(day.slots.filter((_, j) => j !== si))}
          />
        ))}
        <button type="button" className="btn btn-secondary" style={{ justifySelf: 'start', padding: '0.4rem 1rem', fontSize: '0.82rem' }} onClick={addSlot}>
          + Add Slot
        </button>
      </div>
    </div>
  );
}

/* Week editor */
function WeekEditor({ weekKey, week, onChange, tone }) {
  const days = week.days || [];
  const setDays = (d) => onChange({ ...week, days: d });
  const addDay = () => setDays([...days, { title: 'Day X: New Day', slots: [] }]);

  return (
    <Section title={`✏️ ${week.heading || weekKey}`}>
      <TextField label="Week heading" value={week.heading} onChange={(v) => onChange({ ...week, heading: v })} />
      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span className="admin-label" style={{ margin: 0 }}>Days ({days.length})</span>
          <button type="button" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }} onClick={addDay}>+ Add Day</button>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {days.map((day, i) => (
            <DayEditor
              key={i}
              day={day}
              tone={tone}
              onChange={(updated) => {
                const next = [...days];
                next[i] = updated;
                setDays(next);
              }}
              onRemove={() => setDays(days.filter((_, j) => j !== i))}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  SYLLABUS PAGE EDITOR (main export)                           */
/* ═══════════════════════════════════════════════════════════════ */
export default function SyllabusPageEditor({ value, onChange }) {
  const set = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div>
      {/* Meta */}
      <Section title="Page Meta">
        <TextField label="Browser Tab Title" value={value.title} onChange={(v) => set('title', v)} />
      </Section>

      {/* Header */}
      <Section title="Page Header">
        <TextField label="Badge text" value={value.badge} onChange={(v) => set('badge', v)} placeholder="Comprehensive 10-Day Masterclass" />
        <TextField label="Heading" value={value.heading} onChange={(v) => set('heading', v)} placeholder="Official" />
        <TextField label="Heading Highlight (gradient)" value={value.headingHighlight} onChange={(v) => set('headingHighlight', v)} placeholder="Syllabus" />
        <TextField label="Subtitle" value={value.subtitle} onChange={(v) => set('subtitle', v)} multiline rows={2} />
      </Section>

      {/* Week 1 */}
      <WeekEditor
        weekKey="week1"
        week={value.week1 || { heading: 'Week 1', days: [] }}
        onChange={(v) => set('week1', v)}
        tone="indigo"
      />

      {/* Week 2 */}
      <WeekEditor
        weekKey="week2"
        week={value.week2 || { heading: 'Week 2', days: [] }}
        onChange={(v) => set('week2', v)}
        tone="cyan"
      />
    </div>
  );
}
