// ================================
// Smart Resume Analyzer
// Frontend Version
// ================================


// Important skills
const skills = [
    "html",
    "css",
    "javascript",
    "react",
    "python",
    "java",
    "c++",
    "sql",
    "git",
    "github",
    "node.js",
    "node",
    "express",
    "mongodb",
    "typescript",
    "api",
    "rest api",
    "responsive design",
    "figma",
    "bootstrap",
    "tailwind",
    "dom",
    "fetch api",
    "async await"
];


// Elements
const resumeText = document.getElementById("resumeText");
const jobText = document.getElementById("jobText");

const resumeCount = document.getElementById("resumeCount");
const jobCount = document.getElementById("jobCount");


// Character counter
resumeText.addEventListener("input", function () {
    resumeCount.textContent = resumeText.value.length;
});

jobText.addEventListener("input", function () {
    jobCount.textContent = jobText.value.length;
});


// Main function
function analyzeResume() {

    const resume = resumeText.value.toLowerCase();
    const job = jobText.value.toLowerCase();


    // Check input
    if (resume.trim() === "" || job.trim() === "") {

        alert("Please enter both your resume and job description.");

        return;
    }


    // Find skills in resume
    const resumeSkills = skills.filter(function (skill) {

        return resume.includes(skill);

    });


    // Find skills in job description
    const jobSkills = skills.filter(function (skill) {

        return job.includes(skill);

    });


    // Matching skills
    const matchedSkills = jobSkills.filter(function (skill) {

        return resumeSkills.includes(skill);

    });


    // Missing skills
    const missingSkills = jobSkills.filter(function (skill) {

        return !resumeSkills.includes(skill);

    });


    // Calculate score
    let score = 0;

    if (jobSkills.length > 0) {

        score = Math.round(
            (matchedSkills.length / jobSkills.length) * 100
        );

    } else {

        score = 0;

    }


    // Show score
    document.getElementById("score").textContent =
        score + "%";


    // Progress bar
    document.getElementById("progress").style.width =
        score + "%";


    // Score message
    let title = "";
    let message = "";

    if (score >= 80) {

        title = "Strong Match";
        message = "Your resume contains many of the skills mentioned in this job description.";

    } else if (score >= 60) {

        title = "Good Match";
        message = "Your resume matches several important requirements, but there are some gaps.";

    } else if (score >= 40) {

        title = "Moderate Match";
        message = "There are some relevant skills, but your resume could be better aligned.";

    } else {

        title = "Low Match";
        message = "Several important skills from the job description were not detected.";

    }


    document.getElementById("scoreTitle").textContent = title;

    document.getElementById("scoreText").textContent = message;


    // Display matching skills
    displaySkills(
        "matchedSkills",
        matchedSkills,
        false
    );


    // Display missing skills
    displaySkills(
        "missingSkills",
        missingSkills,
        true
    );


    // Keywords
    displayKeywords(job);


    // Suggestions
    generateSuggestions(
        resume,
        job,
        matchedSkills,
        missingSkills
    );


    // Scroll to results
    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}



// Display skills
function displaySkills(elementId, skillArray, isMissing) {

    const container =
        document.getElementById(elementId);


    container.innerHTML = "";


    if (skillArray.length === 0) {

        container.innerHTML =
            `<span class="empty">
                No skills found
            </span>`;

        return;
    }


    skillArray.forEach(function (skill) {

        const span = document.createElement("span");

        span.textContent = skill;

        span.classList.add("skill");


        if (isMissing) {

            span.classList.add("missing-skill");

        }


        container.appendChild(span);

    });
}



// Keyword analysis
function displayKeywords(job) {

    const keywordList =
        document.getElementById("keywordList");


    keywordList.innerHTML = "";


    const foundKeywords = skills.filter(function (skill) {

        return job.includes(skill);

    });


    if (foundKeywords.length === 0) {

        keywordList.innerHTML =
            `<span class="empty">
                No important keywords detected.
            </span>`;

        return;
    }


    foundKeywords.forEach(function (keyword) {

        const span = document.createElement("span");

        span.classList.add("keyword");

        span.textContent = keyword;

        keywordList.appendChild(span);

    });
}



// Suggestions
function generateSuggestions(
    resume,
    job,
    matchedSkills,
    missingSkills
) {

    const suggestions =
        document.getElementById("suggestions");


    suggestions.innerHTML = "";


    let suggestionArray = [];


    // Missing skills suggestion
    if (missingSkills.length > 0) {

        suggestionArray.push(
            "The job description mentions " +
            missingSkills.slice(0, 4).join(", ") +
            ". If you genuinely have these skills, consider mentioning them clearly in your resume."
        );

    }


    // Projects
    if (
        resume.includes("project") === false
    ) {

        suggestionArray.push(
            "Consider adding relevant projects to demonstrate your practical skills."
        );

    }


    // GitHub
    if (
        job.includes("github") &&
        !resume.includes("github")
    ) {

        suggestionArray.push(
            "The job mentions GitHub. Add your GitHub profile or relevant project repositories if applicable."
        );

    }


    // Responsive design
    if (
        job.includes("responsive") &&
        !resume.includes("responsive")
    ) {

        suggestionArray.push(
            "Consider mentioning responsive design in relevant projects if you have actually implemented it."
        );

    }


    // JavaScript
    if (
        job.includes("javascript") &&
        resume.includes("javascript")
    ) {

        suggestionArray.push(
            "Your resume mentions JavaScript. Consider describing specific work such as DOM manipulation, APIs or asynchronous JavaScript where relevant."
        );

    }


    // Generic suggestion
    suggestionArray.push(
        "Keep your resume focused on skills and experiences that are genuinely relevant to the specific job."
    );


    // Show suggestions
    suggestionArray.forEach(function (
        suggestion,
        index
    ) {

        const div =
            document.createElement("div");

        div.classList.add("suggestion");


        div.innerHTML = `
            <span>${index + 1}</span>
            <p>${suggestion}</p>
        `;


        suggestions.appendChild(div);

    });
}