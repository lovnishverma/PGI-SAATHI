export const localSeedData = {
  metadata: {
    source: "PGIMER Chandigarh Patient Help Guide (November 2026) & PGI Saathi SRS v2.0",
    version: "2.1.0",
    verified_at: "2026-11-18",
    status: "baseline_seed",
    disclaimer: "Independent patient navigation aid. Not an official PGIMER publication. Room, counter, OPD days and timings can change. Reconfirm at hospital help desk, signage, or test slip."
  },
  golden_rules: [
    {
      num: 1,
      title: "Identify Patient Concern First",
      hindi_title: "मरीज की तकलीफ के हिसाब से विभाग चुनें",
      punjabi_title: "ਮਰੀਜ਼ ਦੀ ਤਕਲੀਫ਼ ਅਨੁਸਾਰ ਵਿਭਾਗ ਚੁਣੋ",
      desc: "Do not guess the room. Pick the initial department based on the primary symptom.",
      hindi_desc: "कमरा नंबर का अंदाज़ा न लगाएं। मुख्य लक्षण के आधार पर ही प्राथमिक विभाग का चयन करें।"
    },
    {
      num: 2,
      title: "Not Everyone Goes to New OPD",
      hindi_title: "हर मरीज को New OPD नहीं जाना",
      punjabi_title: "ਹਰ ਮਰੀਜ਼ ਨੂੰ ਨਿਊ ਓਪੀਡੀ ਨਹੀਂ ਜਾਣਾ",
      desc: "Heart, Eye, and Children clinics are housed in separate dedicated buildings across the campus.",
      hindi_desc: "दिल (ACC), आंख (AEC) और बच्चों (APC) के लिए परिसर में अलग विशेष इमारतें हैं।"
    },
    {
      num: 3,
      title: "New Patient: Correct Token & CR Card",
      hindi_title: "नया मरीज: सही काउंटर से टोकन और CR कार्ड बनवाएं",
      punjabi_title: "ਨਵਾਂ ਮਰੀਜ਼: ਸਹੀ ਕਾਊਂਟਰ ਤੋਂ ਟੋਕਨ ਤੇ ਕਾਰਡ ਬਣਵਾਓ",
      desc: "Take a token at the correct registration counter. Get your permanent CR card before proceeding to the clinic.",
      hindi_desc: "सही काउंटर से टोकन लें। पहले अपना पक्का सीआर नंबर / ओपीडी कार्ड बनवाएं फिर संबंधित डॉक्टर के पास जाएं।"
    },
    {
      num: 4,
      title: "Returning Patient: Never Make a Duplicate Card",
      hindi_title: "पुराना मरीज: पुराना कार्ड व रिपोर्ट लाएं, नया कार्ड न बनवाएं",
      punjabi_title: "ਪੁਰਾਣਾ ਮਰੀਜ਼: ਪੁਰਾਣਾ ਕਾਰਡ ਲਿਆਓ, ਨਵਾਂ ਕਾਰਡ ਨਾ ਬਣਵਾਓ",
      desc: "Always bring your existing CR number, prior doctor slips, and test reports. Never generate a second CR number for the same patient.",
      hindi_desc: "पुराना सीआर नंबर, डॉक्टर की पुरानी पर्ची और रिपोर्ट जरूर साथ लाएं। एक ही मरीज का बिना पूछे नया सीआर कार्ड न बनवाएं।"
    },
    {
      num: 5,
      title: "Test Slips Rule: Follow Doctor's Stamped Counter",
      hindi_title: "टेस्ट पर्ची का नियम: पर्ची पर लिखा काउंटर ही मान्य है",
      punjabi_title: "ਟੈਸਟ ਪਰਚੀ ਦਾ ਨਿਯਮ: ਪਰਚੀ ਵਾਲਾ ਕਾਊਂਟਰ ਹੀ ਦੇਖੋ",
      desc: "Every blood, urine, stool, culture, and X-ray test has specific counters. Follow what is stamped on your test slip.",
      hindi_desc: "सभी टेस्ट एक ही कमरे में नहीं होते। डॉक्टर द्वारा दी गई पर्ची पर जो लैब/काउंटर लिखा हो, वही जाएं।"
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
      color: "blue"
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
      color: "red"
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
      color: "emerald"
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
      color: "amber"
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
      color: "rose"
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
      color: "purple"
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
      notes: "Primary starting point in New OPD for adult patients.",
      referral_needed: false
    },
    {
      id: "pulmonary_medicine",
      name: "Pulmonary Medicine (Chest & Breathing)",
      hindi_name: "पल्मोनरी मेडिसिन / छाती एवं सांस विभाग",
      punjabi_name: "ਛਾਤੀ ਅਤੇ ਸਾਹ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["cough", "purani khansi", "asthma", "copd", "saans ki dikkat", "saans phoolna", "tb", "chest allergy"],
      notes: "New OPD block. Ask at help desk if Medicine referral is needed.",
      referral_needed: false
    },
    {
      id: "cardiology",
      name: "Cardiology (Heart)",
      hindi_name: "हृदय रोग विभाग (कार्डियोलॉजी)",
      punjabi_name: "ਦਿਲ ਦਾ ਰੋਗ ਵਿਭਾਗ",
      building_id: "acc",
      concerns: ["dil ki bimari", "heart follow-up", "chest pain follow-up", "palpitations", "dil ki dhadkan", "angioplasty check", "valve problem"],
      notes: "Advanced Cardiac Centre (ACC) — ALAG BUILDING. Do not look inside New OPD.",
      referral_needed: false
    },
    {
      id: "neurology",
      name: "Neurology / Medicine (Nerve & Brain)",
      hindi_name: "न्यूरोलॉजी (तंत्रिका व दिमाग)",
      punjabi_name: "ਦਿਮਾਗ ਅਤੇ ਨਸਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["mirgi", "epilepsy", "seizures", "nerve", "haath kaanpna", "tremors", "numbness", "paralysis check"],
      notes: "Confirm OPD location and clinic room at New OPD ground floor desk.",
      referral_needed: false
    },
    {
      id: "orthopaedics",
      name: "Orthopaedics (Bones & Joints)",
      hindi_name: "हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)",
      punjabi_name: "ਹੱਡੀਆਂ ਅਤੇ ਜੋੜਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["haddi", "joint", "ghutne", "kamar ki dikkat", "knee pain", "back pain", "fracture check", "arthritis"],
      notes: "Confirm room from New OPD help desk upon arrival.",
      referral_needed: false
    },
    {
      id: "general_surgery",
      name: "General Surgery",
      hindi_name: "जनरल सर्जरी (शल्य चिकित्सा)",
      punjabi_name: "ਜਨਰਲ ਸਰਜਰੀ",
      building_id: "new_opd",
      concerns: ["hernia", "gallbladder", "operation wali dikkat", "pitta ki pathri", "gilti", "swelling", "lump"],
      notes: "New OPD block.",
      referral_needed: false
    },
    {
      id: "gastroenterology",
      name: "Gastroenterology / Medicine (Liver & Stomach)",
      hindi_name: "गैस्ट्रोएंटरोलॉजी (लिवर एवं पेट)",
      punjabi_name: "ਪੇਟ ਅਤੇ ਲਿਵਰ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["liver", "pet ki purani problem", "jaundice", "piliya", "hepatitis", "cirrhosis", "stomach burning"],
      notes: "Ask at help desk if internal referral from Medicine is needed first.",
      referral_needed: true
    },
    {
      id: "nephrology",
      name: "Nephrology / Medicine (Kidney)",
      hindi_name: "नेफ्रोलॉजी (गुर्दा रोग)",
      punjabi_name: "ਗੁਰਦੇ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["kidney ki bimari", "gurda", "high creatinine", "dialysis", "swelling legs", "swelling face"],
      notes: "Ask at reception if initial Medicine referral is required.",
      referral_needed: true
    },
    {
      id: "urology",
      name: "Urology (Urinary & Prostate)",
      hindi_name: "यूरोलॉजी (पेशाब व प्रोस्टेट)",
      punjabi_name: "ਯੂਰੋਲੋਜੀ",
      building_id: "new_opd",
      concerns: ["peshab ki pathri", "prostate", "kidney stone", "difficulty urinating", "peshab mein dard"],
      notes: "New OPD specialty; confirm clinic room on registration.",
      referral_needed: false
    },
    {
      id: "obs_gynae",
      name: "Obstetrics & Gynaecology (Women's Health)",
      hindi_name: "प्रसूति एवं स्त्री रोग विभाग",
      punjabi_name: "ਇਸਤਰੀ ਰੋਗ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["pregnancy", "periods", "mahila rog", "garbhvastha", "women health", "pcos"],
      notes: "Confirm clinic location and female registration counter in New OPD.",
      referral_needed: false
    },
    {
      id: "paediatrics",
      name: "Paediatrics (Children)",
      hindi_name: "बाल रोग विभाग (पीडियाट्रिक्स)",
      punjabi_name: "ਬੱਚਿਆਂ ਦਾ ਵਿਭਾਗ",
      building_id: "apc",
      concerns: ["bachche ki bimari", "child illness", "infant fever", "child development", "vaccination"],
      notes: "Advanced Paediatric Centre (APC) — ALAG BUILDING. Located near Advanced Eye Centre.",
      referral_needed: false
    },
    {
      id: "ophthalmology",
      name: "Eye / Ophthalmology",
      hindi_name: "नेत्र रोग विभाग (आंखों की ओपीडी)",
      punjabi_name: "ਅੱਖਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "aec",
      concerns: ["aankhon ki problem", "eye problem", "dhundhla dikhna", "motiyabind", "cataract", "chashma", "glaucoma"],
      notes: "Advanced Eye Centre (AEC) — ALAG BUILDING. Do not look in New OPD.",
      referral_needed: false
    },
    {
      id: "ent",
      name: "ENT (Ear, Nose, Throat)",
      hindi_name: "ईएनटी (कान, नाक, गला)",
      punjabi_name: "ਕੰਨ, ਨੱਕ, ਗਲਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["kaan", "naak", "gala", "ear pain", "throat infection", "nose bleed", "hearing problem"],
      notes: "Confirm room from New OPD help desk.",
      referral_needed: false
    },
    {
      id: "dermatology",
      name: "Dermatology (Skin & Allergy)",
      hindi_name: "चर्म रोग विभाग (त्वचा व एलर्जी)",
      punjabi_name: "ਚਮੜੀ ਦੇ ਰੋਗ",
      building_id: "new_opd",
      concerns: ["khujli", "daane", "skin allergy", "rashes", "eczema", "fungal", "safed daag"],
      notes: "New OPD location confirm.",
      referral_needed: false
    },
    {
      id: "psychiatry",
      name: "Psychiatry (Mental Health)",
      hindi_name: "मनोचिकित्सा विभाग (मानसिक स्वास्थ्य)",
      punjabi_name: "ਮਾਨਸਿਕ ਸਿਹਤ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["depression", "anxiety", "mental health", "ghabrahat", "neend na aana", "insomnia", "stress"],
      notes: "New OPD location confirm.",
      referral_needed: false
    },
    {
      id: "oral_health",
      name: "Oral Health Sciences (Dental)",
      hindi_name: "दंत चिकित्सा विभाग (दांत व मुंह)",
      punjabi_name: "ਦੰਦਾਂ ਦਾ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["daant", "munh ki problem", "tooth pain", "gum bleeding", "cavity", "jaw pain"],
      notes: "Oral Health Sciences department reception in New OPD block.",
      referral_needed: false
    },
    {
      id: "haematology",
      name: "Medicine / Clinical Haematology (Blood Diseases)",
      hindi_name: "हेमेटोलॉजी (रक्त विकार व ल्यूकेमिया)",
      punjabi_name: "ਖੂਨ ਦੇ ਰੋਗ (ਹੀਮੈਟੋਲੋਜੀ)",
      building_id: "new_opd",
      concerns: ["khoon ki bimari", "leukemia", "anemia", "low platelets", "blood cancer", "bleeding disorders"],
      notes: "Referral zaroori ho sakta hai. Inquire at Medicine registration desk first.",
      referral_needed: true
    },
    {
      id: "oncology",
      name: "Oncology (Cancer Specialty)",
      hindi_name: "ऑन्कोलॉजी (कैंसर चिकित्सा)",
      punjabi_name: "ਕੈਂਸਰ ਵਿਭਾਗ",
      building_id: "new_opd",
      concerns: ["cancer ki dikkat", "tumor", "chemotherapy follow-up", "radiotherapy", "biopsy follow-up"],
      notes: "Specialty determined by cancer type; confirm referral at Central Help Desk.",
      referral_needed: true
    }
  ],
  opd_schedule: {
    weekdays: {
      days: "Monday – Friday",
      registration_timings: "8:00 AM – 11:00 AM",
      notes: "Registration counters close strictly at 11:00 AM. Special clinics have separate days."
    },
    saturday_and_holidays: {
      days: "Saturday / Gazetted Holidays",
      registration_timings: "8:00 AM – 10:30 AM",
      notes: "Closed on Sundays. Emergency remains open 24/7."
    },
    special_clinics_note: "Special clinics ke din aur timing alag ho sakte hain. Registration time aur doctor consultation time ek jaise nahi hote."
  },
  sample_collection: [
    {
      type: "Routine OPD Blood & Urine Collection",
      hindi_type: "सामान्य खून व पेशाब जांच",
      published_location: "New OPD, Block-C, 1st Floor, Room 127",
      verification_warning: "Published directory reference. Current counter aur test eligibility zaroor confirm karein. Slip par doosra room ho to slip follow karein.",
      fasting_guidance: "Har blood test mein fasting (khali pet) nahi hoti. Bina doctor ki salah ke regular medicines band mat karo."
    },
    {
      type: "Therapeutic Drug Monitoring (TDM)",
      hindi_type: "दवा स्तर जांच (TDM)",
      published_location: "New OPD, Ground Floor, Room 25",
      verification_warning: "Special drug-level testing ke published instructions. Routine blood tests ke liye nahi."
    },
    {
      type: "Stool / Sputum / Culture",
      hindi_type: "मल, बलगम और कल्चर जांच",
      published_location: "Department of Microbiology / Designated Lab Help Desk",
      verification_warning: "Exact current counter verified nahi; test slip aur microbiology/lab help desk se poochhein."
    },
    {
      type: "Biopsy / Special Hormone Tests",
      hindi_type: "बायोप्सी एवं विशेष हार्मोन जांच",
      published_location: "Respective Department Specific Laboratories",
      verification_warning: "Department-specific instructions follow karein; direct Room 127 assume na karein."
    },
    {
      type: "Radiology (X-Ray / Ultrasound / CT / MRI)",
      hindi_type: "रेडियोलॉजी (एक्स-रे, सीटी, एमआरआई, अल्ट्रासाउंड)",
      published_location: "Radiology Department (Test slip ke hisaab se)",
      verification_warning: "Exact room aur appointment counter confirm karein. CT aur Ultrasound ke liye pehle token/appointment zaroori hai."
    },
    {
      type: "Report Collection (रिपोर्ट लेना)",
      hindi_type: "जांच रिपोर्ट प्राप्त करना",
      published_location: "Designated Report Collection Counters",
      verification_warning: "Receipt, CR number aur lab instructions dekhein; report collection counter se samay poochhein."
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
      note: "Receipt aur cash slip ko sambhal kar rakhein."
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
      instruction: "Ghar se details bhar sakte ho, lekin isse kisi particular doctor ki confirmed appointment nahi hoti. Registration counter par jakar formal card verify karwana hota hai."
    }
  },
  checklist_items: [
    { id: "id_proof", text: "ID proof (Aadhaar / Voter ID)" },
    { id: "old_card", text: "Purana CR / OPD card (agar purana patient ho)" },
    { id: "old_prescription", text: "Doctor ki purani parchi (old prescription)" },
    { id: "reports", text: "Blood / X-ray / MRI / CT scan reports" },
    { id: "discharge_summary", text: "Discharge summary (agar pehle bharti hue the)" },
    { id: "referral_letter", text: "Referral letter (agar kisi doosre hospital se refer kiya hai)" },
    { id: "medicines_list", text: "Medicines ki list (jo dawa abhi chal rahi hai)" },
    { id: "registered_mobile", text: "Registered mobile phone (SMS aur OTP ke liye)" },
    { id: "online_confirmation", text: "Online registration confirmation slip (agar online details bhari hain)" }
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
    { service: "Nehru Hospital Emergency", phone: "0172-2755555" }
  ],
  official_links: [
    {
      title: "PGIMER Official Portal",
      url: "https://pgimer.edu.in",
      desc: "Official institutional website for announcements and hospital information."
    },
    {
      title: "Official OPD Schedule",
      url: "https://pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/Department/PatientCare/JSP/OPD_Schedule.jsp",
      desc: "Live official schedule of department clinics and doctors."
    },
    {
      title: "Online Pre-Registration Portal",
      url: "https://www.pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/GlobalPages/JSP/portal_pre_registration.jsp",
      desc: "Fill patient details online before arrival (does not guarantee confirmed appointment)."
    },
    {
      title: "SARATHI Patient-Help Toolkit (PDF)",
      url: "https://pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/Sarathi/simages/SarathiToolkit.pdf",
      desc: "Official patient welfare guidelines and assistance document."
    }
  ],
  lost_patient_advice: "Patient ke liye aakhri baat: Agar rasta samajh nahi aaye, kisi bhi reception/help desk par CR card aur parchi dikhao. Galat building mein ghoomne se achha hai pehle sahi jagah confirm karna."
};
