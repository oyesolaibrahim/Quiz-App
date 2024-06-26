import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AdminSignUp = () => {
    let Navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, setSignup] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const configuration = {
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER}/api/admin/signup`,
            data: {
                firstName,
                lastName,
                email,
                password
            }
        };

        axios(configuration)
            .then((result) => {
                setLoading(false); // Stop loading
                console.log(result);
                setSignup(true);
                Navigate('/admin/login');
            })
            .catch((error) => {
                setLoading(false); // Stop loading
                console.log('Error during signup', error);
                setError(error.response?.data?.message || 'An error occurred');
            });
    };

    return (
        <>   
            <div className="form-body body">
                {loading && <p>Loading, please wait...</p>}
                {!signup && <h3 className="error">{error}</h3>}
                <div>
                    <h2 className="admin-signup center">Admin Signup</h2>
                    <p className="error"></p>
                </div>
                <div>
                    <div>
                        <button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
                    </div>
                    <div className="form-container">
                        <form onSubmit={(e) => handleSignup(e)}>
                            <label htmlFor="firstname"></label>
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <label htmlFor="lastname"></label>
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <label htmlFor="email"></label>
                            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password"></label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="SUBMIT" className="signup" onClick={(e) => { handleSignup(e) }}>Signup</button>
                            <h6>By clicking the button, you are agreeing to our <a href="#">Terms and Services</a></h6>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSignUp;
