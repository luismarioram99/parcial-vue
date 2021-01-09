import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

// Get a Firestore instance
// export const db = firebase
//   .initializeApp({ projectId: 'MY PROJECT ID' })
//   .firestore()

var firebaseConfig = {
  apiKey: "AIzaSyCFdOSAmWMfGgYqPOqodIzxUqqWBfq37ao",
  authDomain: "phoneshopsv-503d2.firebaseapp.com",
  projectId: "phoneshopsv-503d2",
  storageBucket: "phoneshopsv-503d2.appspot.com",
  messagingSenderId: "163730637277",
  appId: "1:163730637277:web:0a77526869513753e67634"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const storage = app.storage();
export const db = app.firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }