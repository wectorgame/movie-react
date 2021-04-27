import { Component } from "react";
import { connect } from "react-redux";
import NavbarMovie from "../../components/Navbar";

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <NavbarMovie isAuthenticated={this.props.isAuthenticated}></NavbarMovie>
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
