import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const issues = [
    {
        id: "economy",
        name: "Economy & Cost of Living",
        color: "#16a34a"
    },
    {
        id: "healthcare",
        name: "Healthcare",
        color: "#2563eb"
    },
    {
        id: "education",
        name: "Education",
        color: "#7c3aed"
    },
    {
        id: "housing",
        name: "Housing",
        color: "#ea580c"
    },
    {
        id: "immigration",
        name: "Immigration",
        color: "#dc2626"
    },
    {
        id: "publicSafety",
        name: "Public Safety",
        color: "#1e3a8a"
    },
    {
        id: "nationalSecurity",
        name: "National Security",
        color: "#475569"
    },
    {
        id: "environment",
        name: "Environment",
        color: "#059669"
    },
    {
        id: "governmentAccountability",
        name: "Government Accountability",
        color: "#ca8a04"
    },
    {
        id: "childrenFamilies",
        name: "Children & Families",
        color: "#0d9488"
    }
];


const stateNames = {
    "01": "Alabama",
    "02": "Alaska",
    "04": "Arizona",
    "05": "Arkansas",
    "06": "California",
    "08": "Colorado",
    "09": "Connecticut",
    "10": "Delaware",
    "12": "Florida",
    "13": "Georgia",
    "15": "Hawaii",
    "16": "Idaho",
    "17": "Illinois",
    "18": "Indiana",
    "19": "Iowa",
    "20": "Kansas",
    "21": "Kentucky",
    "22": "Louisiana",
    "23": "Maine",
    "24": "Maryland",
    "25": "Massachusetts",
    "26": "Michigan",
    "27": "Minnesota",
    "28": "Mississippi",
    "29": "Missouri",
    "30": "Montana",
    "31": "Nebraska",
    "32": "Nevada",
    "33": "New Hampshire",
    "34": "New Jersey",
    "35": "New Mexico",
    "36": "New York",
    "37": "North Carolina",
    "38": "North Dakota",
    "39": "Ohio",
    "40": "Oklahoma",
    "41": "Oregon",
    "42": "Pennsylvania",
    "44": "Rhode Island",
    "45": "South Carolina",
    "46": "South Dakota",
    "47": "Tennessee",
    "48": "Texas",
    "49": "Utah",
    "50": "Vermont",
    "51": "Virginia",
    "53": "Washington",
    "54": "West Virginia",
    "55": "Wisconsin",
    "56": "Wyoming"
};


const mapContainer =
    document.getElementById("usMap");

const selectedStateName =
    document.getElementById("selectedStateName");

const selectedStateMessage =
    document.getElementById("selectedStateMessage");

const selectedStateResponses =
    document.getElementById("selectedStateResponses");

const selectedStateLeader =
    document.getElementById("selectedStateLeader");

const selectedStatePoll =
    document.getElementById("selectedStatePoll");


let mapData = null;

let allSubmissions = [];

let stateResults = {};

let selectedState = null;

let selectedStateElement = null;


/*
GET STATE NAME FROM MAP DATA
*/

function getStateName(stateFeature) {

    const stateID =
        String(stateFeature.id).padStart(2, "0");

    return stateNames[stateID] || "Unknown State";

}


/*
GET ISSUE INFORMATION
*/

function getIssue(issueID) {

    return issues.find(
        issue => issue.id === issueID
    );

}


/*
CALCULATE RESULTS FOR EVERY STATE
*/

