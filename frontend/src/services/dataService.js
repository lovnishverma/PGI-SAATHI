import { db, isFirebaseConfigured } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { localSeedData } from '../data/localSeedData';

export const dataService = {
  async getDepartments() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'departments'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Falling back to local departments due to Firestore error:", err);
      }
    }
    return localSeedData.departments;
  },

  async getBuildings() {
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'buildings'));
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Falling back to local buildings due to Firestore error:", err);
      }
    }
    return localSeedData.buildings;
  },

  async getOPDSchedule() {
    return localSeedData.opd_schedule;
  },

  async getSampleProtocols() {
    return localSeedData.sample_collection;
  },

  async getEmergencyGuidance() {
    return {
      warning_signs: localSeedData.emergency_warning_signs,
      instruction: localSeedData.emergency_instruction
    };
  },

  async getHelpDeskPhrases() {
    return localSeedData.help_desk_phrases;
  },

  async submitFeedback({ category, message }) {
    if (!message || message.trim().length < 5) {
      throw new Error("Message must be at least 5 characters.");
    }
    
    // Privacy check: disallow common PII words
    const lower = message.toLowerCase();
    if (lower.includes('cr number') || lower.includes('aadhaar') || lower.includes('cr no')) {
      throw new Error("Please do not include CR numbers or patient identification for privacy.");
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'feedback'), {
          category: category || 'general',
          message: message.trim(),
          created_at: serverTimestamp(),
          status: 'pending'
        });
        return { success: true, id: docRef.id };
      } catch (err) {
        console.error("Failed to submit feedback to Firestore:", err);
      }
    }

    // In local mock mode, save feedback in localStorage
    const existing = JSON.parse(localStorage.getItem('pgi_saathi_feedback') || '[]');
    const localId = 'mock_' + Date.now();
    existing.push({
      id: localId,
      category,
      message,
      created_at: new Date().toISOString()
    });
    localStorage.setItem('pgi_saathi_feedback', JSON.stringify(existing));
    return { success: true, id: localId, mock: true };
  }
};
