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


let resultsPriorityChart = null;


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
FORMAT LAST UPDATED TIME
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
CALCULATE NATIONAL ISSUE SCORES
*/

function calculateResults(submissions) {

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


    return issues
        .map(issue => {

            const responseCount =
                counts[issue.id];

            const average =
                responseCount > 0
                    ? totals[issue.id] /
                      responseCount
                    : 0;


            return {
                ...issue,
                average: average,
                responseCount: responseCount
            };

        })
        .sort(
            (issueA, issueB) =>
                issueB.average -
                issueA.average
        );

}


/*
CALCULATE OVERALL NATIONAL AVERAGE
*/

function calculateNationalAverage(results) {

    const validResults =
        results.filter(
            issue =>
                issue.responseCount > 0
        );


    if (validResults.length === 0) {
        return 0;
    }


    const total =
        validResults.reduce(
            (sum, issue) =>
                sum + issue.average,
            0
        );


    return total /
        validResults.length;

}


/*
DISPLAY EMPTY PAGE
*/

function displayEmptyResults() {

    updateText(
        "resultsHeroTopIssue",
        "Awaiting national responses"
    );

    updateText(
        "resultsHeroTopScore",
        "0.0"
    );

    updateText(
        "resultsHeroResponseText",
        "Based on 0 completed surveys"
    );

    updateText(
        "resultsSurveyStatus",
        "Awaiting responses"
    );

    updateText(
        "resultsStatusResponses",
        "0"
    );

    updateText(
        "resultsStatusAverage",
        "0.0"
    );

    updateText(
        "resultsStatusUpdated",
        formatUpdateTime()
    );

    updateText(
        "resultResponseCount",
        "0"
    );

    updateText(
        "topPriority",
        "No data yet"
    );

    updateText(
        "topPriorityScoreText",
        "Current leading national issue"
    );

    updateText(
        "averagePriorityScore",
        "0.0"
    );


    const resultsContainer =
        document.getElementById(
            "resultsContainer"
        );


    if (resultsContainer) {

        resultsContainer.innerHTML = `

            <div class="results-empty-state">

                <h3>
                    National results will appear here.
                </h3>

                <p>

                    Complete the National Priorities
                    Survey to help begin building the
                    Civic Horizon Index.

                </p>

                <a
                    href="polls.html"
                    class="primary-button"
                >
                    Take the Survey
                </a>

            </div>

        `;

    }


    destroyResultsChart();

}


/*
DISPLAY NATIONAL RANKINGS
*/

