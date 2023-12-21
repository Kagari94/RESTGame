import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const kysymyksetApi = "http://localhost:3001/kysymykset";
const kayttajatApi = "http://localhost:3001/kayttajat";

function App() {

  // For getting question from database, and using it on app.
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState();
  const [randomNum, setRandomNum] = useState();
  const [score, setScore] = useState(0);

  //For posting question and answer to database
  const [questions, addQuestions] = useState();
  const [answers, addAnswer] = useState();

  //For username, scores are added above.
  const [userName, setUserName] = useState();
  const [users, setUsers] = useState([]);

  //Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(kysymyksetApi);

        console.log(response.data.rows);

        setQuestion(response.data.rows);
      } catch (error) {
        console.log(error);
      }

    }
    fetchData();
  }, [])


  //Post data
  const addData = async () => {
    try {

      const formData = new URLSearchParams();
      formData.append('kysymys', questions);
      formData.append('vastaus', answers);

      const { data } = await axios.post(kysymyksetApi, formData, {
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      console.log("Response from server:", data);

      document.getElementById("questions").value = ""
      document.getElementById("answers").value = ""
      
      alert("Tiedon lisääminen onnistui.");
    } catch (error) {
      alert(error)
      
    }
  }


  //Get scores
  const addScore = async () => {
    try {

      const formData = new URLSearchParams();
      formData.append('knimi', userName);
      formData.append('tulos', score);

      const { data } = await axios.post(kayttajatApi, formData, {
        'Content-Type': 'application/x-www-form-form-urlencoded' 
      });

      document.getElementById("user").value = "";

      alert("Tiedon lisääminen onnistui")
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(kayttajatApi);
        setUsers(response.data.rows);
      } catch (error) {
        console.log(error)
      } 
    }
    fetchUsers();
    console.log(users);
  }, [])


  //Randomize question.
  function randomizeQuestion() {
    setRandomNum(Math.floor(Math.random() * question.length));
    console.log(randomNum + " : " + question.length);
  }
  //use the randomize on page load once so we get an question.
  useEffect(() => {
    randomizeQuestion()
  }, [])

  // vastauksen tarkistaminen.
  function checkAnswer() {
    document.getElementById("inputText").innerHTML = "Kirjoita vastauksesi."
    if (question[randomNum].vastaus.toLowerCase() === answer.toLowerCase()) {
      setScore(score + 1);
      document.getElementById("inputBox").value = "";
      randomizeQuestion();
    } else {
      console.log("Vastaus väärin meni: " + answer + " kysymys oli: " + question[randomNum].kysymys);
      document.getElementById("inputText").innerHTML = "Vastauksesi oli väärin, kokeile uudestaan..";
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <div id="adder">
          <h4>Lisää kysymys ja vastaus tietokantaan.</h4>
          <p>:Kysymys:</p>
          <input id="questions" onChange={e => addQuestions(e.target.value)}/>
          <p>:Vastaus:</p>
          <input id="answers" onChange={e => addAnswer(e.target.value)}/>  
        </div>
        <button onClick={addData}>Lisää</button>

        <div id="scoreAdder">
          <h4>Lisää nimesi</h4>
          <input id="user" onChange={e => setUserName(e.target.value)} />
        </div>
        <button onClick={addScore}>Lisää</button>

        <div id="users">
          <h5>Käyttäjät</h5>
          {
            Array.isArray(users) && users.map((users) => {
              return(
                <p>{users.knimi} : {users.tulos}</p>
              )
            })
          }
        </div>

        <img src={logo} className="App-logo" alt="logo" />

        {
          question.length > 0 ? ( // Check if question data is available
            <div>
              <h2>{question[randomNum].kysymys}</h2>
              <h4>Scoresi on: {score}</h4>
              <p id="inputText">Kirjoita vastauksesi.</p>
              <input id="inputBox" onChange={e => setAnswer(e.target.value)} />
              <button onClick={checkAnswer}>Continue</button>
            </div>
          ) : (
            <p>Loading...</p> // Render a loading message while waiting for data
          )
        }
      </header>
    </div>
  );
}

export default App;
