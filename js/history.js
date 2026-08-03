import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const surveysRef = ref(database, "createdSurveys");


onValue(surveysRef, (snapshot) => {


const data = snapshot.val();


if (!data) {

document.getElementById("historyContainer").innerHTML =
"No surveys found.";

return;

}



let html = "";



Object.entries(data)
.sort((a,b)=>{

    let dateA = new Date(
        a[1].timestamp || a[1].created
    );

    let dateB = new Date(
        b[1].timestamp || b[1].created
    );


    return dateB - dateA;

})
.forEach(([id, survey]) => {


html += `

<div class="card">

<h3>${survey.question}</h3>


<p>

Status:

${survey.active ? "Active" : "Archived"}

</p>


<p>

Created:

${survey.timestamp || survey.created || "Unknown"}

</p>


<button onclick="viewResults('${id}')">

View Results

</button>


</div>


`;


});



document.getElementById("historyContainer").innerHTML = html;



});
function viewResults(id) {

    window.location.href =
    "survey-results.html?id=" + id;

}


window.viewResults = viewResults;