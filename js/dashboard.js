import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const issues = [
    {
        id: "economy",
        name: "Economy & Cost of Living"
    },
    {
        id: "healthcare",
        name: "Healthcare"
    },
    {
        id: "education",
        name: "Education"
    },
    {
        id: "housing",
        name: "Housing"
    },
    {
        id: "immigration",
        name: "Immigration"
    },
    {
        id: "publicSafety",
        name: "Public Safety"
    },
    {
        id: "nationalSecurity",
        name: "National Security"
    },
    {
        id: "environment",
        name: "Environment"
    },
    {
        id: "governmentAccountability",
        name: "Government Accountability"
    },
    {
        id: "childrenFamilies",
        name: "Children & Families"
    }
];


let priorityChart = null;

let priorityPieChart = null;


/*
GET DASHBOARD ELEMENTS
*/

const totalResponsesElement =
    document.getElementById("totalResponses");

const topIssueElement =
    document.getElementById("topIssue");

const priorityScoreElement =
    document.getElementById("priorityScore");

const dashboardStatusElement =
    document.getElementById("dashboardStatus");

const dashboardRankingsElement =
    document.getElementById("dashboardRankings");

const dashboardPollStatusElement =
    document.getElementById("dashboardPollStatus");

const dashboardLeaderElement =
    document.getElementById("dashboardLeader");

const dashboardResponsesElement =
    document.getElementById("dashboardResponses");

const dashboardUpdatedElement =
    document.getElementById("dashboardUpdated");


/*
FORMAT THE LAST-UPDATED TIME
*/

function formatUpdateTime() {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(new Date());

}


/*
DISPLAY THE EMPTY DASHBOARD
*/

function displayEmptyDashboard() {

    totalResponsesElement.textContent =
        "0";

    topIssueElement.textContent =
        "No data yet";

    priorityScoreElement.textContent =
        "0.0";

    dashboardStatusElement.textContent =
        "Waiting";

    dashboardPollStatusElement.textContent =
        "Awaiting responses";

    dashboardLeaderElement.textContent =
        "No data yet";

    dashboardResponsesElement.textContent =
        "0";

    dashboardUpdatedElement.textContent =
        formatUpdateTime();


    dashboardRankingsElement.innerHTML = `

        <p>
            No National Priorities Survey responses
            have been submitted yet.
        </p>

    `;


    destroyCharts();

}


/*
REMOVE OLD CHARTS BEFORE DRAWING NEW ONES
*/

function destroyCharts() {

    if (priorityChart) {

        priorityChart.destroy();

        priorityChart = null;

    }


    if (priorityPieChart) {

        priorityPieChart.destroy();

        priorityPieChart = null;

    }

}


/*
CALCULATE NATIONAL ISSUE AVERAGES
*/

function calculateIssueAverages(submissions) {

    const issueTotals = {};

    const issueCounts = {};


    issues.forEach(issue => {

        issueTotals[issue.id] = 0;

        issueCounts[issue.id] = 0;

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

                issueTotals[issue.id] += score;

                issueCounts[issue.id] += 1;

            }

        });

    });


    return issues.map(issue => {

        const count =
            issueCounts[issue.id];

        const average =
            count > 0
                ? issueTotals[issue.id] / count
                : 0;


        return {
            id: issue.id,
            name: issue.name,
            average: average,
            count: count
        };

    });

}


/*
CREATE THE ISSUE RANKINGS
*/

function displayRankings(sortedResults) {

    dashboardRankingsElement.innerHTML =
        sortedResults
            .map((issue, index) => {

                return `

                    <div class="ranking-row">

                        <div class="ranking-position">
                            ${index + 1}
                        </div>

                        <div class="ranking-details">

                            <strong>
                                ${issue.name}
                            </strong>

                            <div class="ranking-bar">

                                <div
                                    class="ranking-bar-fill"
                                    style="width: ${issue.average * 10}%"
                                ></div>

                            </div>

                        </div>

                        <div class="ranking-score">

                            ${issue.average.toFixed(1)}

                        </div>

                    </div>

                `;

            })
            .join("");

}


/*
CREATE THE BAR CHART
*/

