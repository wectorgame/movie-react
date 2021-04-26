import { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <Navbar isAuthenticated={this.props.isAuthenticated}></Navbar>
        <main className="container">{this.props.children}</main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}
export default connect(mapStateToProps)(Layout);
