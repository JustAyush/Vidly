const Joi = require('@hapi/joi')
const express = require('express');
const app = express();

app.use(express.json())

let genres = [
    {
        id: 1,  
        genre: 'Thriller', 
    }, 
    {
        id: 2, 
        genre: 'Fantasy'
    },
    {
        id: 3,
        genre: 'SciFi'
    }
]


app.get('/', (req, res) => {
    res.send("Hello World");
})

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    // find the genre with the provided id
    const genre = genres.find(item => item.id === parseInt(req.params.id));

    // send 404 not found when there isn't any
    if(!genre) return res.status(404).send('The genre with the provided id was not found')

    // send the genre if found
    res.send(genre);
})

app.post('/api/genres', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const {value, error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    // create an object to add to the list
    let genre = { id: genres.length + 1, name: req.body.name};
    // add the object
    genres = [...genres, genre];
    res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {

    // schema
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    // find the genre with provided id
    let genre = genres.find((item) => item.id === parseInt(req.params.id));

    // if not found send the 404 NOT FOUND error
    if(!genre) return res.status(404).send('The genre with given id was not found');

    // validate
    const {value, error} = schema.validate(req.body);

    // if not validated, send 400 BAD REQUEST error
    if(error) return res.status(400).send(error.details[0].message);

    // update the genre and send it
    genre.genre = req.body.name;
    res.send(genre);

})

app.delete('/api/genres/:id', (req, res) => {
    
    // find the genre with provided id
    let genre = genres.find((item) => item.id === parseInt(req.params.id));

    // send 404 NOT FOUND error if not found
    if(!genre) res.status(404).send('The genre with given id was not found');

    // delete the genre and send the remaining ones
    genres = genres.filter((item) => item.id !== parseInt(req.params.id))
    res.send(genres);

})



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
