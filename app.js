
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// let tasks = [];
// let editId = null;

// // Home Route
// app.get("/", (req, res) => {
//     res.render("list", { dayej: tasks, editId: null });
// });

// // Add/Edit Task
// app.post("/", (req, res) => {
//     const itemName = req.body.ele1.trim();
//     const id = req.body.id;

//     if (id) {
//         tasks = tasks.map(task => task.id === id ? { ...task, name: itemName } : task);
//     } else if (itemName !== "") {
//         tasks.push({ id: Date.now().toString(), name: itemName });
//     }
//     res.redirect("/");
// });

// // Edit Mode Trigger
// app.post("/edit", (req, res) => {
//     editId = req.body.id;
//     res.render("list", { dayej: tasks, editId: editId });
// });

// // Delete Task
// app.post("/delete", (req, res) => {
//     const idToDelete = req.body.id;
//     tasks = tasks.filter(task => task.id !== idToDelete);
//     res.redirect("/");
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
app.use(express.json());

let tasks = [];
let editId = null; // GLOBAL STATE

// Home route
app.get("/", (req, res) => {
    res.render("list", { tasks: tasks, editId: editId });
    editId = null; // Reset after rendering
});

// Add or Update Task
app.post("/", (req, res) => {
    const name = req.body.ele1?.trim();
    const id = req.body.id;

    if (id) {
        tasks = tasks.map(task => task.id === id ? { ...task, name } : task);
    } else if (name !== "") {
        tasks.push({ id: Date.now().toString(), name });
    }
    res.redirect("/");
});

// Enable Edit Mode
app.post("/edit", (req, res) => {
    editId = req.body.id;
    res.redirect("/");
});

// PUT: Update Task
app.put("/task/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    tasks = tasks.map(task => task.id === id ? { ...task, name } : task);
    res.json({ success: true });
});

// DELETE: Delete Task
app.delete("/task/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
