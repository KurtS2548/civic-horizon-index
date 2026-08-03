const currentSurveyRef = ref(database, "createdSurveys");
import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

let issueChart;
let activeSurveyID = null;


// Find active survey first

const surveysRef = ref(database, "createdSurveys");


onValue(surveysRef, (snapshot) => {


    const surveys = snapshot.val();


    if (!surveys) return;


    const activeSurvey = Object.entries(surveys)
    .find(([id, survey]) => survey.active === true);


    if (!activeSurvey) {

    document.getElementById("topIssue").innerHTML =
    "No active survey";

    return;

}


    activeSurveyID = activeSurvey[0];
document.getElementById("currentSurvey").innerHTML =
activeSurvey[1].question;

    loadDashboard(activeSurveyID);


});



function loadDashboard(activeSurveyID) {


const votesRef = ref(database, "votes");


onValue(votesRef, (snapshot) => {


const data = snapshot.val();


if (!data) {

    document.getElementById("responses").innerHTML = "0";

    document.getElementById("topIssue").innerHTML =
    "No data yet";

    document.getElementById("averageScore").innerHTML =
    "0";

    return;

}



// ONLY ACTIVE SURVEY VOTES

let votes = Object.values(data)
.filter(vote => vote.surveyID === activeSurveyID);



let voteTotals = {};



votes.forEach(vote => {


    let answer = vote.answer;


    if (voteTotals[answer]) {

        voteTotals[answer]++;

    } else {

        voteTotals[answer] = 1;

    }


});



let highest = Math.max(
    ...Object.values(voteTotals),
    0
);



let topIssue = Object.keys(voteTotals)
.find(issue => voteTotals[issue] === highest);



let totalVotes = votes.length;



let overallAverage = totalVotes
? ((highest / totalVotes) * 100).toFixed(0)
: 0;



document.getElementById("responses").innerHTML =
totalVotes;


document.getElementById("topIssue").innerHTML =
topIssue || "No votes";


document.getElementById("averageScore").innerHTML =
overallAverage + "%";




// Chart

if (issueChart) {

    issueChart.destroy();

}


issueChart = new Chart(

document.getElementById("issueChart"),

{

type: "bar",

data: {


labels: Object.entries(voteTotals)
.sort((a,b)=>b[1]-a[1])
.map(item=>item[0]),


datasets: [{

label: "Votes",

data: Object.entries(voteTotals)
.sort((a,b)=>b[1]-a[1])
.map(item=>item[1])

}]


},


options: {


scales: {

y: {

beginAtZero:true

}

}


}


});


});


}