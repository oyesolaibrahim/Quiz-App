import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Result = () => {

    const location = useLocation()
    const score = location.state.result;
    return (
        <>
                <body className="flex start-align result-body">
                <div>
                    <h1 className="completed">Quiz completed <span>You scored...</span></h1>
                </div>
               <div>
                    <div className="score-container">
                        <h1 className="eight">{score}/20</h1>            
                    </div>
          
                    <Link to={'/subjects'} style={{ textDecoration: "none", color: "white" }}><button className="play-again"> Play Again</button></Link>
               </div>
            </body>
        </>
    )
}

export default Result;