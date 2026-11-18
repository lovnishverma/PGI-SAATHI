const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');
const feedbackController = require('../controllers/feedbackController');

// Public Directory & Guidance Endpoints
router.get('/departments', directoryController.getDepartments);
router.get('/buildings', directoryController.getBuildings);
router.get('/schedule', directoryController.getSchedule);
router.get('/emergency', directoryController.getEmergencyGuidance);
router.get('/samples', directoryController.getSampleProtocols);

// Anonymous Feedback & Correction Submission
router.post('/feedback', feedbackController.submitFeedback);

module.exports = router;
