import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDZf1vg4AG4EOtxDxQ4TCPY8WkgtzdiOUE",
    authDomain: "vue-firebase-auth-8fc4e.firebaseapp.com",
    projectId: "vue-firebase-auth-8fc4e",
    storageBucket: "vue-firebase-auth-8fc4e.appspot.com",
    messagingSenderId: "216936995567",
    appId: "1:216936995567:web:a78f003b1543b62591591a"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }