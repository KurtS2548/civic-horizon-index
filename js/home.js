import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const votesRef = ref(database, "votes");
const surveysRef = ref(database, "createdSurveys");


let allVotes = {};
let allSurveys = {};


/* =========================================
   SAFE PAGE UPDATE
========================================= */

function updateElement(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* =========================================
   FIND ACTIVE SURVEY
========================================= */

function getActiveSurvey() {

    return Object.entries(allSurveys).find(
        ([surveyID, survey]) => survey.active === true
    );

}


/* =========================================
   RENDER ENTIRE HOMEPAGE
========================================= */

function renderHomepage() {

    const votes = Object.values(allVotes);
    const surveys = Object.values(allSurveys);

    const activeSurveys = surveys.filter(
        survey => survey.active === true
    );


    /* TOTALS */

    updateElement("totalVotes", votes.length);

    updateElement(
        "activeSurveys",
        activeSurveys.length
    );

    updateElement(
        "highlightResponseCount",
        votes.length
    );

    updateElement(
        "tickerResponses",
        votes.length
    );


    const activeSurveyEntry = getActiveSurvey();


    /* NO ACTIVE SURVEY */

    if (!activeSurveyEntry) {

        updateElement("pollStatus", "No Active Survey");
        updateElement("dashboardStatus", "No Active Survey");

        updateElement("liveResponses", "0");
        updateElement("homeResponses", "0");
        updateElement("surveyResponseCount", "0");

        updateElement("liveLeader", "No votes");
        updateElement("homeWinner", "No votes");

        updateElement("mostDiscussedIssue", "No active survey");
        updateElement("tickerTopIssue", "No active survey");

        updateElement("lastUpdated", "Not available");
        updateElement("highlightLastUpdated", "Not available");
        updateElement("tickerUpdate", "Not available");

        const surveyPreview =
        document.getElementById("surveyPreview");

        if (surveyPreview) {
            surveyPreview.innerHTML =
            "<p>No active survey available.</p>";
        }

        const rankings =
        document.getElementById("homeRankings");

        if (rankings) {
            rankings.innerHTML =
            "<p>No results yet.</p>";
        }

        const priorityList =
        document.getElementById("topPriorityList");

        if (priorityList) {
            priorityList.innerHTML =
            "<p>No active survey results yet.</p>";
        }

        return;
    }


    const surveyID = activeSurveyEntry[0];
    const survey = activeSurveyEntry[1];


    /* ACTIVE SURVEY VOTES */

    const surveyVotes = votes.filter(
        vote => vote.surveyID === surveyID
    );


    updateElement("pollStatus", "🟢 Active");

    updateElement(
        "surveyResponseCount",
        surveyVotes.length
    );

    updateElement(
        "homeResponses",
        surveyVotes.length
    );

    updateElement(
        "liveResponses",
        surveyVotes.length
    );


    /* SURVEY PREVIEW */

    const surveyPreview =
    document.getElementById("surveyPreview");

    if (surveyPreview) {

        let previewHTML = `

            <h3>${survey.question}</h3>

            <p>Possible responses:</p>

            <ul>

        `;

        survey.choices.forEach(choice => {

            previewHTML += `
                <li>${choice}</li>
            `;

        });

        previewHTML += "</ul>";

        surveyPreview.innerHTML = previewHTML;
    }


    /* NO VOTES YET */

    if (surveyVotes.length === 0) {

        updateElement("homeWinner", "No votes");
        updateElement("liveLeader", "No votes");

        updateElement(
            "mostDiscussedIssue",
            survey.question
        );

        updateElement(
            "tickerTopIssue",
            "No votes yet"
        );

        const homeRankings =
        document.getElementById("homeRankings");

        if (homeRankings) {
            homeRankings.innerHTML =
            "<p>No results yet.</p>";
        }

        renderPriorityBars(
            survey.choices,
            {},
            0
        );

        updateTimes();

        return;
    }


    /* COUNT ANSWERS */

    const totals = {};

    surveyVotes.forEach(vote => {

        totals[vote.answer] =
        (totals[vote.answer] || 0) + 1;

    });


    /* SORT ANSWERS */

    const sortedResults =
    Object.entries(totals).sort(
        (a, b) => b[1] - a[1]
    );


    const leader = sortedResults[0][0];


    updateElement("homeWinner", leader);
    updateElement("liveLeader", leader);

    updateElement(
        "mostDiscussedIssue",
        leader
    );

    updateElement(
        "tickerTopIssue",
        leader
    );


    /* PUBLIC PULSE RANKINGS */

    const homeRankings =
    document.getElementById("homeRankings");

    if (homeRankings) {

        let rankingHTML = "";

        sortedResults.forEach(
            ([answer, count], index) => {

                const percent =
                Math.round(
                    (count / surveyVotes.length) * 100
                );

                rankingHTML += `

                    <div class="result-row">

                        <h4>
                            ${index + 1}. ${answer}
                        </h4>

                        <p>
                            ${count} votes (${percent}%)
                        </p>

                        <div class="result-bar">

                            <div
                                class="result-bar-fill"
                                style="width: ${percent}%"
                            ></div>

                        </div>

                    </div>

                `;

            }
        );

        homeRankings.innerHTML = rankingHTML;
    }


    /* TOP PRIORITY BARS */

    renderPriorityBars(
        survey.choices,
        totals,
        surveyVotes.length
    );


    updateTimes();

}


/* =========================================
   TOP PRIORITY BAR SECTION
========================================= */

function renderPriorityBars(
    choices,
    totals,
    voteCount
) {

    const priorityList =
    document.getElementById("topPriorityList");

    if (!priorityList) {
        return;
    }


    const rankedChoices = choices
    .map(choice => {

        return {
            name: choice,
            count: totals[choice] || 0
        };

    })
    .sort((a, b) => b.count - a.count);


    let priorityHTML = "";


    rankedChoices.forEach(item => {

        const percent = voteCount > 0
            ? Math.round(
                (item.count / voteCount) * 100
            )
            : 0;


        priorityHTML += `

            <div class="priority-row">

                <div class="priority-name">
                    ${item.name}
                </div>

                <div class="priority-bar">

                    <div
                        class="priority-fill"
                        style="width: ${percent}%"
                    ></div>

                </div>

                <div class="priority-score">
                    ${percent}%
                </div>

            </div>

        `;

    });


    priorityList.innerHTML = priorityHTML;

}


/* =========================================
   UPDATE TIMES
========================================= */

function updateTimes() {

    const currentTime =
    new Date().toLocaleString();

    updateElement(
        "lastUpdated",
        currentTime
    );

    updateElement(
        "highlightLastUpdated",
        currentTime
    );

    updateElement(
        "tickerUpdate",
        currentTime
    );

}


/* =========================================
   FIREBASE LISTENERS
========================================= */

onValue(surveysRef, snapshot => {

    allSurveys = snapshot.val() || {};

    renderHomepage();

});


onValue(votesRef, snapshot => {

    allVotes = snapshot.val() || {};

    renderHomepage();

});