function calculateStateResults() {

    const calculatedResults = {};


    allSubmissions.forEach(submission => {

        if (
            !submission.state ||
            !submission.ratings
        ) {
            return;
        }


        const stateName =
            submission.state;


        if (!calculatedResults[stateName]) {

            calculatedResults[stateName] = {
                responses: 0,
                totals: {},
                counts: {},
                rankings: [],
                topIssue: null
            };


            issues.forEach(issue => {

                calculatedResults[stateName]
                    .totals[issue.id] = 0;

                calculatedResults[stateName]
                    .counts[issue.id] = 0;

            });

        }


        calculatedResults[stateName]
            .responses += 1;


        issues.forEach(issue => {

            const score =
                Number(
                    submission.ratings[issue.id]
                );


            if (
                Number.isFinite(score) &&
                score >= 1 &&
                score <= 10
            ) {

                calculatedResults[stateName]
                    .totals[issue.id] += score;

                calculatedResults[stateName]
                    .counts[issue.id] += 1;

            }

        });

    });


    Object.keys(calculatedResults)
        .forEach(stateName => {

            const stateData =
                calculatedResults[stateName];


            stateData.rankings =
                issues
                    .map(issue => {

                        const count =
                            stateData.counts[issue.id];

                        const average =
                            count > 0
                                ? stateData.totals[issue.id] / count
                                : 0;


                        return {
                            id: issue.id,
                            name: issue.name,
                            color: issue.color,
                            average: average
                        };

                    })
                    .sort(
                        (issueA, issueB) =>
                            issueB.average -
                            issueA.average
                    );


            stateData.topIssue =
                stateData.rankings[0];

        });


    stateResults =
        calculatedResults;


    if (mapData) {
        drawMap();
    }


    if (selectedState) {
        showStateInformation(selectedState);
    }

}


/*
GET THE COLOR FOR A STATE
*/

function getStateColor(stateName) {

    const stateData =
        stateResults[stateName];


    if (
        !stateData ||
        !stateData.topIssue ||
        stateData.responses === 0
    ) {
        return "#dbeafe";
    }


    return stateData.topIssue.color;

}


/*
SHOW LIVE STATE INFORMATION
*/

function showStateInformation(stateName) {

    selectedState =
        stateName;


    const stateData =
        stateResults[stateName];


    selectedStateName.textContent =
        stateName;

    selectedStatePoll.textContent =
        "National Priorities Survey";


    if (
        !stateData ||
        stateData.responses === 0
    ) {

        selectedStateResponses.textContent =
            "0";

        selectedStateLeader.textContent =
            "No data yet";

        selectedStateMessage.innerHTML = `

            No National Priorities Survey responses
            have been submitted from ${stateName} yet.

        `;

        return;

    }


    selectedStateResponses.textContent =
        stateData.responses.toLocaleString();


    selectedStateLeader.textContent =
        `${stateData.topIssue.name} — ${stateData.topIssue.average.toFixed(1)}`;


    selectedStateMessage.innerHTML = `

        <div class="state-priority-list">

            ${stateData.rankings
                .map((issue, index) => {

                    return `

                        <div class="state-priority-row">

                            <span class="state-priority-position">
                                ${index + 1}
                            </span>

                            <div class="state-priority-details">

                                <strong>
                                    ${issue.name}
                                </strong>

                                <div class="state-priority-bar">

                                    <div
                                        class="state-priority-bar-fill"
                                        style="
                                            width: ${issue.average * 10}%;
                                            background: ${issue.color};
                                        "
                                    ></div>

                                </div>

                            </div>

                            <span class="state-priority-score">
                                ${issue.average.toFixed(1)}
                            </span>

                        </div>

                    `;

                })
                .join("")}

        </div>

    `;

}


/*
SELECT A STATE
*/

function selectState(
    stateElement,
    stateFeature
) {

    const stateName =
        getStateName(stateFeature);


    if (selectedStateElement) {

        d3.select(selectedStateElement)
            .classed(
                "state-selected",
                false
            );

    }


    selectedStateElement =
        stateElement;


    d3.select(stateElement)
        .classed(
            "state-selected",
            true
        );


    showStateInformation(stateName);

}


/*
DRAW THE SVG MAP
*/

