/*
==================================================
CIVIC HORIZON INDEX
ZIP → JURISDICTION DATA UPDATER
==================================================

PURPOSE

Generate Civic Horizon geographic jurisdiction data.

DATA SOURCES

1. HUD-USPS ZIP Code Crosswalk
   ZIP → Congressional District

2. U.S. Census Bureau
   2020 ZCTA → County Subdivision Relationship File

For New Jersey, county subdivisions provide the
appropriate Census geography for local municipalities,
including boroughs, cities, towns, villages, and
townships.

IMPORTANT

A ZIP/ZCTA can overlap more than one municipality.

We therefore preserve:

- every municipality candidate
- municipality land-overlap ratios
- whether the municipality is ambiguous

We DO NOT automatically guess Mayor eligibility when
the geographic relationship is ambiguous.

==================================================
*/


/*
==================================================
NODE IMPORTS
==================================================
*/

import {

    writeFile,
    mkdir

} from "node:fs/promises";


import {

    dirname,
    resolve

} from "node:path";


/*
==================================================
CONFIGURATION
==================================================
*/

const HUD_API_URL =
    "https://www.huduser.gov/hudapi/public/usps";


const CENSUS_ZCTA_COUSUB_URL =
    "https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_cousub20_natl.txt";


const outputPath =
    resolve(
        "v2/js/data/zip-jurisdictions.js"
    );


/*
==================================================
HUD TOKEN
==================================================
*/

const hudToken =
    String(
        process.env.HUD_API_TOKEN ||
        ""
    ).trim();


if (!hudToken) {

    console.error(
        ""
    );


    console.error(
        "HUD_API_TOKEN is missing."
    );


    console.error(
        ""
    );


    console.error(
        "Create a HUD-USPS API token, then run this script again."
    );


    console.error(
        ""
    );


    process.exit(
        1
    );

}


/*
==================================================
STATE LIST
==================================================

NJ remains our controlled test state.

Later we can add additional states without changing
the rest of this script.
==================================================
*/

const statesToUpdate = [

    "NJ"

];


/*
==================================================
STATE FIPS
==================================================

Used to match Census county-subdivision records
to states.

==================================================
*/

const stateFips = {

    AL: "01",
    AK: "02",
    AZ: "04",
    AR: "05",
    CA: "06",
    CO: "08",
    CT: "09",
    DE: "10",
    DC: "11",
    FL: "12",
    GA: "13",
    HI: "15",
    ID: "16",
    IL: "17",
    IN: "18",
    IA: "19",
    KS: "20",
    KY: "21",
    LA: "22",
    ME: "23",
    MD: "24",
    MA: "25",
    MI: "26",
    MN: "27",
    MS: "28",
    MO: "29",
    MT: "30",
    NE: "31",
    NV: "32",
    NH: "33",
    NJ: "34",
    NM: "35",
    NY: "36",
    NC: "37",
    ND: "38",
    OH: "39",
    OK: "40",
    OR: "41",
    PA: "42",
    RI: "44",
    SC: "45",
    SD: "46",
    TN: "47",
    TX: "48",
    UT: "49",
    VT: "50",
    VA: "51",
    WA: "53",
    WV: "54",
    WI: "55",
    WY: "56"

};


/*
==================================================
START UPDATE
==================================================
*/

