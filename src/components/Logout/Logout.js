import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../store/actions/auth";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
      console.log(this.props)
    return <Redirect to={"/"}></Redirect>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(null, mapDispatchToProps)(Logout);
