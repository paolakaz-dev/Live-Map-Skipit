import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import styled from 'styled-components';
import { Link } from "react-router-dom";



const UL = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  flex-flow: column nowrap;
  position: fixed;
  background: #0038F5;
  height: 50vh;
  border-radius: 50px;
  right: 30px;
  width: 93%;
  padding-top: 8rem;
  transform: ${({open})=> open ? 'translateY(0)' : 'translateY(-200%)' };
  z-index: 11;
  transition: transform 0.3s ease-in-out;
li {
 
  padding: 18px 10px ;
  color: white;
  text-align: center;
  font-size: 2rem;
}
`

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    const { open } = this.props;
    // const { user } = this.props.auth;
    return (

        <UL open={open}>
         
          <li>
          <Link
                to="/map"
              >
                Live Map
              </Link>
          </li>
          <li>
          <Link
                to="/profile"
              >
                Planner
              </Link>
          </li>
        
         <li onClick={this.onLogoutClick}>Logout</li>
        </UL>

    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

// export const Navbar = ({open}) => {

//   return (
//     <UL open={open}>
//     <li>Profile</li>
//     <li>Logout</li>
//   </UL>
//   )
// }