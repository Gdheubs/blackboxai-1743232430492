require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SQLite database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './netflix.db'
});

// Movie model
const Movie = sequelize.define('Movie', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  poster_url: DataTypes.STRING,
  backdrop_url: DataTypes.STRING,
  release_year: DataTypes.INTEGER,
  rating: DataTypes.FLOAT,
  duration: DataTypes.STRING,
  category: DataTypes.STRING
});

// Initialize database
(async () => {
  await sequelize.sync({ force: true });
  await Movie.bulkCreate([
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      poster_url: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      backdrop_url: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
      release_year: 2010,
      rating: 8.8,
      duration: '148 min',
      category: 'popular'
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over several years.',
      poster_url: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      backdrop_url: 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
      release_year: 1994,
      rating: 8.7,
      duration: '142 min',
      category: 'popular'
    }
  ]);
})();

// API Endpoints
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [['rating', 'DESC']],
      limit: 20
    });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
