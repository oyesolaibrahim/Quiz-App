import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"

const New_Question = () => {
let [frontendQuestions, setFrontendQuestions] = useState([]);
let [backendQuestions, setBackendQuestions] = useState([]);
let [fullstackQuestions, setFullstackQuestions] = useState([]);
let [mobileQuestions, setMobileQuestions] = useState([]);
let [questionsToBeDisplayed, setQuestionsToBeDisplayed] = useState([]);
const location = useLocation();
let [subjectIndex, setSubjectIndex] = useState(0);
const [selectedOption, setSelectedOption] = useState("");
const [score, setScore] = useState(0);
let [questionIndex, setQuestionIndex] = useState(0);
let [optionIndex, setOptionIndex] = useState(0);
let [question, setQuestion] = useState("");
const [token, setToken] = useState(sessionStorage.getItem('token'));
const [adminToken, setAdminToken] = useState(sessionStorage.getItem('adminToken'));
const [login, setLogin] = useState(false);
const Navigate = useNavigate(); 


const {state} = location;

useEffect(() => {
       const fetching =  {
         method: 'GET',
         url : `http://localhost:5000/api/frontendquestions`
     }
     axios(fetching)
     .then((result) => {
         console.log(result);
         console.log(result.data.gottenQuestions)
         setFrontendQuestions(result.data.gottenQuestions)
         console.log(questionsToBeDisplayed)
        })
       . catch ((error) => {
         console.log('Error Fetching frontend questions', error);
       })
 }, [])

 useEffect(() => {
  const fetching =  {
    method: 'GET',
    url : `http://localhost:5000/api/fullstackquestions`
}
axios(fetching)
.then((result) => {
    console.log(result);
    console.log(result.data.gottenQuestions)
    setFullstackQuestions(result.data.gottenQuestions)
    console.log(questionsToBeDisplayed)
   })
  . catch ((error) => {
    console.log('Error Fetching frontend questions', error);
  })
}, [])
useEffect(() => {
       const fetching =  {
         method: 'GET',
         url : `http://localhost:5000/api/mobilequestions`
     }
     axios(fetching)
     .then((result) => {
         console.log(result);
         console.log(result.data.gottenQuestions)
         setMobileQuestions(result.data.gottenQuestions)
         console.log(questionsToBeDisplayed)
        })
       . catch ((error) => {
         console.log('Error Fetching frontend questions', error);
       })
 }, [])
 useEffect(() => {
        const fetching =  {
          method: 'GET',
          url : `http://localhost:5000/api/backendquestions`
      }
      axios(fetching)
      .then((result) => {
          console.log(result);
          console.log(result.data.gottenQuestions)
          setBackendQuestions(result.data.gottenQuestions)
          console.log(questionsToBeDisplayed)
         })
        . catch ((error) => {
          console.log('Error Fetching Backend questions', error);
        })
  }, [])

const optio = (e) => {
    const div = e.currentTarget;
    const buttons = document.querySelectorAll('.options');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    div.classList.add("selected");
    setSelectedOption(div.lastChild.innerHTML);
    console.log(selectedOption)
}
useEffect(() => {
   
  {state && state.suitableQuestion ? 
  (setQuestionsToBeDisplayed(frontendQuestions)) : 
  state && state.suitableQuestion2 ? 
  (setQuestionsToBeDisplayed(backendQuestions)) : 
  state && state.suitableQuestion3 ? 
  (setQuestionsToBeDisplayed(fullstackQuestions)) :
  state && state.suitableQuestion4 ? 
  (setQuestionsToBeDisplayed(mobileQuestions)) :
  (<></>)
};
console.log(questionsToBeDisplayed)
}, [frontendQuestions, backendQuestions, fullstackQuestions, mobileQuestions])
const submtAnswer = () => {
    setQuestionIndex(++questionIndex);
   // console.log(questionsToBeDisplayed[subjectIndex].correctAnswer)
    //console.log(selectedOption.indexOf())
    setSelectedOption("");
    selectedOption && selectedOption === questionsToBeDisplayed[subjectIndex].correctAnswer ?
    setScore((prevScores) => prevScores + 2) : setScore((presentScores) => presentScores + 0);
    {(questionIndex === questionsToBeDisplayed.length) && (Navigate('/result', {state: {result: score}}))};
    
    const buttons = document.querySelectorAll('.options');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

} 
const Logout = () => {
    token ? (setToken(null) && localStorage.removeItem('token') && Navigate("user/login")) : 
    (setAdminToken(null) && localStorage.removeItem("adminToken") && Navigate("admin/login")) ;
    setLogin(false)
  };

//console.log(selectedOption)
//console.log(score)
return (
        <>
       {token || adminToken ? ( 
     <div className="body">
      {token || adminToken ? (
        <div className="flex welcome-div">
          <Link to={"/newsubjects"} style={{ textDecoration: "none", color: "white" }} className="header-login left"><i class="fa fa-angle-double-left" aria-hidden="true"></i>
            Back</Link>
          <Link style={{ textDecoration: "none", color: "white" }} className="header-login right" onClick={Logout}>Logout</Link>
        </div>
      ) : (
        Navigate("/user/login")
      )}
      <div className="flex question">
        
      <div>
          <p className="italic">Question {questionIndex+1} of {questionsToBeDisplayed ? questionsToBeDisplayed.length : ""} </p>
          <h2>{questionsToBeDisplayed ? questionsToBeDisplayed[subjectIndex]?.question : ""}
          </h2> 
    
      </div>

      <div id="option-container">
          <div className="flex start options" onClick={optio}>
              <h6>A</h6>
              <p>{questionsToBeDisplayed ? questionsToBeDisplayed[subjectIndex]?.options[optionIndex] : ""}</p>
          </div>
          <div className="flex start options" onClick={optio}>
              <h6>B</h6>
              <p>{questionsToBeDisplayed ? questionsToBeDisplayed[subjectIndex]?.options[optionIndex+1] : ""}</p>
          </div>
          <div className="flex start options" onClick={optio}>
              <h6>C</h6>
              <p>{questionsToBeDisplayed ? questionsToBeDisplayed[subjectIndex]?.options[optionIndex+2] : ""}</p>
          </div>
      <div className="flex start options" onClick={optio}>
             <h6>D</h6>
              <p>{questionsToBeDisplayed ? questionsToBeDisplayed[subjectIndex]?.options[optionIndex+3] : ""}</p>
          </div>
          <button onClick={submtAnswer} disabled={!selectedOption}>Submit Answer</button>
      </div>
      </div>
    </div>
            ) : (
        <h3 className="error">You have to be logged in before you can view this page, click <Link to={"/user/login"} style={{color: "white" }}> here </Link> to log in </h3>
            )}
       </>
           )
}

export default New_Question;