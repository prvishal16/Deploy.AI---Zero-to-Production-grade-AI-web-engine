import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEdv2_s_SALnDDKl6cNqrmWHz0FgsyzNs",
  authDomain: "genweb-10a68.firebaseapp.com",
  projectId: "genweb-10a68",
  storageBucket: "genweb-10a68.firebasestorage.app",
  messagingSenderId: "378454643413",
  appId: "1:378454643413:web:ed2711f2abd09e3f24c85c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//now i am going to using this in my page
