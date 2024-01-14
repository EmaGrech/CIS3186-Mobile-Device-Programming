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

/* 2nd version
apiKey: "AIzaSyB7B3H_e8SZOmfdeNrxC6bX9sgETO4NVTQ",
  authDomain: "pet-app-78d75.firebaseapp.com",
  projectId: "pet-app-78d75",
  storageBucket: "pet-app-78d75.appspot.com",
  messagingSenderId: "956055289557",
  appId: "1:956055289557:web:1cb777f5f856d5267e2c5c",

*/
/* apiKey: "AIzaSyCx4wJyVTxKfq4DAnyli_d6JzRuROUGEFs",
  authDomain: "mobile-programming-589ec.firebaseapp.com",
  projectId: "mobile-programming-589ec",
  storageBucket: "mobile-programming-589ec.appspot.com",
  messagingSenderId: "928758235272",
  appId: "1:928758235272:web:2a5adec721cfbac9161f3d",
  measurementId: "G-4YQ4BHMGJH" */

/* 
 apiKey: "AIzaSyB7B3H_e8SZOmfdeNrxC6bX9sgETO4NVTQ",
  authDomain: "pet-app-78d75.firebaseapp.com",
  projectId: "pet-app-78d75",
  storageBucket: "pet-app-78d75.appspot.com",
  messagingSenderId: "956055289557",
  appId: "1:956055289557:web:43553ff69fe64abc7e2c5c", */

/*  apiKey: "AIzaSyCsgAil9Eviz-Ra4yujHnk3adAIoBpNHtA",
  authDomain: "petpal-3f19d.firebaseapp.com",
  projectId: "petpal-3f19d",
  storageBucket: "petpal-3f19d.appspot.com",
  messagingSenderId: "41137584387",
  appId: "1:41137584387:web:03d810aa41373ce3aad136", */

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
