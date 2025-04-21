const State = require('../models/StateModel');

// Create a new state with cities
exports.createState = async (req, res) => {
  try {
    const { name, cities } = req.body;

    // Create a new state
    const state = new State({
      name,
      cities
    });
    const image = req.files?.image?.map(file => file.path) || [];
    state.image = image;

    await state.save();
    res.status(201).json({ message: 'State created successfully', state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all states with their cities
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific state by ID
exports.getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a state and its cities
exports.updateState = async (req, res) => {
  try {
    const { name, image, cities } = req.body;
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    state.name = name || state.name;
    state.image = image || state.image;
    state.cities = cities || state.cities;

    await state.save();
    res.status(200).json({ message: 'State updated successfully', state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a state
exports.deleteState = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    await state.remove();
    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new city to an existing state
exports.addCityToState = async (req, res) => {
  try {
    const { name, image } = req.body;
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    // Add new city
    state.cities.push({ name, image });

    await state.save();
    res.status(200).json({ message: 'City added successfully', state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a city from a state
exports.removeCityFromState = async (req, res) => {
  try {
    const { cityId } = req.params;
    const state = await State.findById(req.params.stateId);

    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    // Remove city by ID
    state.cities = state.cities.filter(city => city._id.toString() !== cityId);

    await state.save();
    res.status(200).json({ message: 'City removed successfully', state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
