
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxx",
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage()