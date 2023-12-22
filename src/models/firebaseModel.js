import firebaseConfig from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, deleteDoc, getDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const Firebase = {
  async createUserProfile(userId, additionalData) {
    const userRef = doc(firestore, 'users', userId);
    await setDoc(userRef, additionalData, { merge: true });
  },

  async registerUser(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await this.createUserProfile(userCredential.user.uid, {
      email: userCredential.user.email,
      likedMovies: []
    });
    return userCredential;
  },

  async leaveSession(sessionId, userId) {
    const sessionRef = doc(firestore, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (!sessionDoc.exists()) {
      console.error('Session does not exist');
      return;
    }

    const sessionData = sessionDoc.data();
    sessionData.members = sessionData.members.filter(memberId => memberId !== userId);


    if (sessionData.members.length === 0) {
      // Delete the session if no members are left
      await deleteDoc(sessionRef);
      console.log('Session deleted as it has no more members');
    } else {
      // Update the session with the remaining members
      await setDoc(sessionRef, sessionData);
      console.log('Left the session:', sessionId);
    }
  },

  async signInWithEmailPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await this.createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email,
      });
      const likedMovies = await this.getLikedMovies(userCredential.user.uid);
      return {userCredential, likedMovies};
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      throw error;
    }
  },

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await this.createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email,
      });
      const likedMovies = await this.getLikedMovies(userCredential.user.uid);
      return {userCredential, likedMovies};
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  },

  async logoutUser () {
    try {
      await signOut(auth);
      console.log("User successfully logged out");
      // Additional logic after successful logout (e.g., redirect to login page)
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle errors here, such as displaying a notification to the user
    }
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  async addDocumentToCollection(collectionName, data) {
    const collectionRef = collection(firestore, collectionName);
    return addDoc(collectionRef, data);
  },

  async saveLikedMovie(userId, movieId) {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const likedMovies = userDoc.data().likedMovies || [];
      likedMovies.push(movieId);
      await setDoc(userRef, { likedMovies }, { merge: true });
    }
  },

  async getUserDetails(userId) {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null; // or throw an error
  },

  async removeLikedMovie(userId, movieId) {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const likedMovies = userDoc.data().likedMovies || [];
      const index = likedMovies.indexOf(movieId);
      if (index > -1) {
        likedMovies.splice(index, 1);
        await setDoc(userRef, { likedMovies }, { merge: true });
      }
    }
  },

  async getLikedMovies(userId) {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().likedMovies || [];
    }
    return [];
  },

  async createSession(userId) {

    const sessionRef = await addDoc(collection(firestore, 'sessions'), {
      members: [userId],
    });
    return sessionRef.id;
  },
  
  async joinSession(sessionId, userId) {
    const sessionRef = doc(firestore, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      members: arrayUnion(userId),

    });
  },

  async getEmailFromUserId(userId) {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().email;
    }
    return null;
  },

  async getSessionMembers(sessionId) {
    const sessionRef = doc(firestore, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    if (sessionDoc.exists()) {
      return sessionDoc.data().members;
    }
    return []; // Return an empty array if session doesn't exist or no members found
  },
  
  onSessionChanged(sessionId, callback) {
    const sessionRef = doc(firestore, 'sessions', sessionId);
    return onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    });
  }
};

export default Firebase;
