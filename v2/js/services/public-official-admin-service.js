/*
==================================================
CIVIC HORIZON INDEX V2
PUBLIC OFFICIAL ADMIN SERVICE
==================================================

Purpose:

Allow the secure Admin Center to manage current
officeholders without editing the nationwide
source-data file.

The nationwide JavaScript data remains the
baseline.

Firebase stores only administrator overrides.

==================================================
*/


/*
==================================================
FIREBASE
==================================================
*/

import {

    database

} from "../../../js/firebase.js";


import {

    ref,
    get,
    set,
    remove,
    onValue

} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/*
==================================================
BASELINE OFFICIAL DATA
==================================================
*/

import {

    currentPublicOfficials

} from "../data/public-officials-current.js";

import {

    normalizePublicOfficial

} from "./public-official-service.js";

/*
==================================================
GET STATE OFFICIALS FOR ADMIN
==================================================
*/

export async function getAdminStateOfficials(
    stateCode
) {

    const cleanStateCode =
        validateStateCode(
            stateCode
        );


    const stateData =
        currentPublicOfficials[
            cleanStateCode
        ];


    if (
        !stateData ||
        typeof stateData !==
            "object"
    ) {

        return {

            stateCode:
                cleanStateCode,

            governor:
                null,

            senators:
                [],

            representatives:
                []

        };

    }


    let overrides =
        {};


    try {

        overrides =
            await getAllOfficialOverrides();

    } catch (error) {

        /*
        ----------------------------------------------
        IMPORTANT

        Admin should still display baseline officials
        even if Firebase override reads are unavailable.
        ----------------------------------------------
        */

        console.warn(
            "Official overrides could not be loaded. Using baseline data.",
            error
        );

    }


    return {

        stateCode:
            cleanStateCode,

        governor:
            stateData.governor
                ? applyOverride(
                    stateData.governor,
                    overrides[
                        stateData.governor
                            .seatKey
                    ]
                )
                : null,

        senators:
            Array.isArray(
                stateData.senators
            )
                ? stateData.senators.map(
                    official =>
                        applyOverride(
                            official,
                            overrides[
                                official.seatKey
                            ]
                        )
                )
                : [],

        representatives:
            Array.isArray(
                stateData.representatives
            )
                ? stateData
                    .representatives
                    .map(
                        official =>
                            applyOverride(
                                official,
                                overrides[
                                    official.seatKey
                                ]
                            )
                    )
                : []

    };

}

/*
==================================================
GET CURRENT STATE OFFICIALS
==================================================
*/

export async function getCurrentStateOfficials(
    stateCode
) {

    const officials =
        await getAdminStateOfficials(
            stateCode
        );


    return {

        stateCode:
            officials.stateCode,

        governor:
            officials.governor
                ? normalizePublicOfficial(
                    officials.governor
                )
                : null,

        senators:
            officials.senators
                .map(
                    official =>
                        normalizePublicOfficial(
                            official
                        )
                )
                .filter(
                    Boolean
                ),

        representatives:
            officials.representatives
                .map(
                    official =>
                        normalizePublicOfficial(
                            official
                        )
                )
                .filter(
                    Boolean
                )

    };

}


/*
==================================================
SUBSCRIBE TO OVERRIDES
==================================================
*/

export function subscribeToOfficialOverrides(
    callback,
    errorCallback = console.error
) {

    if (
        typeof callback !==
        "function"
    ) {

        throw new Error(
            "An official override callback is required."
        );

    }


    return onValue(

        ref(
            database,
            "publicOfficialOverrides"
        ),

        snapshot => {

            callback(
                snapshot.exists()
                    ? snapshot.val() || {}
                    : {}
            );

        },

        errorCallback

    );

}


/*
==================================================
GET ALL OVERRIDES
==================================================
*/

export async function getAllOfficialOverrides() {

    const snapshot =
        await get(

            ref(
                database,
                "publicOfficialOverrides"
            )

        );


    if (
        !snapshot.exists()
    ) {

        return {};

    }


    const value =
        snapshot.val();


    if (
        !value ||
        typeof value !==
            "object"
    ) {

        return {};

    }


    return value;

}


/*
==================================================
GET ONE OVERRIDE
==================================================
*/

export async function getOfficialOverride(
    seatKey
) {

    const cleanSeatKey =
        validateSeatKey(
            seatKey
        );


    const snapshot =
        await get(

            ref(
                database,
                `publicOfficialOverrides/${cleanSeatKey}`
            )

        );


    if (
        !snapshot.exists()
    ) {

        return null;

    }


    const value =
        snapshot.val();


    return (
        value &&
        typeof value ===
            "object"
            ? value
            : null
    );

}


