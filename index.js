const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());  // adding a piece of middleware


const genres = [
    {id: 1, story: "viv", plot: "anything", character: "man", setting: "vintage"},
    {id: 2, story: "viv2", plot: "anything2", character: "man2", setting: "vintage2"},
    {id: 3, story: "viv3", plot: "anything3", character: "man3", setting: "vintage3"},
    {id: 4, story: "viv4", plot: "anything4", character: "man4", setting: "vintage4"}
];

app.get('/vivdly.com', (req, res) => {
    res.send('This is a movie website'); 
});

app.get('/vivdly.com/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/vivdly.com/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the ID does not exist');
    res.send(genre);
});

app.post('/vivdly.com/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        story: req.body.story
    // genre.plot = req.body.plot;
    // genre.character = req.body.character;
    // genre.setting = req.body.setting;
    };
    genres.push(genre);
    res.send(genre);
})


function validateGenre(genre) {
    const schema = {
        story: Joi.string().min(2).required()
        // plot: Joi.string().min(5).required(),
        // character: Joi.string().min(3).required(),
        // setting: Joi.string().min(5).required()
    };
    return Joi.validate(genre, schema);

}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
