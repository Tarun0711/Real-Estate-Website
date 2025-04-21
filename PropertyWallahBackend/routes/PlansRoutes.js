const express = require('express');
const router = express.Router();
const Plan = require('../models/PlanModel');

// Create a new Plan Pack
router.post('/', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).send(plan);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all Plan Packs
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().exec();
    res.send(plans);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single Plan Pack by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).exec();
    if (!plan) {
      res.status(404).send({ message: 'Plan Pack not found' });
    } else {
      res.send(plan);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a Plan Pack
router.patch('/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!plan) {
      res.status(404).send({ message: 'Plan Pack not found' });
    } else {
      res.send(plan);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a Plan Pack
router.delete('/:id', async (req, res) => {
  try {
    await Plan.findByIdAndRemove(req.params.id).exec();
    res.status(204).send({ message: 'Plan Pack deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;