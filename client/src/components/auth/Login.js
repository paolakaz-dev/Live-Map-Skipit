import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import PageHeader from '../layout/PageHeader';
import PageTitle from '../layout/PageTitle';
import Container from '../layout/Container';
import BottomButton from '../layout/BottomButton';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/map");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/map");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);

    // if (this.isFormValid(this.state)) {
    //   this.setState({ errors: [] });
    //   this.props.dispatch(loginUser(userData)).then((response) => {
    //     if (response.payload.loginSuccess) {
    //       window.localStorage.setItem("userId", response.payload.userId);
    //       this.props.history.push("/");
    //     } else {
    //       this.setState({
    //         errors: this.state.errors.concat(
    //           "Failed to log in, you can check your Email and Password"
    //         ),
    //       });
    //     }
    //   });
    // } else {
    //   this.setState({
    //     errors: this.state.errors.concat("Form is not valid"),
    //   });
    // }
  };

  // isFormValid = ({ email, password }) => email && password;


  render() {
    const { errors } = this.state;

    return (
      <Container>

        <PageTitle name="Skipit" />
        <PageHeader name="Login" />

 
            <div>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div>
                <BottomButton
                  name="Login"
                  type="submit"
                 />
              </div>
            </form>
            </Container>

    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
