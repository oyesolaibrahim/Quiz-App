import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Subjects = () => {
    let location = useLocation();    
    const {state} = location
    let Navigate = useNavigate();
    let [subjectIndex, setSubjectIndex] = useState(0);
    let [data, setData] = useState(null);
    //const [email, setEmail] = useState(state.email);
    //const [password, setPassword] = useState(state.password);
    //const [error, setError] = useState(null);
    //const [token, setToken] = useState(localStorage.removeItem('token'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [login, setLogin] = useState(true);
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [admin, setAdmin] = useState(localStorage.getItem('admin'));
            
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
        //token && (localStorage.getItem('login'))
    }, [])
    console.log(login)
    
    let mathematics = data ? data[subjectIndex].subject : "";
    let UOE = data ? data[subjectIndex+1].subject : "";
    let PHY = data ? data[subjectIndex+2].subject : "";
    let CHM = data ? data[subjectIndex+3].subject : "";
    console.log(mathematics)
    console.log(UOE);
    console.log(PHY);

    const logout = () => {
    localStorage.removeItem('token');
    Navigate("user/login")    
    setToken(null);
    setUser(null);
    setLogin(false)
  };
  console.log(localStorage);
        //setSubjectIndex(++subjectIndex);
        //setQuestion(subjectIndex)
        //console.log(setQuestion);
    const goToSuitableQuestion = (e) => {
        const div = e.currentTarget;
        console.log(div.id);
        console.log(div.lastChild.innerHTML);

        div.id === mathematics ? 
        (Navigate('/question', { state: { suitableQuestion: true }}))
        : div.id === UOE ? 
        (Navigate('/question', { state: { suitableQuestion2: true }}))
        : div.id === PHY ? 
        (Navigate('/question', { state: { suitableQuestion3: true }}))
        : div.id === CHM ? 
        (Navigate('/question', { state: { suitableQuestion4: true }}))
        : (console.log("condition is not met"));
    }
     return (
     
     <>    
        {token  ? ( 
        <div className="body">  
        <div className="flex welcome-div">
          <h4 className="left">Welcome <span style={{fontStyle: "italic"}}>{user || admin }</span>! You are logged in.</h4>
          <Link style={{ textDecoration: "none", color: "white" }} className="header-login right" onClick={logout}>Logout</Link>
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
            </div>
      ) : (
        <h3 className="error">You have to be logged in before you can view this page, click <Link to={"/user/login"} style={{color: "white" }}> here </Link> to log in </h3>
)}
        </>
      )
}

export default Subjects;