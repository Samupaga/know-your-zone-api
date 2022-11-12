const express = require('express');
const cors = require('cors');

const logRoute = require("./middleware/route-logger");
const summaryRouter = require("./routers/summaryRouter");
const rentRouter = require("./routers/rentRouter");
// const crimeRouter = require("./routers/crimeRouter")
const demoRouter = require("./routers/demoRouter");
const api = express();

function setupMiddleware(api) {
    api.use(express.json());
    api.use(cors());
    api.use(logRoute);
}

setupMiddleware(api);

api.get("/", (req, res) => {
    res.json({
        name: "Borough data",
        description: "Data about each London borough"
    })
})

api.use("/summary", summaryRouter); // summary route
api.use("/rent", rentRouter); // rent route
// api.use("/crime", crimeRouter); // crime route
api.use("/demographics", demoRouter);

module.exports = api;
