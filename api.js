const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const logRoute = require("./middleware/route-logger");
const entryRouter = require("./routes/entryRoutes")
const api = express();

function setupMiddleware(api) {
    api.use(express.json());
    api.use(cors());
    api.use(cookieParser())
    api.use(logRoute);
}

setupMiddleware(api);

api.get("/", (req, res) => {
    res.json({
        name: "Borough data",
        description: "Data about each London borough"
    })
})

api.use("/entries", entryRouter);
api.use("/users", userRouter);

module.exports = api;
