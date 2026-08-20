/*
==================================================
CIVIC HORIZON INDEX V2
SHARED AUTHENTICATION SERVICE
==================================================
*/


import {
    auth,
    database
} from "../../../js/firebase.js";


import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    reload,
    getIdToken,
    deleteUser,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    ref,
    set,
    get,
    update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
PROFILE VERSION
==================================================
*/

const profileVersion =
    "1.2";


/*
==================================================
AUTH STATE
==================================================
*/

export function subscribeToAuthState(
    callback,
    errorCallback = console.error
) {

    return onAuthStateChanged(
        auth,
        user => {

            callback(
                user || null
            );

        },
        errorCallback
    );

}


/*
==================================================
CREATE PUBLIC ACCOUNT
==================================================
*/

export async function createPublicAccount(
    accountData
) {

    if (
        !accountData ||
        typeof accountData !== "object"
    ) {

        throw new Error(
            "Account information is required."
        );

    }


    const email =
        normalizeEmail(
            accountData.email
        );


    const password =
        String(
            accountData.password || ""
        );


    const displayName =
        String(
            accountData.displayName || ""
        ).trim();


    const zipCode =
        normalizeZipCode(
            accountData.zipCode
        );


    const birthday =
        normalizeBirthday(
            accountData.birthday
        );


    const agreementAccepted =
        accountData.agreementAccepted ===
        true;


    /*
    ----------------------------------------------
    VALIDATION
    ----------------------------------------------
    */

    if (!displayName) {

        throw new Error(
            "Name is required."
        );

    }


    if (
        displayName.length >
        60
    ) {

        throw new Error(
            "Name must be 60 characters or fewer."
        );

    }


    if (!email) {

        throw new Error(
            "Email is required."
        );

    }


    validateZipCode(
        zipCode
    );


    validateBirthday(
        birthday
    );


    const age =
        calculateAge(
            birthday
        );


    if (
        age <
        13
    ) {

        throw new Error(
            "Civic Horizon accounts are currently available to participants age 13 and older."
        );

    }


    validatePassword(
        password
    );


    if (
        !agreementAccepted
    ) {

        throw new Error(
            "You must agree to the Terms and Privacy Policy."
        );

    }


    /*
    ----------------------------------------------
    PARTICIPANT CLASSIFICATION
    ----------------------------------------------
    */

    const ageGroup =
        getAgeGroupFromBirthday(
            birthday
        );


    const participantType =
        getParticipantTypeFromBirthday(
            birthday
        );


    /*
    ----------------------------------------------
    CREATE FIREBASE AUTH ACCOUNT
    ----------------------------------------------
    */

    const credential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


    const user =
        credential.user;


    try {

        await updateProfile(
            user,
            {
                displayName
            }
        );


        const profileReference =
            ref(
                database,
                `userProfiles/${user.uid}`
            );


        const createdAt =
            new Date().toISOString();


        const profileData = {

            uid:
                user.uid,

            displayName,

            zipCode,

            birthday,

            ageGroup,

            participantType,

            agreementAccepted:
                true,

            agreementAcceptedAt:
                createdAt,

            emailVerified:
                false,

            accountStatus:
                "pendingVerification",

            createdAt,

            updatedAt:
                createdAt,

            profileVersion

        };


        await set(
            profileReference,
            profileData
        );


        await sendEmailVerification(
            user
        );


        return {

            user,

            profile:
                profileData

        };

    } catch (error) {

        try {

            await deleteUser(
                user
            );

        } catch (
            rollbackError
        ) {

            console.error(
                "New account rollback failed:",
                rollbackError
            );

        }


        throw error;

    }

}


/*
==================================================
PUBLIC SIGN IN
==================================================
*/

