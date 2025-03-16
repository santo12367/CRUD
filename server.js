// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new movie
app.post('/movies', async (req, res) => {
  const { title, director, year,}= req.body;

  const newMovie = new Movie({
    title,
    director,
    year,
  });

  try {
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    res.json(deletedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a movie by ID
app.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
