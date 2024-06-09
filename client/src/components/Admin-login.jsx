import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AdminLogin = () => {
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
            url: `${process.env.REACT_APP_SERVER}/api/admin/login`,
            data: {
                email,
                password
            }
        };

        axios(fetching)
            .then((result) => {
                setLoading(false); // Stop loading
                const adminToken = result.data.token;
                const admin = result.data.admin.firstName;
                console.log(result.data.admin.firstName);
                console.log(result);
                sessionStorage.setItem('adminToken', adminToken);
                sessionStorage.setItem('admin', admin);
                setLogin(true);
                sessionStorage.removeItem("token");
                Navigate("/subjects");
            })
            .catch((error) => {
                setLoading(false); // Stop loading
                console.log('Error logging in', error);
                setError(error.response?.data?.message || 'An error occurred');
            });
    };

    return (
        <> 
            <div className="login-form body">
                {loading && <p>Loading, please wait...</p>}
                {!login && <h3 className="error">{error}</h3>}
                <div>
                    <h2 className="admin-signup">Admin Login</h2>
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
                            <button type="SUBMIT" className="signup" onClick={(e) => { Login(e) }}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