export async function signInPublicUser(
    email,
    password
) {

    const cleanEmail =
        normalizeEmail(
            email
        );


    const cleanPassword =
        String(
            password || ""
        );


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
SEND VERIFICATION EMAIL
==================================================
*/

export async function sendCurrentUserVerificationEmail() {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "You must be signed in first."
        );

    }


    await reload(
        user
    );


    const refreshedUser =
        auth.currentUser;


    if (!refreshedUser) {

        throw new Error(
            "Your account could not be refreshed."
        );

    }


    if (
        refreshedUser.emailVerified
    ) {

        try {

            await getIdToken(
                refreshedUser,
                true
            );

        } catch (error) {

            console.warn(
                "Firebase ID token refresh failed:",
                error
            );

        }


        try {

            await syncVerificationStatus(
                refreshedUser
            );

        } catch (error) {

            console.warn(
                "Verification profile synchronization failed:",
                error
            );

        }


        return {

            alreadyVerified:
                true

        };

    }


    await sendEmailVerification(
        refreshedUser
    );


    return {

        alreadyVerified:
            false

    };

}


/*
==================================================
REFRESH CURRENT USER
==================================================
*/

export async function refreshCurrentUser() {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    /*
    ----------------------------------------------
    AUTHENTICATION FIRST

    Firebase Authentication is the source of truth
    for email verification.

    Database synchronization must never prevent
    account.js from receiving the refreshed user.
    ----------------------------------------------
    */

    await reload(
        user
    );


    const refreshedUser =
        auth.currentUser;


    if (!refreshedUser) {

        return null;

    }


    /*
    ----------------------------------------------
    REFRESH ID TOKEN
    ----------------------------------------------
    */

    try {

        await getIdToken(
            refreshedUser,
            true
        );

    } catch (error) {

        console.warn(
            "Firebase ID token refresh failed:",
            error
        );

    }


    /*
    ----------------------------------------------
    SYNC VERIFICATION PROFILE

    Secondary operation. Failure here must not
    block authentication.
    ----------------------------------------------
    */

    try {

        await syncVerificationStatus(
            refreshedUser
        );

    } catch (error) {

        console.warn(
            "Verification profile synchronization failed:",
            error
        );

    }


    /*
    ----------------------------------------------
    SYNC AGE CLASSIFICATION

    Also secondary to authentication.
    ----------------------------------------------
    */

    try {

        await syncAgeClassification(
            refreshedUser.uid
        );

    } catch (error) {

        console.warn(
            "Age classification synchronization failed:",
            error
        );

    }


    /*
    ----------------------------------------------
    ALWAYS RETURN REFRESHED AUTH USER
    ----------------------------------------------
    */

    return refreshedUser;

}


/*
==================================================
SYNC VERIFICATION STATUS
==================================================
*/

async function syncVerificationStatus(
    user
) {

    if (
        !user ||
        !user.uid
    ) {

        return;

    }


    await getIdToken(
        user,
        true
    );


    const profileReference =
        ref(
            database,
            `userProfiles/${user.uid}`
        );


    await update(
        profileReference,
        {

            emailVerified:
                Boolean(
                    user.emailVerified
                ),

            accountStatus:
                user.emailVerified
                    ? "verified"
                    : "pendingVerification",

            updatedAt:
                new Date().toISOString()

        }
    );

}


/*
==================================================
SYNC AGE CLASSIFICATION
==================================================
*/

async function syncAgeClassification(
    uid
) {

    if (!uid) {

        return;

    }


    const profileReference =
        ref(
            database,
            `userProfiles/${uid}`
        );


    const snapshot =
        await get(
            profileReference
        );


    if (
        !snapshot.exists()
    ) {

        return;

    }


    const profile =
        snapshot.val();


    const birthday =
        normalizeBirthday(
            profile?.birthday
        );


    if (
        !isValidBirthday(
            birthday
        )
    ) {

        return;

    }


    const ageGroup =
        getAgeGroupFromBirthday(
            birthday
        );


    const participantType =
        getParticipantTypeFromBirthday(
            birthday
        );


    const needsUpdate =
        profile.ageGroup !==
            ageGroup ||
        profile.participantType !==
            participantType;


    if (
        !needsUpdate
    ) {

        return;

    }


    await update(
        profileReference,
        {

            ageGroup,

            participantType,

            updatedAt:
                new Date().toISOString()

        }
    );

}


