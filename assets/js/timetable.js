/* ===========================================================================
 * TIMETABLE DATA — single source of truth
 * ===========================================================================
 *
 * UPDATING THIS FILE WHEN THE SCHOOL SENDS A NEW PDF:
 *
 * 1. Update DATA.meta.generated (DD-MM-YYYY from the PDF header)
 *    and DATA.meta.generatedDisplay (human-readable, e.g. "10 Sep 2026").
 *
 * 2. For each class that changed, update its day arrays in DATA.schedules.
 *    Every day is a 10-slot array, one slot per period:
 *
 *      Slot 0 → P1: 08:50 – 09:30
 *      Slot 1 → P2: 09:30 – 10:10
 *                   [ Snack Break 10:10 – 10:30 — not in array ]
 *      Slot 2 → P3: 10:30 – 11:10
 *      Slot 3 → P4: 11:10 – 11:50
 *      Slot 4 → P5: 11:50 – 12:30
 *      Slot 5 → P6: 12:30 – 13:05   (LUN for Gr1–Gr5)
 *      Slot 6 → P7: 13:05 – 13:40   (LUN for Gr6+)
 *      Slot 7 → P8: 13:40 – 14:15
 *      Slot 8 → P9: 14:15 – 14:50
 *      Slot 9 → P10: 14:50 – 15:25
 *
 *    Pre-primary classes (NUR / LKG / UKG) use slots 0–4 only.
 *    Use "" for any empty / unused slot.
 *
 *    Use "LUN" for the lunch period.
 *
 * 3. Commit and push. That's it.
 *
 * Subject abbreviations are documented in DATA.legend below — extend it if
 * the school introduces new subjects.
 * ===========================================================================
 */

