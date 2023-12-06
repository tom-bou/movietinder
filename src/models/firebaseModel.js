import firebaseConfig from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, query, where, getDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
    this.database = getDatabase(app);
  }

  async createUserProfile(userId, additionalData) {
    const userRef = doc(this.firestore, 'users', userId);
    await setDoc(userRef, additionalData, { merge: true });
  }
  

  async registerUser(email, password) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email,
        likedMovies: []
      })
    return userCredential;
  }
  
  async signInWithEmailPassword(email, password) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);
  
    await this.createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email,
        likedMovies: []
      })

    return userCredential;
  }
  

  getCurrentUser() {
    return this.auth.currentUser;
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

  async getUserDetails(userId) {
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null; // or throw an error
  }


  async removeLikedMovie(userId, movieId) {
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const likedMovies = userDoc.data().likedMovies || [];
      const index = likedMovies.indexOf(movieId);
      if (index > -1) {
        likedMovies.splice(index, 1);
        await setDoc(userRef, { likedMovies }, { merge: true });
      }
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
async createSession(userIds) {
    const sessionRef = await addDoc(collection(this.firestore, 'sessions'), {
      members: userIds,
      likes: userIds.reduce((acc, userId) => ({ ...acc, [userId]: [] }), {})
    });
    return sessionRef.id;
  }
  
  async joinSession(sessionId, userId) {
    const sessionRef = doc(this.firestore, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      members: arrayUnion(userId),
      [`likes.${userId}`]: []
    });
  }
  
}


export default Firebase;