// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsgAil9Eviz-Ra4yujHnk3adAIoBpNHtA",
  authDomain: "petpal-3f19d.firebaseapp.com",
  projectId: "petpal-3f19d",
  storageBucket: "petpal-3f19d.appspot.com",
  messagingSenderId: "41137584387",
  appId: "1:41137584387:web:03d810aa41373ce3aad136",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };

export async function getUserProfile(id) {
  const docRef = doc(db, "Users", id); //had to change this for a second
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}