const DATA = {
  meta: {
    generated: "06-06-2026",
    generatedDisplay: "06 Jun 2026"
  },

  days: ["Mo", "Tu", "We", "Th", "Fr"],
  dayLabels: { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday" },
  dayShort:  { Mo: "Mon",    Tu: "Tue",     We: "Wed",       Th: "Thu",      Fr: "Fri" },

  periods: [
    { num: 1,  time: "08:50 – 09:30" },
    { num: 2,  time: "09:30 – 10:10" },
    { num: 3,  time: "10:30 – 11:10" },
    { num: 4,  time: "11:10 – 11:50" },
    { num: 5,  time: "11:50 – 12:30" },
    { num: 6,  time: "12:30 – 13:05" },
    { num: 7,  time: "13:05 – 13:40" },
    { num: 8,  time: "13:40 – 14:15" },
    { num: 9,  time: "14:15 – 14:50" },
    { num: 10, time: "14:50 – 15:25" }
  ],

  // Break sits visually between slot index 1 (P2) and slot index 2 (P3).
  snackBreak: { time: "10:10 – 10:30", label: "Snack Break" },

  groups: [
    { id: "pre",       label: "Pre-Primary", classes: ["NUR", "LKG-A", "UKG-A", "UKG-B"] },
    { id: "primary",   label: "Primary",     classes: ["Gr1A", "Gr2A", "Gr3A", "Gr3B", "Gr4A", "Gr4B", "Gr5A", "Gr5B"] },
    { id: "middle",    label: "Middle",      classes: ["Gr6A", "Gr6B", "Gr7A", "Gr7B", "Gr8A", "Gr8B"] },
    { id: "secondary", label: "Secondary",   classes: ["Gr9A", "Gr9B", "Gr10"] },
    { id: "senior",    label: "Senior",      classes: ["Gr11", "Gr12"] }
  ],

  // Subjects shown with the whole-school activity highlight (coral background)
  activitySubjects: ["DMA", "Sports", "M/D", "Drama", "Ev'ts", "Clubs"],

  schedules: {

    /* ─── PRE-PRIMARY ──────────────────────────────────────────────────── */
    "NUR": {
      label: "Nursery",
      Mo: ["Num", "Lit'cy", "UTW", "Story", "PE", "", "", "", "", ""],
      Tu: ["Lit'cy", "Num", "Dan", "UTW", "Mus", "", "", "", "", ""],
      We: ["Drama", "Num", "OP", "Lit'cy", "UTW", "", "", "", "", ""],
      Th: ["Art", "UTW", "Num", "Lit'cy", "Lib", "", "", "", "", ""],
      Fr: ["PE", "UTW", "Art", "Num", "Lit'cy", "", "", "", "", ""]
    },
    "LKG-A": {
      label: "LKG-A",
      Mo: ["Num", "Lib", "Lit'cy", "Art", "UTW", "", "", "", "", ""],
      Tu: ["Num", "Art", "Lit'cy", "PE", "UTW", "", "", "", "", ""],
      We: ["Lit'cy", "UTW", "Drama", "Num", "Story", "", "", "", "", ""],
      Th: ["Num", "OP", "UTW", "Mus", "Lit'cy", "", "", "", "", ""],
      Fr: ["Num", "Lit'cy", "PE", "UTW", "Dan", "", "", "", "", ""]
    },
    "UKG-A": {
      label: "UKG-A",
      Mo: ["Lit'cy", "Num", "Art", "UTW", "Lit'cy", "", "", "", "", ""],
      Tu: ["Lit'cy", "Num", "OP", "Mus", "UTW", "", "", "", "", ""],
      We: ["Sports", "Num", "UTW", "Drama", "Lit'cy", "", "", "", "", ""],
      Th: ["PE", "Num", "Art", "Lib", "Lit'cy", "", "", "", "", ""],
      Fr: ["UTW", "Hin", "Num", "Dan", "Lit'cy", "", "", "", "", ""]
    },
    "UKG-B": {
      label: "UKG-B",
      Mo: ["PE", "Num", "Lit'cy", "Hin", "UTW", "", "", "", "", ""],
      Tu: ["Lit'cy", "Num", "Art", "OP", "UTW", "", "", "", "", ""],
      We: ["Sports", "UTW", "Num", "Lit'cy", "Lib", "", "", "", "", ""],
      Th: ["UTW", "Lit'cy", "Mus", "Num", "Lit'cy", "", "", "", "", ""],
      Fr: ["Lit'cy", "Dan", "Num", "Drama", "Art", "", "", "", "", ""]
    },

    /* ─── PRIMARY ──────────────────────────────────────────────────────── */
    "Gr1A": {
      label: "Grade 1A",
      Mo: ["Math", "Art", "Dan", "ICT", "Sci", "LUN", "Math", "Eng", "Hin/Fr", "Sci"],
      Tu: ["Math", "Yog", "Lib", "Sci", "Eng", "LUN", "Eng", "GP", "Math", "Sci"],
      We: ["Sports", "Hin/Fr", "Art", "Hin/Fr", "DMA", "LUN", "Sci", "PE", "Eng", "CT"],
      Th: ["Math", "Mus", "PE", "Eng", "Kon", "LUN", "Hin/Fr", "Eng", "Sci", "DMA"],
      Fr: ["Hin/Fr", "Math", "Drama", "ICT", "Math", "LUN", "Eng", "Lib", "DMA", "Ev'ts"]
    },
    "Gr2A": {
      label: "Grade 2A",
      Mo: ["Dan", "Math", "Eng", "Lib", "PE", "LUN", "Hin/Fr", "Sci", "Art", "Kon"],
      Tu: ["Math", "Math", "Sci", "ICT", "Hin/Fr", "LUN", "Eng", "ICT", "CT", "Sci"],
      We: ["Sports", "Lib", "Math", "Mus", "DMA", "LUN", "Eng", "Hin/Fr", "Eng", "Sci"],
      Th: ["Yog", "Eng", "Math", "PE", "Hin/Fr", "LUN", "Art", "Sci", "GP", "DMA"],
      Fr: ["Math", "Drama", "Eng", "Hin/Fr", "Eng", "LUN", "Sci", "Math", "DMA", "Ev'ts"]
    },
    "Gr3A": {
      label: "Grade 3A",
      Mo: ["Math", "LeadCurr", "PE", "Eng", "Sci", "LUN", "Art", "Hin/Fr", "Eng", "GP"],
      Tu: ["Math", "GP", "Sci", "Mus", "Eng", "LUN", "Hin/Fr", "Lib", "ICT", "Math"],
      We: ["Math", "Sci", "Sports", "Eng", "DMA", "LUN", "ICT", "GP", "Clubs", "Kon"],
      Th: ["Sci", "Hin/Fr", "Drama", "Dan", "Art", "LUN", "GP", "Eng", "PE", "DMA"],
      Fr: ["Math", "Sci", "Lib", "Math", "Hin/Fr", "LUN", "Eng", "ICT", "DMA", "Ev'ts"]
    },
    "Gr3B": {
      label: "Grade 3B",
      Mo: ["Sci", "Eng", "PE", "GP", "ICT", "LUN", "Eng", "Hin/Fr", "Math", "Kon"],
      Tu: ["Math", "Mus", "GP", "Art", "Sci", "LUN", "Hin/Fr", "Eng", "Lib", "Sci"],
      We: ["Sci", "ICT", "Sports", "Art", "DMA", "LUN", "Math", "GP", "Clubs", "Eng"],
      Th: ["Drama", "Hin/Fr", "Dan", "Eng", "ICT", "LUN", "Lib", "Math", "PE", "DMA"],
      Fr: ["Math", "Eng", "LeadCurr", "GP", "Hin/Fr", "LUN", "Sci", "Math", "DMA", "Ev'ts"]
    },
    "Gr4A": {
      label: "Grade 4A",
      Mo: ["Eng", "Sci", "Hin/Fr", "Math", "Dan", "LUN", "GP", "Art", "Math", "Kon"],
      Tu: ["ICT", "Sci", "Mus", "Hin/Fr", "PE", "LUN", "GP", "Art", "Eng", "Eng"],
      We: ["Hin/Fr", "GP", "Sports", "Math", "DMA", "LUN", "Eng", "Sci", "Clubs", "Lib"],
      Th: ["ICT", "PE", "Eng", "Math", "Math", "LUN", "Hin/Fr", "Sci", "Lib", "DMA"],
      Fr: ["Sci", "GP", "Math", "Eng", "Drama", "LUN", "ICT", "LeadCurr", "DMA", "Ev'ts"]
    },
    "Gr4B": {
      label: "Grade 4B",
      Mo: ["Math", "Sci", "Hin/Fr", "Dan", "Art", "LUN", "Eng", "Math", "ICT", "Eng"],
      Tu: ["Eng", "Math", "ICT", "Hin/Fr", "PE", "LUN", "Kon", "GP", "Sci", "Lib"],
      We: ["Hin/Fr", "Drama", "Sports", "Sci", "DMA", "LUN", "GP", "Mus", "Clubs", "Math"],
      Th: ["Eng", "PE", "Sci", "GP", "Eng", "LUN", "Hin/Fr", "LeadCurr", "ICT", "DMA"],
      Fr: ["Sci", "Lib", "Eng", "Art", "Math", "LUN", "Math", "GP", "DMA", "Ev'ts"]
    },
    "Gr5A": {
      label: "Grade 5A",
      Mo: ["ICT", "Eng", "Math", "Hin/Fr", "Sci", "LUN", "GP", "PE", "GP", "Lib"],
      Tu: ["LeadCurr", "Hin/Fr", "Math", "Dan", "Sci", "LUN", "ICT", "Eng", "Art", "GP"],
      We: ["Math", "Mus", "Sports", "Eng", "DMA", "LUN", "Eng", "Sci", "Clubs", "Kon"],
      Th: ["Math", "Art", "Hin/Fr", "ICT", "Drama", "LUN", "Sci", "GP", "Eng", "DMA"],
      Fr: ["PE", "Math", "Hin/Fr", "Sci", "Math", "LUN", "Lib", "Eng", "DMA", "Ev'ts"]
    },
    "Gr5B": {
      label: "Grade 5B",
      Mo: ["Math", "Sci", "Lib", "Hin/Fr", "Eng", "LUN", "ICT", "PE", "GP", "Kon"],
      Tu: ["Math", "Hin/Fr", "Sci", "GP", "Mus", "LUN", "Eng", "LeadCurr", "Math", "Sci"],
      We: ["ICT", "Math", "Sports", "Eng", "DMA", "LUN", "Sci", "Art", "Clubs", "GP"],
      Th: ["Math", "Dan", "Hin/Fr", "Drama", "Eng", "LUN", "ICT", "GP", "Eng", "DMA"],
      Fr: ["PE", "Eng", "Hin/Fr", "Math", "Lib", "LUN", "Art", "Sci", "DMA", "Ev'ts"]
    },

    /* ─── MIDDLE (Gr6–Gr8: lunch at P7) ────────────────────────────────── */
    "Gr6A": {
      label: "Grade 6A",
      Mo: ["PE", "Chem", "GP", "Lib", "Hin/Fr", "DMA", "LUN", "Math", "Eng", "Geog"],
      Tu: ["Hin/Fr", "Math", "Eng", "Hist", "Bio", "PE", "LUN", "DMA", "Math", "Phy"],
      We: ["M/D", "Sports", "Eng", "ICT", "Art", "Phy", "LUN", "Math", "Clubs", "Eng"],
      Th: ["Hin/Fr", "Bio", "GP", "Eng", "Geog", "Chem", "LUN", "Hist", "DMA", "Ev'ts"],
      Fr: ["Math", "Lib", "GP", "LeadCurr", "Art", "ICT", "LUN", "Hin/Fr", "Drama", "Math"]
    },
    "Gr6B": {
      label: "Grade 6B",
      Mo: ["PE", "Math", "Eng", "ICT", "Hin/Fr", "DMA", "LUN", "GP", "Phy", "Bio"],
      Tu: ["Hin/Fr", "Art", "Chem", "Math", "Eng", "PE", "LUN", "DMA", "Hist", "Drama"],
      We: ["Math", "Sports", "M/D", "GP", "Eng", "ICT", "LUN", "Bio", "Clubs", "Lib"],
      Th: ["Hin/Fr", "Math", "Lib", "LeadCurr", "Math", "Geog", "LUN", "Eng", "DMA", "Ev'ts"],
      Fr: ["GP", "Chem", "Math", "Eng", "Phy", "Geog", "LUN", "Hin/Fr", "Art", "Hist"]
    },
    "Gr7A": {
      label: "Grade 7A",
      Mo: ["GP", "Hin/Fr", "Hist", "Math", "Geog", "DMA", "LUN", "Eng", "Drama", "PE"],
      Tu: ["PE", "M/D", "Phy", "Eng", "ICT", "Math", "LUN", "DMA", "Art", "Hin/Fr"],
      We: ["GP", "Sports", "Hin/Fr", "Math", "Eng", "Chem", "LUN", "Lib", "Clubs", "Bio"],
      Th: ["Math", "Geog", "Math", "Eng", "Hin/Fr", "Art", "LUN", "ICT", "DMA", "Ev'ts"],
      Fr: ["Hist", "Math", "Phy", "Bio", "Chem", "Lib", "LUN", "LeadCurr", "Eng", "Eng"]
    },
    "Gr7B": {
      label: "Grade 7B",
      Mo: ["Math", "Hin/Fr", "ICT", "Art", "Eng", "DMA", "LUN", "GP", "Bio", "PE"],
      Tu: ["PE", "Eng", "Math", "Chem", "Lib", "M/D", "LUN", "DMA", "Bio", "Hin/Fr"],
      We: ["Phy", "Sports", "Hin/Fr", "Eng", "Math", "Art", "LUN", "Hist", "Clubs", "Geog"],
      Th: ["Chem", "Eng", "GP", "Math", "Hin/Fr", "ICT", "LUN", "LeadCurr", "DMA", "Ev'ts"],
      Fr: ["Eng", "Phy", "Lib", "Geog", "Math", "Eng", "LUN", "Math", "Hist", "Drama"]
    },
    "Gr8A": {
      label: "Grade 8A",
      Mo: ["Math", "PE", "Eng", "Bio", "Chem", "DMA", "LUN", "Math", "Phy", "Hist"],
      Tu: ["Eng", "Math", "Geog", "Art", "Eng", "LeadCurr", "LUN", "DMA", "ICT", "Hin/Fr"],
      We: ["Bio", "Sports", "Lib", "Chem", "Hin/Fr", "M/D", "LUN", "Math", "Clubs", "Drama"],
      Th: ["Eng", "GP", "Hin/Fr", "Math", "Phy", "Hist", "LUN", "Lib", "DMA", "Ev'ts"],
      Fr: ["ICT", "GP", "Art", "Eng", "Eng", "Hin/Fr", "LUN", "Math", "Geog", "PE"]
    },
    "Gr8B": {
      label: "Grade 8B",
      Mo: ["ICT", "PE", "Math", "Bio", "Eng", "DMA", "LUN", "Art", "Lib", "LeadCurr"],
      Tu: ["Math", "Phy", "Chem", "Eng", "Math", "GP", "LUN", "DMA", "Drama", "Hin/Fr"],
      We: ["Bio", "Sports", "Math", "M/D", "Hin/Fr", "Eng", "LUN", "Geog", "Clubs", "Hist"],
      Th: ["Eng", "Eng", "Hin/Fr", "Chem", "Math", "Lib", "LUN", "Phy", "DMA", "Ev'ts"],
      Fr: ["Hist", "Geog", "Math", "Art", "GP", "Hin/Fr", "LUN", "Eng", "ICT", "PE"]
    },

    /* ─── SECONDARY (Gr9 & Gr10: elective bands) ───────────────────────── */
    "Gr9A": {
      label: "Grade 9A",
      Mo: ["B-4", "B3", "B8", "B6", "B-4", "DMA", "LUN", "B5", "B3", "Drama"],
      Tu: ["B7", "PE", "B1", "B8", "B5", "LeadCurr", "LUN", "DMA", "B2", "B7"],
      We: ["B8", "B1", "B-4", "Sports", "B1", "B3", "LUN", "B2", "Clubs", "B6"],
      Th: ["B-4", "B5", "B7", "B6", "B1", "B3", "LUN", "B2", "DMA", "Ev'ts"],
      Fr: ["B3", "B1", "B5", "B8", "B6", "B-4", "LUN", "B7", "Lib", "B2"]
    },
    "Gr9B": {
      label: "Grade 9B",
      Mo: ["B3", "B-4", "B8", "B1", "B3", "DMA", "LUN", "B5", "B6", "B1"],
      Tu: ["B7", "PE", "B6", "B8", "B5", "B-4", "LUN", "DMA", "B2", "B7"],
      We: ["B8", "B1", "B6", "Sports", "B3", "B-4", "LUN", "B2", "Clubs", "LeadCurr"],
      Th: ["B1", "B5", "B7", "B-4", "Lib", "B3", "LUN", "B2", "DMA", "Ev'ts"],
      Fr: ["B3", "B1", "B5", "B8", "Drama", "B6", "LUN", "B7", "B-4", "B2"]
    },
    "Gr10": {
      label: "Grade 10",
      Mo: ["B2", "B1", "B7", "B-4", "B6", "DMA", "LUN", "B8", "B3", "Lib"],
      Tu: ["B-4", "B3", "B7", "PE", "B3", "B2", "LUN", "DMA", "B5", "B7"],
      We: ["B1", "B-4", "B6", "Sports", "B5", "B3", "LUN", "B8", "Clubs", "B1"],
      Th: ["B8", "B2", "B6", "B1", "B5", "B-4", "LUN", "B7", "DMA", "Ev'ts"],
      Fr: ["LeadCurr", "B-4", "B6", "B3", "B1", "B8", "LUN", "Drama", "B2", "B5"]
    },

    /* ─── SENIOR (Gr11 & Gr12: stream electives) ───────────────────────── */
    "Gr11": {
      label: "Grade 11",
      Mo: ["Ch|Bu|Ad", "Ch|Bu|Ad", "Eng", "Ma|So", "Ph|Ac|Ps", "DMA", "LUN", "Drama", "PE", "Ma|So"],
      Tu: ["Ma|So", "CS|Bi|Ec|Hi", "Lib", "Ph|Ac|Ps", "Ph|Ac|Ps", "Ch|Bu|Ad", "LUN", "DMA", "Eng", "Eng"],
      We: ["Ph|Ac|Ps", "Ph|Ac|Ps", "Ch|Bu|Ad", "Sports", "CS|Bi|Ec|Hi", "CS|Bi|Ec|Hi", "LUN", "Ch|Bu|Ad", "Clubs", "Ma|So"],
      Th: ["Ch|Bu|Ad", "CS|Bi|Ec|Hi", "Ma|So", "Ma|So", "Ph|Ac|Ps", "CS|Bi|Ec|Hi", "LUN", "Ch|Bu|Ad", "DMA", "Ev'ts"],
      Fr: ["Eng", "Ph|Ac|Ps", "CS|Bi|Ec|Hi", "CS|Bi|Ec|Hi", "Ph|Ac|Ps", "Ch|Bu|Ad", "LUN", "Ma|So", "Ma|So", "LeadCurr"]
    },
    "Gr12": {
      label: "Grade 12",
      Mo: ["Ph|Ac|Ps", "Ph|Ac|Ps", "A4(B)", "PE", "CS|Bi|Ec|Ar", "DMA", "LUN", "LeadCurr", "Ch|Bu|So", "CS|Bi|Ec|Ar"],
      Tu: ["Ch|Bu|So", "Ch|Bu|So", "A4(B)", "Eng", "CS|Bi|Ec|Ar", "Ma|Hi", "LUN", "DMA", "Ph|Ac|Ps", "Lib"],
      We: ["Eng", "Eng", "Ma|Hi", "Sports", "Ph|Ac|Ps", "Ch|Bu|So", "LUN", "Ph|Ac|Ps", "Clubs", "Ch|Bu|So"],
      Th: ["Ma|Hi", "Ph|Ac|Ps", "Ch|Bu|So", "CS|Bi|Ec|Ar", "CS|Bi|Ec|Ar", "Eng", "LUN", "A4(B)", "DMA", "Ev'ts"],
      Fr: ["CS|Bi|Ec|Ar", "Eng", "Ph|Ac|Ps", "Ch|Bu|So", "Ma|Hi", "Drama", "LUN", "CS|Bi|Ec|Ar", "Ph|Ac|Ps", "A4(B)"]
    }
  },

  /* ───────────────────────────────────────────────────────────────────── */
  legend: [
    {
      label: "Core subjects",
      items: [
        ["Math",   "Mathematics"],
        ["Eng",    "English"],
        ["Sci",    "Science"],
        ["Hin",    "Hindi"],
        ["Hin/Fr", "Hindi or French (one of the two)"],
        ["Kon",    "Konkani"],
        ["Hist",   "History"],
        ["Geog",   "Geography"],
        ["Phy",    "Physics"],
        ["Chem",   "Chemistry"],
        ["Bio",    "Biology"]
      ]
    },
    {
      label: "Pre-primary subjects",
      items: [
        ["Lit'cy", "Literacy"],
        ["Num",    "Numeracy"],
        ["UTW",    "Understanding the World"],
        ["Story",  "Storytime"],
        ["OP",     "Outdoor Play"]
      ]
    },
    {
      label: "Arts, movement and activities",
      items: [
        ["Art",       "Art"],
        ["Mus",       "Music"],
        ["Dan",       "Dance"],
        ["Drama",     "Drama"],
        ["M/D",       "Music & Dance"],
        ["DMA",       "Drama / Music / Arts — whole school"],
        ["Sports",    "Sports — whole school"],
        ["PE",        "Physical Education"],
        ["Yog",       "Yoga"],
        ["GP",        "Guided Practice"],
        ["Lib",       "Library"],
        ["ICT",       "Information & Communication Technology"],
        ["LeadCurr",  "Leadership Curriculum"],
        ["CT",        "Critical Thinking"],
        ["Clubs",     "Clubs Period — Wed afternoon"],
        ["Ev'ts",     "Events / Activities — Thu afternoon"],
        ["LUN",       "Lunch"]
      ]
    },
    {
      label: "Secondary electives (Grade 9 & 10)",
      note: "Students choose one subject from each band.",
      items: [
        ["B1",  "Elective Band 1"],
        ["B2",  "Elective Band 2"],
        ["B3",  "Elective Band 3"],
        ["B-4", "Elective Band 4"],
        ["B5",  "Elective Band 5"],
        ["B6",  "Elective Band 6"],
        ["B7",  "Elective Band 7"],
        ["B8",  "Elective Band 8"]
      ]
    },
    {
      label: "Senior streams (Grade 11 & 12)",
      note: "Each slot is one subject from the listed group.",
      items: [
        ["Ch|Bu|Ad",    "Chemistry / Business Studies / Art & Design"],
        ["Ch|Bu|So",    "Chemistry / Business Studies / Sociology"],
        ["Ph|Ac|Ps",    "Physics / Accounts / Psychology"],
        ["CS|Bi|Ec|Hi", "Computer Science / Biology / Economics / History"],
        ["CS|Bi|Ec|Ar", "Computer Science / Biology / Economics / Art"],
        ["Ma|So",       "Mathematics / Sociology"],
        ["Ma|Hi",       "Mathematics / History"],
        ["A4(B)",       "Activity Block (school-specific)"]
      ]
    }
  ]
};

/* ===========================================================================
 * Render logic
 * =========================================================================== */

const STATE = {
  group: null,
  className: null
};

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function setActivePressed(container, value) {
  container.querySelectorAll('[aria-pressed]').forEach(el => {
    el.setAttribute('aria-pressed', el.dataset.value === value ? 'true' : 'false');
  });
}

function renderGroupTabs() {
  const wrap = $('.toolbar .filters');
  wrap.innerHTML = DATA.groups.map(g =>
    `<button class="filter" type="button" data-value="${g.id}" aria-pressed="false">${g.label}</button>`
  ).join('') + '<span class="filter-indicator" aria-hidden="true"></span>';

  wrap.addEventListener('click', e => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    selectGroup(btn.dataset.value);
    moveFilterIndicator(btn);
  });
}

