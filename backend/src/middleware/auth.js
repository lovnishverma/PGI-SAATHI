const { auth, db, isFirebaseConnected } = require('../config/firebase');

/**
 * Admin authentication middleware.
 * - In Firebase mode: verifies Firebase ID token and checks custom claim `admin === true`
 *   or membership in Firestore `admins/{uid}` (matching firestore.rules).
 * - In Standalone/Mock mode (non-production): accepts Bearer token matching ADMIN_API_KEY
 *   (or default `dev-admin-key` when NODE_ENV !== 'production').
 */
async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Provide a Bearer token.'
      });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Empty authentication token.'
      });
    }

    if (isFirebaseConnected && auth) {
      const decoded = await auth.verifyIdToken(token);
      let isAdmin = decoded.admin === true;

      if (!isAdmin && db) {
        const adminDoc = await db.collection('admins').doc(decoded.uid).get();
        isAdmin = adminDoc.exists;
      }

      if (!isAdmin) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden: Administrator privileges required.'
        });
      }

      req.admin = {
        uid: decoded.uid,
        email: decoded.email || null,
        mode: 'firebase'
      };
      return next();
    }

    // Standalone/Mock mode fallback
    const configuredKey = process.env.ADMIN_API_KEY || (process.env.NODE_ENV !== 'production' ? 'dev-admin-key' : null);
    if (!configuredKey) {
      return res.status(503).json({
        success: false,
        error: 'Admin authentication is not configured in this environment.'
      });
    }

    if (token !== configuredKey) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Invalid admin token.'
      });
    }

    req.admin = {
      uid: 'mock-admin',
      email: 'admin@pgisaathi.local',
      mode: 'mock'
    };
    return next();
  } catch (error) {
    console.error('Admin auth error:', error.message);
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired authentication token.'
    });
  }
}

module.exports = { requireAdmin };