async function updateZipDistrictData() {

    console.log(
        ""
    );


    console.log(
        "Updating Civic Horizon geographic data..."
    );


    console.log(
        ""
    );


    const zipData =
        {};


    const metadata = {

        congressionalSource: {

            sourceName:
                "HUD-USPS ZIP Code Crosswalk",

            sourceUrl:
                "https://www.huduser.gov/portal/datasets/usps_crosswalk.html",

            crosswalkType:
                "ZIP to Congressional District"

        },

        municipalitySource: {

            sourceName:
                "U.S. Census Bureau 2020 ZCTA to County Subdivision Relationship File",

            sourceUrl:
                CENSUS_ZCTA_COUSUB_URL,

            geographyType:
                "ZCTA to County Subdivision"

        },

        methodologyNotes: [

            "HUD-USPS is used for ZIP-to-congressional-district relationships.",

            "Census ZCTA relationships are used only to identify municipality candidates associated with ZIP geography.",

            "ZIP Codes and Census ZCTAs are not identical geographies.",

            "A ZIP may overlap multiple municipalities.",

            "Ambiguous municipality relationships are preserved rather than automatically assigned."

        ],

        generatedAt:
            new Date()
                .toISOString(),

        states:
            statesToUpdate

    };


    /*
    ==================================================
    STEP 1
    HUD-USPS CONGRESSIONAL DISTRICTS
    ==================================================
    */

    for (
        const stateCode
        of statesToUpdate
    ) {

        console.log(
            `Downloading congressional districts for ${stateCode}...`
        );


        const records =
            await downloadHudState(
                stateCode
            );


        processHudStateRecords(
            records,
            zipData
        );

    }


    console.log(
        ""
    );


    console.log(
        `HUD congressional ZIP records: ${Object.keys(
            zipData
        ).length}`
    );


    /*
    ==================================================
    STEP 2
    CENSUS MUNICIPALITY RELATIONSHIPS
    ==================================================
    */

    console.log(
        ""
    );


    console.log(
        "Downloading Census municipality relationships..."
    );


    const censusText =
        await downloadCensusMunicipalityRelationships();


    console.log(
        "Processing municipality relationships..."
    );


    processCensusMunicipalityRelationships(
        censusText,
        zipData
    );


    /*
    ==================================================
    FINALIZE
    ==================================================
    */

    finalizeZipData(
        zipData
    );


    /*
    ==================================================
    BUILD OUTPUT
    ==================================================
    */

    const output =
        buildOutputFile(
            zipData,
            metadata
        );


    await mkdir(
        dirname(
            outputPath
        ),
        {
            recursive:
                true
        }
    );


    await writeFile(
        outputPath,
        output,
        "utf8"
    );


    /*
    ==================================================
    SUMMARY
    ==================================================
    */

    const records =
        Object.values(
            zipData
        );


    const municipalityMatched =
        records.filter(
            record =>
                record.municipalities.length >
                0
        ).length;


    const municipalityUnique =
        records.filter(
            record =>
                record.municipalities.length ===
                1
        ).length;


    const municipalityAmbiguous =
        records.filter(
            record =>
                record.municipalities.length >
                1
        ).length;


    console.log(
        ""
    );


    console.log(
        `Saved ${records.length} ZIP records.`
    );


    console.log(
        `ZIPs with municipality data: ${municipalityMatched}`
    );


    console.log(
        `ZIPs with one municipality candidate: ${municipalityUnique}`
    );


    console.log(
        `ZIPs with multiple municipality candidates: ${municipalityAmbiguous}`
    );


    console.log(
        ""
    );


    console.log(
        outputPath
    );


    console.log(
        ""
    );

}


/*
==================================================
DOWNLOAD HUD STATE
==================================================
*/

async function downloadHudState(
    stateCode
) {

    const query =
        new URLSearchParams({

            type:
                "5",

            query:
                stateCode

        });


    const response =
        await fetch(
            `${HUD_API_URL}?${query.toString()}`,
            {

                headers: {

                    Authorization:
                        `Bearer ${hudToken}`

                }

            }
        );


    if (!response.ok) {

        throw new Error(
            `HUD request failed for ${stateCode}: ${response.status}`
        );

    }


    const payload =
        await response.json();


    const results =
        payload
            ?.data
            ?.results;


    if (
        !Array.isArray(
            results
        )
    ) {

        throw new Error(
            `HUD returned no usable data for ${stateCode}.`
        );

    }


    return results;

}