/*
==================================================
CURRENT USER
==================================================
*/

export function getCurrentUser() {

    return auth.currentUser;

}


/*
==================================================
CURRENT USER PROFILE
==================================================
*/

export async function getCurrentUserProfile() {

    const user =
        auth.currentUser;


    if (!user) {

        return null;

    }


    try {

        await syncAgeClassification(
            user.uid
        );

    } catch (error) {

        console.warn(
            "Age classification synchronization failed:",
            error
        );

    }


    const profileReference =
        ref(
            database,
            `userProfiles/${user.uid}`
        );


    const snapshot =
        await get(
            profileReference
        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    return snapshot.val();

}


/*
==================================================
UPDATE ZIP CODE
==================================================
*/

export async function updateCurrentUserZipCode(
    zipCode
) {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "You must be signed in first."
        );

    }


    const cleanZipCode =
        normalizeZipCode(
            zipCode
        );


    validateZipCode(
        cleanZipCode
    );


    await getIdToken(
        user,
        true
    );


    const profileReference =
        ref(
            database,
            `userProfiles/${user.uid}`
        );


    await update(
    profileReference,
    {

        zipCode:
            cleanZipCode,

        municipalityGeoid:
            null,

        municipalityName:
            null,

        municipalityConfirmedAt:
            null,

        updatedAt:
            new Date().toISOString()

    }
);


    return cleanZipCode;

}

/*
==================================================
UPDATE MUNICIPALITY
==================================================
*/

export async function updateCurrentUserMunicipality(
    municipalityGeoid,
    municipalityName
) {

    const user =
        auth.currentUser;


    if (!user) {

        throw new Error(
            "You must be signed in first."
        );

    }


    const cleanGeoid =
        String(
            municipalityGeoid || ""
        ).trim();


    const cleanName =
        String(
            municipalityName || ""
        ).trim();


    if (
        !/^\d{10}$/.test(
            cleanGeoid
        )
    ) {

        throw new Error(
            "A valid municipality is required."
        );

    }


    if (!cleanName) {

        throw new Error(
            "A municipality name is required."
        );

    }


    await getIdToken(
        user,
        true
    );


    const profileReference =
        ref(
            database,
            `userProfiles/${user.uid}`
        );


    await update(
        profileReference,
        {

            municipalityGeoid:
                cleanGeoid,

            municipalityName:
                cleanName,

            municipalityConfirmedAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString()

        }
    );


    return {

        municipalityGeoid:
            cleanGeoid,

        municipalityName:
            cleanName

    };

}


/*
==================================================
VOTING ELIGIBILITY
==================================================
*/

