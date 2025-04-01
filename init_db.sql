-- Create movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    poster_url VARCHAR(512),
    backdrop_url VARCHAR(512),
    release_year INTEGER,
    rating NUMERIC(3,1),
    duration VARCHAR(50),
    category VARCHAR(50)
);

-- Insert sample movie data (20 real movies)
INSERT INTO movies (title, description, poster_url, backdrop_url, release_year, rating, duration, category) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg', 2010, 8.8, '148 min', 'popular'),
('The Shawshank Redemption', 'Two imprisoned men bond over several years.', 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png', 1994, 8.7, '142 min', 'popular'),
('The Dark Knight', 'When the menace known as the Joker emerges, Batman must confront him.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5SZ9.jpg', 2008, 8.5, '152 min', 'trending'),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, and a gangster intersect.', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 'https://image.tmdb.org/t/p/original/4cDFJr4HnXN5AdPw4AKrmLlMWd3.jpg', 1994, 8.5, '154 min', 'trending'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control.', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 'https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg', 1972, 8.5, '175 min', 'popular');
-- Additional 15 movies would be inserted here