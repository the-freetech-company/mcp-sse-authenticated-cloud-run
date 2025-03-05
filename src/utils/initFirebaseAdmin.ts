import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";
import { findRepoRoot } from "./findRepoRoot";

/**
 * Initializes Firebase Admin SDK for use with Express
 *
 * This function handles:
 * 1. Loading service account credentials
 * 2. Initializing Firebase with appropriate project settings
 * 3. Configuring Firestore settings
 *
 * @returns The initialized Firebase admin app instance
 */
export const initFirebaseAdmin = (): admin.app.App => {
  // Check if Firebase is already initialized
  if (admin.apps.length > 0) {
    console.log("Firebase already initialized, returning existing app");
    return admin.apps[0]!;
  }

  console.log("Initializing Firebase Admin SDK...");

  try {
    // Initialize with service account if available
    let app: admin.app.App;

    // const repoRoot = findRepoRoot();
    const repoRoot = findRepoRoot();
    console.log(repoRoot);
    console.log(`Repository root found at: ${repoRoot}`);

    // Get service account path from env or use default
    const serviceAccountPath = path.resolve(repoRoot, "service.json");

    console.log(`Service account path: ${serviceAccountPath}`);
    // Check if service account file exists
    if (
      fs.existsSync(serviceAccountPath)
      // (nodeEnv === "development" || nodeEnv === "test")
    ) {
      console.log(`Using service account from: ${serviceAccountPath}`);
      const serviceAccount = require(serviceAccountPath);

      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Fall back to application default credentials
      console.log(
        "Service account file not found, using application default credentials"
      );
      app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    return app;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);

    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      console.error(error.stack);
    }
    process.exit(69);
  }
};