export async function getCurrentUserVotingEligibility() {

    const user =
        auth.currentUser;


    if (!user) {

        return {

            eligible:
                false,

            reason:
                "signedOut"

        };

    }


    await reload(
        user
    );


    const refreshedUser =
        auth.currentUser;


    if (!refreshedUser) {

        return {

            eligible:
                false,

            reason:
                "signedOut"

        };

    }


    try {

        await getIdToken(
            refreshedUser,
            true
        );

    } catch (error) {

        console.warn(
            "Voting eligibility token refresh failed:",
            error
        );

    }


    if (
        !refreshedUser.emailVerified
    ) {

        return {

            eligible:
                false,

            reason:
                "emailNotVerified"

        };

    }


    try {

        await syncVerificationStatus(
            refreshedUser
        );

    } catch (error) {

        console.warn(
            "Voting verification synchronization failed:",
            error
        );

    }


    try {

        await syncAgeClassification(
            refreshedUser.uid
        );

    } catch (error) {

        console.warn(
            "Voting age classification synchronization failed:",
            error
        );

    }


    const profile =
        await getCurrentUserProfile();


    if (!profile) {

        return {

            eligible:
                false,

            reason:
                "profileMissing"

        };

    }


    if (
        !isValidZipCode(
            profile.zipCode
        )
    ) {

        return {

            eligible:
                false,

            reason:
                "zipMissing"

        };

    }


    if (
        !isValidBirthday(
            profile.birthday
        )
    ) {

        return {

            eligible:
                false,

            reason:
                "birthdayMissing"

        };

    }


    const age =
        calculateAge(
            profile.birthday
        );


    if (
        age <
        13
    ) {

        return {

            eligible:
                false,

            reason:
                "underMinimumAge"

        };

    }


    if (
        profile.agreementAccepted !==
        true
    ) {

        return {

            eligible:
                false,

            reason:
                "agreementMissing"

        };

    }


    /*
    ----------------------------------------------
    PROFILE VERIFICATION SYNC

    Firebase Authentication remains authoritative.

    If Firebase says verified but the profile has
    not synchronized yet, try one final profile
    synchronization before denying eligibility.
    ----------------------------------------------
    */

    if (
        profile.accountStatus !==
            "verified" ||
        profile.emailVerified !==
            true
    ) {

        try {

            await syncVerificationStatus(
                refreshedUser
            );

        } catch (error) {

            console.warn(
                "Final voting verification synchronization failed:",
                error
            );

        }


        const refreshedProfile =
            await getCurrentUserProfile();


        if (
            !refreshedProfile ||
            refreshedProfile.accountStatus !==
                "verified" ||
            refreshedProfile.emailVerified !==
                true
        ) {

            return {

                eligible:
                    false,

                reason:
                    "verificationSyncPending"

            };

        }

    }


    return {

        eligible:
            true,

        reason:
            "verified",

        uid:
            refreshedUser.uid,

        zipCode:
            profile.zipCode,

        birthday:
            profile.birthday,

        age,

        ageGroup:
            getAgeGroupFromBirthday(
                profile.birthday
            ),

        participantType:
            getParticipantTypeFromBirthday(
                profile.birthday
            )

    };

}


/*
==================================================
PASSWORD RESET
==================================================
*/

export async function sendPasswordReset(
    email
) {

    const cleanEmail =
        normalizeEmail(
            email
        );


    if (!cleanEmail) {

        throw new Error(
            "Email is required."
        );

    }


    await sendPasswordResetEmail(
        auth,
        cleanEmail
    );

}


/*
==================================================
SIGN OUT
==================================================
*/

export async function signOutPublicUser() {

    await signOut(
        auth
    );

}


/*
==================================================
ADMIN SECURITY
==================================================
*/

const ADMIN_UID =
    "46MRUizWh5Yl83XXk4CBuI3TUZc2";


/*
==================================================
CHECK ADMIN USER
==================================================
*/

export function isAdminUser(
    user
) {

    return Boolean(
        user &&
        user.uid ===
            ADMIN_UID
    );

}


/*
==================================================
ADMIN SIGN IN
==================================================
*/

export async function signInAdmin(
    email,
    password
) {

    const user =
        await signInPublicUser(
            email,
            password
        );


    /*
    ----------------------------------------------
    ADMIN UID REQUIRED
    ----------------------------------------------
    */

    if (
        !isAdminUser(
            user
        )
    ) {

        await signOut(
            auth
        );


        const error =
            new Error(
                "This account is not authorized to access the Admin Center."
            );


        error.code =
            "auth/admin-access-denied";


        throw error;

    }


    return user;

}


/*
==================================================
ADMIN SIGN OUT
==================================================
*/

export async function signOutAdmin() {

    await signOut(
        auth
    );

}


/*
==================================================
CURRENT ADMIN USER
==================================================
*/

export function getCurrentAdminUser() {

    const user =
        auth.currentUser;


    if (
        !isAdminUser(
            user
        )
    ) {

        return null;

    }


    return user;

}


/*
==================================================
NORMALIZATION
==================================================
*/

