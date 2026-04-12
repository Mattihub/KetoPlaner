/* ══════════════════════════════════════════════════════════════
   js/api.js
   Alle Supabase-Datenbankoperationen (dbLoad* / dbSave*).
   Kein JSX – normaler <script> ohne type="text/babel".
   Setzt voraus: sb, USER_ID (inline in index.html gesetzt),
   sowie window.RECIPES und buildWeekPlan() aus utils.js.
   ══════════════════════════════════════════════════════════════ */

// ── PLAN (calendar_days) ──────────────────────────────────────────────────
async function dbLoadPlan() {
  try {
    const { data, error } = await sb
      .from('calendar_days')
      .select('*')
      .eq('user_id', USER_ID);

    if (error || !data || !data.length) return null;

    const plan    = buildWeekPlan();   // Fallback-Skelett aus utils.js
    const RECIPES = window.RECIPES || [];

    data.forEach(row => {
      const key = (row.date_key || '').slice(0, 10);
      if (!key || !plan[key]) return;

      plan[key].eaten = {
        breakfast: !!row.eaten?.breakfast,
        lunch:     !!row.eaten?.lunch,
        dinner:    !!row.eaten?.dinner,
      };
      plan[key].workout_done = !!row.workout_done;
      if (row.workout_id) plan[key].workout_id = row.workout_id;

      ['breakfast', 'lunch', 'dinner'].forEach(m => {
        const rid = row[m + '_id'];
        if (rid) {
          const r = RECIPES.find(x => x.id === rid);
          if (r) plan[key][m] = r;
        }
      });
    });
    return plan;
  } catch (e) {
    console.warn('[api] dbLoadPlan:', e);
    return null;
  }
}

async function dbSaveDay(key, day) {
  try {
    await sb.from('calendar_days').upsert({
      user_id:      USER_ID,
      date_key:     key,
      breakfast_id: day.breakfast?.id || null,
      lunch_id:     day.lunch?.id     || null,
      dinner_id:    day.dinner?.id    || null,
      eaten: {
        breakfast: !!day.eaten?.breakfast,
        lunch:     !!day.eaten?.lunch,
        dinner:    !!day.eaten?.dinner,
      },
      workout_id:   day.workout_id   || null,
      workout_done: !!day.workout_done,
    }, { onConflict: 'user_id,date_key' });
  } catch (e) {
    console.warn('[api] dbSaveDay:', e);
  }
}

// ── ELEKTROLYTE / SUPPLEMENTS (electrolytes) ──────────────────────────────
async function dbLoadSupplements() {
  try {
    const { data } = await sb
      .from('electrolytes')
      .select('*')
      .eq('user_id', USER_ID);

    if (!data) return {};
    const obj = {};
    data.forEach(r => {
      const k = (r.date_key || '').slice(0, 10);
      obj[k + '_mg']   = !!r.magnesium;
      obj[k + '_k']    = !!r.kalium;
      obj[k + '_salt'] = !!r.natrium;
    });
    return obj;
  } catch (e) {
    console.warn('[api] dbLoadSupplements:', e);
    return {};
  }
}

async function dbSaveSupplement(dateKey, field, value) {
  try {
    const map = { mg: 'magnesium', k: 'kalium', salt: 'natrium' };
    await sb.from('electrolytes').upsert(
      { user_id: USER_ID, date_key: dateKey, [map[field]]: value },
      { onConflict: 'user_id,date_key' }
    );
  } catch (e) {
    console.warn('[api] dbSaveSupplement:', e);
  }
}

// ── EIGENE REZEPTE (custom_recipes) ──────────────────────────────────────
async function dbLoadCustomRecipes() {
  try {
    const { data } = await sb
      .from('custom_recipes')
      .select('*')
      .eq('user_id', USER_ID);

    if (!data) return [];
    return data.map(r => ({
      ...r.recipe_data,
      id:          'c' + r.id,
      supabase_id: r.id,
      custom:      true,
    }));
  } catch (e) {
    console.warn('[api] dbLoadCustomRecipes:', e);
    return [];
  }
}

async function dbSaveCustomRecipe(recipe) {
  try {
    const { data } = await sb
      .from('custom_recipes')
      .insert({ user_id: USER_ID, recipe_data: recipe })
      .select()
      .single();
    return data ? ('c' + data.id) : recipe.id;
  } catch (e) {
    console.warn('[api] dbSaveCustomRecipe:', e);
    return recipe.id;
  }
}

async function dbDeleteCustomRecipe(supabaseId) {
  try {
    await sb
      .from('custom_recipes')
      .delete()
      .eq('id', supabaseId)
      .eq('user_id', USER_ID);
  } catch (e) {
    console.warn('[api] dbDeleteCustomRecipe:', e);
  }
}
