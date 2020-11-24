import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";


import PageTitle from '../layout/PageTitle';
import Container from '../layout/Container';
import Button from '../layout/Button';


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>

        <PageTitle name="Dashboard" />
          <div>
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}

            </h4>
            <div className="live-map">
              <Link
                to="/map"
              >
                Live Map
              </Link>
            </div>
            <Button
              name="Logout"
              onClick={this.onLogoutClick}
            >
              Logout
            </Button>
          </div>
          </Container>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
