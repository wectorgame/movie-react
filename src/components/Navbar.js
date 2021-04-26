import { Component } from "react";
import { NavLink } from "react-router-dom";
class Navbar extends Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index} className="nav-link">
          <NavLink
            to={link.to}
            label={link.label}
            exact={link.exact}
            activeClassName={"active"}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const cls = ["navbar", "navbar-expand-lg", " bg-dark"];
    const links = [];
    if (this.props.isAuthenticated) {
      links.push({ to: "/films", label: "Фильмы", exact: true });
      links.push({ to: "/series", label: "Сериалы", exact: false });
      links.push({ to: "/favorite", label: "Израбнное", exact: false });
      links.push({ to: "/logout", label: "Выйти", exact: false });
    } else {
      links.push({ to: "/auth", label: "Добро пожаловать!", exact: true });
    }
    return (
      <nav className={cls.join(" ")}>
        <ul className="navbar-nav">{this.renderLinks(links)}</ul>
      </nav>
    );
  }
}
export default Navbar;
