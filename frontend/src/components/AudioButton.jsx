import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AudioButton = ({ text, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { lang, t } = useLanguage();

  const handleSpeak = (e) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert("Audio speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice/locale
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'pa') {
      utterance.lang = 'pa-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.9; // Slightly slower for clear hospital comprehension

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleSpeak}
        aria-label={isPlaying ? t('stop_audio') : t('listen_btn')}
        aria-pressed={isPlaying}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 min-h-[36px] min-w-[36px] ${
          isPlaying 
            ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' 
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
        } ${className}`}
        title={isPlaying ? t('stop_audio') : t('listen_btn')}
      >
        {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-amber-700" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
        <span>{isPlaying ? t('stop_audio') : t('listen_btn')}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {isPlaying ? "Playing audio description" : "Audio description stopped"}
      </span>
    </div>
  );
};
