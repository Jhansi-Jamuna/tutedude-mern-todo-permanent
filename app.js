const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.get("/", (req, res) => {
    // ✅ Always render an empty list on page load
    tasks = [];
    res.render("list", { dayej: [] });
});

app.post("/", (req, res) => {
    const itemName = req.body.ele1.trim();
    if (itemName !== "") {
        tasks.push({ id: Date.now().toString(), name: itemName });
    }
    res.render("list", { dayej: tasks });
});

app.post("/delete", (req, res) => {
    const idToDelete = req.body.checkbox1;
    tasks = tasks.filter(task => task.id !== idToDelete);
    res.render("list", { dayej: tasks });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
