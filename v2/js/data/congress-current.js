/*
==================================================
CIVIC HORIZON INDEX V2
CURRENT CONGRESSIONAL DATA
==================================================

Purpose:

Store current congressional officeholders separately
from page logic and approval voting.

Future election changes should mostly happen here.

IMPORTANT:

memberKey:
Identifies the PERSON.

seatKey:
Identifies the OFFICE / SEAT.

This means a new officeholder can take over a seat
without inheriting the previous member's approval
history.
==================================================
*/


export const currentCongress = {

    NJ: {

        /*
        ==============================================
        U.S. SENATE
        ==============================================
        */

        senators: [

            {
                id:
                    "nj-sen-cory-booker",

                memberKey:
                    "cory-booker",

                seatKey:
                    "nj-senate-class-2",

                name:
                    "Cory Booker",

                chamber:
                    "senate",

                stateCode:
                    "NJ",

                servingSince:
                    "2013-10-31",

                currentTermBegan:
                    "2021-01-03"
            },


            {
                id:
                    "nj-sen-andy-kim",

                memberKey:
                    "andy-kim",

                seatKey:
                    "nj-senate-class-1",

                name:
                    "Andy Kim",

                chamber:
                    "senate",

                stateCode:
                    "NJ",

                servingSince:
                    "2024-12-08",

                currentTermBegan:
                    "2025-01-03"
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

                memberKey:
                    "donald-norcross",

                seatKey:
                    "nj-house-01",

                name:
                    "Donald Norcross",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "1",

                servingSince:
                    "2014-11-12",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-02-jeff-van-drew",

                memberKey:
                    "jeff-van-drew",

                seatKey:
                    "nj-house-02",

                name:
                    "Jeff Van Drew",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "2",

                servingSince:
                    "2019-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-03-herb-conaway",

                memberKey:
                    "herb-conaway",

                seatKey:
                    "nj-house-03",

                name:
                    "Herb Conaway",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "3",

                servingSince:
                    "2025-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-04-chris-smith",

                memberKey:
                    "chris-smith",

                seatKey:
                    "nj-house-04",

                name:
                    "Chris Smith",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "4",

                servingSince:
                    "1981-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-05-josh-gottheimer",

                memberKey:
                    "josh-gottheimer",

                seatKey:
                    "nj-house-05",

                name:
                    "Josh Gottheimer",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "5",

                servingSince:
                    "2017-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-06-frank-pallone",

                memberKey:
                    "frank-pallone",

                seatKey:
                    "nj-house-06",

                name:
                    "Frank Pallone Jr.",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "6",

                servingSince:
                    "1989-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-07-tom-kean",

                memberKey:
                    "tom-kean-jr",

                seatKey:
                    "nj-house-07",

                name:
                    "Tom Kean Jr.",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "7",

                servingSince:
                    "2023-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-08-rob-menendez",

                memberKey:
                    "rob-menendez",

                seatKey:
                    "nj-house-08",

                name:
                    "Rob Menendez",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "8",

                servingSince:
                    "2023-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-09-nellie-pou",

                memberKey:
                    "nellie-pou",

                seatKey:
                    "nj-house-09",

                name:
                    "Nellie Pou",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "9",

                servingSince:
                    "2025-01-03",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-10-lamonica-mciver",

                memberKey:
                    "lamonica-mciver",

                seatKey:
                    "nj-house-10",

                name:
                    "LaMonica McIver",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "10",

                servingSince:
                    "2024-09-23",

                currentTermBegan:
                    "2025-01-03"
            },


            {
                id:
                    "nj-11-analilia-mejia",

                memberKey:
                    "analilia-mejia",

                seatKey:
                    "nj-house-11",

                name:
                    "Analilia Mejia",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "11",

                servingSince:
                    "2026-04-20",

                currentTermBegan:
                    "2026-04-20"
            },


            {
                id:
                    "nj-12-bonnie-watson-coleman",

                memberKey:
                    "bonnie-watson-coleman",

                seatKey:
                    "nj-house-12",

                name:
                    "Bonnie Watson Coleman",

                chamber:
                    "house",

                stateCode:
                    "NJ",

                district:
                    "12",

                servingSince:
                    "2015-01-03",

                currentTermBegan:
                    "2025-01-03"
            }

        ]

    }

};