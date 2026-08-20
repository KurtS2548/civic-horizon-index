/*
==================================================
CIVIC HORIZON INDEX V2
JURISDICTION SERVICE
==================================================

Purpose:

Provide one consistent geographic eligibility layer
for Civic Horizon voting.

Core rule:

Everyone may VIEW public civic information.

A participant may VOTE only when the geographic
jurisdiction associated with their account matches
the jurisdiction required by the poll or official.

Supported jurisdiction levels:

- National
- State
- Congressional District
- Municipality

ZIP code is used to resolve geographic eligibility.

IMPORTANT:

ZIP code itself is not treated as the final
jurisdiction when a ZIP crosses congressional or
municipal boundaries. Those cases must be resolved
before voting is enabled.
==================================================
*/


/*
==================================================
SUPPORTED JURISDICTION TYPES
==================================================
*/

const supportedJurisdictionTypes = [

    "national",

    "state",

    "congressional-district",

    "municipality"

];


/*
==================================================
CREATE PARTICIPANT JURISDICTION
==================================================

Creates the normalized geographic information that
other services can use when checking eligibility.

Expected participant geography example:

{
    zipCode: "07000",
    stateCode: "NJ",
    congressionalDistrict: "7",
    municipality: "Example Township",
    resolved: true
}
==================================================
*/

export function createParticipantJurisdiction(
    geography = {}
) {

    const zipCode =
        normalizeZipCode(
            geography.zipCode
        );


    const stateCode =
        normalizeStateCode(
            geography.stateCode
        );


    const congressionalDistrict =
        normalizeDistrict(
            geography.congressionalDistrict
        );


    const municipality =
        normalizeText(
            geography.municipality
        );


    const resolved =
        geography.resolved ===
            true;


    return {

        zipCode,

        stateCode,

        congressionalDistrict,

        municipality,

        resolved

    };

}


/*
==================================================
CHECK VOTING ELIGIBILITY
==================================================

Returns a structured result instead of only true or
false so the UI can display a simple explanation.

This is UI/service-level eligibility.

Firebase/database rules must still enforce the final
write permission.
==================================================
*/

export function checkJurisdictionEligibility(
    participantGeography,
    requiredJurisdiction
) {

    const participant =
        createParticipantJurisdiction(
            participantGeography
        );


    const jurisdiction =
        normalizeRequiredJurisdiction(
            requiredJurisdiction
        );


    /*
    ----------------------------------------------
    INVALID TARGET
    ----------------------------------------------
    */

    if (!jurisdiction) {

        return createEligibilityResult(
            false,
            "invalid-jurisdiction",
            "Voting eligibility could not be determined."
        );

    }


    /*
    ----------------------------------------------
    NATIONAL
    ----------------------------------------------

    Geographic restriction does not apply to a
    national jurisdiction.

    Other participation requirements such as
    authentication and account verification are
    handled separately.
    ----------------------------------------------
    */

    if (
        jurisdiction.type ===
        "national"
    ) {

        return createEligibilityResult(
            true,
            "eligible",
            ""
        );

    }


    /*
    ----------------------------------------------
    ZIP REQUIRED
    ----------------------------------------------
    */

    if (
        !participant.zipCode
    ) {

        return createEligibilityResult(
            false,
            "zip-required",
            "Add your ZIP code to your profile before voting."
        );

    }


    /*
    ----------------------------------------------
    STATE REQUIRED
    ----------------------------------------------
    */

    if (
        !participant.stateCode
    ) {

        return createEligibilityResult(
            false,
            "location-unresolved",
            "Your voting area must be confirmed before voting."
        );

    }


    /*
    ----------------------------------------------
    STATE MATCH
    ----------------------------------------------
    */

    if (
        jurisdiction.stateCode &&
        participant.stateCode !==
            jurisdiction.stateCode
    ) {

        return createEligibilityResult(
            false,
            "outside-jurisdiction",
            "Read only — voting is limited to constituents."
        );

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

        return createEligibilityResult(
            true,
            "eligible",
            ""
        );

    }


    /*
    ----------------------------------------------
    DISTRICT
    ----------------------------------------------
    */

    if (
        jurisdiction.type ===
        "congressional-district"
    ) {

        if (
            !participant.resolved ||
            !participant.congressionalDistrict
        ) {

            return createEligibilityResult(
                false,
                "district-unresolved",
                "Your congressional district must be confirmed before voting."
            );

        }


        if (
            participant.congressionalDistrict !==
            jurisdiction.district
        ) {

            return createEligibilityResult(
                false,
                "outside-jurisdiction",
                "Read only — voting is limited to constituents."
            );

        }


        return createEligibilityResult(
            true,
            "eligible",
            ""
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
            !participant.resolved ||
            !participant.municipality
        ) {

            return createEligibilityResult(
                false,
                "municipality-unresolved",
                "Your municipality must be confirmed before voting."
            );

        }


        if (
            normalizeComparisonText(
                participant.municipality
            ) !==
            normalizeComparisonText(
                jurisdiction.municipality
            )
        ) {

            return createEligibilityResult(
                false,
                "outside-jurisdiction",
                "Read only — voting is limited to constituents."
            );

        }


        return createEligibilityResult(
            true,
            "eligible",
            ""
        );

    }


    return createEligibilityResult(
        false,
        "invalid-jurisdiction",
        "Voting eligibility could not be determined."
    );

}


