import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Result = () => {
    const location = useLocation()
    const score = location.state.result;
    console.log(sessionStorage)
    const userId = sessionStorage.getItem("userId")
    console.log(userId)
    
    useEffect(() => {
      console.log(score)
      console.log(userId)
      const fetching =  {
        method: 'POST',
        url: `http://localhost:5000/api/user/score?userId=${userId}`,
        data: {
          score
        }
      }
      axios(fetching)
      .then((result) => {
        console.log(result);
        })
      . catch ((error) => {
        console.log('Error Sending Score', error);
      }) 
      
    }, [score, userId])
        
    
    
    
    
    return (
        <>
            <div className="flex start-align result-body body">
                <div>
                    <h1 className="completed">Quiz completed <span>You scored...</span></h1>
                </div>
               <div>
                    <div className="score-container">
                        <h1 className="eight">{score}/20</h1>            
                    </div>
          
                    <Link to={'/subjects'} style={{ textDecoration: "none", color: "white" }}><button className="play-again"> Play Again</button></Link>
               </div>
            </div>
        </>
    )
}

export default Result;