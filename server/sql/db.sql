-- normal tables 
CREATE TABLE users (
    id BIGSERIAL NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    permission VARCHAR(5) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE directors (
    id BIGSERIAL NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE actors (
    id BIGSERIAL NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE genres (
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE movies (
    id BIGSERIAL NOT NULL,
    title VARCHAR(50) NOT NULL,
    premiere_date DATE,
    PRIMARY KEY (id)
);

-- one to many relationship table
CREATE TABLE user_reviews (
    id BIGSERIAL NOT NULL,
    title VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT,
    movie_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- many to many relationship junction tables
CREATE TABLE movies_directors (
    id BIGSERIAL NOT NULL,    
    movie_id BIGINT NOT NULL,
    director_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (director_id) REFERENCES directors(id)
);
CREATE TABLE movies_actors (
    id BIGSERIAL NOT NULL,    
    movie_id BIGINT NOT NULL,
    actor_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (actor_id) REFERENCES actors(id)
);
CREATE TABLE movies_genres (
    id BIGSERIAL NOT NULL,    
    movie_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);