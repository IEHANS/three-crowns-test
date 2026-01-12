import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "test-key",
  authDomain: "three-crowns-test.firebaseapp.com",
  databaseURL: "https://three-crowns-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "three-crowns-test",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
