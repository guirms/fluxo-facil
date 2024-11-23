import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtauHnyAIhoDnD8wSpEdvVqTxYjSYIQaU",
  authDomain: "fluxofacil-8ce9f.firebaseapp.com",
  projectId: "fluxofacil-8ce9f",
  storageBucket: "fluxofacil-8ce9f.appspot.com",
  messagingSenderId: "104607617721",
  appId: "1:104607617721:web:ada9a7c5656d80dc888168"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
