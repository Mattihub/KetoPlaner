/* ══════════════════════════════════════════════════════════════
   js/components.jsx  –  Geteilte React-UI-Komponenten
   type="text/babel" erforderlich (enthält JSX).
   Setzt voraus: React (CDN), alle CSS-Klassen aus style.css.
   ══════════════════════════════════════════════════════════════ */

// ── PROGRESS BAR ─────────────────────────────────────────────────────────
function ProgressBar({ value, max, color = 'var(--teal)', label, unit = 'g' }) {
  const pct  = Math.min(100, max > 0 ? (value / max) * 100 : 0);
  const over = value > max * 1.05;
  return (
    <div className="macro-row">
      <span className="macro-label">{label}</span>
      <div className="progress-bar" style={{ flex: 1 }}>
        <div className="progress-fill"
             style={{ width: pct + '%', background: over ? '#ef4444' : color }}/>
      </div>
      <span className="macro-value" style={{ color: over ? '#c04444' : 'var(--txt2)' }}>
        {fmt(value)}/{max}{unit}
      </span>
    </div>
  );
}

// ── TOAST / SNACKBAR ─────────────────────────────────────────────────────
function Snackbar({ msg, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, []);
  return <div className="snack">{msg}</div>;
}

// ── LOADING SCREEN ────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="loading-overlay">
      <div className="spinner"/>
      <p style={{ color: 'var(--txt3)', fontSize: '.88rem' }}>Daten werden geladen…</p>
    </div>
  );
}

// ── TAG-BADGE ─────────────────────────────────────────────────────────────
const TAG_COLORS = {
  pcos:         ['badge-purple', '🌸 PCOS'],
  lowgi:        ['badge-green',  '📉 Low-GI'],
  protein:      ['badge-teal',   '💪 Protein'],
  legumes:      ['badge-amber',  '🫘 Hülsenf.'],
  batch:        ['badge-blue',   '📦 Batch'],
  schnell:      ['badge-teal',   '⚡ Schnell'],
  prep:         ['badge-blue',   '🌙 Prep'],
  vegan:        ['badge-green',  '🌱 Vegan'],
  muskelaufbau: ['badge-coral',  '🏋️ Aufbau'],
};

function TagBadge({ tag }) {
  const [cls, lbl] = TAG_COLORS[tag] || ['badge-amber', tag];
  return <span className={`badge ${cls}`}>{lbl}</span>;
}
