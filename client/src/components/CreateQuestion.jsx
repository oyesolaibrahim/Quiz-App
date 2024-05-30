import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CreateQuestion = () => {
    
  let Navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false);
    const createQuestion = (e) => {
    e.preventDefault();
    
    const configuration =  {
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER}/api/question`,
      data: {
        subject,
        question,
        options,
        correctAnswer
      }
    }
    axios(configuration)
    .then((result) => {
       console.log(result);
       setLogin(true);
       Navigate('/newsubjects');
      })
    .catch ((error) => {
      console.log('Error during creation', error.response.data.message);
      setError(error.response.data.message)
    }) 
  
  }    
  
  const optionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value; 
    setOptions(newOptions); 
    };
  return (
      <>   
      {adminToken ? (
      <div className="create-question body">
           <h3 className="error">{error}</h3>
      <div>
              <div>
                  <button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
              </div>

              <div className="form-container create-question-form">
                  <form onSubmit={(e)=>createQuestion(e)}>
                      <label htmlFor="subject">
                      </label>
                      <input type="text" placeholder="Subject" value={subject}  onChange={(e) => setSubject(e.target.value)}/>

                      <label htmlFor="question">
                      </label>
                      <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)}/>

                      {options.map((option, index) => (
                           <div key={index}>
                                <label htmlFor={"option" + (index + 1)}></label>
                                <input type="text" placeholder={"Option " + (index + 1)} value={option} onChange={(e) => optionChange(index, e.target.value)} />
                            </div>
                          ))}

                      <label htmlFor="correctAnswer">
                      </label>
                      <input type="text" placeholder="correctAnswer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}/>

                      <button type="SUBMIT" className="signup" onClick={(e) => {createQuestion(e)}}>Create</button> 

          </form>
          </div>
      </div>
      </div>
      ) : (
        <h3 className="error">You have to be logged in before you can view this page, click <Link to={"/admin/login"} style={{color: "white" }}> here </Link> to log in </h3>
)}
      </>
  )
}

export default CreateQuestion;