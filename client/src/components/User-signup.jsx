import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const UserSignUp = () => {
    let Navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, setSignup] = useState(false);
    const [error, setError] = useState(null)
    
      const handleSignup = (e) => {
      e.preventDefault();
      
      const fetching =  {
        method: 'POST',
        url: 'http://localhost:5000/api/user/signup',
        data: {
          firstName,
          lastName,
          email,
          password
        }
      }
      axios(fetching)
      .then((result) => {
         console.log(result);
         setSignup(true);
         Navigate('/user/login')
        })
      . catch ((error) => {
        console.log('Error during signup', error);
        setError(error.response.data.message)
      }) 
    
 // Navigate('/user/login');
    }    
    
    return (
        <>   
        <body className="form-body">
        {signup ? (Navigate('/user/login')
         // <p className="text-success center">You Are Registered Successfully</p>
        ) : (
          <></>
        )}
            {!signup &&    <h3 className="error">{error}</h3>}
                <div>
                    <h2 className="admin-singup center">User Signup</h2>
                    <p class="error"></p>
                </div>
                <div>
                <div>
                    <button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
                </div>

                <div className="form-container">
                    <form onSubmit={(e)=>handleSignup(e)}>
                        <label htmlFor="firstname">
                        </label>
                        <input type="text" placeholder="First Name" value={firstName}  onChange={(e) => setFirstName(e.target.value)}/>

                        <label htmlFor="lastname">
                        </label>
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                        <label htmlFor="email">
                        </label>
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <label htmlFor="password">
                        </label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type="SUBMIT" className="signup" onClick={(e) => {handleSignup(e)}}>Signup</button> 

                <h6>By clicking the button, you are agreeing to our <a href="#">Terms and Services</a></h6>
            </form>
            </div>
        </div>
        </body>
        </>
    )
}

export default UserSignUp;