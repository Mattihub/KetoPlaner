// js/sportplan.js – Push/Pull/Legs Split
// Wird global als window.WORKOUTS bereitgestellt.
window.WORKOUTS = [
  {
    id: "ppl_push",
    name: "Push (Brust/Schulter/Trizeps)",
    type: "Maschinen",
    day: "Mo",
    exercises: [
      { name: "Brustpresse (sitzend)",          sets: 3, reps: "12-15", note: "Fokus auf Dehnung" },
      { name: "Schulterpresse (Maschine)",       sets: 3, reps: "12-15", note: "Griffe auf Schulterhöhe" },
      { name: "Butterfly (Gerät)",               sets: 2, reps: "15",    note: "Brust stolz machen" },
      { name: "Trizeps-Drücken am Kabel",        sets: 3, reps: "12",    note: "Ellbogen am Körper fixieren" }
    ],
    kcalBurn: 280
  },
  {
    id: "ppl_pull",
    name: "Pull (Rücken/Bizeps)",
    type: "Maschinen",
    day: "Mi",
    exercises: [
      { name: "Latzug-Maschine (breit)",         sets: 3, reps: "12-15", note: "In den Rücken ziehen" },
      { name: "Rudermaschine (enger Griff)",      sets: 3, reps: "12-15", note: "Schulterblätter zusammen" },
      { name: "Reverse Butterfly",               sets: 2, reps: "15",    note: "Hintere Schulter fokussieren" },
      { name: "Bizeps-Maschine",                 sets: 3, reps: "12",    note: "Langsame Abwärtsbewegung" }
    ],
    kcalBurn: 250
  },
  {
    id: "ppl_legs",
    name: "Legs (Beine/Bauch)",
    type: "Maschinen",
    day: "Fr",
    exercises: [
      { name: "Beinpresse 45°",                  sets: 3, reps: "12-15", note: "Füße hüftbreit" },
      { name: "Beinstrecker-Maschine",            sets: 3, reps: "15",    note: "Oben kurz halten" },
      { name: "Beinbeuger (liegend)",             sets: 3, reps: "15",    note: "Fersen zum Gesäß" },
      { name: "Wadenheben (sitzend)",             sets: 3, reps: "15",    note: "Voller Bewegungsradius" },
      { name: "Bauch-Crunch-Maschine",            sets: 3, reps: "20",    note: "Aus dem Bauch rollen" }
    ],
    kcalBurn: 350
  },
  {
    id: "rest",
    name: "Regeneration",
    type: "Aktiv",
    day: null,
    exercises: [
      { name: "Lockeres Gehen / Mobilität",      sets: 1, reps: "20 Min", note: "Keine Belastung" }
    ],
    kcalBurn: 120
  }
];
