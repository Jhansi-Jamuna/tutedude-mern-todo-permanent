// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// let tasks = [];

// app.get("/", (req, res) => {
//     // ✅ Always render an empty list on page load
//     tasks = [];
//     res.render("list", { dayej: [] });
// });

// app.post("/", (req, res) => {
//     const itemName = req.body.ele1.trim();
//     if (itemName !== "") {
//         tasks.push({ id: Date.now().toString(), name: itemName });
//     }
//     res.render("list", { dayej: tasks });
// });

// app.post("/delete", (req, res) => {
//     const idToDelete = req.body.checkbox1;
//     tasks = tasks.filter(task => task.id !== idToDelete);
//     res.render("list", { dayej: tasks });
// });

// app.listen(3000, () => {
//     console.log("Server started on port 3000");
// });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];
let editId = null;

// Home Route
app.get("/", (req, res) => {
    res.render("list", { dayej: tasks, editId: null });
});

// Add/Edit Task
app.post("/", (req, res) => {
    const itemName = req.body.ele1.trim();
    const id = req.body.id;

    if (id) {
        tasks = tasks.map(task => task.id === id ? { ...task, name: itemName } : task);
    } else if (itemName !== "") {
        tasks.push({ id: Date.now().toString(), name: itemName });
    }
    res.redirect("/");
});

// Edit Mode Trigger
app.post("/edit", (req, res) => {
    editId = req.body.id;
    res.render("list", { dayej: tasks, editId: editId });
});

// Delete Task
app.post("/delete", (req, res) => {
    const idToDelete = req.body.id;
    tasks = tasks.filter(task => task.id !== idToDelete);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
