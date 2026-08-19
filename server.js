const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const rootPath = __dirname;
const v2Path = path.join(__dirname, "v2");

// Login / account page first
app.get("/", (req, res) => {
    res.sendFile(
        path.join(v2Path, "account.html")
    );
});

// V2 services still use the original Firebase configuration
app.get("/js/firebase.js", (req, res) => {
    res.sendFile(
        path.join(rootPath, "js", "firebase.js")
    );
});

// Serve the V2 website
app.use(
    express.static(
        v2Path,
        {
            index: false
        }
    )
);

app.listen(PORT, () => {
    console.log(
        `Civic Horizon Index is running at http://localhost:${PORT}`
    );
});