
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
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

const auth = getAuth();


const signUpButton = document.getElementById('swap_slider_signup');
const signInButton = document.getElementById('swap_slider_signin');
const container = document.getElementById('container');
const signupName = document.getElementById("signupName");
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
    if (signupName.value && singupEmail.value && signupPass.value) {
        createUserWithEmailAndPassword(auth, singupEmail.value, signupPass.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user)
                container.classList.remove("right-panel-active");
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
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        });
})
