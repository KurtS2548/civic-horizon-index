/*
==================================================
CIVIC HORIZON INDEX V2
ZIP RESOLUTION SERVICE
==================================================

Purpose:

Resolve a participant ZIP code into the geographic
information needed for voting eligibility.

CORE RULE:

Voting may be enabled only when the participant's
ZIP uniquely resolves the required jurisdiction.

We do NOT allow a participant to manually choose
between multiple congressional districts based only
on ZIP code.

If a ZIP overlaps multiple districts, House voting
remains read-only.

This keeps geographic voting simple and difficult
to manipulate.
==================================================
*/


/*
==================================================
ZIP DATA
==================================================
*/

import {

    zipJurisdictions

} from "../data/zip-jurisdictions.js";


/*
==================================================
RESOLVE ZIP
==================================================
*/

export function resolveZipJurisdiction(
    zipCode
) {

    const normalizedZip =
        normalizeZipCode(
            zipCode
        );


    if (!normalizedZip) {

        return createUnresolvedResult(
            "",
            "invalid-zip",
            "Enter a valid 5-digit ZIP code."
        );

    }


    const record =
        zipJurisdictions[
            normalizedZip
        ];


    if (!record) {

        return createUnresolvedResult(
            normalizedZip,
            "zip-not-found",
            "Voting-area information is not available for this ZIP code yet."
        );

    }


    const stateCode =
        normalizeStateCode(
            record.stateCode
        );


    if (!stateCode) {

        return createUnresolvedResult(
            normalizedZip,
            "state-unresolved",
            "The state for this ZIP code could not be confirmed."
        );

    }


    const congressionalDistricts =
        normalizeDistrictList(
            record.congressionalDistricts
        );


    const municipalities =
        normalizeMunicipalityList(
            record.municipalities
        );


    /*
    ----------------------------------------------
    CONGRESSIONAL DISTRICT

    Only resolve automatically when exactly one
    district exists for the ZIP.
    ----------------------------------------------
    */

    const congressionalDistrict =
        congressionalDistricts.length ===
            1
            ? congressionalDistricts[0]
            : "";


    const districtResolved =
        congressionalDistricts.length ===
            1;


    const districtAmbiguous =
        congressionalDistricts.length >
            1;


    /*
    ----------------------------------------------
    MUNICIPALITY

    Municipality data is not yet populated.

    When it is added, the same rule applies:
    only one unique municipality may resolve
    automatically.
    ----------------------------------------------
    */

    const municipality =
        municipalities.length ===
            1
            ? municipalities[0]
            : "";


    const municipalityResolved =
        municipalities.length ===
            1;


    const municipalityAmbiguous =
        municipalities.length >
            1;


    return {

        zipCode:
            normalizedZip,

        stateCode,

        congressionalDistrict,

        municipality,

        congressionalDistricts,

        municipalities,

municipalityGeoids:
    normalizeMunicipalityGeoids(
        record.municipalityGeoids
    ),

districtRatios:
    normalizeDistrictRatios(
        record.districtRatios
    ),

        stateResolved:
            true,

        districtResolved,

        districtAmbiguous,

        municipalityResolved,

        municipalityAmbiguous,

        /*
        Full resolution is intentionally strict.

        State-level voting can still work even when
        this value is false.
        */

        resolved:
            districtResolved &&
            municipalityResolved,

        status:
            createResolutionStatus(
                congressionalDistricts,
                municipalities
            )

    };

}


/*
==================================================
STATE ELIGIBILITY
==================================================
*/

export function isStateResolved(
    resolution
) {

    return Boolean(

        resolution &&

        resolution.stateResolved &&

        resolution.stateCode

    );

}


/*
==================================================
DISTRICT ELIGIBILITY
==================================================
*/

export function isDistrictResolved(
    resolution
) {

    return Boolean(

        resolution &&

        resolution.stateResolved &&

        resolution.districtResolved &&

        !resolution.districtAmbiguous &&

        resolution.congressionalDistrict

    );

}


/*
==================================================
MUNICIPALITY ELIGIBILITY
==================================================
*/

export function isMunicipalityResolved(
    resolution
) {

    return Boolean(

        resolution &&

        resolution.stateResolved &&

        resolution.municipalityResolved &&

        !resolution.municipalityAmbiguous &&

        resolution.municipality

    );

}


/*
==================================================
DISTRICT READ-ONLY STATUS
==================================================
*/

export function isDistrictReadOnly(
    resolution
) {

    if (
        !resolution
    ) {

        return true;

    }


    return (
        !isDistrictResolved(
            resolution
        )
    );

}


/*
==================================================
MUNICIPALITY READ-ONLY STATUS
==================================================
*/

export function isMunicipalityReadOnly(
    resolution
) {

    if (
        !resolution
    ) {

        return true;

    }


    return (
        !isMunicipalityResolved(
            resolution
        )
    );

}


/*
==================================================
GET DISTRICT MESSAGE
==================================================
*/

export function getDistrictEligibilityMessage(
    resolution
) {

    if (
        !resolution
    ) {

        return (
            "House voting eligibility could not be determined."
        );

    }


    if (
        resolution.districtAmbiguous
    ) {

        return (
            "Read only — this ZIP overlaps more than one congressional district."
        );

    }


    if (
        !resolution.districtResolved
    ) {

        return (
            "Read only — a congressional district could not be confirmed for this ZIP."
        );

    }


    return "";

}


