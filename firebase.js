
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCsgAil9Eviz-Ra4yujHnk3adAIoBpNHtA",
  authDomain: "petpal-3f19d.firebaseapp.com",
  projectId: "petpal-3f19d",
  storageBucket: "petpal-3f19d.appspot.com",
  messagingSenderId: "41137584387",
  appId: "1:41137584387:web:03d810aa41373ce3aad136"
  
  
};

/* 
  apiKey: "AIzaSyCsgAil9Eviz-Ra4yujHnk3adAIoBpNHtA",
  authDomain: "petpal-3f19d.firebaseapp.com",
  projectId: "petpal-3f19d",
  storageBucket: "petpal-3f19d.appspot.com",
  messagingSenderId: "41137584387",
  appId: "1:41137584387:web:03d810aa41373ce3aad136" */

/*
  apiKey: "AIzaSyB7B3H_e8SZOmfdeNrxC6bX9sgETO4NVTQ",
  authDomain: "pet-app-78d75.firebaseapp.com",
  projectId: "pet-app-78d75",
  storageBucket: "pet-app-78d75.appspot.com",
  messagingSenderId: "956055289557",
  appId: "1:956055289557:web:43553ff69fe64abc7e2c5c" */



/* apiKey: "AIzaSyCx4wJyVTxKfq4DAnyli_d6JzRuROUGEFs",
  authDomain: "mobile-programming-589ec.firebaseapp.com",
  projectId: "mobile-programming-589ec",
  storageBucket: "mobile-programming-589ec.appspot.com",
  messagingSenderId: "928758235272",
  appId: "1:928758235272:web:2a5adec721cfbac9161f3d",
  measurementId: "G-4YQ4BHMGJH" */


/*apiKey: "AIzaSyC6Irh0Xs_Jrt_6IOUM2mz6vxZm3q52HoY",
  authDomain: "laundry-application-7f4c7.firebaseapp.com",
  projectId: "laundry-application-7f4c7",
  storageBucket: "laundry-application-7f4c7.appspot.com",
  messagingSenderId: "571088013444",
  appId: "1:571088013444:web:6a5e8ded1f44846994dad1" */



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};