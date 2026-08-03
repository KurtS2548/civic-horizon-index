import { database } from "./firebase.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";





function submitSurvey() {

    const survey = {

        economy: document.getElementById("economy").value,

        healthcare: document.getElementById("healthcare").value,

        education: document.getElementById("education").value,

        safety: document.getElementById("safety").value,

        timestamp: new Date().toISOString()

    };


    const surveysRef = ref(database, "surveys");

    const newSurvey = push(surveysRef);


    set(newSurvey, survey)
    .then(() => {

        document.getElementById("result").innerHTML =
        "Thank you! Your response has been recorded.";

    })
    .catch((error) => {

        document.getElementById("result").innerHTML =
        error.message;

    });

}


window.submitSurvey = submitSurvey;