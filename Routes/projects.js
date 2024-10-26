const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create a Project
router.post('/create', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
