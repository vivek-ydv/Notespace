import Notes from './Notes'

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="container my-5 ">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <div className="px-2 py-2 align-middle">
                            <h1 style={{ fontWeight: "Bold" }}>Notespace</h1>
                            <h3>Your notebook on cloud - <span style={{ color: "#9C27B0", fontWeight: "Bold" }}>Safe</span> &  <span style={{ color: "#9C27B0", fontWeight: "Bold" }}>Secure </span>  </h3>
                            <p>
                                {" "}
                                An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbance.
                            </p>
                        </div>
                        <div className="px-2 py-2">
                            <button type="button" className="btn btn-outline-primary me-3 my-2">
                                Login
                            </button>
                            <button type="button" className="btn btn-outline-primary ">
                                SignUp
                            </button>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid awesome"
                            src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611"
                            alt="about-awesome" />
                    </div>
                </div>
            </div>

            {/* Notes Component */}
            <Notes />
        </>

    )
}
export default Home;