import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AdminLogin = () => {
    
    
    let Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);
        
    
      const Login = (e) => {
        e.preventDefault();
      
      const fetching =  {
        method: 'POST',
        url: 'http://localhost:5000/api/admin/login',
        data: {
          email,
          password
        }
      }
      axios(fetching)
      .then((result) => {
        const adminToken = result.data.token;
        const admin = result.data.admin.firstName;
        console.log(result.data.admin.firstName);
         console.log(result);
         sessionStorage.setItem('adminToken', adminToken);
         sessionStorage.setItem('admin', admin);
         setLogin(true);
         sessionStorage.removeItem("token")
         Navigate("/subjects");
        })
      . catch ((error) => {
        console.log('Error logging in', error);
        setError(error.response.data.message)
      }) 
      }
    return (
<> 
        <div className="login-form body">
         
       {!login &&    <h3 className="error">{error}</h3>}
            <div>
                <h2 className="admin-singup">Admin Login</h2>
            </div>
        <div>
		    <div>
		    	<button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
		    </div>
        
		    <div className="form-container">
		    	<form action="" onSubmit={(e)=>Login(e)}>
                    <label htmlFor="email">
                    </label>
		    		        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    
                    <label htmlFor="password">
                    </label>
		    		          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
		    		          <button type="SUBMIT" className="signup" onClick={(e) => {Login(e)}}>Login</button> 
		    	</form>
		    </div>
	    </div>
      </div>
    </>
    )
}

export default AdminLogin;