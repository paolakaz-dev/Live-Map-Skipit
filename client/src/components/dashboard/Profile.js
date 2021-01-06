import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


import PageTitle from '../layout/PageTitle';
import Container from '../layout/Container';
import Fav from '../layout/Fav';

import PageHeader from '../layout/PageHeader';
import {Burger} from '../layout/Burger';
import moment from "moment";


class Dashboard extends Component {


  render() {
    const { user } = this.props.auth;

    return (
    <div className="profilel">
      <Container>

            <PageTitle name="Planner" />
            <Burger />
            <PageHeader  />
          <div className="profile">
            <h4>
              <b>Welcome</b> {user.name.split(" ")[0]}
            </h4>
            <h5>Plan your <b>
            {moment().format("dddd")}</b> with us!</h5>
            <br />
            <Fav />
            
          </div>
          </Container>
    </div>

    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
