// backend/src/controllers/taskController.js
import Task from '../models/Task.js';

export async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const newTask = new Task(req.body);
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated=await Task.findByIdAndUpdate(id, updates, {new: true});
    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next){
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).end();
  }catch (err){
    next(err);
  }
}