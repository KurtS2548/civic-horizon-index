import { database } from "./firebase.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const pollContainer =
    document.getElementById("pollContainer");


const issues = [
    {
        id: "economy",
        name: "Economy & Cost of Living",
        description: "Jobs, wages, prices, taxes, and household financial security."
    },
    {
        id: "healthcare",
        name: "Healthcare",
        description: "Healthcare affordability, access, quality, and public health."
    },
    {
        id: "education",
        name: "Education",
        description: "Schools, teachers, student achievement, and educational opportunity."
    },
    {
        id: "housing",
        name: "Housing",
        description: "Housing affordability, availability, rent, and homeownership."
    },
    {
        id: "immigration",
        name: "Immigration",
        description: "Border policy, legal immigration, enforcement, and integration."
    },
    {
        id: "publicSafety",
        name: "Public Safety",
        description: "Crime prevention, emergency services, policing, and community safety."
    },
    {
        id: "nationalSecurity",
        name: "National Security",
        description: "National defense, cybersecurity, terrorism, and international threats."
    },
    {
        id: "environment",
        name: "Environment",
        description: "Clean air and water, conservation, energy, and climate-related concerns."
    },
    {
        id: "governmentAccountability",
        name: "Government Accountability",
        description: "Transparency, ethics, effectiveness, and trust in public institutions."
    },
    {
        id: "childrenFamilies",
        name: "Children & Families",
        description: "Childcare, family support, youth development, and family stability."
    }
];


const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
];


function createStateOptions() {

    return states
        .map(state => {
            return `<option value="${state}">${state}</option>`;
        })
        .join("");

}


function createIssueQuestions() {

    return issues
        .map((issue, index) => {

            return `

                <div class="priority-question">

                    <div class="priority-question-heading">

                        <div>

                            <p class="priority-question-number">
                                Issue ${index + 1}
                            </p>

                            <h3>
                                ${issue.name}
                            </h3>

                            <p>
                                ${issue.description}
                            </p>

                        </div>

                        <div class="priority-score-display">

                            <span id="${issue.id}Value">
                                5
                            </span>

                            <small>
                                / 10
                            </small>

                        </div>

                    </div>


                    <div class="priority-slider-area">

                        <span>
                            Low priority
                        </span>

                        <input
                            type="range"
                            id="${issue.id}"
                            name="${issue.id}"
                            min="1"
                            max="10"
                            value="5"
                            step="1"
                            aria-label="${issue.name} priority score"
                        >

                        <span>
                            Highest priority
                        </span>

                    </div>

                </div>

            `;

        })
        .join("");

}


function displaySurvey() {

    pollContainer.innerHTML = `

        <form id="nationalPrioritiesForm">

            <div class="national-survey-introduction">

                <p class="section-label">
                    National Priorities Survey
                </p>

                <h2>
                    What matters most to you?
                </h2>

                <p>

                    Rate each national issue from 1 to 10.
                    A score of 1 means low priority, while
                    10 means the issue deserves the highest attention.

                </p>

            </div>


            <div class="survey-state-section">

                <label for="state">

                    <strong>
                        Your State
                    </strong>

                    <span>
                        Your state helps us display geographic results.
                    </span>

                </label>


                <select id="state" name="state" required>

                    <option value="">
                        Select your state
                    </option>

                    ${createStateOptions()}

                </select>

            </div>


            <div class="priority-question-list">

                ${createIssueQuestions()}

            </div>


            <div class="survey-submit-section">

                <button
                    type="submit"
                    class="primary-button priority-submit-button"
                    id="prioritySubmitButton"
                >
                    Submit My Priorities
                </button>

                <p
                    id="surveyMessage"
                    class="survey-message"
                    aria-live="polite"
                ></p>

            </div>

        </form>

    `;


    addSliderListeners();

    const surveyForm =
        document.getElementById("nationalPrioritiesForm");


    surveyForm.addEventListener(
        "submit",
        submitPrioritiesSurvey
    );

}


function addSliderListeners() {

    issues.forEach(issue => {

        const slider =
            document.getElementById(issue.id);

        const scoreDisplay =
            document.getElementById(
                `${issue.id}Value`
            );


        slider.addEventListener("input", () => {

            scoreDisplay.textContent =
                slider.value;

        });

    });

}


async function submitPrioritiesSurvey(event) {

    event.preventDefault();


    const surveyMessage =
        document.getElementById("surveyMessage");

    const submitButton =
        document.getElementById(
            "prioritySubmitButton"
        );


    if (
        sessionStorage.getItem(
            "hasSubmittedNationalPriorities"
        )
    ) {

        surveyMessage.textContent =
            "You have already completed this survey during this visit.";

        return;

    }


    const selectedState =
        document.getElementById("state").value;


    if (!selectedState) {

        surveyMessage.textContent =
            "Please select your state.";

        document
            .getElementById("state")
            .focus();

        return;

    }


    const ratings = {};


    issues.forEach(issue => {

        ratings[issue.id] =
            Number(
                document.getElementById(issue.id).value
            );

    });


    const submission = {

        state: selectedState,

        ratings: ratings,

        surveyVersion: "2.0",

        submittedAt:
            new Date().toISOString()

    };


    submitButton.disabled = true;

    submitButton.textContent =
        "Submitting...";

    surveyMessage.textContent =
        "Saving your priorities...";


    try {

        const submissionsRef =
            ref(
                database,
                "prioritySubmissions"
            );

        const newSubmission =
            push(submissionsRef);


        await set(
            newSubmission,
            submission
        );


        sessionStorage.setItem(
            "hasSubmittedNationalPriorities",
            "true"
        );


        surveyMessage.textContent =
            "Thank you. Your voice is now part of the Civic Horizon Index.";

        submitButton.textContent =
            "Survey Submitted";


        document
            .querySelectorAll(
                "#nationalPrioritiesForm input, #nationalPrioritiesForm select"
            )
            .forEach(element => {

                element.disabled = true;

            });


    } catch (error) {

        console.error(
            "Survey submission error:",
            error
        );


        surveyMessage.textContent =
            "Your survey could not be submitted. Please try again.";

        submitButton.disabled = false;

        submitButton.textContent =
            "Submit My Priorities";

    }

}


displaySurvey();