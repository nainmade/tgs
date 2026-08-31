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
    generated: "29-08-2026",
    generatedDisplay: "31 Aug 2026"
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
  activitySubjects: ["DMA", "Sports", "M/D", "Drama", "Ev'ts", "Clubs",
                     "SDP", "SDP EY", "SDP 1", "SDP 2", "MP"],

  schedules: {

    /* ─── PRE-PRIMARY ──────────────────────────────────────────────────── */
    "NUR": {
      label: "Nursery",
      Mo: ["SDP", "SDP EY", "UTW", "Lit'cy", "Lib", "", "", "", "", ""],
      Tu: ["SDP EY", "Num", "Lit'cy", "UTW", "Mus", "", "", "", "", ""],
      We: ["Drama", "Art", "UTW", "Num", "Dan", "", "", "", "", ""],
      Th: ["SDP", "SDP EY", "Num", "Lit'cy", "Art", "", "", "", "", ""],
      Fr: ["SDP EY", "UTW", "PE", "Num", "Lit'cy", "", "", "", "", ""]
    },
    "LKG-A": {
      label: "LKG-A",
      Mo: ["SDP", "SDP EY", "UTW", "Art", "Num", "", "", "", "", ""],
      Tu: ["SDP EY", "Art", "Lit'cy", "PE", "UTW", "", "", "", "", ""],
      We: ["Lit'cy", "UTW", "Drama", "Num", "Lib", "", "", "", "", ""],
      Th: ["SDP", "SDP EY", "Num", "Mus", "Lit'cy", "", "", "", "", ""],
      Fr: ["SDP EY", "Lit'cy", "UTW", "Num", "Dan", "", "", "", "", ""]
    },
    "UKG-A": {
      label: "UKG-A",
      Mo: ["SDP", "SDP EY", "Art", "PE", "Lit'cy", "Num", "", "", "", ""],
      Tu: ["SDP EY", "Num", "OP/ED", "Mus", "UTW", "Lit'cy", "", "", "", ""],
      We: ["Sports", "Num", "Lib", "Drama", "Lit'cy", "UTW", "", "", "", ""],
      Th: ["SDP", "SDP EY", "Art", "Lit'cy", "UTW", "Num", "", "", "", ""],
      Fr: ["SDP EY", "Hin", "Num", "UTW", "Lit'cy", "Dan", "", "", "", ""]
    },
    "UKG-B": {
      label: "UKG-B",
      Mo: ["SDP", "SDP EY", "Lit'cy", "Lib", "Num", "UTW", "", "", "", ""],
      Tu: ["SDP EY", "Num", "Art", "OP/ED", "Lit'cy", "UTW", "", "", "", ""],
      We: ["Sports", "UTW", "Num", "Hin", "PE", "Lit'cy", "", "", "", ""],
      Th: ["SDP", "SDP EY", "Mus", "Drama", "Num", "Lit'cy", "", "", "", ""],
      Fr: ["SDP EY", "Num", "Dan", "UTW", "Art", "Lit'cy", "", "", "", ""]
    },

    /* ─── PRIMARY ──────────────────────────────────────────────────────── */
    "Gr1A": {
      label: "Grade 1A",
      Mo: ["Eng", "Math", "Dan", "ICT", "Sci", "LUN", "Math", "Eng", "Hin/Fr", "Sci"],
      Tu: ["Math", "Yog", "Eng", "Sci", "Hin/Fr", "LUN", "Lib", "GP", "PE", "Sci"],
      We: ["Sports", "Hin/Fr", "Art", "Hin/Fr", "DMA", "LUN", "Sci", "PE", "Eng", "CT"],
      Th: ["Math", "Mus", "Math", "Art", "Sci", "LUN", "Hin/Fr", "Eng", "Eng", "Kon"],
      Fr: ["MP", "Math", "Drama", "ICT", "Math", "LUN", "Eng", "Lib", "DMA", "Ev'ts"]
    },
    "Gr2A": {
      label: "Grade 2A",
      Mo: ["Math", "Math", "Eng", "Sci", "PE", "LUN", "Hin/Fr", "Eng", "Art", "Kon"],
      Tu: ["Eng", "Math", "Sci", "Lib", "Math", "LUN", "CT", "ICT", "Hin/Fr", "Sci"],
      We: ["Sports", "Hin/Fr", "Math", "GP", "DMA", "LUN", "Sci", "Eng", "Eng", "Mus"],
      Th: ["Dan", "Eng", "Yog", "Lib", "PE", "LUN", "Math", "Art", "Sci", "Hin/Fr"],
      Fr: ["MP", "Drama", "Hin/Fr", "Sci", "ICT", "LUN", "Eng", "Math", "DMA", "Ev'ts"]
    },
    "Gr2B": {
      label: "Grade 2B",
      Mo: ["Eng", "ICT", "Math", "Eng", "PE", "LUN", "Hin/Fr", "Math", "Sci", "Kon"],
      Tu: ["Math", "Lib", "Sci", "Eng", "Eng", "LUN", "Sci", "Art", "Hin/Fr", "CT"],
      We: ["Sports", "Hin/Fr", "Math", "Sci", "DMA", "LUN", "Eng", "Sci", "Math", "Mus"],
      Th: ["Dan", "Math", "Yog", "Eng", "PE", "LUN", "ICT", "GP", "Lib", "Hin/Fr"],
      Fr: ["MP", "Drama", "Hin/Fr", "Eng", "Math", "LUN", "Sci", "Art", "DMA", "Ev'ts"]
    },
    "Gr3A": {
      label: "Grade 3A",
      Mo: ["Math", "LeadCurr", "PE", "Eng", "Sci", "LUN", "Math", "Hin/Fr", "Lib", "GP"],
      Tu: ["Art", "GP", "Eng", "Mus", "Eng", "LUN", "Hin/Fr", "Sci", "ICT", "Math"],
      We: ["Math", "Sci", "Sports", "GP", "DMA", "LUN", "ICT", "Eng", "Clubs", "Kon"],
      Th: ["Sci", "Dan", "Drama", "Hin/Fr", "Art", "LUN", "Math", "GP", "PE", "Eng"],
      Fr: ["MP", "Sci", "Lib", "Math", "Hin/Fr", "LUN", "Eng", "ICT", "DMA", "Ev'ts"]
    },
    "Gr3B": {
      label: "Grade 3B",
      Mo: ["Sci", "Eng", "PE", "GP", "ICT", "LUN", "Math", "Hin/Fr", "Eng", "Kon"],
      Tu: ["Math", "Mus", "Lib", "Art", "Sci", "LUN", "Hin/Fr", "GP", "Eng", "Sci"],
      We: ["Sci", "ICT", "Sports", "Art", "DMA", "LUN", "Math", "GP", "Clubs", "Eng"],
      Th: ["Drama", "Math", "Dan", "Hin/Fr", "Math", "LUN", "Lib", "Eng", "PE", "LeadCurr"],
      Fr: ["MP", "Eng", "ICT", "GP", "Hin/Fr", "LUN", "Sci", "Math", "DMA", "Ev'ts"]
    },
    "Gr4A": {
      label: "Grade 4A",
      Mo: ["SDP", "Art", "Hin/Fr", "GP", "Dan", "LUN", "Math", "Eng", "ICT", "Kon"],
      Tu: ["SDP", "Sci", "Mus", "Hin/Fr", "PE", "LUN", "GP", "Math", "Eng", "Eng"],
      We: ["Hin/Fr", "Lib", "Sports", "Math", "DMA", "LUN", "Eng", "Sci", "Clubs", "Lib"],
      Th: ["SDP", "SDP", "Sci", "Math", "ICT", "LUN", "Math", "Sci", "Art", "GP"],
      Fr: ["MP", "Sci", "Math", "Drama", "Eng", "LUN", "GP", "LeadCurr", "DMA", "Ev'ts"]
    },
    "Gr4B": {
      label: "Grade 4B",
      Mo: ["SDP", "Sci", "Hin/Fr", "Dan", "Art", "LUN", "Eng", "Eng", "Math", "Sci"],
      Tu: ["SDP", "Math", "ICT", "Hin/Fr", "PE", "LUN", "Kon", "GP", "Sci", "Lib"],
      We: ["Hin/Fr", "Drama", "Sports", "Sci", "DMA", "LUN", "Math", "Mus", "Clubs", "GP"],
      Th: ["SDP", "SDP", "Eng", "GP", "Math", "LUN", "Sci", "LeadCurr", "ICT", "Eng"],
      Fr: ["MP", "Lib", "Eng", "Art", "Math", "LUN", "Math", "GP", "DMA", "Ev'ts"]
    },
    "Gr5A": {
      label: "Grade 5A",
      Mo: ["SDP", "LeadCurr", "Math", "Hin/Fr", "Sci", "LUN", "GP", "Math", "PE", "Lib"],
      Tu: ["SDP", "Sci", "Math", "Dan", "Math", "LUN", "ICT", "Eng", "Art", "GP"],
      We: ["Math", "Eng", "Sports", "GP", "DMA", "LUN", "Mus", "Sci", "Clubs", "Hin/Fr"],
      Th: ["SDP", "SDP", "Lib", "Sci", "Drama", "LUN", "Art", "Eng", "Eng", "Kon"],
      Fr: ["MP", "Math", "Hin/Fr", "Sci", "GP", "LUN", "ICT", "Eng", "DMA", "Ev'ts"]
    },
    "Gr5B": {
      label: "Grade 5B",
      Mo: ["SDP", "Eng", "Math", "Hin/Fr", "Sci", "LUN", "ICT", "Art", "PE", "GP"],
      Tu: ["SDP", "GP", "Sci", "Math", "Mus", "LUN", "Eng", "Lib", "LeadCurr", "Sci"],
      We: ["ICT", "Math", "Sports", "GP", "DMA", "LUN", "Sci", "Eng", "Clubs", "Hin/Fr"],
      Th: ["SDP", "SDP", "Eng", "Dan", "Math", "LUN", "Drama", "GP", "Math", "Kon"],
      Fr: ["MP", "Eng", "Hin/Fr", "Math", "Lib", "LUN", "Art", "Sci", "DMA", "Ev'ts"]
    },

    /* ─── MIDDLE (Gr6–Gr8: lunch at P7) ────────────────────────────────── */
    "Gr6A": {
      label: "Grade 6A",
      Mo: ["MP", "SDP 1", "Eng", "Lib", "Hin/Fr", "Math", "LUN", "Hist", "GP", "Math"],
      Tu: ["Hin/Fr", "SDP 2", "ICT", "Eng", "Bio", "PE", "LUN", "Art", "Math", "Phy"],
      We: ["M/D", "Sports", "Eng", "Eng", "Chem", "Phy", "LUN", "Math", "Clubs", "ICT"],
      Th: ["SDP 1", "SDP 2", "GP", "Eng", "Geog", "Chem", "LUN", "Hist", "DMA", "Ev'ts"],
      Fr: ["SDP 1", "SDP 2", "Geog", "LeadCurr", "Bio", "Art", "LUN", "Hin/Fr", "Drama", "Math"]
    },
    "Gr6B": {
      label: "Grade 6B",
      Mo: ["MP", "SDP 1", "Art", "ICT", "Hin/Fr", "Phy", "LUN", "GP", "Eng", "Bio"],
      Tu: ["Hin/Fr", "SDP 2", "Chem", "Math", "Eng", "PE", "LUN", "Math", "Hist", "Drama"],
      We: ["Math", "Sports", "M/D", "ICT", "Eng", "GP", "LUN", "Bio", "Clubs", "LeadCurr"],
      Th: ["SDP 1", "SDP 2", "Lib", "Math", "Eng", "Geog", "LUN", "Phy", "DMA", "Ev'ts"],
      Fr: ["SDP 1", "SDP 2", "Math", "Chem", "Eng", "Geog", "LUN", "Hin/Fr", "Art", "Hist"]
    },
    "Gr7A": {
      label: "Grade 7A",
      Mo: ["MP", "SDP 1", "Hist", "Math", "Geog", "Chem", "LUN", "Eng", "Drama", "PE"],
      Tu: ["ICT", "SDP 2", "M/D", "Math", "Phy", "Eng", "LUN", "GP", "Art", "Hin/Fr"],
      We: ["Art", "Sports", "Hin/Fr", "Math", "Hist", "Chem", "LUN", "Eng", "Clubs", "Bio"],
      Th: ["SDP 1", "SDP 2", "Math", "Eng", "Hin/Fr", "GP", "LUN", "Math", "DMA", "Ev'ts"],
      Fr: ["SDP 1", "SDP 2", "Phy", "Bio", "ICT", "Lib", "LUN", "Geog", "LeadCurr", "Eng"]
    },
    "Gr7B": {
      label: "Grade 7B",
      Mo: ["MP", "SDP 1", "Bio", "Art", "Eng", "Eng", "LUN", "Math", "ICT", "PE"],
      Tu: ["Math", "SDP 2", "Eng", "Chem", "GP", "M/D", "LUN", "LeadCurr", "Bio", "Hin/Fr"],
      We: ["Phy", "Sports", "Hin/Fr", "Eng", "Math", "Art", "LUN", "Hist", "Clubs", "Geog"],
      Th: ["SDP 1", "SDP 2", "Phy", "Math", "Hin/Fr", "ICT", "LUN", "Eng", "DMA", "Ev'ts"],
      Fr: ["SDP 1", "SDP 2", "Lib", "Geog", "Math", "Hist", "LUN", "GP", "Chem", "Drama"]
    },
    "Gr8A": {
      label: "Grade 8A",
      Mo: ["MP", "SDP 1", "Eng", "Bio", "Chem", "Lib", "LUN", "Math", "Phy", "Hist"],
      Tu: ["Eng", "SDP 2", "Geog", "Art", "GP", "LeadCurr", "LUN", "Math", "ICT", "Hist"],
      We: ["Bio", "Sports", "Math", "Chem", "Hin/Fr", "M/D", "LUN", "ICT", "Clubs", "Drama"],
      Th: ["SDP 1", "SDP 2", "Hin/Fr", "Math", "Phy", "Eng", "LUN", "GP", "DMA", "Ev'ts"],
      Fr: ["SDP 1", "SDP 2", "Art", "Eng", "Eng", "Hin/Fr", "LUN", "Math", "Geog", "PE"]
    },
    "Gr8B": {
      label: "Grade 8B",
      Mo: ["MP", "SDP 1", "ICT", "Hist", "Math", "Eng", "LUN", "GP", "Lib", "LeadCurr"],
      Tu: ["Art", "SDP 2", "Chem", "Eng", "Math", "Bio", "LUN", "Phy", "Drama", "Geog"],
      We: ["Bio", "Sports", "Math", "M/D", "Hin/Fr", "Eng", "LUN", "Geog", "Clubs", "Hist"],
      Th: ["SDP 1", "SDP 2", "Hin/Fr", "Chem", "Math", "Eng", "LUN", "Phy", "DMA", "Ev'ts"],
      Fr: ["SDP 1", "SDP 2", "Math", "Art", "GP", "Hin/Fr", "LUN", "Eng", "ICT", "PE"]
    },

    /* ─── SECONDARY (Gr9 & Gr10: elective bands) ───────────────────────── */
    "Gr9A": {
      label: "Grade 9A",
      Mo: ["B1", "B6", "B8", "LeadCurr", "B-4", "B7", "LUN", "B5", "B3", "Drama"],
      Tu: ["MP", "B2", "B-4", "B8", "B5", "B1", "LUN", "DMA", "Lib", "B7"],
      We: ["B3", "B8", "B-4", "Sports", "B1", "B3", "LUN", "B2", "Clubs", "B6"],
      Th: ["B-4", "B5", "B7", "B6", "B1", "B3", "LUN", "B2", "DMA", "Ev'ts"],
      Fr: ["B3", "B6", "B5", "B8", "B-4", "PE", "LUN", "B7", "B1", "B2"]
    },
    "Gr9B": {
      label: "Grade 9B",
      Mo: ["B1", "B-4", "B8", "B6", "B3", "B7", "LUN", "B5", "B6", "B1"],
      Tu: ["MP", "B2", "B6", "B8", "B5", "B-4", "LUN", "DMA", "B3", "B7"],
      We: ["B1", "B8", "B6", "Sports", "B3", "B-4", "LUN", "B2", "Clubs", "LeadCurr"],
      Th: ["B1", "B5", "B7", "B-4", "B3", "Lib", "LUN", "B2", "DMA", "Ev'ts"],
      Fr: ["B-4", "B3", "B5", "B8", "Drama", "PE", "LUN", "B7", "B1", "B2"]
    },
    "Gr10": {
      label: "Grade 10",
      Mo: ["B2", "B1", "B8", "B-4", "B5", "B6", "LUN", "B3", "B7", "Lib"],
      Tu: ["MP", "B3", "B2", "PE", "B3", "B7", "LUN", "DMA", "B-4", "B8"],
      We: ["B-4", "B1", "B7", "Sports", "B5", "B3", "LUN", "B8", "Clubs", "B1"],
      Th: ["B6", "B2", "B6", "B1", "B5", "B-4", "LUN", "B7", "DMA", "Ev'ts"],
      Fr: ["B3", "B-4", "B6", "LeadCurr", "B1", "B8", "LUN", "Drama", "B2", "B5"]
    },

    /* ─── SENIOR (Gr11 & Gr12: stream electives) ───────────────────────── */
    "Gr11": {
      label: "Grade 11",
      Mo: ["Ma|So", "Ma|So", "Eng", "Ph|Ac|Ps", "Ph|Ac|Ps", "CS|Bi|Ec|Hi", "LUN", "Drama", "Ch|Bu|Ad", "Ch|Bu|Ad"],
      Tu: ["MP", "CS|Bi|Ec|Hi", "Ch|Bu|Ad", "Ph|Ac|Ps", "Ph|Ac|Ps", "Ch|Bu|Ad", "LUN", "DMA", "Eng", "Eng"],
      We: ["Ma|So", "Ph|Ac|Ps", "Ch|Bu|Ad", "Sports", "CS|Bi|Ec|Hi", "CS|Bi|Ec|Hi", "LUN", "Ch|Bu|Ad", "Clubs", "Ma|So"],
      Th: ["Ph|Ac|Ps", "CS|Bi|Ec|Hi", "Ph|Ac|Ps", "Ma|So", "Lib", "Ma|So", "LUN", "Ch|Bu|Ad", "DMA", "Ev'ts"],
      Fr: ["Eng", "Ph|Ac|Ps", "CS|Bi|Ec|Hi", "CS|Bi|Ec|Hi", "Ch|Bu|Ad", "Ma|So", "LUN", "Ma|So", "PE", "LeadCurr"]
    },
    "Gr12": {
      label: "Grade 12",
      Mo: ["Ph|Ac|Ps", "Ph|Ac|Ps", "A4(B)", "PE", "CS|Bi|Ec|Ar", "Ch|Bu|So", "LUN", "Ph|Ac|Ps", "Eng", "CS|Bi|Ec|Ar"],
      Tu: ["MP", "Ch|Bu|So", "A4(B)", "Eng", "CS|Bi|Ec|Ar", "Ma|Hi", "LUN", "DMA", "Ph|Ac|Ps", "Lib"],
      We: ["Eng", "Eng", "Ma|Hi", "Sports", "Ph|Ac|Ps", "Ch|Bu|So", "LUN", "Ph|Ac|Ps", "Clubs", "Ch|Bu|So"],
      Th: ["Ma|Hi", "LeadCurr", "Eng", "CS|Bi|Ec|Ar", "CS|Bi|Ec|Ar", "Ch|Bu|So", "LUN", "A4(B)", "DMA", "Ev'ts"],
      Fr: ["CS|Bi|Ec|Ar", "CS|Bi|Ec|Ar", "Ph|Ac|Ps", "Ch|Bu|So", "Ma|Hi", "Drama", "LUN", "Ch|Bu|So", "Ph|Ac|Ps", "A4(B)"]
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
        ["OP/ED",  "Outdoor Play"]
      ]
    },
    {
      label: "Sports Day practice",
      note: "In effect from 31 Aug. Sports Day: 4 Nov (Early Years – Gr 5) & 5 Nov (Gr 6–12).",
      items: [
        ["SDP",    "Sports Day Practice"],
        ["SDP EY", "Sports Day Practice — Early Years"],
        ["SDP 1",  "Sports Day Practice — Group 1"],
        ["SDP 2",  "Sports Day Practice — Group 2"],
        ["MP",     "March Past practice"]
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
