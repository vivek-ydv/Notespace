import { Link } from 'react-router-dom';
import homeimg from '../images/homepage.svg';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="container my-5 ">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <div className="px-2 py-2 align-middle">
                            <h1 className='display-2' style={{ fontWeight: "Bold" }}>Notespace</h1>
                            <h3>Your notebook on cloud - <span style={{ color: "#9C27B0", fontWeight: "Bold" }}>Safe</span> &  <span style={{ color: "#9C27B0", fontWeight: "Bold" }}>Secure </span>  </h3>
                            <p>
                                {" "}
                                An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbance.
                            </p>
                        </div>

                        {/* Show Login and SignUp buttons only if the user is not authenticated */}
                        {!localStorage.getItem('token') && <div className="px-2 py-2">
                            <Link className="btn btn-lg btn-outline-primary me-3 my-2" to="/login" role="button" >Login</Link>
                            <Link className="btn btn-lg btn-outline-primary" to="/signup" role="button" >SignUp For Free</Link>
                        </div>
                        }

                        {/* Show Create New Note button only if the user is authenticated */}
                        {localStorage.getItem('token') && <div className="px-2 py-2">
                            <Link className="btn btn-lg btn-outline-primary me-3 my-2" to="/notes" role="button" >Create New Note</Link>
                        </div>
                        }
                    </div>

                    <div className="col-md-6">
                        <img className="img-fluid " src={homeimg} alt='home' />
                    </div>
                </div>
            </div>

            {/* Notes Component */}
            {/* <Notes /> */}
        </>
    )
}

export default Home;
