import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDw8-_TrGD4xXoMJRSlgvmlp1h4-8Mtxro',
  authDomain: 'music-90051.firebaseapp.com',
  projectId: 'music-90051',
  storageBucket: 'music-90051.appspot.com',
  messagingSenderId: '151851197505',
  appId: '1:151851197505:web:3286a1cef83d8fc86352c0'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((err) => {
  console.log(`firebase error persistence with code ${err.code}`)
})
const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, songsCollection, storage, commentsCollection }
