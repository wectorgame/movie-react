import "./App.scss";
import { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import Auth from "./components/Auth/Auth";
import Films from "./components/Films/Films";
import { connect } from "react-redux";
import Layout from "./hoc/layout/Layout";

import { autoLogin } from "./store/actions/auth";
import Logout from "./components/Logout/Logout";
import Series from "./components/Series/Series";
import Favorite from "./components/Favorite/Favorite";
import Film from "./components/Film/Film";
class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} exact></Route>
        <Redirect to="/auth"></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/films" component={Films} exact />
          <Route path="/series" component={Series} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/profile/:name" component={Film}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Redirect to="/films" component={Films} exact></Redirect>
        </Switch>
      );
    }

    return (
      <>
        <Layout>{routes}</Layout>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
