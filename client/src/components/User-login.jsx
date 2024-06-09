import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const UserLogin = () => {
    let Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const Login = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const fetching = {
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER}/api/user/login`,
            data: {
                email,
                password
            }
        }
        
        axios(fetching)
            .then((result) => {
                setLoading(false); // Stop loading
                const userToken = result.data.token;
                const user = result.data.user.firstName;
                const email = result.data.user.email;
                const password = result.data.user.password;
                const userId = result.data.user._id;
                console.log(userId);
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('token', userToken);
                sessionStorage.setItem('user', user);
                sessionStorage.setItem('login', true);
                console.log(sessionStorage);
                setLogin(true);
                console.log(login);
                Navigate("/subjects");
                sessionStorage.removeItem("adminToken");
            })
            .catch((error) => {
                setLoading(false); // Stop loading
                console.log('Error logging in', error.response?.data?.message || error.message);
                setError(error.response?.data?.message || 'An error occurred');
            });
    }

    return (
        <> 
            <div className="login-form body">
                {loading && <p>Loading, please wait...</p>}
                {!login && error && <h3 className="error">{error}</h3>}
                <div className="form-header">
                    <p className="error"></p>
                </div>
                <div>
                    <div>
                        <button id="try-it-free"><strong>Try it free 7 days</strong> then $20/mo. thereafter</button>
                    </div>
                    <div className="form-container">
                        <form action="" onSubmit={(e) => Login(e)}>
                            <label htmlFor="email"></label>
                            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password"></label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="SUBMIT" className="signup" onClick={(e) => {Login(e)}}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLogin;
