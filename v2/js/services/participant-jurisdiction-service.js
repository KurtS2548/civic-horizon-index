/*
==================================================
CIVIC HORIZON INDEX V2
PARTICIPANT JURISDICTION SERVICE
==================================================

Purpose:

Read the signed-in participant's profile and resolve
their ZIP code through Civic Horizon's verified
geographic dataset.

CORE RULE:

Everyone may read public civic information.

Geographic voting is enabled only when the
participant's ZIP uniquely resolves the jurisdiction
required for that vote.

We do not guess districts.
We do not let participants choose a district simply
because their ZIP overlaps multiple districts.
==================================================
*/


/*
==================================================
FIREBASE
==================================================
*/

import {

    auth,
    database

} from "../../../js/firebase.js";


import {

    onAuthStateChanged

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

    ref,
    get

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
ZIP RESOLUTION
==================================================
*/

import {

    resolveZipJurisdiction,
    isStateResolved,
    isDistrictResolved,
    isMunicipalityResolved,
    getDistrictEligibilityMessage,
    getMunicipalityEligibilityMessage

} from "./zip-resolution-service.js";


/*
==================================================
WAIT FOR FIREBASE AUTH
==================================================
*/

function waitForAuthState() {

    return new Promise(
        resolve => {

            /*
            ------------------------------------------
            AUTH ALREADY AVAILABLE
            ------------------------------------------
            */

            if (
                auth.currentUser
            ) {

                resolve(
                    auth.currentUser
                );

                return;

            }


            /*
            ------------------------------------------
            WAIT FOR FIREBASE SESSION RESTORE
            ------------------------------------------
            */

            let settled =
                false;


            const unsubscribe =
                onAuthStateChanged(
                    auth,
                    user => {

                        if (
                            settled
                        ) {

                            return;

                        }


                        settled =
                            true;


                        unsubscribe();


                        resolve(
                            user ||
                            null
                        );

                    }
                );


            /*
            ------------------------------------------
            SAFETY FALLBACK

            Do not leave the page waiting forever if
            Firebase cannot restore authentication.
            ------------------------------------------
            */

            window.setTimeout(
                () => {

                    if (
                        settled
                    ) {

                        return;

                    }


                    settled =
                        true;


                    unsubscribe();


                    resolve(
                        auth.currentUser ||
                        null
                    );

                },
                4000
            );

        }
    );

}


/*
==================================================
GET CURRENT PARTICIPANT JURISDICTION
==================================================
*/

export async function getCurrentParticipantJurisdiction() {

    const user =
        await waitForAuthState();


    if (!user) {

        return createEmptyResult(
            "signed-out",
            "Sign in to determine voting eligibility."
        );

    }


    if (
        !user.emailVerified
    ) {

        return createEmptyResult(
            "email-not-verified",
            "Verify your email before geographic voting eligibility can be determined."
        );

    }


    const profile =
        await getParticipantProfile(
            user.uid
        );


    if (!profile) {

        return createEmptyResult(
            "profile-unavailable",
            "Your participant profile could not be loaded."
        );

    }


    const zipCode =
        normalizeZipCode(
            profile.zipCode
        );


    if (!zipCode) {

        return createEmptyResult(
            "zip-required",
            "Add a valid ZIP code to your profile before participating in geographic voting."
        );

    }


    const resolution =
    resolveZipJurisdiction(
        zipCode
    );


/*
----------------------------------------------
PARTICIPANT-CONFIRMED MUNICIPALITY

ZIP data may contain multiple municipality
candidates.

When the participant has confirmed one of those
municipalities in their profile, use that stored
municipality for local voting eligibility.

The ZIP resolver still remains authoritative for
state and congressional district eligibility.
----------------------------------------------
*/

const confirmedMunicipalityGeoid =
    String(
        profile.municipalityGeoid ||
        ""
    ).trim();


const confirmedMunicipalityName =
    String(
        profile.municipalityName ||
        ""
    ).trim();


if (
    /^\d{10}$/.test(
        confirmedMunicipalityGeoid
    ) &&
    confirmedMunicipalityName
) {

    resolution.municipality =
        confirmedMunicipalityName;

    resolution.municipalityGeoid =
        confirmedMunicipalityGeoid;

    resolution.municipalityResolved =
        true;

    resolution.municipalityAmbiguous =
        false;

}


/*
----------------------------------------------
RETURN PARTICIPANT JURISDICTION
----------------------------------------------
*/

return createParticipantResult(
    resolution
);

}


/*
==================================================
GET PARTICIPANT PROFILE
==================================================
*/

async function getParticipantProfile(
    uid
) {

    const cleanUid =
        String(
            uid || ""
        ).trim();


    if (!cleanUid) {

        return null;

    }


    try {

        const profileReference =
            ref(
                database,
                `userProfiles/${cleanUid}`
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

    } catch (error) {

        console.error(
            "Participant jurisdiction profile could not be loaded:",
            error
        );


        return null;

    }

}


/*
==================================================
CREATE PARTICIPANT RESULT
==================================================
*/

function createParticipantResult(
    resolution
) {

    if (
        !resolution ||
        typeof resolution !==
            "object"
    ) {

        return createEmptyResult(
            "resolution-unavailable",
            "Voting-area information could not be determined."
        );

    }


    const stateEligible =
        isStateResolved(
            resolution
        );


    const districtEligible =
        isDistrictResolved(
            resolution
        );


    const municipalityEligible =
        isMunicipalityResolved(
            resolution
        );


    return {

        zipCode:
            resolution.zipCode ||
            "",

        stateCode:
            resolution.stateCode ||
            "",

        congressionalDistrict:
            resolution.congressionalDistrict ||
            "",

        municipality:
            resolution.municipality ||
            "",


        congressionalDistricts:
            Array.isArray(
                resolution.congressionalDistricts
            )
                ? resolution.congressionalDistricts
                : [],

        municipalities:
    Array.isArray(
        resolution.municipalities
    )
        ? resolution.municipalities
        : [],

municipalityGeoid:
    resolution.municipalityGeoid ||
    "",

municipalityGeoids:
    resolution.municipalityGeoids &&
    typeof resolution.municipalityGeoids ===
        "object"
        ? resolution.municipalityGeoids
        : {},

municipalityRatios:
    resolution.municipalityRatios &&
    typeof resolution.municipalityRatios ===
        "object"
        ? resolution.municipalityRatios
        : {},

districtRatios:
            resolution.districtRatios &&
            typeof resolution.districtRatios ===
                "object"
                ? resolution.districtRatios
                : {},


        stateResolved:
            resolution.stateResolved ===
            true,

        districtResolved:
            resolution.districtResolved ===
            true,

        districtAmbiguous:
            resolution.districtAmbiguous ===
            true,

        municipalityResolved:
            resolution.municipalityResolved ===
            true,

        municipalityAmbiguous:
            resolution.municipalityAmbiguous ===
            true,


        eligibility: {

            national:
                true,

            state:
                stateEligible,

            congressionalDistrict:
                districtEligible,

            municipality:
                municipalityEligible

        },


        messages: {

            state:
                stateEligible
                    ? ""
                    : "Read only — your state voting area could not be confirmed.",

            congressionalDistrict:
                districtEligible
                    ? ""
                    : getDistrictEligibilityMessage(
                        resolution
                    ),

            municipality:
                municipalityEligible
                    ? ""
                    : getMunicipalityEligibilityMessage(
                        resolution
                    )

        },


        resolved:
            resolution.resolved ===
            true,

        status:
            resolution.status ||
            "partially-resolved"

    };

}


/*
==================================================
STATE VOTING ELIGIBILITY
==================================================
*/

export async function canCurrentParticipantVoteInState(
    stateCode
) {

    const participant =
        await getCurrentParticipantJurisdiction();


    const requiredState =
        normalizeStateCode(
            stateCode
        );


    if (
        !requiredState ||
        !participant
            .eligibility
            .state
    ) {

        return false;

    }


    return (
        participant.stateCode ===
        requiredState
    );

}


/*
==================================================
DISTRICT VOTING ELIGIBILITY
==================================================
*/

export async function canCurrentParticipantVoteInDistrict(
    stateCode,
    district
) {

    const participant =
        await getCurrentParticipantJurisdiction();


    const requiredState =
        normalizeStateCode(
            stateCode
        );


    const requiredDistrict =
        normalizeDistrict(
            district
        );


    if (
        !requiredState ||
        !requiredDistrict ||
        !participant
            .eligibility
            .congressionalDistrict
    ) {

        return false;

    }


    return (
        participant.stateCode ===
            requiredState &&
        participant.congressionalDistrict ===
            requiredDistrict
    );

}


/*
==================================================
MUNICIPALITY VOTING ELIGIBILITY
==================================================
*/

export async function canCurrentParticipantVoteInMunicipality(
    stateCode,
    municipality
) {

    const participant =
        await getCurrentParticipantJurisdiction();


    const requiredState =
        normalizeStateCode(
            stateCode
        );


    const requiredMunicipality =
        normalizeComparisonText(
            municipality
        );


    if (
        !requiredState ||
        !requiredMunicipality ||
        !participant
            .eligibility
            .municipality
    ) {

        return false;

    }


    return (
        participant.stateCode ===
            requiredState &&
        normalizeComparisonText(
            participant.municipality
        ) ===
            requiredMunicipality
    );

}


/*
==================================================
PUBLIC OFFICIAL ELIGIBILITY
==================================================
*/

export async function getCurrentParticipantOfficialEligibility(
    official
) {

    if (
        !official ||
        typeof official !==
            "object" ||
        !official.jurisdiction
    ) {

        return {

            eligible:
                false,

            readOnly:
                true,

            reason:
                "invalid-official",

            message:
                "Voting eligibility could not be determined."

        };

    }


    const participant =
        await getCurrentParticipantJurisdiction();


    const jurisdiction =
        official.jurisdiction;


    /*
    ----------------------------------------------
    NATIONAL
    ----------------------------------------------
    */

    if (
        jurisdiction.type ===
        "national"
    ) {

        return {

            eligible:
                true,

            readOnly:
                false,

            reason:
                "eligible",

            message:
                ""

        };

    }


    /*
    ----------------------------------------------
    STATE
    ----------------------------------------------
    */

    if (
        jurisdiction.type ===
        "state"
    ) {

        const eligible =
            participant
                .eligibility
                .state &&
            participant.stateCode ===
                jurisdiction.stateCode;


        return createEligibilityResult(

            eligible,

            eligible
                ? ""
                : "Read only — voting is limited to residents of this state."

        );

    }


    /*
    ----------------------------------------------
    CONGRESSIONAL DISTRICT
    ----------------------------------------------
    */

    if (
        jurisdiction.type ===
        "congressional-district"
    ) {

        if (
            !participant
                .eligibility
                .congressionalDistrict
        ) {

            return createEligibilityResult(
                false,
                participant
                    .messages
                    .congressionalDistrict
            );

        }


        const eligible =
            participant.stateCode ===
                jurisdiction.stateCode &&
            participant.congressionalDistrict ===
                jurisdiction.district;


        return createEligibilityResult(

            eligible,

            eligible
                ? ""
                : "Read only — voting is limited to constituents of this congressional district."

        );

    }


    /*
    ----------------------------------------------
    MUNICIPALITY
    ----------------------------------------------
    */

    if (
        jurisdiction.type ===
        "municipality"
    ) {

        if (
            !participant
                .eligibility
                .municipality
        ) {

            return createEligibilityResult(
                false,
                participant
                    .messages
                    .municipality
            );

        }


        const eligible =
            participant.stateCode ===
                jurisdiction.stateCode &&
            normalizeComparisonText(
                participant.municipality
            ) ===
            normalizeComparisonText(
                jurisdiction.municipality
            );


        return createEligibilityResult(

            eligible,

            eligible
                ? ""
                : "Read only — voting is limited to residents of this municipality."

        );

    }


    return createEligibilityResult(
        false,
        "Voting eligibility could not be determined."
    );

}


/*
==================================================
ELIGIBILITY RESULT
==================================================
*/

function createEligibilityResult(
    eligible,
    message
) {

    return {

        eligible:
            eligible ===
            true,

        readOnly:
            eligible !==
            true,

        reason:
            eligible
                ? "eligible"
                : "outside-jurisdiction",

        message:
            String(
                message || ""
            )

    };

}


/*
==================================================
EMPTY RESULT
==================================================
*/

function createEmptyResult(
    status,
    message
) {

    return {

        zipCode: "",

        stateCode: "",

        congressionalDistrict: "",

        municipality: "",

        congressionalDistricts: [],

        municipalities: [],

        districtRatios: {},

        stateResolved:
            false,

        districtResolved:
            false,

        districtAmbiguous:
            false,

        municipalityResolved:
            false,

        municipalityAmbiguous:
            false,

        eligibility: {

            national:
                true,

            state:
                false,

            congressionalDistrict:
                false,

            municipality:
                false

        },

        messages: {

            state:
                String(
                    message || ""
                ),

            congressionalDistrict:
                String(
                    message || ""
                ),

            municipality:
                String(
                    message || ""
                )

        },

        resolved:
            false,

        status:
            String(
                status || ""
            )

    };

}


/*
==================================================
ZIP CODE
==================================================
*/

function normalizeZipCode(
    value
) {

    const zipCode =
        String(
            value || ""
        )
            .trim();


    const match =
        zipCode.match(
            /^(\d{5})(?:-\d{4})?$/
        );


    if (!match) {

        return "";

    }


    return match[
        1
    ];

}


/*
==================================================
STATE CODE
==================================================
*/

function normalizeStateCode(
    value
) {

    const stateCode =
        String(
            value || ""
        )
            .trim()
            .toUpperCase();


    if (
        !/^[A-Z]{2}$/.test(
            stateCode
        )
    ) {

        return "";

    }


    return stateCode;

}


/*
==================================================
DISTRICT
==================================================
*/

function normalizeDistrict(
    value
) {

    const district =
        String(
            value ?? ""
        ).trim();


    if (!district) {

        return "";

    }


    if (
        district
            .toLowerCase() ===
        "at-large"
    ) {

        return "At-Large";

    }


    const districtNumber =
        Number(
            district
        );


    if (
        !Number.isInteger(
            districtNumber
        ) ||
        districtNumber <
            1
    ) {

        return "";

    }


    return String(
        districtNumber
    );

}


/*
==================================================
COMPARISON TEXT
==================================================
*/

function normalizeComparisonText(
    value
) {

    return String(
        value || ""
    )
        .trim()
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        );

}