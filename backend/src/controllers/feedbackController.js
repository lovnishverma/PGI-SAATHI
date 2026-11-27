const dataStore = require('../utils/dataStore');
const { validateNoPII } = require('../utils/piiGuard');

const ALLOWED_CATEGORIES = ['incorrect_room', 'stale_timing', 'accessibility_issue', 'general'];

exports.submitFeedback = async (req, res) => {
  try {
    const { category, message, target_id, target_type } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim().length <= 5) {
      return res.status(400).json({
        success: false,
        error: 'Message must be more than 5 characters long.'
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 1200) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds maximum allowed length of 1200 characters.'
      });
    }

    const normalizedCategory = ALLOWED_CATEGORIES.includes(category) ? category : 'general';

    const piiCheck = validateNoPII(req.body, trimmedMessage);
    if (!piiCheck.valid) {
      return res.status(400).json({
        success: false,
        error: piiCheck.reason
      });
    }

    const feedbackPayload = {
      category: normalizedCategory,
      message: trimmedMessage,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    if (typeof target_id === 'string' && target_id.trim()) {
      feedbackPayload.target_id = target_id.trim().slice(0, 80);
    }
    if (target_type === 'department' || target_type === 'building') {
      feedbackPayload.target_type = target_type;
    }

    if (dataStore.isFirebaseConnected && dataStore.db) {
      const docRef = await dataStore.db.collection('feedback').add({
        ...feedbackPayload,
        created_at: dataStore.admin.firestore.Timestamp.now()
      });
      return res.status(201).json({
        success: true,
        id: docRef.id,
        message: 'Feedback submitted successfully to Firestore.'
      });
    }

    const mockEntry = {
      id: 'mock_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      ...feedbackPayload
    };
    dataStore.mockStore.feedback.unshift(mockEntry);

    return res.status(201).json({
      success: true,
      id: mockEntry.id,
      message: 'Feedback recorded in mock server mode.',
      data: mockEntry
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while saving feedback.' });
  }
};
