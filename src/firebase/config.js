import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCnE7c5SlFmXG7SNLnDSwGdu6FpwVIiNBY',
  authDomain: 'music-at-tips-15e40.firebaseapp.com',
  projectId: 'music-at-tips-15e40',
  storageBucket: 'music-at-tips-15e40.appspot.com',
  messagingSenderId: '111374638557',
  appId: '1:111374638557:web:67db19a47c2cba1a93aa34'
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init firebase services

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//firebase storage
const projectStorage = firebase.storage()

// timestamp

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }
