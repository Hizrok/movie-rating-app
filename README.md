# Movie rating app

### Prologue and a warning
 
This project is not finished. I wanted to finish this project before the school starts, but due to a bad planning it took longer than expected. I really wanted to learn a frontend framework so for this project I learnt and used react. I also switched from mysql to postgresql. It turned out learning as you go is very time consuming and the imdb clone proved to be a bigger task than I can handle right now.

One of the biggest mistakes I made while making this project was that I didn’t plan it at all, so for my next project I will design first and code second. I want to be able to tell exactly what I am gonna do next and how much time it’s going to take.

### The highlights

This project was used mainly to learn and practice sql, so I will be explaining some of the code here…
![database image](https://github.com/Hizrok/movie-rating-app/tree/master/server/sql/database.png "database design")

#### 1. designing the database

This is the first time I had to design a database with many to many relationships. You can see the first database design here.

This was my first time using many to many relationships. I needed them to join the data to the movies table.

``` sql
CREATE TABLE movies_directors (
	id BIGSERIAL NOT NULL,
	movie_id BIGINT NOT NULL,
	director_id BIGINT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (movie_id) REFERENCES movies(id),
	FOREIGN KEY (director_id) REFERENCES directors(id)
); 
```

#### 2. first attempt at sql searching

I added a column to the movie table for searching. I learned how searching works in sql.

``` sql
ALTER TABLE movies ADD COLUMN document tsvector;
UPDATE movies SET document = to_tsvector(title || ' ' || coalesce(subtitle, ''));
```

``` sql
SELECT * FROM movies WHERE document @@ to_tsquery('< movie title or subtitle >');
```

#### 3. sql search query

(The search query I am talking about is in server/routes/movies.js and starts on line 37…)

I needed to display movies in the movies route. I wanted to be able to:
* search for a specific movie using its title or subtitle
* sort the results by genres, age and rating

I started with the rating, which is an average taken from user ratings of a specific movie:

``` sql
SELECT movie_id, ROUND(AVG(rating)) AS rating FROM user_reviews GROUP BY movie_id
```

I joined that with a select statement that selects only the movies from specified genres. I also had to join it with the genres table, because the many to many table contains only ids.

``` sql
SELECT DISTINCT ON (movie_id) movies_genres.movie_id, rating, genres.name FROM movies_genres
LEFT JOIN (...)
JOIN genres ON movies_genres.genre_id=genres.id
WHERE genres.name IN < specified genres >
```

I then RIGHT joined it with all the other important information about movies to get only the movies that I want.

``` sql
SELECT id, title, subtitle, premiere_date, rating FROM movies
RIGHT JOIN (...) ON movies.id=genre_table.movie_id
```

I added WHERE clause for search and ORDER BY clause for order

``` sql
WHERE document @@ to_tsquery( $1 )
ORDER BY < specified order >
```

You can also add a LIMIT clause to limit the amount of results

#### 4. protecting from sql injections

I learned that I can put all my variables into an array and let postgresql handle the rest:

``` sql
-- $1 is a variable
… WHERE document @@ to_tsquery( $1 ) …

-- when querying the database
… pool.query({text: sql, values: values})
```

### The missing pieces

I have a long todo list of things that are missing. However, I can clearly split them into 2 categories. The ones that I just didn’t have time for and the ones I don’t know how to do. For example I almost finished the /movies route. There are only some small things missing like loading bars and limits. I didn’t have the time to implement the same system to the other routes.

However, if I would ever come back to this project it would be for the things I don’t know how to do. The biggest thing is that I need to host an image for each movie for the site to look nice. I don’t know where I would host my images affordably / for free. The app needs user authentication and I don’t know how to do that yet, but I am hoping I will cover both of these in my next project.

Jan ‘Hizrok’ Kapsa
