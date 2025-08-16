import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
// Não exporta o Firestore!

const firebaseConfig = {
  apiKey: "AIzaSyCVvQX3aSUr72fzQ6tV7eNXYykzh_UNdq0",
  authDomain: "inovah-sm-ia.firebaseapp.com",
  projectId: "inovah-sm-ia",
  storageBucket: "inovah-sm-ia.appspot.com",
  messagingSenderId: "847110013120",
  appId: "1:847110013120:web:c734c94a45c438524bad25"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
