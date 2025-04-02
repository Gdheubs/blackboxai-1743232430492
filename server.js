require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// API Endpoints
app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1
      }
    });

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop_url: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      release_year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      rating: movie.vote_average,
      duration: '', // Will need additional API call for runtime
      category: 'popular'
    }));

    res.json(movies);
  } catch (err) {
    console.error('TMDB API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Movie Details Endpoint
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        append_to_response: 'videos,credits'
      }
    });

    const movie = {
      id: response.data.id,
      title: response.data.title,
      description: response.data.overview,
      poster_url: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
      backdrop_url: `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
      release_year: response.data.release_date?.split('-')[0] || 'N/A',
      rating: response.data.vote_average,
      duration: `${Math.floor(response.data.runtime / 60)}h ${response.data.runtime % 60}m`,
      genres: response.data.genres.map(g => g.name),
      cast: response.data.credits.cast.slice(0, 5).map(a => a.name),
      trailer: response.data.videos.results.find(v => v.type === 'Trailer')?.key || null
    };

    res.json(movie);
  } catch (err) {
    console.error('TMDB API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Search Endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        query,
        page: 1
      }
    });

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      backdrop_url: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
      release_year: movie.release_date?.split('-')[0] || 'N/A',
      rating: movie.vote_average,
      category: 'search'
    }));

    res.json(movies);
  } catch (err) {
    console.error('TMDB API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

// Add simple caching
const cache = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

const getWithCache = async (key, fetchFn) => {
  const now = Date.now();
  if (cache[key] && cache[key].expires > now) {
    return cache[key].data;
  }
  const data = await fetchFn();
  cache[key] = {
    data,
    expires: now + CACHE_DURATION
  };
  return data;
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
