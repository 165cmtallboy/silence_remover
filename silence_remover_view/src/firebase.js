import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBb_EoxxeKeP3rz2PxsdnkhweWas3aJ6j8",
    authDomain: "silence-remover-311310.firebaseapp.com",
    projectId: "silence-remover-311310",
    storageBucket: "silence-remover-311310.appspot.com",
    messagingSenderId: "624264456579",
    appId: "1:624264456579:web:93d49901462b545ff2aeb6",
    measurementId: "G-EYY26ZH17C"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;