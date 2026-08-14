/*
==================================================
CIVIC HORIZON INDEX
SHARED FIREBASE INITIALIZATION

FIREBASE AUTH
REALTIME DATABASE
APP CHECK + reCAPTCHA ENTERPRISE
==================================================
*/


/*
==================================================
FIREBASE APP
==================================================
*/

import {

    initializeApp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


/*
==================================================
REALTIME DATABASE
==================================================
*/

import {

    getDatabase

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
AUTHENTICATION
==================================================
*/

import {

    getAuth

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/*
==================================================
APP CHECK
==================================================
*/

import {

    initializeAppCheck,

    ReCaptchaEnterpriseProvider

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";


/*
==================================================
FIREBASE CONFIGURATION
==================================================
*/

const firebaseConfig = {

    apiKey:
        "AIzaSyCkP7WI3KcSdOTbIIe0z7L70CqWoXUhC6Y",

    authDomain:
        "civichorizonindex.firebaseapp.com",

    databaseURL:
        "https://civichorizonindex-default-rtdb.firebaseio.com/",

    projectId:
        "civichorizonindex",

    storageBucket:
        "civichorizonindex.firebasestorage.app",

    messagingSenderId:
        "806593810616",

    appId:
        "1:806593810616:web:7dae33c6ee7db46b55644d"

};


/*
==================================================
INITIALIZE FIREBASE
==================================================
*/

const app =
    initializeApp(
        firebaseConfig
    );


/*
==================================================
APP CHECK CONFIGURATION
==================================================

Production:

https://kurts2548.github.io

App Check runs automatically.

Local development:

http://127.0.0.1
http://localhost

App Check is temporarily skipped while we continue
developing and testing V2 locally.

Do NOT enable Firebase App Check enforcement until
the V2 site is published and production traffic has
been verified in the Firebase App Check dashboard.
==================================================
*/

const reCaptchaEnterpriseSiteKey =
    "6LdQGoYtAAAAAG1o0agJGjtcB453yhTuSn88u-hu";


const hostname =
    window.location.hostname;


const isLocalDevelopment =

    hostname ===
        "127.0.0.1" ||

    hostname ===
        "localhost";


let appCheck =
    null;


if (
    !isLocalDevelopment
) {

    try {

        appCheck =
            initializeAppCheck(
                app,
                {

                    provider:
                        new ReCaptchaEnterpriseProvider(
                            reCaptchaEnterpriseSiteKey
                        ),

                    /*
                    Firebase will automatically refresh
                    App Check tokens before they expire.
                    */

                    isTokenAutoRefreshEnabled:
                        true

                }
            );

    } catch (error) {

        console.error(
            "Firebase App Check could not be initialized:",
            error
        );

    }

}


/*
==================================================
INITIALIZE FIREBASE SERVICES

App Check is initialized above these services on
the production website as recommended by Firebase.
==================================================
*/

const database =
    getDatabase(
        app
    );


const auth =
    getAuth(
        app
    );


/*
==================================================
EXPORTS
==================================================
*/

export {

    app,

    appCheck,

    database,

    auth

};