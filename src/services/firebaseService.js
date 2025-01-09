import {addDoc, collection, doc, getDoc, getDocs, getFirestore} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getMapsFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, 'maps'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const saveMapToFirebase = async (map) => {
    return await addDoc(collection(db, 'maps'), map); // Return the document reference
};

export const loadMapFromFirebase = async (id) => {
    return await getDoc(doc(db, 'maps', id)); // Return the document
};
