import React, { Component } from "react";
import { Link } from "react-router-dom";

import PageHeader from './PageHeader';
import PageTitle from './PageTitle';
import Container from './Container';

class Landing extends Component {
  render() {
    return (
      <Container>
      <PageTitle name="Skipit" />
      <PageHeader name="Join the Skippers community" />
            <div className="landing">
              <Link
                to="/register"
                
              >
                Register
              </Link>
            </div>
            <div className="landing">
              <Link
                to="/login"
            
              >
                Log In
              </Link>
            </div>
         
      </Container>

    );
  }
}

export default Landing;
