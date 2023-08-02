const express = require('express');
const mysql = require('mysql2');

const app = express();

const PORT = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db'
})

app.use(express.json())

// GET request for all the movies with endpoint /api/movies
app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, result) => {
        if(err){
            return console.log(err)
        }
        console.log(result);
        res.json(result)
    })

})

// GET request for all reviews with movie data 
// with endpoint /api/movie-reviews
app.get('/api/movie-reviews', (req, res) => {
    db.query('SELECT * FROM reviews', (err, result) => {
        if(err){
          return console.log(err)
        }
        console.log(result)
        res.json(result)
    })
})

// POST request for adding a movie with endpoint /api/add-movie
app.post('/api/add-movie', (req, res) => {

    const {movie} = req.body
    
    db.query('INSERT INTO movies(movie_name) VALUES (?)', movie, (err, result) => {
        if(err){
            return console.log(err)
        }

        res.json(result);
    })
})

// PUT request for updating a movie review 
// with endpoint /api/review/:id
app.put('/api/review/:id', (req, res) => {
    const {review} = req.body
    const reviewId = req.params.id

    db.query('UPDATE reviews SET review = ? WHERE id = ?', [review, reviewId], (err, result)=> {
        if(err){
            return console.log(err)
        }

        res.json(result)
    })
})

// DELETE request for deleting a route (movie)
// with endpoint /api/movie/:id
app.delete('/api/movie/:id', (req, res)=> {
    const movieId = req.params.id
    db.query('DELETE FROM movies WHERE id = ?', movieId, (err, result)=> {
        if(err){
            return console.log(err)
        }

        res.json(result)
    })
})

app.listen(PORT, ()=> {
    console.log(`server listening on http://localhost:${PORT}`);
})