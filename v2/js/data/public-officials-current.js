/*
==================================================
CIVIC HORIZON INDEX V2
CURRENT PUBLIC OFFICIAL DATA
==================================================

Purpose:

Store current supported public officials in one
consistent structure.

Supported offices:

- President
- U.S. Senator
- U.S. Representative
- Governor
- Mayor

This file stores factual data only.

Every factual field that will appear publicly should
be traceable to a source.

Election changes should happen here rather than in
page logic.
==================================================
*/


export const currentPublicOfficials = {

    NJ: {

        /*
        ==============================================
        GOVERNOR
        ==============================================
        */

        governor: {

    id:
        "nj-gov-mikie-sherrill",

    personKey:
        "mikie-sherrill",

    seatKey:
        "nj-governor",

    name:
        "Mikie Sherrill",

    party:
        "D",

    officeType:
        "governor",

    stateCode:
        "NJ",

    servingSince:
        "2026-01-20",

    currentTermBegan:
        "2026-01-20",

    jurisdiction: {

        type:
            "state",

        stateCode:
            "NJ"

    },

    sources: [

        {
            fact:
                "officeholder",

            sourceName:
                "Office of the Governor of New Jersey",

            sourceUrl:
                "https://www.nj.gov/governor/",

            verifiedAt:
                "2026-08-20"
        },

        {
            fact:
                "party",

            sourceName:
                "Office of the Governor of New Jersey",

            sourceUrl:
                "https://www.nj.gov/governor/",

            verifiedAt:
                "2026-08-20"
        },

        {
            fact:
                "servingSince",

            sourceName:
                "Office of the Governor of New Jersey",

            sourceUrl:
                "https://www.nj.gov/governor/news/2026/approved/20260120b.shtml",

            verifiedAt:
                "2026-08-20"
        }

    ],

    officialRecord: {

        recordType:
            "Governor executive actions",

        sourceName:
            "Office of the Governor of New Jersey",

        sourceUrl:
            "https://www.nj.gov/governor/action/executive-orders/index.shtml"

    },

    financialChange: {

        percentageLow:
            null,

        percentageHigh:
            null,

        methodologyUrl:
            "",

        sources:
            []

    }

},


        /*
        ==============================================
        U.S. SENATE
        ==============================================
        */

        senators: [

            {
                id:
                    "nj-sen-cory-booker",

                personKey:
                    "cory-booker",

                seatKey:
                    "nj-senate-class-2",

                name:
                    "Cory Booker",

                party:
                    "D",

                officeType:
                    "senator",

                stateCode:
                    "NJ",

                servingSince:
                    "2013-10-31",

                currentTermBegan:
                    "2021-01-03",

                jurisdiction: {

                    type:
                        "state",

                    stateCode:
                        "NJ"

                },

                sources: [

                    {
                        fact:
                            "officeholder",

                        sourceName:
                            "United States Senate",

                        sourceUrl:
                            "https://www.senate.gov/states/NJ/intro.htm",

                        verifiedAt:
                            "2026-08-20"
                    },

                    {
                        fact:
                            "party",

                        sourceName:
                            "United States Senate",

                        sourceUrl:
                            "https://www.senate.gov/states/NJ/intro.htm",

                        verifiedAt:
                            "2026-08-20"
                    },

                    {
                        fact:
                            "servingSince",

                        sourceName:
                            "United States Senate",

                        sourceUrl:
                            "https://www.senate.gov/states/NJ/senators.shtml",

                        verifiedAt:
                            "2026-08-20"
                    }

                ],

                officialRecord: {

                    recordType:
                        "Senate voting record",

                    sourceName:
                        "United States Senate",

                    sourceUrl:
                        "https://www.senate.gov/legislative/votes_new.htm"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-sen-andy-kim",

                personKey:
                    "andy-kim",

                seatKey:
                    "nj-senate-class-1",

                name:
                    "Andy Kim",

                party:
                    "D",

                officeType:
                    "senator",

                stateCode:
                    "NJ",

                servingSince:
                    "2024-12-08",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "state",

                    stateCode:
                        "NJ"

                },

                sources: [

                    {
                        fact:
                            "officeholder",

                        sourceName:
                            "United States Senate",

                        sourceUrl:
                            "https://www.senate.gov/states/NJ/intro.htm",

                        verifiedAt:
                            "2026-08-20"
                    },

                    {
                        fact:
                            "party",

                        sourceName:
                            "United States Senate",

                        sourceUrl:
                            "https://www.senate.gov/states/NJ/intro.htm",

                        verifiedAt:
                            "2026-08-20"
                    },

                    {
                        fact:
                            "servingSince",

                        sourceName:
                            "United States Senate",

                        sourceUrl:
                            "https://www.senate.gov/states/NJ/senators.shtml",

                        verifiedAt:
                            "2026-08-20"
                    }

                ],

                officialRecord: {

                    recordType:
                        "Senate voting record",

                    sourceName:
                        "United States Senate",

                    sourceUrl:
                        "https://www.senate.gov/legislative/votes_new.htm"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            }

        ],


        /*
        ==============================================
        U.S. HOUSE
        ==============================================
        */

        representatives: [

            {
                id:
                    "nj-01-donald-norcross",

                personKey:
                    "donald-norcross",

                seatKey:
                    "nj-house-01",

                name:
                    "Donald Norcross",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "1",

                servingSince:
                    "2014-11-12",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "1"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-02-jeff-van-drew",

                personKey:
                    "jeff-van-drew",

                seatKey:
                    "nj-house-02",

                name:
                    "Jeff Van Drew",

                party:
                    "R",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "2",

                servingSince:
                    "2019-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "2"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-03-herb-conaway",

                personKey:
                    "herb-conaway",

                seatKey:
                    "nj-house-03",

                name:
                    "Herb Conaway",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "3",

                servingSince:
                    "2025-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "3"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-04-chris-smith",

                personKey:
                    "chris-smith",

                seatKey:
                    "nj-house-04",

                name:
                    "Chris Smith",

                party:
                    "R",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "4",

                servingSince:
                    "1981-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "4"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-05-josh-gottheimer",

                personKey:
                    "josh-gottheimer",

                seatKey:
                    "nj-house-05",

                name:
                    "Josh Gottheimer",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "5",

                servingSince:
                    "2017-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "5"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-06-frank-pallone",

                personKey:
                    "frank-pallone",

                seatKey:
                    "nj-house-06",

                name:
                    "Frank Pallone Jr.",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "6",

                servingSince:
                    "1989-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "6"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-07-tom-kean",

                personKey:
                    "tom-kean-jr",

                seatKey:
                    "nj-house-07",

                name:
                    "Tom Kean Jr.",

                party:
                    "R",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "7",

                servingSince:
                    "2023-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "7"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-08-rob-menendez",

                personKey:
                    "rob-menendez",

                seatKey:
                    "nj-house-08",

                name:
                    "Rob Menendez",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "8",

                servingSince:
                    "2023-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "8"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-09-nellie-pou",

                personKey:
                    "nellie-pou",

                seatKey:
                    "nj-house-09",

                name:
                    "Nellie Pou",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "9",

                servingSince:
                    "2025-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "9"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-10-lamonica-mciver",

                personKey:
                    "lamonica-mciver",

                seatKey:
                    "nj-house-10",

                name:
                    "LaMonica McIver",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "10",

                servingSince:
                    "2024-09-23",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "10"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-11-analilia-mejia",

                personKey:
                    "analilia-mejia",

                seatKey:
                    "nj-house-11",

                name:
                    "Analilia Mejia",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "11",

                servingSince:
                    "2026-04-20",

                currentTermBegan:
                    "2026-04-20",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "11"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            },


            {
                id:
                    "nj-12-bonnie-watson-coleman",

                personKey:
                    "bonnie-watson-coleman",

                seatKey:
                    "nj-house-12",

                name:
                    "Bonnie Watson Coleman",

                party:
                    "D",

                officeType:
                    "representative",

                stateCode:
                    "NJ",

                district:
                    "12",

                servingSince:
                    "2015-01-03",

                currentTermBegan:
                    "2025-01-03",

                jurisdiction: {

                    type:
                        "congressional-district",

                    stateCode:
                        "NJ",

                    district:
                        "12"

                },

                sources: [],

                officialRecord: {

                    recordType:
                        "House voting record",

                    sourceName:
                        "U.S. House Clerk",

                    sourceUrl:
                        "https://clerk.house.gov/Votes"

                },

                financialChange: {

                    percentageLow:
                        null,

                    percentageHigh:
                        null,

                    methodologyUrl:
                        "",

                    sources:
                        []

                }
            }

        ],


        /*
        ==============================================
        MAYORS
        ==============================================

        We will add municipalities only when we have
        verified officeholder and jurisdiction data.

        Do not populate speculative mayor records.
        ==============================================
        */

        mayors: []

    }

};