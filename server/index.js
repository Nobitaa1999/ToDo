const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Task = require('./model/todoSchema');
const dbconnect=require('./config/database')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

dbconnect();

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text, completed: false });
  await newTask.save();
  res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(updatedTask);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
