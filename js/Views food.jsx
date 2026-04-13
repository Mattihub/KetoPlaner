/* ══════════════════════════════════════════════════════════════
   js/views-food.jsx  –  Ernährungs-bezogene Views
   type="text/babel" erforderlich (enthält JSX).
   Verwendet: dk, fmt, getMonday, weekDates, getISOWeek,
              DAYS, MONTHS, WORKOUTS (alle global aus utils.js /
              sportplan.js), ProgressBar, TagBadge (components.jsx).
   ══════════════════════════════════════════════════════════════ */

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard({ macros, todayM, plan, todayKey, toggleEaten,
                     supplements, toggleSupplement,
                     todayWorkout, workoutDone, activityBonus, toggleWorkoutDone }) {

  const today     = new Date();
  const todayPlan = plan[todayKey];

  // Wochenfortschritt Mo–So
  const wDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today), dow = d.getDay();
    d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1) + i);
    return dk(d);
  });
  const wEaten = wDays.reduce((a, k) => {
    const d = plan[k]; if (!d) return a;
    ['breakfast','lunch','dinner'].forEach(m => { if (d.eaten?.[m]) a++; });
    return a;
  }, 0);
  const wTotal = wDays.reduce((a, k) => a + (plan[k] ? 3 : 0), 0);

  // Kalorien inkl. Sport-Bonus
  const effectiveKcal = macros.kcal + activityBonus;

  function SuppBtn({ field, label, icon }) {
    const key  = todayKey + '_' + field;
    const done = supplements[key] || false;
    return (
      <div className={`suppl-btn ${done ? 'done' : ''}`}
           onClick={() => toggleSupplement(todayKey, field)}>
        <div className={`check-box ${done ? 'checked' : ''}`}/>
        <div>
          <div style={{ fontWeight: 500, fontSize: '.82rem' }}>{icon} {label}</div>
          <div style={{ fontSize: '.7rem', color: 'var(--txt3)' }}>Täglich abhaken</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Datum */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontWeight: 400, fontSize: '1.5rem' }}>Guten Tag! 💪</h2>
        <p style={{ color: 'var(--txt3)', fontSize: '.86rem' }}>
          {today.toLocaleDateString('de-DE', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
        </p>
      </div>

      {/* Aktivitäts-Bonus */}
      {todayWorkout && (
        <div style={{ marginBottom: '.9rem' }}>
          <div className="activity-bonus">
            <div style={{ fontSize: '2rem', lineHeight: 1 }}>
              {todayWorkout.id === 'rest' ? '😴' : '🏋️'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--sport)' }}>
                Heutiges Training: {todayWorkout.name}
              </div>
              <div style={{ fontSize: '.76rem', color: 'var(--txt3)', marginTop: '2px' }}>
                {workoutDone
                  ? `✅ Erledigt! +${activityBonus} kcal Aktivitäts-Bonus verrechnet`
                  : `🔥 ${todayWorkout.kcalBurn} kcal Bonus nach dem Training`}
              </div>
            </div>
            <button type="button"
                    className={`btn btn-sm ${workoutDone ? 'btn-secondary' : 'btn-sport'}`}
                    onClick={() => toggleWorkoutDone(todayKey)}>
              {workoutDone ? '↩ Rückgängig' : '✓ Fertig'}
            </button>
          </div>
        </div>
      )}

      {/* Makros */}
      <div className="card">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.85rem', flexWrap:'wrap', gap:'8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--teal)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'1.1rem', flexShrink:0 }}>♂</div>
            <div>
              <div style={{ fontWeight:600, fontSize:'.88rem' }}>Heutige Makros</div>
              <div style={{ fontSize:'.7rem', color:'var(--txt3)' }}>
                Ziel {macros.kcal} kcal
                {activityBonus > 0 && <span style={{ color:'var(--sport)', fontWeight:600 }}> +{activityBonus} Sport</span>}
                {' '}= <strong>{effectiveKcal}</strong> kcal gesamt
              </div>
            </div>
          </div>
          <div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>
            <span className="badge badge-teal">P {macros.pp}%</span>
            <span className="badge badge-blue">C {macros.cp}%</span>
            <span className="badge badge-amber">F {macros.fp}%</span>
            {activityBonus > 0 && <span className="badge badge-sport">🏋️ +{activityBonus}</span>}
          </div>
        </div>
        <ProgressBar label="Kalorien"      value={todayM.kcal}    max={effectiveKcal} unit=" kcal" color="var(--teal)"/>
        <ProgressBar label="Protein"       value={todayM.protein}  max={macros.protein}             color="var(--teal)"/>
        <ProgressBar label="Kohlenhydrate" value={todayM.carbs}    max={macros.carbs}               color="var(--navy-l)"/>
        <ProgressBar label="Fett"          value={todayM.fat}      max={macros.fat}                 color="var(--amber)"/>
        <div style={{ marginTop:'.6rem', display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ flex:1, height:6, background:'var(--cream2)', borderRadius:3, overflow:'hidden' }}>
            <div style={{ width:(wTotal > 0 ? wEaten/wTotal*100 : 0)+'%', height:'100%', background:'var(--green)', borderRadius:3, transition:'width .5s ease' }}/>
          </div>
          <span style={{ fontSize:'.72rem', color:'var(--txt3)', flexShrink:0 }}>Woche {wEaten}/{wTotal} ✓</span>
        </div>
      </div>

      {/* Heute essen */}
      {todayPlan ? (
        <div className="card">
          <h3 style={{ marginBottom:'.9rem', fontWeight:400 }}>Heute essen</h3>
          <div className="g3">
            {['breakfast','lunch','dinner'].map(m => {
              const r     = todayPlan[m]; if (!r) return null;
              const eaten = todayPlan.eaten[m] || false;
              const lbl   = { breakfast:'🌅 Frühstück', lunch:'☀️ Mittag', dinner:'🌙 Abend' }[m];
              return (
                <div key={m} className={`csm meal-card ${eaten ? 'eaten' : ''}`}
                     style={{ border: eaten ? '2px solid var(--green)' : '1px solid var(--cream3)' }}
                     onClick={() => toggleEaten(todayKey, m)}>
                  <div style={{ fontSize:'.68rem', color:'var(--txt3)', marginBottom:'2px' }}>{lbl}</div>
                  <div style={{ fontWeight:500, fontSize:'.82rem', marginBottom:'5px', lineHeight:1.3 }}>{r.name}</div>
                  <div style={{ display:'flex', gap:'3px', flexWrap:'wrap', marginBottom:'6px' }}>
                    <span className="rm rm-p">{r.macros.protein}g P</span>
                    <span className="rm rm-c">{r.macros.carbs}g C</span>
                    <span className="rm rm-k">{r.macros.kcal} kcal</span>
                  </div>
                  <div style={{ display:'flex', gap:'3px', flexWrap:'wrap', marginBottom:'7px' }}>
                    {r.tags?.slice(0,2).map(t => <TagBadge key={t} tag={t}/>)}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                    <div className={`check-box ${eaten ? 'checked' : ''}`} style={{ width:17, height:17, borderRadius:5 }}/>
                    <span style={{ fontSize:'.7rem', color: eaten ? 'var(--green)' : 'var(--txt3)' }}>
                      {eaten ? 'Gegessen ✓' : 'Tippen = Abhaken'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign:'center', color:'var(--txt3)', padding:'2rem 1rem' }}>
          <div style={{ fontSize:'2rem', marginBottom:'.5rem' }}>📅</div>
          <div>Kein Plan für heute. Der Plan läuft 13. April – 24. Mai 2026.</div>
        </div>
      )}

      {/* Supplements */}
      <div className="card">
        <h3 style={{ marginBottom:'.7rem', fontWeight:400 }}>⚡ Tägliche Supplements</h3>
        <div className="g3">
          <SuppBtn field="mg"   label="Kreatin 5g"    icon="💪"/>
          <SuppBtn field="k"    label="Vitamin D3+K2"  icon="☀️"/>
          <SuppBtn field="salt" label="B12 / Omega-3"  icon="💊"/>
        </div>
      </div>

      {/* Makroziel-Kacheln */}
      <div className="cardf">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'6px' }} className="g2m">
          {[
            ['Kalorien',  effectiveKcal + 'kcal', activityBonus > 0 ? '+Sport' : 'Aufbauziel', 'var(--teal)'],
            ['Protein',   macros.protein + 'g',   macros.pp + '%',                              'var(--teal)'],
            ['Carbs',     macros.carbs + 'g',     macros.cp + '%',                              'var(--navy-l)'],
            ['Fett',      macros.fat + 'g',       macros.fp + '%',                              'var(--amber)'],
          ].map(([l, v, s, c]) => (
            <div key={l} style={{ background:'#fff', borderRadius:'10px', padding:'8px 10px', border:'1px solid var(--cream3)' }}>
              <div style={{ fontSize:'.66rem', color:'var(--txt3)' }}>{l}</div>
              <div style={{ fontWeight:600, color:c, fontSize:'.95rem', margin:'2px 0' }}>{v}</div>
              <div style={{ fontSize:'.66rem', color:'var(--txt3)' }}>{s}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:'.73rem', color:'var(--txt3)', marginTop:'8px', lineHeight:1.5 }}>
          Ziel: Muskelaufbau 85→88-90 kg · 1,7 g Protein/kg · Low-GI · PCOS-freundlich · +250 kcal Überschuss
        </p>
      </div>
    </div>
  );
}

