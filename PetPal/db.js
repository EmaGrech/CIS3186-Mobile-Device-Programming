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
export const setFieldType = {
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
export const getDocument = async (collName, docID) => {
    const docRef = doc(db, collName, docID);
    const docSnapshot = await getDoc(docRef);
    
    const docData = docSnapshot.data();
    const typeMappings = setFieldType[collName];

    const converted = Object.entries(docData).reduce((result, [key, value]) => {
        const expected = typeMappings[key]; 
        result[key] = typeConversion(value, expected);
    return result;
    }, {});

    return { ...converted, id: docSnapshot.id };
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
export const toAddtoCollection = async (collName, data) => {
    const coll = collection(db, collName);
    const docRef = await addDoc(coll, data);
    
    //redirecting to the correct collection
    const collFields = {
        'Cart': ['Order_ID', 'Product_ID', 'Total'],
        'Chat': ['Message', 'Recipient_ID', 'Sender_ID', 'Timestamp'],
        'Product_Details': ['Category', 'Description', 'Image', 'Price', 'Product_Name', 'Seller_ID', 'Stock'],
        'Purchase_History': ['Date_of_Purchase', 'Order_ID'],
        'Users': ['Account_Type', 'Email', 'Password', 'Profile_Picture', 'Username'],
    };

    const fields = collFields[collName];
    setNewDocument(docRef, data, fields);
};

//adding a new document to a collection
const setNewDocument = async (docRef, data, fields) => {
    const updateData = {};
    fields.forEach(field => updateData[field] = data[field]);
    await setDoc(docRef, updateData);
};

/*
//DELETION//
//deleting a document from any collection
export const toDelete = async (collName, id) => {
    const coll = collection(db, collName);
    const docRef = doc(coll, id);
    deleteDoc(docRef);
};*/