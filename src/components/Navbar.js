import { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
class NavbarMovie extends Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index} className="nav-item">
          <NavLink
            className="nav-link"
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
    /* const cls = ["navbar", "navbar-expand-lg", "navbar-dark", " bg-dark"]; */
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
      <Navbar bg="light" expand="lg">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    {this.renderLinks(links)}
      
    </Nav>
   
  </Navbar.Collapse>
</Navbar>
      /*  <nav className={cls.join(" ")}>
        <NavbarToggle aria-controls="basic-navbar-nav"> </NavbarToggle>
        <NavbarCollapse id="basic-navbar-nav">
          <ul className="navbar-nav">{this.renderLinks(links)}</ul>
        </NavbarCollapse>
      </nav> */
    );
  }
}
export default NavbarMovie;
