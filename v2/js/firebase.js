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

Production websites use reCAPTCHA Enterprise.

Local development uses Firebase App Check
debug mode.

The local debug token is registered privately
in Firebase Console and is never stored in
this source file.

Realtime Database App Check enforcement is active.
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


/*
==================================================
LOCAL APP CHECK DEBUG MODE
==================================================

Firebase generates/uses the registered debug token
when running locally.

Never replace this value with the actual debug token.
==================================================
*/

if (
    isLocalDevelopment
) {

    self.FIREBASE_APPCHECK_DEBUG_TOKEN =
        true;

}


/*
==================================================
INITIALIZE APP CHECK
==================================================
*/

let appCheck =
    null;


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
                Firebase automatically refreshes
                App Check tokens before expiration.
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


/*
==================================================
INITIALIZE FIREBASE SERVICES

App Check is initialized before Realtime Database
and Authentication.
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