/*
==================================================
GET OFFICIAL FOR ADMIN
==================================================
*/

export async function getAdminOfficialBySeatKey(
    seatKey
) {

    const cleanSeatKey =
        validateSeatKey(
            seatKey
        );


    const baseline =
        findBaselineOfficialBySeatKey(
            cleanSeatKey
        );


    if (!baseline) {

        return null;

    }


    let override =
        null;


    try {

        override =
            await getOfficialOverride(
                cleanSeatKey
            );

    } catch (error) {

        console.warn(
            "Official override could not be loaded.",
            error
        );

    }


    return applyOverride(
        baseline,
        override
    );

}


/*
==================================================
SAVE OFFICIAL OVERRIDE
==================================================
*/

export async function saveOfficialOverride(
    seatKey,
    values
) {

    const cleanSeatKey =
        validateSeatKey(
            seatKey
        );


    const baseline =
        findBaselineOfficialBySeatKey(
            cleanSeatKey
        );


    if (!baseline) {

        throw new Error(
            "The selected public office could not be found."
        );

    }


    if (
        !values ||
        typeof values !==
            "object"
    ) {

        throw new Error(
            "Official update data is required."
        );

    }


    const record = {

    seatKey:
        cleanSeatKey,

    id:
        createOfficialId(
            baseline,
            values.name
        ),

    personKey:
        createPersonKey(
            values.name
        ),

    name:
        validateName(
            values.name
        ),

    party:
        validateParty(
            values.party
        ),

    servingSince:
        validateOptionalDate(
            values.servingSince
        ),

    currentTermBegan:
        validateOptionalDate(
            values.currentTermBegan
        ),

    sourceUrl:
        validateOptionalUrl(
            values.sourceUrl
        ),

    updatedAt:
        new Date()
            .toISOString()

};


    await set(

        ref(
            database,
            `publicOfficialOverrides/${cleanSeatKey}`
        ),

        record

    );


    return applyOverride(
        baseline,
        record
    );

}


/*
==================================================
REMOVE OFFICIAL OVERRIDE
==================================================
*/

export async function removeOfficialOverride(
    seatKey
) {

    const cleanSeatKey =
        validateSeatKey(
            seatKey
        );


    await remove(

        ref(
            database,
            `publicOfficialOverrides/${cleanSeatKey}`
        )

    );

}


/*
==================================================
FIND BASELINE OFFICIAL
==================================================
*/

function findBaselineOfficialBySeatKey(
    seatKey
) {

    for (
        const stateData
        of Object.values(
            currentPublicOfficials
        )
    ) {

        if (
            !stateData ||
            typeof stateData !==
                "object"
        ) {

            continue;

        }


        if (
            stateData.governor
                ?.seatKey ===
            seatKey
        ) {

            return stateData.governor;

        }


        const senators =
            Array.isArray(
                stateData.senators
            )
                ? stateData.senators
                : [];


        const senator =
            senators.find(
                official =>
                    official.seatKey ===
                    seatKey
            );


        if (senator) {

            return senator;

        }


        const representatives =
            Array.isArray(
                stateData
                    .representatives
            )
                ? stateData
                    .representatives
                : [];


        const representative =
            representatives.find(
                official =>
                    official.seatKey ===
                    seatKey
            );


        if (representative) {

            return representative;

        }

    }


    return null;

}


/*
==================================================
APPLY OVERRIDE
==================================================
*/

export function applyOfficialOverride(
    official,
    override
) {

    return applyOverride(
        official,
        override
    );

}


function applyOverride(
    official,
    override
) {

    if (
        !official ||
        typeof official !==
            "object"
    ) {

        return null;

    }


    if (
        !override ||
        typeof override !==
            "object"
    ) {

        return {

            ...official,

            hasAdminOverride:
                false

        };

    }


    const merged = {

    ...official,

    id:
        String(
            override.id ||
            official.id ||
            ""
        ),

    personKey:
        String(
            override.personKey ||
            official.personKey ||
            ""
        ),

    hasAdminOverride:
        true,

    adminOverrideUpdatedAt:
        String(
            override.updatedAt ||
            ""
        )

};


    if (
        typeof override.name ===
            "string" &&
        override.name.trim()
    ) {

        merged.name =
            override.name.trim();

    }


    const party =
        String(
            override.party ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        [
            "D",
            "R",
            "I",
            "OTHER"
        ].includes(
            party
        )
    ) {

        merged.party =
            party;

    }


    if (
        isValidDateString(
            override.servingSince
        )
    ) {

        merged.servingSince =
            override.servingSince;

    }


    if (
        isValidDateString(
            override.currentTermBegan
        )
    ) {

        merged.currentTermBegan =
            override.currentTermBegan;

    }


    const sourceUrl =
        normalizeOptionalUrl(
            override.sourceUrl
        );


    if (sourceUrl) {

        merged.sources = [

            {

                fact:
                    "officeholder",

                sourceName:
                    "Official government source",

                sourceUrl,

                verifiedAt:
                    new Date()
                        .toISOString()
                        .slice(
                            0,
                            10
                        )

            }

        ];

    }


    return merged;

}