function displayRankings(results) {

    const resultsContainer =
        document.getElementById(
            "resultsContainer"
        );


    if (!resultsContainer) {
        return;
    }


    resultsContainer.innerHTML =
        results
            .map((issue, index) => {

                return `

                    <article class="national-result-row">

                        <div class="national-result-position">

                            ${index + 1}

                        </div>


                        <div class="national-result-content">

                            <div class="national-result-heading">

                                <div>

                                    <span
                                        class="national-result-color"
                                        style="background: ${issue.color};"
                                    ></span>

                                    <strong>
                                        ${issue.name}
                                    </strong>

                                </div>


                                <span class="national-result-score">

                                    ${issue.average.toFixed(1)}

                                    <small>
                                        / 10
                                    </small>

                                </span>

                            </div>


                            <div class="national-result-track">

                                <div
                                    class="national-result-fill"
                                    style="
                                        width: ${issue.average * 10}%;
                                        background: ${issue.color};
                                    "
                                ></div>

                            </div>


                            <div class="national-result-footer">

                                <span>
                                    Civic Horizon Score
                                </span>

                                <span>

                                    Based on
                                    ${formatNumber(
                                        issue.responseCount
                                    )}
                                    rating${
                                        issue.responseCount === 1
                                            ? ""
                                            : "s"
                                    }

                                </span>

                            </div>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/*
DESTROY OLD CHART
*/

function destroyResultsChart() {

    if (resultsPriorityChart) {

        resultsPriorityChart.destroy();

        resultsPriorityChart = null;

    }

}


/*
CREATE RESULTS CHART
*/

function createResultsChart(results) {

    const chartCanvas =
        document.getElementById(
            "resultsPriorityChart"
        );


    if (!chartCanvas) {
        return;
    }


    destroyResultsChart();


    resultsPriorityChart =
        new Chart(
            chartCanvas,
            {
                type: "bar",

                data: {

                    labels:
                        results.map(
                            issue => issue.name
                        ),

                    datasets: [
                        {
                            label:
                                "Civic Horizon Score",

                            data:
                                results.map(
                                    issue =>
                                        Number(
                                            issue.average
                                                .toFixed(2)
                                        )
                                ),

                            backgroundColor:
                                results.map(
                                    issue =>
                                        issue.color
                                ),

                            borderColor:
                                results.map(
                                    issue =>
                                        issue.color
                                ),

                            borderWidth: 1,

                            borderRadius: 8,

                            barThickness: 20
                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    indexAxis: "y",

                    animation: {
                        duration: 900,
                        easing: "easeOutQuart"
                    },

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

                            grid: {
                                color:
                                    "rgba(148, 163, 184, 0.2)"
                            },

                            title: {
                                display: true,
                                text:
                                    "Average Priority Score"
                            }

                        },

                        y: {

                            grid: {
                                display: false
                            },

                            ticks: {
                                font: {
                                    size: 11
                                }
                            }

                        }

                    }

                }

            }
        );

}


/*
UPDATE COMPLETE RESULTS PAGE
*/

function updateResultsPage(submissions) {

    if (submissions.length === 0) {

        displayEmptyResults();

        return;

    }


    const results =
        calculateResults(submissions);


    const validResults =
        results.filter(
            issue =>
                issue.responseCount > 0
        );


    if (validResults.length === 0) {

        displayEmptyResults();

        return;

    }


    const leadingIssue =
        validResults[0];


    const nationalAverage =
        calculateNationalAverage(
            validResults
        );


    const totalResponses =
        submissions.length;


    updateText(
        "resultsHeroTopIssue",
        leadingIssue.name
    );

    updateText(
        "resultsHeroTopScore",
        leadingIssue.average.toFixed(1)
    );

    updateText(
        "resultsHeroResponseText",
        `Based on ${formatNumber(
            totalResponses
        )} completed survey${
            totalResponses === 1
                ? ""
                : "s"
        }`
    );


    updateText(
        "resultsSurveyStatus",
        "Live"
    );

    updateText(
        "resultsStatusResponses",
        formatNumber(totalResponses)
    );

    updateText(
        "resultsStatusAverage",
        nationalAverage.toFixed(1)
    );

    updateText(
        "resultsStatusUpdated",
        formatUpdateTime()
    );


    updateText(
        "resultResponseCount",
        formatNumber(totalResponses)
    );

    updateText(
        "topPriority",
        leadingIssue.name
    );

    updateText(
        "topPriorityScoreText",
        `${leadingIssue.average.toFixed(1)} out of 10`
    );

    updateText(
        "averagePriorityScore",
        nationalAverage.toFixed(1)
    );


    displayRankings(
        results
    );


    createResultsChart(
        results
    );

}


/*
LOAD LIVE NATIONAL PRIORITIES DATA
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


        const submissions =
            data
                ? Object.values(data)
                : [];


        updateResultsPage(
            submissions
        );

    },

    error => {

        console.error(
            "Results page error:",
            error
        );


        updateText(
            "resultsSurveyStatus",
            "Connection error"
        );

        updateText(
            "resultsStatusUpdated",
            "Unable to update"
        );


        const resultsContainer =
            document.getElementById(
                "resultsContainer"
            );


        if (resultsContainer) {

            resultsContainer.innerHTML = `

                <div class="results-empty-state">

                    <h3>
                        Results could not be loaded.
                    </h3>

                    <p>

                        Check your internet connection
                        and refresh the page.

                    </p>

                </div>

            `;

        }

    }
);