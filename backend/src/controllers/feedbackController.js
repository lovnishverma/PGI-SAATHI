const { db, admin, isFirebaseConnected } = require('../config/firebase');

// Multi-pattern regex for identifying sensitive identifiers
const PHONE_REGEX = /\b[6-9]\d{9}\b/;
const AADHAAR_REGEX = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
const CR_EXPLICIT_REGEX = /\b(?:cr\s*(?:no\.?|num(?:ber)?)?|c\.r\.?)\s*[:#-]?\s*\d{4,14}\b/i;
const LONG_DIGIT_REGEX = /\b\d{10,14}\b/;
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

const FORBIDDEN_KEYWORDS = [
  'cr number', 'cr no', 'cr card', 'aadhaar', 'aadhar',
  'prescription', 'patient name', 'report pdf', 'biopsy report'
];

exports.submitFeedback = async (req, res) => {
  try {
    const { category, message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ 
        success: false, 
        error: "Message must be at least 5 characters long." 
      });
    }

    if (message.length > 1200) {
      return res.status(400).json({ 
        success: false, 
        error: "Message exceeds maximum allowed length of 1200 characters." 
      });
    }

    // Privacy Protection: Multi-layered PII & PHI detection
    const lower = message.toLowerCase();
    for (const kw of FORBIDDEN_KEYWORDS) {
      if (lower.includes(kw)) {
        return res.status(400).json({
          success: false,
          error: "For patient confidentiality, please do not include CR numbers, patient identifiers, or medical reports."
        });
      }
    }

    if (PHONE_REGEX.test(message)) {
      return res.status(400).json({
        success: false,
        error: "Personal phone number detected. Please remove personal contact numbers."
      });
    }

    if (CR_EXPLICIT_REGEX.test(message) || LONG_DIGIT_REGEX.test(message)) {
      return res.status(400).json({
        success: false,
        error: "Potential patient ID or CR number detected. Please remove identification numbers."
      });
    }

    if (AADHAAR_REGEX.test(message)) {
      return res.status(400).json({
        success: false,
        error: "Possible 12-digit national ID detected. Please remove sensitive government IDs."
      });
    }

    if (EMAIL_REGEX.test(message)) {
      return res.status(400).json({
        success: false,
        error: "Email address detected. Please do not submit personal contact details."
      });
    }

    const feedbackPayload = {
      category: category || 'general',
      message: message.trim(),
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    if (isFirebaseConnected && db) {
      const docRef = await db.collection('feedback').add({
        ...feedbackPayload,
        created_at: admin.firestore.Timestamp.now()
      });
      return res.status(201).json({
        success: true,
        persisted: true,
        id: docRef.id,
        message: "Feedback submitted successfully to central review queue."
      });
    }

    // Standalone / Mock Mode: Truthful response that data is not persisted to cloud database
    return res.status(200).json({
      success: true,
      persisted: false,
      mock: true,
      id: "mock_" + Date.now(),
      message: "Feedback acknowledged in standalone server mode (Firestore database not connected).",
      data: feedbackPayload
    });

  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ success: false, error: "Internal server error while processing feedback." });
  }
};
