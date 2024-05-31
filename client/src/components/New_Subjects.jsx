import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const New_Subjects = () => {
    let location = useLocation();    
    const {state} = location
    let Navigate = useNavigate();
    let [subjectIndex, setSubjectIndex] = useState(0);
    let [data, setData] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [adminToken, setAdminToken] = useState(sessionStorage.getItem('adminToken'));
    const [login, setLogin] = useState(true);
    const [user, setUser] = useState(sessionStorage.getItem('user'));
    const [admin, setAdmin] = useState(sessionStorage.getItem('admin'));
    console.log(admin)
    
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
    

    const logout = () => {
    token ? (setToken(null) && setUser(null) && sessionStorage.removeItem('token') && Navigate("user/login")) : 
    (setAdminToken(null) && setAdmin(null) && sessionStorage.removeItem("adminToken") && Navigate("admin/login")) ;
    setLogin(false)
  };
  console.log(sessionStorage);
    const goToSuitableQuestion = (e) => {
        const div = e.currentTarget;
        console.log(div.id);
        console.log(div.lastChild.innerHTML);

        div.id === "frontend" ? 
        (Navigate('/newquestions', { state: { suitableQuestion: true }}))
        : div.id === "backend" ? 
        (Navigate('/newquestions', { state: { suitableQuestion2: true }}))
        : div.id === "fullstack" ? 
        (Navigate('/newquestions', { state: { suitableQuestion3: true }}))
        : div.id === "mobile" ? 
        (Navigate('/newquestions', { state: { suitableQuestion4: true }}))
        : (console.log("condition is not met"));
    }
    
     return (
     
     <>    
        {token || adminToken  ? ( 
        <div className="body">  
        <div className="flex welcome-div">
          <h4 className="left">These are Web Development Related Questions <span style={{fontStyle: "italic"}}>{token ? user : admin }</span>.</h4>
          <Link style={{ textDecoration: "none", color: "white" }} className="header-login right" onClick={logout}>Logout</Link>
        </div>
            
            <div className="flex start-align">
                
                <div>
                    <p className="italic">Pick a subject to get started</p>
                </div>
                <div>
                    <div className="flex start options" id="frontend" onClick={goToSuitableQuestion}>
                        <h6>FRD</h6>
                        <h3 onClick={goToSuitableQuestion}>Frontend Development</h3>
                    </div>
                    <div className="flex start options" id="backend" onClick={goToSuitableQuestion}>
                        <h6>BCD</h6>
                        <h3>Backend Development</h3>
                    </div>
                    <div className="flex start options" id="fullstack" onClick={goToSuitableQuestion}>
                        <h6>FSD</h6>
                       <h3>Fullstack Development</h3>
                     </div>
                    <div className="flex start options" id="mobile" onClick={goToSuitableQuestion}>
                        <h6>MAP</h6>
                        <h3>Mobile App Development</h3>
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
export default New_Subjects;