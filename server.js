//----------------------------- STAGE 0 ------------------------------
/*
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/


//----------------------------- STAGE 1 ------------------------------
/*
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/

//----------------------------- STAGE 2 ------------------------------
/*
const express = require("express");
const app = express();
const PORT = 3000;

let tasks = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Finish FYP report", done: false },
  { id: 3, title: "Walk the dog", done: true },
];

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/

//----------------------------- STAGE 3 ------------------------------

/*
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); 

let tasks = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Finish FYP report", done: false },
  { id: 3, title: "Walk the dog", done: true },
];
let nextId = 4; 

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Validation — never trust the client
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required and cannot be empty" });
  }

  const newTask = { id: nextId++, title: title.trim(), done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/


//----------------------------- STAGE 4 ------------------------------
/*
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Finish FYP report", done: false },
  { id: 3, title: "Walk the dog", done: true },
];
let nextId = 4;

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required and cannot be empty" });
  }

  const newTask = { id: nextId++, title: title.trim(), done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  const { title, done } = req.body;
  const hasValidTitle = title !== undefined && typeof title === "string" && title.trim() !== "";
  const hasValidDone = done !== undefined && typeof done === "boolean";

  if (!hasValidTitle && !hasValidDone) {
    return res.status(400).json({
      error: "Provide a non-empty 'title' (string) and/or 'done' (boolean)",
    });
  }

  if (hasValidTitle) task.title = title.trim();
  if (hasValidDone) task.done = done;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  tasks.splice(index, 1);
  res.status(204).send(); // No Content — empty body, nothing after this
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/
//----------------------------- STAGE 5 ------------------------------
// server.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapiSpec = require("./openapi.json");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Finish FYP report", done: false },
  { id: 3, title: "Walk the dog", done: true },
];
let nextId = 4;

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: `Task ${id} not found` });
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required and cannot be empty" });
  }
  const newTask = { id: nextId++, title: title.trim(), done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: `Task ${id} not found` });

  const { title, done } = req.body;
  const hasValidTitle = title !== undefined && typeof title === "string" && title.trim() !== "";
  const hasValidDone = done !== undefined && typeof done === "boolean";

  if (!hasValidTitle && !hasValidDone) {
    return res.status(400).json({
      error: "Provide a non-empty 'title' (string) and/or 'done' (boolean)",
    });
  }

  if (hasValidTitle) task.title = title.trim();
  if (hasValidDone) task.done = done;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: `Task ${id} not found` });
  tasks.splice(index, 1);
  res.status(204).send();
});

// Swagger UI reads openapi.json and renders it as a page
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.listen(PORT, () => {
  console.log(`Task API running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/docs`);
});