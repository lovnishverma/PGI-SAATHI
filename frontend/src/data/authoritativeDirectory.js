/**
 * PGI Saathi - Authoritative Directory & Verified Content Model
 * 
 * CONTENT GOVERNANCE SPECIFICATION:
 * Every record includes provenance metadata:
 * - `status`: 'draft' | 'review' | 'approved' | 'published' | 'withdrawn'
 * - `verified_at`: ISO Date of last verified review
 * - `reviewer_role`: Accountable hospital or navigation authority
 * - `source_reference`: Documented verification source
 * 
 * Sources incorporated:
 * - PGIMER Official OPD Schedule & Patient Welfare Guide 2026
 * - Quantyx PGI Chandigarh OPD Guide & Field Verification (Nov 2026)
 * - PGIMER Engineering & Floor Layout Directory (New OPD Blocks A, B, C, D)
 * - HLL AMRIT Pharmacy & Red Cross Sarai Network Chandigarh
 */

export const CONTENT_VERSION = "2.3.0";
export const LAST_VERIFIED_DATE = "2026-11-26";
export const ACCOUNTABLE_ROLE = "Clinical Navigation Review Board & Patient Help Facilitator";
export const SOURCE_REFERENCE = "PGIMER Official OPD Schedule, HLL AMRIT Registry & Quantyx Patient Guide 2026";

/**
 * Validates department record shape.
 */
export function validateDepartment(dept) {
  if (!dept || typeof dept !== 'object') return false;
  return Boolean(
    typeof dept.id === 'string' &&
    typeof dept.name === 'string' &&
    typeof dept.building_id === 'string' &&
    Array.isArray(dept.concerns) &&
    typeof dept.status === 'string'
  );
}

/**
 * Validates building record shape.
 */
export function validateBuilding(bldg) {
  if (!bldg || typeof bldg !== 'object') return false;
  return Boolean(
    typeof bldg.id === 'string' &&
    typeof bldg.name === 'string' &&
    typeof bldg.status === 'string'
  );
}

/**
 * Filters any collection strictly to published items.
 */
export function filterPublished(items = []) {
  if (!Array.isArray(items)) return [];
  return items.filter(item => item && item.status === 'published');
}

