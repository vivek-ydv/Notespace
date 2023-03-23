import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import alertContext from "../context/alerts/alertContext";
import signupimg from '../images/signup.svg'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';


const Signup = () => {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    // Accessing showAlert function from the Alert context
    const { showAlert } = useContext(alertContext);
    // State to hold user input credentials
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    // Navigate to other pages after successful registration
    let navigate = useNavigate();

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to update the credentials state object with user inputs
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if password and confirm password fields match
        if (credentials.password !== credentials.confirmPassword) {
            showAlert("Passwords do not match.", 'warning');
            return;
        }
        // Store the API endpoint in the host constant
        const host = process.env.REACT_APP_API_URL;

        // Make API call to register the user
        const response = await fetch(`${host}api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        // If registration is successful, save auth token to local storage and redirect to notes page
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/notes');
            showAlert(`Welcome ${credentials.name}! Successfully Created Your Account :)`, 'success')
        }
        // If registration fails, display the error message
        else {
            showAlert(`${json.error}.`, 'warning');
        }
    }
    return (
        <div>
            <div className="container">
                {/* Signup form */}
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                        <img
                            src={signupimg}
                            className="img-fluid mb-3 d-none d-md-block"
                            alt=""
                        />
                    </div>

                    {/* Signup form fields */}
                    <div className="col-md-6 col-lg-5">
                        <h2
                            className="mb-4"
                            style={{ color: "#9C27B0", fontWeight: "Bold" }}
                        >
                            Create a new account
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Name input field */}
                            <div className="form-outline mb-4 material-textfield">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control form-control-lg"
                                    placeholder=" "
                                    onChange={onChange}
                                    required
                                />
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                            </div>

                            {/* Email input field */}
                            <div className="form-outline mb-4 material-textfield">
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
                                    type={showPassword ? "text" : "password"}
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
                                {/* Password visibility toggle button */}
                                <span
                                    className="password-toggle-icon"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            </div>

                            {/* Confirm Password input field */}
                            <div className="form-outline mb-3 material-textfield">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control form-control-lg"
                                    placeholder=" "
                                    onChange={onChange}
                                    required
                                    minLength={5}
                                />
                                <label className="form-label" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                            </div>

                            {/* Signup button and Login link */}
                            <div className="text-center mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg mb-3"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    SignUp
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already registered?{" "}
                                    <Link to="/login" className="link-danger">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup