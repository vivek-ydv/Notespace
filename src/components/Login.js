import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import alertContext from "../context/alerts/alertContext";
import loginimg from '../images/login.svg'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const Login = () => {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    // Get the showAlert function from alertContext
    const { showAlert } = useContext(alertContext);
    // State to hold email and password credentials
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    // Get the navigate function from react-router-dom
    let navigate = useNavigate();

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to update credentials state when inputs change
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    // Store the API endpoint in the host constant
    const host = process.env.REACT_APP_API_URL;

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a POST request to the login endpoint with email and password
        const response = await fetch(`${host}api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        if (json.success) {
            // If login is successful, save authToken to local storage and redirect to home page
            localStorage.setItem('token', json.authToken);
            navigate('/');
            // Show success alert
            showAlert('Welcome back! Successfully Loggedin :)', 'success')
        }
        else {
            // If login is unsuccessful, show warning alert
            showAlert('Inavalid Credentials! Please Login Using Correct Credentials.', 'warning');
        }
    }

    return (
        <div>
            <div className="container my-5">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img src={loginimg} alt="" className="img-fluid mb-3 d-none d-md-block" />
                    </div>
                    <div className="col-md-6 col-lg-5 ml-auto">
                        <h2 className="mb-4" style={{ color: "#9C27B0", fontWeight: "Bold" }}>Log in</h2>
                        <form onSubmit={handleSubmit}>

                            {/* Email input field */}
                            <div className="form-outline mb-4 material-textfield" >
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    placeholder=" "
                                    onChange={onChange}
                                    required
                                />
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                            </div>

                            {/* Password input field */}
                            <div className="form-outline mb-3 material-textfield">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder=" "
                                    onChange={onChange}
                                    required
                                    minLength={5}
                                />
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>

                                {/* Password toggle icon */}
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            </div>

                            {/* Login button */}
                            <div className="text-center mt-4 pt-2 ">
                                <button
                                    type="Submit"
                                    className="btn btn-primary btn-lg mb-3"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}

                                >
                                    Login
                                </button>

                                {/* Signup link */}
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className="link-danger">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login