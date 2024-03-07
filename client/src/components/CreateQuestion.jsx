import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CreateQuestion = () => {
    
  let Navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [error, setError] = useState(null);
  
    const createQuestion = (e) => {
    e.preventDefault();
    
    const configuration =  {
      method: 'POST',
      url: 'http://localhost:5000/api/question',
      data: {
        subject,
        question,
        option1,
        option2,
        option3,
        option4
      }
    }
    axios(configuration)
    .then((result) => {
       console.log(result);
       //Navigate('/subjects');
      })
    .catch ((error) => {
      console.log('Error during creation', error.response.data.message);
      setError(error.response.data.message)
    }) 
  
  }    
  
  return (
      <>   
      <body className="create-question">
           <h3 className="error">{error}</h3>
              <div>
                  <h2 className="admin-singup center">Create Question</h2>
              </div>
      <div>
              <div>
                  <button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
              </div>

              <div className="form-container">
                  <form onSubmit={(e)=>createQuestion(e)}>
                      <label htmlFor="subject">
                      </label>
                      <input type="text" placeholder="Subject" value={subject}  onChange={(e) => setSubject(e.target.value)}/>

                      <label htmlFor="question">
                      </label>
                      <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)}/>

                      <label htmlFor="optionA">
                      </label>
                      <input type="text" placeholder="option A" value={option1} onChange={(e) => setOption1(e.target.value)}/>

                      <label htmlFor="optionB">
                      </label>
                      <input type="text" placeholder="option B" value={option2} onChange={(e) => setOption2(e.target.value)}/>

                      <label htmlFor="optionC">
                      </label>
                      <input type="text" placeholder="option C" value={option3} onChange={(e) => setOption3(e.target.value)}/>

                      <label htmlFor="optionD">
                      </label>
                      <input type="text" placeholder="option D" value={option4} onChange={(e) => setOption4(e.target.value)}/>

                      <button type="SUBMIT" className="signup" onClick={(e) => {createQuestion(e)}}>Create</button> 

          </form>
          </div>
      </div>
      </body>
      </>
  )
}

export default CreateQuestion;