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
    document.getElementById("homeUsMap");


let submissions = [];

let nationalResults = [];

let stateResults = {};

let mapData = null;


/*
SAFE TEXT UPDATE
*/

function updateText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/*
FORMAT NUMBERS
*/

function formatNumber(value) {

    return Number(value || 0)
        .toLocaleString();

}


/*
FORMAT UPDATE TIME
*/

function getUpdateTime() {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(new Date());

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
GET STATE NAME FROM MAP FEATURE
*/

function getStateName(stateFeature) {

    const stateID =
        String(stateFeature.id)
            .padStart(2, "0");

    return stateNames[stateID] ||
        "Unknown State";

}


/*
CALCULATE NATIONAL RESULTS
*/

function calculateNationalResults() {

    const totals = {};

    const counts = {};


    issues.forEach(issue => {

        totals[issue.id] = 0;

        counts[issue.id] = 0;

    });


    submissions.forEach(submission => {

        if (!submission.ratings) {
            return;
        }


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

                totals[issue.id] += score;

                counts[issue.id] += 1;

            }

        });

    });


    nationalResults =
        issues
            .map(issue => {

                const count =
                    counts[issue.id];

                const average =
                    count > 0
                        ? totals[issue.id] / count
                        : 0;


                return {
                    ...issue,
                    average: average,
                    count: count
                };

            })
            .sort(
                (issueA, issueB) =>
                    issueB.average -
                    issueA.average
            );

}


/*
CALCULATE STATE RESULTS
*/