/*
==================================================
PROCESS HUD STATE RECORDS
==================================================
*/

function processHudStateRecords(
    records,
    zipData
) {

    records.forEach(
        record => {

            const zipCode =
                normalizeZip(
                    record.zip
                );


            const stateCode =
                normalizeState(
                    record.state
                );


            const district =
                normalizeCongressionalDistrict(
                    record.cd ||
                    record.geoid
                );


            const residentialRatio =
                normalizeRatio(
                    record.res_ratio
                );


            if (
                !zipCode ||
                !stateCode ||
                !district
            ) {

                return;

            }


            if (
                !zipData[
                    zipCode
                ]
            ) {

                zipData[
                    zipCode
                ] =
                    createEmptyZipRecord(
                        stateCode
                    );

            }


            const zipRecord =
                zipData[
                    zipCode
                ];


            /*
            ------------------------------------------
            DISTRICT LIST
            ------------------------------------------
            */

            if (
                !zipRecord
                    .congressionalDistricts
                    .includes(
                        district
                    )
            ) {

                zipRecord
                    .congressionalDistricts
                    .push(
                        district
                    );

            }


            /*
            ------------------------------------------
            DISTRICT RESIDENTIAL RATIO
            ------------------------------------------
            */

            zipRecord
                .districtRatios[
                    district
                ] =
                Math.max(

                    Number(
                        zipRecord
                            .districtRatios[
                                district
                            ] ||
                        0
                    ),

                    residentialRatio

                );

        }
    );

}


/*
==================================================
EMPTY ZIP RECORD
==================================================
*/

function createEmptyZipRecord(
    stateCode
) {

    return {

        stateCode,

        congressionalDistricts:
            [],

        districtRatios:
            {},

        municipalities:
            [],

        municipalityRatios:
            {},

        municipalityGeoids:
            {},

        municipalityAmbiguous:
            false

    };

}


/*
==================================================
DOWNLOAD CENSUS MUNICIPALITY RELATIONSHIPS
==================================================
*/

async function downloadCensusMunicipalityRelationships() {

    const response =
        await fetch(
            CENSUS_ZCTA_COUSUB_URL,
            {

                headers: {

                    "User-Agent":
                        "Civic-Horizon-Index-Geography-Updater/1.0"

                }

            }
        );


    if (!response.ok) {

        throw new Error(
            `Census municipality request failed: ${response.status}`
        );

    }


    return response.text();

}


/*
==================================================
PROCESS CENSUS MUNICIPALITY RELATIONSHIPS
==================================================

Census file:

2020 ZCTA
→
2020 County Subdivision

Important columns:

GEOID_ZCTA5_20
NAMELSAD_ZCTA5_20
AREALAND_ZCTA5_20

GEOID_COUSUB_20
NAMELSAD_COUSUB_20
FUNCSTAT_COUSUB_20

AREALAND_PART

==================================================
*/

