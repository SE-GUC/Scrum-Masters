import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="dark-overlay home-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4"> Sumerge </h1>
                <p className="lead">
                  A unified platform that assembles all the entity’s services in
                  one place, to facilitate a better user experience to the
                  citizens
                </p>
                <hr />
              <Link to='/register' className='btn btn-lg btn-info mr-2'>
                Sign up
              </Link>
              <Link to='/login' className='btn btn-lg btn-light'>
                Login
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