function calculateStateResults() {

    const results = {};


    submissions.forEach(submission => {

        if (
            !submission.state ||
            !submission.ratings
        ) {
            return;
        }


        const stateName =
            submission.state;


        if (!results[stateName]) {

            results[stateName] = {
                responses: 0,
                totals: {},
                counts: {},
                rankings: [],
                topIssue: null
            };


            issues.forEach(issue => {

                results[stateName]
                    .totals[issue.id] = 0;

                results[stateName]
                    .counts[issue.id] = 0;

            });

        }


        results[stateName]
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

                results[stateName]
                    .totals[issue.id] += score;

                results[stateName]
                    .counts[issue.id] += 1;

            }

        });

    });


    Object.keys(results)
        .forEach(stateName => {

            const stateData =
                results[stateName];


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
                            ...issue,
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


    stateResults = results;

}


/*
FIND MOST ACTIVE STATE
*/

function getMostActiveState() {

    const stateEntries =
        Object.entries(stateResults);


    if (stateEntries.length === 0) {
        return null;
    }


    return stateEntries.sort(
        (stateA, stateB) =>
            stateB[1].responses -
            stateA[1].responses
    )[0];

}


/*
CALCULATE NATIONAL AVERAGE
*/

function getNationalAverage() {

    const scoredIssues =
        nationalResults.filter(
            issue => issue.average > 0
        );


    if (scoredIssues.length === 0) {
        return 0;
    }


    return scoredIssues.reduce(
        (total, issue) =>
            total + issue.average,
        0
    ) / scoredIssues.length;

}


/*
UPDATE HOMEPAGE SUMMARY
*/

function updateHomepageSummary() {

    const totalResponses =
        submissions.length;

    const topIssue =
        nationalResults[0];

    const nationalAverage =
        getNationalAverage();

    const mostActiveState =
        getMostActiveState();

    const updateTime =
        getUpdateTime();


    updateText(
        "heroResponseCount",
        formatNumber(totalResponses)
    );

    updateText(
        "homeLiveResponses",
        formatNumber(totalResponses)
    );

    updateText(
        "todayVoices",
        formatNumber(totalResponses)
    );

    updateText(
        "homeRankingResponses",
        `${formatNumber(totalResponses)} response${totalResponses === 1 ? "" : "s"}`
    );


    updateText(
        "heroTopIssue",
        topIssue?.average > 0
            ? topIssue.name
            : "Awaiting national responses"
    );

    updateText(
        "homeLiveLeader",
        topIssue?.average > 0
            ? topIssue.name
            : "No data yet"
    );

    updateText(
        "todayTopPriority",
        topIssue?.average > 0
            ? topIssue.name
            : "No data yet"
    );


    updateText(
        "heroTopScore",
        topIssue?.average > 0
            ? topIssue.average.toFixed(1)
            : "0.0"
    );

    updateText(
        "todayTopScore",
        topIssue?.average > 0
            ? topIssue.average.toFixed(1)
            : "0.0"
    );

    updateText(
        "todayNationalAverage",
        nationalAverage.toFixed(1)
    );


    if (mostActiveState) {

        updateText(
            "todayActiveState",
            mostActiveState[0]
        );

        updateText(
            "todayActiveStateCount",
            `${formatNumber(
                mostActiveState[1].responses
            )} response${
                mostActiveState[1].responses === 1
                    ? ""
                    : "s"
            }`
        );

    } else {

        updateText(
            "todayActiveState",
            "No data yet"
        );

        updateText(
            "todayActiveStateCount",
            "Awaiting responses"
        );

    }


    updateText(
        "homeLiveStatus",
        totalResponses > 0
            ? "National survey active"
            : "Awaiting first response"
    );

    updateText(
        "homeLiveUpdated",
        updateTime
    );

}


/*
DISPLAY NATIONAL RANKINGS
*/

function displayNationalRankings() {

    const rankingsContainer =
        document.getElementById(
            "homePriorityRankings"
        );


    if (!rankingsContainer) {
        return;
    }


    if (
        submissions.length === 0 ||
        nationalResults.every(
            issue => issue.average === 0
        )
    ) {

        rankingsContainer.innerHTML = `

            <p>
                National rankings will appear after
                survey responses are submitted.
            </p>

        `;

        return;

    }


    rankingsContainer.innerHTML =
        nationalResults
            .map((issue, index) => {

                return `

                    <div class="home-priority-row">

                        <span class="home-priority-position">
                            ${index + 1}
                        </span>

                        <div class="home-priority-details">

                            <div class="home-priority-heading">

                                <strong>
                                    ${issue.name}
                                </strong>

                                <span>
                                    ${issue.average.toFixed(1)}
                                </span>

                            </div>

                            <div class="home-priority-track">

                                <div
                                    class="home-priority-fill"
                                    style="
                                        width: ${issue.average * 10}%;
                                        background: ${issue.color};
                                    "
                                ></div>

                            </div>

                        </div>

                    </div>

                `;

            })
            .join("");

}


/*
CREATE MAP LEGEND
*/

function displayMapLegend() {

    const legendContainer =
        document.getElementById(
            "homeMapLegendItems"
        );


    if (!legendContainer) {
        return;
    }


    legendContainer.innerHTML =
        issues
            .map(issue => {

                return `

                    <span class="home-map-legend-item">

                        <span
                            class="home-map-legend-color"
                            style="background: ${issue.color};"
                        ></span>

                        ${issue.name}

                    </span>

                `;

            })
            .join("");

}


/*
UPDATE STATE PREVIEW PANEL
*/

function showStatePreview(stateName) {

    const stateData =
        stateResults[stateName];


    updateText(
        "homeSelectedState",
        stateName
    );


    if (
        !stateData ||
        stateData.responses === 0
    ) {

        updateText(
            "homeSelectedStateMessage",
            `No priority survey responses have been submitted from ${stateName} yet.`
        );

        updateText(
            "homeSelectedStatePriority",
            "No data yet"
        );

        updateText(
            "homeSelectedStateScore",
            "—"
        );

        updateText(
            "homeSelectedStateResponses",
            "0"
        );

        return;

    }


    updateText(
        "homeSelectedStateMessage",
        `${stateName}'s current leading priority based on submitted responses.`
    );

    updateText(
        "homeSelectedStatePriority",
        stateData.topIssue.name
    );

    updateText(
        "homeSelectedStateScore",
        `${stateData.topIssue.average.toFixed(1)} / 10`
    );

    updateText(
        "homeSelectedStateResponses",
        formatNumber(
            stateData.responses
        )
    );

}


/*
GET STATE COLOR
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
DRAW HOMEPAGE MAP
*/

function drawHomepageMap() {

    if (
        !mapContainer ||
        !mapData
    ) {
        return;
    }


    mapContainer.innerHTML = "";


    const containerWidth =
        mapContainer.clientWidth;

    const width =
        Math.max(
            containerWidth,
            320
        );

    const height =
        Math.max(
            width * 0.62,
            360
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


    const svg =
        d3.select(mapContainer)
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
                "home-us-state-map"
            );


    const tooltip =
        d3.select(mapContainer)
            .append("div")
            .attr(
                "class",
                "map-tooltip"
            )
            .style("opacity", 0);


    svg
        .append("g")
        .selectAll("path")
        .data(states.features)
        .join("path")
        .attr(
            "class",
            "home-state-shape"
        )
        .attr("d", path)
        .style(
            "fill",
            stateFeature => {

                const stateName =
                    getStateName(
                        stateFeature
                    );

                return getStateColor(
                    stateName
                );

            }
        )
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr(
            "aria-label",
            stateFeature => {

                const stateName =
                    getStateName(
                        stateFeature
                    );

                return `View priorities for ${stateName}`;

            }
        )
        .on(
            "mouseenter",
            function(event, stateFeature) {

                const stateName =
                    getStateName(
                        stateFeature
                    );

                const stateData =
                    stateResults[stateName];


                d3.select(this)
                    .classed(
                        "state-hovered",
                        true
                    );


                showStatePreview(
                    stateName
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
                                ${stateData.topIssue.name}
                            </span>

                            <span>
                                ${stateData.topIssue.average.toFixed(1)} / 10
                            </span>

                            <span>
                                ${formatNumber(stateData.responses)}
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

                        `);

                }

            }
        )
        .on(
            "mousemove",
            function(event) {

                const bounds =
                    mapContainer
                        .getBoundingClientRect();


                tooltip
                    .style(
                        "left",
                        `${event.clientX - bounds.left + 14}px`
                    )
                    .style(
                        "top",
                        `${event.clientY - bounds.top - 12}px`
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

                const stateName =
                    getStateName(
                        stateFeature
                    );

                showStatePreview(
                    stateName
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


                    const stateName =
                        getStateName(
                            stateFeature
                        );

                    showStatePreview(
                        stateName
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

}


/*
RENDER COMPLETE HOMEPAGE
*/

function renderHomepage() {

    calculateNationalResults();

    calculateStateResults();

    updateHomepageSummary();

    displayNationalRankings();

    displayMapLegend();


    if (mapData) {
        drawHomepageMap();
    }

}


/*
LOAD LIVE SURVEY SUBMISSIONS
*/

const submissionsRef =
    ref(
        database,
        "prioritySubmissions"
    );


onValue(
    submissionsRef,

    snapshot => {

        const data =
            snapshot.val();


        submissions =
            data
                ? Object.values(data)
                : [];


        renderHomepage();

    },

    error => {

        console.error(
            "Homepage data error:",
            error
        );


        updateText(
            "homeLiveStatus",
            "Unable to load live data"
        );

        updateText(
            "homeLiveUpdated",
            "Connection error"
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

        mapData = data;

        drawHomepageMap();

    })
    .catch(error => {

        console.error(
            "Homepage map error:",
            error
        );


        if (mapContainer) {

            mapContainer.innerHTML = `

                <div class="map-error">

                    <strong>
                        The U.S. map could not be loaded.
                    </strong>

                    <p>
                        Check your connection and refresh the page.
                    </p>

                </div>

            `;

        }

    });


/*
REDRAW MAP WHEN SIZE CHANGES
*/

if (mapContainer) {

    const mapResizeObserver =
        new ResizeObserver(() => {

            if (mapData) {
                drawHomepageMap();
            }

        });


    mapResizeObserver.observe(
        mapContainer
    );

}