// ── KALENDER ──────────────────────────────────────────────────────────────
function CalendarView({ plan, updatePlanDay, curWeek, setCurWeek, toggleEaten,
                        batchMode, setBatchMode, applyBatch, allRecipes,
                        leftovers, toast, setModal }) {

  const days     = weekDates(curWeek);
  const dragRef  = React.useRef(null);
  const [dragOver, setDragOver] = React.useState(null);
  const todayKey = dk(new Date());
  const WORKOUTS = window.WORKOUTS || [];

  function prev() { const d = new Date(curWeek); d.setDate(d.getDate()-7); setCurWeek(getMonday(d)); }
  function next() { const d = new Date(curWeek); d.setDate(d.getDate()+7); setCurWeek(getMonday(d)); }

  function onDragStart(e, dateK, meal) { dragRef.current = { dateK, meal }; e.dataTransfer.effectAllowed = 'move'; }
  function onDrop(tDateK, tMeal) {
    if (!dragRef.current) return;
    const { dateK, meal } = dragRef.current;
    if (dateK === tDateK && meal === tMeal) { dragRef.current = null; setDragOver(null); return; }
    const src = plan[dateK]?.[meal];
    const tgt = plan[tDateK]?.[tMeal];
    updatePlanDay(dateK,  { [meal]:  tgt });
    updatePlanDay(tDateK, { [tMeal]: src });
    toast('🔄 Mahlzeiten getauscht!');
    dragRef.current = null; setDragOver(null);
  }

  const wlbl = `KW ${getISOWeek(curWeek)} · ${curWeek.getDate()}. ${MONTHS[curWeek.getMonth()]} ${curWeek.getFullYear()}`;

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.75rem', flexWrap:'wrap', gap:'8px' }}>
        <div className="week-nav">
          <button type="button" className="week-nav-btn" onClick={prev}>‹</button>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:'.92rem' }}>{wlbl}</span>
          <button type="button" className="week-nav-btn" onClick={next}>›</button>
        </div>
        <label style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer', fontSize:'.78rem', fontWeight:500, margin:0, background: batchMode ? 'var(--teal-p)' : 'var(--cream2)', padding:'8px 12px', borderRadius:'8px', border:'1px solid ' + (batchMode ? 'var(--teal-l)' : 'var(--cream3)') }}>
          <input type="checkbox" checked={batchMode} onChange={e => setBatchMode(e.target.checked)} style={{ width:16, height:16, accentColor:'var(--teal)' }}/>
          📦 Vorkochen
        </label>
      </div>

      {leftovers.length > 0 && (
        <div className="leftover-card">
          <div style={{ fontWeight:500, fontSize:'.81rem', marginBottom:'4px' }}>♻️ Diese Woche nur einmal – nutzen statt neu kaufen:</div>
          <div style={{ display:'flex', gap:'4px', flexWrap:'wrap', marginTop:'4px' }}>
            {leftovers.map(l => <span key={l} className="tag">↪ {l}</span>)}
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'3px', overflowX:'auto', minWidth:0 }} className="calg">
        {days.map(d => {
          const dateK   = dk(d);
          const day     = plan[dateK];
          const isToday = dateK === todayKey;
          const wout    = day ? WORKOUTS.find(w => w.id === day.workout_id) : null;
          const wDone   = !!day?.workout_done;
          return (
            <div key={dateK} className="day-col"
                 style={{ border: isToday ? '2px solid var(--teal)' : '1px solid var(--cream3)', opacity: day ? 1 : .45 }}>
              <div className="day-header" style={{ background: isToday ? 'var(--teal)' : 'var(--navy)' }}>
                {DAYS[d.getDay()]} {d.getDate()}.
              </div>
              {/* Sport-Indikator */}
              {wout && wout.id !== 'rest' && (
                <div style={{ background: wDone ? 'var(--green-p)' : 'var(--sport-p)', padding:'2px 4px', fontSize:'.55rem', color: wDone ? '#1a4a28' : 'var(--sport)', textAlign:'center', borderBottom:'1px solid var(--cream2)' }}>
                  {wDone ? '✓ ' : ''}{wout.id === 'ppl_push' ? '💪' : wout.id === 'ppl_pull' ? '🔄' : '🦵'}
                </div>
              )}
              <div style={{ padding:'3px', display:'flex', flexDirection:'column', gap:'3px' }}>
                {day ? ['breakfast','lunch','dinner'].map(m => {
                  const r     = day[m];
                  const eaten = day.eaten[m] || false;
                  const mI    = { breakfast:'🌅', lunch:'☀️', dinner:'🌙' }[m];
                  const isPcos = r?.tags?.includes('pcos');
                  return (
                    <div key={m}
                         className={`meal-card ${eaten ? 'eaten' : ''} ${dragOver === dateK+m ? 'drag-active' : ''}`}
                         draggable
                         onDragStart={e  => onDragStart(e, dateK, m)}
                         onDragOver={e   => { e.preventDefault(); setDragOver(dateK+m); }}
                         onDragLeave={()  => setDragOver(null)}
                         onDrop={e       => { e.preventDefault(); onDrop(dateK, m); }}
                         style={{ padding: '4px' }}
                         onClick={() => r && setModal({ dateK, meal:m, recipe:r, day })}>
                      <div style={{ fontSize:'.56rem', color:'var(--txt3)', marginBottom:'1px' }}>{mI}{isPcos ? ' 🌸' : ''}</div>
                      <div style={{ fontSize:'.59rem', fontWeight:500, lineHeight:1.25, color: eaten ? 'var(--green)' : 'var(--txt)' }}>{r?.name || '–'}</div>
                      {r && (
                        <div style={{ display:'flex', gap:'2px', marginTop:'2px' }}>
                          <span style={{ fontSize:'.5rem', background:'var(--teal-p)', color:'#1a5a50', borderRadius:'3px', padding:'1px 3px' }}>{r.macros.protein}p</span>
                          <span style={{ fontSize:'.5rem', background:'#dbeafe', color:'#1e40af', borderRadius:'3px', padding:'1px 3px' }}>{r.macros.carbs}c</span>
                        </div>
                      )}
                      <div style={{ display:'flex', gap:'3px', marginTop:'3px', alignItems:'center' }}>
                        <div onClick={e => { e.stopPropagation(); toggleEaten(dateK, m); }}
                             className={`check-box ${eaten ? 'checked' : ''}`}
                             style={{ width:12, height:12, borderRadius:3, borderWidth:'1.5px' }}/>
                        {batchMode && r && (r.batchDays||1) > 1 && (
                          <button type="button"
                                  style={{ fontSize:'.48rem', padding:'1px 3px', background:'var(--teal-p)', border:'1px solid var(--teal-l)', color:'var(--teal)', borderRadius:'3px', cursor:'pointer', flex:1, fontFamily:"'DM Sans',sans-serif" }}
                                  onClick={e => { e.stopPropagation(); applyBatch(dateK, m, r); }}>
                            📦{r.batchDays}d
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }) : <div style={{ padding:'6px 4px', fontSize:'.6rem', color:'var(--txt3)' }}>–</div>}
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize:'.73rem', color:'var(--txt3)', marginTop:'8px' }}>
        💡 Drag &amp; Drop zum Tauschen · Klick = Rezeptdetails · 🌸 = PCOS · 💪🔄🦵 = Training
      </p>
    </div>
  );
}

// ── MEAL MODAL ────────────────────────────────────────────────────────────
function MealModal({ modal, onClose, allRecipes, updatePlanDay, batchMode, applyBatch, toast }) {
  const { dateK, meal, recipe: r } = modal;
  const [swapOpen, setSwapOpen] = React.useState(false);
  const mLabel   = { breakfast:'Frühstück', lunch:'Mittagessen', dinner:'Abendessen' }[meal];
  const sameType = allRecipes.filter(x => x.type === meal && x.id !== r?.id);

  function swap(nr) { updatePlanDay(dateK, { [meal]: nr }); toast(`✏️ Ersetzt: ${nr.name}`); onClose(); }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <span className="modal-drag"/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.85rem' }}>
          <div>
            <div style={{ fontSize:'.72rem', color:'var(--txt3)', marginBottom:'2px' }}>{mLabel} · {dateK}</div>
            <h3 style={{ fontWeight:400, fontSize:'1.25rem', lineHeight:1.2 }}>{r?.name}</h3>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>✕</button>
        </div>

        {r && <>
          <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', marginBottom:'.8rem' }}>
            <span className="rm rm-p">{r.macros.protein}g P</span>
            <span className="rm rm-c">{r.macros.carbs}g C</span>
            <span className="rm rm-f">{r.macros.fat}g F</span>
            <span className="rm rm-k">{r.macros.kcal} kcal</span>
            {r.prepMin && <span className="badge badge-blue">⏱ {r.prepMin} Min</span>}
          </div>
          <div style={{ display:'flex', gap:'4px', flexWrap:'wrap', marginBottom:'.8rem' }}>
            {r.tags?.map(t => <TagBadge key={t} tag={t}/>)}
          </div>
          <div className="form-group">
            <label>Zutaten</label>
            <ul style={{ paddingLeft:'1.15rem', fontSize:'.82rem', color:'var(--txt2)', lineHeight:1.7 }}>
              {r.ingredients.map((x, n) => <li key={n}>{x}</li>)}
            </ul>
          </div>
          {r.steps && (
            <div className="form-group">
              <label>Zubereitung</label>
              <p style={{ fontSize:'.82rem', color:'var(--txt2)', lineHeight:1.6, background:'var(--cream2)', padding:'10px 12px', borderRadius:'8px' }}>{r.steps}</p>
            </div>
          )}
          {batchMode && (r.batchDays||1) > 1 && (
            <button type="button" className="btn btn-amber" style={{ width:'100%', marginBottom:'8px' }}
                    onClick={() => { applyBatch(dateK, meal, r); onClose(); }}>
              📦 Als Vorkochen einplanen ({r.batchDays} Tage)
            </button>
          )}
        </>}

        <hr className="divl"/>
        <button type="button" className="btn btn-secondary" style={{ width:'100%', marginBottom:'8px' }}
                onClick={() => setSwapOpen(s => !s)}>
          🔄 Anderes Rezept wählen {swapOpen ? '▲' : '▼'}
        </button>
        {swapOpen && (
          <div style={{ maxHeight:'240px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'4px' }}>
            {sameType.map(x => (
              <div key={x.id} className="meal-card" onClick={() => swap(x)} style={{ padding:'9px 12px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'8px' }}>
                  <div style={{ fontWeight:500, fontSize:'.82rem' }}>{x.name}</div>
                  {x.tags?.includes('pcos') && <span className="badge badge-purple" style={{ flexShrink:0 }}>🌸</span>}
                </div>
                <div style={{ display:'flex', gap:'4px', marginTop:'4px' }}>
                  <span className="rm rm-p">{x.macros.protein}g P</span>
                  <span className="rm rm-c">{x.macros.carbs}g C</span>
                  <span className="rm rm-k">{x.macros.kcal} kcal</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── EINKAUFSLISTE ─────────────────────────────────────────────────────────
function ShoppingView({ shoppingList, shopWeek, setShopWeek, leftovers }) {
  const [checked, setChecked] = React.useState({});
  const [hide,    setHide]    = React.useState(false);
  const [search,  setSearch]  = React.useState('');
  const [manual,  setManual]  = React.useState([]);
  const [manInp,  setManInp]  = React.useState('');

  const catMap = {
    Gemüse:        ['zucchini','brokkoli','spinat','paprika','aubergine','tomate','karotte','gurke','erbsen','avocado','süßkartoffel','frühlingszwiebeln','rucola','sellerie','kürbis','blumenkohl','spargel','champignon'],
    Eiweiß:        ['eier','tofu','tempeh','halloumi','mozzarella','parmesan','feta','ricotta','hüttenkäse','skyr','quark','camembert','lupinen','paneer'],
    Getreide:      ['haferflocken','quinoa','reis','nudeln','tortilla','couscous','bulgur','vollkornbrot','kräcker'],
    Hülsenfrüchte: ['linsen','kichererbsen','bohnen','edamame','sojaschnetzel','sojahack'],
    Milchprodukte: ['joghurt','milch','hafermilch','mandelmilch','kokosmilch','frischkäse','butter'],
    Nüsse:         ['walnüsse','erdnussmus','chiasamen','leinsamen','sesam','hanfsamen','mandelmus','tahini','mandeln','pinienkerne'],
    Gewürze:       ['salz','pfeffer','kurkuma','cumin','koriander','paprikapulver','oregano','thymian','zimt','ingwer','knoblauch','chili','currypaste','tamari','sesamöl','olivenöl','zitrone','limette','honig','ahornsirup','vanille','reisessig','miso'],
  };

  const allItems = [...shoppingList, ...manual.map(m => [m, 1])];
  const filtered = allItems.filter(([k]) => k.toLowerCase().includes(search.toLowerCase()));
  const cats = { Gemüse:[], Eiweiß:[], Getreide:[], Hülsenfrüchte:[], Milchprodukte:[], Nüsse:[], Gewürze:[], Sonstiges:[] };
  filtered.forEach(([k, n]) => {
    if (hide && checked[k]) return;
    let found = false;
    for (const [cat, words] of Object.entries(catMap)) {
      if (words.some(w => k.toLowerCase().includes(w))) { cats[cat].push([k, n]); found = true; break; }
    }
    if (!found) cats.Sonstiges.push([k, n]);
  });

  const done = filtered.filter(([k]) => checked[k]).length;
  function addManual() { const v = manInp.trim().toLowerCase(); if (!v) return; setManual(m => [...m, v]); setManInp(''); }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem', flexWrap:'wrap', gap:'8px' }}>
        <h2 style={{ fontWeight:400 }}>🛒 Einkaufsliste</h2>
        <div style={{ display:'flex', gap:'5px', alignItems:'center' }}>
          <button type="button" className="btn btn-secondary btn-sm"
                  onClick={() => { const d = new Date(shopWeek); d.setDate(d.getDate()-7); setShopWeek(getMonday(d)); }}>‹</button>
          <span style={{ fontSize:'.8rem', padding:'0 6px', whiteSpace:'nowrap' }}>KW {getISOWeek(shopWeek)}</span>
          <button type="button" className="btn btn-secondary btn-sm"
                  onClick={() => { const d = new Date(shopWeek); d.setDate(d.getDate()+7); setShopWeek(getMonday(d)); }}>›</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom:'.75rem' }}>
        <div style={{ display:'flex', gap:'8px' }}>
          <input placeholder="Eigenes Produkt hinzufügen…" value={manInp}
                 onChange={e => setManInp(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && addManual()} style={{ flex:1 }}/>
          <button type="button" className="btn btn-primary btn-sm" onClick={addManual}>+ Hinzu</button>
        </div>
      </div>

      <div style={{ display:'flex', gap:'7px', marginBottom:'.9rem', alignItems:'center', flexWrap:'wrap' }}>
        <input placeholder="Suche…" value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth:200 }}/>
        <span className="badge badge-teal">{done}/{filtered.length} ✓</span>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setHide(h => !h)}>
          {hide ? 'Alle zeigen' : 'Erledigte ausblenden'}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setChecked({})}>Reset</button>
      </div>

      {leftovers.length > 0 && (
        <div className="leftover-card" style={{ marginBottom:'.9rem' }}>
          <div style={{ fontWeight:500, fontSize:'.8rem' }}>♻️ Reste nutzen – nicht extra kaufen:</div>
          <div style={{ display:'flex', gap:'4px', flexWrap:'wrap', marginTop:'5px' }}>
            {leftovers.map(l => <span key={l} className="tag">✓ {l}</span>)}
          </div>
        </div>
      )}

      <div className="g2">
        {Object.entries(cats).filter(([,items]) => items.length > 0).map(([cat, items]) => (
          <div key={cat} className="card">
            <div style={{ fontWeight:600, fontSize:'.74rem', color:'var(--txt3)', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'.07em' }}>{cat}</div>
            {items.map(([k, n]) => (
              <div key={k} className="shopping-item" style={{ opacity: checked[k] ? .4 : 1 }}>
                <div className={`check-box ${checked[k] ? 'checked' : ''}`}
                     onClick={() => setChecked(c => ({...c, [k]: !c[k]}))}/>
                <span style={{ flex:1, fontSize:'.82rem', textDecoration: checked[k] ? 'line-through' : 'none', color: checked[k] ? 'var(--txt3)' : 'var(--txt)' }}>{k}</span>
                {n > 1 && <span className="badge badge-blue" style={{ fontSize:'.64rem' }}>×{n}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── REZEPT-BIBLIOTHEK ─────────────────────────────────────────────────────
function RecipesView({ customRecs, allRecipes, addCustomRecipe, deleteCustomRecipe, toast }) {
  const [filter,   setFilter]   = React.useState('all');
  const [tagF,     setTagF]     = React.useState('all');
  const [showForm, setShowForm] = React.useState(false);
  const [editR,    setEditR]    = React.useState(null);
  const ef = { name:'', type:'breakfast', prepMin:15, kcal:'', carbs:'', protein:'', fat:'', batchDays:1, ingredients:'', steps:'', pcos:true };
  const [form, setForm] = React.useState(ef);

  function openNew()   { setForm(ef); setEditR(null); setShowForm(true); }
  function openEdit(r) {
    setForm({ name:r.name, type:r.type, prepMin:r.prepMin||15, kcal:r.macros.kcal, carbs:r.macros.carbs, protein:r.macros.protein, fat:r.macros.fat, batchDays:r.batchDays||1, ingredients:(r.ingredients||[]).join('\n'), steps:r.steps||'', pcos:r.tags?.includes('pcos')||false });
    setEditR(r); setShowForm(true);
  }

  async function save() {
    if (!form.name || !form.kcal) { toast('⚠️ Name & Kalorien sind Pflichtfelder'); return; }
    const tags = ['eigenes']; if (form.pcos) tags.push('pcos');
    const nr = {
      name: form.name, type: form.type, prepMin: parseInt(form.prepMin)||15,
      macros: { kcal: parseInt(form.kcal)||0, carbs: parseInt(form.carbs)||0, protein: parseInt(form.protein)||0, fat: parseInt(form.fat)||0 },
      ingredients: form.ingredients.split('\n').filter(Boolean),
      steps: form.steps, tags, batchDays: parseInt(form.batchDays)||1,
    };
    if (editR) { await deleteCustomRecipe(editR); await addCustomRecipe(nr); toast('✏️ Aktualisiert!'); }
    else await addCustomRecipe(nr);
    setShowForm(false); setEditR(null); setForm(ef);
  }

  const filtered = allRecipes.filter(r => {
    const tok = filter === 'all' || r.type === filter;
    const gok = tagF   === 'all' || (r.tags||[]).includes(tagF);
    return tok && gok;
  });

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem', flexWrap:'wrap', gap:'8px' }}>
        <h2 style={{ fontWeight:400 }}>📖 Rezept-Bibliothek</h2>
        <button type="button" className="btn btn-primary" onClick={openNew}>+ Eigenes Rezept</button>
      </div>

      {showForm && (
        <div className="card" style={{ border:'2px solid var(--teal-l)', marginBottom:'1rem' }}>
          <h3 style={{ marginBottom:'.9rem', fontWeight:400 }}>{editR ? 'Rezept bearbeiten' : 'Neues Rezept'}</h3>
          <div className="g2">
            <div className="form-group"><label>Name *</label><input value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} placeholder="z.B. Linsen-Bowl"/></div>
            <div className="form-group"><label>Typ</label>
              <select value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}>
                <option value="breakfast">Frühstück</option>
                <option value="lunch">Mittagessen</option>
                <option value="dinner">Abendessen</option>
              </select>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'7px' }}>
            {[['Kcal *','kcal'],['Carbs g','carbs'],['Protein g','protein'],['Fett g','fat'],['Batch d','batchDays']].map(([l,k]) => (
              <div key={k} className="form-group"><label>{l}</label><input type="number" value={form[k]} onChange={e => setForm(f => ({...f, [k]:e.target.value}))}/></div>
            ))}
          </div>
          <div className="form-group">
            <label style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer', marginBottom:0 }}>
              <input type="checkbox" checked={form.pcos} onChange={e => setForm(f => ({...f, pcos:e.target.checked}))} style={{ width:16, height:16, accentColor:'var(--purple)' }}/>
              🌸 PCOS-freundlich (Low-GI, kein Zucker/Weißmehl)
            </label>
          </div>
          <div className="form-group"><label>Zutaten (eine pro Zeile)</label><textarea rows={4} value={form.ingredients} onChange={e => setForm(f => ({...f, ingredients:e.target.value}))} placeholder={'200g Tofu\n150g Linsen\n1 Paprika'}/></div>
          <div className="form-group"><label>Zubereitung</label><textarea rows={3} value={form.steps} onChange={e => setForm(f => ({...f, steps:e.target.value}))}/></div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button type="button" className="btn btn-primary" onClick={save}>{editR ? 'Speichern' : 'Hinzufügen'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditR(null); }}>Abbrechen</button>
          </div>
        </div>
      )}

      <div className="tabs">
        {[['all','Alle'],['breakfast','Frühstück'],['lunch','Mittag'],['dinner','Abendessen']].map(([k,l]) => (
          <button key={k} type="button" className={`tab ${filter===k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>
      <div style={{ display:'flex', gap:'4px', flexWrap:'wrap', marginBottom:'.9rem' }}>
        {[['all','Alle'],['pcos','🌸 PCOS'],['lowgi','📉 Low-GI'],['protein','💪 Protein'],['legumes','🫘 Hülsenf.'],['batch','📦 Batch'],['muskelaufbau','🏋️ Aufbau']].map(([k,l]) => (
          <button key={k} type="button"
                  className={`badge ${tagF===k ? 'badge-teal' : 'badge-amber'}`}
                  style={{ cursor:'pointer', padding:'5px 10px', fontSize:'.76rem', border:'none', fontFamily:"'DM Sans',sans-serif", minHeight:'28px' }}
                  onClick={() => setTagF(k)}>{l}</button>
        ))}
      </div>
      <p style={{ fontSize:'.75rem', color:'var(--txt3)', marginBottom:'.75rem' }}>{filtered.length} Rezepte</p>

      <div className="g3">
        {filtered.map(r => (
          <div key={r.id} className="card" style={{ position:'relative', cursor: r.custom ? 'pointer' : 'default' }} onClick={() => r.custom && openEdit(r)}>
            {r.custom && <span className="badge badge-coral" style={{ position:'absolute', top:'12px', right:'12px' }}>Eigenes</span>}
            {r.tags?.includes('pcos') && <span style={{ position:'absolute', top: r.custom ? '33px' : '12px', right:'13px', fontSize:'.95rem' }}>🌸</span>}
            <div style={{ fontWeight:500, fontSize:'.86rem', marginBottom:'5px', paddingRight:'52px', lineHeight:1.3 }}>{r.name}</div>
            <div style={{ display:'flex', gap:'3px', flexWrap:'wrap', marginBottom:'6px' }}>
              {r.tags?.filter(t => t !== 'eigenes').slice(0,3).map(t => <TagBadge key={t} tag={t}/>)}
            </div>
            <div style={{ display:'flex', gap:'3px', flexWrap:'wrap', marginBottom:'6px' }}>
              <span className="rm rm-p">{r.macros.protein}g P</span>
              <span className="rm rm-c">{r.macros.carbs}g C</span>
              <span className="rm rm-f">{r.macros.fat}g F</span>
              <span className="rm rm-k">{r.macros.kcal} kcal</span>
            </div>
            {r.prepMin && <div style={{ fontSize:'.7rem', color:'var(--txt3)', marginBottom:'4px' }}>⏱ {r.prepMin} Min{r.batchDays > 1 ? ' · 📦 ' + r.batchDays + 'd' : ''}</div>}
            <div style={{ fontSize:'.73rem', color:'var(--txt3)', lineHeight:1.4, marginBottom: r.custom ? '8px' : '0' }}>
              {r.ingredients?.slice(0,3).join(', ')}{r.ingredients?.length > 3 ? ` +${r.ingredients.length-3}…` : ''}
            </div>
            {r.custom && (
              <div style={{ display:'flex', gap:'5px', marginTop:'4px' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); openEdit(r); }}>✏️ Bearbeiten</button>
                <button type="button" className="btn btn-danger btn-sm"    onClick={e => { e.stopPropagation(); deleteCustomRecipe(r); }}>Löschen</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