/*
==================================================
PERSON KEY
==================================================
*/

function createPersonKey(
    name
) {

    return String(
        name || ""
    )
        .trim()
        .toLowerCase()
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );

}


/*
==================================================
OFFICIAL ID
==================================================
*/

function createOfficialId(
    baseline,
    name
) {

    const personKey =
        createPersonKey(
            name
        );


    if (!personKey) {

        throw new Error(
            "A valid official name is required."
        );

    }


    const stateCode =
        String(
            baseline.stateCode || ""
        )
            .trim()
            .toLowerCase();


    if (
        baseline.officeType ===
        "governor"
    ) {

        return `${stateCode}-gov-${personKey}`;

    }


    if (
        baseline.officeType ===
        "senator"
    ) {

        return `${stateCode}-sen-${personKey}`;

    }


    if (
        baseline.officeType ===
        "representative"
    ) {

        const district =
            String(
                baseline.district || ""
            )
                .trim()
                .toLowerCase()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                );


        return `${stateCode}-${district}-${personKey}`;

    }


    throw new Error(
        "Unsupported public office."
    );

}

/*
==================================================
STATE CODE
==================================================
*/

function validateStateCode(
    stateCode
) {

    const cleanStateCode =
        String(
            stateCode ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !/^[A-Z]{2}$/.test(
            cleanStateCode
        )
    ) {

        throw new Error(
            "A valid state is required."
        );

    }


    return cleanStateCode;

}


/*
==================================================
SEAT KEY
==================================================
*/

function validateSeatKey(
    seatKey
) {

    const cleanSeatKey =
        String(
            seatKey ||
            ""
        )
            .trim()
            .toLowerCase();


    if (
        !cleanSeatKey ||
        !/^[a-z0-9-]+$/.test(
            cleanSeatKey
        )
    ) {

        throw new Error(
            "A valid public-office seat is required."
        );

    }


    return cleanSeatKey;

}


/*
==================================================
NAME
==================================================
*/

function validateName(
    name
) {

    const cleanName =
        String(
            name ||
            ""
        ).trim();


    if (
        cleanName.length <
        2
    ) {

        throw new Error(
            "The official's name is required."
        );

    }


    if (
        cleanName.length >
        100
    ) {

        throw new Error(
            "The official's name cannot exceed 100 characters."
        );

    }


    return cleanName;

}


/*
==================================================
PARTY
==================================================
*/

function validateParty(
    party
) {

    const cleanParty =
        String(
            party ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        ![
            "D",
            "R",
            "I",
            "OTHER"
        ].includes(
            cleanParty
        )
    ) {

        throw new Error(
            "A valid political party is required."
        );

    }


    return cleanParty;

}


/*
==================================================
DATES
==================================================
*/

function validateOptionalDate(
    value
) {

    const cleanValue =
        String(
            value ||
            ""
        ).trim();


    if (!cleanValue) {

        return "";

    }


    if (
        !isValidDateString(
            cleanValue
        )
    ) {

        throw new Error(
            "A valid date is required."
        );

    }


    return cleanValue;

}


function isValidDateString(
    value
) {

    const cleanValue =
        String(
            value ||
            ""
        ).trim();


    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
            cleanValue
        )
    ) {

        return false;

    }


    const date =
        new Date(
            `${cleanValue}T00:00:00Z`
        );


    return (
        !Number.isNaN(
            date.getTime()
        ) &&
        date
            .toISOString()
            .slice(
                0,
                10
            ) ===
            cleanValue
    );

}


/*
==================================================
URL
==================================================
*/

function validateOptionalUrl(
    value
) {

    const original =
        String(
            value ||
            ""
        ).trim();


    const cleanUrl =
        normalizeOptionalUrl(
            original
        );


    if (
        original &&
        !cleanUrl
    ) {

        throw new Error(
            "The official source must be a valid http or https URL."
        );

    }


    return cleanUrl;

}


function normalizeOptionalUrl(
    value
) {

    const cleanValue =
        String(
            value ||
            ""
        ).trim();


    if (!cleanValue) {

        return "";

    }


    try {

        const parsed =
            new URL(
                cleanValue
            );


        if (
            parsed.protocol !==
                "https:" &&
            parsed.protocol !==
                "http:"
        ) {

            return "";

        }


        return parsed.href;


    } catch {

        return "";

    }

}