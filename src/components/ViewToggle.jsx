/**
 * Vertical sticky toggle pinned to the left edge of the viewport.
 * Lets visitors flip between the editorial HUMAN view and an ATS/agent-friendly
 * plaintext render of the same content.
 *
 * @param props
 * @param props.view - Active view, "human" or "ats".
 * @param props.setView - Setter that swaps the active view.
 */
export default function ViewToggle({ view, setView }) {
  return (
    <aside className="view-toggle" aria-label="View mode">
      <button
        type="button"
        className={`vt-opt ${view === 'human' ? 'active' : ''}`}
        onClick={() => setView('human')}
        aria-pressed={view === 'human'}
      >
        <span className="vt-dot" aria-hidden="true" />
        <span className="vt-label">HUMAN</span>
      </button>
      <button
        type="button"
        className={`vt-opt ${view === 'ats' ? 'active' : ''}`}
        onClick={() => setView('ats')}
        aria-pressed={view === 'ats'}
      >
        <span className="vt-dot" aria-hidden="true" />
        <span className="vt-label">ATS</span>
      </button>
    </aside>
  );
}
