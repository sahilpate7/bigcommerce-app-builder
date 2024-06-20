import firebase from 'firebase/app';
import 'firebase/firestore';
import { SessionProps, UserData } from '../../types';

// Firebase config and initialization
// Prod applications might use config file

// Destructure the Firebase API key, domain, and project ID from the environment variables
const { FIRE_API_KEY, FIRE_DOMAIN, FIRE_PROJECT_ID } = process.env;

// Set up the Firebase config
const firebaseConfig = {
    apiKey: FIRE_API_KEY,
    authDomain: FIRE_DOMAIN,
    projectId: FIRE_PROJECT_ID,
};

// Set up conditions to determine app's initialization
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

// Set up the database
const db = firebase.firestore();

// Add Firestore database management functions

// setUser will capture information about the user
export async function setUser({ context, user }: SessionProps) {
    if (!user) return null;

    const { email, id, username } = user;
    const storeHash = context?.split('/')[1] || '';
    const ref = db.collection('users').doc(String(id));
    const data: UserData = { email, storeHash };

    if (username) {
        data.username = username;
    }

    await ref.set(data, { merge: true });
}

// setStore will capture the store's access token, context, and scope.
export async function setStore(session: SessionProps) {
    const { access_token: accessToken, context, scope } = session;
    // Only set on app install or update
    if (!accessToken || !scope) return null;

    const storeHash = context?.split('/')[1] || '';
    const ref = db.collection('store').doc(storeHash);
    const data = { accessToken, scope };

    await ref.set(data);
}

// Add a function to retrieve the store hash from the database
export async function getStoreToken(storeHash: string) {
    if (!storeHash) return null;
    const storeDoc = await db.collection('store').doc(storeHash).get();

    return storeDoc.exists ? storeDoc.data()?.accessToken : null;
}

// Delete the store when the user uninstalls the app
export async function deleteStore({ store_hash: storeHash }: SessionProps) {
    const ref = db.collection('store').doc(storeHash);

    await ref.delete();
}