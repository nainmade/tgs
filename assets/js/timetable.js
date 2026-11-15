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
 *    Pre-primary classes (NUR / LKG / UKG) use slots 0–4 only
 *    (UKG also uses slot 5).
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
    generated: "15-11-2026",
    generatedDisplay: "16 Nov 2026"
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
    { id: "primary",   label: "Primary",     classes: ["Gr1A", "Gr2A", "Gr2B", "Gr3A", "Gr3B", "Gr4A", "Gr4B", "Gr5A", "Gr5B"] },
    { id: "middle",    label: "Middle",      classes: ["Gr6A", "Gr6B", "Gr7A", "Gr7B", "Gr8A", "Gr8B"] },
    { id: "secondary", label: "Secondary",   classes: ["Gr9A", "Gr9B", "Gr10"] },
    { id: "senior",    label: "Senior",      classes: ["Gr11", "Gr12"] }
  ],

  // Subjects shown with the whole-school activity highlight (coral background)
  activitySubjects: ["DMA", "Sports", "Drama", "Ev'ts", "Clubs",
                     "ADP 1", "ADP 2", "EY ADP", "MDD"],

  schedules: {

    /* ─── PRE-PRIMARY ──────────────────────────────────────────────────── */
    "NUR": {
      label: "Nursery",
      Mo: ["Num", "OP", "UTW", "Lit'cy", "Lib", "", "", "", "", ""],
      Tu: ["Num", "UTW", "Lit'cy", "EY ADP", "EY ADP", "", "", "", "", ""],
      We: ["Lit'cy", "Art", "UTW", "Num", "ST", "", "", "", "", ""],
      Th: ["Num", "PE", "UTW", "Lit'cy", "Art", "", "", "", "", ""],
      Fr: ["EY ADP", "EY ADP", "UTW", "Num", "Lit'cy", "", "", "", "", ""]
    },
    "LKG-A": {
      label: "LKG-A",
      Mo: ["Num", "Lit'cy", "UTW", "Art", "UTW", "", "", "", "", ""],
      Tu: ["Num", "Art", "Lit'cy", "EY ADP", "EY ADP", "", "", "", "", ""],
      We: ["Lit'cy", "UTW", "Lit'cy", "Num", "Lib", "", "", "", "", ""],
      Th: ["Num", "UTW", "PE", "Lit'cy", "ST", "", "", "", "", ""],
      Fr: ["EY ADP", "EY ADP", "Lit'cy", "UTW", "Num", "", "", "", "", ""]
    },
    "UKG-A": {
      label: "UKG-A",
      Mo: ["Num", "UTW", "Art", "PE", "Lit'cy", "Num", "", "", "", ""],
      Tu: ["Num", "Hin", "UTW", "EY ADP", "EY ADP", "Lit'cy", "", "", "", ""],
      We: ["Sports", "Num", "Lib", "UTW", "Lit'cy", "OP", "", "", "", ""],
      Th: ["Lit'cy", "OP", "Art", "Lit'cy", "UTW", "Num", "", "", "", ""],
      Fr: ["EY ADP", "EY ADP", "Num", "UTW", "Lit'cy", "PE", "", "", "", ""]
    },
    "UKG-B": {
      label: "UKG-B",
      Mo: ["PE", "UTW", "Lit'cy", "Lib", "Num", "Lit'cy", "", "", "", ""],
      Tu: ["OP", "Num", "Art", "EY ADP", "EY ADP", "UTW", "", "", "", ""],
      We: ["Sports", "UTW", "Num", "Lit'cy", "Art", "Num", "", "", "", ""],
      Th: ["UTW", "Lit'cy", "Num", "PE", "Lit'cy", "Hin", "", "", "", ""],
      Fr: ["EY ADP", "EY ADP", "Num", "Lit'cy", "OP", "UTW", "", "", "", ""]
    },

    /* ─── PRIMARY ──────────────────────────────────────────────────────── */
    "Gr1A": {
      label: "Grade 1A",
      Mo: ["Eng", "Math", "Math", "ICT", "Sci", "LUN", "Art", "Eng", "Sci", "Hin/Fr"],
      Tu: ["ADP 1", "ADP 1", "GP", "Math", "Hin/Fr", "LUN", "Lib", "Sci", "PE", "Sci"],
      We: ["Sports", "Hin/Fr", "Art", "Hin/Fr", "DMA", "LUN", "Sci", "PE", "Eng", "CT"],
      Th: ["Math", "Mus", "Math", "ADP 2", "ADP 2", "LUN", "Hin/Fr", "Eng", "Eng", "Kon"],
      Fr: ["Yog", "Sci", "Drama", "ICT", "Math", "LUN", "Eng", "Lib", "DMA", "Ev'ts"]
    },
    "Gr2A": {
      label: "Grade 2A",
      Mo: ["Math", "Math", "Hin/Fr", "Sci", "PE", "LUN", "Sci", "Eng", "Art", "Kon"],
      Tu: ["ADP 1", "ADP 1", "PE", "Sci", "Lib", "LUN", "CT", "ICT", "Math", "Sci"],
      We: ["Sports", "Hin/Fr", "Math", "GP", "DMA", "LUN", "Hin/Fr", "Eng", "Eng", "Mus"],
      Th: ["Hin/Fr", "Eng", "ICT", "ADP 2", "ADP 2", "LUN", "Hin/Fr", "Art", "Sci", "Eng"],
      Fr: ["Yog", "Math", "Eng", "Sci", "Drama", "LUN", "Lib", "Math", "DMA", "Ev'ts"]
    },
    "Gr2B": {
      label: "Grade 2B",
      Mo: ["Eng", "ICT", "Hin/Fr", "Math", "PE", "LUN", "Eng", "Math", "Sci", "Kon"],
      Tu: ["ADP 1", "ADP 1", "PE", "Eng", "Eng", "LUN", "Math", "Art", "Sci", "CT"],
      We: ["Sports", "Hin/Fr", "Math", "Sci", "DMA", "LUN", "Hin/Fr", "Sci", "Math", "Mus"],
      Th: ["Hin/Fr", "ICT", "Math", "ADP 2", "ADP 2", "LUN", "Hin/Fr", "GP", "Lib", "Sci"],
      Fr: ["Yog", "Lib", "Eng", "Eng", "Drama", "LUN", "Sci", "Art", "DMA", "Ev'ts"]
    },
    "Gr3A": {
      label: "Grade 3A",
      Mo: ["Math", "LeadCurr", "PE", "Eng", "Sci", "LUN", "Math", "Hin/Fr", "Lib", "GP"],
      Tu: ["ADP 1", "ADP 1", "Eng", "GP", "ICT", "LUN", "Sci", "Math", "Hin/Fr", "Math"],
      We: ["Math", "Sci", "Sports", "Hin/Fr", "DMA", "LUN", "ICT", "Art", "Clubs", "Kon"],
      Th: ["Sci", "Art", "Eng", "ADP 2", "ADP 2", "LUN", "Math", "GP", "PE", "Eng"],
      Fr: ["GP", "Sci", "Lib", "Eng", "Eng", "LUN", "GP", "ICT", "DMA", "Ev'ts"]
    },
    "Gr3B": {
      label: "Grade 3B",
      Mo: ["Sci", "Lib", "PE", "Math", "ICT", "LUN", "GP", "Hin/Fr", "Eng", "Kon"],
      Tu: ["ADP 1", "ADP 1", "Math", "Sci", "Art", "LUN", "Eng", "GP", "Hin/Fr", "Sci"],
      We: ["Sci", "ICT", "Sports", "Hin/Fr", "DMA", "LUN", "Math", "GP", "Clubs", "Eng"],
      Th: ["Eng", "Math", "Math", "ADP 2", "ADP 2", "LUN", "Lib", "Eng", "PE", "LeadCurr"],
      Fr: ["GP", "Art", "ICT", "GP", "Sci", "LUN", "Eng", "Math", "DMA", "Ev'ts"]
    },
    "Gr4A": {
      label: "Grade 4A",
      Mo: ["Sci", "Art", "Sci", "GP", "Eng", "LUN", "Math", "Eng", "ICT", "Hin/Fr"],
      Tu: ["ADP 1", "ADP 1", "Hin/Fr", "Hin/Fr", "PE", "LUN", "GP", "Math", "Eng", "Eng"],
      We: ["Math", "Eng", "Sports", "Math", "DMA", "LUN", "Art", "Sci", "Clubs", "Lib"],
      Th: ["Lib", "GP", "Sci", "ADP 2", "ADP 2", "LUN", "Math", "ICT", "Sci", "Kon"],
      Fr: ["ICT", "Math", "PE", "Sci", "Eng", "LUN", "GP", "LeadCurr", "DMA", "Ev'ts"]
    },
    "Gr4B": {
      label: "Grade 4B",
      Mo: ["ICT", "Sci", "GP", "Math", "Art", "LUN", "Eng", "Eng", "Math", "Hin/Fr"],
      Tu: ["ADP 1", "ADP 1", "Hin/Fr", "Hin/Fr", "PE", "LUN", "Kon", "GP", "Sci", "Lib"],
      We: ["Math", "Art", "Sports", "ICT", "DMA", "LUN", "Sci", "Eng", "Clubs", "GP"],
      Th: ["Math", "Sci", "Eng", "ADP 2", "ADP 2", "LUN", "Sci", "LeadCurr", "ICT", "Eng"],
      Fr: ["Lib", "Eng", "PE", "GP", "Math", "LUN", "Math", "Sci", "DMA", "Ev'ts"]
    },
    "Gr5A": {
      label: "Grade 5A",
      Mo: ["Eng", "LeadCurr", "Math", "Hin/Fr", "Sci", "LUN", "GP", "Math", "PE", "Lib"],
      Tu: ["ADP 1", "ADP 1", "Eng", "Math", "Math", "LUN", "ICT", "Sci", "Art", "GP"],
      We: ["Math", "Eng", "Sports", "GP", "DMA", "LUN", "Mus", "Sci", "Clubs", "Hin/Fr"],
      Th: ["Sci", "Drama", "Lib", "ADP 2", "ADP 2", "LUN", "Art", "Eng", "Eng", "GP"],
      Fr: ["Math", "Hin/Fr", "Hin/Fr", "Sci", "Kon", "LUN", "ICT", "Eng", "DMA", "Ev'ts"]
    },
    "Gr5B": {
      label: "Grade 5B",
      Mo: ["Math", "Eng", "Math", "Hin/Fr", "Sci", "LUN", "ICT", "Art", "PE", "GP"],
      Tu: ["ADP 1", "ADP 1", "Sci", "Math", "Mus", "LUN", "Eng", "Lib", "LeadCurr", "Sci"],
      We: ["ICT", "Math", "Sports", "GP", "DMA", "LUN", "Sci", "Eng", "Clubs", "Hin/Fr"],
      Th: ["Eng", "Eng", "Sci", "ADP 2", "ADP 2", "LUN", "Drama", "GP", "Math", "Kon"],
      Fr: ["GP", "Hin/Fr", "Hin/Fr", "Math", "Lib", "LUN", "Art", "Eng", "DMA", "Ev'ts"]
    },

    /* ─── MIDDLE (Gr6–Gr8: lunch at P7) ────────────────────────────────── */
    "Gr6A": {
      label: "Grade 6A",
      Mo: ["Math", "Hin/Fr", "Eng", "Geog", "Hin/Fr", "DMA", "LUN", "Hist", "GP", "Math"],
      Tu: ["Eng", "Art", "ICT", "Eng", "Bio", "DMA", "LUN", "MDD", "Math", "Phy"],
      We: ["Hin/Fr", "Sports", "Eng", "Phy", "Chem", "Art", "LUN", "MDD", "Clubs", "ICT"],
      Th: ["Bio", "Hin/Fr", "GP", "Math", "Lib", "Hist", "LUN", "Chem", "DMA", "Ev'ts"],
      Fr: ["Eng", "PE", "Geog", "LeadCurr", "MDD", "MDD", "LUN", "Math", "Drama", "Math"]
    },
    "Gr6B": {
      label: "Grade 6B",
      Mo: ["GP", "Hin/Fr", "Art", "ICT", "Hin/Fr", "DMA", "LUN", "Math", "Eng", "Bio"],
      Tu: ["Math", "Geog", "Chem", "Math", "Eng", "DMA", "LUN", "MDD", "Hist", "Drama"],
      We: ["Hin/Fr", "Sports", "Phy", "ICT", "Math", "Bio", "LUN", "MDD", "Clubs", "LeadCurr"],
      Th: ["Eng", "Hin/Fr", "Lib", "Math", "GP", "Phy", "LUN", "Geog", "DMA", "Ev'ts"],
      Fr: ["Math", "PE", "Eng", "Eng", "MDD", "MDD", "LUN", "Chem", "Art", "Hist"]
    },
    "Gr7A": {
      label: "Grade 7A",
      Mo: ["Eng", "Eng", "Hist", "Math", "Geog", "DMA", "LUN", "Art", "Drama", "PE"],
      Tu: ["GP", "ICT", "Math", "Hist", "Eng", "DMA", "LUN", "MDD", "Phy", "Hin/Fr"],
      We: ["ICT", "Sports", "Hin/Fr", "Math", "Geog", "Chem", "LUN", "MDD", "Clubs", "Bio"],
      Th: ["Hin/Fr", "Math", "Eng", "Lib", "GP", "Art", "LUN", "Math", "DMA", "Ev'ts"],
      Fr: ["Chem", "Math", "Phy", "Bio", "MDD", "MDD", "LUN", "Hin/Fr", "LeadCurr", "Eng"]
    },
    "Gr7B": {
      label: "Grade 7B",
      Mo: ["Art", "Chem", "Bio", "Hist", "Eng", "DMA", "LUN", "Math", "ICT", "PE"],
      Tu: ["Math", "Math", "Eng", "Eng", "GP", "DMA", "LUN", "MDD", "Bio", "Hin/Fr"],
      We: ["Phy", "Sports", "Hin/Fr", "Eng", "Math", "LeadCurr", "LUN", "MDD", "Clubs", "Geog"],
      Th: ["Hin/Fr", "Eng", "Math", "Phy", "Art", "ICT", "LUN", "Hist", "DMA", "Ev'ts"],
      Fr: ["Geog", "GP", "Lib", "Math", "MDD", "MDD", "LUN", "Hin/Fr", "Chem", "Drama"]
    },
    "Gr8A": {
      label: "Grade 8A",
      Mo: ["Hin/Fr", "Math", "Eng", "Bio", "Chem", "DMA", "LUN", "Math", "Phy", "Hist"],
      Tu: ["Eng", "Math", "Geog", "Art", "GP", "DMA", "LUN", "MDD", "ICT", "Hist"],
      We: ["Bio", "Sports", "Hin/Fr", "Chem", "Hin/Fr", "Lib", "LUN", "MDD", "Clubs", "Drama"],
      Th: ["GP", "ICT", "Hin/Fr", "Eng", "Phy", "Math", "LUN", "LeadCurr", "DMA", "Ev'ts"],
      Fr: ["Eng", "Eng", "Art", "Math", "MDD", "MDD", "LUN", "Math", "Geog", "PE"]
    },
    "Gr8B": {
      label: "Grade 8B",
      Mo: ["Hin/Fr", "Hist", "ICT", "Eng", "Math", "DMA", "LUN", "GP", "Lib", "LeadCurr"],
      Tu: ["Art", "Chem", "Eng", "Eng", "Math", "DMA", "LUN", "MDD", "Drama", "Geog"],
      We: ["Math", "Sports", "Hin/Fr", "Bio", "Hin/Fr", "Eng", "LUN", "MDD", "Clubs", "Hist"],
      Th: ["Chem", "Phy", "Hin/Fr", "GP", "Math", "Eng", "LUN", "Phy", "DMA", "Ev'ts"],
      Fr: ["Math", "Geog", "Math", "Art", "MDD", "MDD", "LUN", "Bio", "ICT", "PE"]
    },

    /* ─── SECONDARY (Gr9 & Gr10: elective bands) ───────────────────────── */
    "Gr9A": {
      label: "Grade 9A",
      Mo: ["B7", "B6", "LeadCurr", "B8", "B1", "DMA", "LUN", "B5", "B2", "B3"],
      Tu: ["B3", "PE", "B-4", "B8", "B5", "DMA", "LUN", "MDD", "Lib", "B7"],
      We: ["B3", "B8", "B-4", "Sports", "B1", "B3", "LUN", "MDD", "Clubs", "B6"],
      Th: ["B-4", "B5", "B7", "B6", "B1", "B8", "LUN", "B2", "DMA", "Ev'ts"],
      Fr: ["B3", "B6", "B5", "B-4", "MDD", "MDD", "LUN", "B7", "B1", "B2"]
    },
    "Gr9B": {
      label: "Grade 9B",
      Mo: ["B7", "B-4", "B6", "B8", "B3", "DMA", "LUN", "B5", "B2", "B1"],
      Tu: ["B6", "PE", "B1", "B8", "B5", "DMA", "LUN", "MDD", "B3", "B7"],
      We: ["B1", "B8", "B6", "Sports", "B3", "B-4", "LUN", "MDD", "Clubs", "LeadCurr"],
      Th: ["Lib", "B5", "B7", "B-4", "B1", "B8", "LUN", "B2", "DMA", "Ev'ts"],
      Fr: ["B-4", "B3", "B5", "B3", "MDD", "MDD", "LUN", "B7", "B6", "B2"]
    },
    "Gr10": {
      label: "Grade 10",
      Mo: ["B2", "B1", "B8", "B-4", "B5", "DMA", "LUN", "B3", "B7", "Lib"],
      Tu: ["PE", "B3", "B8", "B3", "B-4", "DMA", "LUN", "MDD", "B5", "B7"],
      We: ["B8", "B6", "B7", "Sports", "B5", "B3", "LUN", "MDD", "Clubs", "B1"],
      Th: ["B1", "B2", "B6", "B1", "B6", "B-4", "LUN", "B7", "DMA", "Ev'ts"],
      Fr: ["B3", "B-4", "B6", "LeadCurr", "MDD", "MDD", "LUN", "B8", "B2", "B5"]
    },

    /* ─── SENIOR (Gr11 & Gr12: stream electives) ───────────────────────── */
    "Gr11": {
      label: "Grade 11",
      Mo: ["Ma|So", "Ma|So", "Eng", "Ch|Bu|Ad", "Ph|Ac|Ps", "DMA", "LUN", "CS|Bi|Ec|Hi", "Ch|Bu|Ad", "Ch|Bu|Ad"],
      Tu: ["Ma|So", "CS|Bi|Ec|Hi", "Ch|Bu|Ad", "Ph|Ac|Ps", "Ph|Ac|Ps", "DMA", "LUN", "MDD", "Eng", "Eng"],
      We: ["Ma|So", "Ph|Ac|Ps", "Ch|Bu|Ad", "Sports", "CS|Bi|Ec|Hi", "CS|Bi|Ec|Hi", "LUN", "MDD", "Clubs", "Ma|So"],
      Th: ["Ph|Ac|Ps", "CS|Bi|Ec|Hi", "Ph|Ac|Ps", "Ma|So", "Ma|So", "Lib", "LUN", "Ch|Bu|Ad", "DMA", "Ev'ts"],
      Fr: ["Ch|Bu|Ad", "Ph|Ac|Ps", "CS|Bi|Ec|Hi", "CS|Bi|Ec|Hi", "MDD", "MDD", "LUN", "Eng", "PE", "LeadCurr"]
    },
    "Gr12": {
      label: "Grade 12",
      Mo: ["Ph|Ac|Ps", "Ph|Ac|Ps", "A4(B)", "PE", "CS|Bi|Ec|Ar", "DMA", "LUN", "LeadCurr", "A4(B)", "CS|Bi|Ec|Ar"],
      Tu: ["Ch|Bu|So", "Ch|Bu|So", "A4(B)", "Lib", "CS|Bi|Ec|Ar", "DMA", "LUN", "MDD", "Ph|Ac|Ps", "Eng"],
      We: ["Eng", "Eng", "Ma|Hi", "Sports", "Ph|Ac|Ps", "Ch|Bu|So", "LUN", "MDD", "Clubs", "Ch|Bu|So"],
      Th: ["Ma|Hi", "Ph|Ac|Ps", "CS|Bi|Ec|Ar", "CS|Bi|Ec|Ar", "Ch|Bu|So", "Ch|Bu|So", "LUN", "A4(B)", "DMA", "Ev'ts"],
      Fr: ["CS|Bi|Ec|Ar", "CS|Bi|Ec|Ar", "Ph|Ac|Ps", "Ch|Bu|So", "MDD", "MDD", "LUN", "Eng", "Ph|Ac|Ps", "A4(B)"]
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
        ["OP",     "Outdoor Play"],
        ["ST",     "Story Time"]
      ]
    },
    {
      label: "Annual Day practice",
      note: "Nursery – Grade 5. Annual Day: Feb 2027, date to be confirmed.",
      items: [
        ["EY ADP", "Annual Day Practice — Early Years"],
        ["ADP 1",  "Annual Day Practice — session 1"],
        ["ADP 2",  "Annual Day Practice — session 2"]
      ]
    },
    {
      label: "Arts, movement and activities",
      items: [
        ["Art",       "Art"],
        ["Mus",       "Music"],
        ["Drama",     "Drama"],
        ["MDD",       "Music, Dance & Drama — Grades 6–12"],
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
