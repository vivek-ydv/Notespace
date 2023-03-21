import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        if (json.success) {
            //save authtoken & redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else {
            alert('Inavalid Credentials');
        }
    }


    return (
        <div>
            <div className="container my-5">
                <div className="row py-5 mt-4 align-items-center">
                    <div className="col-md-5 pr-lg-5 mb-5 mb-md-0 ">
                        <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                    </div>
                    <div className="col-md-6 col-lg-5 ml-auto">
                        <h2 className="mb-4" style={{ color: "#9C27B0", fontWeight: "Bold" }}>Log in</h2>
                        <form onSubmit={handleSubmit}>

                            {/* <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0" style={{ color: "#9C27B0" }}>Or</p>
                            </div> */}
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
                            <div className="form-outline mb-3 material-textfield">
                                <input
                                    type="password"
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
                            </div>

                            <div className="text-center mt-4 pt-2 ">
                                <button
                                    type="Submit"
                                    className="btn btn-primary btn-lg mb-3"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}

                                >
                                    Login
                                </button>
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