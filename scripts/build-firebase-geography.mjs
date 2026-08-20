/*
==================================================
CIVIC HORIZON INDEX
BUILD FIREBASE GEOGRAPHY DATA
==================================================

Purpose:

Convert the generated ZIP jurisdiction dataset into
a compact Firebase eligibility dataset.

Firebase security rules can use this data to verify:

- State eligibility
- Congressional district eligibility
- Municipality eligibility

IMPORTANT:

This script does NOT upload anything to Firebase.

It only creates:

firebase-data/geographic-eligibility.json

so we can inspect the result first.
==================================================
*/


/*
==================================================
NODE IMPORTS
==================================================
*/

import {

    mkdir,
    readFile,
    writeFile

} from "node:fs/promises";


import {

    dirname,
    resolve

} from "node:path";


/*
==================================================
PATHS
==================================================
*/

const sourcePath =
    resolve(
        "v2/js/data/zip-jurisdictions.js"
    );


const outputPath =
    resolve(
        "firebase-data/geographic-eligibility.json"
    );


/*
==================================================
BUILD FIREBASE GEOGRAPHY
==================================================
*/

async function buildFirebaseGeography() {

    console.log(
        ""
    );


    console.log(
        "Building Civic Horizon Firebase geography..."
    );


    console.log(
        ""
    );


    /*
    ----------------------------------------------
    READ GENERATED ZIP FILE

    Read as text instead of importing as a Node
    module.

    This avoids CommonJS / ES module conflicts.
    ----------------------------------------------
    */

    const source =
        await readFile(
            sourcePath,
            "utf8"
        );


    /*
    ----------------------------------------------
    EXTRACT ZIP JURISDICTION OBJECT
    ----------------------------------------------
    */

    const zipJurisdictions =
        extractExportedObject(
            source,
            "zipJurisdictions"
        );


    if (
        !zipJurisdictions ||
        typeof zipJurisdictions !==
            "object"
    ) {

        throw new Error(
            "Could not read zipJurisdictions from the generated ZIP data file."
        );

    }


    /*
    ----------------------------------------------
    METADATA
    ----------------------------------------------
    */

    let zipJurisdictionMetadata =
        {};


    try {

        zipJurisdictionMetadata =
            extractExportedObject(
                source,
                "zipJurisdictionMetadata"
            ) || {};

    } catch {

        zipJurisdictionMetadata =
            {};

    }


    /*
    ----------------------------------------------
    BUILD COMPACT ELIGIBILITY DATA
    ----------------------------------------------
    */

    const eligibility =
        {};


    Object
        .entries(
            zipJurisdictions
        )
        .forEach(
            (
                [
                    zipCode,
                    record
                ]
            ) => {

                const normalizedZip =
                    normalizeZipCode(
                        zipCode
                    );


                const stateCode =
                    normalizeStateCode(
                        record?.stateCode
                    );


                const districts =
                    normalizeDistricts(
                        record?.congressionalDistricts
                    );


                if (
                    !normalizedZip ||
                    !stateCode
                ) {

                    return;

                }


                /*
                --------------------------------------
                HOUSE DISTRICT RULE

                Exactly one district:
                safe to resolve automatically.

                More than one:
                House voting remains read-only.

                Zero:
                House voting remains read-only.
                --------------------------------------
                */

                const uniqueDistrict =
                    districts.length ===
                        1
                        ? districts[0]
                        : "";


                /*
                --------------------------------------
                MUNICIPALITIES

                Preserve every municipality candidate
                and its Census GEOID.

                GEOID becomes the stable jurisdiction
                identifier used for Mayor eligibility.
                --------------------------------------
                */

                const municipalities =
                    buildMunicipalities(
                        record
                    );


                const municipalityGeoids =
                    Object.keys(
                        municipalities
                    );


                /*
                --------------------------------------
                MUNICIPALITY RULE

                Exactly one valid GEOID:
                municipality can eventually be
                auto-resolved.

                Multiple GEOIDs:
                participant must confirm which
                municipality they live in.

                Zero:
                Mayor voting remains read-only.
                --------------------------------------
                */

                const municipalityAmbiguous =
                    municipalityGeoids.length >
                    1;


                const uniqueMunicipalityGeoid =
                    municipalityGeoids.length ===
                        1
                        ? municipalityGeoids[0]
                        : "";


                eligibility[
                    normalizedZip
                ] = {

                    stateCode,

                    congressionalDistrict:
                        uniqueDistrict,

                    districtAmbiguous:
                        districts.length >
                        1,

                    municipalities,

                    municipalityGeoid:
                        uniqueMunicipalityGeoid,

                    municipalityAmbiguous

                };

            }
        );


    /*
    ----------------------------------------------
    FINAL OUTPUT
    ----------------------------------------------
    */

    const recordCount =
        Object.keys(
            eligibility
        ).length;


    const municipalityMatchedCount =
        Object
            .values(
                eligibility
            )
            .filter(
                record =>
                    Object.keys(
                        record.municipalities ||
                        {}
                    ).length >
                    0
            )
            .length;


    const municipalityUniqueCount =
        Object
            .values(
                eligibility
            )
            .filter(
                record =>
                    Object.keys(
                        record.municipalities ||
                        {}
                    ).length ===
                    1
            )
            .length;


    const municipalityAmbiguousCount =
        Object
            .values(
                eligibility
            )
            .filter(
                record =>
                    Object.keys(
                        record.municipalities ||
                        {}
                    ).length >
                    1
            )
            .length;


    const output = {

        metadata: {

            congressionalSourceName:
                zipJurisdictionMetadata
                    ?.congressionalSource
                    ?.sourceName ||
                zipJurisdictionMetadata
                    ?.sourceName ||
                "HUD-USPS ZIP Code Crosswalk",

            congressionalSourceUrl:
                zipJurisdictionMetadata
                    ?.congressionalSource
                    ?.sourceUrl ||
                zipJurisdictionMetadata
                    ?.sourceUrl ||
                "",

            municipalitySourceName:
                zipJurisdictionMetadata
                    ?.municipalitySource
                    ?.sourceName ||
                "",

            municipalitySourceUrl:
                zipJurisdictionMetadata
                    ?.municipalitySource
                    ?.sourceUrl ||
                "",

            sourceGeneratedAt:
                zipJurisdictionMetadata
                    ?.generatedAt ||
                "",

            firebaseGeneratedAt:
                new Date()
                    .toISOString(),

            recordCount,

            municipalityMatchedCount,

            municipalityUniqueCount,

            municipalityAmbiguousCount

        },

        zips:
            eligibility

    };


    /*
    ----------------------------------------------
    CREATE OUTPUT FOLDER
    ----------------------------------------------
    */

    await mkdir(
        dirname(
            outputPath
        ),
        {

            recursive:
                true

        }
    );


    /*
    ----------------------------------------------
    WRITE JSON
    ----------------------------------------------
    */

    await writeFile(

        outputPath,

        JSON.stringify(
            output,
            null,
            2
        ),

        "utf8"

    );


    /*
    ----------------------------------------------
    SUCCESS
    ----------------------------------------------
    */

    console.log(
        `Created ${recordCount} ZIP eligibility records.`
    );


    console.log(
        `ZIPs with municipality data: ${municipalityMatchedCount}`
    );


    console.log(
        `ZIPs with one municipality candidate: ${municipalityUniqueCount}`
    );


    console.log(
        `ZIPs with multiple municipality candidates: ${municipalityAmbiguousCount}`
    );


    console.log(
        ""
    );


    console.log(
        "Saved:"
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
BUILD MUNICIPALITIES
==================================================
*/

function buildMunicipalities(
    record
) {

    const names =
        Array.isArray(
            record?.municipalities
        )
            ? record.municipalities
            : [];


    const geoidMap =
        record
            ?.municipalityGeoids &&
        typeof record
            .municipalityGeoids ===
            "object"
            ? record.municipalityGeoids
            : {};


    const ratioMap =
        record
            ?.municipalityRatios &&
        typeof record
            .municipalityRatios ===
            "object"
            ? record.municipalityRatios
            : {};


    const municipalities =
        {};


    names.forEach(
        rawName => {

            const name =
                normalizeMunicipalityName(
                    rawName
                );


            if (!name) {

                return;

            }


            const geoid =
                normalizeMunicipalityGeoid(
                    geoidMap[
                        rawName
                    ]
                );


            /*
            A municipality without a valid GEOID is
            not safe for Firebase Mayor eligibility.
            */

            if (!geoid) {

                return;

            }


            const ratio =
                normalizeRatio(
                    ratioMap[
                        rawName
                    ]
                );


            municipalities[
                geoid
            ] = {

                name,

                ratio

            };

        }
    );


    return municipalities;

}


/*
==================================================
EXTRACT EXPORTED OBJECT
==================================================

Reads:

export const someName = {
    ...
};

from the generated JavaScript file.
==================================================
*/

function extractExportedObject(
    source,
    exportName
) {

    const declarationPattern =
        new RegExp(
            `export\\s+const\\s+${escapeRegExp(
                exportName
            )}\\s*=`
        );


    const declarationMatch =
        declarationPattern.exec(
            source
        );


    if (
        !declarationMatch
    ) {

        throw new Error(
            `Export "${exportName}" was not found.`
        );

    }


    const searchStart =
        declarationMatch.index +
        declarationMatch[0].length;


    const openingBrace =
        source.indexOf(
            "{",
            searchStart
        );


    if (
        openingBrace ===
        -1
    ) {

        throw new Error(
            `Opening object brace for "${exportName}" was not found.`
        );

    }


    const closingBrace =
        findMatchingBrace(
            source,
            openingBrace
        );


    if (
        closingBrace ===
        -1
    ) {

        throw new Error(
            `Closing object brace for "${exportName}" was not found.`
        );

    }


    const objectText =
        source.slice(
            openingBrace,
            closingBrace + 1
        );


    try {

        return JSON.parse(
            objectText
        );

    } catch (error) {

        throw new Error(
            `Export "${exportName}" could not be parsed as JSON: ${error.message}`
        );

    }

}


/*
==================================================
FIND MATCHING BRACE
==================================================
*/

function findMatchingBrace(
    source,
    openingBrace
) {

    let depth =
        0;


    let inString =
        false;


    let quote =
        "";


    let escaped =
        false;


    for (
        let index =
            openingBrace;

        index <
            source.length;

        index +=
            1
    ) {

        const character =
            source[
                index
            ];


        if (
            inString
        ) {

            if (
                escaped
            ) {

                escaped =
                    false;

                continue;

            }


            if (
                character ===
                "\\"
            ) {

                escaped =
                    true;

                continue;

            }


            if (
                character ===
                quote
            ) {

                inString =
                    false;

                quote =
                    "";

            }


            continue;

        }


        if (
            character ===
                "\"" ||
            character ===
                "'" ||
            character ===
                "`"
        ) {

            inString =
                true;

            quote =
                character;

            continue;

        }


        if (
            character ===
                "{"
        ) {

            depth +=
                1;

            continue;

        }


        if (
            character ===
                "}"
        ) {

            depth -=
                1;


            if (
                depth ===
                0
            ) {

                return index;

            }

        }

    }


    return -1;

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
            value ||
            ""
        ).trim();


    if (
        !/^\d{5}$/.test(
            zipCode
        )
    ) {

        return "";

    }


    return zipCode;

}


/*
==================================================
STATE
==================================================
*/

function normalizeStateCode(
    value
) {

    const stateCode =
        String(
            value ||
            ""
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
DISTRICTS
==================================================
*/

function normalizeDistricts(
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
            value ??
            ""
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
        number <
            1
    ) {

        return "";

    }


    return String(
        number
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

    return String(
        value ||
        ""
    )
        .trim()
        .replace(
            /\s+/g,
            " "
        );

}


/*
==================================================
MUNICIPALITY GEOID
==================================================
*/

function normalizeMunicipalityGeoid(
    value
) {

    const geoid =
        String(
            value ||
            ""
        ).trim();


    /*
    Census county subdivision GEOID:
    2 state +
    3 county +
    5 county subdivision
    = 10 digits
    */

    if (
        !/^\d{10}$/.test(
            geoid
        )
    ) {

        return "";

    }


    return geoid;

}


/*
==================================================
RATIO
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


    return Number(
        Math.max(
            0,
            Math.min(
                1,
                ratio
            )
        ).toFixed(
            9
        )
    );

}


/*
==================================================
REGEXP ESCAPE
==================================================
*/

function escapeRegExp(
    value
) {

    return String(
        value
    ).replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

}


/*
==================================================
RUN
==================================================
*/

buildFirebaseGeography()
    .catch(
        error => {

            console.error(
                ""
            );


            console.error(
                "Firebase geography build failed:"
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