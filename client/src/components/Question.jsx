import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Question = () => {
let [data, setData] = useState(null);
const location = useLocation();
let [subjectIndex, setSubjectIndex] = useState(0);
const [selectedOption, setSelectedOption] = useState("");
const [score, setScore] = useState(0);
let [questionIndex, setQuestionIndex] = useState(0);
let [optionIndex, setOptionIndex] = useState(0);
let [question, setQuestion] = useState(null);
const [token, setToken] = useState(sessionStorage.getItem('token'));
const [adminToken, setAdminToken] = useState(sessionStorage.getItem('adminToken'));
const [login, setLogin] = useState(false);
const Navigate = useNavigate(); 
//let user = location.state.user;
//console.log(user)


const optio = (e) => {
    const div = e.currentTarget;
    const buttons = document.querySelectorAll('.options');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    div.classList.add("selected");
    setSelectedOption(div.lastChild.innerHTML);

}

const submtAnswer = () => {
    setQuestionIndex(++questionIndex);
    console.log(data[subjectIndex].questions[questionIndex-1].correctAnswer)
    setSelectedOption("");
    selectedOption && selectedOption === data[subjectIndex].questions[questionIndex-1].correctAnswer ?
    setScore((prevScores) => prevScores + 2) : setScore((presentScores) => presentScores + 0);
    {questionIndex === data[subjectIndex].questions.length && (Navigate('/result', {state: {result: score}}))};
    
    const buttons = document.querySelectorAll('.options');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

}  
useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/api/quizData`)
    .then (res => {
        return res.json();
    })
    .then(dataQuiz => {
        console.log(dataQuiz);
        setData(dataQuiz);
    })
    .catch((err) => {
    console.log(err);
    })

    const {state} = location;
   
    {state && state.suitableQuestion ? 
    (setSubjectIndex(subjectIndex)) : 
    state && state.suitableQuestion2 ? 
    (setSubjectIndex(subjectIndex+1)) : 
    state && state.suitableQuestion3 ? 
    (setSubjectIndex(subjectIndex+2)) :
    state && state.suitableQuestion4 ? 
    (setSubjectIndex(subjectIndex+3)) :
    (<></>)
};

login && setToken(localStorage.getItem('token'));
//!login && setLogin(true)
}, [])

const Logout = () => {
    token ? (setToken(null) && localStorage.removeItem('token') && Navigate("user/login")) : 
    (setAdminToken(null) && localStorage.removeItem("adminToken") && Navigate("admin/login")) ;
    setLogin(false)
  };

console.log(selectedOption)
console.log(score)
return (
        <>
       {/* {token || adminToken ? (  */}
     <div className="body">
      {/* {token || adminToken ? ( */}
        <div className="flex welcome-div">
          <Link to={"/subjects"} style={{ textDecoration: "none", color: "white" }} className="header-login left"><i class="fa fa-angle-double-left" aria-hidden="true"></i>
            Back</Link>
          <Link style={{ textDecoration: "none", color: "white" }} className="header-login right" onClick={Logout}>Logout</Link>
        </div>
      {/* ) : ( */}
        Navigate("/user/login")
      {/* )} */}
      <div className="flex question">
        
      <div>
          <p className="italic">Question {questionIndex+1} of {data ? data[subjectIndex].questions.length : ""} </p>
          <h2>{data ? data[subjectIndex].questions[questionIndex].question : ""}
          </h2> 

      </div>

      <div id="option-container">
          <div className="flex start options" onClick={optio}>
              <h6>A</h6>
              <p>{data ? data[subjectIndex].questions[questionIndex].options[optionIndex] : ""}</p>
          </div>
          <div className="flex start options" onClick={optio}>
              <h6>B</h6>
              <p>{data ? data[subjectIndex].questions[questionIndex].options[optionIndex+1] : ""}</p>
          </div>
          <div className="flex start options" onClick={optio}>
              <h6>C</h6>
              <p>{data ? data[subjectIndex].questions[questionIndex].options[optionIndex+2] : ""}</p>
          </div>
          <div className="flex start options" onClick={optio}>
             <h6>D</h6>
              <p>{data ? data[subjectIndex].questions[questionIndex].options[optionIndex+3] : ""}</p>
          </div>
          <button onClick={submtAnswer} disabled={!selectedOption}>Submit Answer</button>
      </div>
      </div>
    </div>
            {/* ) : ( */}
        <h3 className="error">You have to be logged in before you can view this page, click <Link to={"/user/login"} style={{color: "white" }}> here </Link> to log in </h3>
            {/* )} */}
        </>
    )
}

export default Question;