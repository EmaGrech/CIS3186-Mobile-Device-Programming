import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, getDoc, addDoc, deleteDoc, doc} from 'firebase/firestore'

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
            const typeMappings = setFieldType[collName];

            const converted = Object.entries(docData).reduce((result, [key, value]) => {
                const expected = typeMappings[key]; 
                result[key] = typeConversion(value, expected);
            return result;
            }, {});

            data.push({ ...converted, id: doc.id });
        });
        return data;
    }
    catch (error)
    {
        console.error("Error in getCollFromFirestore:", error);
        throw error;
    }
};

//CONVERTING FIELD TYPES// 
//defining field types
const setFieldType = {
    'Users': 
    {
        Username: 'string',
        Password: 'string',
        Profile_Picture: 'string',
        Email: 'string',
        Description: 'string',
        Account_Type: 'string',
        Actvities: 'string[]',
    },
    'Purchase_History':
    {
        Date_of_Purchase: 'string',
        Order_ID: 'string',
    },
    'Product_Details': 
    {
        Product_Name: 'string',
        Category: 'string',
        Description: 'string',
        Image: 'string',
        Price: 'float',
        Seller_ID: 'string',
        Stock: 'string',
    },
    'Cart':
    {
        Order_ID: 'string',
        Product_ID: 'string',
        Total: 'string',
    },
    'Chat':
    {
        Message: 'string',
        Recipient_ID: 'string',
        Sender_ID: 'string',
        Timestamp: 'string',
    },
}

//convert fetched values to appropriate types
const typeConversion = (data, expected) => {
    switch(expected)
    {
        case 'float':
            return parseFloat(data) || 0.0;
        case 'string':
            return String(data);
        case 'string[]':
            return Array.isArray(data) ? data.map(String) : [];
        default:
            console.warn('Error in typeConversion method');
    }
}


//FETCHING SPECIFIC DOCUMENTS//
//getting info from specific documents
export const getProductDetails = async (productID) => {
    const productDoc = doc(db, 'Product_Details', productID);
    const productSnapshot = await getDoc(productDoc);
    
    const docData = productSnapshot.data();
    const typeMappings = setFieldType['Product_Details'];

    const converted = Object.entries(docData).reduce((result, [key, value]) => {
        const expected = typeMappings[key]; 
        result[key] = typeConversion(value, expected);
    return result;
    }, {});

    return { ...converted, id: productSnapshot.id };
};

/*
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
    const purchaseDoc = doc(db, 'Purchase_History', purchaseID);
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
        case 'Product_Details':
          await newProduct(docRef.id); break;
        case 'Purchase_History':
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
            'Order_ID': data.orderID,
            'Produc_ ID': data.productID,
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
            'Recipient_ID': data.recipientID,
            'Sender_ID': data.senderID,
            'Timestamp': data.timestamp,  
        }
    );
};

const newProduct = async (docID, data) => {
    const productColl = collection(db, 'Product_Details');
    const docRef = doc(productColl, docID);
    await setDoc(docRef, 
        { 
            'Category': data.category,
            'Description': data.description,
            'Image': data.image,
            'Price': data.price,
            'Product_Name': data.productName,
            'Seller_ID': data.sellerID,
            'Stock': data.stock,
        }
    );
};

const newPurchase = async (docID, data) => {
    const purchaseColl = collection(db, 'Purchase_History');
    const docRef = doc(purchaseColl, docID);
    await setDoc(docRef, 
        { 
            'Date_of_Purchase': data.dateOfPurchase,
            'Order_ID': data.orderID,  
        }
    );
};

const newUser = async (docID, data) => {
    const usersColl = collection(db, 'Users');
    const docRef = doc(usersColl, docID);
    await setDoc(docRef, 
        { 
            'Account_Type': data.accountType,
            'Email': data.email,
            'Password': data.password,
            'Profile_Picture': data.profilePicture,
            'Username': data.username,
        }
    );
};

//deleting a document from any collection
export const toDelete = async (collName, id) => {
    const coll = collection(db, collName);
    const docRef = doc(coll, id);
    deleteDoc(docRef);
};*/