function normalizeEmail(
    email
) {

    return String(
        email || ""
    )
        .trim()
        .toLowerCase();

}


function normalizeZipCode(
    zipCode
) {

    return String(
        zipCode || ""
    )
        .trim();

}


function normalizeBirthday(
    birthday
) {

    return String(
        birthday || ""
    )
        .trim();

}


/*
==================================================
ZIP VALIDATION
==================================================
*/

function validateZipCode(
    zipCode
) {

    if (
        !isValidZipCode(
            zipCode
        )
    ) {

        throw new Error(
            "Enter a valid 5-digit ZIP code."
        );

    }

}


function isValidZipCode(
    zipCode
) {

    return /^\d{5}$/.test(
        String(
            zipCode || ""
        )
    );

}


/*
==================================================
BIRTHDAY VALIDATION
==================================================
*/

function validateBirthday(
    birthday
) {

    if (
        !isValidBirthday(
            birthday
        )
    ) {

        throw new Error(
            "Enter a valid birthday."
        );

    }


    const date =
        parseBirthday(
            birthday
        );


    const today =
        startOfToday();


    if (
        date >
        today
    ) {

        throw new Error(
            "Birthday cannot be in the future."
        );

    }

}


function isValidBirthday(
    birthday
) {

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
            String(
                birthday || ""
            )
        )
    ) {

        return false;

    }


    const date =
        parseBirthday(
            birthday
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return false;

    }


    const [
        year,
        month,
        day
    ] =
        birthday
            .split("-")
            .map(
                Number
            );


    return (
        date.getFullYear() ===
            year &&
        date.getMonth() ===
            month - 1 &&
        date.getDate() ===
            day
    );

}


/*
==================================================
AGE CALCULATION
==================================================
*/

function calculateAge(
    birthday
) {

    const birthDate =
        parseBirthday(
            birthday
        );


    const today =
        startOfToday();


    let age =
        today.getFullYear() -
        birthDate.getFullYear();


    const birthdayThisYear =
        new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    if (
        today <
        birthdayThisYear
    ) {

        age -=
            1;

    }


    return age;

}


/*
==================================================
AGE GROUP
==================================================
*/

function getAgeGroupFromBirthday(
    birthday
) {

    const age =
        calculateAge(
            birthday
        );


    if (
        age <
        13
    ) {

        return "under13";

    }


    if (
        age <
        18
    ) {

        return "youth";

    }


    return "adult";

}


/*
==================================================
PARTICIPANT TYPE
==================================================
*/

function getParticipantTypeFromBirthday(
    birthday
) {

    const ageGroup =
        getAgeGroupFromBirthday(
            birthday
        );


    if (
        ageGroup ===
        "youth"
    ) {

        return "youthParticipant";

    }


    if (
        ageGroup ===
        "adult"
    ) {

        return "verifiedParticipant";

    }


    return "ineligibleParticipant";

}


/*
==================================================
DATE HELPERS
==================================================
*/

function parseBirthday(
    birthday
) {

    const [
        year,
        month,
        day
    ] =
        String(
            birthday
        )
            .split("-")
            .map(
                Number
            );


    return new Date(
        year,
        month - 1,
        day
    );

}


function startOfToday() {

    const now =
        new Date();


    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

}


/*
==================================================
PASSWORD VALIDATION
==================================================
*/

function validatePassword(
    password
) {

    if (
        password.length <
        10
    ) {

        throw new Error(
            "Password must be at least 10 characters."
        );

    }


    if (
        !/[A-Z]/.test(
            password
        )
    ) {

        throw new Error(
            "Password must include at least one uppercase letter."
        );

    }


    if (
        !/[a-z]/.test(
            password
        )
    ) {

        throw new Error(
            "Password must include at least one lowercase letter."
        );

    }


    if (
        !/[0-9]/.test(
            password
        )
    ) {

        throw new Error(
            "Password must include at least one number."
        );

    }

}