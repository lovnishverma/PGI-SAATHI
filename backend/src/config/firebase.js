const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let db = null;
let auth = null;
let isFirebaseConnected = false;

// Check if service account credentials or environment variable exists
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, '../../serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    auth = admin.auth();
    isFirebaseConnected = true;
    console.log("⚡ Firebase Admin initialized with service account.");
  } catch (err) {
    console.warn("⚠️ Failed to initialize Firebase Admin with service account:", err.message);
  }
} else if (process.env.FIREBASE_PROJECT_ID) {
  try {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID
    });
    db = admin.firestore();
    auth = admin.auth();
    isFirebaseConnected = true;
    console.log("⚡ Firebase Admin initialized with project ID.");
  } catch (err) {
    console.warn("⚠️ Firebase Admin default init failed:", err.message);
  }
} else {
  console.info("ℹ️ Backend running in Standalone/Mock Mode (Serving verified local seed data).");
}

module.exports = {
  admin,
  db,
  auth,
  isFirebaseConnected
};
