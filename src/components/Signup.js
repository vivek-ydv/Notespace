import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import alertContext from "../context/alerts/alertContext";
import signupimg from '../images/signup.svg'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { showAlert } = useContext(alertContext);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    let navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            showAlert("Passwords do not match.", 'warning');
            return;
        }
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        if (json.success) {
            //save authtoken & redirect
            localStorage.setItem('token', json.authToken);
            navigate('/notes');
            showAlert(`Welcome ${credentials.name}! Successfully Created Your Account :)`, 'success')
        }
        else {
            showAlert(`${json.error}.`, 'warning');
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row py-5 mt-4 align-items-center ">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0 ">
                        <img src={signupimg} className="img-fluid mb-3 d-none d-md-block" alt="" />
                    </div>
                    <div className="col-md-6 col-lg-5">
                        <h2 className="mb-4" style={{ color: "#9C27B0", fontWeight: "Bold" }}>Create a new account</h2>
                        <form onSubmit={handleSubmit}>
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
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            </div>

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
                            <div className="text-center  mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg mb-3"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    SignUp
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already registerd ?{" "}
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