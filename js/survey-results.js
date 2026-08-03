import { database } from "./firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


let chart;


const params = new URLSearchParams(
    window.location.search
);


const surveyID = params.get("id");



if (!surveyID) {

    document.getElementById("surveyQuestion").innerHTML =
    "No survey selected.";

}



// Load survey question

const surveyRef = ref(
    database,
    "createdSurveys/" + surveyID
);



onValue(surveyRef, (snapshot)=>{


    const survey = snapshot.val();


    if (!survey) return;


    document.getElementById("surveyQuestion").innerHTML =
    survey.question;


});






// Load votes

const votesRef = ref(database, "votes");



onValue(votesRef,(snapshot)=>{


    const data = snapshot.val();



    if (!data) {


        document.getElementById("totalResponses").innerHTML =
        "0";


        document.getElementById("winningAnswer").innerHTML =
        "No votes yet";


        return;

    }





    const votes = Object.values(data)

    .filter(vote => vote.surveyID === surveyID);





    let totals = {};



    votes.forEach(vote=>{


        totals[vote.answer] =
        (totals[vote.answer] || 0) + 1;


    });






    document.getElementById("totalResponses").innerHTML =
    votes.length;







    if (votes.length === 0) {


        document.getElementById("winningAnswer").innerHTML =
        "No votes yet";


        return;


    }





    const winner = Object.keys(totals).reduce((a,b)=>

        totals[a] > totals[b] ? a : b

    );





    document.getElementById("winningAnswer").innerHTML =
    winner;








    // Percentage bars


    let resultsHTML = "";



    Object.entries(totals)

    .sort((a,b)=>b[1]-a[1])

    .forEach(([answer,count])=>{



        let percent =
        ((count / votes.length) * 100).toFixed(0);




        resultsHTML += `


        <div class="result-row">


        <strong>${answer}</strong>


        <div class="bar">

        <div class="fill" style="width:${percent}%">

        ${percent}%

        </div>

        </div>


        <p>
        ${count} votes
        </p>


        </div>


        `;


    });





    document.getElementById("percentageResults").innerHTML =
    resultsHTML;








    // Chart


    if(chart){

        chart.destroy();

    }





    chart = new Chart(

        document.getElementById("resultsChart"),

        {

        type:"bar",

        data:{


            labels:Object.keys(totals),


            datasets:[{


                label:"Votes",


                data:Object.values(totals)


            }]


        },


        options:{


            responsive:true,


            scales:{


                y:{


                    beginAtZero:true


                }


            }


        }


        }


    );



});
function shareResults(){

    if (navigator.share) {

        navigator.share({

            title: "Civic Horizon Index Results",

            text: "View the latest public opinion results from Civic Horizon Index",

            url: window.location.href

        });

    } else {

        navigator.clipboard.writeText(window.location.href);

        alert("Results link copied!");

    }

}


window.shareResults = shareResults;