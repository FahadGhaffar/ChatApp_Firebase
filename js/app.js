
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

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4qx72QWcyccLIk9GRj5CwYCyA6VLlpxw",
    authDomain: "registrationwebapp-44b3d.firebaseapp.com",
    projectId: "registrationwebapp-44b3d",
    storageBucket: "registrationwebapp-44b3d.appspot.com",
    messagingSenderId: "549933039547",
    appId: "1:549933039547:web:54d9b880b8b33ba1210e9e",
    measurementId: "G-YRL3155H2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

const auth = getAuth();


const signUpButton = document.getElementById('swap_slider_signup');
const signInButton = document.getElementById('swap_slider_signin');
const container = document.getElementById('container');
const Username = document.getElementById("signupName");
const singupEmail = document.getElementById("signupEmail");
const signupPass = document.getElementById("signupPass");
const signinEmail = document.getElementById("signinEmail");
const signinPass = document.getElementById("signinPass");
const welcome_msg = document.getElementById("welcome_msg");
const SignUPInFirebase = document.getElementById("signUp");
const SignInInFirebase = document.getElementById("signIn");

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


SignUPInFirebase.addEventListener('click', () => {
    let myFile = document.getElementById("my-file");
    if (signupName.value && singupEmail.value && signupPass.value) {

        createUserWithEmailAndPassword(auth, singupEmail.value, signupPass.value)
            .then(async (userCredential) => {
                let uid = userCredential.user.uid;
                let firdoc = doc(db, "user", uid);
                await setDoc(firdoc, {
                    name: Username.value,
                    email: singupEmail.value,
                    password: signupPass.value


                })
                let file = myFile.files[0];
                // const auth = getAuth();
                // let uid = auth.currentUser.uid;
                console.log("ok")
                let url = await uploadFiles(file);
                console.log("ok1")
                const washingtonRef = doc(db, "users", uid);
                console.log("ok2")
                await updateDoc(washingtonRef, {
                    profile: url,
                });

                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user)
                container.classList.remove("right-panel-active");
                Username.value = ""
                singupEmail.value = ""
                signupPass.value = ""
                window.location.assign("/login_signup/index.html")


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error)
            });







    }
    else {
        alert("Your One Of field Is Empty");
    }
})




SignInInFirebase.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, signinEmail.value, signinPass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user)
            window.location.assign("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        });
})



window.onload = () => {


    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (!user.emailVerified) {
                // later use

            }
            // window.location.assign("/")
            // getUserFromDataBase(user.uid)
        } else {
            console.log("not login")
        }

    });




}

// const getUserFromDataBase = async (uid) => {

//     const docRef = doc(db, "user", uid);
//     const docSnap = await getDoc(docRef);
//     let currentUser = document.getElementById("current-user");
//     if (docSnap.exists()) {
//         currentUser.innerHTML = `${docSnap.data().name}     ${docSnap.data().email}`
//     } else {
//         console.log("No such document")
//     }
// }

const uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage();
        const auth = getAuth();
        let uid = auth.currentUser.uid;
        const storageRef = ref(storage, `users/${uid}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};
