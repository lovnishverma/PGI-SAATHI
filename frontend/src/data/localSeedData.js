export const localSeedData = {
  metadata: {
    source: "PGIMER Patient Help Guide (November 2026) & PGI Saathi SRS v2.0",
    version: "2.0.0",
    verified_at: "2026-11-18",
    status: "baseline_seed"
  },
  buildings: [
    {
      id: "new_opd",
      name: "New OPD Block",
      hindi_name: "न्यू ओपीडी ब्लॉक",
      punjabi_name: "ਨਿਊ ਓਪੀਡੀ ਬਲਾਕ",
      description: "Main outpatient registration and general clinic consultations across multiple specialty departments.",
      reception_phone: ["0172-2756969", "0172-2756868"],
      landmark: "Near Gate No. 1 / Main roundabout",
      is_separate_building: false,
      color: "blue"
    },
    {
      id: "acc",
      name: "Advanced Cardiac Centre (ACC)",
      hindi_name: "एडवांस्ड कार्डिएक सेंटर (ACC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਕਾਰਡੀਅਕ ਸੈਂਟਰ (ACC)",
      description: "Dedicated specialty hospital for cardiology and heart operations. Do not search inside New OPD.",
      reception_phone: ["0172-2755353"],
      landmark: "Separate specialized building near Nehru Hospital",
      is_separate_building: true,
      color: "red"
    },
    {
      id: "apc",
      name: "Advanced Paediatric Centre (APC)",
      hindi_name: "एडवांस्ड पीडियाट्रिक सेंटर (APC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਪੀਡੀਆਟ੍ਰਿਕ ਸੈਂਟਰ (APC)",
      description: "Dedicated specialty building for newborn, infant, and child medical care.",
      reception_phone: ["0172-2755858"],
      landmark: "Separate building next to Advanced Eye Centre",
      is_separate_building: true,
      color: "emerald"
    },
    {
      id: "aec",
      name: "Advanced Eye Centre (AEC)",
      hindi_name: "एडवांस्ड आई सेंटर (AEC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਆਈ ਸੈਂਟਰ (AEC)",
      description: "Dedicated ophthalmology hospital for eye conditions, retinal care, and eye surgery.",
      reception_phone: ["0172-2755252"],
      landmark: "Separate building near APC",
      is_separate_building: true,
      color: "amber"
    },
    {
      id: "atc",
      name: "Advanced Trauma Centre (ATC)",
      hindi_name: "एडवांस्ड ट्रॉमा सेंटर (ATC)",
      punjabi_name: "ਐਡਵਾਂਸਡ ਟ੍ਰੋਮਾ ਸੈਂਟਰ (ATC)",
      description: "24/7 dedicated acute emergency trauma care facility for accidents and major critical trauma.",
      reception_phone: ["0172-2755454"],
      landmark: "Emergency sector road",
      is_separate_building: true,
      color: "rose"
    },
    {
      id: "nehru_hospital",
      name: "Nehru Hospital / Emergency Block",
      hindi_name: "नेहरू हॉस्पिटल / इमरजेंसी ब्लॉक",
      punjabi_name: "ਨਹਿਰੂ ਹਸਪਤਾਲ / ਐਮਰਜੈਂਸੀ ਬਲਾਕ",
      description: "Main indoor hospital complex and 24/7 emergency triage services.",
      reception_phone: ["0172-2755555"],
      landmark: "Central hospital complex",
      is_separate_building: true,
      color: "purple"
    }
  ],
  departments: [
    {
      id: "internal_medicine",
      name: "Internal Medicine / General Medicine",
      hindi_name: "इंटरनल मेडिसिन / सामान्य चिकित्सा",
      punjabi_name: "ਜਨਰਲ ਮੈਡੀਸਨ",
      building_id: "new_opd",
      concerns: ["fever", "bukhar", "weakness", "kamzori", "diabetes", "sugar", "blood pressure", "bp", "chhati mein jalan", "general illness"],
      notes: "Primary starting point for adult general symptoms without a pre-existing subspecialty card.",
      referral_needed: false
    },
    {
      id: "pulmonary_medicine",
      name: "Pulmonary Medicine / Chest Clinic",
      hindi_name: "पल्मोनरी मेडिसिन / छाती एवं सांस विभाग",
      punjabi_name: "ਛਾਤੀ ਅਤੇ ਸਾਹ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["cough", "purani khansi", "asthma", "copd", "saans phoolna", "chest congestion", "tb"],
      notes: "Ask at New OPD Help Desk for chest clinic room or whether General Medicine referral is required.",
      referral_needed: false
    },
    {
      id: "cardiology",
      name: "Cardiology (Heart)",
      hindi_name: "हृदय रोग विभाग (कार्डियोलॉजी)",
      punjabi_name: "ਦਿਲ ਦਾ ਰੋਗ ਵਿਭਾਗ",
      building_id: "acc",
      concerns: ["heart disease", "dil ki bimari", "heart attack follow-up", "palpitations", "dil ki dhadkan", "angioplasty check"],
      notes: "Located in the separate Advanced Cardiac Centre (ACC) building. Do not look in New OPD.",
      referral_needed: false
    },
    {
      id: "neurology",
      name: "Neurology (Brain & Nerves)",
      hindi_name: "न्यूरोलॉजी (तंत्रिका रोग)",
      punjabi_name: "ਦਿਮਾਗ ਅਤੇ ਨਸਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["epilepsy", "mirgi", "seizures", "daura", "nerve pain", "haath kaanpna", "tremors", "numbness", "paralysis check"],
      notes: "New OPD building. Inquire at ground floor token counter.",
      referral_needed: false
    },
    {
      id: "orthopaedics",
      name: "Orthopaedics (Bones & Joints)",
      hindi_name: "हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)",
      punjabi_name: "ਹੱਡੀਆਂ ਅਤੇ ਜੋੜਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["fracture", "joint pain", "ghutne ka dard", "knee pain", "kamar dard", "back pain", "haddi ki dikkat", "spine"],
      notes: "Confirm clinic room and counter with OPD reception staff.",
      referral_needed: false
    },
    {
      id: "general_surgery",
      name: "General Surgery",
      hindi_name: "जनरल सर्जरी (शल्य चिकित्सा)",
      punjabi_name: "ਜਨਰਲ ਸਰਜਰੀ",
      building_id: "new_opd",
      concerns: ["hernia", "gallbladder stones", "pitta ki pathri", "swelling", "gilti", "lump", "operation assessment"],
      notes: "New OPD block.",
      referral_needed: false
    },
    {
      id: "gastroenterology",
      name: "Gastroenterology (Stomach & Liver)",
      hindi_name: "गैस्ट्रोएंटरोलॉजी (पेट एवं लिवर)",
      punjabi_name: "ਪੇਟ ਅਤੇ ਲਿਵਰ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["jaundice", "piliya", "liver problem", "stomach pain", "pet ki dikkat", "hepatitis", "cirrhosis", "ulcer"],
      notes: "Super-specialty clinic. Patients often require initial referral from General Medicine.",
      referral_needed: true
    },
    {
      id: "nephrology",
      name: "Nephrology (Kidney)",
      hindi_name: "नेफ्रोलॉजी (गुर्दा रोग)",
      punjabi_name: "ਗੁਰਦੇ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["kidney problem", "gurda", "high creatinine", "dialysis", "swelling on face", "swelling legs"],
      notes: "May require prior consultation in Medicine or doctor referral letter.",
      referral_needed: true
    },
    {
      id: "urology",
      name: "Urology (Urinary & Prostate)",
      hindi_name: "यूरोलॉजी (मूत्र रोग)",
      punjabi_name: "ਯੂਰੋਲੋਜੀ",
      building_id: "new_opd",
      concerns: ["kidney stones", "peshab ki pathri", "prostate", "difficulty urinating", "peshab mein dikkat", "burning urination"],
      notes: "New OPD specialty clinic.",
      referral_needed: false
    },
    {
      id: "obs_gynae",
      name: "Obstetrics & Gynaecology (Women)",
      hindi_name: "प्रसूति एवं स्त्री रोग विभाग",
      punjabi_name: "ਇਸਤਰੀ ਰੋਗ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["pregnancy", "garbhvastha", "irregular periods", "mahila rog", "women health", "fibroid", "pcos"],
      notes: "Dedicated female registration counters and examination floors in New OPD.",
      referral_needed: false
    },
    {
      id: "paediatrics",
      name: "Paediatrics (Children & Infants)",
      hindi_name: "बाल रोग विभाग (पीडियाट्रिक्स)",
      punjabi_name: "ਬੱਚਿਆਂ ਦਾ ਵਿਭਾਗ",
      building_id: "apc",
      concerns: ["child illness", "bachche ki bimari", "infant fever", "growth issues", "pediatric checkup", "child vaccination"],
      notes: "Located exclusively in the separate Advanced Paediatric Centre (APC) building.",
      referral_needed: false
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology (Eye)",
      hindi_name: "नेत्र रोग विभाग (आंखों का विभाग)",
      punjabi_name: "ਅੱਖਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "aec",
      concerns: ["eye problem", "aankh ka dard", "dim vision", "dhundhla dikhna", "cataract", "motiyabind", "chashma", "glaucoma"],
      notes: "Located exclusively in the separate Advanced Eye Centre (AEC) building.",
      referral_needed: false
    },
    {
      id: "ent",
      name: "Otolaryngology / ENT (Ear, Nose, Throat)",
      hindi_name: "ईएनटी (कान, नाक, गला)",
      punjabi_name: "ਕੰਨ, ਨੱਕ, ਗਲਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["ear pain", "kaan ka behna", "nose bleeding", "throat pain", "gale mein dard", "hearing loss", "tonsils"],
      notes: "New OPD block; check reception display for room assignment.",
      referral_needed: false
    },
    {
      id: "dermatology",
      name: "Dermatology (Skin)",
      hindi_name: "चर्म रोग विभाग (त्वचा)",
      punjabi_name: "ਚਮੜੀ ਦੇ ਰੋਗ",
      building_id: "new_opd",
      concerns: ["itching", "khujli", "rashes", "daane", "skin allergy", "vitiligo", "fungal infection", "eczema"],
      notes: "New OPD block.",
      referral_needed: false
    },
    {
      id: "psychiatry",
      name: "Psychiatry (Mental Health)",
      hindi_name: "मनोचिकित्सा विभाग (मानसिक स्वास्थ्य)",
      punjabi_name: "ਮਾਨਸਿਕ ਸਿਹਤ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["depression", "anxiety", "ghabrahat", "neend na aana", "insomnia", "stress", "tension", "bipolar"],
      notes: "New OPD block.",
      referral_needed: false
    },
    {
      id: "oral_health",
      name: "Oral Health Sciences (Dental)",
      hindi_name: "दंत चिकित्सा विभाग",
      punjabi_name: "ਦੰਦਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["tooth pain", "daant ka dard", "gum bleeding", "cavity", "jaw pain", "root canal"],
      notes: "Department reception in New OPD block.",
      referral_needed: false
    }
  ],
  opd_schedule: {
    weekdays: {
      days: "Monday – Friday",
      registration_timings: "8:00 AM – 11:00 AM",
      notes: "Registration counters close strictly at 11:00 AM."
    },
    saturday_and_holidays: {
      days: "Saturday / Gazetted Holidays",
      registration_timings: "8:00 AM – 10:30 AM",
      notes: "Closed on Sundays. Emergency remains open 24/7."
    }
  },
  sample_collection: [
    {
      type: "Routine Blood & Urine Collection",
      published_location: "New OPD, Block-C, 1st Floor, Room 127",
      verification_warning: "Reference location from published guide. Always verify the exact room number printed on the doctor's test slip.",
      fasting_guidance: "Fasting is not required for every blood test. Do not stop regular blood pressure or heart medications without doctor advice."
    },
    {
      type: "Therapeutic Drug Monitoring (TDM)",
      published_location: "New OPD, Ground Floor, Room 25",
      verification_warning: "For specialized drug concentration monitoring, not standard routine blood tests."
    },
    {
      type: "Microbiology / Stool / Sputum / Culture",
      published_location: "Department of Microbiology / Designated Lab Counters",
      verification_warning: "Ask the lab token desk near Room 127 or verify on doctor's requisition form."
    },
    {
      type: "Radiology (X-Ray / Ultrasound / CT / MRI)",
      published_location: "Radiology Department Counters (Ground & Basement levels)",
      verification_warning: "Ultrasound and CT scans usually require advance token appointment."
    }
  ],
  emergency_warning_signs: [
    "Severe central chest pain, pressure, or tightness radiating to left arm or neck",
    "Extreme shortness of breath or sudden gasping for air",
    "Sudden loss of consciousness or unresponsiveness",
    "Sudden facial drooping, arm weakness, or slurred speech (Stroke warning)",
    "Uncontrolled severe bleeding, heavy trauma, or acute road traffic accidents",
    "Continuous seizures without regaining consciousness"
  ],
  emergency_instruction: "DO NOT WAIT IN ROUTINE OPD REGISTRATION QUEUES. Proceed directly to Emergency / Nehru Hospital or Advanced Trauma Centre (ATC) immediately.",
  help_desk_phrases: [
    {
      situation: "First Visit / New Patient",
      english: "I am visiting for the first time. The patient has [problem]. Where should I get the registration card made?",
      hindi: "नमस्ते, हम पहली बार आए हैं। मरीज को [समस्या] की दिक्कत है। ओपीडी कार्ड किस काउंटर पर बनेगा?",
      punjabi: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, ਅਸੀਂ ਪਹਿਲੀ ਵਾਰ ਆਏ ਹਾਂ। ਮਰੀਜ਼ ਨੂੰ [ਤਕਲੀਫ਼] ਹੈ। ਕਾਰਡ ਕਿਹੜੇ ਕਾਊਂਟਰ 'ਤੇ ਬਣੇਗਾ?"
    },
    {
      situation: "Lab Sample / Blood Test",
      english: "The doctor prescribed a blood/urine test. Which counter/room should I deposit the sample at?",
      hindi: "डॉक्टर ने खून/पेशाब का टेस्ट लिखा है। यह सैंपल किस कमरे या काउंटर पर जमा होगा?",
      punjabi: "ਡਾਕਟਰ ਨੇ ਖੂਨ/ਪਿਸ਼ਾਬ ਦਾ ਟੈਸਟ ਲਿਖਿਆ ਹੈ। ਇਹ ਸੈਂਪਲ ਕਿਸ ਕਮਰੇ ਜਾਂ ਕਾਊਂਟਰ 'ਤੇ ਦੇਣਾ ਪਵੇਗਾ?"
    },
    {
      situation: "Sub-specialty Referral",
      english: "Does the patient require a referral from General Medicine before visiting this specialty clinic?",
      hindi: "क्या इस स्पेशल ओपीडी में दिखाने से पहले इंटरनल मेडिसिन से रेफरल पर्ची चाहिए?",
      punjabi: "ਕੀ ਇਸ ਸਪੈਸ਼ਲ ਓਪੀਡੀ ਲਈ ਪਹਿਲਾਂ ਜਨਰਲ ਮੈਡੀਸਨ ਤੋਂ ਰੈਫਰਲ ਦੀ ਲੋੜ ਹੈ?"
    }
  ]
};
