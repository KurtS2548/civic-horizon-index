/*
==================================================
CIVIC HORIZON INDEX V2
ADMIN AUTH SERVICE
==================================================
*/

import {
    auth
} from "../../../js/firebase.js";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/*
==================================================
AUTH STATE
==================================================
*/

export function subscribeToAuthState(
    callback
) {

    return onAuthStateChanged(
        auth,
        user => {

            callback(
                user || null
            );

        }
    );

}


/*
==================================================
SIGN IN
==================================================
*/

export async function signInAdmin(
    email,
    password
) {

    const cleanEmail =
        String(email || "").trim();


    const cleanPassword =
        String(password || "");


    if (!cleanEmail) {

        throw new Error(
            "Email is required."
        );

    }


    if (!cleanPassword) {

        throw new Error(
            "Password is required."
        );

    }


    const credential =
        await signInWithEmailAndPassword(
            auth,
            cleanEmail,
            cleanPassword
        );


    return credential.user;

}


/*
==================================================
SIGN OUT
==================================================
*/

export async function signOutAdmin() {

    await signOut(
        auth
    );

}


/*
==================================================
CURRENT USER
==================================================
*/

export function getCurrentAdminUser() {

    return auth.currentUser;

}