const { db, admin, isFirebaseConnected } = require('../config/firebase');

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

    // Privacy Protection: Prohibit sensitive medical or patient identifiers
    const lower = message.toLowerCase();
    const forbiddenKeywords = ['cr number', 'cr no', 'aadhaar', 'prescription', 'patient name', 'report pdf'];
    for (const kw of forbiddenKeywords) {
      if (lower.includes(kw)) {
        return res.status(400).json({
          success: false,
          error: "For patient confidentiality, please do not include CR numbers, patient identifiers, or medical reports."
        });
      }
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
        id: docRef.id,
        message: "Feedback submitted successfully to Firestore."
      });
    }

    // Standalone fallback response
    return res.status(201).json({
      success: true,
      id: "mock_" + Date.now(),
      message: "Feedback recorded in mock server mode.",
      data: feedbackPayload
    });

  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ success: false, error: "Internal server error while saving feedback." });
  }
};
