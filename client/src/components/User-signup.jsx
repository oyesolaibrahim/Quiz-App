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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const Signup = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const fetching = {
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER}/api/user/signup`,
            data: {
                firstName,
                lastName,
                email,
                password
            }
        };

        axios(fetching)
            .then((result) => {
                setLoading(false); // Stop loading
                console.log(result);
                setSignup(true);
                Navigate('/user/login');
            })
            .catch((error) => {
                setLoading(false); // Stop loading
                console.log('Error during signup', error);
                setError(error.response?.data?.message || 'An error occurred');
            });
    };

    return (
        <>   
            <div className="form-body">
                {loading && <p>Loading, please wait...</p>}
                {!signup && <h3 className="error">{error}</h3>}
                <div></div>
                <div>
                    <div>
                        <button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
                    </div>
                    <div className="form-container">
                        <form onSubmit={(e) => Signup(e)}>
                            <label htmlFor="firstname"></label>
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <label htmlFor="lastname"></label>
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <label htmlFor="email"></label>
                            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password"></label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="SUBMIT" className="signup" onClick={(e) => { Signup(e) }}>Signup</button>
                            <h6>By clicking the button, you are agreeing to our <a href="#">Terms and Services</a></h6>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSignUp;
