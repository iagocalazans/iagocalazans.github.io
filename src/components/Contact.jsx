import { useState } from 'react';
import { CONTACT_ROWS } from '../data/profile.js';

/**
 * Contact section with copy-to-clipboard rows for email/phone and external links for the rest.
 */
export default function Contact() {
  const [copied, setCopied] = useState(null);

  const onRow = (event, row) => {
    if (!row.copy) return;
    event.preventDefault();
    navigator.clipboard?.writeText(row.val);
    setCopied(row.lbl);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <section id="contact" className="reveal" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="contact">
        <h2 className="contact-h">
          Want to <span className="italic">build</span> something?
        </h2>
        <div className="contact-list">
          {CONTACT_ROWS.map((row) => (
            <a
              key={row.lbl}
              href={row.href}
              target={row.href?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`contact-row ${copied === row.lbl ? 'copied' : ''}`}
              onClick={(event) => onRow(event, row)}
            >
              <span className="lbl">{row.lbl}</span>
              <span className="val">{row.val}</span>
              <span className="act">{copied === row.lbl ? 'copied ✓' : row.copy ? 'copy' : 'open ↗'}</span>
            </a>
          ))}
        </div>
      </div>
      <footer className="foot">
        <span>© 2026 · iago calazans · belo horizonte, br</span>
      </footer>
    </section>
  );
}