function createPriorityChart(sortedResults) {

    const chartCanvas =
        document.getElementById(
            "priorityChart"
        );


    if (!chartCanvas) {
        return;
    }


    priorityChart =
        new Chart(
            chartCanvas,
            {
                type: "bar",

                data: {
                    labels:
                        sortedResults.map(
                            issue => issue.name
                        ),

                    datasets: [
                        {
                            label:
                                "Civic Horizon Score",

                            data:
                                sortedResults.map(
                                    issue =>
                                        Number(
                                            issue.average.toFixed(2)
                                        )
                                ),

                            borderWidth: 1,
                            borderRadius: 8
                        }
                    ]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    indexAxis: "y",

                    plugins: {
                        legend: {
                            display: false
                        },

                        tooltip: {
                            callbacks: {
                                label(context) {

                                    return (
                                        " Score: " +
                                        Number(
                                            context.raw
                                        ).toFixed(1) +
                                        " / 10"
                                    );

                                }
                            }
                        }
                    },

                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 10,

                            ticks: {
                                stepSize: 1
                            },

                            title: {
                                display: true,
                                text: "Average Priority Score"
                            }
                        },

                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            }
        );

}


/*
CREATE THE PIE CHART
*/

function createPriorityPieChart(sortedResults) {

    const chartCanvas =
        document.getElementById(
            "priorityPieChart"
        );


    if (!chartCanvas) {
        return;
    }


    priorityPieChart =
        new Chart(
            chartCanvas,
            {
                type: "doughnut",

                data: {
                    labels:
                        sortedResults.map(
                            issue => issue.name
                        ),

                    datasets: [
                        {
                            data:
                                sortedResults.map(
                                    issue =>
                                        Number(
                                            issue.average.toFixed(2)
                                        )
                                ),

                            borderWidth: 2
                        }
                    ]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    cutout: "58%",

                    plugins: {
                        legend: {
                            position: "bottom",

                            labels: {
                                boxWidth: 12,
                                padding: 14
                            }
                        },

                        tooltip: {
                            callbacks: {
                                label(context) {

                                    return (
                                        " " +
                                        context.label +
                                        ": " +
                                        Number(
                                            context.raw
                                        ).toFixed(1) +
                                        " / 10"
                                    );

                                }
                            }
                        }
                    }
                }
            }
        );

}


/*
UPDATE THE COMPLETE DASHBOARD
*/

function updateDashboard(submissions) {

    if (submissions.length === 0) {

        displayEmptyDashboard();

        return;

    }


    const issueResults =
        calculateIssueAverages(
            submissions
        );


    const sortedResults =
        [...issueResults].sort(
            (issueA, issueB) =>
                issueB.average -
                issueA.average
        );


    const leadingIssue =
        sortedResults[0];


    const scoredIssues =
        issueResults.filter(
            issue => issue.count > 0
        );


    const overallAverage =
        scoredIssues.length > 0
            ? scoredIssues.reduce(
                (total, issue) =>
                    total + issue.average,
                0
            ) / scoredIssues.length
            : 0;


    const totalResponses =
        submissions.length;


    totalResponsesElement.textContent =
        totalResponses.toLocaleString();


    topIssueElement.textContent =
        leadingIssue?.average > 0
            ? leadingIssue.name
            : "No data yet";


    priorityScoreElement.textContent =
        overallAverage.toFixed(1);


    dashboardStatusElement.textContent =
        "Live";


    dashboardPollStatusElement.textContent =
        "National survey active";


    dashboardLeaderElement.textContent =
        leadingIssue?.average > 0
            ? `${leadingIssue.name} — ${leadingIssue.average.toFixed(1)}`
            : "No data yet";


    dashboardResponsesElement.textContent =
        totalResponses.toLocaleString();


    dashboardUpdatedElement.textContent =
        formatUpdateTime();


    displayRankings(
        sortedResults
    );


    destroyCharts();


    createPriorityChart(
        sortedResults
    );


    createPriorityPieChart(
        sortedResults
    );

}


/*
LOAD LIVE NATIONAL PRIORITIES SUBMISSIONS
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


        const submissions =
            submissionData
                ? Object.values(
                    submissionData
                )
                : [];


        updateDashboard(
            submissions
        );

    },

    error => {

        console.error(
            "Dashboard data error:",
            error
        );


        dashboardStatusElement.textContent =
            "Error";


        dashboardPollStatusElement.textContent =
            "Connection problem";


        dashboardUpdatedElement.textContent =
            "Unable to update";

    }
);