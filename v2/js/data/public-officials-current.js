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

        mayors: [

    {
        id:
            "nj-lincoln-park-mayor-david-runfeldt",

        personKey:
            "david-runfeldt",

        seatKey:
            "nj-lincoln-park-mayor",

        name:
            "David A. Runfeldt",

        party:
            "OTHER",

        officeType:
            "mayor",

        stateCode:
            "NJ",

        municipality:
            "Lincoln Park borough",

        municipalityGeoid:
            "3402740290",

        servingSince:
            "",

        currentTermBegan:
            "",

        jurisdiction: {

            type:
                "municipality",

            stateCode:
                "NJ",

            municipality:
                "Lincoln Park borough",

            municipalityGeoid:
                "3402740290"

        },

        sources: [

            {
                fact:
                    "officeholder",

                sourceName:
                    "Borough of Lincoln Park",

                sourceUrl:
                    "https://www.lincolnpark.org/130/Mayors-Office",

                verifiedAt:
                    "2026-08-21"
            }

        ],

        officialRecord: {

            recordType:
                "Municipal government record",

            sourceName:
                "Borough of Lincoln Park",

            sourceUrl:
                "https://www.lincolnpark.org/"
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

        ]

        },

    AK: {

    /*
    ==============================================
    GOVERNOR
    ==============================================
    */

    governor: {

        id:
            "ak-gov-mike-dunleavy",

        personKey:
            "mike-dunleavy",

        seatKey:
            "ak-governor",

        name:
            "Mike Dunleavy",

        party:
            "R",

        officeType:
            "governor",

        stateCode:
            "AK",

        servingSince:
            "2018-12-03",

        currentTermBegan:
            "2022-12-05",

        jurisdiction: {

            type:
                "state",

            stateCode:
                "AK"

        },

        sources: [

            {
                fact:
                    "officeholder",

                sourceName:
                    "Office of the Governor of Alaska",

                sourceUrl:
                    "https://gov.alaska.gov/",

                verifiedAt:
                    "2026-08-22"
            }

        ],

        officialRecord: {

            recordType:
                "Governor executive actions",

            sourceName:
                "Office of the Governor of Alaska",

            sourceUrl:
                "https://gov.alaska.gov/"
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
                "ak-sen-lisa-murkowski",

            personKey:
                "lisa-murkowski",

            seatKey:
                "ak-senate-class-3",

            name:
                "Lisa Murkowski",

            party:
                "R",

            officeType:
                "senator",

            stateCode:
                "AK",

            servingSince:
                "2002-12-20",

            currentTermBegan:
                "2023-01-03",

            jurisdiction: {

                type:
                    "state",

                stateCode:
                    "AK"

            },

            sources:
                [],

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
                "ak-sen-dan-sullivan",

            personKey:
                "dan-sullivan",

            seatKey:
                "ak-senate-class-2",

            name:
                "Dan Sullivan",

            party:
                "R",

            officeType:
                "senator",

            stateCode:
                "AK",

            servingSince:
                "2015-01-03",

            currentTermBegan:
                "2021-01-03",

            jurisdiction: {

                type:
                    "state",

                stateCode:
                    "AK"

            },

            sources:
                [],

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
                "ak-at-large-nick-begich",

            personKey:
                "nick-begich",

            seatKey:
                "ak-house-at-large",

            name:
                "Nick Begich",

            party:
                "R",

            officeType:
                "representative",

            stateCode:
                "AK",

            district:
                "At-Large",

            servingSince:
                "2025-01-03",

            currentTermBegan:
                "2025-01-03",

            jurisdiction: {

                type:
                    "congressional-district",

                stateCode:
                    "AK",

                district:
                    "At-Large"

            },

            sources:
                [],

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

        ]

},
    AL: {

        /*
        ==============================================
        GOVERNOR
        ==============================================
        */

        governor: {

            id: "al-gov-kay-ivey",
            personKey: "kay-ivey",
            seatKey: "al-governor",
            name: "Kay Ivey",
            party: "R",
            officeType: "governor",
            stateCode: "AL",
            servingSince: "2017-04-10",
            currentTermBegan: "2023-01-16",

            jurisdiction: {
                type: "state",
                stateCode: "AL"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Alabama",
                sourceUrl: "https://governor.alabama.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }

        },


        /*
        ==============================================
        U.S. SENATE
        ==============================================
        */

        senators: [

            {
                id: "al-sen-tommy-tuberville",
                personKey: "tommy-tuberville",
                seatKey: "al-senate-class-2",
                name: "Tommy Tuberville",
                party: "R",
                officeType: "senator",
                stateCode: "AL",
                servingSince: "2021-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "AL"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-sen-katie-britt",
                personKey: "katie-britt",
                seatKey: "al-senate-class-3",
                name: "Katie Britt",
                party: "R",
                officeType: "senator",
                stateCode: "AL",
                servingSince: "2023-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "AL"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
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
                id: "al-01-barry-moore",
                personKey: "barry-moore",
                seatKey: "al-house-01",
                name: "Barry Moore",
                party: "R",
                officeType: "representative",
                stateCode: "AL",
                district: "1",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "1"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-02-shomari-figures",
                personKey: "shomari-figures",
                seatKey: "al-house-02",
                name: "Shomari Figures",
                party: "D",
                officeType: "representative",
                stateCode: "AL",
                district: "2",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "2"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-03-mike-rogers",
                personKey: "mike-rogers",
                seatKey: "al-house-03",
                name: "Mike Rogers",
                party: "R",
                officeType: "representative",
                stateCode: "AL",
                district: "3",
                servingSince: "2003-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "3"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-04-robert-aderholt",
                personKey: "robert-aderholt",
                seatKey: "al-house-04",
                name: "Robert Aderholt",
                party: "R",
                officeType: "representative",
                stateCode: "AL",
                district: "4",
                servingSince: "1997-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "4"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-05-dale-strong",
                personKey: "dale-strong",
                seatKey: "al-house-05",
                name: "Dale Strong",
                party: "R",
                officeType: "representative",
                stateCode: "AL",
                district: "5",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "5"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-06-gary-palmer",
                personKey: "gary-palmer",
                seatKey: "al-house-06",
                name: "Gary Palmer",
                party: "R",
                officeType: "representative",
                stateCode: "AL",
                district: "6",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "6"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "al-07-terri-sewell",
                personKey: "terri-sewell",
                seatKey: "al-house-07",
                name: "Terri Sewell",
                party: "D",
                officeType: "representative",
                stateCode: "AL",
                district: "7",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AL",
                    district: "7"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        AZ: {

        /*
        ==============================================
        GOVERNOR
        ==============================================
        */

        governor: {

            id: "az-gov-katie-hobbs",
            personKey: "katie-hobbs",
            seatKey: "az-governor",
            name: "Katie Hobbs",
            party: "D",
            officeType: "governor",
            stateCode: "AZ",
            servingSince: "2023-01-02",
            currentTermBegan: "2023-01-02",

            jurisdiction: {
                type: "state",
                stateCode: "AZ"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Arizona",
                sourceUrl: "https://azgovernor.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }

        },

        /*
        ==============================================
        U.S. SENATE
        ==============================================
        */

        senators: [

            {
                id: "az-sen-mark-kelly",
                personKey: "mark-kelly",
                seatKey: "az-senate-class-1",
                name: "Mark Kelly",
                party: "D",
                officeType: "senator",
                stateCode: "AZ",
                servingSince: "2020-12-02",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "AZ"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-sen-ruben-gallego",
                personKey: "ruben-gallego",
                seatKey: "az-senate-class-3",
                name: "Ruben Gallego",
                party: "D",
                officeType: "senator",
                stateCode: "AZ",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "AZ"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
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
                id: "az-01-david-schweikert",
                personKey: "david-schweikert",
                seatKey: "az-house-01",
                name: "David Schweikert",
                party: "R",
                officeType: "representative",
                stateCode: "AZ",
                district: "1",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "1"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-02-eli-crane",
                personKey: "eli-crane",
                seatKey: "az-house-02",
                name: "Eli Crane",
                party: "R",
                officeType: "representative",
                stateCode: "AZ",
                district: "2",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "2"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-03-yassamin-ansari",
                personKey: "yassamin-ansari",
                seatKey: "az-house-03",
                name: "Yassamin Ansari",
                party: "D",
                officeType: "representative",
                stateCode: "AZ",
                district: "3",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "3"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-04-greg-stanton",
                personKey: "greg-stanton",
                seatKey: "az-house-04",
                name: "Greg Stanton",
                party: "D",
                officeType: "representative",
                stateCode: "AZ",
                district: "4",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "4"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-05-andy-biggs",
                personKey: "andy-biggs",
                seatKey: "az-house-05",
                name: "Andy Biggs",
                party: "R",
                officeType: "representative",
                stateCode: "AZ",
                district: "5",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "5"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-06-juan-ciscomani",
                personKey: "juan-ciscomani",
                seatKey: "az-house-06",
                name: "Juan Ciscomani",
                party: "R",
                officeType: "representative",
                stateCode: "AZ",
                district: "6",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "6"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-07-adelita-grijalva",
                personKey: "adelita-grijalva",
                seatKey: "az-house-07",
                name: "Adelita Grijalva",
                party: "D",
                officeType: "representative",
                stateCode: "AZ",
                district: "7",
                servingSince: "2025-11-12",
                currentTermBegan: "2025-11-12",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "7"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-08-abraham-hamadeh",
                personKey: "abraham-hamadeh",
                seatKey: "az-house-08",
                name: "Abraham Hamadeh",
                party: "R",
                officeType: "representative",
                stateCode: "AZ",
                district: "8",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "8"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "az-09-paul-gosar",
                personKey: "paul-gosar",
                seatKey: "az-house-09",
                name: "Paul Gosar",
                party: "R",
                officeType: "representative",
                stateCode: "AZ",
                district: "9",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AZ",
                    district: "9"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    AR: {

        /*
        ==============================================
        GOVERNOR
        ==============================================
        */

        governor: {

            id: "ar-gov-sarah-huckabee-sanders",
            personKey: "sarah-huckabee-sanders",
            seatKey: "ar-governor",
            name: "Sarah Huckabee Sanders",
            party: "R",
            officeType: "governor",
            stateCode: "AR",
            servingSince: "2023-01-10",
            currentTermBegan: "2023-01-10",

            jurisdiction: {
                type: "state",
                stateCode: "AR"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Arkansas",
                sourceUrl: "https://governor.arkansas.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }

        },

        /*
        ==============================================
        U.S. SENATE
        ==============================================
        */

        senators: [

            {
                id: "ar-sen-john-boozman",
                personKey: "john-boozman",
                seatKey: "ar-senate-class-3",
                name: "John Boozman",
                party: "R",
                officeType: "senator",
                stateCode: "AR",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "AR"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ar-sen-tom-cotton",
                personKey: "tom-cotton",
                seatKey: "ar-senate-class-2",
                name: "Tom Cotton",
                party: "R",
                officeType: "senator",
                stateCode: "AR",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "AR"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
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
                id: "ar-01-rick-crawford",
                personKey: "rick-crawford",
                seatKey: "ar-house-01",
                name: "Rick Crawford",
                party: "R",
                officeType: "representative",
                stateCode: "AR",
                district: "1",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AR",
                    district: "1"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ar-02-french-hill",
                personKey: "french-hill",
                seatKey: "ar-house-02",
                name: "French Hill",
                party: "R",
                officeType: "representative",
                stateCode: "AR",
                district: "2",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AR",
                    district: "2"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ar-03-steve-womack",
                personKey: "steve-womack",
                seatKey: "ar-house-03",
                name: "Steve Womack",
                party: "R",
                officeType: "representative",
                stateCode: "AR",
                district: "3",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AR",
                    district: "3"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ar-04-bruce-westerman",
                personKey: "bruce-westerman",
                seatKey: "ar-house-04",
                name: "Bruce Westerman",
                party: "R",
                officeType: "representative",
                stateCode: "AR",
                district: "4",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "AR",
                    district: "4"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        CA: {

        /*
        ==============================================
        GOVERNOR
        ==============================================
        */

        governor: {

            id: "ca-gov-gavin-newsom",
            personKey: "gavin-newsom",
            seatKey: "ca-governor",
            name: "Gavin Newsom",
            party: "D",
            officeType: "governor",
            stateCode: "CA",
            servingSince: "2019-01-07",
            currentTermBegan: "2023-01-06",

            jurisdiction: {
                type: "state",
                stateCode: "CA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of California",
                sourceUrl: "https://www.gov.ca.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }

        },

        /*
        ==============================================
        U.S. SENATE
        ==============================================
        */

        senators: [

            {
                id: "ca-sen-adam-schiff",
                personKey: "adam-schiff",
                seatKey: "ca-senate-class-1",
                name: "Adam Schiff",
                party: "D",
                officeType: "senator",
                stateCode: "CA",
                servingSince: "2024-12-09",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "CA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-sen-alex-padilla",
                personKey: "alex-padilla",
                seatKey: "ca-senate-class-3",
                name: "Alex Padilla",
                party: "D",
                officeType: "senator",
                stateCode: "CA",
                servingSince: "2021-01-20",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "CA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        /*
        ==============================================
        U.S. HOUSE
        ==============================================

        CA-01 VACANT
        CA-14 VACANT
        ==============================================
        */

        representatives: [

            {
                id: "ca-02-jared-huffman",
                personKey: "jared-huffman",
                seatKey: "ca-house-02",
                name: "Jared Huffman",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "2",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-03-kevin-kiley",
                personKey: "kevin-kiley",
                seatKey: "ca-house-03",
                name: "Kevin Kiley",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "3",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-04-mike-thompson",
                personKey: "mike-thompson",
                seatKey: "ca-house-04",
                name: "Mike Thompson",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "4",
                servingSince: "1999-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-05-tom-mcclintock",
                personKey: "tom-mcclintock",
                seatKey: "ca-house-05",
                name: "Tom McClintock",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "5",
                servingSince: "2009-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-06-ami-bera",
                personKey: "ami-bera",
                seatKey: "ca-house-06",
                name: "Ami Bera",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "6",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-07-doris-matsui",
                personKey: "doris-matsui",
                seatKey: "ca-house-07",
                name: "Doris Matsui",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "7",
                servingSince: "2005-03-10",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-08-john-garamendi",
                personKey: "john-garamendi",
                seatKey: "ca-house-08",
                name: "John Garamendi",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "8",
                servingSince: "2009-11-05",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-09-josh-harder",
                personKey: "josh-harder",
                seatKey: "ca-house-09",
                name: "Josh Harder",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "9",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-10-mark-desaulnier",
                personKey: "mark-desaulnier",
                seatKey: "ca-house-10",
                name: "Mark DeSaulnier",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "10",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "10"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-11-nancy-pelosi",
                personKey: "nancy-pelosi",
                seatKey: "ca-house-11",
                name: "Nancy Pelosi",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "11",
                servingSince: "1987-06-02",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "11"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-12-lateefah-simon",
                personKey: "lateefah-simon",
                seatKey: "ca-house-12",
                name: "Lateefah Simon",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "12",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "12"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-13-adam-gray",
                personKey: "adam-gray",
                seatKey: "ca-house-13",
                name: "Adam Gray",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "13",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "13"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-15-kevin-mullin",
                personKey: "kevin-mullin",
                seatKey: "ca-house-15",
                name: "Kevin Mullin",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "15",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "15"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-16-sam-liccardo",
                personKey: "sam-liccardo",
                seatKey: "ca-house-16",
                name: "Sam Liccardo",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "16",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "16"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-17-ro-khanna",
                personKey: "ro-khanna",
                seatKey: "ca-house-17",
                name: "Ro Khanna",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "17",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "17"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-18-zoe-lofgren",
                personKey: "zoe-lofgren",
                seatKey: "ca-house-18",
                name: "Zoe Lofgren",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "18",
                servingSince: "1995-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "18"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-19-jimmy-panetta",
                personKey: "jimmy-panetta",
                seatKey: "ca-house-19",
                name: "Jimmy Panetta",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "19",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "19"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-20-vince-fong",
                personKey: "vince-fong",
                seatKey: "ca-house-20",
                name: "Vince Fong",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "20",
                servingSince: "2024-06-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "20"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-21-jim-costa",
                personKey: "jim-costa",
                seatKey: "ca-house-21",
                name: "Jim Costa",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "21",
                servingSince: "2005-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "21"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-22-david-valadao",
                personKey: "david-valadao",
                seatKey: "ca-house-22",
                name: "David Valadao",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "22",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "22"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-23-jay-obernolte",
                personKey: "jay-obernolte",
                seatKey: "ca-house-23",
                name: "Jay Obernolte",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "23",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "23"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-24-salud-carbajal",
                personKey: "salud-carbajal",
                seatKey: "ca-house-24",
                name: "Salud Carbajal",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "24",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "24"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-25-raul-ruiz",
                personKey: "raul-ruiz",
                seatKey: "ca-house-25",
                name: "Raul Ruiz",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "25",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "25"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-26-julia-brownley",
                personKey: "julia-brownley",
                seatKey: "ca-house-26",
                name: "Julia Brownley",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "26",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "26"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-27-george-whitesides",
                personKey: "george-whitesides",
                seatKey: "ca-house-27",
                name: "George Whitesides",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "27",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "27"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-28-judy-chu",
                personKey: "judy-chu",
                seatKey: "ca-house-28",
                name: "Judy Chu",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "28",
                servingSince: "2009-07-16",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "28"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-29-luz-rivas",
                personKey: "luz-rivas",
                seatKey: "ca-house-29",
                name: "Luz Rivas",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "29",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "29"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-30-laura-friedman",
                personKey: "laura-friedman",
                seatKey: "ca-house-30",
                name: "Laura Friedman",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "30",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "30"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-31-gil-cisneros",
                personKey: "gil-cisneros",
                seatKey: "ca-house-31",
                name: "Gil Cisneros",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "31",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "31"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-32-brad-sherman",
                personKey: "brad-sherman",
                seatKey: "ca-house-32",
                name: "Brad Sherman",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "32",
                servingSince: "1997-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "32"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-33-pete-aguilar",
                personKey: "pete-aguilar",
                seatKey: "ca-house-33",
                name: "Pete Aguilar",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "33",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "33"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-34-jimmy-gomez",
                personKey: "jimmy-gomez",
                seatKey: "ca-house-34",
                name: "Jimmy Gomez",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "34",
                servingSince: "2017-07-11",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "34"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-35-norma-torres",
                personKey: "norma-torres",
                seatKey: "ca-house-35",
                name: "Norma Torres",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "35",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "35"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-36-ted-lieu",
                personKey: "ted-lieu",
                seatKey: "ca-house-36",
                name: "Ted Lieu",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "36",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "36"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-37-sydney-kamlager-dove",
                personKey: "sydney-kamlager-dove",
                seatKey: "ca-house-37",
                name: "Sydney Kamlager-Dove",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "37",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "37"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-38-linda-sanchez",
                personKey: "linda-sanchez",
                seatKey: "ca-house-38",
                name: "Linda Sánchez",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "38",
                servingSince: "2003-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "38"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-39-mark-takano",
                personKey: "mark-takano",
                seatKey: "ca-house-39",
                name: "Mark Takano",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "39",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "39"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-40-young-kim",
                personKey: "young-kim",
                seatKey: "ca-house-40",
                name: "Young Kim",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "40",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "40"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-41-ken-calvert",
                personKey: "ken-calvert",
                seatKey: "ca-house-41",
                name: "Ken Calvert",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "41",
                servingSince: "1993-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "41"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-42-robert-garcia",
                personKey: "robert-garcia",
                seatKey: "ca-house-42",
                name: "Robert Garcia",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "42",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "42"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-43-maxine-waters",
                personKey: "maxine-waters",
                seatKey: "ca-house-43",
                name: "Maxine Waters",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "43",
                servingSince: "1991-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "43"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-44-nanette-barragan",
                personKey: "nanette-barragan",
                seatKey: "ca-house-44",
                name: "Nanette Barragán",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "44",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "44"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-45-derek-tran",
                personKey: "derek-tran",
                seatKey: "ca-house-45",
                name: "Derek Tran",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "45",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "45"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-46-lou-correa",
                personKey: "lou-correa",
                seatKey: "ca-house-46",
                name: "Lou Correa",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "46",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "46"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-47-dave-min",
                personKey: "dave-min",
                seatKey: "ca-house-47",
                name: "Dave Min",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "47",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "47"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-48-darrell-issa",
                personKey: "darrell-issa",
                seatKey: "ca-house-48",
                name: "Darrell Issa",
                party: "R",
                officeType: "representative",
                stateCode: "CA",
                district: "48",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "48"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-49-mike-levin",
                personKey: "mike-levin",
                seatKey: "ca-house-49",
                name: "Mike Levin",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "49",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "49"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-50-scott-peters",
                personKey: "scott-peters",
                seatKey: "ca-house-50",
                name: "Scott Peters",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "50",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "50"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-51-sara-jacobs",
                personKey: "sara-jacobs",
                seatKey: "ca-house-51",
                name: "Sara Jacobs",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "51",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "51"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ca-52-juan-vargas",
                personKey: "juan-vargas",
                seatKey: "ca-house-52",
                name: "Juan Vargas",
                party: "D",
                officeType: "representative",
                stateCode: "CA",
                district: "52",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CA",
                    district: "52"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        CO: {

        governor: {
            id: "co-gov-jared-polis",
            personKey: "jared-polis",
            seatKey: "co-governor",
            name: "Jared Polis",
            party: "D",
            officeType: "governor",
            stateCode: "CO",
            servingSince: "2019-01-08",
            currentTermBegan: "2023-01-10",

            jurisdiction: {
                type: "state",
                stateCode: "CO"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Colorado",
                sourceUrl: "https://www.colorado.gov/governor/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "co-sen-michael-bennet",
                personKey: "michael-bennet",
                seatKey: "co-senate-class-3",
                name: "Michael Bennet",
                party: "D",
                officeType: "senator",
                stateCode: "CO",
                servingSince: "2009-01-21",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "CO"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-sen-john-hickenlooper",
                personKey: "john-hickenlooper",
                seatKey: "co-senate-class-2",
                name: "John Hickenlooper",
                party: "D",
                officeType: "senator",
                stateCode: "CO",
                servingSince: "2021-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "CO"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "co-01-diana-degette",
                personKey: "diana-degette",
                seatKey: "co-house-01",
                name: "Diana DeGette",
                party: "D",
                officeType: "representative",
                stateCode: "CO",
                district: "1",
                servingSince: "1997-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-02-joe-neguse",
                personKey: "joe-neguse",
                seatKey: "co-house-02",
                name: "Joe Neguse",
                party: "D",
                officeType: "representative",
                stateCode: "CO",
                district: "2",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-03-jeff-hurd",
                personKey: "jeff-hurd",
                seatKey: "co-house-03",
                name: "Jeff Hurd",
                party: "R",
                officeType: "representative",
                stateCode: "CO",
                district: "3",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-04-lauren-boebert",
                personKey: "lauren-boebert",
                seatKey: "co-house-04",
                name: "Lauren Boebert",
                party: "R",
                officeType: "representative",
                stateCode: "CO",
                district: "4",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-05-jeff-crank",
                personKey: "jeff-crank",
                seatKey: "co-house-05",
                name: "Jeff Crank",
                party: "R",
                officeType: "representative",
                stateCode: "CO",
                district: "5",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-06-jason-crow",
                personKey: "jason-crow",
                seatKey: "co-house-06",
                name: "Jason Crow",
                party: "D",
                officeType: "representative",
                stateCode: "CO",
                district: "6",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-07-brittany-pettersen",
                personKey: "brittany-pettersen",
                seatKey: "co-house-07",
                name: "Brittany Pettersen",
                party: "D",
                officeType: "representative",
                stateCode: "CO",
                district: "7",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "co-08-gabe-evans",
                personKey: "gabe-evans",
                seatKey: "co-house-08",
                name: "Gabe Evans",
                party: "R",
                officeType: "representative",
                stateCode: "CO",
                district: "8",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CO",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    CT: {

        governor: {
            id: "ct-gov-ned-lamont",
            personKey: "ned-lamont",
            seatKey: "ct-governor",
            name: "Ned Lamont",
            party: "D",
            officeType: "governor",
            stateCode: "CT",
            servingSince: "2019-01-09",
            currentTermBegan: "2023-01-04",

            jurisdiction: {
                type: "state",
                stateCode: "CT"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Connecticut",
                sourceUrl: "https://portal.ct.gov/governor"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ct-sen-richard-blumenthal",
                personKey: "richard-blumenthal",
                seatKey: "ct-senate-class-3",
                name: "Richard Blumenthal",
                party: "D",
                officeType: "senator",
                stateCode: "CT",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "CT"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ct-sen-chris-murphy",
                personKey: "chris-murphy",
                seatKey: "ct-senate-class-1",
                name: "Chris Murphy",
                party: "D",
                officeType: "senator",
                stateCode: "CT",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "CT"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "ct-01-john-larson",
                personKey: "john-larson",
                seatKey: "ct-house-01",
                name: "John Larson",
                party: "D",
                officeType: "representative",
                stateCode: "CT",
                district: "1",
                servingSince: "1999-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CT",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ct-02-joe-courtney",
                personKey: "joe-courtney",
                seatKey: "ct-house-02",
                name: "Joe Courtney",
                party: "D",
                officeType: "representative",
                stateCode: "CT",
                district: "2",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CT",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ct-03-rosa-delauro",
                personKey: "rosa-delauro",
                seatKey: "ct-house-03",
                name: "Rosa DeLauro",
                party: "D",
                officeType: "representative",
                stateCode: "CT",
                district: "3",
                servingSince: "1991-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CT",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ct-04-jim-himes",
                personKey: "jim-himes",
                seatKey: "ct-house-04",
                name: "Jim Himes",
                party: "D",
                officeType: "representative",
                stateCode: "CT",
                district: "4",
                servingSince: "2009-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CT",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ct-05-jahana-hayes",
                personKey: "jahana-hayes",
                seatKey: "ct-house-05",
                name: "Jahana Hayes",
                party: "D",
                officeType: "representative",
                stateCode: "CT",
                district: "5",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "CT",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    DE: {

        governor: {
            id: "de-gov-matt-meyer",
            personKey: "matt-meyer",
            seatKey: "de-governor",
            name: "Matt Meyer",
            party: "D",
            officeType: "governor",
            stateCode: "DE",
            servingSince: "2025-01-21",
            currentTermBegan: "2025-01-21",

            jurisdiction: {
                type: "state",
                stateCode: "DE"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Delaware",
                sourceUrl: "https://governor.delaware.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "de-sen-chris-coons",
                personKey: "chris-coons",
                seatKey: "de-senate-class-2",
                name: "Chris Coons",
                party: "D",
                officeType: "senator",
                stateCode: "DE",
                servingSince: "2010-11-15",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "DE"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "de-sen-lisa-blunt-rochester",
                personKey: "lisa-blunt-rochester",
                seatKey: "de-senate-class-1",
                name: "Lisa Blunt Rochester",
                party: "D",
                officeType: "senator",
                stateCode: "DE",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "DE"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "de-at-large-sarah-mcbride",
                personKey: "sarah-mcbride",
                seatKey: "de-house-at-large",
                name: "Sarah McBride",
                party: "D",
                officeType: "representative",
                stateCode: "DE",
                district: "At-Large",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "DE",
                    district: "At-Large"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        FL: {

        governor: {
            id: "fl-gov-ron-desantis",
            personKey: "ron-desantis",
            seatKey: "fl-governor",
            name: "Ron DeSantis",
            party: "R",
            officeType: "governor",
            stateCode: "FL",
            servingSince: "2019-01-08",
            currentTermBegan: "2023-01-03",

            jurisdiction: {
                type: "state",
                stateCode: "FL"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Florida",
                sourceUrl: "https://www.flgov.com/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "fl-sen-rick-scott",
                personKey: "rick-scott",
                seatKey: "fl-senate-class-1",
                name: "Rick Scott",
                party: "R",
                officeType: "senator",
                stateCode: "FL",
                servingSince: "2019-01-08",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "FL"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-sen-ashley-moody",
                personKey: "ashley-moody",
                seatKey: "fl-senate-class-3",
                name: "Ashley Moody",
                party: "R",
                officeType: "senator",
                stateCode: "FL",
                servingSince: "2025-01-21",
                currentTermBegan: "2025-01-21",

                jurisdiction: {
                    type: "state",
                    stateCode: "FL"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        /*
        ==============================================
        U.S. HOUSE

        FL-20 VACANT
        ==============================================
        */

        representatives: [

            {
                id: "fl-01-jimmy-patronis",
                personKey: "jimmy-patronis",
                seatKey: "fl-house-01",
                name: "Jimmy Patronis",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "1",
                servingSince: "2025-04-02",
                currentTermBegan: "2025-04-02",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-02-neal-dunn",
                personKey: "neal-dunn",
                seatKey: "fl-house-02",
                name: "Neal Dunn",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "2",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-03-kat-cammack",
                personKey: "kat-cammack",
                seatKey: "fl-house-03",
                name: "Kat Cammack",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "3",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-04-aaron-bean",
                personKey: "aaron-bean",
                seatKey: "fl-house-04",
                name: "Aaron Bean",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "4",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-05-john-rutherford",
                personKey: "john-rutherford",
                seatKey: "fl-house-05",
                name: "John Rutherford",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "5",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-06-randy-fine",
                personKey: "randy-fine",
                seatKey: "fl-house-06",
                name: "Randy Fine",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "6",
                servingSince: "2025-04-02",
                currentTermBegan: "2025-04-02",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-07-cory-mills",
                personKey: "cory-mills",
                seatKey: "fl-house-07",
                name: "Cory Mills",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "7",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-08-mike-haridopolos",
                personKey: "mike-haridopolos",
                seatKey: "fl-house-08",
                name: "Mike Haridopolos",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "8",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-09-darren-soto",
                personKey: "darren-soto",
                seatKey: "fl-house-09",
                name: "Darren Soto",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "9",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-10-maxwell-frost",
                personKey: "maxwell-frost",
                seatKey: "fl-house-10",
                name: "Maxwell Frost",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "10",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "10"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-11-daniel-webster",
                personKey: "daniel-webster",
                seatKey: "fl-house-11",
                name: "Daniel Webster",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "11",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "11"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-12-gus-bilirakis",
                personKey: "gus-bilirakis",
                seatKey: "fl-house-12",
                name: "Gus Bilirakis",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "12",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "12"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-13-anna-paulina-luna",
                personKey: "anna-paulina-luna",
                seatKey: "fl-house-13",
                name: "Anna Paulina Luna",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "13",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "13"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-14-kathy-castor",
                personKey: "kathy-castor",
                seatKey: "fl-house-14",
                name: "Kathy Castor",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "14",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "14"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-15-laurel-lee",
                personKey: "laurel-lee",
                seatKey: "fl-house-15",
                name: "Laurel Lee",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "15",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "15"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-16-vern-buchanan",
                personKey: "vern-buchanan",
                seatKey: "fl-house-16",
                name: "Vern Buchanan",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "16",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "16"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-17-greg-steube",
                personKey: "greg-steube",
                seatKey: "fl-house-17",
                name: "Greg Steube",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "17",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "17"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-18-scott-franklin",
                personKey: "scott-franklin",
                seatKey: "fl-house-18",
                name: "Scott Franklin",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "18",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "18"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-19-byron-donalds",
                personKey: "byron-donalds",
                seatKey: "fl-house-19",
                name: "Byron Donalds",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "19",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "19"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-21-brian-mast",
                personKey: "brian-mast",
                seatKey: "fl-house-21",
                name: "Brian Mast",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "21",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "21"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-22-lois-frankel",
                personKey: "lois-frankel",
                seatKey: "fl-house-22",
                name: "Lois Frankel",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "22",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "22"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-23-jared-moskowitz",
                personKey: "jared-moskowitz",
                seatKey: "fl-house-23",
                name: "Jared Moskowitz",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "23",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "23"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-24-frederica-wilson",
                personKey: "frederica-wilson",
                seatKey: "fl-house-24",
                name: "Frederica Wilson",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "24",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "24"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-25-debbie-wasserman-schultz",
                personKey: "debbie-wasserman-schultz",
                seatKey: "fl-house-25",
                name: "Debbie Wasserman Schultz",
                party: "D",
                officeType: "representative",
                stateCode: "FL",
                district: "25",
                servingSince: "2005-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "25"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-26-mario-diaz-balart",
                personKey: "mario-diaz-balart",
                seatKey: "fl-house-26",
                name: "Mario Diaz-Balart",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "26",
                servingSince: "2003-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "26"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-27-maria-elvira-salazar",
                personKey: "maria-elvira-salazar",
                seatKey: "fl-house-27",
                name: "Maria Elvira Salazar",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "27",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "27"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "fl-28-carlos-gimenez",
                personKey: "carlos-gimenez",
                seatKey: "fl-house-28",
                name: "Carlos Gimenez",
                party: "R",
                officeType: "representative",
                stateCode: "FL",
                district: "28",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "FL",
                    district: "28"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    GA: {

        governor: {
            id: "ga-gov-brian-kemp",
            personKey: "brian-kemp",
            seatKey: "ga-governor",
            name: "Brian Kemp",
            party: "R",
            officeType: "governor",
            stateCode: "GA",
            servingSince: "2019-01-14",
            currentTermBegan: "2023-01-12",

            jurisdiction: {
                type: "state",
                stateCode: "GA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Georgia",
                sourceUrl: "https://gov.georgia.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ga-sen-jon-ossoff",
                personKey: "jon-ossoff",
                seatKey: "ga-senate-class-2",
                name: "Jon Ossoff",
                party: "D",
                officeType: "senator",
                stateCode: "GA",
                servingSince: "2021-01-20",
                currentTermBegan: "2021-01-20",
                jurisdiction: {
                    type: "state",
                    stateCode: "GA"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-sen-raphael-warnock",
                personKey: "raphael-warnock",
                seatKey: "ga-senate-class-3",
                name: "Raphael Warnock",
                party: "D",
                officeType: "senator",
                stateCode: "GA",
                servingSince: "2021-01-20",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "GA"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        /*
        ==============================================
        U.S. HOUSE

        GA-13 VACANT
        ==============================================
        */

        representatives: [

            {
                id: "ga-01-buddy-carter",
                personKey: "buddy-carter",
                seatKey: "ga-house-01",
                name: "Buddy Carter",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "1",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-02-sanford-bishop",
                personKey: "sanford-bishop",
                seatKey: "ga-house-02",
                name: "Sanford Bishop",
                party: "D",
                officeType: "representative",
                stateCode: "GA",
                district: "2",
                servingSince: "1993-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-03-brian-jack",
                personKey: "brian-jack",
                seatKey: "ga-house-03",
                name: "Brian Jack",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "3",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-04-hank-johnson",
                personKey: "hank-johnson",
                seatKey: "ga-house-04",
                name: "Hank Johnson",
                party: "D",
                officeType: "representative",
                stateCode: "GA",
                district: "4",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-05-nikema-williams",
                personKey: "nikema-williams",
                seatKey: "ga-house-05",
                name: "Nikema Williams",
                party: "D",
                officeType: "representative",
                stateCode: "GA",
                district: "5",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-06-lucy-mcbath",
                personKey: "lucy-mcbath",
                seatKey: "ga-house-06",
                name: "Lucy McBath",
                party: "D",
                officeType: "representative",
                stateCode: "GA",
                district: "6",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-07-rich-mccormick",
                personKey: "rich-mccormick",
                seatKey: "ga-house-07",
                name: "Rich McCormick",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "7",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-08-austin-scott",
                personKey: "austin-scott",
                seatKey: "ga-house-08",
                name: "Austin Scott",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "8",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-09-andrew-clyde",
                personKey: "andrew-clyde",
                seatKey: "ga-house-09",
                name: "Andrew Clyde",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "9",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-10-mike-collins",
                personKey: "mike-collins",
                seatKey: "ga-house-10",
                name: "Mike Collins",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "10",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "10"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-11-barry-loudermilk",
                personKey: "barry-loudermilk",
                seatKey: "ga-house-11",
                name: "Barry Loudermilk",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "11",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "11"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-12-rick-allen",
                personKey: "rick-allen",
                seatKey: "ga-house-12",
                name: "Rick Allen",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "12",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "12"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ga-14-clay-fuller",
                personKey: "clay-fuller",
                seatKey: "ga-house-14",
                name: "Clay Fuller",
                party: "R",
                officeType: "representative",
                stateCode: "GA",
                district: "14",
                servingSince: "2026-04-14",
                currentTermBegan: "2026-04-14",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "GA",
                    district: "14"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    HI: {

        governor: {
            id: "hi-gov-josh-green",
            personKey: "josh-green",
            seatKey: "hi-governor",
            name: "Josh Green",
            party: "D",
            officeType: "governor",
            stateCode: "HI",
            servingSince: "2022-12-05",
            currentTermBegan: "2022-12-05",

            jurisdiction: {
                type: "state",
                stateCode: "HI"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Hawaii",
                sourceUrl: "https://governor.hawaii.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "hi-sen-brian-schatz",
                personKey: "brian-schatz",
                seatKey: "hi-senate-class-3",
                name: "Brian Schatz",
                party: "D",
                officeType: "senator",
                stateCode: "HI",
                servingSince: "2012-12-27",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "HI"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "hi-sen-mazie-hirono",
                personKey: "mazie-hirono",
                seatKey: "hi-senate-class-1",
                name: "Mazie Hirono",
                party: "D",
                officeType: "senator",
                stateCode: "HI",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "HI"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "hi-01-ed-case",
                personKey: "ed-case",
                seatKey: "hi-house-01",
                name: "Ed Case",
                party: "D",
                officeType: "representative",
                stateCode: "HI",
                district: "1",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "HI",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "hi-02-jill-tokuda",
                personKey: "jill-tokuda",
                seatKey: "hi-house-02",
                name: "Jill Tokuda",
                party: "D",
                officeType: "representative",
                stateCode: "HI",
                district: "2",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "HI",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    

},
    ID: {

        governor: {
            id: "id-gov-brad-little",
            personKey: "brad-little",
            seatKey: "id-governor",
            name: "Brad Little",
            party: "R",
            officeType: "governor",
            stateCode: "ID",
            servingSince: "2019-01-07",
            currentTermBegan: "2023-01-02",

            jurisdiction: {
                type: "state",
                stateCode: "ID"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Idaho",
                sourceUrl: "https://gov.idaho.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "id-sen-mike-crapo",
                personKey: "mike-crapo",
                seatKey: "id-senate-class-3",
                name: "Mike Crapo",
                party: "R",
                officeType: "senator",
                stateCode: "ID",
                servingSince: "1999-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "ID"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "id-sen-jim-risch",
                personKey: "jim-risch",
                seatKey: "id-senate-class-2",
                name: "Jim Risch",
                party: "R",
                officeType: "senator",
                stateCode: "ID",
                servingSince: "2009-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "ID"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "id-01-russ-fulcher",
                personKey: "russ-fulcher",
                seatKey: "id-house-01",
                name: "Russ Fulcher",
                party: "R",
                officeType: "representative",
                stateCode: "ID",
                district: "1",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "ID",
                    district: "1"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "id-02-mike-simpson",
                personKey: "mike-simpson",
                seatKey: "id-house-02",
                name: "Mike Simpson",
                party: "R",
                officeType: "representative",
                stateCode: "ID",
                district: "2",
                servingSince: "1999-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "ID",
                    district: "2"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    IL: {

        governor: {
            id: "il-gov-jb-pritzker",
            personKey: "jb-pritzker",
            seatKey: "il-governor",
            name: "JB Pritzker",
            party: "D",
            officeType: "governor",
            stateCode: "IL",
            servingSince: "2019-01-14",
            currentTermBegan: "2023-01-09",

            jurisdiction: {
                type: "state",
                stateCode: "IL"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Illinois",
                sourceUrl: "https://gov.illinois.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "il-sen-dick-durbin",
                personKey: "dick-durbin",
                seatKey: "il-senate-class-2",
                name: "Dick Durbin",
                party: "D",
                officeType: "senator",
                stateCode: "IL",
                servingSince: "1997-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "IL"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-sen-tammy-duckworth",
                personKey: "tammy-duckworth",
                seatKey: "il-senate-class-3",
                name: "Tammy Duckworth",
                party: "D",
                officeType: "senator",
                stateCode: "IL",
                servingSince: "2017-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "IL"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "il-01-jonathan-jackson",
                personKey: "jonathan-jackson",
                seatKey: "il-house-01",
                name: "Jonathan Jackson",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "1",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-02-robin-kelly",
                personKey: "robin-kelly",
                seatKey: "il-house-02",
                name: "Robin Kelly",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "2",
                servingSince: "2013-04-09",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-03-delia-ramirez",
                personKey: "delia-ramirez",
                seatKey: "il-house-03",
                name: "Delia Ramirez",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "3",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-04-jesus-garcia",
                personKey: "jesus-garcia",
                seatKey: "il-house-04",
                name: "Jesús G. \"Chuy\" García",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "4",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-05-mike-quigley",
                personKey: "mike-quigley",
                seatKey: "il-house-05",
                name: "Mike Quigley",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "5",
                servingSince: "2009-04-07",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-06-sean-casten",
                personKey: "sean-casten",
                seatKey: "il-house-06",
                name: "Sean Casten",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "6",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-07-danny-davis",
                personKey: "danny-davis",
                seatKey: "il-house-07",
                name: "Danny K. Davis",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "7",
                servingSince: "1997-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-08-raja-krishnamoorthi",
                personKey: "raja-krishnamoorthi",
                seatKey: "il-house-08",
                name: "Raja Krishnamoorthi",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "8",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-09-jan-schakowsky",
                personKey: "jan-schakowsky",
                seatKey: "il-house-09",
                name: "Jan Schakowsky",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "9",
                servingSince: "1999-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-10-brad-schneider",
                personKey: "brad-schneider",
                seatKey: "il-house-10",
                name: "Brad Schneider",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "10",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "10"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-11-bill-foster",
                personKey: "bill-foster",
                seatKey: "il-house-11",
                name: "Bill Foster",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "11",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "11"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-12-mike-bost",
                personKey: "mike-bost",
                seatKey: "il-house-12",
                name: "Mike Bost",
                party: "R",
                officeType: "representative",
                stateCode: "IL",
                district: "12",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "12"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-13-nikki-budzinski",
                personKey: "nikki-budzinski",
                seatKey: "il-house-13",
                name: "Nikki Budzinski",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "13",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "13"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-14-lauren-underwood",
                personKey: "lauren-underwood",
                seatKey: "il-house-14",
                name: "Lauren Underwood",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "14",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "14"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-15-mary-miller",
                personKey: "mary-miller",
                seatKey: "il-house-15",
                name: "Mary Miller",
                party: "R",
                officeType: "representative",
                stateCode: "IL",
                district: "15",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "15"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-16-darin-lahood",
                personKey: "darin-lahood",
                seatKey: "il-house-16",
                name: "Darin LaHood",
                party: "R",
                officeType: "representative",
                stateCode: "IL",
                district: "16",
                servingSince: "2015-09-17",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "16"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "il-17-eric-sorensen",
                personKey: "eric-sorensen",
                seatKey: "il-house-17",
                name: "Eric Sorensen",
                party: "D",
                officeType: "representative",
                stateCode: "IL",
                district: "17",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IL",
                    district: "17"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        IN: {

        governor: {
            id: "in-gov-mike-braun",
            personKey: "mike-braun",
            seatKey: "in-governor",
            name: "Mike Braun",
            party: "R",
            officeType: "governor",
            stateCode: "IN",
            servingSince: "2025-01-13",
            currentTermBegan: "2025-01-13",

            jurisdiction: {
                type: "state",
                stateCode: "IN"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Indiana",
                sourceUrl: "https://www.in.gov/gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "in-sen-todd-young",
                personKey: "todd-young",
                seatKey: "in-senate-class-3",
                name: "Todd Young",
                party: "R",
                officeType: "senator",
                stateCode: "IN",
                servingSince: "2017-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "IN"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-sen-jim-banks",
                personKey: "jim-banks",
                seatKey: "in-senate-class-1",
                name: "Jim Banks",
                party: "R",
                officeType: "senator",
                stateCode: "IN",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "IN"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "in-01-frank-mrvan",
                personKey: "frank-mrvan",
                seatKey: "in-house-01",
                name: "Frank Mrvan",
                party: "D",
                officeType: "representative",
                stateCode: "IN",
                district: "1",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-02-rudy-yakym",
                personKey: "rudy-yakym",
                seatKey: "in-house-02",
                name: "Rudy Yakym",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "2",
                servingSince: "2022-11-14",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-03-marlin-stutzman",
                personKey: "marlin-stutzman",
                seatKey: "in-house-03",
                name: "Marlin Stutzman",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "3",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-04-jim-baird",
                personKey: "jim-baird",
                seatKey: "in-house-04",
                name: "Jim Baird",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "4",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-05-victoria-spartz",
                personKey: "victoria-spartz",
                seatKey: "in-house-05",
                name: "Victoria Spartz",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "5",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-06-jefferson-shreve",
                personKey: "jefferson-shreve",
                seatKey: "in-house-06",
                name: "Jefferson Shreve",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "6",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-07-andre-carson",
                personKey: "andre-carson",
                seatKey: "in-house-07",
                name: "André Carson",
                party: "D",
                officeType: "representative",
                stateCode: "IN",
                district: "7",
                servingSince: "2008-03-13",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-08-mark-messmer",
                personKey: "mark-messmer",
                seatKey: "in-house-08",
                name: "Mark Messmer",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "8",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "in-09-erin-houchin",
                personKey: "erin-houchin",
                seatKey: "in-house-09",
                name: "Erin Houchin",
                party: "R",
                officeType: "representative",
                stateCode: "IN",
                district: "9",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IN",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    IA: {

        governor: {
            id: "ia-gov-kim-reynolds",
            personKey: "kim-reynolds",
            seatKey: "ia-governor",
            name: "Kim Reynolds",
            party: "R",
            officeType: "governor",
            stateCode: "IA",
            servingSince: "2017-05-24",
            currentTermBegan: "2023-01-13",

            jurisdiction: {
                type: "state",
                stateCode: "IA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Iowa",
                sourceUrl: "https://governor.iowa.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ia-sen-chuck-grassley",
                personKey: "chuck-grassley",
                seatKey: "ia-senate-class-3",
                name: "Chuck Grassley",
                party: "R",
                officeType: "senator",
                stateCode: "IA",
                servingSince: "1981-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "IA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ia-sen-joni-ernst",
                personKey: "joni-ernst",
                seatKey: "ia-senate-class-2",
                name: "Joni Ernst",
                party: "R",
                officeType: "senator",
                stateCode: "IA",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "IA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "ia-01-mariannette-miller-meeks",
                personKey: "mariannette-miller-meeks",
                seatKey: "ia-house-01",
                name: "Mariannette Miller-Meeks",
                party: "R",
                officeType: "representative",
                stateCode: "IA",
                district: "1",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IA",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ia-02-ashley-hinson",
                personKey: "ashley-hinson",
                seatKey: "ia-house-02",
                name: "Ashley Hinson",
                party: "R",
                officeType: "representative",
                stateCode: "IA",
                district: "2",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IA",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ia-03-zach-nunn",
                personKey: "zach-nunn",
                seatKey: "ia-house-03",
                name: "Zach Nunn",
                party: "R",
                officeType: "representative",
                stateCode: "IA",
                district: "3",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IA",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ia-04-randy-feenstra",
                personKey: "randy-feenstra",
                seatKey: "ia-house-04",
                name: "Randy Feenstra",
                party: "R",
                officeType: "representative",
                stateCode: "IA",
                district: "4",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "IA",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    KS: {

        governor: {
            id: "ks-gov-laura-kelly",
            personKey: "laura-kelly",
            seatKey: "ks-governor",
            name: "Laura Kelly",
            party: "D",
            officeType: "governor",
            stateCode: "KS",
            servingSince: "2019-01-14",
            currentTermBegan: "2023-01-09",

            jurisdiction: {
                type: "state",
                stateCode: "KS"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Kansas",
                sourceUrl: "https://governor.kansas.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ks-sen-jerry-moran",
                personKey: "jerry-moran",
                seatKey: "ks-senate-class-1",
                name: "Jerry Moran",
                party: "R",
                officeType: "senator",
                stateCode: "KS",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "KS"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ks-sen-roger-marshall",
                personKey: "roger-marshall",
                seatKey: "ks-senate-class-2",
                name: "Roger Marshall",
                party: "R",
                officeType: "senator",
                stateCode: "KS",
                servingSince: "2021-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "KS"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "ks-01-tracey-mann",
                personKey: "tracey-mann",
                seatKey: "ks-house-01",
                name: "Tracey Mann",
                party: "R",
                officeType: "representative",
                stateCode: "KS",
                district: "1",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KS",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ks-02-derek-schmidt",
                personKey: "derek-schmidt",
                seatKey: "ks-house-02",
                name: "Derek Schmidt",
                party: "R",
                officeType: "representative",
                stateCode: "KS",
                district: "2",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KS",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ks-03-sharice-davids",
                personKey: "sharice-davids",
                seatKey: "ks-house-03",
                name: "Sharice Davids",
                party: "D",
                officeType: "representative",
                stateCode: "KS",
                district: "3",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KS",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ks-04-ron-estes",
                personKey: "ron-estes",
                seatKey: "ks-house-04",
                name: "Ron Estes",
                party: "R",
                officeType: "representative",
                stateCode: "KS",
                district: "4",
                servingSince: "2017-04-25",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KS",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        KY: {

        governor: {
            id: "ky-gov-andy-beshear",
            personKey: "andy-beshear",
            seatKey: "ky-governor",
            name: "Andy Beshear",
            party: "D",
            officeType: "governor",
            stateCode: "KY",
            servingSince: "2019-12-10",
            currentTermBegan: "2023-12-12",

            jurisdiction: {
                type: "state",
                stateCode: "KY"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Kentucky",
                sourceUrl: "https://governor.ky.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ky-sen-mitch-mcconnell",
                personKey: "mitch-mcconnell",
                seatKey: "ky-senate-class-2",
                name: "Mitch McConnell",
                party: "R",
                officeType: "senator",
                stateCode: "KY",
                servingSince: "1985-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "KY"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ky-sen-rand-paul",
                personKey: "rand-paul",
                seatKey: "ky-senate-class-3",
                name: "Rand Paul",
                party: "R",
                officeType: "senator",
                stateCode: "KY",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "KY"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "ky-01-james-comer",
                personKey: "james-comer",
                seatKey: "ky-house-01",
                name: "James Comer",
                party: "R",
                officeType: "representative",
                stateCode: "KY",
                district: "1",
                servingSince: "2016-11-14",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KY",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ky-02-brett-guthrie",
                personKey: "brett-guthrie",
                seatKey: "ky-house-02",
                name: "Brett Guthrie",
                party: "R",
                officeType: "representative",
                stateCode: "KY",
                district: "2",
                servingSince: "2009-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KY",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ky-03-morgan-mcgarvey",
                personKey: "morgan-mcgarvey",
                seatKey: "ky-house-03",
                name: "Morgan McGarvey",
                party: "D",
                officeType: "representative",
                stateCode: "KY",
                district: "3",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KY",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ky-04-thomas-massie",
                personKey: "thomas-massie",
                seatKey: "ky-house-04",
                name: "Thomas Massie",
                party: "R",
                officeType: "representative",
                stateCode: "KY",
                district: "4",
                servingSince: "2012-11-13",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KY",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ky-05-hal-rogers",
                personKey: "hal-rogers",
                seatKey: "ky-house-05",
                name: "Hal Rogers",
                party: "R",
                officeType: "representative",
                stateCode: "KY",
                district: "5",
                servingSince: "1981-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KY",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ky-06-andy-barr",
                personKey: "andy-barr",
                seatKey: "ky-house-06",
                name: "Andy Barr",
                party: "R",
                officeType: "representative",
                stateCode: "KY",
                district: "6",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "KY",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    LA: {

        governor: {
            id: "la-gov-jeff-landry",
            personKey: "jeff-landry",
            seatKey: "la-governor",
            name: "Jeff Landry",
            party: "R",
            officeType: "governor",
            stateCode: "LA",
            servingSince: "2024-01-08",
            currentTermBegan: "2024-01-08",

            jurisdiction: {
                type: "state",
                stateCode: "LA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Louisiana",
                sourceUrl: "https://gov.louisiana.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "la-sen-bill-cassidy",
                personKey: "bill-cassidy",
                seatKey: "la-senate-class-2",
                name: "Bill Cassidy",
                party: "R",
                officeType: "senator",
                stateCode: "LA",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "LA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "la-sen-john-kennedy",
                personKey: "john-kennedy",
                seatKey: "la-senate-class-3",
                name: "John Kennedy",
                party: "R",
                officeType: "senator",
                stateCode: "LA",
                servingSince: "2017-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "LA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "la-01-steve-scalise",
                personKey: "steve-scalise",
                seatKey: "la-house-01",
                name: "Steve Scalise",
                party: "R",
                officeType: "representative",
                stateCode: "LA",
                district: "1",
                servingSince: "2008-05-07",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "LA",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "la-02-troy-carter",
                personKey: "troy-carter",
                seatKey: "la-house-02",
                name: "Troy Carter",
                party: "D",
                officeType: "representative",
                stateCode: "LA",
                district: "2",
                servingSince: "2021-05-11",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "LA",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "la-03-clay-higgins",
                personKey: "clay-higgins",
                seatKey: "la-house-03",
                name: "Clay Higgins",
                party: "R",
                officeType: "representative",
                stateCode: "LA",
                district: "3",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "LA",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "la-04-mike-johnson",
                personKey: "mike-johnson",
                seatKey: "la-house-04",
                name: "Mike Johnson",
                party: "R",
                officeType: "representative",
                stateCode: "LA",
                district: "4",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "LA",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "la-05-julia-letlow",
                personKey: "julia-letlow",
                seatKey: "la-house-05",
                name: "Julia Letlow",
                party: "R",
                officeType: "representative",
                stateCode: "LA",
                district: "5",
                servingSince: "2021-04-14",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "LA",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "la-06-cleo-fields",
                personKey: "cleo-fields",
                seatKey: "la-house-06",
                name: "Cleo Fields",
                party: "D",
                officeType: "representative",
                stateCode: "LA",
                district: "6",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "LA",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    ME: {

        governor: {
            id: "me-gov-janet-mills",
            personKey: "janet-mills",
            seatKey: "me-governor",
            name: "Janet Mills",
            party: "D",
            officeType: "governor",
            stateCode: "ME",
            servingSince: "2019-01-02",
            currentTermBegan: "2023-01-04",

            jurisdiction: {
                type: "state",
                stateCode: "ME"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Maine",
                sourceUrl: "https://www.maine.gov/governor/mills/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "me-sen-susan-collins",
                personKey: "susan-collins",
                seatKey: "me-senate-class-2",
                name: "Susan Collins",
                party: "R",
                officeType: "senator",
                stateCode: "ME",
                servingSince: "1997-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "ME"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "me-sen-angus-king",
                personKey: "angus-king",
                seatKey: "me-senate-class-1",
                name: "Angus King",
                party: "I",
                officeType: "senator",
                stateCode: "ME",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "ME"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "me-01-chellie-pingree",
                personKey: "chellie-pingree",
                seatKey: "me-house-01",
                name: "Chellie Pingree",
                party: "D",
                officeType: "representative",
                stateCode: "ME",
                district: "1",
                servingSince: "2009-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "ME",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "me-02-jared-golden",
                personKey: "jared-golden",
                seatKey: "me-house-02",
                name: "Jared Golden",
                party: "D",
                officeType: "representative",
                stateCode: "ME",
                district: "2",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "ME",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },
        MD: {

        governor: {
            id: "md-gov-wes-moore",
            personKey: "wes-moore",
            seatKey: "md-governor",
            name: "Wes Moore",
            party: "D",
            officeType: "governor",
            stateCode: "MD",
            servingSince: "2023-01-18",
            currentTermBegan: "2023-01-18",

            jurisdiction: {
                type: "state",
                stateCode: "MD"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Maryland",
                sourceUrl: "https://governor.maryland.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "md-sen-chris-van-hollen",
                personKey: "chris-van-hollen",
                seatKey: "md-senate-class-3",
                name: "Chris Van Hollen",
                party: "D",
                officeType: "senator",
                stateCode: "MD",
                servingSince: "2017-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "MD"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-sen-angela-alsobrooks",
                personKey: "angela-alsobrooks",
                seatKey: "md-senate-class-1",
                name: "Angela Alsobrooks",
                party: "D",
                officeType: "senator",
                stateCode: "MD",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "MD"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "md-01-andy-harris",
                personKey: "andy-harris",
                seatKey: "md-house-01",
                name: "Andy Harris",
                party: "R",
                officeType: "representative",
                stateCode: "MD",
                district: "1",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-02-johnny-olszewski",
                personKey: "johnny-olszewski",
                seatKey: "md-house-02",
                name: "Johnny Olszewski",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "2",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-03-sarah-elfreth",
                personKey: "sarah-elfreth",
                seatKey: "md-house-03",
                name: "Sarah Elfreth",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "3",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-04-glenn-ivey",
                personKey: "glenn-ivey",
                seatKey: "md-house-04",
                name: "Glenn Ivey",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "4",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-05-steny-hoyer",
                personKey: "steny-hoyer",
                seatKey: "md-house-05",
                name: "Steny Hoyer",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "5",
                servingSince: "1981-05-19",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-06-april-mcclain-delaney",
                personKey: "april-mcclain-delaney",
                seatKey: "md-house-06",
                name: "April McClain Delaney",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "6",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-07-kweisi-mfume",
                personKey: "kweisi-mfume",
                seatKey: "md-house-07",
                name: "Kweisi Mfume",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "7",
                servingSince: "2020-05-05",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "md-08-jamie-raskin",
                personKey: "jamie-raskin",
                seatKey: "md-house-08",
                name: "Jamie Raskin",
                party: "D",
                officeType: "representative",
                stateCode: "MD",
                district: "8",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MD",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    MA: {

        governor: {
            id: "ma-gov-maura-healey",
            personKey: "maura-healey",
            seatKey: "ma-governor",
            name: "Maura Healey",
            party: "D",
            officeType: "governor",
            stateCode: "MA",
            servingSince: "2023-01-05",
            currentTermBegan: "2023-01-05",

            jurisdiction: {
                type: "state",
                stateCode: "MA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Massachusetts",
                sourceUrl: "https://www.mass.gov/orgs/office-of-the-governor"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ma-sen-elizabeth-warren",
                personKey: "elizabeth-warren",
                seatKey: "ma-senate-class-1",
                name: "Elizabeth Warren",
                party: "D",
                officeType: "senator",
                stateCode: "MA",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "MA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-sen-ed-markey",
                personKey: "ed-markey",
                seatKey: "ma-senate-class-2",
                name: "Ed Markey",
                party: "D",
                officeType: "senator",
                stateCode: "MA",
                servingSince: "2013-07-16",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "MA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "ma-01-richard-neal",
                personKey: "richard-neal",
                seatKey: "ma-house-01",
                name: "Richard Neal",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "1",
                servingSince: "1989-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-02-james-mcgovern",
                personKey: "james-mcgovern",
                seatKey: "ma-house-02",
                name: "James McGovern",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "2",
                servingSince: "1997-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-03-lori-trahan",
                personKey: "lori-trahan",
                seatKey: "ma-house-03",
                name: "Lori Trahan",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "3",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-04-jake-auchincloss",
                personKey: "jake-auchincloss",
                seatKey: "ma-house-04",
                name: "Jake Auchincloss",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "4",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-05-katherine-clark",
                personKey: "katherine-clark",
                seatKey: "ma-house-05",
                name: "Katherine Clark",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "5",
                servingSince: "2013-12-12",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-06-seth-moulton",
                personKey: "seth-moulton",
                seatKey: "ma-house-06",
                name: "Seth Moulton",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "6",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-07-ayanna-pressley",
                personKey: "ayanna-pressley",
                seatKey: "ma-house-07",
                name: "Ayanna Pressley",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "7",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-08-stephen-lynch",
                personKey: "stephen-lynch",
                seatKey: "ma-house-08",
                name: "Stephen Lynch",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "8",
                servingSince: "2001-10-23",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ma-09-william-keating",
                personKey: "william-keating",
                seatKey: "ma-house-09",
                name: "William Keating",
                party: "D",
                officeType: "representative",
                stateCode: "MA",
                district: "9",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MA",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    

},
    MI: {

        governor: {
            id: "mi-gov-gretchen-whitmer",
            personKey: "gretchen-whitmer",
            seatKey: "mi-governor",
            name: "Gretchen Whitmer",
            party: "D",
            officeType: "governor",
            stateCode: "MI",
            servingSince: "2019-01-01",
            currentTermBegan: "2023-01-01",

            jurisdiction: {
                type: "state",
                stateCode: "MI"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Michigan",
                sourceUrl: "https://www.michigan.gov/whitmer"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "mi-sen-gary-peters",
                personKey: "gary-peters",
                seatKey: "mi-senate-class-2",
                name: "Gary Peters",
                party: "D",
                officeType: "senator",
                stateCode: "MI",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "MI"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-sen-elissa-slotkin",
                personKey: "elissa-slotkin",
                seatKey: "mi-senate-class-1",
                name: "Elissa Slotkin",
                party: "D",
                officeType: "senator",
                stateCode: "MI",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "MI"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "mi-01-jack-bergman",
                personKey: "jack-bergman",
                seatKey: "mi-house-01",
                name: "Jack Bergman",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "1",
                servingSince: "2017-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "1"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-02-john-moolenaar",
                personKey: "john-moolenaar",
                seatKey: "mi-house-02",
                name: "John Moolenaar",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "2",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "2"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-03-hillary-scholten",
                personKey: "hillary-scholten",
                seatKey: "mi-house-03",
                name: "Hillary Scholten",
                party: "D",
                officeType: "representative",
                stateCode: "MI",
                district: "3",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "3"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-04-bill-huizenga",
                personKey: "bill-huizenga",
                seatKey: "mi-house-04",
                name: "Bill Huizenga",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "4",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "4"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-05-tim-walberg",
                personKey: "tim-walberg",
                seatKey: "mi-house-05",
                name: "Tim Walberg",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "5",
                servingSince: "2011-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "5"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-06-debbie-dingell",
                personKey: "debbie-dingell",
                seatKey: "mi-house-06",
                name: "Debbie Dingell",
                party: "D",
                officeType: "representative",
                stateCode: "MI",
                district: "6",
                servingSince: "2015-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "6"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-07-tom-barrett",
                personKey: "tom-barrett",
                seatKey: "mi-house-07",
                name: "Tom Barrett",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "7",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "7"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-08-kristen-mcdonald-rivet",
                personKey: "kristen-mcdonald-rivet",
                seatKey: "mi-house-08",
                name: "Kristen McDonald Rivet",
                party: "D",
                officeType: "representative",
                stateCode: "MI",
                district: "8",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "8"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-09-lisa-mcclain",
                personKey: "lisa-mcclain",
                seatKey: "mi-house-09",
                name: "Lisa McClain",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "9",
                servingSince: "2021-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "9"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-10-john-james",
                personKey: "john-james",
                seatKey: "mi-house-10",
                name: "John James",
                party: "R",
                officeType: "representative",
                stateCode: "MI",
                district: "10",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "10"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-11-haley-stevens",
                personKey: "haley-stevens",
                seatKey: "mi-house-11",
                name: "Haley Stevens",
                party: "D",
                officeType: "representative",
                stateCode: "MI",
                district: "11",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "11"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-12-rashida-tlaib",
                personKey: "rashida-tlaib",
                seatKey: "mi-house-12",
                name: "Rashida Tlaib",
                party: "D",
                officeType: "representative",
                stateCode: "MI",
                district: "12",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "12"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mi-13-shri-thanedar",
                personKey: "shri-thanedar",
                seatKey: "mi-house-13",
                name: "Shri Thanedar",
                party: "D",
                officeType: "representative",
                stateCode: "MI",
                district: "13",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "MI",
                    district: "13"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    MN: {

        governor: {
            id: "mn-gov-tim-walz",
            personKey: "tim-walz",
            seatKey: "mn-governor",
            name: "Tim Walz",
            party: "D",
            officeType: "governor",
            stateCode: "MN",
            servingSince: "2019-01-07",
            currentTermBegan: "2023-01-02",

            jurisdiction: {
                type: "state",
                stateCode: "MN"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Minnesota",
                sourceUrl: "https://mn.gov/governor/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "mn-sen-amy-klobuchar",
                personKey: "amy-klobuchar",
                seatKey: "mn-senate-class-1",
                name: "Amy Klobuchar",
                party: "D",
                officeType: "senator",
                stateCode: "MN",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MN"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mn-sen-tina-smith",
                personKey: "tina-smith",
                seatKey: "mn-senate-class-2",
                name: "Tina Smith",
                party: "D",
                officeType: "senator",
                stateCode: "MN",
                servingSince: "2018-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MN"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Brad Finstad", "brad-finstad", "R", "2022-08-12"],
            ["2", "Angie Craig", "angie-craig", "D", "2019-01-03"],
            ["3", "Kelly Morrison", "kelly-morrison", "D", "2025-01-03"],
            ["4", "Betty McCollum", "betty-mccollum", "D", "2001-01-03"],
            ["5", "Ilhan Omar", "ilhan-omar", "D", "2019-01-03"],
            ["6", "Tom Emmer", "tom-emmer", "R", "2015-01-03"],
            ["7", "Michelle Fischbach", "michelle-fischbach", "R", "2021-01-03"],
            ["8", "Pete Stauber", "pete-stauber", "R", "2019-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `mn-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `mn-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "MN",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "MN",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    MS: {

        governor: {
            id: "ms-gov-tate-reeves",
            personKey: "tate-reeves",
            seatKey: "ms-governor",
            name: "Tate Reeves",
            party: "R",
            officeType: "governor",
            stateCode: "MS",
            servingSince: "2020-01-14",
            currentTermBegan: "2024-01-09",

            jurisdiction: {
                type: "state",
                stateCode: "MS"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Mississippi",
                sourceUrl: "https://governorreeves.ms.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ms-sen-roger-wicker",
                personKey: "roger-wicker",
                seatKey: "ms-senate-class-1",
                name: "Roger Wicker",
                party: "R",
                officeType: "senator",
                stateCode: "MS",
                servingSince: "2007-12-31",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MS"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ms-sen-cindy-hyde-smith",
                personKey: "cindy-hyde-smith",
                seatKey: "ms-senate-class-2",
                name: "Cindy Hyde-Smith",
                party: "R",
                officeType: "senator",
                stateCode: "MS",
                servingSince: "2018-04-09",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MS"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Trent Kelly", "trent-kelly", "R", "2015-06-09"],
            ["2", "Bennie G. Thompson", "bennie-thompson", "D", "1993-04-13"],
            ["3", "Michael Guest", "michael-guest", "R", "2019-01-03"],
            ["4", "Mike Ezell", "mike-ezell", "R", "2023-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `ms-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `ms-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "MS",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "MS",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    
},
    MO: {

        governor: {
            id: "mo-gov-mike-kehoe",
            personKey: "mike-kehoe",
            seatKey: "mo-governor",
            name: "Mike Kehoe",
            party: "R",
            officeType: "governor",
            stateCode: "MO",
            servingSince: "2025-01-13",
            currentTermBegan: "2025-01-13",
            jurisdiction: {
                type: "state",
                stateCode: "MO"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Missouri",
                sourceUrl: "https://governor.mo.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "mo-sen-josh-hawley",
                personKey: "josh-hawley",
                seatKey: "mo-senate-class-1",
                name: "Josh Hawley",
                party: "R",
                officeType: "senator",
                stateCode: "MO",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MO"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mo-sen-eric-schmitt",
                personKey: "eric-schmitt",
                seatKey: "mo-senate-class-3",
                name: "Eric Schmitt",
                party: "R",
                officeType: "senator",
                stateCode: "MO",
                servingSince: "2023-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MO"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Wesley Bell", "wesley-bell", "D", "2025-01-03"],
            ["2", "Ann Wagner", "ann-wagner", "R", "2013-01-03"],
            ["3", "Robert Onder", "robert-onder", "R", "2025-01-03"],
            ["4", "Mark Alford", "mark-alford", "R", "2023-01-03"],
            ["5", "Emanuel Cleaver", "emanuel-cleaver", "D", "2005-01-03"],
            ["6", "Sam Graves", "sam-graves", "R", "2001-01-03"],
            ["7", "Eric Burlison", "eric-burlison", "R", "2023-01-03"],
            ["8", "Jason Smith", "jason-smith", "R", "2013-06-04"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `mo-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `mo-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "MO",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "MO",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    MT: {

        governor: {
            id: "mt-gov-greg-gianforte",
            personKey: "greg-gianforte",
            seatKey: "mt-governor",
            name: "Greg Gianforte",
            party: "R",
            officeType: "governor",
            stateCode: "MT",
            servingSince: "2021-01-04",
            currentTermBegan: "2025-01-06",
            jurisdiction: {
                type: "state",
                stateCode: "MT"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Montana",
                sourceUrl: "https://governor.mt.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "mt-sen-steve-daines",
                personKey: "steve-daines",
                seatKey: "mt-senate-class-2",
                name: "Steve Daines",
                party: "R",
                officeType: "senator",
                stateCode: "MT",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MT"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "mt-sen-tim-sheehy",
                personKey: "tim-sheehy",
                seatKey: "mt-senate-class-1",
                name: "Tim Sheehy",
                party: "R",
                officeType: "senator",
                stateCode: "MT",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "MT"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Ryan Zinke", "ryan-zinke", "R", "2023-01-03"],
            ["2", "Troy Downing", "troy-downing", "R", "2025-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `mt-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `mt-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "MT",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "MT",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    NE: {

        governor: {
            id: "ne-gov-jim-pillen",
            personKey: "jim-pillen",
            seatKey: "ne-governor",
            name: "Jim Pillen",
            party: "R",
            officeType: "governor",
            stateCode: "NE",
            servingSince: "2023-01-05",
            currentTermBegan: "2023-01-05",
            jurisdiction: {
                type: "state",
                stateCode: "NE"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Nebraska",
                sourceUrl: "https://governor.nebraska.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ne-sen-deb-fischer",
                personKey: "deb-fischer",
                seatKey: "ne-senate-class-1",
                name: "Deb Fischer",
                party: "R",
                officeType: "senator",
                stateCode: "NE",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NE"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ne-sen-pete-ricketts",
                personKey: "pete-ricketts",
                seatKey: "ne-senate-class-2",
                name: "Pete Ricketts",
                party: "R",
                officeType: "senator",
                stateCode: "NE",
                servingSince: "2023-01-23",
                currentTermBegan: "2023-01-23",
                jurisdiction: {
                    type: "state",
                    stateCode: "NE"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Mike Flood", "mike-flood", "R", "2022-07-12"],
            ["2", "Don Bacon", "don-bacon", "R", "2017-01-03"],
            ["3", "Adrian Smith", "adrian-smith", "R", "2007-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `ne-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `ne-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "NE",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "NE",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    

},
    NV: {

        governor: {
            id: "nv-gov-joe-lombardo",
            personKey: "joe-lombardo",
            seatKey: "nv-governor",
            name: "Joe Lombardo",
            party: "R",
            officeType: "governor",
            stateCode: "NV",
            servingSince: "2023-01-02",
            currentTermBegan: "2023-01-02",
            jurisdiction: {
                type: "state",
                stateCode: "NV"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Nevada",
                sourceUrl: "https://gov.nv.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "nv-sen-catherine-cortez-masto",
                personKey: "catherine-cortez-masto",
                seatKey: "nv-senate-class-3",
                name: "Catherine Cortez Masto",
                party: "D",
                officeType: "senator",
                stateCode: "NV",
                servingSince: "2017-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NV"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "nv-sen-jacky-rosen",
                personKey: "jacky-rosen",
                seatKey: "nv-senate-class-1",
                name: "Jacky Rosen",
                party: "D",
                officeType: "senator",
                stateCode: "NV",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NV"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Dina Titus", "dina-titus", "D", "2013-01-03"],
            ["2", "Mark Amodei", "mark-amodei", "R", "2011-09-13"],
            ["3", "Susie Lee", "susie-lee", "D", "2019-01-03"],
            ["4", "Steven Horsford", "steven-horsford", "D", "2019-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `nv-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `nv-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "NV",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "NV",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    NH: {

        governor: {
            id: "nh-gov-kelly-ayotte",
            personKey: "kelly-ayotte",
            seatKey: "nh-governor",
            name: "Kelly Ayotte",
            party: "R",
            officeType: "governor",
            stateCode: "NH",
            servingSince: "2025-01-09",
            currentTermBegan: "2025-01-09",
            jurisdiction: {
                type: "state",
                stateCode: "NH"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of New Hampshire",
                sourceUrl: "https://www.governor.nh.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "nh-sen-jeanne-shaheen",
                personKey: "jeanne-shaheen",
                seatKey: "nh-senate-class-2",
                name: "Jeanne Shaheen",
                party: "D",
                officeType: "senator",
                stateCode: "NH",
                servingSince: "2009-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NH"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "nh-sen-maggie-hassan",
                personKey: "maggie-hassan",
                seatKey: "nh-senate-class-3",
                name: "Maggie Hassan",
                party: "D",
                officeType: "senator",
                stateCode: "NH",
                servingSince: "2017-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NH"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Chris Pappas", "chris-pappas", "D", "2019-01-03"],
            ["2", "Maggie Goodlander", "maggie-goodlander", "D", "2025-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `nh-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `nh-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "NH",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "NH",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    NM: {

        governor: {
            id: "nm-gov-michelle-lujan-grisham",
            personKey: "michelle-lujan-grisham",
            seatKey: "nm-governor",
            name: "Michelle Lujan Grisham",
            party: "D",
            officeType: "governor",
            stateCode: "NM",
            servingSince: "2019-01-01",
            currentTermBegan: "2023-01-01",
            jurisdiction: {
                type: "state",
                stateCode: "NM"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of New Mexico",
                sourceUrl: "https://www.governor.state.nm.us/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "nm-sen-martin-heinrich",
                personKey: "martin-heinrich",
                seatKey: "nm-senate-class-1",
                name: "Martin Heinrich",
                party: "D",
                officeType: "senator",
                stateCode: "NM",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NM"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "nm-sen-ben-ray-lujan",
                personKey: "ben-ray-lujan",
                seatKey: "nm-senate-class-2",
                name: "Ben Ray Luján",
                party: "D",
                officeType: "senator",
                stateCode: "NM",
                servingSince: "2021-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NM"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Melanie Stansbury", "melanie-stansbury", "D", "2021-06-14"],
            ["2", "Gabe Vasquez", "gabe-vasquez", "D", "2023-01-03"],
            ["3", "Teresa Leger Fernández", "teresa-leger-fernandez", "D", "2021-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `nm-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `nm-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "NM",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "NM",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    

},
    NY: {

        governor: {
            id: "ny-gov-kathy-hochul",
            personKey: "kathy-hochul",
            seatKey: "ny-governor",
            name: "Kathy Hochul",
            party: "D",
            officeType: "governor",
            stateCode: "NY",
            servingSince: "2021-08-24",
            currentTermBegan: "2023-01-01",
            jurisdiction: {
                type: "state",
                stateCode: "NY"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of New York",
                sourceUrl: "https://www.governor.ny.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ny-sen-kirsten-gillibrand",
                personKey: "kirsten-gillibrand",
                seatKey: "ny-senate-class-1",
                name: "Kirsten Gillibrand",
                party: "D",
                officeType: "senator",
                stateCode: "NY",
                servingSince: "2009-01-26",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NY"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ny-sen-charles-schumer",
                personKey: "charles-schumer",
                seatKey: "ny-senate-class-3",
                name: "Charles Schumer",
                party: "D",
                officeType: "senator",
                stateCode: "NY",
                servingSince: "1999-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NY"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Nick LaLota", "nick-lalota", "R", "2023-01-03"],
            ["2", "Andrew Garbarino", "andrew-garbarino", "R", "2021-01-03"],
            ["3", "Thomas Suozzi", "thomas-suozzi", "D", "2024-02-28"],
            ["4", "Laura Gillen", "laura-gillen", "D", "2025-01-03"],
            ["5", "Gregory Meeks", "gregory-meeks", "D", "1998-02-05"],
            ["6", "Grace Meng", "grace-meng", "D", "2013-01-03"],
            ["7", "Nydia Velázquez", "nydia-velazquez", "D", "1993-01-03"],
            ["8", "Hakeem Jeffries", "hakeem-jeffries", "D", "2013-01-03"],
            ["9", "Yvette Clarke", "yvette-clarke", "D", "2007-01-03"],
            ["10", "Daniel Goldman", "daniel-goldman", "D", "2023-01-03"],
            ["11", "Nicole Malliotakis", "nicole-malliotakis", "R", "2021-01-03"],
            ["12", "Jerrold Nadler", "jerrold-nadler", "D", "1992-11-03"],
            ["13", "Adriano Espaillat", "adriano-espaillat", "D", "2017-01-03"],
            ["14", "Alexandria Ocasio-Cortez", "alexandria-ocasio-cortez", "D", "2019-01-03"],
            ["15", "Ritchie Torres", "ritchie-torres", "D", "2021-01-03"],
            ["16", "George Latimer", "george-latimer", "D", "2025-01-03"],
            ["17", "Mike Lawler", "mike-lawler", "R", "2023-01-03"],
            ["18", "Pat Ryan", "pat-ryan", "D", "2022-09-13"],
            ["19", "Josh Riley", "josh-riley", "D", "2025-01-03"],
            ["20", "Paul Tonko", "paul-tonko", "D", "2009-01-03"],
            ["21", "Elise Stefanik", "elise-stefanik", "R", "2015-01-03"],
            ["22", "John Mannion", "john-mannion", "D", "2025-01-03"],
            ["23", "Nick Langworthy", "nick-langworthy", "R", "2023-01-03"],
            ["24", "Claudia Tenney", "claudia-tenney", "R", "2021-01-03"],
            ["25", "Joseph Morelle", "joseph-morelle", "D", "2018-11-13"],
            ["26", "Timothy Kennedy", "timothy-kennedy", "D", "2024-05-06"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `ny-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `ny-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "NY",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "NY",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    NC: {

        governor: {
            id: "nc-gov-josh-stein",
            personKey: "josh-stein",
            seatKey: "nc-governor",
            name: "Josh Stein",
            party: "D",
            officeType: "governor",
            stateCode: "NC",
            servingSince: "2025-01-01",
            currentTermBegan: "2025-01-01",
            jurisdiction: {
                type: "state",
                stateCode: "NC"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of North Carolina",
                sourceUrl: "https://governor.nc.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "nc-sen-thom-tillis",
                personKey: "thom-tillis",
                seatKey: "nc-senate-class-2",
                name: "Thom Tillis",
                party: "R",
                officeType: "senator",
                stateCode: "NC",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NC"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "nc-sen-ted-budd",
                personKey: "ted-budd",
                seatKey: "nc-senate-class-3",
                name: "Ted Budd",
                party: "R",
                officeType: "senator",
                stateCode: "NC",
                servingSince: "2023-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "NC"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Don Davis", "don-davis", "D", "2023-01-03"],
            ["2", "Deborah Ross", "deborah-ross", "D", "2021-01-03"],
            ["3", "Greg Murphy", "greg-murphy", "R", "2019-09-17"],
            ["4", "Valerie Foushee", "valerie-foushee", "D", "2023-01-03"],
            ["5", "Virginia Foxx", "virginia-foxx", "R", "2005-01-03"],
            ["6", "Addison McDowell", "addison-mcdowell", "R", "2025-01-03"],
            ["7", "David Rouzer", "david-rouzer", "R", "2015-01-03"],
            ["8", "Mark Harris", "mark-harris", "R", "2025-01-03"],
            ["9", "Richard Hudson", "richard-hudson", "R", "2013-01-03"],
            ["10", "Pat Harrigan", "pat-harrigan", "R", "2025-01-03"],
            ["11", "Chuck Edwards", "chuck-edwards", "R", "2023-01-03"],
            ["12", "Alma Adams", "alma-adams", "D", "2014-11-12"],
            ["13", "Brad Knott", "brad-knott", "R", "2025-01-03"],
            ["14", "Tim Moore", "tim-moore", "R", "2025-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `nc-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `nc-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "NC",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "NC",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    ND: {

        governor: {
            id: "nd-gov-kelly-armstrong",
            personKey: "kelly-armstrong",
            seatKey: "nd-governor",
            name: "Kelly Armstrong",
            party: "R",
            officeType: "governor",
            stateCode: "ND",
            servingSince: "2024-12-15",
            currentTermBegan: "2024-12-15",
            jurisdiction: {
                type: "state",
                stateCode: "ND"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of North Dakota",
                sourceUrl: "https://www.governor.nd.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "nd-sen-john-hoeven",
                personKey: "john-hoeven",
                seatKey: "nd-senate-class-3",
                name: "John Hoeven",
                party: "R",
                officeType: "senator",
                stateCode: "ND",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "ND"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "nd-sen-kevin-cramer",
                personKey: "kevin-cramer",
                seatKey: "nd-senate-class-1",
                name: "Kevin Cramer",
                party: "R",
                officeType: "senator",
                stateCode: "ND",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "ND"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "nd-at-large-julie-fedorchak",
                personKey: "julie-fedorchak",
                seatKey: "nd-house-at-large",
                name: "Julie Fedorchak",
                party: "R",
                officeType: "representative",
                stateCode: "ND",
                district: "At Large",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "ND",
                    district: "At Large"
                },
                sources: [],
                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    

},
    OH: {

        governor: {
            id: "oh-gov-mike-dewine",
            personKey: "mike-dewine",
            seatKey: "oh-governor",
            name: "Mike DeWine",
            party: "R",
            officeType: "governor",
            stateCode: "OH",
            servingSince: "2019-01-14",
            currentTermBegan: "2023-01-09",
            jurisdiction: {
                type: "state",
                stateCode: "OH"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Ohio",
                sourceUrl: "https://governor.ohio.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "oh-sen-bernie-moreno",
                personKey: "bernie-moreno",
                seatKey: "oh-senate-class-1",
                name: "Bernie Moreno",
                party: "R",
                officeType: "senator",
                stateCode: "OH",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "OH"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "oh-sen-jon-husted",
                personKey: "jon-husted",
                seatKey: "oh-senate-class-3",
                name: "Jon Husted",
                party: "R",
                officeType: "senator",
                stateCode: "OH",
                servingSince: "2025-01-21",
                currentTermBegan: "2025-01-21",
                jurisdiction: {
                    type: "state",
                    stateCode: "OH"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Greg Landsman", "greg-landsman", "D", "2023-01-03"],
            ["2", "David Taylor", "david-taylor", "R", "2025-01-03"],
            ["3", "Joyce Beatty", "joyce-beatty", "D", "2013-01-03"],
            ["4", "Jim Jordan", "jim-jordan", "R", "2007-01-03"],
            ["5", "Robert Latta", "robert-latta", "R", "2007-12-13"],
            ["6", "Michael Rulli", "michael-rulli", "R", "2024-06-25"],
            ["7", "Max Miller", "max-miller", "R", "2023-01-03"],
            ["8", "Warren Davidson", "warren-davidson", "R", "2016-06-09"],
            ["9", "Marcy Kaptur", "marcy-kaptur", "D", "1983-01-03"],
            ["10", "Michael Turner", "michael-turner", "R", "2003-01-03"],
            ["11", "Shontel Brown", "shontel-brown", "D", "2021-11-04"],
            ["12", "Troy Balderson", "troy-balderson", "R", "2018-09-05"],
            ["13", "Emilia Strong Sykes", "emilia-strong-sykes", "D", "2023-01-03"],
            ["14", "David Joyce", "david-joyce", "R", "2013-01-03"],
            ["15", "Mike Carey", "mike-carey", "R", "2021-11-04"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `oh-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `oh-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "OH",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "OH",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    OK: {

        governor: {
            id: "ok-gov-kevin-stitt",
            personKey: "kevin-stitt",
            seatKey: "ok-governor",
            name: "Kevin Stitt",
            party: "R",
            officeType: "governor",
            stateCode: "OK",
            servingSince: "2019-01-14",
            currentTermBegan: "2023-01-09",
            jurisdiction: {
                type: "state",
                stateCode: "OK"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Oklahoma",
                sourceUrl: "https://oklahoma.gov/governor.html"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ok-sen-james-lankford",
                personKey: "james-lankford",
                seatKey: "ok-senate-class-3",
                name: "James Lankford",
                party: "R",
                officeType: "senator",
                stateCode: "OK",
                servingSince: "2015-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "OK"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ok-sen-alan-armstrong",
                personKey: "alan-armstrong",
                seatKey: "ok-senate-class-2",
                name: "Alan Armstrong",
                party: "R",
                officeType: "senator",
                stateCode: "OK",
                servingSince: "2026-03-24",
                currentTermBegan: "2026-03-24",
                jurisdiction: {
                    type: "state",
                    stateCode: "OK"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Kevin Hern", "kevin-hern", "R", "2018-11-13"],
            ["2", "Josh Brecheen", "josh-brecheen", "R", "2023-01-03"],
            ["3", "Frank Lucas", "frank-lucas", "R", "1994-05-10"],
            ["4", "Tom Cole", "tom-cole", "R", "2003-01-03"],
            ["5", "Stephanie Bice", "stephanie-bice", "R", "2021-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `ok-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `ok-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "OK",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "OK",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    OR: {

        governor: {
            id: "or-gov-tina-kotek",
            personKey: "tina-kotek",
            seatKey: "or-governor",
            name: "Tina Kotek",
            party: "D",
            officeType: "governor",
            stateCode: "OR",
            servingSince: "2023-01-09",
            currentTermBegan: "2023-01-09",
            jurisdiction: {
                type: "state",
                stateCode: "OR"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Oregon",
                sourceUrl: "https://www.oregon.gov/gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "or-sen-ron-wyden",
                personKey: "ron-wyden",
                seatKey: "or-senate-class-3",
                name: "Ron Wyden",
                party: "D",
                officeType: "senator",
                stateCode: "OR",
                servingSince: "1996-02-06",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "OR"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "or-sen-jeff-merkley",
                personKey: "jeff-merkley",
                seatKey: "or-senate-class-2",
                name: "Jeff Merkley",
                party: "D",
                officeType: "senator",
                stateCode: "OR",
                servingSince: "2009-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "OR"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Suzanne Bonamici", "suzanne-bonamici", "D", "2012-02-07"],
            ["2", "Cliff Bentz", "cliff-bentz", "R", "2021-01-03"],
            ["3", "Maxine Dexter", "maxine-dexter", "D", "2025-01-03"],
            ["4", "Val Hoyle", "val-hoyle", "D", "2023-01-03"],
            ["5", "Janelle Bynum", "janelle-bynum", "D", "2025-01-03"],
            ["6", "Andrea Salinas", "andrea-salinas", "D", "2023-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `or-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `or-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "OR",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "OR",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    

},
    PA: {

        governor: {
            id: "pa-gov-josh-shapiro",
            personKey: "josh-shapiro",
            seatKey: "pa-governor",
            name: "Josh Shapiro",
            party: "D",
            officeType: "governor",
            stateCode: "PA",
            servingSince: "2023-01-17",
            currentTermBegan: "2023-01-17",
            jurisdiction: {
                type: "state",
                stateCode: "PA"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Pennsylvania",
                sourceUrl: "https://www.pa.gov/governor/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "pa-sen-john-fetterman",
                personKey: "john-fetterman",
                seatKey: "pa-senate-class-1",
                name: "John Fetterman",
                party: "D",
                officeType: "senator",
                stateCode: "PA",
                servingSince: "2023-01-03",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "PA"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "pa-sen-dave-mccormick",
                personKey: "dave-mccormick",
                seatKey: "pa-senate-class-3",
                name: "Dave McCormick",
                party: "R",
                officeType: "senator",
                stateCode: "PA",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "PA"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Brian Fitzpatrick", "brian-fitzpatrick", "R", "2017-01-03"],
            ["2", "Brendan Boyle", "brendan-boyle", "D", "2015-01-03"],
            ["3", "Dwight Evans", "dwight-evans", "D", "2016-11-14"],
            ["4", "Madeleine Dean", "madeleine-dean", "D", "2019-01-03"],
            ["5", "Mary Gay Scanlon", "mary-gay-scanlon", "D", "2018-11-13"],
            ["6", "Chrissy Houlahan", "chrissy-houlahan", "D", "2019-01-03"],
            ["7", "Ryan Mackenzie", "ryan-mackenzie", "R", "2025-01-03"],
            ["8", "Robert Bresnahan Jr.", "robert-bresnahan", "R", "2025-01-03"],
            ["9", "Dan Meuser", "dan-meuser", "R", "2019-01-03"],
            ["10", "Scott Perry", "scott-perry", "R", "2013-01-03"],
            ["11", "Lloyd Smucker", "lloyd-smucker", "R", "2017-01-03"],
            ["12", "Summer Lee", "summer-lee", "D", "2023-01-03"],
            ["13", "John Joyce", "john-joyce", "R", "2019-01-03"],
            ["14", "Guy Reschenthaler", "guy-reschenthaler", "R", "2019-01-03"],
            ["15", "Glenn Thompson", "glenn-thompson", "R", "2009-01-03"],
            ["16", "Mike Kelly", "mike-kelly", "R", "2011-01-03"],
            ["17", "Chris Deluzio", "chris-deluzio", "D", "2023-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `pa-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `pa-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "PA",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "PA",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    RI: {

        governor: {
            id: "ri-gov-dan-mckee",
            personKey: "dan-mckee",
            seatKey: "ri-governor",
            name: "Dan McKee",
            party: "D",
            officeType: "governor",
            stateCode: "RI",
            servingSince: "2021-03-02",
            currentTermBegan: "2023-01-03",
            jurisdiction: {
                type: "state",
                stateCode: "RI"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Rhode Island",
                sourceUrl: "https://governor.ri.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ri-sen-jack-reed",
                personKey: "jack-reed",
                seatKey: "ri-senate-class-2",
                name: "Jack Reed",
                party: "D",
                officeType: "senator",
                stateCode: "RI",
                servingSince: "1997-01-03",
                currentTermBegan: "2021-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "RI"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ri-sen-sheldon-whitehouse",
                personKey: "sheldon-whitehouse",
                seatKey: "ri-senate-class-1",
                name: "Sheldon Whitehouse",
                party: "D",
                officeType: "senator",
                stateCode: "RI",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "RI"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Gabe Amo", "gabe-amo", "D", "2023-11-13"],
            ["2", "Seth Magaziner", "seth-magaziner", "D", "2023-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `ri-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `ri-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "RI",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "RI",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    SC: {

        governor: {
            id: "sc-gov-henry-mcmaster",
            personKey: "henry-mcmaster",
            seatKey: "sc-governor",
            name: "Henry McMaster",
            party: "R",
            officeType: "governor",
            stateCode: "SC",
            servingSince: "2017-01-24",
            currentTermBegan: "2023-01-11",
            jurisdiction: {
                type: "state",
                stateCode: "SC"
            },
            sources: [],
            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of South Carolina",
                sourceUrl: "https://governor.sc.gov/"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "sc-sen-tim-scott",
                personKey: "tim-scott",
                seatKey: "sc-senate-class-3",
                name: "Tim Scott",
                party: "R",
                officeType: "senator",
                stateCode: "SC",
                servingSince: "2013-01-02",
                currentTermBegan: "2023-01-03",
                jurisdiction: {
                    type: "state",
                    stateCode: "SC"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "sc-sen-darline-graham",
                personKey: "darline-graham",
                seatKey: "sc-senate-class-2",
                name: "Darline Graham",
                party: "R",
                officeType: "senator",
                stateCode: "SC",
                servingSince: "2026-07-14",
                currentTermBegan: "2026-07-14",
                jurisdiction: {
                    type: "state",
                    stateCode: "SC"
                },
                sources: [],
                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },
                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Nancy Mace", "nancy-mace", "R", "2021-01-03"],
            ["2", "Joe Wilson", "joe-wilson", "R", "2001-12-18"],
            ["3", "Sheri Biggs", "sheri-biggs", "R", "2025-01-03"],
            ["4", "William Timmons", "william-timmons", "R", "2019-01-03"],
            ["5", "Ralph Norman", "ralph-norman", "R", "2017-06-20"],
            ["6", "James Clyburn", "james-clyburn", "D", "1993-01-03"],
            ["7", "Russell Fry", "russell-fry", "R", "2023-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `sc-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `sc-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "SC",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",
            jurisdiction: {
                type: "congressional-district",
                stateCode: "SC",
                district
            },
            sources: [],
            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },
            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    

},
    SD: {

        governor: {
            id: "sd-gov-larry-rhoden",
            personKey: "larry-rhoden",
            seatKey: "sd-governor",
            name: "Larry Rhoden",
            party: "R",
            officeType: "governor",
            stateCode: "SD",
            servingSince: "2025-01-27",
            currentTermBegan: "2025-01-27",

            jurisdiction: {
                type: "state",
                stateCode: "SD"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of South Dakota",
                sourceUrl: "https://governor.sd.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "sd-sen-john-thune",
                personKey: "john-thune",
                seatKey: "sd-senate-class-3",
                name: "John Thune",
                party: "R",
                officeType: "senator",
                stateCode: "SD",
                servingSince: "2005-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "SD"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "sd-sen-mike-rounds",
                personKey: "mike-rounds",
                seatKey: "sd-senate-class-2",
                name: "Mike Rounds",
                party: "R",
                officeType: "senator",
                stateCode: "SD",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "SD"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "sd-at-large-dusty-johnson",
                personKey: "dusty-johnson",
                seatKey: "sd-house-at-large",
                name: "Dusty Johnson",
                party: "R",
                officeType: "representative",
                stateCode: "SD",
                district: "At Large",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "SD",
                    district: "At Large"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    

},
    TN: {

        governor: {
            id: "tn-gov-bill-lee",
            personKey: "bill-lee",
            seatKey: "tn-governor",
            name: "Bill Lee",
            party: "R",
            officeType: "governor",
            stateCode: "TN",
            servingSince: "2019-01-19",
            currentTermBegan: "2023-01-21",

            jurisdiction: {
                type: "state",
                stateCode: "TN"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Tennessee",
                sourceUrl: "https://www.tn.gov/governor.html"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "tn-sen-marsha-blackburn",
                personKey: "marsha-blackburn",
                seatKey: "tn-senate-class-1",
                name: "Marsha Blackburn",
                party: "R",
                officeType: "senator",
                stateCode: "TN",
                servingSince: "2019-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "TN"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "tn-sen-bill-hagerty",
                personKey: "bill-hagerty",
                seatKey: "tn-senate-class-2",
                name: "Bill Hagerty",
                party: "R",
                officeType: "senator",
                stateCode: "TN",
                servingSince: "2021-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "TN"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Diana Harshbarger", "diana-harshbarger", "R", "2021-01-03"],
            ["2", "Tim Burchett", "tim-burchett", "R", "2019-01-03"],
            ["3", "Chuck Fleischmann", "chuck-fleischmann", "R", "2011-01-03"],
            ["4", "Scott DesJarlais", "scott-desjarlais", "R", "2011-01-03"],
            ["5", "Andy Ogles", "andy-ogles", "R", "2023-01-03"],
            ["6", "John Rose", "john-rose", "R", "2019-01-03"],
            ["7", "Matt Van Epps", "matt-van-epps", "R", "2025-12-04"],
            ["8", "David Kustoff", "david-kustoff", "R", "2017-01-03"],
            ["9", "Steve Cohen", "steve-cohen", "D", "2007-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `tn-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `tn-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "TN",
            district,
            servingSince,
            currentTermBegan:
                district === "7"
                    ? "2025-12-04"
                    : "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "TN",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    TX: {

        governor: {
            id: "tx-gov-greg-abbott",
            personKey: "greg-abbott",
            seatKey: "tx-governor",
            name: "Greg Abbott",
            party: "R",
            officeType: "governor",
            stateCode: "TX",
            servingSince: "2015-01-20",
            currentTermBegan: "2023-01-17",

            jurisdiction: {
                type: "state",
                stateCode: "TX"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Texas",
                sourceUrl: "https://gov.texas.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "tx-sen-john-cornyn",
                personKey: "john-cornyn",
                seatKey: "tx-senate-class-2",
                name: "John Cornyn",
                party: "R",
                officeType: "senator",
                stateCode: "TX",
                servingSince: "2002-12-02",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "TX"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "tx-sen-ted-cruz",
                personKey: "ted-cruz",
                seatKey: "tx-senate-class-1",
                name: "Ted Cruz",
                party: "R",
                officeType: "senator",
                stateCode: "TX",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "TX"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        /*
        ==============================================
        U.S. HOUSE

        TX-23 VACANT
        ==============================================
        */

        representatives: [

            ["1", "Nathaniel Moran", "nathaniel-moran", "R", "2023-01-03"],
            ["2", "Dan Crenshaw", "dan-crenshaw", "R", "2019-01-03"],
            ["3", "Keith Self", "keith-self", "R", "2023-01-03"],
            ["4", "Pat Fallon", "pat-fallon", "R", "2021-01-03"],
            ["5", "Lance Gooden", "lance-gooden", "R", "2019-01-03"],
            ["6", "Jake Ellzey", "jake-ellzey", "R", "2021-07-30"],
            ["7", "Lizzie Fletcher", "lizzie-fletcher", "D", "2019-01-03"],
            ["8", "Morgan Luttrell", "morgan-luttrell", "R", "2023-01-03"],
            ["9", "Al Green", "al-green", "D", "2005-01-03"],
            ["10", "Michael McCaul", "michael-mccaul", "R", "2005-01-03"],
            ["11", "August Pfluger", "august-pfluger", "R", "2021-01-03"],
            ["12", "Craig Goldman", "craig-goldman", "R", "2025-01-03"],
            ["13", "Ronny Jackson", "ronny-jackson", "R", "2021-01-03"],
            ["14", "Randy Weber", "randy-weber", "R", "2013-01-03"],
            ["15", "Monica De La Cruz", "monica-de-la-cruz", "R", "2023-01-03"],
            ["16", "Veronica Escobar", "veronica-escobar", "D", "2019-01-03"],
            ["17", "Pete Sessions", "pete-sessions", "R", "2021-01-03"],
            ["18", "Christian Menefee", "christian-menefee", "D", "2026-02-02"],
            ["19", "Jodey Arrington", "jodey-arrington", "R", "2017-01-03"],
            ["20", "Joaquin Castro", "joaquin-castro", "D", "2013-01-03"],
            ["21", "Chip Roy", "chip-roy", "R", "2019-01-03"],
            ["22", "Troy Nehls", "troy-nehls", "R", "2021-01-03"],

            ["24", "Beth Van Duyne", "beth-van-duyne", "R", "2021-01-03"],
            ["25", "Roger Williams", "roger-williams", "R", "2013-01-03"],
            ["26", "Brandon Gill", "brandon-gill", "R", "2025-01-03"],
            ["27", "Michael Cloud", "michael-cloud", "R", "2018-07-10"],
            ["28", "Henry Cuellar", "henry-cuellar", "D", "2005-01-03"],
            ["29", "Sylvia Garcia", "sylvia-garcia", "D", "2019-01-03"],
            ["30", "Jasmine Crockett", "jasmine-crockett", "D", "2023-01-03"],
            ["31", "John Carter", "john-carter", "R", "2003-01-03"],
            ["32", "Julie Johnson", "julie-johnson", "D", "2025-01-03"],
            ["33", "Marc Veasey", "marc-veasey", "D", "2013-01-03"],
            ["34", "Vicente Gonzalez", "vicente-gonzalez", "D", "2017-01-03"],
            ["35", "Greg Casar", "greg-casar", "D", "2023-01-03"],
            ["36", "Brian Babin", "brian-babin", "R", "2015-01-03"],
            ["37", "Lloyd Doggett", "lloyd-doggett", "D", "1995-01-03"],
            ["38", "Wesley Hunt", "wesley-hunt", "R", "2023-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `tx-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `tx-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "TX",
            district,
            servingSince,

            currentTermBegan:
                district === "18"
                    ? "2026-02-02"
                    : "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "TX",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    UT: {

        governor: {
            id: "ut-gov-spencer-cox",
            personKey: "spencer-cox",
            seatKey: "ut-governor",
            name: "Spencer Cox",
            party: "R",
            officeType: "governor",
            stateCode: "UT",
            servingSince: "2021-01-04",
            currentTermBegan: "2025-01-06",

            jurisdiction: {
                type: "state",
                stateCode: "UT"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Utah",
                sourceUrl: "https://governor.utah.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "ut-sen-mike-lee",
                personKey: "mike-lee",
                seatKey: "ut-senate-class-3",
                name: "Mike Lee",
                party: "R",
                officeType: "senator",
                stateCode: "UT",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "UT"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "ut-sen-john-curtis",
                personKey: "john-curtis",
                seatKey: "ut-senate-class-1",
                name: "John Curtis",
                party: "R",
                officeType: "senator",
                stateCode: "UT",
                servingSince: "2025-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "UT"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Blake Moore", "blake-moore", "R", "2021-01-03"],
            ["2", "Celeste Maloy", "celeste-maloy", "R", "2023-11-28"],
            ["3", "Mike Kennedy", "mike-kennedy", "R", "2025-01-03"],
            ["4", "Burgess Owens", "burgess-owens", "R", "2021-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `ut-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `ut-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "UT",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "UT",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    

},
    VT: {

        governor: {
            id: "vt-gov-phil-scott",
            personKey: "phil-scott",
            seatKey: "vt-governor",
            name: "Phil Scott",
            party: "R",
            officeType: "governor",
            stateCode: "VT",
            servingSince: "2017-01-05",
            currentTermBegan: "2025-01-09",

            jurisdiction: {
                type: "state",
                stateCode: "VT"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Vermont",
                sourceUrl: "https://governor.vermont.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "vt-sen-bernie-sanders",
                personKey: "bernie-sanders",
                seatKey: "vt-senate-class-1",
                name: "Bernie Sanders",
                party: "I",
                officeType: "senator",
                stateCode: "VT",
                servingSince: "2007-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "VT"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "vt-sen-peter-welch",
                personKey: "peter-welch",
                seatKey: "vt-senate-class-3",
                name: "Peter Welch",
                party: "D",
                officeType: "senator",
                stateCode: "VT",
                servingSince: "2023-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "VT"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            {
                id: "vt-at-large-becca-balint",
                personKey: "becca-balint",
                seatKey: "vt-house-at-large",
                name: "Becca Balint",
                party: "D",
                officeType: "representative",
                stateCode: "VT",
                district: "At Large",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "VT",
                    district: "At Large"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    },


    VA: {

        governor: {
            id: "va-gov-abigail-spanberger",
            personKey: "abigail-spanberger",
            seatKey: "va-governor",
            name: "Abigail Spanberger",
            party: "D",
            officeType: "governor",
            stateCode: "VA",
            servingSince: "2026-01-17",
            currentTermBegan: "2026-01-17",

            jurisdiction: {
                type: "state",
                stateCode: "VA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Virginia",
                sourceUrl: "https://www.governor.virginia.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "va-sen-mark-warner",
                personKey: "mark-warner",
                seatKey: "va-senate-class-2",
                name: "Mark Warner",
                party: "D",
                officeType: "senator",
                stateCode: "VA",
                servingSince: "2009-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "VA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "va-sen-tim-kaine",
                personKey: "tim-kaine",
                seatKey: "va-senate-class-1",
                name: "Tim Kaine",
                party: "D",
                officeType: "senator",
                stateCode: "VA",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "VA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Robert Wittman", "robert-wittman", "R", "2007-12-11"],
            ["2", "Jennifer Kiggans", "jennifer-kiggans", "R", "2023-01-03"],
            ["3", "Robert Scott", "robert-scott", "D", "1993-01-03"],
            ["4", "Jennifer McClellan", "jennifer-mcclellan", "D", "2023-03-07"],
            ["5", "John McGuire", "john-mcguire", "R", "2025-01-03"],
            ["6", "Ben Cline", "ben-cline", "R", "2019-01-03"],
            ["7", "Eugene Vindman", "eugene-vindman", "D", "2025-01-03"],
            ["8", "Donald Beyer", "donald-beyer", "D", "2015-01-03"],
            ["9", "Morgan Griffith", "morgan-griffith", "R", "2011-01-03"],
            ["10", "Suhas Subramanyam", "suhas-subramanyam", "D", "2025-01-03"],
            ["11", "James Walkinshaw", "james-walkinshaw", "D", "2025-09-10"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `va-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `va-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "VA",
            district,
            servingSince,

            currentTermBegan:
                district === "11"
                    ? "2025-09-10"
                    : "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "VA",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    },


    WA: {

        governor: {
            id: "wa-gov-bob-ferguson",
            personKey: "bob-ferguson",
            seatKey: "wa-governor",
            name: "Bob Ferguson",
            party: "D",
            officeType: "governor",
            stateCode: "WA",
            servingSince: "2025-01-15",
            currentTermBegan: "2025-01-15",

            jurisdiction: {
                type: "state",
                stateCode: "WA"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Washington",
                sourceUrl: "https://governor.wa.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },

        senators: [

            {
                id: "wa-sen-patty-murray",
                personKey: "patty-murray",
                seatKey: "wa-senate-class-3",
                name: "Patty Murray",
                party: "D",
                officeType: "senator",
                stateCode: "WA",
                servingSince: "1993-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "wa-sen-maria-cantwell",
                personKey: "maria-cantwell",
                seatKey: "wa-senate-class-1",
                name: "Maria Cantwell",
                party: "D",
                officeType: "senator",
                stateCode: "WA",
                servingSince: "2001-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WA"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],

        representatives: [

            ["1", "Suzan DelBene", "suzan-delbene", "D", "2012-11-13"],
            ["2", "Rick Larsen", "rick-larsen", "D", "2001-01-03"],
            ["3", "Marie Gluesenkamp Perez", "marie-gluesenkamp-perez", "D", "2023-01-03"],
            ["4", "Dan Newhouse", "dan-newhouse", "R", "2015-01-03"],
            ["5", "Michael Baumgartner", "michael-baumgartner", "R", "2025-01-03"],
            ["6", "Emily Randall", "emily-randall", "D", "2025-01-03"],
            ["7", "Pramila Jayapal", "pramila-jayapal", "D", "2017-01-03"],
            ["8", "Kim Schrier", "kim-schrier", "D", "2019-01-03"],
            ["9", "Adam Smith", "adam-smith", "D", "1997-01-03"],
            ["10", "Marilyn Strickland", "marilyn-strickland", "D", "2021-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({
            id: `wa-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `wa-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "WA",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "WA",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        }))

    

},
    WV: {

        governor: {
            id: "wv-gov-patrick-morrisey",
            personKey: "patrick-morrisey",
            seatKey: "wv-governor",
            name: "Patrick Morrisey",
            party: "R",
            officeType: "governor",
            stateCode: "WV",
            servingSince: "2025-01-13",
            currentTermBegan: "2025-01-13",

            jurisdiction: {
                type: "state",
                stateCode: "WV"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of West Virginia",
                sourceUrl: "https://governor.wv.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },


        senators: [

            {
                id: "wv-sen-shelley-moore-capito",
                personKey: "shelley-moore-capito",
                seatKey: "wv-senate-class-2",
                name: "Shelley Moore Capito",
                party: "R",
                officeType: "senator",
                stateCode: "WV",
                servingSince: "2015-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WV"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "wv-sen-jim-justice",
                personKey: "jim-justice",
                seatKey: "wv-senate-class-1",
                name: "Jim Justice",
                party: "R",
                officeType: "senator",
                stateCode: "WV",
                servingSince: "2025-01-14",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WV"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],


        representatives: [

            ["1", "Carol Miller", "carol-miller", "R", "2019-01-03"],
            ["2", "Riley Moore", "riley-moore", "R", "2025-01-03"]

        ].map(([district, name, personKey, party, servingSince]) => ({

            id: `wv-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `wv-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "WV",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "WV",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }

        }))

    },


    WI: {

        governor: {
            id: "wi-gov-tony-evers",
            personKey: "tony-evers",
            seatKey: "wi-governor",
            name: "Tony Evers",
            party: "D",
            officeType: "governor",
            stateCode: "WI",
            servingSince: "2019-01-07",
            currentTermBegan: "2023-01-03",

            jurisdiction: {
                type: "state",
                stateCode: "WI"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Wisconsin",
                sourceUrl: "https://evers.wi.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },


        senators: [

            {
                id: "wi-sen-tammy-baldwin",
                personKey: "tammy-baldwin",
                seatKey: "wi-senate-class-1",
                name: "Tammy Baldwin",
                party: "D",
                officeType: "senator",
                stateCode: "WI",
                servingSince: "2013-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WI"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "wi-sen-ron-johnson",
                personKey: "ron-johnson",
                seatKey: "wi-senate-class-3",
                name: "Ron Johnson",
                party: "R",
                officeType: "senator",
                stateCode: "WI",
                servingSince: "2011-01-03",
                currentTermBegan: "2023-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WI"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],


        representatives: [

            ["1", "Bryan Steil", "bryan-steil", "R", "2019-01-03"],
            ["2", "Mark Pocan", "mark-pocan", "D", "2013-01-03"],
            ["3", "Derrick Van Orden", "derrick-van-orden", "R", "2023-01-03"],
            ["4", "Gwen Moore", "gwen-moore", "D", "2005-01-03"],
            ["5", "Scott Fitzgerald", "scott-fitzgerald", "R", "2021-01-03"],
            ["6", "Glenn Grothman", "glenn-grothman", "R", "2015-01-03"],
            ["7", "Tom Tiffany", "tom-tiffany", "R", "2020-05-19"],
            ["8", "Tony Wied", "tony-wied", "R", "2024-11-12"]

        ].map(([district, name, personKey, party, servingSince]) => ({

            id: `wi-${district.padStart(2, "0")}-${personKey}`,
            personKey,
            seatKey: `wi-house-${district.padStart(2, "0")}`,
            name,
            party,
            officeType: "representative",
            stateCode: "WI",
            district,
            servingSince,
            currentTermBegan: "2025-01-03",

            jurisdiction: {
                type: "congressional-district",
                stateCode: "WI",
                district
            },

            sources: [],

            officialRecord: {
                recordType: "House voting record",
                sourceName: "U.S. House Clerk",
                sourceUrl: "https://clerk.house.gov/Votes"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }

        }))

    },


    WY: {

        governor: {
            id: "wy-gov-mark-gordon",
            personKey: "mark-gordon",
            seatKey: "wy-governor",
            name: "Mark Gordon",
            party: "R",
            officeType: "governor",
            stateCode: "WY",
            servingSince: "2019-01-07",
            currentTermBegan: "2023-01-02",

            jurisdiction: {
                type: "state",
                stateCode: "WY"
            },

            sources: [],

            officialRecord: {
                recordType: "Governor executive actions",
                sourceName: "Office of the Governor of Wyoming",
                sourceUrl: "https://governor.wyo.gov/"
            },

            financialChange: {
                percentageLow: null,
                percentageHigh: null,
                methodologyUrl: "",
                sources: []
            }
        },


        senators: [

            {
                id: "wy-sen-john-barrasso",
                personKey: "john-barrasso",
                seatKey: "wy-senate-class-1",
                name: "John Barrasso",
                party: "R",
                officeType: "senator",
                stateCode: "WY",
                servingSince: "2007-06-25",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WY"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            },

            {
                id: "wy-sen-cynthia-lummis",
                personKey: "cynthia-lummis",
                seatKey: "wy-senate-class-2",
                name: "Cynthia Lummis",
                party: "R",
                officeType: "senator",
                stateCode: "WY",
                servingSince: "2021-01-03",
                currentTermBegan: "2021-01-03",

                jurisdiction: {
                    type: "state",
                    stateCode: "WY"
                },

                sources: [],

                officialRecord: {
                    recordType: "Senate voting record",
                    sourceName: "United States Senate",
                    sourceUrl: "https://www.senate.gov/legislative/votes_new.htm"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ],


        representatives: [

            {
                id: "wy-at-large-harriet-hageman",
                personKey: "harriet-hageman",
                seatKey: "wy-house-at-large",
                name: "Harriet Hageman",
                party: "R",
                officeType: "representative",
                stateCode: "WY",
                district: "At-Large",
                servingSince: "2023-01-03",
                currentTermBegan: "2025-01-03",

                jurisdiction: {
                    type: "congressional-district",
                    stateCode: "WY",
                    district: "At-Large"
                },

                sources: [],

                officialRecord: {
                    recordType: "House voting record",
                    sourceName: "U.S. House Clerk",
                    sourceUrl: "https://clerk.house.gov/Votes"
                },

                financialChange: {
                    percentageLow: null,
                    percentageHigh: null,
                    methodologyUrl: "",
                    sources: []
                }
            }

        ]

    }

};

