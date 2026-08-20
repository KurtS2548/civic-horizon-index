/*
==================================================
CIVIC HORIZON INDEX V2
PUBLIC OFFICIAL SERVICE
==================================================

Purpose:

Provide one clean, consistent data structure for
supported elected officials.

Supported offices:

- President
- U.S. Senator
- U.S. Representative
- Governor
- Mayor

This service handles:

- Office normalization
- Party information
- Jurisdiction information
- Service dates
- Source metadata
- Official-record metadata
- Financial-change metadata

Voting logic remains in a separate service.
==================================================
*/


/*
==================================================
SUPPORTED OFFICE TYPES
==================================================
*/

const supportedOfficeTypes = [

    "president",

    "senator",

    "representative",

    "governor",

    "mayor"

];


/*
==================================================
SUPPORTED PARTIES
==================================================
*/

const supportedParties = [

    "D",

    "R",

    "I",

    "OTHER"

];


/*
==================================================
NORMALIZE PUBLIC OFFICIAL
==================================================
*/

export function normalizePublicOfficial(
    official
) {

    if (
        !official ||
        typeof official !==
            "object"
    ) {

        return null;

    }


    const id =
        normalizeIdentifier(
            official.id
        );


    const personKey =
        normalizeIdentifier(
            official.personKey
        );


    const seatKey =
        normalizeIdentifier(
            official.seatKey
        );


    const name =
        normalizeText(
            official.name
        );


    const officeType =
        normalizeOfficeType(
            official.officeType
        );


    const party =
        normalizeParty(
            official.party
        );


    if (
        !id ||
        !personKey ||
        !seatKey ||
        !name ||
        !officeType
    ) {

        return null;

    }


    const stateCode =
        normalizeStateCode(
            official.stateCode
        );


    const district =
        normalizeDistrict(
            official.district
        );


    const municipality =
        normalizeText(
            official.municipality
        );


    const servingSince =
        normalizeDate(
            official.servingSince
        );


    const currentTermBegan =
        normalizeDate(
            official.currentTermBegan
        );


    const jurisdiction =
        normalizeJurisdiction(
            official.jurisdiction,
            officeType,
            stateCode,
            district,
            municipality
        );


    const sources =
        normalizeSources(
            official.sources
        );


    const officialRecord =
        normalizeOfficialRecord(
            official.officialRecord
        );


    const financialChange =
        normalizeFinancialChange(
            official.financialChange
        );


    return {

        id,

        personKey,

        seatKey,

        name,

        officeType,

        officeLabel:
            createOfficeLabel(
                officeType,
                stateCode,
                district,
                municipality
            ),

        party,

        partyLabel:
            createPartyLabel(
                party
            ),

        stateCode,

        district,

        municipality,

        jurisdiction,

        servingSince,

        servingSinceLabel:
            formatDate(
                servingSince
            ),

        currentTermBegan,

        currentTermBeganLabel:
            formatDate(
                currentTermBegan
            ),

        timeInOffice:
            calculateTimeInOffice(
                servingSince
            ),

        sources,

        officialRecord,

        financialChange

    };

}


/*
==================================================
OFFICE TYPE
==================================================
*/

function normalizeOfficeType(
    value
) {

    const officeType =
        String(
            value || ""
        )
            .trim()
            .toLowerCase();


    if (
        !supportedOfficeTypes.includes(
            officeType
        )
    ) {

        return "";

    }


    return officeType;

}


/*
==================================================
PARTY
==================================================
*/

function normalizeParty(
    value
) {

    const party =
        String(
            value || ""
        )
            .trim()
            .toUpperCase();


    if (
        supportedParties.includes(
            party
        )
    ) {

        return party;

    }


    return "OTHER";

}


/*
==================================================
PARTY LABEL
==================================================
*/

function createPartyLabel(
    party
) {

    if (
        party ===
        "D"
    ) {

        return "Democratic";

    }


    if (
        party ===
        "R"
    ) {

        return "Republican";

    }


    if (
        party ===
        "I"
    ) {

        return "Independent";

    }


    return "Other";

}


/*
==================================================
JURISDICTION
==================================================
*/