export const authoritativeDirectory = {
  metadata: {
    source: SOURCE_REFERENCE,
    version: CONTENT_VERSION,
    verified_at: LAST_VERIFIED_DATE,
    reviewer_role: ACCOUNTABLE_ROLE,
    status: "published",
    disclaimer: "Independent patient navigation aid. Not an official PGIMER publication. Room numbers, counters, and OPD timings are subject to change. Reconfirm at hospital help desk, signage, or test slip."
  },

  // 6-Step Chronological Patient Journey Wizard (from Quantyx Guide)
  patient_journey_steps: [
    {
      step: 1,
      title: "Arrival at PGIMER Campus",
      hindi_title: "1. अस्पताल पहुंचना (सुबह 7:30 – 8:00 बजे)",
      punjabi_title: "1. ਹਸਪਤਾਲ ਪਹੁੰਚਣਾ (ਸਵੇਰੇ 7:30 – 8:00 ਵਜੇ)",
      desc: "Reach Gate No. 1 (Sector 12) for general New OPD clinics. For Heart, Eye, or Children's centers, enter via Gate No. 2. Arrive early to secure your token.",
      hindi_desc: "न्यू ओपीडी जाने के लिए गेट नंबर 1 (सेक्टर 12) से आएं। दिल, आंख या बच्चों के सेंटर के लिए गेट नंबर 2 नजदीक है। टोकन लेने के लिए सुबह 7:30 से 8:00 बजे तक पहुंचें।",
      punjabi_desc: "ਨਿਊ ਓਪੀਡੀ ਜਾਣ ਲਈ ਗੇਟ ਨੰਬਰ 1 ਤੋਂ ਆਓ। ਦਿਲ, ਅੱਖਾਂ ਜਾਂ ਬੱਚਿਆਂ ਦੇ ਸੈਂਟਰਾਂ ਲਈ ਗੇਟ 2 ਨੇੜੇ ਹੈ। ਸਮੇਂ ਸਿਰ ਟੋਕਨ ਲੈਣ ਲਈ ਸਵੇਰੇ 7:30 ਤੋਂ 8:00 ਵਜੇ ਪਹੁੰਚੋ।",
      tip: "Carry valid photo ID (Aadhaar/Voter ID) and ₹10 cash or UPI for registration fee.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      step: 2,
      title: "Get Registration Token",
      hindi_title: "2. टोकन मशीन से टोकन लेना",
      punjabi_title: "2. ਟੋਕਨ ਮਸ਼ੀਨ ਤੋਂ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰਨਾ",
      desc: "Go to New OPD Ground Floor. Collect a printed token from the automatic dispenser machine. If pre-registered online, head directly to Counter No. 1.",
      hindi_desc: "न्यू ओपीडी के ग्राउंड फ्लोर पर ऑटोमैटिक मशीन से टोकन पर्ची लें। यदि घर से ऑनलाइन प्री-रजिस्ट्रेशन किया है, तो सीधे काउंटर नंबर 1 पर जाएं।",
      punjabi_desc: "ਨਿਊ ਓਪੀਡੀ ਦੇ ਗਰਾਊਂਡ ਫਲੋਰ 'ਤੇ ਟੋਕਨ ਮਸ਼ੀਨ ਤੋਂ ਪਰਚੀ ਲਵੋ। ਜੇਕਰ ਆਨਲਾਈਨ ਪ੍ਰੀ-ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕੀਤੀ ਹੈ, ਤਾਂ ਸਿੱਧੇ ਕਾਊਂਟਰ ਨੰਬਰ 1 'ਤੇ ਜਾਓ।",
      tip: "Senior citizens and physically challenged patients have priority facilitation counters.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      step: 3,
      title: "CR Card Generation & Fee Payment",
      hindi_title: "3. CR कार्ड व टोकन सत्यापन (फीस ₹10)",
      punjabi_title: "3. ਸੀਆਰ ਕਾਰਡ ਅਤੇ ਫੀਸ (₹10)",
      desc: "Watch the digital LED screen for your token number. Approach the allotted counter, present patient ID, pay ₹10 fee, and receive your permanent 12-digit CR Number & OPD slip.",
      hindi_desc: "स्क्रीन पर अपना टोकन नंबर देखें। संबंधित काउंटर पर जाएं, ₹10 फीस दें। आपको 12 अंकों का पक्का CR नंबर और डॉक्टर की ओपीडी पर्ची मिलेगी।",
      punjabi_desc: "ਡਿਜੀਟਲ ਸਕ੍ਰੀਨ 'ਤੇ ਆਪਣਾ ਟੋਕਨ ਨੰਬਰ ਦੇਖੋ। ਕਾਊਂਟਰ 'ਤੇ ਜਾ ਕੇ ₹10 ਫੀਸ ਦਿਓ ਅਤੇ ਆਪਣਾ ਪੱਕਾ 12 ਅੰਕਾਂ ਦਾ ਸੀਆਰ ਕਾਰਡ ਲਵੋ।",
      tip: "Never lose your CR card. Returning patients must never make a duplicate card—bring your existing CR number.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      step: 4,
      title: "Proceed to Allotted Floor & Room",
      hindi_title: "4. पर्ची पर लिखे फ्लोर और कमरे में जाना",
      punjabi_title: "4. ਪਰਚੀ ਵਾਲੇ ਫਲੋਰ ਤੇ ਕਮਰੇ ਵਿੱਚ ਜਾਣਾ",
      desc: "Check the Room Number and Floor stamped on your OPD slip. Take the stairs/lifts to that floor. Submit your slip to the nursing station outside the doctor's room.",
      hindi_desc: "अपनी ओपीडी पर्ची पर लिखा कमरा नंबर और फ्लोर देखें। लिफ्ट या सीढ़ियों से उस फ्लोर पर जाएं और डॉक्टर के कमरे के बाहर स्टाफ/नर्स को पर्ची जमा करवाएं।",
      punjabi_desc: "ਆਪਣੀ ਪਰਚੀ 'ਤੇ ਲਿਖਿਆ ਕਮਰਾ ਨੰਬਰ ਅਤੇ ਫਲੋਰ ਦੇਖੋ। ਉੱਥੇ ਜਾ ਕੇ ਡਾਕਟਰ ਦੇ ਕਮਰੇ ਦੇ ਬਾਹਰ ਨਰਸ ਨੂੰ ਆਪਣੀ ਪਰਚੀ ਦਿਓ।",
      tip: "Consultations happen in sequence of entry/appointment. Keep previous medical files and discharge slips ready in hand.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      step: 5,
      title: "Doctor Consultation & Investigation Slips",
      hindi_title: "5. डॉक्टर से परामर्श व जांच पर्ची लेना",
      punjabi_title: "5. ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਅਤੇ ਟੈਸਟ ਪਰਚੀ",
      desc: "Doctor examines the patient and writes diagnoses, medicines, and any required blood/radiology investigations. Ensure you ask when the next follow-up is scheduled.",
      hindi_desc: "डॉक्टर मरीज की जांच करेंगे और दवाइयां या टेस्ट लिखेंगे। डॉक्टर से यह जरूर पूछें कि दोबारा किस दिन दिखाना है।",
      punjabi_desc: "ਡਾਕਟਰ ਮਰੀਜ਼ ਦੀ ਜਾਂਚ ਕਰਕੇ ਦਵਾਈਆਂ ਜਾਂ ਟੈਸਟ ਲਿਖਣਗੇ। ਅਗਲੀ ਵਾਰ ਕਿਸ ਦਿਨ ਆਉਣਾ ਹੈ, ਇਹ ਜ਼ਰੂਰ ਪੁੱਛੋ।",
      tip: "Ask the 4 golden sample questions before leaving: Fasting needed? Stop medicines? Where is sample lab?",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      step: 6,
      title: "Sample Labs & AMRIT Discounted Pharmacy",
      hindi_title: "6. सैंपल जमा करवाना व सस्ती दवाई लेना",
      punjabi_title: "6. ਸੈਂਪਲ ਲੈਬ ਅਤੇ ਸਸਤੀ ਦਵਾਈ (AMRIT)",
      desc: "For routine blood/urine, visit Room 127 (1st Floor). Pay lab fees at billing counters. Purchase prescribed medicines at in-campus AMRIT pharmacies (50%–70% cheaper than outside chemists).",
      hindi_desc: "खून/पेशाब जांच के लिए रूम 127 (फर्स्ट फ्लोर) जाएं। दवाइयां अस्पताल परिसर के अंदर मौजूद AMRIT फार्मेसी से खरीदें, जहां 50% से 70% तक छूट मिलती है।",
      punjabi_desc: "ਖੂਨ/ਪਿਸ਼ਾਬ ਟੈਸਟ ਲਈ ਰੂਮ 127 (ਪਹਿਲੀ ਮੰਜ਼ਿਲ) ਜਾਓ। ਦਵਾਈਆਂ ਕੈਂਪਸ ਅੰਦਰ ਅੰਮ੍ਰਿਤ (AMRIT) ਫਾਰਮੇਸੀ ਤੋਂ ਲਵੋ ਜਿੱਥੇ ਭਾਰੀ ਛੋਟ ਮਿਲਦੀ ਹੈ।",
      tip: "Avoid private medical stores outside the gate that push expensive non-generic brands.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    }
  ],

  // New OPD Floor-by-Floor Directory (Verified ground layout)
  new_opd_floor_directory: [
    {
      floor: "Ground Floor",
      hindi_floor: "ग्राउंड फ्लोर (भू-तल)",
      punjabi_floor: "ਗਰਾਊਂਡ ਫਲੋਰ (ਹੇਠਲੀ ਮੰਜ਼ਿਲ)",
      services: [
        "Central OPD Registration Counters (Tokens, New & Old Patient cards)",
        "Counter No. 1: Online Pre-Registration Verification Window",
        "Central 'May I Help You' / Inquiry Desk",
        "Central Billing & Cash Counters",
        "Room 25: Therapeutic Drug Monitoring (TDM) & Special Drug Lab",
        "General waiting hall, drinking water & public washrooms"
      ],
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      floor: "1st Floor",
      hindi_floor: "पहला फ्लोर (1st Floor)",
      punjabi_floor: "ਪਹਿਲੀ ਮੰਜ਼ਿਲ (1st Floor)",
      services: [
        "Room 127: Central Routine Blood & Urine Sample Collection Lab (Block C)",
        "Physical Medicine and Rehabilitation (PMR)",
        "General Surgery sub-specialty clinics",
        "Surgical dressing and minor procedure rooms"
      ],
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      floor: "2nd Floor",
      hindi_floor: "दूसरा फ्लोर (2nd Floor)",
      punjabi_floor: "ਦੂਜੀ ਮੰਜ਼ਿਲ (2nd Floor)",
      services: [
        "Obstetrics & Gynaecology (Women's Health, Antenatal & Infertility)",
        "Clinical Immunology & Rheumatology (Joint & autoimmune diseases)",
        "Endocrinology & Endocrine Surgery (Diabetes, Thyroid)",
        "Psychiatry & Mental Health Consultation (Blocks A & B)",
        "Jan Aushadhi Generic Medical Store (Level 2)"
      ],
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      floor: "3rd Floor",
      hindi_floor: "तीसरा फ्लोर (3rd Floor)",
      punjabi_floor: "ਤੀਜੀ ਮੰਜ਼ਿਲ (3rd Floor)",
      services: [
        "Internal Medicine Units 1, 2, 3, 4, 5, 6 (Blocks A and B)",
        "Cardiology routine follow-up consultations",
        "Geriatric (Elderly care) specialty clinics",
        "Pulmonary Medicine (Chest & Respiratory allergy consultations)"
      ],
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      floor: "4th Floor",
      hindi_floor: "चौथा फ्लोर (4th Floor)",
      punjabi_floor: "ਚੌਥੀ ਮੰਜ਼ਿਲ (4th Floor)",
      services: [
        "Gastroenterology & Hepatology (Liver, stomach, jaundice, hepatitis)",
        "Plastic Surgery & Burn / Cleft Palate rehabilitation (Block C)",
        "Pre-Anaesthesia Checkup (PAC) Clinic (Block B)",
        "Surgical gastroenterology follow-ups"
      ],
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      floor: "5th Floor",
      hindi_floor: "पांचवां फ्लोर (5th Floor)",
      punjabi_floor: "ਪੰਜਵੀਂ ਮੰਜ਼ਿਲ (5th Floor)",
      services: [
        "Medical Oncology & Chemotherapy Day Care guidance",
        "Clinical Haematology (Blood cancer, thalassemia, leukemia)",
        "Pain Clinic & Palliative Care Units (Blocks C & D)",
        "Ophthalmology specialized follow-up desks"
      ],
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    }
  ],

  // In-Campus AMRIT Pharmacies & Subsidized Jan Aushadhi Stores
  amrit_pharmacies: [
    {
      id: "amrit_nehru",
      name: "AMRIT Pharmacy - Nehru Hospital",
      location: "Nehru Hospital (Block A, Ground Floor near main entrance)",
      timings: "24 Hours (7 Days a week)",
      discounts: "50% to 70% discount on branded medicines, cancer drugs, and surgical items",
      phone: "0172-2755555 (Ext. Pharmacy)",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "amrit_emergency",
      name: "AMRIT Pharmacy - Emergency Block",
      location: "Inside Emergency Triage Hall, Ground Floor",
      timings: "24 Hours (24x7 Immediate Acute Relief)",
      discounts: "50% to 70% subsidized emergency life-saving medications, stents, and surgical disposables",
      phone: "0172-2755555",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "amrit_acc",
      name: "AMRIT Pharmacy - Advanced Cardiac Centre (ACC)",
      location: "ACC Building, Ground Floor Entrance",
      timings: "8:00 AM – 8:00 PM (Emergency 24x7)",
      discounts: "40% to 70% discount on specialized cardiology drugs, blood thinners, pacemakers, and cardiac consumables",
      phone: "0172-2755353",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "amrit_aec",
      name: "AMRIT Pharmacy & Opticals - Advanced Eye Centre (AEC)",
      location: "AEC Ground Floor Lobby",
      timings: "8:00 AM – 5:00 PM",
      discounts: "40% to 60% subsidized intraocular lenses (IOLs), prescription eye drops, and optical glasses",
      phone: "0172-2755252",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "amrit_apc",
      name: "AMRIT Pharmacy - Advanced Paediatric Centre (APC)",
      location: "APC Building, Ground Floor OPD area",
      timings: "8:00 AM – 8:00 PM",
      discounts: "50% to 70% discount on pediatric formulations, syrups, drops, and newborn ICU consumables",
      phone: "0172-2755858",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "jan_aushadhi_opd",
      name: "Pradhan Mantri Jan Aushadhi Kendra - New OPD",
      location: "New OPD Block, Level 2 (2nd Floor)",
      timings: "8:00 AM – 4:00 PM (Monday–Saturday)",
      discounts: "Affordable top-quality unbranded generic medicines (up to 80% cheaper)",
      phone: "In-campus desk",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "jan_aushadhi_gol_market",
      name: "Jan Aushadhi Store - Gol Market",
      location: "Shop No. 7, Gol Market, PGIMER Campus",
      timings: "8:30 AM – 6:00 PM",
      discounts: "50% to 80% cheaper generic alternatives for daily maintenance drugs (BP, Diabetes, Thyroid)",
      phone: "In-campus desk",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    }
  ],

  // Night Stays, Sarais & Patient Amenities
  sarais_and_amenities: [
    {
      id: "infosys_sarai",
      name: "Infosys Red Cross Sarai",
      type: "Hospital-Managed On-Site Sarai",
      location: "Inside PGIMER Campus (near Research Block)",
      capacity: "Over 300 beds (Dormitories & Private Rooms)",
      booking_mode: "Online portal and on-site booking counter at Sarai reception",
      charges: "Nominal subsidized rates (₹50–₹100 for dorm bed, ₹300–₹500 for room)",
      eligibility: "Requires valid PGIMER patient OPD card or indoor admission slip",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "rotary_sarai",
      name: "Rotary Sarai PGIMER",
      type: "Trust-Run On-Campus Accommodation",
      location: "Inside PGIMER Campus complex",
      capacity: "Dormitory beds and family rooms for patient attendants",
      booking_mode: "Inquire at Sarai desk with treatment card",
      charges: "Subsidized maintenance charge",
      eligibility: "PGI patient attendants only",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "hans_raj_sarai",
      name: "Hans Raj Dharamshala",
      type: "Nearby Trust Dharamshala",
      location: "Sector 12, Chandigarh (Directly adjacent to PGIMER Gate)",
      capacity: "Rooms and shared halls for outstation families",
      booking_mode: "Walk-in registration at reception",
      charges: "Budget-friendly nominal charity rates",
      eligibility: "Patient slip required",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "langar_points",
      name: "Free Community Meals (Langar Services)",
      type: "Free Humanitarian Meal Distribution",
      location: "Outside Gate No. 1 and near Gurdwara Sahib outside PGI perimeter",
      timings: "Afternoon (12:30 PM – 2:30 PM) & Evening (7:30 PM – 9:00 PM)",
      charges: "100% Free (Seva for all patients and attendants)",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      id: "drinking_water_toilets",
      name: "RO Clean Drinking Water & Public Toilets",
      type: "Public Utility",
      location: "Every floor of New OPD (near central lift lobby), Nehru Hospital, and ACC/APC waiting halls",
      charges: "Free public access",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    }
  ],

  golden_rules: [
    {
      num: 1,
      title: "Identify Patient Concern First",
      hindi_title: "मरीज की तकलीफ के हिसाब से विभाग चुनें",
      punjabi_title: "ਮਰੀਜ਼ ਦੀ ਤਕਲੀਫ਼ ਅਨੁਸਾਰ ਵਿਭਾਗ ਚੁਣੋ",
      desc: "Do not guess the room. Pick the initial department based on the primary symptom.",
      hindi_desc: "कमरा नंबर का अंदाज़ा न लगाएं। मुख्य लक्षण के आधार पर ही प्राथमिक विभाग का चयन करें।",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      num: 2,
      title: "Not Everyone Goes to New OPD",
      hindi_title: "हर मरीज को New OPD नहीं जाना",
      punjabi_title: "ਹਰ ਮਰੀਜ਼ ਨੂੰ ਨਿਊ ਓਪੀਡੀ ਨਹੀਂ ਜਾਣਾ",
      desc: "Heart, Eye, and Children clinics are housed in separate dedicated buildings across the campus.",
      hindi_desc: "दिल (ACC), आंख (AEC) और बच्चों (APC) के लिए परिसर में अलग विशेष इमारतें हैं।",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      num: 3,
      title: "New Patient: Correct Token & CR Card",
      hindi_title: "नया मरीज: सही काउंटर से टोकन और CR कार्ड बनवाएं",
      punjabi_title: "ਨਵਾਂ ਮਰੀਜ਼: ਸਹੀ ਕਾਊਂਟਰ ਤੋਂ ਟੋਕਨ ਤੇ ਕਾਰਡ ਬਣਵਾਓ",
      desc: "Take a token at the correct registration counter. Get your permanent CR card before proceeding to the clinic.",
      hindi_desc: "सही काउंटर से टोकन लें। पहले अपना पक्का सीआर नंबर / ओपीडी कार्ड बनवाएं फिर संबंधित डॉक्टर के पास जाएं।",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      num: 4,
      title: "Returning Patient: Never Make a Duplicate Card",
      hindi_title: "पुराना मरीज: पुराना कार्ड व रिपोर्ट लाएं, नया कार्ड न बनवाएं",
      punjabi_title: "ਪੁਰਾਣਾ ਮਰੀਜ਼: ਪੁਰਾਣਾ ਕਾਰਡ ਲਿਆਓ, ਨਵਾਂ ਕਾਰਡ ਨਾ ਬਣਵਾਓ",
      desc: "Always bring your existing CR number, prior doctor slips, and test reports. Never generate a second CR number for the same patient.",
      hindi_desc: "पुराना सीआर नंबर, डॉक्टर की पुरानी पर्ची और रिपोर्ट जरूर साथ लाएं। एक ही मरीज का बिना पूछे नया सीआर कार्ड न बनवाएं।",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      num: 5,
      title: "Test Slips Rule: Follow Doctor's Stamped Counter",
      hindi_title: "टेस्ट पर्ची का नियम: पर्ची पर लिखा काउंटर ही मान्य है",
      punjabi_title: "ਟੈਸਟ ਪਰਚੀ ਦਾ ਨਿਯਮ: ਪਰਚੀ ਵਾਲਾ ਕਾਊਂਟਰ ਹੀ ਦੇਖੋ",
      desc: "Every blood, urine, stool, culture, and X-ray test has specific counters. Follow what is stamped on your test slip.",
      hindi_desc: "सभी टेस्ट एक ही कमरे में नहीं होते। डॉक्टर द्वारा दी गई पर्ची पर जो लैब/काउंटर लिखा हो, वही जाएं।",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    }
  ],

  buildings: [
    {
      id: "new_opd",
      name: "New OPD Block",
      hindi_name: "न्यू ओपीडी ब्लॉक",
      punjabi_name: "ਨਿਊ ਓਪੀਡੀ ਬਲਾਕ",
      description: "General registration counters and multiple Medicine, Surgery & specialty clinics across various floors and blocks.",
      reception_phone: ["0172-2756969", "0172-2756868"],
      landmark: "Near Gate No. 1 / Main roundabout",
      is_separate_building: false,
      color: "blue",
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "acc",
      name: "Advanced Cardiac Centre (ACC)",
      hindi_name: "एडवांस्ड कार्डिएक सेंटर (ACC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਕਾਰਡੀਅਕ ਸੈਂਟਰ (ACC)",
      description: "Dedicated specialty hospital for heart diseases and surgery. Reception & separate OPD registration.",
      reception_phone: ["0172-2755353"],
      landmark: "Separate building near Nehru Hospital",
      is_separate_building: true,
      color: "red",
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "apc",
      name: "Advanced Paediatric Centre (APC)",
      hindi_name: "एडवांस्ड पीडियाट्रिक सेंटर (APC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਪੀਡੀਆਟ੍ਰਿਕ ਸੈਂਟਰ (APC)",
      description: "Dedicated children's specialty OPD and inpatient hospital. Separate registration.",
      reception_phone: ["0172-2755858"],
      landmark: "Separate building next to Advanced Eye Centre",
      is_separate_building: true,
      color: "emerald",
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "aec",
      name: "Advanced Eye Centre (AEC)",
      hindi_name: "एडवांस्ड आई सेंटर (AEC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਆਈ ਸੈਂਟਰ (AEC)",
      description: "Dedicated ophthalmology building for eye treatments, retina checkups, and surgery.",
      reception_phone: ["0172-2755252"],
      landmark: "Separate building near APC",
      is_separate_building: true,
      color: "amber",
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "atc",
      name: "Advanced Trauma Centre (ATC)",
      hindi_name: "एडवांस्ड ट्रॉमा सेंटर (ATC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਟ੍ਰੋਮਾ ਸੈਂਟਰ (ATC)",
      description: "24/7 dedicated acute emergency trauma care facility for severe accidents and urgent polytrauma.",
      reception_phone: ["0172-2755454"],
      landmark: "Emergency sector road",
      is_separate_building: true,
      color: "rose",
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "nehru_hospital",
      name: "Nehru Hospital / Emergency Block",
      hindi_name: "नेहरू हॉस्पिटल / इमरजेंसी ब्लॉक",
      punjabi_name: "ਨਹਿਰੂ ਹਸਪਤਾਲ / ਐਮਰਜੈਂਸੀ ਬਲਾਕ",
      description: "Emergency hospital. Immediate triage care. Routine OPD card is NOT required to enter emergency.",
      reception_phone: ["0172-2755555"],
      landmark: "Central hospital complex",
      is_separate_building: true,
      color: "purple",
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    }
  ],

  departments: [
    {
      id: "internal_medicine",
      name: "Medicine / Internal Medicine",
      hindi_name: "इंटरनल मेडिसिन / सामान्य चिकित्सा",
      punjabi_name: "ਜਨਰਲ ਮੈਡੀਸਨ",
      building_id: "new_opd",
      concerns: ["fever", "bukhar", "weakness", "kamzori", "diabetes", "sugar", "blood pressure", "bp", "chhati mein jalan", "general illness"],
      notes: "New OPD 3rd Floor (Blocks A & B). Primary starting point for adult medical complaints.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "pulmonary_medicine",
      name: "Pulmonary Medicine (Chest & Breathing)",
      hindi_name: "पल्मोनरी मेडिसिन / छाती एवं सांस विभाग",
      punjabi_name: "ਛਾਤੀ ਅਤੇ ਸਾਹ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["cough", "purani khansi", "asthma", "copd", "saans ki dikkat", "saans phoolna", "tb", "chest allergy"],
      notes: "New OPD 3rd Floor. Ask at help desk if Medicine referral is needed.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "cardiology",
      name: "Cardiology (Heart Follow-up)",
      hindi_name: "हृदय रोग विभाग (कार्डियोलॉजी)",
      punjabi_name: "ਦਿਲ ਦਾ ਰੋਗ ਵਿਭਾਗ",
      building_id: "acc",
      concerns: ["dil ki bimari", "heart follow-up", "chest pain follow-up", "palpitations", "dil ki dhadkan", "angioplasty check", "valve problem"],
      notes: "Advanced Cardiac Centre (ACC) — ALAG BUILDING. Do not look inside New OPD.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "neurology",
      name: "Neurology / Medicine (Nerve & Brain)",
      hindi_name: "न्यूरोलॉजी (तंत्रिका व दिमाग)",
      punjabi_name: "ਦਿਮਾਗ ਅਤੇ ਨਸਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["mirgi", "epilepsy", "seizures", "nerve", "haath kaanpna", "tremors", "numbness", "paralysis check"],
      notes: "New OPD 3rd/4th Floor. Confirm specific room from ground floor desk upon registration.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "orthopaedics",
      name: "Orthopaedics (Bones & Joints)",
      hindi_name: "हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)",
      punjabi_name: "ਹੱਡੀਆਂ ਅਤੇ ਜੋੜਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["haddi", "joint", "ghutne", "kamar ki dikkat", "knee pain", "back pain", "fracture check", "arthritis"],
      notes: "New OPD 2nd Floor. Fractures, arthritis, spine, and joint pain.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "general_surgery",
      name: "General Surgery",
      hindi_name: "जनरल सर्जरी (शल्य चिकित्सा)",
      punjabi_name: "ਜਨਰਲ ਸਰਜਰੀ",
      building_id: "new_opd",
      concerns: ["hernia", "gallbladder", "operation wali dikkat", "pitta ki pathri", "gilti", "swelling", "lump"],
      notes: "New OPD 1st and 4th Floor blocks.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "gastroenterology",
      name: "Gastroenterology / Medicine (Liver & Stomach)",
      hindi_name: "गैस्ट्रोएंटरोलॉजी (लिवर एवं पेट)",
      punjabi_name: "ਪੇਟ ਅਤੇ ਲਿਵਰ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["liver", "pet ki purani problem", "jaundice", "piliya", "hepatitis", "cirrhosis", "stomach burning"],
      notes: "New OPD 4th Floor. Inquire if primary referral from General Medicine is required.",
      referral_needed: true,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "nephrology",
      name: "Nephrology / Medicine (Kidney)",
      hindi_name: "नेफ्रोलॉजी (गुर्दा रोग)",
      punjabi_name: "ਗੁਰਦੇ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["kidney ki bimari", "gurda", "high creatinine", "dialysis", "swelling legs", "swelling face"],
      notes: "New OPD 3rd/4th Floor. Ask at registration if initial Medicine referral is needed.",
      referral_needed: true,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "urology",
      name: "Urology (Urinary & Prostate)",
      hindi_name: "यूरोलॉजी (पेशाब व प्रोस्टेट)",
      punjabi_name: "ਯੂਰੋਲੋਜੀ",
      building_id: "new_opd",
      concerns: ["peshab ki pathri", "prostate", "kidney stone", "difficulty urinating", "peshab mein dard"],
      notes: "New OPD specialty; surgical management of urinary stones and prostate.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "obs_gynae",
      name: "Obstetrics & Gynaecology (Women's Health)",
      hindi_name: "प्रसूति एवं स्त्री रोग विभाग",
      punjabi_name: "ਇਸਤਰੀ ਰੋਗ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["pregnancy", "periods", "mahila rog", "garbhvastha", "women health", "pcos"],
      notes: "New OPD 2nd Floor. Dedicated female waiting area and registration counter.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "paediatrics",
      name: "Paediatrics (Children)",
      hindi_name: "बाल रोग विभाग (पीडियाट्रिक्स)",
      punjabi_name: "ਬੱਚਿਆਂ ਦਾ ਵਿਭਾਗ",
      building_id: "apc",
      concerns: ["bachche ki bimari", "child illness", "infant fever", "child development", "vaccination"],
      notes: "Advanced Paediatric Centre (APC) — ALAG BUILDING. Located next to Advanced Eye Centre.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "ophthalmology",
      name: "Eye / Ophthalmology",
      hindi_name: "नेत्र रोग विभाग (आंखों की ओपीडी)",
      punjabi_name: "ਅੱਖਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "aec",
      concerns: ["aankhon ki problem", "eye problem", "dhundhla dikhna", "motiyabind", "cataract", "chashma", "glaucoma"],
      notes: "Advanced Eye Centre (AEC) — ALAG BUILDING. Dedicated registration & optical store inside AEC.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "ent",
      name: "ENT (Ear, Nose, Throat)",
      hindi_name: "ईएनटी (कान, नाक, गला)",
      punjabi_name: "ਕੰਨ, ਨੱਕ, ਗਲਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["kaan", "naak", "gala", "ear pain", "throat infection", "nose bleed", "hearing problem"],
      notes: "New OPD 1st / 2nd Floor. Audio testing booths adjacent.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "dermatology",
      name: "Dermatology (Skin & Allergy)",
      hindi_name: "चर्म रोग विभाग (त्वचा व एलर्जी)",
      punjabi_name: "ਚਮੜੀ ਦੇ ਰੋਗ",
      building_id: "new_opd",
      concerns: ["khujli", "daane", "skin allergy", "rashes", "eczema", "fungal", "safed daag"],
      notes: "New OPD 2nd / 3rd Floor blocks.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "psychiatry",
      name: "Psychiatry (Mental Health)",
      hindi_name: "मनोचिकित्सा विभाग (मानसिक स्वास्थ्य)",
      punjabi_name: "ਮਾਨਸਿਕ ਸਿਹਤ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["depression", "anxiety", "mental health", "ghabrahat", "neend na aana", "insomnia", "stress"],
      notes: "New OPD 2nd Floor (Blocks A & B).",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "oral_health",
      name: "Oral Health Sciences (Dental)",
      hindi_name: "दंत चिकित्सा विभाग (दांत व मुंह)",
      punjabi_name: "ਦੰਦਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["daant", "munh ki problem", "tooth pain", "gum bleeding", "cavity", "jaw pain"],
      notes: "Oral Health Sciences department reception in New OPD block.",
      referral_needed: false,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "haematology",
      name: "Medicine / Clinical Haematology (Blood Diseases)",
      hindi_name: "हेमेटोलॉजी (रक्त विकार व ल्यूकेमिया)",
      punjabi_name: "ਖੂਨ ਦੇ ਰੋਗ (ਹੀਮੈਟੋਲੋਜੀ)",
      building_id: "new_opd",
      concerns: ["khoon ki bimari", "leukemia", "anemia", "low platelets", "blood cancer", "bleeding disorders"],
      notes: "New OPD 5th Floor. Prior referral from Internal Medicine is often required.",
      referral_needed: true,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    },
    {
      id: "oncology",
      name: "Oncology (Cancer Specialty)",
      hindi_name: "ऑन्कोलॉजी (कैंसर चिकित्सा)",
      punjabi_name: "ਕੈਂਸਰ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["cancer ki dikkat", "tumor", "chemotherapy follow-up", "radiotherapy", "biopsy follow-up"],
      notes: "New OPD 5th Floor / Cobalt block. Inquire at Central Help Desk for specific cancer type.",
      referral_needed: true,
      status: "published",
      verified_at: LAST_VERIFIED_DATE,
      reviewer_role: ACCOUNTABLE_ROLE,
      source_reference: SOURCE_REFERENCE
    }
  ],

  opd_schedule: {
    status: "published",
    verified_at: LAST_VERIFIED_DATE,
    weekdays: {
      days: "Monday – Friday",
      registration_timings: "8:00 AM – 11:00 AM",
      notes: "Registration counters close strictly at 11:00 AM. Arrive by 7:30–8:00 AM for tokens. Special clinics have separate consultation timings."
    },
    saturday_and_holidays: {
      days: "Saturday / Gazetted Holidays",
      registration_timings: "8:00 AM – 10:30 AM",
      notes: "Closed on Sundays for routine OPD. Emergency remains open 24/7."
    },
    special_clinics_note: "Special clinics ke din aur timing alag ho sakte hain. Registration time aur doctor consultation time ek jaise nahi hote."
  },

  sample_collection: [
    {
      type: "Routine OPD Blood & Urine Collection",
      hindi_type: "सामान्य खून व पेशाब जांच",
      published_location: "New OPD, Block-C, 1st Floor, Room 127",
      verification_warning: "Published directory reference. Counter open 8:00 AM – 1:00 PM. Stamped room number on doctor's slip takes precedence.",
      fasting_guidance: "Har blood test mein fasting (khali pet) nahi hoti. Bina doctor ki salah ke regular medicines band mat karo.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      type: "Therapeutic Drug Monitoring (TDM)",
      hindi_type: "दवा स्तर जांच (TDM)",
      published_location: "New OPD, Ground Floor, Room 25",
      verification_warning: "Special drug-level testing (antiepileptic, immunosuppressants). Routine blood tests ke liye nahi.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      type: "Stool / Sputum / Culture",
      hindi_type: "मल, बलगम और कल्चर जांच",
      published_location: "Department of Microbiology / Designated Lab Help Desk",
      verification_warning: "Exact current counter verified nahi; test slip aur microbiology/lab help desk se poochhein.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      type: "Biopsy / Special Hormone Tests",
      hindi_type: "बायोप्सी एवं विशेष हार्मोन जांच",
      published_location: "Respective Department Specific Laboratories",
      verification_warning: "Department-specific instructions follow karein; direct Room 127 assume na karein.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      type: "Radiology (X-Ray / Ultrasound / CT / MRI)",
      hindi_type: "रेडियोलॉजी (एक्स-रे, सीटी, एमआरआई, अल्ट्रासाउंड)",
      published_location: "Radiology Department (Test slip ke hisaab se)",
      verification_warning: "Exact room aur appointment counter confirm karein. CT aur Ultrasound ke liye pehle token/appointment zaroori hai.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    },
    {
      type: "Report Collection (रिपोर्ट लेना)",
      hindi_type: "जांच रिपोर्ट प्राप्त करना",
      published_location: "Designated Report Collection Counters / Online Portal",
      verification_warning: "Receipt, CR number aur lab instructions dekhein. Many routine reports can now also be downloaded online from pgimer.edu.in.",
      status: "published",
      verified_at: LAST_VERIFIED_DATE
    }
  ],

  sample_four_questions: [
    {
      q: "Kya test khaali pet (fasting) karwana hai?",
      hindi: "क्या टेस्ट खाली पेट (fasting) करवाना है?",
      punjabi: "ਕੀ ਟੈਸਟ ਖਾਲੀ ਪੇਟ (ਫਾਸਟਿੰਗ) ਕਰਵਾਉਣਾ ਹੈ?",
      note: "Har blood test mein fasting nahi hoti. Bina wajah bhookhe na rahein."
    },
    {
      q: "Dawai khani hai ya rokni hai?",
      hindi: "दवाई खानी है या रोकनी है?",
      punjabi: "ਦਵਾਈ ਖਾਣੀ ਹੈ ਜਾਂ ਰੋਕਣੀ ਹੈ?",
      note: "Bina doctor ki salah ke regular BP ya heart ki medicines band mat karo."
    },
    {
      q: "Urine/stool ka dabba kahan milega, sample kitna aur kaise dena hai?",
      hindi: "पेशाब/मल का डिब्बा कहां मिलेगा और सैंपल कैसे देना है?",
      punjabi: "ਯੂਰੀਨ/ਸਟੂਲ ਦਾ ਡੱਬਾ ਕਿੱਥੋਂ ਮਿਲੇਗਾ ਅਤੇ ਸੈਂਪਲ ਕਿਵੇਂ ਦੇਣਾ ਹੈ?",
      note: "Lab counter se sahi container aur timing confirm karein."
    },
    {
      q: "Report kab aur kahan milegi?",
      hindi: "रिपोर्ट कब और कहां मिलेगी?",
      punjabi: "ਰਿਪੋਰਟ ਕਦੋਂ ਅਤੇ ਕਿੱਥੇ ਮਿਲੇਗੀ?",
      note: "Receipt aur cash slip ko sambhal kar rakhein. Online report download bhi check karein."
    }
  ],

  emergency_warning_signs: [
    "Tez seene ka dard (Severe central chest pain / pressure)",
    "Bahut saans phoolna (Extreme shortness of breath / gasping)",
    "Behoshi (Loss of consciousness / fainting)",
    "Ek taraf achanak kamzori ya paralysis (Sudden one-sided weakness / stroke sign)",
    "Bahut bleeding ya badi chot (Severe bleeding, major road trauma)",
    "Fit / daure ke baad hosh na aana (Unresponsive after a seizure)"
  ],
  emergency_instruction: "Turant Emergency staff ko batao. Routine OPD registration card ka wait mat karo!",

  card_making_process: {
    new_patient: {
      step: "Naya Patient (First Visit)",
      instruction: "Hospital help desk par bolo: 'Mujhe pehli baar dikhana hai, patient ko ___ ki dikkat hai. Card kahan banega?' Registration ke baad CR number milega. Card lekar allotted OPD mein jao."
    },
    returning_patient: {
      step: "Purana Patient (Follow-up)",
      instruction: "Pehle se bana CR number/card lekar aao. Same patient ke liye bina poochhe naya CR number na banwao."
    },
    online_pre_registration: {
      step: "Online Pre-Registration",
      instruction: "Ghar se details bhar sakte ho, lekin isse kisi particular doctor ki confirmed appointment nahi hoti. Registration counter No. 1 par jakar formal card verify karwana hota hai."
    }
  },

  checklist_items: [
    { id: "id_proof", text: "Valid Govt Photo ID (Aadhaar / Voter ID / DL)" },
    { id: "old_card", text: "Purana CR Card / OPD parchi (if returning patient)" },
    { id: "old_prescription", text: "Doctor ki purani parchi & past prescriptions" },
    { id: "reports", text: "Blood / X-ray / MRI / CT scan reports in a folder" },
    { id: "discharge_summary", text: "Discharge summary (agar pehle hospital mein bharti hue the)" },
    { id: "referral_letter", text: "Referral letter (agar doosre hospital/doctor se refer kiya hai)" },
    { id: "medicines_list", text: "Current daily medicines list / strips" },
    { id: "registered_mobile", text: "Active mobile phone for OTP & SMS updates" },
    { id: "online_confirmation", text: "Online pre-registration slip (agar online details bhari hain)" },
    { id: "cash_upi", text: "Nominal cash / UPI for ₹10 card fee & lab tests" }
  ],

  help_desk_phrases: [
    {
      situation: "Pehli Baar Aane Par (First Visit)",
      hindi: "नमस्ते जी, पेशेंट को ___ की दिक्कत है। हम पहली बार आए हैं। कार्ड काउंटर, बिल्डिंग और कमरा कहां है?",
      punjabi: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, ਮਰੀਜ਼ ਨੂੰ ___ ਦੀ ਦਿੱਕਤ ਹੈ। ਅਸੀਂ ਪਹਿਲੀ ਵਾਰ ਆਏ ਹਾਂ। ਕਾਰਡ ਕਾਊਂਟਰ, ਇਮਾਰਤ ਤੇ ਕਮਰਾ ਕਿੱਥੇ ਹੈ?",
      english: "Hello, the patient is experiencing [problem]. We are here for the first time. Where is the card registration counter, building, and room?"
    },
    {
      situation: "Specialty / Referral Poochhna",
      hindi: "नमस्ते जी, मरीज को किडनी/लिवर की दिक्कत है। कौन सी बिल्डिंग और रूम में जाना है? क्या पहले Medicine से रेफरल चाहिए?",
      punjabi: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, ਮਰੀਜ਼ ਨੂੰ ਗੁਰਦੇ/ਲਿਵਰ ਦੀ ਦਿੱਕਤ ਹੈ। ਕਿਹੜੀ ਬਿਲਡਿੰਗ ਜਾਣਾ ਹੈ? ਕੀ ਪਹਿਲਾਂ ਮੈਡੀਸਨ ਤੋਂ ਰੈਫਰਲ ਚਾਹੀਦਾ ਹੈ?",
      english: "The patient has kidney/liver issues. Which building and room should we visit? Do we need a referral from Medicine first?"
    },
    {
      situation: "Doctor ki Test Slip Par (Lab Test)",
      hindi: "डॉक्टर ने खून और पेशाब टेस्ट लिखा है। यह टेस्ट किस काउंटर पर होगा? रिपोर्ट कब और कहां मिलेगी?",
      punjabi: "ਡਾਕਟਰ ਨੇ ਖੂਨ ਅਤੇ ਪਿਸ਼ਾਬ ਦਾ ਟੈਸਟ ਲਿਖਿਆ ਹੈ। ਇਹ ਟੈਸਟ ਕਿਸ ਕਾਊਂਟਰ 'ਤੇ ਹੋਵੇਗਾ? ਰਿਪੋਰਟ ਕਦੋਂ ਤੇ ਕਿੱਥੇ ਮਿਲੇਗੀ?",
      english: "The doctor prescribed blood and urine tests. Which counter will collect the sample? When and where will the report be available?"
    }
  ],

  important_numbers: [
    { service: "New OPD Reception", phone: "0172-2756969 / 0172-2756868" },
    { service: "Advanced Cardiac Centre (ACC)", phone: "0172-2755353" },
    { service: "Advanced Paediatric Centre (APC)", phone: "0172-2755858" },
    { service: "Advanced Eye Centre (AEC)", phone: "0172-2755252" },
    { service: "Advanced Trauma Centre (ATC)", phone: "0172-2755454" },
    { service: "Nehru Hospital Emergency", phone: "0172-2755555" },
    { service: "PGI General Operator / Helpline", phone: "0172-2756565" }
  ],

  official_links: [
    {
      title: "PGIMER Official Portal",
      url: "https://pgimer.edu.in",
      desc: "Official institutional website for announcements and patient services."
    },
    {
      title: "Online Pre-Registration Portal",
      url: "https://www.pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/GlobalPages/JSP/portal_pre_registration.jsp",
      desc: "Fill patient details online up to 30 days prior (speeds up counter verification)."
    },
    {
      title: "Official OPD Doctor Schedule",
      url: "https://pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/Department/PatientCare/JSP/OPD_Schedule.jsp",
      desc: "Daily consultant duty rosters and department schedules."
    },
    {
      title: "Online Lab Reports Download",
      url: "https://pgimer.edu.in",
      desc: "Download routine blood and biochemistry test reports using your CR number."
    }
  ],

  lost_patient_advice: "Patient ke liye aakhri baat: Agar rasta samajh nahi aaye, kisi bhi reception/help desk par CR card aur parchi dikhao. Galat building mein ghoomne se achha hai pehle sahi jagah confirm karna."
};

// Backwards compatibility alias
export const localSeedData = authoritativeDirectory;
