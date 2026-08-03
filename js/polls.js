import { database } from "./firebase.js";

import {
    ref,
    onValue,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
let currentSurvey = null;
let currentSurveyID = null;

const surveysRef = ref(database, "createdSurveys");


onValue(surveysRef, (snapshot) => {


    const data = snapshot.val();


    if (!data) {

        document.getElementById("pollContainer").innerHTML =
        "No surveys available.";

        return;

    }


 const surveys = Object.entries(data);


const activeSurvey = surveys.find(
    ([id, survey]) => survey.active === true
);


currentSurveyID = activeSurvey[0];

const survey = activeSurvey[1];
    console.log(survey);
currentSurvey = survey;

    let html = `

    <h2>${survey.question}</h2>

    `;


    survey.choices.forEach(choice => {

        html += `

        <label>

        <input 
        type="radio"
        name="answer"
        value="${choice}">

        ${choice}

        </label>

        <br>

        `;

    });


html += `

<br>

<button onclick="submitVote()">
Submit Vote
</button>

<p id="voteMessage"></p>

`;


document.getElementById("pollContainer").innerHTML = html;



});


function submitVote() {

    if (sessionStorage.getItem("hasVoted")) {

        document.getElementById("voteMessage").innerHTML =
        "You have already voted.";

        return;

    }

    const selected =
    document.querySelector('input[name="answer"]:checked');


    if (!selected) {

        document.getElementById("voteMessage").innerHTML =
        "Please select an answer.";

        return;

    }


    const votesRef = ref(database, "votes");

    const newVote = push(votesRef);


console.log("Saving vote:", {
    surveyID: currentSurveyID,
    question: currentSurvey.question,
    answer: selected.value
});


set(newVote, {

    surveyID: currentSurveyID,

    question: currentSurvey.question,

    answer: selected.value,

    timestamp: new Date().toISOString()

})
    .then(() => {

   sessionStorage.setItem("hasVoted", "true");

    document.getElementById("voteMessage").innerHTML =
    "Thank you for voting!";

})
    .catch((error) => {

        document.getElementById("voteMessage").innerHTML =
        "Error: " + error.message;

    });

}


window.submitVote = submitVote;