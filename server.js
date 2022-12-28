const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
projectData = {};
app.use(express.static("website"));
const getAll = (req, res) => res.status(200).send(projectData);
app.get("/all", getAll);
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
  }
app.post("/add", postData);

const port = 4000;
const hostname = "127.0.0.1";

const listening = () =>
console.log(`Server running at http://${hostname}:${port}/`);
app.listen(port, listening);
