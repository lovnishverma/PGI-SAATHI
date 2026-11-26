import { authoritativeDirectory, filterPublished } from '../data/authoritativeDirectory';
import { validateFeedbackPrivacy } from '../utils/privacyValidator';

// Lazy Firebase loader to keep initial bundle lean on slow networks
let cachedDb = null;
let cachedAuth = null;
let firebaseInitialized = false;

async function getFirebaseInstances() {
  if (firebaseInitialized) {
    return { db: cachedDb, auth: cachedAuth };
  }

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (apiKey && projectId) {
    try {
      const { initializeApp } = await import('firebase/app');
      const { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } = await import('firebase/firestore');
      const { getAuth } = await import('firebase/auth');

      const app = initializeApp({
        apiKey,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      });

      cachedDb = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      });
      cachedAuth = getAuth(app);
      firebaseInitialized = true;
      return { db: cachedDb, auth: cachedAuth };
    } catch (err) {
      console.warn("[Firebase] Could not initialize live Firestore, using verified snapshot:", err);
    }
  }

  firebaseInitialized = true;
  return { db: null, auth: null };
}

export const dataService = {
  /**
   * Fetches published departments with fallback to authoritative snapshot.
   */
  async getDepartments() {
    const { db } = await getFirebaseInstances();
    if (db) {
      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore');
        const q = query(collection(db, 'departments'), where('status', '==', 'published'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("[dataService] Firestore read failed, serving verified local snapshot:", err);
      }
    }
    return filterPublished(authoritativeDirectory.departments);
  },

  /**
   * Fetches published buildings with fallback to authoritative snapshot.
   */
  async getBuildings() {
    const { db } = await getFirebaseInstances();
    if (db) {
      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore');
        const q = query(collection(db, 'buildings'), where('status', '==', 'published'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("[dataService] Firestore read failed, serving verified local snapshot:", err);
      }
    }
    return filterPublished(authoritativeDirectory.buildings);
  },

  async getOPDSchedule() {
    const { db } = await getFirebaseInstances();
    if (db) {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const docSnap = await getDoc(doc(db, 'system_config', 'opd_schedule'));
        if (docSnap.exists() && docSnap.data().status === 'published') {
          return docSnap.data();
        }
      } catch (err) {
        console.warn("[dataService] Firestore schedule read failed:", err);
      }
    }
    return authoritativeDirectory.opd_schedule;
  },

  async getSampleProtocols() {
    return filterPublished(authoritativeDirectory.sample_collection);
  },

  async getSampleFourQuestions() {
    return authoritativeDirectory.sample_four_questions;
  },

  async getEmergencyGuidance() {
    return {
      warning_signs: authoritativeDirectory.emergency_warning_signs,
      instruction: authoritativeDirectory.emergency_instruction
    };
  },

  async getHelpDeskPhrases() {
    return authoritativeDirectory.help_desk_phrases;
  },

  async getGoldenRules() {
    return filterPublished(authoritativeDirectory.golden_rules);
  },

  async getCardMakingProcess() {
    return authoritativeDirectory.card_making_process;
  },

  async getChecklistItems() {
    return authoritativeDirectory.checklist_items;
  },

  async getImportantNumbers() {
    return authoritativeDirectory.important_numbers;
  },

  async getOfficialLinks() {
    return authoritativeDirectory.official_links;
  },

  async getLostAdvice() {
    return authoritativeDirectory.lost_patient_advice;
  },

  /**
   * Submits user correction or feedback with strict privacy validation
   * and honest outcome transparency.
   */
  async submitFeedback({ category, message }) {
    // 1. Strict Privacy & Identifier Sanitization
    const validation = validateFeedbackPrivacy(message);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const { db } = await getFirebaseInstances();

    // 2. Cloud Firestore Submission (when configured)
    if (db) {
      try {
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        const docRef = await addDoc(collection(db, 'feedback'), {
          category: category || 'general',
          message: message.trim(),
          created_at: serverTimestamp(),
          status: 'pending'
        });
        return {
          success: true,
          persisted: true,
          id: docRef.id,
          message: "Report submitted to central review queue. Thank you for helping keep information accurate!"
        };
      } catch (err) {
        console.error("[dataService] Failed to persist feedback to Firestore:", err);
      }
    }

    // 3. Offline / Unconfigured Fallback - Truthful Acknowledgment
    const localQueue = JSON.parse(localStorage.getItem('pgi_saathi_feedback_queue') || '[]');
    const localId = 'local_' + Date.now();
    localQueue.push({
      id: localId,
      category: category || 'general',
      message: message.trim(),
      created_at: new Date().toISOString(),
      persisted: false
    });
    localStorage.setItem('pgi_saathi_feedback_queue', JSON.stringify(localQueue));

    return {
      success: true,
      persisted: false,
      localQueued: true,
      id: localId,
      message: "Recorded in local device review log. (Cloud synchronization is currently offline; feedback has not been transmitted to hospital coordinators)."
    };
  }
};
