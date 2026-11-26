import React, { useState } from 'react';
import { Map, MapPin } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export const CampusMap = () => {
  const [selectedSpot, setSelectedSpot] = useState('new_opd');
  const { lang, highContrast } = useLanguage();

  const spots = [
    {
      id: "gate1",
      name: lang === 'hi' ? "गेट 1 (मुख्य प्रवेश द्वार - सेक्टर 12)" : "Gate 1 (Sector 12 Main Entrance)",
      x: 180,
      y: 330,
      type: "gate",
      desc: lang === 'hi' ? "न्यू ओपीडी, पार्किंग और प्रशासनिक ब्लॉक के लिए सीधा प्रवेश" : "Primary entry for New OPD, Multilevel Parking & Admin Block"
    },
    {
      id: "gate2",
      name: lang === 'hi' ? "गेट 2 (कालका रोड / सेक्टर 11)" : "Gate 2 (Sector 11 / Kalka Road)",
      x: 320,
      y: 50,
      type: "gate",
      desc: lang === 'hi' ? "एडवांस्ड आई सेंटर (AEC), कार्डिएक सेंटर (ACC) व APC के लिए सीधा गेट" : "Direct access to Advanced Eye (AEC), Cardiac (ACC), and Paediatric (APC) centres"
    },
    {
      id: "gate3",
      name: lang === 'hi' ? "गेट 3 (आपातकालीन / इमरजेंसी गेट)" : "Gate 3 (Emergency & Trauma Gate)",
      x: 40,
      y: 190,
      type: "gate",
      desc: lang === 'hi' ? "24x7 इमरजेंसी वार्ड, नेहरू हॉस्पिटल और ट्रॉमा सेंटर (ATC) हेतु" : "24x7 Ambulance & Vehicle Access for Emergency & Trauma"
    },
    {
      id: "new_opd",
      name: lang === 'hi' ? "न्यू ओपीडी ब्लॉक (New OPD)" : "New OPD Block",
      x: 230,
      y: 250,
      w: 80,
      h: 55,
      color: "#2563eb",
      landmark: "Near Gate 1",
      desc: lang === 'hi' ? "सामान्य ओपीडी पर्ची काउंटर, रूम 127 लैब व प्रमुख ओपीडी क्लिनिक" : "Central registration, Room 127 Central Lab & Specialty Clinics (Ground to 5th Floor)"
    },
    {
      id: "nehru_hospital",
      name: lang === 'hi' ? "नेहरू हॉस्पिटल व इमरजेंसी" : "Nehru Hospital & Emergency",
      x: 120,
      y: 180,
      w: 85,
      h: 55,
      color: "#9333ea",
      landmark: "Central complex near Gate 3",
      desc: lang === 'hi' ? "24/7 इमरजेंसी ट्रायज, इनडोर वार्ड, ब्लड बैंक (3rd Floor) व PPWF" : "24/7 Emergency Triage, Indoor Wards, 24x7 Blood Bank & Poor Patient Cell"
    },
    {
      id: "atc",
      name: lang === 'hi' ? "एडवांस्ड ट्रॉमा सेंटर (ATC)" : "Advanced Trauma Centre (ATC)",
      x: 80,
      y: 120,
      w: 70,
      h: 45,
      color: "#e11d48",
      landmark: "Near Emergency Gate 3",
      desc: lang === 'hi' ? "24x7 गंभीर दुर्घटना व पॉलीट्रॉमा इमरजेंसी" : "24/7 Acute Polytrauma & Severe Accident Resuscitation"
    },
    {
      id: "acc",
      name: lang === 'hi' ? "एडवांस्ड कार्डिएक सेंटर (ACC)" : "Advanced Cardiac Centre (ACC)",
      x: 240,
      y: 120,
      w: 75,
      h: 48,
      color: "#dc2626",
      landmark: "Towards Gate 2",
      desc: lang === 'hi' ? "हृदय रोग, हार्ट सर्जरी, ईसीजी व अलग कार्डियक ओपीडी" : "Heart Diseases, Cardiology OPD, Cath Lab & Heart Surgery"
    },
    {
      id: "aec",
      name: lang === 'hi' ? "एडवांस्ड आई सेंटर (AEC)" : "Advanced Eye Centre (AEC)",
      x: 320,
      y: 110,
      w: 70,
      h: 45,
      color: "#d97706",
      landmark: "Near Gate 2",
      desc: lang === 'hi' ? "आंखों के रोग, रेटिना, कॉर्निया व चश्मे की दुकान" : "Ophthalmology, Cataract, Retina, Cornea & AMRIT Opticals"
    },
    {
      id: "apc",
      name: lang === 'hi' ? "एडवांस्ड पीडियाट्रिक सेंटर (APC)" : "Advanced Paediatric Centre (APC)",
      x: 310,
      y: 170,
      w: 75,
      h: 45,
      color: "#059669",
      landmark: "Next to AEC",
      desc: lang === 'hi' ? "बच्चों का अस्पताल, टीकाकरण व शिशु आईसीयू" : "Child Hospital, Pediatric Emergency, Vaccinations & NICU"
    },
    {
      id: "sarais",
      name: lang === 'hi' ? "रेड क्रॉस व रोटरी सराय" : "Infosys & Rotary Sarais",
      x: 140,
      y: 280,
      w: 65,
      h: 40,
      color: "#475569",
      landmark: "Campus East / Sector 12",
      desc: lang === 'hi' ? "मरीजों के तीमारदारों के लिए कम खर्च में रुकने की सराय (₹50–₹100)" : "Subsidized night stays & dormitories for patient attendants"
    }
  ];

  const current = spots.find(s => s.id === selectedSpot) || spots[3];

  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all space-y-3 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-900">
              {lang === 'hi' ? 'पीजीआई परिसर का डिजिटल नक्शा (लेआउट)' : 'PGIMER Interactive Campus Layout Map'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {lang === 'hi' ? 'भवन या गेट पर टैप करके उसकी दिशा व जानकारी देखें' : 'Tap any building or gate to view location & entry details'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive 2D SVG Map */}
      <div className="relative w-full bg-slate-900 rounded-2xl overflow-hidden p-2 border border-slate-800 shadow-inner">
        <svg
          viewBox="0 0 420 370"
          className="w-full h-auto select-none"
          role="img"
          aria-label="PGIMER Chandigarh Campus Map"
        >
          {/* Roads */}
          <path d="M 180 370 L 180 230 L 240 180 L 320 0" stroke="#334155" strokeWidth="16" fill="none" />
          <path d="M 0 190 L 180 190 L 380 190" stroke="#334155" strokeWidth="14" fill="none" />
          <path d="M 180 230 L 140 280 L 140 370" stroke="#1e293b" strokeWidth="8" fill="none" strokeDasharray="4 4" />

          {/* Compass Rose */}
          <g transform="translate(380, 40)">
            <circle r="16" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="0" y="-4" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">N</text>
            <text x="0" y="10" fill="#64748b" fontSize="6" textAnchor="middle">Sector 11</text>
          </g>

          {/* Gate Markers */}
          {spots.filter(s => s.type === 'gate').map(g => {
            const isSelected = selectedSpot === g.id;
            return (
              <g
                key={g.id}
                onClick={() => setSelectedSpot(g.id)}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                <circle
                  cx={g.x}
                  cy={g.y}
                  r={isSelected ? "14" : "11"}
                  fill={isSelected ? "#eab308" : "#fbbf24"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={g.x}
                  y={g.y + 3}
                  textAnchor="middle"
                  fill="#78350f"
                  fontSize="8"
                  fontWeight="bold"
                >
                  {g.id === 'gate1' ? 'G1' : g.id === 'gate2' ? 'G2' : 'G3'}
                </text>
              </g>
            );
          })}

          {/* Buildings Rectangles */}
          {spots.filter(s => s.type !== 'gate').map(b => {
            const isSelected = selectedSpot === b.id;
            return (
              <g
                key={b.id}
                onClick={() => setSelectedSpot(b.id)}
                className="cursor-pointer group"
              >
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="8"
                  fill={b.color}
                  stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.2)"}
                  strokeWidth={isSelected ? "3" : "1"}
                  className="transition-all"
                  opacity={isSelected ? 1 : 0.85}
                />
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 - 2}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {b.id === 'new_opd' ? 'New OPD' :
                   b.id === 'nehru_hospital' ? 'Nehru Hospital' :
                   b.id === 'acc' ? 'ACC (Heart)' :
                   b.id === 'aec' ? 'AEC (Eye)' :
                   b.id === 'apc' ? 'APC (Child)' :
                   b.id === 'atc' ? 'ATC (Trauma)' : 'Sarais'}
                </text>
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 9}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="7"
                  className="pointer-events-none"
                >
                  {b.id === 'new_opd' ? 'Ground–5th Fl' :
                   b.id === 'nehru_hospital' ? '24/7 Emergency' :
                   b.id === 'sarais' ? 'Bed ₹50' : 'Specialty'}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-2 pt-1 border-t border-slate-800/80">
          <span>🟡 G1 / G2 / G3 = Main Campus Gates</span>
          <span>Tap building for directions</span>
        </div>
      </div>

      {/* Selected Spot Details Card */}
      {current && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-xs md:text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{current.name}</span>
            </h4>
            {current.landmark && (
              <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                {current.landmark}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-normal">
            {current.desc}
          </p>
        </div>
      )}
    </div>
  );
};