function activeFilterBtn() {
  return $('.toolbar .filters .filter[aria-pressed="true"]');
}

function moveFilterIndicator(btn) {
  const ind = $('.toolbar .filter-indicator');
  if (!ind || !btn) return;
  ind.style.width = btn.offsetWidth + 'px';
  ind.style.transform = `translateX(${btn.offsetLeft}px)`;
}

function renderGradePills() {
  const wrap = $('#grade-pills');
  const group = DATA.groups.find(g => g.id === STATE.group);
  wrap.innerHTML = group.classes.map(cls => {
    const label = DATA.schedules[cls].label;
    return `<button class="grade-pill" type="button" data-value="${cls}" aria-pressed="false">${label}</button>`;
  }).join('');
}

function renderTimetable() {
  const sched = DATA.schedules[STATE.className];
  if (!sched) return;

  $('#tt-title').textContent = sched.label;
  $('#tt-updated').textContent = `Updated ${DATA.meta.generatedDisplay}`;

  const table = $('#tt-table');
  const days = DATA.days;
  const dayHead = days.map(d => `<th>${DATA.dayShort[d]}</th>`).join('');

  // Build rows
  let rows = '';
  DATA.periods.forEach((p, idx) => {
    rows += `<tr>
      <td class="period-cell"><span class="num">P${p.num}</span><span class="time">${p.time}</span></td>
      ${days.map(d => {
        const subj = (sched[d] || [])[idx] || "";
        return cellHtml(subj);
      }).join('')}
    </tr>`;

    // Insert snack break after P2 (idx === 1)
    if (idx === 1) {
      rows += `<tr class="break-row"><td colspan="${days.length + 1}"><span class="break-label">${DATA.snackBreak.label} · ${DATA.snackBreak.time}</span></td></tr>`;
    }
  });

  table.innerHTML = `
    <thead>
      <tr>
        <th class="period-col-head">Period</th>
        ${dayHead}
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

function cellHtml(subj) {
  if (!subj) return `<td class="empty"></td>`;
  if (subj === "LUN") return `<td class="lun"><div class="subject">Lunch</div></td>`;
  if (DATA.activitySubjects.includes(subj)) {
    return `<td class="activity"><div class="subject">${escapeHtml(subj)}</div></td>`;
  }
  return `<td><div class="subject">${escapeHtml(subj)}</div></td>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderLegend() {
  const container = $('#legend-container');
  container.innerHTML = DATA.legend.map(group => `
    <div class="legend-group">
      <div class="legend-group-label">${group.label}${group.note ? ` <span style="font-weight:500;letter-spacing:0.02em;text-transform:none;color:var(--ink-3);">— ${group.note}</span>` : ''}</div>
      <div class="legend-grid">
        ${group.items.map(([k, v]) =>
          `<div class="legend-item"><div class="legend-key">${escapeHtml(k)}</div><div class="legend-val">${escapeHtml(v)}</div></div>`
        ).join('')}
      </div>
    </div>
  `).join('');
}

function selectGroup(groupId) {
  STATE.group = groupId;
  localStorage.setItem('tgs-tt-group', groupId);

  setActivePressed($('.toolbar .filters'), groupId);

  const group = DATA.groups.find(g => g.id === groupId);
  const previousClass = localStorage.getItem('tgs-tt-class');
  if (previousClass && group.classes.includes(previousClass)) {
    STATE.className = previousClass;
  } else {
    STATE.className = group.classes[0];
  }

  renderGradePills();
  setActivePressed($('#grade-pills'), STATE.className);
  renderTimetable();
}

function selectClass(className) {
  STATE.className = className;
  localStorage.setItem('tgs-tt-class', className);
  setActivePressed($('#grade-pills'), className);
  renderTimetable();
}

function setupMeta() {
  $('#generated-tag').textContent = `Updated ${DATA.meta.generatedDisplay}`;
  $('#footer-date').textContent = DATA.meta.generated;
}

function init() {
  setupMeta();
  renderGroupTabs();

  $('#grade-pills').addEventListener('click', e => {
    const btn = e.target.closest('.grade-pill');
    if (!btn) return;
    selectClass(btn.dataset.value);
  });

  // Default to last-used group, or primary
  const savedGroup = localStorage.getItem('tgs-tt-group');
  const defaultGroup = (savedGroup && DATA.groups.find(g => g.id === savedGroup))
    ? savedGroup
    : 'primary';

  selectGroup(defaultGroup);
  renderLegend();

  // Slide the active-group indicator into place (animates in on load)
  requestAnimationFrame(() => moveFilterIndicator(activeFilterBtn()));
  window.addEventListener('resize', () => {
    const ind = $('.toolbar .filter-indicator');
    const prev = ind && ind.style.transition;
    if (ind) ind.style.transition = 'none';
    moveFilterIndicator(activeFilterBtn());
    requestAnimationFrame(() => { if (ind) ind.style.transition = prev || ''; });
  });
}

document.addEventListener('DOMContentLoaded', init);
