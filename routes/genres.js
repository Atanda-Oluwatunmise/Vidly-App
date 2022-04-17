const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, story: "viv", plot: "anything", character: "man", setting: "vintage"},
    {id: 2, story: "viv2", plot: "anything2", character: "man2", setting: "vintage2"},
    {id: 3, story: "viv3", plot: "anything3", character: "man3", setting: "vintage3"},
    {id: 4, story: "viv4", plot: "anything4", character: "man4", setting: "vintage4"}
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the ID does not exist');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        story: req.body.story,
        plot: req.body.plot,
        character: req.body.character,
        setting: req.body.setting
    };
    genres.push(genre);
    res.send(genre);
})

router.put('/:id', (req, res) => {
    // lookup the genre
    // if not existing, return 404-resource not found
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre was not found');
    

    // Validate
    // If invalid, return 400-Bad request
    // object destructuring
    const { error } = validateGenre(req.body) // equivalent to result.error
    if (error) return res.status(400).send(error.details[0].message);

    // Update genre
    genre.story = req.body.story;
    genre.plot = req.body.plot;
    genre.character = req.body.character;
    genre.setting = req.body.setting;

    // Return updated genre
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre was not found');

    // delete
    const index  = genres.indexOf(genre);
    genres.splice(index, 1);

    // return the same course
    res.send(genre);

});

function validateGenre(genre) {
    const schema = Joi.object({
        story: Joi.string().min(2).required(),
        plot: Joi.string().min(5).required(),
        character: Joi.string().min(3).required(),
        setting: Joi.string().min(5).required()
    });
    return schema.validate(genre);
}

module.exports = router;