/*
==================================================
GET MUNICIPALITY MESSAGE
==================================================
*/

export function getMunicipalityEligibilityMessage(
    resolution
) {

    if (
        !resolution
    ) {

        return (
            "Mayor voting eligibility could not be determined."
        );

    }


    if (
        resolution.municipalityAmbiguous
    ) {

        return (
            "Read only — this ZIP overlaps more than one municipality."
        );

    }


    if (
        !resolution.municipalityResolved
    ) {

        return (
            "Read only — a municipality could not be confirmed for this ZIP."
        );

    }


    return "";

}


/*
==================================================
RESOLUTION STATUS
==================================================
*/

function createResolutionStatus(
    districts,
    municipalities
) {

    const districtCount =
        districts.length;


    const municipalityCount =
        municipalities.length;


    if (
        districtCount >
            1 &&
        municipalityCount >
            1
    ) {

        return "district-and-municipality-ambiguous";

    }


    if (
        districtCount >
        1
    ) {

        return "district-ambiguous";

    }


    if (
        municipalityCount >
        1
    ) {

        return "municipality-ambiguous";

    }


    if (
        districtCount ===
            0
    ) {

        return "district-unavailable";

    }


    if (
        municipalityCount ===
            0
    ) {

        return "municipality-unavailable";

    }


    if (
        districtCount ===
            1 &&
        municipalityCount ===
            1
    ) {

        return "resolved";

    }


    return "partially-resolved";

}


/*
==================================================
UNRESOLVED RESULT
==================================================
*/

function createUnresolvedResult(
    zipCode,
    status,
    message
) {

    return {

        zipCode:
            String(
                zipCode || ""
            ),

        stateCode:
            "",

        congressionalDistrict:
            "",

        municipality:
            "",

        congressionalDistricts:
            [],

        municipalities:
            [],

        districtRatios:
            {},

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

        resolved:
            false,

        status:
            String(
                status || ""
            ),

        message:
            String(
                message || ""
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


    return match[1];

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
DISTRICT LIST
==================================================
*/

function normalizeDistrictList(
    values
) {

    if (
        !Array.isArray(
            values
        )
    ) {

        return [];

    }


    return Array
        .from(
            new Set(
                values
                    .map(
                        normalizeDistrict
                    )
                    .filter(
                        Boolean
                    )
            )
        )
        .sort(
            compareDistricts
        );

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
DISTRICT RATIOS
==================================================
*/

function normalizeDistrictRatios(
    values
) {

    if (
        !values ||
        typeof values !==
            "object"
    ) {

        return {};

    }


    const result =
        {};


    Object
        .entries(
            values
        )
        .forEach(
            (
                [
                    district,
                    ratio
                ]
            ) => {

                const normalizedDistrict =
                    normalizeDistrict(
                        district
                    );


                const normalizedRatio =
                    Number(
                        ratio
                    );


                if (
                    !normalizedDistrict ||
                    !Number.isFinite(
                        normalizedRatio
                    )
                ) {

                    return;

                }


                result[
                    normalizedDistrict
                ] =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            normalizedRatio
                        )
                    );

            }
        );


    return result;

}


/*
==================================================
DISTRICT SORT
==================================================
*/

function compareDistricts(
    first,
    second
) {

    if (
        first ===
        "At-Large"
    ) {

        return -1;

    }


    if (
        second ===
        "At-Large"
    ) {

        return 1;

    }


    return (
        Number(
            first
        ) -
        Number(
            second
        )
    );

}


/*
==================================================
MUNICIPALITY LIST
==================================================
*/

function normalizeMunicipalityList(
    values
) {

    if (
        !Array.isArray(
            values
        )
    ) {

        return [];

    }


    const unique =
        new Map();


    values.forEach(
        value => {

            const cleaned =
                normalizeText(
                    value
                );


            if (!cleaned) {

                return;

            }


            unique.set(
                normalizeComparisonText(
                    cleaned
                ),
                cleaned
            );

        }
    );


    return Array
        .from(
            unique.values()
        )
        .sort(
            (
                first,
                second
            ) =>
                first.localeCompare(
                    second
                )
        );

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


/*
==================================================
COMPARISON TEXT
==================================================
*/

function normalizeComparisonText(
    value
) {

    return normalizeText(
        value
    )
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        );

}
/*
==================================================
MUNICIPALITY GEOIDS
==================================================
*/

function normalizeMunicipalityGeoids(
    values
) {

    if (
        !values ||
        typeof values !==
            "object"
    ) {

        return {};

    }


    const result =
        {};


    Object
        .entries(
            values
        )
        .forEach(
            (
                [
                    municipalityName,
                    geoid
                ]
            ) => {

                const normalizedName =
                    normalizeText(
                        municipalityName
                    );


                const normalizedGeoid =
                    String(
                        geoid ||
                        ""
                    ).trim();


                if (
                    !normalizedName ||
                    !normalizedGeoid
                ) {

                    return;

                }


                result[
                    normalizedName
                ] =
                    normalizedGeoid;

            }
        );


    return result;

}