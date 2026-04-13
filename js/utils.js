/* ══════════════════════════════════════════════════════════════
   js/utils.js
   Hilfsfunktionen, Konstanten, Makro-Berechnung, Sport-Logik,
   Plan-Builder.
   Kein JSX – normaler <script> ohne type="text/babel".
   Setzt voraus: window.RECIPES, window.WORKOUTS (aus recipes.js
   und sportplan.js bereits geladen).
   ══════════════════════════════════════════════════════════════ */

// ── DATUM-UTILITIES ───────────────────────────────────────────────────────
function dk(d) { return d instanceof Date ? d.toISOString().slice(0, 10) : d; }
function fmt(v) { return typeof v === 'number' ? Math.round(v) : v; }

function getMonday(d) {
  const c = new Date(d), day = c.getDay(),
    diff = c.getDate() - day + (day === 0 ? -6 : 1);
  c.setDate(diff); c.setHours(0, 0, 0, 0); return c;
}

function weekDates(mon) {
  return Array.from({length: 7}, (_, i) => {
    const d = new Date(mon); d.setDate(d.getDate() + i); return d;
  });
}

function getISOWeek(d) {
  const dt = new Date(d); dt.setHours(0, 0, 0, 0);
  dt.setDate(dt.getDate() + 3 - (dt.getDay() + 6) % 7);
  const w1 = new Date(dt.getFullYear(), 0, 4);
  return 1 + Math.round(((dt - w1) / 86400000 - 3 + (w1.getDay() + 6) % 7) / 7);
}

function addDays(dateStr, n) {
  const d = new Date(dateStr); d.setDate(d.getDate() + n); return dk(d);
}

// WICHTIG: Index 0 = Sonntag, weil JavaScript's getDay() mit 0=Sonntag beginnt.
const DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];

// ── PERSON & MAKROS ───────────────────────────────────────────────────────
const PERSON = { gender: 'm', height: 190, weight: 85, age: 35, goalKg: 89 };

function calcMacros(p) {
  // Mifflin-St Jeor BMR × 1.55 (moderat aktiv) + 250 kcal Aufbauüberschuss
  const bmr    = 88.362 + 13.397 * p.weight + 4.799 * p.height - 5.677 * p.age;
  const target = Math.round(bmr * 1.55) + 250;
  const protein = Math.round(p.weight * 1.7);      // ~28 % bei 85 kg
  const carbs   = Math.round(target * 0.35 / 4);   // 35 % Carbs
  const fat     = Math.round((target - protein * 4 - carbs * 4) / 9);
  const pp = Math.round(protein * 4 / target * 100);
  const cp = Math.round(carbs   * 4 / target * 100);
  const fp = 100 - pp - cp;
  return { kcal: target, protein, carbs, fat, pp, cp, fp };
}

// ── SPORT-LOGIK (PPL-Split) ───────────────────────────────────────────────
// Plan-Start: Montag 13. April 2026
const PLAN_START = new Date(2026, 3, 13);

// Wochentag → workout_id  (0=So … 6=Sa)
const DOW_TO_WORKOUT = {
  1: 'ppl_push',  // Montag
  3: 'ppl_pull',  // Mittwoch
  5: 'ppl_legs',  // Freitag
};

/** Standardmäßiges Workout für ein Datum (ohne manuelle Verschiebungen). */
function baseWorkoutForDate(dateObj) {
  const wid = DOW_TO_WORKOUT[dateObj.getDay()];
  return (window.WORKOUTS || []).find(w => w.id === (wid || 'rest'))
    || (window.WORKOUTS || []).find(w => w.id === 'rest');
}

/**
 * Trainingsphase nach Wochen seit PLAN_START:
 *   Woche 1-2 → Phase 1 (2 Sätze,  ~30 Min)
 *   Woche 3-4 → Phase 2 (original, ~60 Min)
 *   Woche 5-6 → Phase 3 (+1 Satz,  ~90 Min)
 */
function getTrainingPhase(dateObj) {
  const daysDiff = Math.floor((dateObj - PLAN_START) / 86400000);
  if (daysDiff < 0) return 2;
  const week = Math.floor(daysDiff / 7) + 1;
  if (week <= 2) return 1;
  if (week <= 4) return 2;
  return 3;
}

/** Gibt Übungsliste mit phasengerechten Satzzahlen zurück. */
function adjustedExercises(workout, phase) {
  return workout.exercises.map(ex => {
    let sets = ex.sets;
    if (phase === 1) sets = Math.min(sets, 2);
    if (phase === 3) sets = sets + 1;
    return { ...ex, sets };
  });
}

// ── PLAN-BUILDER ──────────────────────────────────────────────────────────
/** Baut den 6-Wochen-Plan aus RECIPES auf (Fallback, falls Supabase leer). */
function buildWeekPlan() {
  const plan = {};
  const RECIPES = window.RECIPES || [];
  const bf = RECIPES.filter(r => r.type === 'breakfast');
  const lu = RECIPES.filter(r => r.type === 'lunch');
  const di = RECIPES.filter(r => r.type === 'dinner');
  if (!bf.length || !lu.length || !di.length) {
    console.error('[utils] buildWeekPlan: RECIPES nicht geladen!');
    return plan;
  }
  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      const d = new Date(PLAN_START);
      d.setDate(d.getDate() + week * 7 + day);
      const key = dk(d);
      plan[key] = {
        breakfast:    bf[(week * 7 + day)     % bf.length],
        lunch:        lu[(week * 7 + day + 2) % lu.length],
        dinner:       di[(week * 7 + day + 5) % di.length],
        eaten:        { breakfast: false, lunch: false, dinner: false },
        workout_id:   baseWorkoutForDate(d).id,
        workout_done: false,
      };
    }
  }
  return plan;
}
