import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";






const surveysRef = ref(database, "surveys");


onValue(surveysRef, (snapshot) => {


    let data = snapshot.val();


    if (!data) {

        return;

    }


    let totals = {

        economy: 0,

        healthcare: 0,

        education: 0,

        safety: 0

    };


    let count = 0;



    for (let id in data) {


        totals.economy += Number(data[id].economy);

        totals.healthcare += Number(data[id].healthcare);

        totals.education += Number(data[id].education);

        totals.safety += Number(data[id].safety);


        count++;

    }



    document.getElementById("responses").innerHTML =
    count;



    document.getElementById("economyScore").innerHTML =
    (totals.economy / count).toFixed(1) + "/10";


    document.getElementById("healthcareScore").innerHTML =
    (totals.healthcare / count).toFixed(1) + "/10";


    document.getElementById("educationScore").innerHTML =
    (totals.education / count).toFixed(1) + "/10";


    document.getElementById("safetyScore").innerHTML =
    (totals.safety / count).toFixed(1) + "/10";

let scores = {

    Economy: totals.economy / count,

    Healthcare: totals.healthcare / count,

    Education: totals.education / count,

    "Public Safety": totals.safety / count

};


let topIssue = Object.keys(scores).reduce((a, b) =>

    scores[a] > scores[b] ? a : b

);


document.getElementById("topIssue").innerHTML =

topIssue + " (" + scores[topIssue].toFixed(1) + "/10)";
});