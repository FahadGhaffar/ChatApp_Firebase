
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
    doc,
    setDoc,
    getFirestore,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    onSnapshot,
    orderBy,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4qx72QWcyccLIk9GRj5CwYCyA6VLlpxw",
    authDomain: "registrationwebapp-44b3d.firebaseapp.com",
    projectId: "registrationwebapp-44b3d",
    storageBucket: "registrationwebapp-44b3d.appspot.com",
    messagingSenderId: "549933039547",
    appId: "1:549933039547:web:54d9b880b8b33ba1210e9e",
    measurementId: "G-YRL3155H2J"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)




window.onload = () => {
    console.log("ok")
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (!user.emailVerified) {
                // later use

            }

            getUserFromDataBase(user.uid)
        } else {
            console.log("not login")
        }

    });




}


const getUserFromDataBase = async (uid) => {

    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);
    let currentUser = document.getElementById("current-user");
    if (docSnap.exists()) {
        console.log(docSnap.data().name, docSnap.data().email)
        currentUser.innerHTML = `${docSnap.data().name}     ${docSnap.data().email}  <button id=btnlogout> logout</button>`
    } else {
        console.log("No such document")
    }
}


btnlogout.addEventListener = async () => {

    await firebase.auth().signOut()
        .then(() => {
            console.log('Sign-out successful.');
        })
        .catch((error) => {
            // An error happened
            console.log(error)
        });

}