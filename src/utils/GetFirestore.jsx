import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

function GetFirestore() {
  const firebaseConfig = {
    apiKey: "AIzaSyAd_syOGkvdAuFw_0FSpetUeLD3zDCOdJ0",
    authDomain: "tournament-header.firebaseapp.com",
    projectId: "tournament-header",
    storageBucket: "tournament-header.appspot.com",
    messagingSenderId: "756396079293",
    appId: "1:756396079293:web:91849ba16b725213809fd4"
  }
  
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  return db
}

export default GetFirestore