/*
==================================================
CIVIC HORIZON INDEX V2
CONGRESS SERVICE
==================================================

Purpose:

Keep congressional officeholder data separate from
state-page logic and approval voting.

Election updates should happen in the congressional
data file rather than inside this service.
==================================================
*/


/*
==================================================
CURRENT CONGRESSIONAL DATA
==================================================
*/

import {

    currentCongress

} from "../data/congress-current.js";


/*
==================================================
CONGRESSIONAL DATA SOURCE
==================================================
*/

const congressionalData =
    currentCongress;


/*
==================================================
GET STATE DELEGATION
==================================================
*/

export function getStateCongressionalDelegation(
    stateCode
) {

    const normalizedStateCode =
        normalizeStateCode(
            stateCode
        );


    if (!normalizedStateCode) {

        return {

            stateCode: "",

            senators: [],

            representatives: []

        };

    }


    const stateData =
        congressionalData[
            normalizedStateCode
        ] || {};


    return {

        stateCode:
            normalizedStateCode,

        senators:
            normalizeMembers(
                stateData.senators
            ),

        representatives:
            normalizeMembers(
                stateData.representatives
            )

    };

}


/*
==================================================
GET STATE SENATORS
==================================================
*/

export function getStateSenators(
    stateCode
) {

    return getStateCongressionalDelegation(
        stateCode
    ).senators;

}


/*
==================================================
GET STATE HOUSE MEMBERS
==================================================
*/

export function getStateRepresentatives(
    stateCode
) {

    return getStateCongressionalDelegation(
        stateCode
    ).representatives;

}


/*
==================================================
GET HOUSE MEMBER BY DISTRICT
==================================================
*/

export function getHouseRepresentativeByDistrict(
    stateCode,
    district
) {

    const representatives =
        getStateRepresentatives(
            stateCode
        );


    const normalizedDistrict =
        normalizeDistrict(
            district
        );


    if (!normalizedDistrict) {

        return null;

    }


    return (
        representatives.find(
            member =>
                member.district ===
                normalizedDistrict
        ) ||
        null
    );

}


/*
==================================================
GET MEMBER BY ID
==================================================
*/

export function getCongressionalMemberById(
    memberId
) {

    const cleanMemberId =
        String(
            memberId || ""
        )
            .trim()
            .toLowerCase();


    if (!cleanMemberId) {

        return null;

    }


    for (
        const stateCode
        of Object.keys(
            congressionalData
        )
    ) {

        const delegation =
            getStateCongressionalDelegation(
                stateCode
            );


        const members = [

            ...delegation.senators,

            ...delegation.representatives

        ];


        const member =
            members.find(
                item =>
                    item.id ===
                    cleanMemberId
            );


        if (member) {

            return member;

        }

    }


    return null;

}


/*
==================================================
NORMALIZE MEMBER COLLECTION
==================================================
*/

function normalizeMembers(
    members
) {

    if (
        !Array.isArray(
            members
        )
    ) {

        return [];

    }


    return members
        .map(
            normalizeMember
        )
        .filter(
            Boolean
        );

}


/*
==================================================
NORMALIZE MEMBER
==================================================
*/

function normalizeMember(
    member
) {

    if (
        !member ||
        typeof member !==
            "object"
    ) {

        return null;

    }


    const id =
        normalizeMemberId(
            member.id
        );


    const name =
        String(
            member.name || ""
        ).trim();


    const chamber =
        normalizeChamber(
            member.chamber
        );


    const stateCode =
        normalizeStateCode(
            member.stateCode
        );


    if (
        !id ||
        !name ||
        !chamber ||
        !stateCode
    ) {

        return null;

    }


    const district =
        chamber ===
            "house"
            ? normalizeDistrict(
                member.district
            )
            : null;


    /*
    ----------------------------------------------
    SEAT KEY

    The seat key identifies the OFFICE rather than
    the person.

    Examples:

    nj-senate-1
    nj-senate-2
    nj-house-7

    If the data file already contains a seatKey,
    use it.

    Otherwise generate a stable one from the state,
    chamber and district/seat position information.
    ----------------------------------------------
    */

    const seatKey =
        normalizeSeatKey(
            member.seatKey
        ) ||
        createFallbackSeatKey(
            member,
            stateCode,
            chamber,
            district
        );


    if (!seatKey) {

        console.error(
            "Congressional member is missing a valid seat key:",
            member
        );

        return null;

    }


    const servingSince =
        normalizeDate(
            member.servingSince
        );


    const currentTermBegan =
        normalizeDate(
            member.currentTermBegan
        );


    return {

        id,

        seatKey,

        name,

        chamber,

        stateCode,

        district,

        servingSince,

        currentTermBegan,

        officeLabel:
            createOfficeLabel(
                chamber,
                stateCode,
                district
            ),

        servingSinceLabel:
            formatDate(
                servingSince
            ),

        currentTermBeganLabel:
            formatDate(
                currentTermBegan
            ),

        timeInOffice:
            calculateTimeInOffice(
                servingSince
            )

    };

}


/*
==================================================
MEMBER ID NORMALIZATION
==================================================
*/

function normalizeMemberId(
    value
) {

    const memberId =
        String(
            value || ""
        )
            .trim()
            .toLowerCase();


    if (
        !/^[a-z0-9-]+$/.test(
            memberId
        )
    ) {

        return "";

    }


    return memberId;

}


/*
==================================================
SEAT KEY NORMALIZATION
==================================================
*/

