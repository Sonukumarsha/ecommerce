
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3_Pju_hsOiZDcIdZ4f1nHpsT5j9BNgOY",
  authDomain: "myfirstapp-c6b86.firebaseapp.com",
  projectId: "myfirstapp-c6b86",
  storageBucket: "myfirstapp-c6b86.firebasestorage.app",
  messagingSenderId: "452942639103",
  appId: "1:452942639103:web:7cf67d2d57a486dbafc1ca"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth};