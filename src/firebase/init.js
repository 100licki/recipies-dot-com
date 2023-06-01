import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC8ENN3JvxkpRWs30bSftDx_M1jratbW7M",
  authDomain: "recipies-a606f.firebaseapp.com",
  databaseURL: "https://recipies-a606f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipies-a606f",
  storageBucket: "recipies-a606f.appspot.com",
  messagingSenderId: "173225760337",
  appId: "1:173225760337:web:fba86fde8c27c303ac4a70"
}

initializeApp(firebaseConfig)

const db = getFirestore()
export default db