const dbCon = require('./dbCon.js');
const randomNum = require('./randomNum.js')

const SQL = {
    GET_QUESTION_WITH_ID: 'SELECT * FROM kysymykset WHERE id = (?)',
    GET_ALL_QUESTIONS: 'SELECT * FROM kysymykset',
    SET_QUESTIONS: 'INSERT INTO kysymykset (kysymys, vastaus) VALUES ((?), (?))',
    SET_SCORE: 'INSERT INTO kayttajat (knimi, tulos) VALUES ((?), (?))',
    GET_SCORE: 'SELECT * FROM kayttajat'
}

//Get the random question out of database
async function getRandomQuestion(){
    const randNum = randomNum.RandomNumber();
    const [rows] = await dbCon.execute(SQL.GET_QUESTION_WITH_ID, [randNum]);
    console.log(rows);
    return rows;
}

//Get all questions from database
async function getAllQuestions(){
    const [rows] = await dbCon.execute(SQL.GET_ALL_QUESTIONS);
    console.log(rows);
    return rows;
}


//Add questions to database
async function setQuestion(data){
    console.log(data.kysymys, data.vastaus);
    await dbCon.execute(SQL.SET_QUESTIONS,[data.kysymys, data.vastaus]);
}

//Get scores from database
async function getScore(){
    const [rows] = await dbCon.execute(SQL.GET_SCORE);
    return rows;
}
//Add score to the database
async function setScore(data){
    console.log(data.knimi + " " + data.tulos);
    await dbCon.execute(SQL.SET_SCORE, [data.knimi, data.tulos]);
}

module.exports = { getAllQuestions, getRandomQuestion, setQuestion, setScore, getScore}