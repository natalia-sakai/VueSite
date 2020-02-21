import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyADjqNsxafyGJbfWNSA5Dsa8Nw0SLF6SyA",
    authDomain: "vue-firebase-dbf74.firebaseapp.com",
    databaseURL: "https://vue-firebase-dbf74.firebaseio.com",
    projectId: "vue-firebase-dbf74",
    storageBucket: "vue-firebase-dbf74.appspot.com",
    messagingSenderId: "986955094980",
    appId: "1:986955094980:web:a790646e7e572d6299a291"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const likesCollection = db.collection('likes')

export default{
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    likesCollection
}