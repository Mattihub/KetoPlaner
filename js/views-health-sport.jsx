/* ══════════════════════════════════════════════════════════════
   js/views-health-sport.jsx  –  Sport-Tab & Gesundheits-Guide
   type="text/babel" erforderlich (enthält JSX).
   Verwendet: dk, DAYS, MONTHS, getISOWeek, getMonday, weekDates,
   getTrainingPhase, adjustedExercises (utils.js),
   window.WORKOUTS (sportplan.js).
   ══════════════════════════════════════════════════════════════ */

// ── SPORT VIEW ────────────────────────────────────────────────────────────
function SportView({ plan, sportWeek, setSportWeek, toggleWorkoutDone, shiftWorkout, todayKey }) {
  const WORKOUTS = window.WORKOUTS || [];
  const days     = weekDates(sportWeek);

  const PHASE_INFO = {
    1: { label:'Phase 1 – Wiederaufbau',   sub:'Woche 1-2: 2 Sätze (~30 Min)',  cls:'phase-1', icon:'🌱' },
    2: { label:'Phase 2 – Aufbau',          sub:'Woche 3-4: 3 Sätze (~60 Min)', cls:'phase-2', icon:'💪' },
    3: { label:'Phase 3 – Intensivierung', sub:'Woche 5-6: 4 Sätze (~90 Min)', cls:'phase-3', icon:'🔥' },
  };

  const todayPhase = getTrainingPhase(new Date());
  const phaseInfo  = PHASE_INFO[todayPhase];

  const weekDone = days.filter(d => {
    const dp = plan[dk(d)];
    return dp?.workout_done && WORKOUTS.find(w => w.id === dp.workout_id)?.id !== 'rest';
  }).length;

  return (
    <div>
      {/* Header + Wochen-Nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.9rem', flexWrap:'wrap', gap:'8px' }}>
        <h2 style={{ fontWeight:400 }}>🏋️ Trainingsplan</h2>
        <div style={{ display:'flex', gap:'5px', alignItems:'center' }}>
          <button type="button" className="week-nav-btn"
                  onClick={() => { const d = new Date(sportWeek); d.setDate(d.getDate()-7); setSportWeek(getMonday(d)); }}>‹</button>
          <span style={{ fontSize:'.82rem', padding:'0 6px' }}>KW {getISOWeek(sportWeek)}</span>
          <button type="button" className="week-nav-btn"
                  onClick={() => { const d = new Date(sportWeek); d.setDate(d.getDate()+7); setSportWeek(getMonday(d)); }}>›</button>
        </div>
      </div>

      {/* Phasen-Banner */}
      <div className={`week-phase-banner ${phaseInfo.cls}`}>
        <span style={{ fontSize:'1.5rem' }}>{phaseInfo.icon}</span>
        <div>
          <div style={{ fontWeight:600, fontSize:'.88rem' }}>{phaseInfo.label}</div>
          <div style={{ fontSize:'.76rem', color:'var(--txt2)' }}>{phaseInfo.sub}</div>
        </div>
        <div style={{ marginLeft:'auto', textAlign:'right' }}>
          <div style={{ fontWeight:600, fontSize:'.88rem' }}>{weekDone}/3</div>
          <div style={{ fontSize:'.72rem', color:'var(--txt3)' }}>Training diese Woche</div>
        </div>
      </div>

      {/* PPL-Legende */}
      <div className="sstrip" style={{ marginBottom:'.9rem' }}>
        <div style={{ fontWeight:600, fontSize:'.82rem', marginBottom:'4px' }}>Push-Pull-Legs Split</div>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', fontSize:'.76rem', color:'var(--txt2)' }}>
          <span>💪 <strong>Mo</strong> = Push (Brust/Schulter/Trizeps)</span>
          <span>🔄 <strong>Mi</strong> = Pull (Rücken/Bizeps)</span>
          <span>🦵 <strong>Fr</strong> = Legs (Beine/Bauch)</span>
          <span>😴 <strong>Di/Do/Sa/So</strong> = Regeneration</span>
        </div>
      </div>

      {/* Tages-Karten */}
      {days.map(d => {
        const dateK    = dk(d);
        const dayPlan  = plan[dateK];
        if (!dayPlan) return null;

        const workout  = WORKOUTS.find(w => w.id === dayPlan.workout_id) || WORKOUTS.find(w => w.id === 'rest');
        const isRest   = workout.id === 'rest';
        const isDone   = !!dayPlan.workout_done;
        const isToday  = dateK === todayKey;
        const phase    = getTrainingPhase(d);
        const exercises = adjustedExercises(workout, phase);
        const phaseLbl  = { 1:'2 Sätze', 2:'3 Sätze', 3:'4 Sätze' }[phase];
        const phaseCls  = { 1:'week12',  2:'',         3:'week56'  }[phase];
        const sportBorder = isToday ? `2px solid ${isRest ? 'var(--cream3)' : 'var(--sport)'}` : undefined;

        return (
          <div key={dateK}
               className={`workout-card ${isDone ? 'done' : ''} ${isRest ? 'rest-day' : ''}`}
               style={{ border: sportBorder }}>

            {/* Karten-Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.7rem', flexWrap:'wrap', gap:'8px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:36, height:36, borderRadius:'10px', background: isRest ? 'var(--cream2)' : 'var(--sport-p)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>
                  {isRest ? '😴' : workout.id === 'ppl_push' ? '💪' : workout.id === 'ppl_pull' ? '🔄' : '🦵'}
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap' }}>
                    <span style={{ fontWeight:600, fontSize:'.9rem' }}>
                      {DAYS[d.getDay()]}, {d.getDate()}. {MONTHS[d.getMonth()]}
                    </span>
                    {isToday && <span className="badge badge-teal">Heute</span>}
                    {isDone  && <span className="badge badge-green">✓ Erledigt</span>}
                  </div>
                  <div style={{ fontSize:'.8rem', color:'var(--txt2)', marginTop:'1px' }}>{workout.name}</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap' }}>
                {!isRest && <span className={`sets-badge ${phaseCls}`}>{phaseLbl}</span>}
                {!isRest && !isDone && (
                  <button type="button" className="btn btn-sm btn-secondary"
                          onClick={() => shiftWorkout(dateK)} title="Workout auf morgen verschieben">
                    📅 Morgen
                  </button>
                )}
                {!isRest && (
                  <button type="button"
                          className={`btn btn-sm ${isDone ? 'btn-secondary' : 'btn-sport'}`}
                          onClick={() => toggleWorkoutDone(dateK)}>
                    {isDone ? '↩' : '✓ Fertig'}
                  </button>
                )}
              </div>
            </div>

            {/* Übungsliste */}
            {!isRest ? (
              <div>
                {exercises.map((ex, i) => (
                  <div key={i} className="exercise-row">
                    <div className="exercise-num">{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:500, fontSize:'.84rem' }}>{ex.name}</div>
                      <div style={{ fontSize:'.76rem', color:'var(--txt3)', marginTop:'2px' }}>{ex.note}</div>
                    </div>
                    <div style={{ textAlign:'right', flexShrink:0 }}>
                      <div style={{ fontWeight:600, fontSize:'.82rem', color:'var(--sport)' }}>{ex.sets}×{ex.reps}</div>
                      <div style={{ fontSize:'.68rem', color:'var(--txt3)' }}>Sätze×Wdh</div>
                    </div>
                  </div>
                ))}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'.75rem', paddingTop:'.6rem', borderTop:'1px solid var(--cream2)' }}>
                  <span style={{ fontSize:'.76rem', color:'var(--txt3)' }}>🔥 {workout.kcalBurn} kcal · {workout.type}</span>
                  <span style={{ fontSize:'.76rem', color:'var(--txt3)' }}>⏱ ca. {phase === 1 ? '30' : phase === 2 ? '60' : '90'} Min</span>
                </div>
              </div>
            ) : (
              <p style={{ fontSize:'.82rem', color:'var(--txt3)', padding:'.3rem 0' }}>
                Aktive Erholung: lockeres Spazieren, Mobilität, Stretching. Kein intensives Training.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── HEALTH VIEW ───────────────────────────────────────────────────────────
function HealthView({ supplements, toggleSupplement }) {
  const today  = new Date();
  const todayK = dk(today);
  const weekD  = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - 6 + i);
    return { date: d, k: dk(d), label: DAYS[d.getDay()] };
  });

  const muscleCards = [
    { icon:'💪', name:'Kreatin Monohydrat',    dose:'5 g täglich',           bg:'var(--teal-p)',  detail:'Erhöht Kraftleistung und Muskelmasse nachweislich. Täglich 5 g, keine Ladephase nötig. Bei gesunden Nieren völlig unbedenklich.' },
    { icon:'🥛', name:'Protein-Timing',         dose:'25–40 g nach Training', bg:'var(--teal-p)',  detail:'Nach dem Training 25–40 g Protein aufnehmen – optimiert Muskelproteinsynthese. Quark, Skyr, Tofu oder Hülsenfrüchte eignen sich ideal.' },
    { icon:'😴', name:'Schlaf & Regeneration',  dose:'7–9 Stunden',           bg:'var(--green-p)', detail:'Der wichtigste Muskelaufbau-Faktor. Im Tiefschlaf wird Wachstumshormon ausgeschüttet. Konstanter Schlafrhythmus entscheidend.' },
    { icon:'💧', name:'Hydrierung',             dose:'2,5–3,5 L täglich',     bg:'#dbeafe',        detail:'Ausreichend Wasser verbessert Trainingsleistung und Proteinverwertung spürbar. Vor jeder Mahlzeit 1 Glas trinken hilft beim Sättigungsgefühl.' },
  ];

  const pcosCards = [
    { icon:'🌸', name:'Low-GI Kohlenhydrate',  detail:'Vollkornprodukte, Hülsenfrüchte und Gemüse statt Weißmehl und Zucker. Stabilisiert Blutzucker und reduziert Insulinresistenz – das Kernproblem bei PCOS.' },
    { icon:'🫘', name:'Hülsenfrüchte täglich', detail:'Linsen, Kichererbsen, Bohnen: pflanzliches Protein, Ballaststoffe, Magnesium. Unterstützen Hormonbalance, Darmgesundheit und Blutfettwerte.' },
    { icon:'🐟', name:'Omega-3 täglich',        detail:'Leinöl, Walnüsse und Algenöl reduzieren Entzündungen. Bei PCOS sind Entzündungsmarker oft erhöht. Täglich 2–3 g EPA+DHA anstreben.' },
    { icon:'🚫', name:'Kein Zucker & Weißmehl',detail:'Raffinierter Zucker verstärkt Insulinresistenz massiv. Keine Süßigkeiten, kein Weißbrot, kein Fruchtsaft. Natürliche Süße aus Beeren ist in Ordnung.' },
    { icon:'🔋', name:'Magnesium & Zink',       detail:'Beide Mineralstoffe bei PCOS häufig mangelhaft. Magnesium 300–400 mg verbessert Insulinsensitivität. Zink 10–15 mg unterstützt die Hormonsynthese.' },
    { icon:'☀️', name:'Vitamin D3 + K2',        detail:'Enger Zusammenhang zwischen Vitamin-D-Mangel und PCOS. 2000–4000 IE D3 täglich, immer mit K2 (100 µg) kombinieren. Blutwert prüfen lassen.' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom:'1.35rem', fontWeight:400 }}>🩺 Gesundheits-Guide</h2>

      {/* Muskelaufbau-Karten */}
      <div className="card">
        <h3 style={{ marginBottom:'.85rem', fontWeight:400 }}>💪 Muskelaufbau – Ernährungsbasics</h3>
        <div className="g2">
          {muscleCards.map(s => (
            <div key={s.name} style={{ background:s.bg, borderRadius:'var(--r)', padding:'.8rem', border:'1px solid rgba(0,0,0,.06)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                <span style={{ fontSize:'1rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight:600, fontSize:'.82rem' }}>{s.name}</div>
                  <span className="badge badge-teal" style={{ marginTop:'2px', display:'inline-flex' }}>{s.dose}</span>
                </div>
              </div>
              <p style={{ fontSize:'.76rem', color:'var(--txt2)', lineHeight:1.5 }}>{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="istrip" style={{ marginTop:'1rem', marginBottom:0 }}>
          <div style={{ fontWeight:600, fontSize:'.82rem', marginBottom:'3px' }}>📊 Dein Aufbau-Ziel</div>
          <p style={{ fontSize:'.78rem', color:'var(--txt2)', lineHeight:1.5 }}>
            +250 kcal Überschuss täglich · 1,7 g Protein/kg KG · Krafttraining 3–4×/Woche ·
            Realistisch: 0,5–1 kg Muskelmasse pro Monat.
          </p>
        </div>
      </div>

      {/* PCOS-Grundlagen */}
      <div className="card">
        <h3 style={{ marginBottom:'.85rem', fontWeight:400 }}>🌸 PCOS-Ernährungs-Basics</h3>
        <div className="pstrip" style={{ marginBottom:'.9rem' }}>
          <div style={{ fontWeight:600, fontSize:'.82rem', marginBottom:'3px' }}>Was bedeutet PCOS-freundliche Ernährung?</div>
          <p style={{ fontSize:'.77rem', color:'var(--txt2)', lineHeight:1.5 }}>
            PCOS ist eng mit Insulinresistenz verknüpft. Alle Rezepte mit 🌸 sind PCOS-konform:
            Low-GI, kein Haushaltszucker, kein Weißmehl, reich an Ballaststoffen und Antioxidantien.
          </p>
        </div>
        <div className="g2">
          {pcosCards.map(p => (
            <div key={p.name} style={{ background:'var(--purple-p)', borderRadius:'var(--r)', padding:'.75rem', border:'1px solid rgba(106,74,138,.1)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'3px' }}>
                <span style={{ fontSize:'.95rem' }}>{p.icon}</span>
                <span style={{ fontWeight:600, fontSize:'.8rem' }}>{p.name}</span>
              </div>
              <p style={{ fontSize:'.75rem', color:'var(--txt2)', lineHeight:1.5 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Supplement-Wochenübersicht */}
      <div className="card">
        <h3 style={{ marginBottom:'.4rem', fontWeight:400 }}>💊 Supplement-Wochenübersicht</h3>
        <p style={{ fontSize:'.78rem', color:'var(--txt3)', marginBottom:'1rem' }}>Kreatin, D3+K2, B12/Omega-3 – täglich abhaken</p>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'.79rem', minWidth:'350px' }}>
            <thead><tr>
              <th style={{ textAlign:'left', padding:'6px 4px', fontWeight:500, color:'var(--txt3)' }}>Suppl.</th>
              {weekD.map(w => (
                <th key={w.k} style={{ padding:'6px 4px', textAlign:'center', fontWeight:500, color: w.k === todayK ? 'var(--teal)' : 'var(--txt3)' }}>{w.label}</th>
              ))}
            </tr></thead>
            <tbody>
            {[['💪 Kreatin','mg'], ['☀️ D3+K2','k'], ['💊 B12/Ω3','salt']].map(([lbl, field]) => (
              <tr key={field}>
                <td style={{ padding:'6px 4px', fontWeight:500, whiteSpace:'nowrap' }}>{lbl}</td>
                {weekD.map(w => {
                  const done = supplements[w.k + '_' + field] || false;
                  return (
                    <td key={w.k} style={{ padding:'6px 4px', textAlign:'center' }}>
                      <div className={`check-box ${done ? 'checked' : ''}`}
                           style={{ margin:'0 auto', cursor: w.k === todayK ? 'pointer' : 'default', opacity: w.k === todayK ? 1 : .55 }}
                           onClick={() => w.k === todayK && toggleSupplement(w.k, field)}/>
                    </td>
                  );
                })}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ernährungs-Checkliste */}
      <div className="cardf">
        <h3 style={{ marginBottom:'.85rem', fontWeight:400 }}>✅ Tägliche Ernährungs-Checkliste</h3>
        <div className="g2">
          {[
            ['🥦','400 g Gemüse täglich',    'Verschiedene Farben – viele Antioxidantien'],
            ['🫘','Hülsenfrüchte täglich',    'Linsen, Bohnen, Kichererbsen oder Edamame'],
            ['🌾','Nur Vollkorn',             'Kein Weißmehl, kein Weißbrot, kein weißer Reis'],
            ['💧','2,5–3,5 L Wasser täglich','Vor Mahlzeiten trinken – bessere Sättigung'],
            ['🚫','Kein freier Zucker',       'Kein Haushaltszucker, kein Saft, keine Süßigkeiten'],
            ['🥚','Protein auf 4 Mahlzeiten','25–40 g pro Mahlzeit für optimale Verwertung'],
          ].map(([ic, t, d]) => (
            <div key={t} style={{ background:'#fff', borderRadius:'10px', padding:'.8rem', border:'1px solid var(--cream3)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'3px' }}>
                <span style={{ fontSize:'.95rem' }}>{ic}</span>
                <span style={{ fontWeight:600, fontSize:'.8rem' }}>{t}</span>
              </div>
              <div style={{ fontSize:'.73rem', color:'var(--txt3)', lineHeight:1.4 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
