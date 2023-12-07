import firebaseConfig from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, where, getDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

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

  async leaveSession(sessionId, userId) {
    const sessionRef = doc(this.firestore, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (!sessionDoc.exists()) {
      console.error('Session does not exist');
      return;
    }

    const sessionData = sessionDoc.data();
    sessionData.members = sessionData.members.filter(memberId => memberId !== userId);
    sessionData.likes[userId] = []; // Optionally handle likes related to the user

    if (sessionData.members.length === 0) {
      // Delete the session if no members are left
      await deleteDoc(sessionRef);
      console.log('Session deleted as it has no more members');
    } else {
      // Update the session with the remaining members
      await setDoc(sessionRef, sessionData);
      console.log('Left the session:', sessionId);
    }
  }
  
  async signInWithEmailPassword(email, password) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const likedMovies = await this.getLikedMovies(userCredential.user.uid);
    await this.createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email,
        likedMovies: []
      })
    return {credentials: userCredential, likedMovies: likedMovies};
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);
  
    await this.createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email,
        likedMovies: []
      })
    const likedMovies = await this.getLikedMovies(userCredential.user.uid);
    return {credentials: userCredential, likedMovies: likedMovies};
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

  async getEmailFromUserId(userId) {
    const userRef = doc(this.firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().email;
    }
    return null;
  }

  async getSessionMembers(sessionId) {
    const sessionRef = doc(this.firestore, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      return sessionData.members; // Or the appropriate logic to return members
    }
    return []; // Return an empty array if session doesn't exist or no members found
  }
  onSessionChanged(sessionId, callback) {
    const sessionRef = doc(this.firestore, 'sessions', sessionId);
    return onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    });
  }
}


export default Firebase;