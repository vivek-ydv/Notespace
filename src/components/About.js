import React from 'react'
import awsm from '../images/about - awesome.svg'
import { Link } from "react-router-dom";

function About() {
    return (
        <div>
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="display-4 mb-4">Empowering <span style={{ color: "#9C27B0" }} >Students</span> </h1>
                        <p>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee</p>
                        <h2 className="mb-3 my-3" style={{ fontWeight: "Bold" }}>Make something <span style={{ color: "#9C27B0" }}>Awesome</span> </h2>
                        <p>Notespace is made from the pain of writing all the things in notebook which is very hectic :(, So we made an online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee.
                            you can also access your notes anywhere in your world, at anytime time . So dont forget to Create note because creating anything is always important
                        </p>

                    </div>
                    <div className="col-md-6 my-4">
                        <img className="img-fluid awesome" src={awsm} alt="about-awesome" />
                    </div>
                </div>
            </div>

            <footer>
                <div className="content">
                    <div className="top">
                        <div className="logo-details">
                            <span className="logo_name"><span style={{ color: "#9C27B0" }}>Notespace</span></span>
                        </div>
                        <div className="media-icons">
                            <Link to="/"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="/"><i className="fab fa-twitter"></i></Link>
                            <Link to="/"><i className="fab fa-instagram"></i></Link>
                            <Link to="/"><i className="fab fa-linkedin-in"></i></Link>
                            <Link to="/"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div className="link-boxes">
                        <ul className="box">
                            <li className="link_name">Company</li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new">New Notes</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/signup">Get started</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Services</li>
                            <li><Link to="/notes">Your Notes</Link></li>
                            <li><Link to="/new">New Note</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Account</li>
                            <li><Link to="/awsm">Sign-in</Link></li>
                            <li><Link to="/register">Join Free</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Top Categories</li>
                            <li><Link to="/notes">Tent Notes</Link></li>
                            <li><Link to="/notes">RV and Van Notes</Link></li>
                            <li><Link to="/notes">Canoe Notes</Link></li>
                            <li><Link to="/notes">Survivalist Notes</Link></li>
                        </ul>
                        <ul className="box input-box">
                            <li className="link_name">About Notespace</li>
                            <li style={{ color: "#F7FFFF" }}>
                                An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbance
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-details">
                    <div className="bottom_text">
                        <span className="copyright_text">Copyright © 2023 <Link to="/">Notespace</Link>All rights reserved</span>
                        <span className="policy_terms">
                            <Link to="/">Privacy policy</Link>
                            <Link to="/">Terms & condition</Link>
                        </span>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default About