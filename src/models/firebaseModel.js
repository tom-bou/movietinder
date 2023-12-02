import firebaseConfig from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, query, where, getDoc } from 'firebase/firestore';

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
    this.database = getDatabase(app);
  }

  async registerUser(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signInWithEmailPassword(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async addDocumentToCollection(collectionName, data) {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data);
  }

  async saveLikedMovie(userId, movieId) {
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const likedMovies = userDoc.data().likedMovies || [];
      likedMovies.push(movieId);
      await setDoc(userRef, { likedMovies }, { merge: true });
    }
  }

  async getLikedMovies(userId) {
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().likedMovies || [];
    }
    return [];
  }
}

export default Firebase;