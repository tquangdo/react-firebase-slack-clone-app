import firebase from 'firebase/app'
import 'firebase/firestore'
//TH realtime DB: import "firebase/database"
import 'firebase/auth'

const fbConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
}

const fbApp = firebase.initializeApp(fbConfig)
const db = fbApp.firestore().collection("rooms")
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const fbTimeStamp = firebase.firestore.FieldValue.serverTimestamp()

export { auth, provider, fbTimeStamp }
export default db