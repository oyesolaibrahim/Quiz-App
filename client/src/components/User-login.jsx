import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const UserLogin = () => {
    let Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);
        
    
      const handleLogin = (e) => {
        e.preventDefault();
      
      const fetching =  {
        method: 'POST',
        url: 'http://localhost:5000/api/user/login',
        data: {
          email,
          password
        }
      }
      axios(fetching)
      .then((result) => {
        const token = result.data.token;
        const user = result.data.user.firstName;
         console.log(result);
         console.log(user);
         localStorage.setItem('token', token);
         setLogin(true);
         Navigate("/subjects", {state: {user}});

        })
      . catch ((error) => {
        console.log('Error logging in', error.response.data.message);
        setError(error.response.data.message)
      }) 
      }
    return (
<> 
         <body className="login-form">
         
       {!login &&    <h3 className="error">{error}</h3>}
            <div>
                <h2 className="admin-singup">User Login</h2>
                <p class="error"></p>
            </div>
        <div>
		    <div>
		    	<button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
		    </div>
        
		    <div className="form-container">
		    	<form action="" onSubmit={(e)=>handleLogin(e)}>
                    <label htmlFor="email">
                    </label>
		    		<input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    
                    <label htmlFor="password">
                    </label>
		    		<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
		    		<button type="SUBMIT" className="signup" onClick={(e) => {handleLogin(e)}}>Login</button> 

		    	</form>
		    </div>
	    </div>
        </body>
    </>
    )
}

export default UserLogin;