function drawMap() {

    if (!mapData) {
        return;
    }


    mapContainer.innerHTML = "";

    selectedStateElement = null;


    const containerWidth =
        mapContainer.clientWidth;

    const width =
        Math.max(containerWidth, 320);

    const height =
        Math.max(width * 0.62, 360);


    const svg = d3
        .select(mapContainer)
        .append("svg")
        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )
        .attr(
            "preserveAspectRatio",
            "xMidYMid meet"
        )
        .attr(
            "class",
            "us-state-map"
        );


    const states =
        topojson.feature(
            mapData,
            mapData.objects.states
        );


    const projection =
        d3.geoAlbersUsa();


    projection.fitExtent(
        [
            [20, 20],
            [width - 20, height - 20]
        ],
        states
    );


    const path =
        d3.geoPath(projection);


    const tooltip = d3
        .select(mapContainer)
        .append("div")
        .attr("class", "map-tooltip")
        .style("opacity", 0);


    const statePaths = svg
        .append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(states.features)
        .join("path")
        .attr("class", "state-shape")
        .attr("d", path)
        .style(
            "fill",
            stateFeature => {

                const stateName =
                    getStateName(stateFeature);

                return getStateColor(stateName);

            }
        )
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr(
            "aria-label",
            stateFeature => {

                const stateName =
                    getStateName(stateFeature);

                return `View priority results for ${stateName}`;

            }
        );


    statePaths
        .on(
            "mouseenter",
            function(event, stateFeature) {

                const stateName =
                    getStateName(stateFeature);

                const stateData =
                    stateResults[stateName];


                d3.select(this)
                    .classed(
                        "state-hovered",
                        true
                    );


                if (
                    stateData &&
                    stateData.responses > 0
                ) {

                    tooltip
                        .style("opacity", 1)
                        .html(`

                            <strong>
                                ${stateName}
                            </strong>

                            <span>
                                Top priority:
                                ${stateData.topIssue.name}
                            </span>

                            <span>
                                Score:
                                ${stateData.topIssue.average.toFixed(1)} / 10
                            </span>

                            <span>
                                ${stateData.responses.toLocaleString()}
                                response${stateData.responses === 1 ? "" : "s"}
                            </span>

                        `);

                } else {

                    tooltip
                        .style("opacity", 1)
                        .html(`

                            <strong>
                                ${stateName}
                            </strong>

                            <span>
                                No responses yet
                            </span>

                            <span>
                                Click to view details
                            </span>

                        `);

                }

            }
        )


        .on(
            "mousemove",
            function(event) {

                const containerBounds =
                    mapContainer
                        .getBoundingClientRect();


                tooltip
                    .style(
                        "left",
                        `${event.clientX - containerBounds.left + 14}px`
                    )
                    .style(
                        "top",
                        `${event.clientY - containerBounds.top - 12}px`
                    );

            }
        )


        .on(
            "mouseleave",
            function() {

                d3.select(this)
                    .classed(
                        "state-hovered",
                        false
                    );


                tooltip
                    .style("opacity", 0);

            }
        )


        .on(
            "click",
            function(event, stateFeature) {

                selectState(
                    this,
                    stateFeature
                );

            }
        )


        .on(
            "keydown",
            function(event, stateFeature) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    selectState(
                        this,
                        stateFeature
                    );

                }

            }
        );


    svg
        .append("path")
        .datum(
            topojson.mesh(
                mapData,
                mapData.objects.states,
                (stateA, stateB) =>
                    stateA !== stateB
            )
        )
        .attr(
            "class",
            "state-borders"
        )
        .attr(
            "d",
            path
        );


    /*
    RESTORE THE SELECTED STATE AFTER REDRAWING
    */

    if (selectedState) {

        statePaths.each(
            function(stateFeature) {

                const stateName =
                    getStateName(stateFeature);


                if (
                    stateName === selectedState
                ) {

                    selectedStateElement =
                        this;


                    d3.select(this)
                        .classed(
                            "state-selected",
                            true
                        );

                }

            }
        );

    }

}


/*
LOAD LIVE NATIONAL PRIORITY SUBMISSIONS
*/

const submissionsRef =
    ref(
        database,
        "prioritySubmissions"
    );


onValue(
    submissionsRef,

    snapshot => {

        const submissionData =
            snapshot.val();


        allSubmissions =
            submissionData
                ? Object.values(
                    submissionData
                )
                : [];


        calculateStateResults();

    },

    error => {

        console.error(
            "Unable to load state survey data:",
            error
        );

    }
);


/*
LOAD U.S. MAP DATA
*/

d3.json(
    "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
)
    .then(data => {

        mapData =
            data;

        drawMap();

    })
    .catch(error => {

        console.error(
            "Unable to load the U.S. map:",
            error
        );


        mapContainer.innerHTML = `

            <div class="map-error">

                <strong>
                    The U.S. map could not be loaded.
                </strong>

                <p>
                    Check your internet connection
                    and refresh the page.
                </p>

            </div>

        `;

    });


/*
REDRAW WHEN THE MAP AREA CHANGES SIZE
*/

const mapResizeObserver =
    new ResizeObserver(() => {

        if (mapData) {
            drawMap();
        }

    });


mapResizeObserver.observe(
    mapContainer
);