function normalizeSeatKey(
    value
) {

    const seatKey =
        String(
            value || ""
        )
            .trim()
            .toLowerCase();


    if (!seatKey) {

        return "";

    }


    if (
        !/^[a-z0-9-]+$/.test(
            seatKey
        )
    ) {

        return "";

    }


    return seatKey;

}


/*
==================================================
CREATE FALLBACK SEAT KEY
==================================================

This gives existing congressional data a safe seat
identifier even before seatKey is manually added to
every member in congress-current.js.

For House seats the district gives us a naturally
stable office identifier.

For Senate seats, the member's current ID is used
only as a temporary fallback unless the data file
provides an explicit seatKey.

As we maintain congressional data going forward,
Senate records should contain explicit seatKey
values so election changes do not change the seat.
==================================================
*/

function createFallbackSeatKey(
    member,
    stateCode,
    chamber,
    district
) {

    const state =
        stateCode
            .toLowerCase();


    if (
        chamber ===
        "house"
    ) {

        if (
            district ===
            "At-Large"
        ) {

            return `${state}-house-at-large`;

        }


        if (district) {

            return `${state}-house-${district}`;

        }


        return "";

    }


    if (
        chamber ===
        "senate"
    ) {

        const explicitSeat =
            String(
                member.senateSeat || ""
            )
                .trim()
                .toLowerCase();


        if (
            explicitSeat &&
            /^[a-z0-9-]+$/.test(
                explicitSeat
            )
        ) {

            return `${state}-senate-${explicitSeat}`;

        }


        /*
        Temporary compatibility fallback.

        This prevents existing records from
        disappearing while we transition the data
        file to permanent Senate seat keys.
        */

        const memberId =
            normalizeMemberId(
                member.id
            );


        if (memberId) {

            return `${state}-senate-${memberId}`;

        }

    }


    return "";

}


/*
==================================================
CHAMBER NORMALIZATION
==================================================
*/

function normalizeChamber(
    value
) {

    const chamber =
        String(
            value || ""
        )
            .trim()
            .toLowerCase();


    if (
        chamber ===
        "senate"
    ) {

        return "senate";

    }


    if (
        chamber ===
        "house"
    ) {

        return "house";

    }


    return "";

}


/*
==================================================
STATE NORMALIZATION
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
DISTRICT NORMALIZATION
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
        district.toLowerCase() ===
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
DATE NORMALIZATION
==================================================
*/

function normalizeDate(
    value
) {

    if (!value) {

        return "";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date
        .toISOString()
        .slice(
            0,
            10
        );

}


/*
==================================================
DATE DISPLAY
==================================================
*/

function formatDate(
    dateValue
) {

    if (!dateValue) {

        return "Unavailable";

    }


    const [
        year,
        month,
        day
    ] =
        dateValue
            .split("-")
            .map(
                Number
            );


    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day
            )
        );


    return date
        .toLocaleDateString(
            "en-US",
            {

                month:
                    "long",

                day:
                    "numeric",

                year:
                    "numeric",

                timeZone:
                    "UTC"

            }
        );

}


/*
==================================================
TIME IN OFFICE
==================================================
*/

export function calculateTimeInOffice(
    servingSince
) {

    if (!servingSince) {

        return {

            years: 0,

            months: 0,

            label:
                "Unavailable"

        };

    }


    const startDate =
        new Date(
            `${servingSince}T00:00:00Z`
        );


    if (
        Number.isNaN(
            startDate.getTime()
        )
    ) {

        return {

            years: 0,

            months: 0,

            label:
                "Unavailable"

        };

    }


    const today =
        new Date();


    let totalMonths =
        (
            today.getUTCFullYear() -
            startDate.getUTCFullYear()
        ) * 12;


    totalMonths +=
        today.getUTCMonth() -
        startDate.getUTCMonth();


    if (
        today.getUTCDate() <
        startDate.getUTCDate()
    ) {

        totalMonths -=
            1;

    }


    totalMonths =
        Math.max(
            0,
            totalMonths
        );


    const years =
        Math.floor(
            totalMonths /
            12
        );


    const months =
        totalMonths %
        12;


    return {

        years,

        months,

        label:
            createTimeInOfficeLabel(
                years,
                months
            )

    };

}


/*
==================================================
TIME IN OFFICE LABEL
==================================================
*/

function createTimeInOfficeLabel(
    years,
    months
) {

    const parts =
        [];


    if (
        years >
        0
    ) {

        parts.push(
            `${years} ${
                years ===
                    1
                    ? "year"
                    : "years"
            }`
        );

    }


    if (
        months >
        0
    ) {

        parts.push(
            `${months} ${
                months ===
                    1
                    ? "month"
                    : "months"
            }`
        );

    }


    if (
        parts.length ===
        0
    ) {

        return "Less than 1 month";

    }


    return parts.join(
        ", "
    );

}


/*
==================================================
OFFICE LABEL
==================================================
*/

function createOfficeLabel(
    chamber,
    stateCode,
    district
) {

    if (
        chamber ===
        "senate"
    ) {

        return (
            `U.S. Senator — ${stateCode}`
        );

    }


    if (
        chamber ===
        "house"
    ) {

        if (
            district ===
            "At-Large"
        ) {

            return (
                `U.S. Representative — ${stateCode} At-Large`
            );

        }


        return (
            `U.S. Representative — ${stateCode} District ${district}`
        );

    }


    return "";

}