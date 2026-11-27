const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');
const feedbackController = require('../controllers/feedbackController');
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');
const { createRateLimiter } = require('../middleware/rateLimit');

const feedbackLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.FEEDBACK_RATE_LIMIT_MAX || 15)
});

// Public Directory & Guidance Endpoints
router.get('/departments', directoryController.getDepartments);
router.get('/departments/:id', directoryController.getDepartmentById);
router.get('/buildings', directoryController.getBuildings);
router.get('/buildings/:id', directoryController.getBuildingById);
router.get('/finder', directoryController.findDepartment);
router.get('/schedule', directoryController.getSchedule);
router.get('/emergency', directoryController.getEmergencyGuidance);
router.get('/samples', directoryController.getSampleProtocols);
router.get('/golden-rules', directoryController.getGoldenRules);

// Anonymous Feedback & Correction Submission (rate-limited, zero-PII)
router.post('/feedback', feedbackLimiter, feedbackController.submitFeedback);

// Protected Admin Portal & Content Governance Endpoints
router.get('/admin/departments', requireAdmin, adminController.getDepartments);
router.patch('/admin/departments/:id', requireAdmin, adminController.updateDepartment);
router.post('/admin/departments/:id/verify', requireAdmin, adminController.verifyDepartment);

router.get('/admin/buildings', requireAdmin, adminController.getBuildings);
router.patch('/admin/buildings/:id', requireAdmin, adminController.updateBuilding);

router.get('/admin/feedback', requireAdmin, adminController.getFeedback);
router.patch('/admin/feedback/:id', requireAdmin, adminController.updateFeedbackStatus);

router.get('/admin/audit-logs', requireAdmin, adminController.getAuditLogs);

module.exports = router;