function processCensusMunicipalityRelationships(
    text,
    zipData
) {

    const lines =
        String(
            text ||
            ""
        )
            .replace(
                /^\uFEFF/,
                ""
            )
            .split(
                /\r?\n/
            );


    if (
        lines.length <
        2
    ) {

        throw new Error(
            "Census municipality relationship file was empty."
        );

    }


    const headers =
        lines[
            0
        ]
            .split(
                "|"
            )
            .map(
                value =>
                    value.trim()
            );


    const indexes =
        buildHeaderIndexes(
            headers
        );


    requireHeader(
        indexes,
        "GEOID_ZCTA5_20"
    );


    requireHeader(
        indexes,
        "AREALAND_ZCTA5_20"
    );


    requireHeader(
        indexes,
        "GEOID_COUSUB_20"
    );


    requireHeader(
        indexes,
        "NAMELSAD_COUSUB_20"
    );


    requireHeader(
        indexes,
        "FUNCSTAT_COUSUB_20"
    );


    requireHeader(
        indexes,
        "AREALAND_PART"
    );


    const allowedStateFips =
        new Set(
            statesToUpdate
                .map(
                    stateCode =>
                        stateFips[
                            stateCode
                        ]
                )
                .filter(
                    Boolean
                )
        );


    for (
        let lineIndex =
            1;

        lineIndex <
        lines.length;

        lineIndex +=
            1
    ) {

        const line =
            lines[
                lineIndex
            ];


        if (!line) {

            continue;

        }


        const columns =
            line.split(
                "|"
            );


        const zipCode =
            normalizeZip(
                getColumn(
                    columns,
                    indexes,
                    "GEOID_ZCTA5_20"
                )
            );


        /*
        ------------------------------------------
        ONLY MERGE INTO REAL HUD ZIP RECORDS

        We intentionally do not create new records
        from Census alone.

        HUD remains the primary ZIP source.
        ------------------------------------------
        */

        if (
            !zipCode ||
            !zipData[
                zipCode
            ]
        ) {

            continue;

        }


        const countySubdivisionGeoid =
            String(
                getColumn(
                    columns,
                    indexes,
                    "GEOID_COUSUB_20"
                ) ||
                ""
            ).trim();


        if (
            countySubdivisionGeoid.length <
            2
        ) {

            continue;

        }


        const recordStateFips =
            countySubdivisionGeoid.slice(
                0,
                2
            );


        if (
            !allowedStateFips.has(
                recordStateFips
            )
        ) {

            continue;

        }


        const municipalityName =
            normalizeMunicipalityName(
                getColumn(
                    columns,
                    indexes,
                    "NAMELSAD_COUSUB_20"
                )
            );


        if (
            !municipalityName
        ) {

            continue;

        }


        /*
        ------------------------------------------
        FUNCTIONAL STATUS

        Census relationship files may include
        statistical/nonfunctioning subdivisions.

        NJ local-government county subdivisions
        normally use functional statuses such as
        A or F.

        We exclude clearly nonfunctioning/statistical
        records where appropriate.
        ------------------------------------------
        */

        const functionalStatus =
            String(
                getColumn(
                    columns,
                    indexes,
                    "FUNCSTAT_COUSUB_20"
                ) ||
                ""
            )
                .trim()
                .toUpperCase();


        if (
            !isUsableMunicipalityFunctionalStatus(
                functionalStatus
            )
        ) {

            continue;

        }


        const zctaLandArea =
            normalizeArea(
                getColumn(
                    columns,
                    indexes,
                    "AREALAND_ZCTA5_20"
                )
            );


        const overlapLandArea =
            normalizeArea(
                getColumn(
                    columns,
                    indexes,
                    "AREALAND_PART"
                )
            );


        const overlapRatio =
            calculateOverlapRatio(
                overlapLandArea,
                zctaLandArea
            );


        /*
        ------------------------------------------
        Ignore zero-land intersections.

        Water-only intersections should not create
        Mayor eligibility candidates.
        ------------------------------------------
        */

        if (
            overlapLandArea <=
            0
        ) {

            continue;

        }


        const zipRecord =
            zipData[
                zipCode
            ];


        if (
            !zipRecord
                .municipalities
                .includes(
                    municipalityName
                )
        ) {

            zipRecord
                .municipalities
                .push(
                    municipalityName
                );

        }


        zipRecord
            .municipalityRatios[
                municipalityName
            ] =
            Math.max(

                Number(
                    zipRecord
                        .municipalityRatios[
                            municipalityName
                        ] ||
                    0
                ),

                overlapRatio

            );


        if (
            countySubdivisionGeoid
        ) {

            zipRecord
                .municipalityGeoids[
                    municipalityName
                ] =
                countySubdivisionGeoid;

        }

    }

}


/*
==================================================
FINALIZE ZIP DATA
==================================================
*/

