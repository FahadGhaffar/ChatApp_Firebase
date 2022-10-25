
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signOut
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
    let loader = document.getElementById("loader");
    console.log("ok")
    const auth = getAuth();

    onAuthStateChanged(auth, (users) => {
        if (users) {
            if (!users.emailVerified) {
                // later use

            }
            console.log(users.uid);
            getUserFromDataBase(users.uid)
            loader.style.display = "none"
        } else {
            // window.location.assign("/login_signup/index.html")
            loader.style.display = "none"
            console.log("not login")
        }

    });




}


const getUserFromDataBase = async (uid) => {

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let currentUser = document.getElementById("current-user");
    if (docSnap.exists()) {
        console.log(docSnap.data().email, uid, docSnap.data().name)
        currentUser.innerHTML = `${docSnap.data().name}`
        // currentUser.innerHTML = `${docSnap.data().name}     ${docSnap.data().email}  <button onclick="btnlogout()"> logout</button>`
        await getAllUsers(docSnap.data().email, uid, docSnap.data().name);
    } else {
        console.log("No such document")
    }
}

const getAllUsers = async (email, currentId, currentName) => {
    await console.log(email, currentId, currentName)
    const q = query(collection(db, "users"), where("email", "!=", email));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    let users = document.getElementById("users");
    querySnapshot.forEach((doc) => {
        // console.log(querySnapshot)


        console.log(doc.data().name)
        users.innerHTML += ` <div class="chat_user_info_detail_single_user">
              <div class="chat_user_profile_image"></div>
                <div class="chat_user_profile_name"> <h1>${doc.data().name}</h1> </div>   
         </div>`


        // users.innerHTML += `<li>${doc.data().name} <button onclick='startChat("${doc.id
        //     }","${doc.data().name
        //     }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`;
    });
};


function btnlogout() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            console.log('Sign-out successful.');
            window.location.assign("/login_signup/index.html")
        })
        .catch((error) => {
            // An error happened
            console.log(error)
        });

}

window.btnlogout = btnlogout