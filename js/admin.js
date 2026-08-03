import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


function login() {

    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;


    signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(() => {

        document.getElementById("message").innerHTML =
        "Login successful!";

        window.location.href =
        "creator.html";

    })

    .catch((error) => {

        document.getElementById("message").innerHTML =
        error.message;

    });

}


window.login = login;