function finalizeZipData(
    zipData
) {

    Object
        .values(
            zipData
        )
        .forEach(
            record => {

                /*
                --------------------------------------
                DISTRICTS
                --------------------------------------
                */

                record
                    .congressionalDistricts
                    .sort(
                        compareDistricts
                    );


                /*
                --------------------------------------
                MUNICIPALITIES

                Sort by overlap ratio first so the
                largest geographic overlap appears
                first.

                Name is secondary sort.
                --------------------------------------
                */

                record
                    .municipalities
                    .sort(
                        (
                            first,
                            second
                        ) => {

                            const firstRatio =
                                Number(
                                    record
                                        .municipalityRatios[
                                            first
                                        ] ||
                                    0
                                );


                            const secondRatio =
                                Number(
                                    record
                                        .municipalityRatios[
                                            second
                                        ] ||
                                    0
                                );


                            if (
                                secondRatio !==
                                firstRatio
                            ) {

                                return (
                                    secondRatio -
                                    firstRatio
                                );

                            }


                            return first
                                .localeCompare(
                                    second
                                );

                        }
                    );


                record.municipalityAmbiguous =
                    record
                        .municipalities
                        .length >
                    1;


                /*
                --------------------------------------
                ROUND RATIOS

                Keeps the generated JavaScript file
                readable and stable.
                --------------------------------------
                */

                record.districtRatios =
                    roundRatioObject(
                        record.districtRatios
                    );


                record.municipalityRatios =
                    roundRatioObject(
                        record.municipalityRatios
                    );

            }
        );

}


/*
==================================================
HEADER INDEXES
==================================================
*/

function buildHeaderIndexes(
    headers
) {

    const indexes =
        {};


    headers.forEach(
        (
            header,
            index
        ) => {

            indexes[
                header
            ] =
                index;

        }
    );


    return indexes;

}


/*
==================================================
REQUIRE HEADER
==================================================
*/

function requireHeader(
    indexes,
    header
) {

    if (
        !Number.isInteger(
            indexes[
                header
            ]
        )
    ) {

        throw new Error(
            `Census column "${header}" was not found.`
        );

    }

}


/*
==================================================
GET COLUMN
==================================================
*/

function getColumn(
    columns,
    indexes,
    header
) {

    const index =
        indexes[
            header
        ];


    if (
        !Number.isInteger(
            index
        )
    ) {

        return "";

    }


    return columns[
        index
    ];

}


/*
==================================================
MUNICIPALITY FUNCTIONAL STATUS
==================================================

Census functional status:

A = active government
F = fictitious entity / incorporated place serving
    as county subdivision in states such as NJ

We keep A and F for NJ local-government geography.

==================================================
*/

function isUsableMunicipalityFunctionalStatus(
    value
) {

    return (
        value ===
            "A" ||
        value ===
            "F"
    );

}


/*
==================================================
MUNICIPALITY NAME
==================================================
*/

function normalizeMunicipalityName(
    value
) {

    const municipality =
        String(
            value ||
            ""
        )
            .trim()
            .replace(
                /\s+/g,
                " "
            );


    if (!municipality) {

        return "";

    }


    /*
    ----------------------------------------------
    Reject Census undefined/remainder geography.
    ----------------------------------------------
    */

    if (
        municipality
            .toLowerCase()
            .includes(
                "undefined"
            )
    ) {

        return "";

    }


    return municipality;

}


/*
==================================================
ZIP
==================================================
*/

function normalizeZip(
    value
) {

    const zip =
        String(
            value ||
            ""
        )
            .trim()
            .padStart(
                5,
                "0"
            );


    if (
        !/^\d{5}$/.test(
            zip
        )
    ) {

        return "";

    }


    return zip;

}


/*
==================================================
STATE
==================================================
*/

function normalizeState(
    value
) {

    const state =
        String(
            value ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !/^[A-Z]{2}$/.test(
            state
        )
    ) {

        return "";

    }


    return state;

}


