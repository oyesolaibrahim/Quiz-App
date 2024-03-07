import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Subjects = () => {
    let location = useLocation();    
    const {state} = location
    let Navigate = useNavigate();
    let [subjectIndex, setSubjectIndex] = useState(0);
    let [data, setData] = useState(null);
    let [login, setLogin] = useState(false);
    let [user, setUser] = useState("");
    //const [email, setEmail] = useState(state.email);
    //const [password, setPassword] = useState(state.password);
    //const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));


    useEffect(() => {
        fetch("http://localhost:5000/api/quizData")
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
        
        //setUser(state.user);
        !login && setLogin(true)
    }, [])
        
    let mathematics = data ? data[subjectIndex].subject : "";
    let UOE = data ? data[subjectIndex+1].subject : "";
    let PHY = data ? data[subjectIndex+2].subject : "";
    let CHM = data ? data[subjectIndex+3].subject : "";
    console.log(mathematics)
    console.log(UOE);
    console.log(PHY);

    const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate("user/login")    
    setLogin(false)
    setToken(null);
  };
        //setSubjectIndex(++subjectIndex);
        //setQuestion(subjectIndex)
        //console.log(setQuestion);
    const goToSuitableQuestion = (e) => {
        console.log(e.target.id);
        console.log(e.target.lastChild.innerHTML);

        e.target.id === mathematics 
        ? (Navigate('/question', { state: { suitableQuestion: true }})): e.target.id === UOE
        ? (Navigate('/question', { state: { suitableQuestion2: true }})): e.target.id === PHY
        ? (Navigate('/question', { state: { suitableQuestion3: true }})): e.target.id === CHM
        ? (Navigate('/question', { state: { suitableQuestion4: true }}))
        : (console.log("condition is not met"));
    }
     return (
     
     <>    
        {token ? ( 
            <body className="">  
        <div className="flex welcome-div">
          <h4 className="left">Welcome {user}! You are logged in.</h4>
          <Link style={{ textDecoration: "none", color: "white" }} className="header-login right" onClick={handleLogout}>Logout</Link>
        </div>
            
            <div className="flex start-align">
                
            <div>
                    <h1>Welcome to <span>My Quiz!</span></h1>
                    <p className="italic">Pick a subject to get started</p>
                </div>
                <div>
                    <div className="flex start options2" id="Use of English" onClick={goToSuitableQuestion}>
                        <h6>UOE</h6>
                        <h3 onClick={goToSuitableQuestion}>Use of English</h3>
                    </div>
                    <div className="flex start options2" id="Mathematics" onClick={goToSuitableQuestion}>
                        <h6>MTH</h6>
                        <h3>Mathematics</h3>
                    </div>
                    <div className="flex start options2" id="Physics" onClick={goToSuitableQuestion}>
                        <h6>PHY</h6>
                       <h3>Physics</h3>
                     </div>
                    <div className="flex start options2" id="Chemistry" onClick={goToSuitableQuestion}>
                        <h6>CHM</h6>
                        <h3>Chemistry</h3>
                    </div>
                </div>
            </div>
            </body>
      ) : (
        <h3 className="error">You have to be logged in before you can view this page, click <Link to={"/user/login"} style={{color: "white" }}> here </Link> to log in </h3>
)}
        </>
      )
}

export default Subjects;