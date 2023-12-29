import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore'

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


//loading all collection
export const getDocsFromFirestore = async (collName) => {
    const coll = collection(db, collName);
    const snapshot = await getDocs(coll);
    let data = [];
    snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });
    return data;
};

//getting info from specific documents
export const getProductDetails = async (productID) => {
    const productDoc = doc(db, 'Product Details', productID);
    const productSnapshot = await getDoc(productDoc);
    
    return { ...productSnapshot.data(), id: productSnapshot.id };
};

export const getCart = async (cartID) => {
    const cartDoc = doc(db, 'Cart', cartID);
    const cartSnapshot = await getDoc(cartDoc);
    
    return { ...cartSnapshot.data(), id: cartSnapshot.id };
};

export const getChat = async (chatID) => {
    const chatDoc = doc(db, 'Chat', chatID);
    const chatSnapshot = await getDoc(chatDoc);

    return { ...chatSnapshot.data(), id: chatSnapshot.id };
};

export const getPurchaseHistory = async (purchaseID) => {
    const purchaseDoc = doc(db, 'Purchase History', purchaseID);
    const purchaseSnapshot = await getDoc(purchaseDoc);
  
    return { ...purchaseSnapshot.data(), id: purchaseSnapshot.id };
};

export const getUser = async (userID) => {
    const userDoc = doc(db, 'Users', userID);
    const userSnapshot = await getDoc(userDoc);

    return { ...userSnapshot.data(), id: userSnapshot.id };
};

//adding a new document to a collection
export const toAddtoCollection = async (collName, data, docName) => {
    const coll = collection(db, collName);
    const docRef = docName ? doc(coll, docName) : await addDoc(coll, data);
    //redirecting to the correct collection
    switch (collName) {
        case 'Cart':
          await newCart(docRef.id); break;
        case 'Chat':
          await newChat(docRef.id); break;
        case 'Product Details':
          await newProduct(docRef.id); break;
        case 'Purchase History':
          await newPurchase(docRef.id); break;
        case 'Users':
          await newUser(docRef.id); break;
      }
};

//creating the new object's fields and filling them in
const newCart = async (docID, data) => {
    const cartColl = collection(db, 'Cart');
    const docRef = doc(cartColl, docID);
    await setDoc(docRef, 
        { 
            'Order ID': data.orderID,
            'Product ID': data.productID,
            'Total': data.total,   
        }
    );
};

const newChat = async (docID, data) => {
    const chatColl = collection(db, 'Chat');
    const docRef = doc(chatColl, docID);
    await setDoc(docRef, 
        { 
            'Message': data.message,
            'Recipient ID': data.recipientID,
            'Sender ID': data.senderID,
            'Timestamp': data.timestamp,  
        }
    );
};

const newProduct = async (docID, data) => {
    const productColl = collection(db, 'Product Details');
    const docRef = doc(productColl, docID);
    await setDoc(docRef, 
        { 
            'Category': data.category,
            'Description': data.description,
            'Image': data.image,
            'Price': data.price,
            'Product Name': data.productName,
            'Seller ID': data.sellerID,
            'Stock': data.stock,
        }
    );
};

const newPurchase = async (docID, data) => {
    const purchaseColl = collection(db, 'Purchase History');
    const docRef = doc(purchaseColl, docID);
    await setDoc(docRef, 
        { 
            'Date of Purchase': data.dateOfPurchase,
            'Order ID': data.orderID,  
        }
    );
};

const newUser = async (docID, data) => {
    const usersColl = collection(db, 'Users');
    const docRef = doc(usersColl, docID);
    await setDoc(docRef, 
        { 
            'Account Type': data.accountType,
            'Email': data.email,
            'Password': data.password,
            'Profile Picture': data.profilePicture,
            'Username': data.username,
        }
    );
};

//deleting a document from any collection
export const toDelete = async (collName, id) => {
    const coll = collection(db, collName);
    const docRef = doc(coll, id);
    deleteDoc(docRef);
};