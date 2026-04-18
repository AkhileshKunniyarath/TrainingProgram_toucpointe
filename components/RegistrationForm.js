'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegistrationForm({ page, commitmentIcons }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        e.target.reset();
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Registration Successful!</h2>
        <p className="text-slate-600 mb-8">
          Thank you for joining the AI Agents Workshop. We have received your details and will contact you on WhatsApp soon with the batch details.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="btn btn-secondary"
        >
          Register Another Student
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form-grid">
      {page.form.sections.map((section) => (
        <div key={section.title} className="full-width-field" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1rem' }}>
          <div className="registration-section-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{section.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{section.description}</p>
          </div>
          <div className="registration-form-grid">
            {section.fields.map((field) => (
              <div
                key={field.id}
                className={`registration-field${field.fullWidth ? ' full-width-field' : ''}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <label htmlFor={field.id} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    name={field.id}
                    className="form-input registration-input registration-select"
                    required={field.required}
                    defaultValue=""
                  >
                    <option value="" disabled>Select {field.label.toLowerCase()}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    className="form-input registration-input registration-textarea"
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                  ></textarea>
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type || 'text'}
                    className="form-input registration-input"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <div className="full-width-field" style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.75rem', color: '#dc2626', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div className="registration-commitments-bar full-width-field">
        {page.form.commitments.map((commitment, index) => (
          <div key={commitment} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <CheckCircle2 style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
            <span>{commitment}</span>
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading}
        style={{ width: '100%', padding: '1rem', borderRadius: '1rem', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 10px 25px rgba(79,70,229,0.3)', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Processing...' : page.form.submitLabel}
        {!loading && <ArrowRight style={{ width: '20px', height: '20px' }} />}
      </button>
    </form>
  );
}
