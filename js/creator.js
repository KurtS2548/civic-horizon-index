import { database, auth } from "./firebase.js";
import {
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    push,
    ref,
    set,
    onValue,
    update,
    remove

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "admin.html";

    }

});

 function createSurvey() {


    const question =
    document.getElementById("question").value;


    const choice1 =
    document.getElementById("choice1").value;


    const choice2 =
    document.getElementById("choice2").value;


    const choice3 =
    document.getElementById("choice3").value;


    const choice4 =
    document.getElementById("choice4").value;



    if (!question || !choice1 || !choice2 || !choice3 || !choice4) {

        document.getElementById("message").innerHTML =
        "Please complete all fields.";

        return;

    }






const surveysRef = ref(database, "createdSurveys");


const newSurvey = push(surveysRef);
set(newSurvey, {

    question: question,

    choices: [

        choice1,
        choice2,
        choice3,
        choice4

    ],

    timestamp: new Date().toISOString(),

    active: false

})


    .then(() => {

        document.getElementById("message").innerHTML =
        "Survey created successfully!";

    })


    .catch((error) => {

        document.getElementById("message").innerHTML =
        error.message;

    });


}


window.createSurvey = createSurvey;
function logout() {

    signOut(auth)

    .then(() => {

        window.location.href = "admin.html";

    });

}

const surveysRef = ref(database, "createdSurveys");


onValue(surveysRef, (snapshot) => {

    const data = snapshot.val();
const activeSurvey = Object.values(data || {}).find(
    survey => survey.active === true
);


if (activeSurvey) {

    document.getElementById("surveyPreview").innerHTML = `

    <h3>${activeSurvey.question}</h3>

    <ul>

    ${activeSurvey.choices.map(choice =>

        `<li>${choice}</li>`

    ).join("")}

    </ul>

    `;

} else {

    document.getElementById("surveyPreview").innerHTML =
    "No active survey.";

}

    if (!data) {

        document.getElementById("surveyList").innerHTML =
        "No surveys created.";

        return;

    }


    let html = "";


    Object.entries(data).forEach(([id, survey]) => {


      html += `

<div class="card">

<h3>${survey.question}</h3>

<p>
Active: ${survey.active ? "Yes" : "No"}
</p>


<button onclick="toggleSurvey('${id}', ${survey.active})">

${survey.active ? "Deactivate" : "Make Active"}

</button>


<button onclick="deleteSurvey('${id}')">

Delete

</button>


</div>

`;


    });


    document.getElementById("surveyList").innerHTML = html;


});
window.logout = logout;
function toggleSurvey(id, currentStatus) {

    const surveysRef = ref(database, "createdSurveys");


    onValue(surveysRef, (snapshot) => {

        const surveys = snapshot.val();


        if (!surveys) return;


        Object.keys(surveys).forEach((surveyId) => {

            const surveyRef = ref(
                database,
                "createdSurveys/" + surveyId
            );


            update(surveyRef, {

                active: surveyId === id

            });

        });


    }, {
        onlyOnce: true
    });

}


window.toggleSurvey = toggleSurvey;



function deleteSurvey(id) {

    const surveyRef = ref(
        database,
        "createdSurveys/" + id
    );


    remove(surveyRef);

}


window.deleteSurvey = deleteSurvey;