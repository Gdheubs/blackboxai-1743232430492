# Watcher App Deployment Guide

## Production Deployment Options

1. **Platforms**:
   - Vercel (vercel.com)
   - Render (render.com)
   - Railway (railway.app)
   - DigitalOcean App Platform (digitalocean.com)

2. **Requirements**:
   - Node.js environment
   - PostgreSQL/SQLite database
   - Port 3000 for API
   - Port 8000/8001 for frontend

3. **Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_production_db_url
   ```

## Movie Data Sources

1. **Free APIs**:
   - The Movie Database (TMDB) - https://www.themoviedb.org/documentation/api
   - OMDB API - http://www.omdbapi.com
   - IMDb Dataset - https://www.imdb.com/interfaces/

2. **Self-Hosted Options**:
   - Create your own admin panel to manage movies
   - Use a CMS like Strapi or Directus
   - Scrape data (check legal terms first)

3. **Current Implementation**:
   - Edit `server.js` to add more movies manually
   - Or modify the bulkCreate() function to fetch from an API