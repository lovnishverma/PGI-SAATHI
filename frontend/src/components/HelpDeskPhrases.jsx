import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Send, CheckCircle2, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { AudioButton } from './AudioButton';
import { dataService } from '../services/dataService';

export const HelpDeskPhrases = ({ phrases, numbers, officialLinks }) => {
  const { lang, t, highContrast } = useLanguage();
  const [feedbackCategory, setFeedbackCategory] = useState('incorrect_room');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;

    setLoading(true);
    setSubmitStatus(null);
    try {
      const res = await dataService.submitFeedback({
        category: feedbackCategory,
        message: feedbackMsg
      });
      setSubmitStatus({ 
        success: true, 
        text: res.message,
        persisted: res.persisted 
      });
      setFeedbackMsg('');
    } catch (err) {
      setSubmitStatus({ success: false, text: err.message || "Failed to submit." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-5 h-5 text-blue-300" />
          <h2 className="font-bold text-base md:text-lg">
            {lang === 'hi' ? 'हेल्प डेस्क पर क्या बोलना है? (गाइड)' : t('phrases_title')}
          </h2>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed">
          {lang === 'hi' 
            ? 'अस्पताल हेल्प डेस्क या काउंटर पर अगर रास्ता न समझ आए, तो यह वाक्य बोलें या कर्मचारियों को दिखाएं:'
            : t('phrases_desc')}
        </p>
      </div>

      {/* Phrases Cards */}
      <div className="space-y-3">
        {phrases && phrases.map((item, idx) => {
          const phraseText = lang === 'hi' ? item.hindi : lang === 'pa' ? item.punjabi : item.english;

          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all shadow-xs ${
                highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {item.situation}
                </span>
                <AudioButton text={phraseText} />
              </div>

              {/* Display text based on language */}
              <div className="space-y-1.5 mt-2">
                <p className="font-semibold text-slate-800 text-sm leading-relaxed">
                  "{phraseText}"
                </p>
                {lang !== 'en' && (
                  <p className="text-xs text-slate-500 italic">
                    "{item.english}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Reception Contact Numbers (Section 11) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900">
            {lang === 'hi' ? 'महत्वपूर्ण रिसेप्शन फोन नंबर (सत्यापित सूची)' : 'Important Reception Contact Numbers'}
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          Reconfirm on-site. Tap any number to call directly:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {numbers && numbers.map((n, idx) => (
            <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 text-xs">{n.service}</p>
                <p className="text-[11px] text-slate-500">{n.phone}</p>
              </div>
              <a
                href={`tel:${n.phone.split('/')[0].trim()}`}
                aria-label={`Call ${n.service} at ${n.phone}`}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold px-3 py-1.5 rounded-lg text-xs min-h-[38px] min-w-[48px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                Call
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Official Links (Section 12) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-900">
            {lang === 'hi' ? 'आधिकारिक पीजीआई लिंक्स — जाने से पहले चेक करें' : 'Official PGIMER Links & Resources'}
          </h3>
        </div>

        <div className="space-y-2">
          {officialLinks && officialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-blue-50/60 hover:border-blue-200 transition-all text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900">{link.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{link.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Anonymous Feedback Form */}
      <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-slate-700" />
          <h3 className="font-bold text-sm text-slate-900">
            {t('feedback_title')}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Found a changed room number or schedule? Help other patients by reporting it. Please do NOT include patient names or medical reports.
        </p>

        {submitStatus && (
          <div className={`p-3 rounded-xl mb-3 text-xs flex items-center gap-2 ${
            submitStatus.success ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{submitStatus.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <select
            value={feedbackCategory}
            onChange={(e) => setFeedbackCategory(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
          >
            <option value="incorrect_room">Changed Room / Counter Number</option>
            <option value="stale_timing">Incorrect OPD Timing</option>
            <option value="accessibility_issue">Accessibility / Language Problem</option>
            <option value="general">Other Suggestion</option>
          </select>

          <textarea
            value={feedbackMsg}
            onChange={(e) => setFeedbackMsg(e.target.value)}
            placeholder={t('feedback_placeholder')}
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />

          <button
            type="submit"
            disabled={loading}
            aria-label={loading ? "Submitting feedback" : t('send_feedback')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-98 min-h-[44px] focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{loading ? "Submitting..." : t('send_feedback')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
