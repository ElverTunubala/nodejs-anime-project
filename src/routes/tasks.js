const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const tasksFilePath = path.join(__dirname, "../../data/tasks.json");

// Leer animes desde el archivo
const readTasks = () => {
  const tasksData = fs.readFileSync(tasksFilePath); // Leer el archivo. Este poderoso metodo nos permite leer archivos de manera sincrona.
  return JSON.parse(tasksData); // Retornar los datos en formato JSON.
};

// Escribir tareas en el archivo
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2)); // Escribir los datos en el archivo. Este poderoso metodo nos permite escribir archivos de manera sincrona.
};

// Crear un nuevo anime
router.post("/", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1, // simulamos un id autoincrementable
    title: req.body.title, // obtenemos el titulo de la tarea desde el cuerpo de la solicitud
    genre: req.body.genre, // obtenemos la descripcion de la tarea desde el cuerpo de la solicitud
    studioId: req.body.studioId,

  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json({ message: "Anime creado exitosamente", anime: newTask });
});

// Obtener todos los animes
router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Obtener una anime por ID
router.get("/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Anime no encontrado" });
  }
  res.json(task);
});

// Actualizar una anime por ID
router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Anime no encontrado" });
  }
  const updatedTask = {
    ...tasks[taskIndex],
    title: req.body.title,
    genre: req.body.genre,
    studioId: req.body.studioId,
  };
  tasks[taskIndex] = updatedTask;
  writeTasks(tasks);
  res.json({ message: "Anime actualizado exitosamente", task: updatedTask });
});

// Eliminar una anime por ID
router.delete("/:id", (req, res) => {
  const tasks = readTasks();
  const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  if (tasks.length === newTasks.length) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  writeTasks(newTasks);
  res.json({ message: "Anime eliminado exitosamente" });
});

module.exports = router;