/*
==================================================
CONGRESSIONAL DISTRICT
==================================================
*/

function normalizeCongressionalDistrict(
    value
) {

    const raw =
        String(
            value ||
            ""
        )
            .trim();


    if (!raw) {

        return "";

    }


    /*
    HUD Congressional District GEOID commonly
    contains state FIPS + district.

    Examples:

    3407 → NJ District 7
    3401 → NJ District 1

    We only need the final two digits.
    */

    const districtCode =
        raw.slice(
            -2
        );


    const districtNumber =
        Number(
            districtCode
        );


    /*
    At-large states are typically represented by 00.
    */

    if (
        districtNumber ===
        0
    ) {

        return "At-Large";

    }


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
HUD RESIDENTIAL RATIO
==================================================
*/

function normalizeRatio(
    value
) {

    const ratio =
        Number(
            value
        );


    if (
        !Number.isFinite(
            ratio
        )
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            1,
            ratio
        )
    );

}


/*
==================================================
CENSUS LAND AREA
==================================================
*/

function normalizeArea(
    value
) {

    const area =
        Number(
            value
        );


    if (
        !Number.isFinite(
            area
        ) ||
        area <
            0
    ) {

        return 0;

    }


    return area;

}


/*
==================================================
MUNICIPALITY OVERLAP RATIO
==================================================
*/

function calculateOverlapRatio(
    overlapLandArea,
    totalZctaLandArea
) {

    if (
        totalZctaLandArea <=
        0
    ) {

        return 0;

    }


    return normalizeRatio(
        overlapLandArea /
        totalZctaLandArea
    );

}


/*
==================================================
ROUND RATIO OBJECT
==================================================
*/

function roundRatioObject(
    source
) {

    const output =
        {};


    Object
        .entries(
            source ||
            {}
        )
        .forEach(
            (
                [
                    key,
                    value
                ]
            ) => {

                const number =
                    Number(
                        value
                    );


                if (
                    !Number.isFinite(
                        number
                    )
                ) {

                    return;

                }


                output[
                    key
                ] =
                    Number(
                        number.toFixed(
                            9
                        )
                    );

            }
        );


    return output;

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
BUILD OUTPUT FILE
==================================================
*/

function buildOutputFile(
    zipData,
    metadata
) {

    const sortedZipData =
        Object
            .fromEntries(
                Object
                    .entries(
                        zipData
                    )
                    .sort(
                        (
                            first,
                            second
                        ) =>
                            first[
                                0
                            ].localeCompare(
                                second[
                                    0
                                ]
                            )
                    )
            );


    return `/*
==================================================
CIVIC HORIZON INDEX V2
GENERATED ZIP JURISDICTION DATA
==================================================

DO NOT EDIT THIS FILE MANUALLY.

CONGRESSIONAL SOURCE

${metadata.congressionalSource.sourceName}

MUNICIPALITY SOURCE

${metadata.municipalitySource.sourceName}

Generated:

${metadata.generatedAt}

IMPORTANT

Municipality candidates are derived from Census
ZCTA relationships.

ZIP Codes and ZCTAs are not identical geographic
entities.

A ZIP may overlap multiple municipalities.

Civic Horizon must not treat an ambiguous ZIP as
proof of Mayor-voting eligibility.

==================================================
*/


export const zipJurisdictionMetadata = ${JSON.stringify(
        metadata,
        null,
        4
    )};


export const zipJurisdictions = ${JSON.stringify(
        sortedZipData,
        null,
        4
    )};
`;

}


/*
==================================================
RUN
==================================================
*/

updateZipDistrictData()
    .catch(
        error => {

            console.error(
                ""
            );


            console.error(
                "Geographic data update failed:"
            );


            console.error(
                error
            );


            console.error(
                ""
            );


            process.exit(
                1
            );

        }
    );