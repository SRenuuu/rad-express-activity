const express = require('express');
const uuid = require('uuid');
const router = express.Router();
let tasks = require("../../Tasks");

// Get all tasks as json
router.get('/', (req, res) => {
    res.json(tasks);
})

// Get single task as json
router.get('/:id', (req, res) => {
    const task = tasks.find(task => task.id === req.params.id);
    task ? res.json(task) : res.status(400).json({message: `Task not found`});
})

// Create task
router.post('/', (req, res) => {
    const newTask = {
        id: uuid.v4(),
        name: req.body.name,
        datetime: req.body.datetime,
        status: 'active'
    }

    if (!newTask.name || !newTask.datetime) {
        return res.status(400).json({message: 'Please include the task name and datetime'})
    }

    tasks.push(newTask);
    res.json({message: `Task added`});
})

// Create task by html form
router.post('/form', (req, res) => {
    const newTask = {
        id: uuid.v4(),
        name: req.body.name,
        datetime: req.body.datetime,
        status: 'active'
    }

    if (!newTask.name || !newTask.datetime) {
        return res.status(400).json({message: 'Please include the task name and datetime'});
    }

    tasks.push(newTask);
    res.redirect('/');
})

// Update task
router.put('/:id', (req, res) => {
    const found = tasks.some(task => task.id === req.params.id);
    if (found) {
        const updatedTask = req.body;
        tasks.forEach(task => {
            if (task.id === req.params.id) {
                task.name = updatedTask.name ? updatedTask.name : task.name;
                task.datetime = updatedTask.datetime ? updatedTask.datetime : task.datetime;
            }
        });
        res.json({message: `Task updated`});
    } else {
        res.json({message: `Task not found`});
    }
})

// Delete task
router.delete('/:id', (req, res) => {
    const index = tasks.indexOf(tasks.find(task => task.id === req.params.id));
    if (index >= 0) {
        tasks.splice(0, 1);
        console.log(tasks);
        res.json({message: `Task deleted`});
    } else {
        res.json({message: `Task not found`});
    }
})

module.exports = router;
