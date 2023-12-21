const { getAllQuestions, setQuestion, getRandomQuestion, getScore, setScore } = require('../data/sqlQueries');

const router = require('express').Router();

//a router for gettin score
router.get('/kayttajat', async (req, res) => {
    try {
        const rows = await getScore();
        res.status(200).json({ message: 'Fetching scores was successful.', rows})
    }catch (error) {
        res.status(500).json({error: 'Something went wrong with fetching scores.'})
    }
})

//a router for posting scores
router.post('/kayttajat', async (req, res) => {
    const data = req.body;
    try {
        const result = setScore(data);
        res.status(200).json({message: 'Setting score was successful.', result})
    } catch (error) {
        res.status(500).json({error: 'Something went wrong with setting score.'});
    }
})

//a router for a random question fetcher.
router.get('/rkysymykset', async (req, res) => {
    try {
        const rows = await getRandomQuestion()
        res.status(200).json({ message: 'Questions fetched succesfully.', rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while getting all questions.' });
    }
})

//a router for a all questions fetcher
router.get('/kysymykset', async (req, res) => {
    try {
        const rows = await getAllQuestions();
        res.status(200).json({ message: 'Questions fetched succesfully.', rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while getting all questions.' });
    }
});

//a router for setting a new question, answer pair.
router.post('/kysymykset', async (req, res) =>{
    const data = req.body;
    try {
        const result = await setQuestion(data)
        res.status(200).json({ message: 'Question and answer set successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while setting question and answer' });
    }
});

module.exports = router;