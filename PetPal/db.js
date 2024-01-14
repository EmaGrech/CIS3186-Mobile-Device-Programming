import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc, setDoc, serverTimestamp} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCsgAil9Eviz-Ra4yujHnk3adAIoBpNHtA",
    authDomain: "petpal-3f19d.firebaseapp.com",
    projectId: "petpal-3f19d",
    storageBucket: "petpal-3f19d.appspot.com",
    messagingSenderId: "41137584387",
    appId: "1:41137584387:web:03d810aa41373ce3aad136"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app);

export { auth };

//LOADING//
//loading an entire specified collection 
export const getCollFromFirestore = async (collName) => {
    try
    {
        const coll = collection(db, collName);
        const snapshot = await getDocs(coll);
        let data = [];

        snapshot.docs.forEach((doc) => {
            const docData = doc.data();
            data.push({ ...docData, id: doc.id });
        });
        return data;
    }
    catch (error)
    {
        console.error("Error in getCollFromFirestore:", error);
        throw error;
    }
};

//FETCHING SPECIFIC DOCUMENTS//
//getting info from specific documents
export const getDocument = async (collName, docID) => {
    try{
        const docRef = doc(db, collName, docID);
        const docSnapshot = await getDoc(docRef);
        
        const docData = docSnapshot.data();
        return { ...docData, id: docSnapshot.id };
    } catch (error) {
        console.error("Error in getDocument:", error);
        throw error;
    }
};

export const getProductDetails = async (productID) => {
    return getDocument('Product_Details', productID);
  };
  
  export const getCart = async (cartID) => {
    return getDocument('Cart', cartID);
  };
  
  export const getChat = async (chatID) => {
    return getDocument('Chat', chatID);
  };
  
  export const getPurchaseHistory = async (purchaseID) => {
    return getDocument('Purchase_History', purchaseID);
  };
  
  export const getUser = async (userID) => {
    return getDocument('Users', userID);
  };  


//CREATING NEW DATABASE ENTRIES//
//collecting information according to collection
export const toAddtoCollection = async (collName, data, docID) => {
    const coll = collection(db, collName);
    const docRef = await addDoc(coll, data);

    if(docID)
    {
        const docRef = doc(coll, docID);
        await setDoc(docRef, data);
    }
    else
    {
        const docRef = await addDoc(coll, data);
    }

    const fields = collFields[collName];
    setNewDocument(docRef, data, fields);
};

//setting fields
const collFields = {
    'Cart': ['Order_ID', 'Product_ID', 'Total'],
    'Chat': ['Message', 'Recipient_ID', 'Sender_ID', 'Timestamp'],
    'Product_Details': ['Category', 'Description', 'Image', 'Price', 'Product_Name', 'Seller_ID', 'Stock'],
    'Purchase_History': ['Date_of_Purchase', 'Order_ID'],
    'Users': ['Account_Type', 'Email', 'Password', 'Profile_Picture', 'Username'],
};

//adding a new document to a collection
const setNewDocument = async (docRef, data, fields) => {
    const updateData = {};
    fields.forEach(field => updateData[field] = data[field]);
    await setDoc(docRef, updateData);
};

//DELETION//
//deleting a document from any collection
export const toDelete = async (collName, docID) => {
    const coll = collection(db, collName);
    const docRef = doc(coll, docID);
    deleteDoc(docRef);
};

//UPDATING//
//allows for documents to be edited
export const toUpdateDocument = async (collName, docID, updatedData) => {
    const coll = collection(db, collName);
    const docRef = doc(coll, docID);

    await updateDoc(docRef, updatedData);
};

//COLLECTION SPECIFIC FUNCTIONS//
//move cart to purchase history
export const moveCartToPurchaseHistory = async (userID) => {
    const cartColl = collection(db, 'Cart');
    const userCartDocRef = doc(cartColl, userID);
  
    const cartSnapshot = await getDoc(userCartDocRef);
    const cartData = cartSnapshot.data();
  
    if (cartData) {
      const purchaseHistoryColl = collection(db, 'Purchase_History');
      const orderID = cartData.Order_ID; 
  
      const orderDocRef = doc(purchaseHistoryColl, orderID);
      const purchaseTimestamp = {
        Date_of_Purchase: serverTimestamp(),
        Items: {}, 
      };
  
      for (const productID of cartData.Product_ID) {
        const productDetails = await getDocument(Product_Details, productID);
  
        if (productDetails) {
          purchaseTimestamp.Items[productID] = {
            ...productDetails,
            Date_of_Purchase: serverTimestamp(),
          };

          await updateDoc(userCartDocRef, {
            Product_ID: [...cartData.Product_ID.filter(id => id !== productID)],
          });
        }
      }
  
      await setDoc(orderDocRef, purchaseTimestamp);
    }
};