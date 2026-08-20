/*
==================================================
CIVIC HORIZON INDEX V2
PUBLIC OFFICIAL DATA SERVICE
==================================================

Purpose:

Read current public-official data through the shared
normalization layer.

Pages should request officials from this service
rather than importing raw data directly.
==================================================
*/


/*
==================================================
CURRENT DATA
==================================================
*/

import {

    currentPublicOfficials

} from "../data/public-officials-current.js";


/*
==================================================
NORMALIZER
==================================================
*/

import {

    normalizePublicOfficial

} from "./public-official-service.js";


/*
==================================================
GET STATE OFFICIALS
==================================================
*/

export function getStatePublicOfficials(
    stateCode
) {

    const normalizedStateCode =
        normalizeStateCode(
            stateCode
        );


    if (!normalizedStateCode) {

        return createEmptyStateResult();

    }


    const stateData =
        currentPublicOfficials[
            normalizedStateCode
        ];


    if (
        !stateData ||
        typeof stateData !==
            "object"
    ) {

        return {

            ...createEmptyStateResult(),

            stateCode:
                normalizedStateCode

        };

    }


    return {

        stateCode:
            normalizedStateCode,

        governor:
            normalizeSingleOfficial(
                stateData.governor
            ),

        senators:
            normalizeOfficialList(
                stateData.senators
            ),

        representatives:
            normalizeOfficialList(
                stateData.representatives
            ),

        mayors:
            normalizeOfficialList(
                stateData.mayors
            )

    };

}


/*
==================================================
GET GOVERNOR
==================================================
*/

export function getStateGovernor(
    stateCode
) {

    return getStatePublicOfficials(
        stateCode
    ).governor;

}


/*
==================================================
GET SENATORS
==================================================
*/

export function getStatePublicOfficialSenators(
    stateCode
) {

    return getStatePublicOfficials(
        stateCode
    ).senators;

}


/*
==================================================
GET REPRESENTATIVES
==================================================
*/

export function getStatePublicOfficialRepresentatives(
    stateCode
) {

    return getStatePublicOfficials(
        stateCode
    ).representatives;

}


/*
==================================================
GET HOUSE MEMBER BY DISTRICT
==================================================
*/

export function getPublicOfficialRepresentativeByDistrict(
    stateCode,
    district
) {

    const normalizedDistrict =
        normalizeDistrict(
            district
        );


    if (!normalizedDistrict) {

        return null;

    }


    const representatives =
        getStatePublicOfficialRepresentatives(
            stateCode
        );


    return (
        representatives.find(
            official =>
                official.district ===
                normalizedDistrict
        ) ||
        null
    );

}


/*
==================================================
GET MAYORS
==================================================
*/

export function getStateMayors(
    stateCode
) {

    return getStatePublicOfficials(
        stateCode
    ).mayors;

}


/*
==================================================
GET MAYOR BY MUNICIPALITY
==================================================
*/

export function getMayorByMunicipality(
    stateCode,
    municipality
) {

    const municipalityName =
        normalizeText(
            municipality
        )
            .toLowerCase();


    if (!municipalityName) {

        return null;

    }


    const mayors =
        getStateMayors(
            stateCode
        );


    return (
        mayors.find(
            official =>
                String(
                    official.municipality ||
                    ""
                )
                    .trim()
                    .toLowerCase() ===
                municipalityName
        ) ||
        null
    );

}


/*
==================================================
GET OFFICIAL BY ID
==================================================
*/

export function getPublicOfficialById(
    officialId
) {

    const normalizedId =
        normalizeIdentifier(
            officialId
        );


    if (!normalizedId) {

        return null;

    }


    for (
        const stateCode
        of Object.keys(
            currentPublicOfficials
        )
    ) {

        const officials =
            getAllStateOfficials(
                stateCode
            );


        const match =
            officials.find(
                official =>
                    official.id ===
                    normalizedId
            );


        if (match) {

            return match;

        }

    }


    return null;

}


/*
==================================================
GET OFFICIAL BY SEAT
==================================================
*/

export function getPublicOfficialBySeatKey(
    seatKey
) {

    const normalizedSeatKey =
        normalizeIdentifier(
            seatKey
        );


    if (!normalizedSeatKey) {

        return null;

    }


    for (
        const stateCode
        of Object.keys(
            currentPublicOfficials
        )
    ) {

        const officials =
            getAllStateOfficials(
                stateCode
            );


        const match =
            officials.find(
                official =>
                    official.seatKey ===
                    normalizedSeatKey
            );


        if (match) {

            return match;

        }

    }


    return null;

}


/*
==================================================
GET ALL OFFICIALS FOR STATE
==================================================
*/

export function getAllStateOfficials(
    stateCode
) {

    const stateOfficials =
        getStatePublicOfficials(
            stateCode
        );


    return [

        ...(stateOfficials.governor
            ? [
                stateOfficials.governor
            ]
            : []),

        ...stateOfficials.senators,

        ...stateOfficials.representatives,

        ...stateOfficials.mayors

    ];

}


/*
==================================================
NORMALIZE SINGLE OFFICIAL
==================================================
*/

function normalizeSingleOfficial(
    official
) {

    if (!official) {

        return null;

    }


    return normalizePublicOfficial(
        official
    );

}


/*
==================================================
NORMALIZE OFFICIAL LIST
==================================================
*/

function normalizeOfficialList(
    officials
) {

    if (
        !Array.isArray(
            officials
        )
    ) {

        return [];

    }


    return officials
        .map(
            official =>
                normalizePublicOfficial(
                    official
                )
        )
        .filter(
            Boolean
        );

}


/*
==================================================
EMPTY RESULT
==================================================
*/

function createEmptyStateResult() {

    return {

        stateCode: "",

        governor: null,

        senators: [],

        representatives: [],

        mayors: []

    };

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
        districtNumber < 1
    ) {

        return "";

    }


    return String(
        districtNumber
    );

}


/*
==================================================
IDENTIFIER
==================================================
*/

function normalizeIdentifier(
    value
) {

    const identifier =
        String(
            value || ""
        )
            .trim()
            .toLowerCase();


    if (
        !/^[a-z0-9-]+$/.test(
            identifier
        )
    ) {

        return "";

    }


    return identifier;

}


/*
==================================================
TEXT
==================================================
*/

function normalizeText(
    value
) {

    return String(
        value || ""
    ).trim();

}