function normalizeJurisdiction(
    jurisdiction,
    officeType,
    stateCode,
    district,
    municipality
) {

    const suppliedJurisdiction =
        jurisdiction &&
        typeof jurisdiction ===
            "object"
            ? jurisdiction
            : {};


    const type =
        normalizeJurisdictionType(
            suppliedJurisdiction.type
        ) ||
        inferJurisdictionType(
            officeType
        );


    return {

        type,

        country:
            "US",

        stateCode:
            normalizeStateCode(
                suppliedJurisdiction.stateCode
            ) ||
            stateCode ||
            "",

        district:
            normalizeDistrict(
                suppliedJurisdiction.district
            ) ||
            district ||
            "",

        municipality:
            normalizeText(
                suppliedJurisdiction.municipality
            ) ||
            municipality ||
            ""

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


    const supportedTypes = [

        "national",

        "state",

        "congressional-district",

        "municipality"

    ];


    if (
        supportedTypes.includes(
            type
        )
    ) {

        return type;

    }


    return "";

}


/*
==================================================
INFER JURISDICTION
==================================================
*/

function inferJurisdictionType(
    officeType
) {

    if (
        officeType ===
        "president"
    ) {

        return "national";

    }


    if (
        officeType ===
        "senator" ||
        officeType ===
        "governor"
    ) {

        return "state";

    }


    if (
        officeType ===
        "representative"
    ) {

        return "congressional-district";

    }


    if (
        officeType ===
        "mayor"
    ) {

        return "municipality";

    }


    return "";

}


/*
==================================================
SOURCES
==================================================
*/

function normalizeSources(
    sources
) {

    if (
        !Array.isArray(
            sources
        )
    ) {

        return [];

    }


    return sources
        .map(
            source => {

                if (
                    !source ||
                    typeof source !==
                        "object"
                ) {

                    return null;

                }


                const fact =
                    normalizeText(
                        source.fact
                    );


                const sourceName =
                    normalizeText(
                        source.sourceName
                    );


                const sourceUrl =
                    normalizeUrl(
                        source.sourceUrl
                    );


                const verifiedAt =
                    normalizeDate(
                        source.verifiedAt
                    );


                if (
                    !fact ||
                    !sourceName ||
                    !sourceUrl
                ) {

                    return null;

                }


                return {

                    fact,

                    sourceName,

                    sourceUrl,

                    verifiedAt,

                    verifiedAtLabel:
                        formatDate(
                            verifiedAt
                        )

                };

            }
        )
        .filter(
            Boolean
        );

}


/*
==================================================
OFFICIAL RECORD
==================================================
*/

function normalizeOfficialRecord(
    record
) {

    if (
        !record ||
        typeof record !==
            "object"
    ) {

        return {

            available:
                false,

            recordType:
                "",

            sourceName:
                "",

            sourceUrl:
                ""

        };

    }


    const recordType =
        normalizeText(
            record.recordType
        );


    const sourceName =
        normalizeText(
            record.sourceName
        );


    const sourceUrl =
        normalizeUrl(
            record.sourceUrl
        );


    return {

        available:
            Boolean(
                recordType &&
                sourceName &&
                sourceUrl
            ),

        recordType,

        sourceName,

        sourceUrl

    };

}


/*
==================================================
FINANCIAL CHANGE
==================================================
*/

function normalizeFinancialChange(
    financialChange
) {

    if (
        !financialChange ||
        typeof financialChange !==
            "object"
    ) {

        return {

            available:
                false,

            display:
                "Unavailable",

            percentageLow:
                null,

            percentageHigh:
                null,

            methodologyUrl:
                "",

            sources:
                []

        };

    }


    const percentageLow =
        normalizePercentage(
            financialChange
                .percentageLow
        );


    const percentageHigh =
        normalizePercentage(
            financialChange
                .percentageHigh
        );


    const sources =
        normalizeSources(
            financialChange.sources
        );


    const methodologyUrl =
        normalizeUrl(
            financialChange
                .methodologyUrl
        );


    const available =
        percentageLow !==
            null ||
        percentageHigh !==
            null;


    return {

        available,

        display:
            createFinancialChangeLabel(
                percentageLow,
                percentageHigh
            ),

        percentageLow,

        percentageHigh,

        methodologyUrl,

        sources

    };

}


/*
==================================================
FINANCIAL CHANGE LABEL
==================================================
*/

function createFinancialChangeLabel(
    low,
    high
) {

    if (
        low === null &&
        high === null
    ) {

        return "Unavailable";

    }


    if (
        low !== null &&
        high !== null &&
        low !== high
    ) {

        return (
            `${formatSignedPercent(
                low
            )} to ${formatSignedPercent(
                high
            )}`
        );

    }


    const value =
        low !== null
            ? low
            : high;


    return formatSignedPercent(
        value
    );

}


/*
==================================================
PERCENTAGE HELPERS
==================================================
*/

function normalizePercentage(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return null;

    }


    return number;

}


function formatSignedPercent(
    value
) {

    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return "Unavailable";

    }


    const sign =
        number > 0
            ? "+"
            : "";


    return (
        `${sign}${number.toFixed(
            1
        )}%`
    );

}


/*
==================================================
OFFICE LABEL
==================================================
*/

function createOfficeLabel(
    officeType,
    stateCode,
    district,
    municipality
) {

    if (
        officeType ===
        "president"
    ) {

        return "President of the United States";

    }


    if (
        officeType ===
        "senator"
    ) {

        return (
            `U.S. Senator — ${stateCode}`
        );

    }


    if (
        officeType ===
        "representative"
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


    if (
        officeType ===
        "governor"
    ) {

        return (
            `Governor — ${stateCode}`
        );

    }


    if (
        officeType ===
        "mayor"
    ) {

        return municipality
            ? `Mayor — ${municipality}`
            : "Mayor";

    }


    return "";

}


/*
==================================================
TIME IN OFFICE
==================================================
*/

export function calculatePublicOfficialTimeInOffice(
    servingSince
) {

    return calculateTimeInOffice(
        servingSince
    );

}


function calculateTimeInOffice(
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


    const parts =
        [];


    if (
        years >
        0
    ) {

        parts.push(
            `${years} ${
                years === 1
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
                months === 1
                    ? "month"
                    : "months"
            }`
        );

    }


    return {

        years,

        months,

        label:
            parts.length >
                0
                ? parts.join(
                    ", "
                )
                : "Less than 1 month"

    };

}


/*
==================================================
DATE
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


function formatDate(
    value
) {

    if (!value) {

        return "Unavailable";

    }


    const [
        year,
        month,
        day
    ] =
        value
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
        !stateCode
    ) {

        return "";

    }


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


    const number =
        Number(
            district
        );


    if (
        !Number.isInteger(
            number
        ) ||
        number < 1
    ) {

        return "";

    }


    return String(
        number
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
URL
==================================================
*/

function normalizeUrl(
    value
) {

    const url =
        String(
            value || ""
        ).trim();


    if (!url) {

        return "";

    }


    try {

        const parsed =
            new URL(
                url
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