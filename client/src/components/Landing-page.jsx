import { Link } from "react-router-dom";
import image from "../images/image-hero-desktop.png"

const LandingPage = () => {
    return (
        <>
        <header>
            <ul className="flex flex-end">
                <li><Link className="header-login" to={'/user/login'}>Login</Link></li>
                <li><Link className="header-signup" to={'/user/signup'}>Signup</Link></li>
            </ul>
        </header>
        <body className="flex landing-page">
            <div>
                <h1>Welcome to the Quiz App</h1>
                <h2>Challenge yourself with a wide range of quizzes on various subjects.
                Are you prepared to put your knowledge to the test ?</h2>
                <p className="italic">Test your knowledge and have fun!</p>
                
                <Link style={{ textDecoration: "none", color: "white" }} className="header-login" to={'/user/login'}>Login</Link>
            </div>

            <div>  
                <img src={image} alt="man"></img>        
            </div>
        </body>
        </>
    )
}

export default LandingPage;