import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav >
          <div >
            {/* <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              SKIPIT
            </Link> */}
            <Link
              to="/map"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              Map
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