/*
==================================================
CAN VOTE
==================================================

Convenience helper when only a boolean is needed.
==================================================
*/

export function canVoteInJurisdiction(
    participantGeography,
    requiredJurisdiction
) {

    return checkJurisdictionEligibility(
        participantGeography,
        requiredJurisdiction
    ).eligible;

}


/*
==================================================
PUBLIC OFFICIAL ELIGIBILITY
==================================================

Uses the jurisdiction already stored on a normalized
public-official record.
==================================================
*/

export function checkPublicOfficialEligibility(
    participantGeography,
    official
) {

    if (
        !official ||
        typeof official !==
            "object" ||
        !official.jurisdiction
    ) {

        return createEligibilityResult(
            false,
            "invalid-official",
            "Voting eligibility could not be determined."
        );

    }


    return checkJurisdictionEligibility(
        participantGeography,
        official.jurisdiction
    );

}


/*
==================================================
POLL ELIGIBILITY
==================================================

Geographic polls can use the exact same jurisdiction
structure as public officials.

Example:

poll.jurisdiction = {
    type: "state",
    stateCode: "NJ"
}
==================================================
*/

export function checkPollJurisdictionEligibility(
    participantGeography,
    poll
) {

    if (
        !poll ||
        typeof poll !==
            "object" ||
        !poll.jurisdiction
    ) {

        return createEligibilityResult(
            false,
            "invalid-poll",
            "Voting eligibility could not be determined."
        );

    }


    return checkJurisdictionEligibility(
        participantGeography,
        poll.jurisdiction
    );

}


/*
==================================================
NORMALIZE REQUIRED JURISDICTION
==================================================
*/

function normalizeRequiredJurisdiction(
    jurisdiction
) {

    if (
        !jurisdiction ||
        typeof jurisdiction !==
            "object"
    ) {

        return null;

    }


    const type =
        normalizeJurisdictionType(
            jurisdiction.type
        );


    if (!type) {

        return null;

    }


    const stateCode =
        normalizeStateCode(
            jurisdiction.stateCode
        );


    const district =
        normalizeDistrict(
            jurisdiction.district
        );


    const municipality =
        normalizeText(
            jurisdiction.municipality
        );


    /*
    ----------------------------------------------
    NATIONAL
    ----------------------------------------------
    */

    if (
        type ===
        "national"
    ) {

        return {

            type,

            country:
                "US",

            stateCode:
                "",

            district:
                "",

            municipality:
                ""

        };

    }


    /*
    ----------------------------------------------
    STATE
    ----------------------------------------------
    */

    if (
        type ===
        "state"
    ) {

        if (!stateCode) {

            return null;

        }


        return {

            type,

            country:
                "US",

            stateCode,

            district:
                "",

            municipality:
                ""

        };

    }


    /*
    ----------------------------------------------
    CONGRESSIONAL DISTRICT
    ----------------------------------------------
    */

    if (
        type ===
        "congressional-district"
    ) {

        if (
            !stateCode ||
            !district
        ) {

            return null;

        }


        return {

            type,

            country:
                "US",

            stateCode,

            district,

            municipality:
                ""

        };

    }


    /*
    ----------------------------------------------
    MUNICIPALITY
    ----------------------------------------------
    */

    if (
        type ===
        "municipality"
    ) {

        if (
            !stateCode ||
            !municipality
        ) {

            return null;

        }


        return {

            type,

            country:
                "US",

            stateCode,

            district:
                "",

            municipality

        };

    }


    return null;

}


/*
==================================================
ELIGIBILITY RESULT
==================================================
*/

function createEligibilityResult(
    eligible,
    reason,
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
            String(
                reason || ""
            ),

        message:
            String(
                message || ""
            )

    };

}


/*
==================================================
JURISDICTION TYPE
==================================================
*/

function normalizeJurisdictionType(
    value
) {

    const type =
        String(
            value || ""
        )
            .trim()
            .toLowerCase();


    if (
        !supportedJurisdictionTypes.includes(
            type
        )
    ) {

        return "";

    }


    return type;

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