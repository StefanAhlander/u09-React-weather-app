import React, { useContext, memo } from 'react';
import { Navbar, Nav, Form, NavDropdown } from 'react-bootstrap';
import { DegreesContext } from './contexts/weather.context';
import { FavouritesContext } from './contexts/weather.context';
import { toggleDegreesAction } from './actions/actionCreators';
import SearchLocation from './SearchLocation';
import { Link, NavLink, useLocation } from 'react-router-dom';

function PageNav(props) {
  const { isCelsius, toggleIsCelsius } = useContext(DegreesContext);
  const { favourites } = useContext(FavouritesContext);
  const location = useLocation();
  const path = location.pathname;
  let basePath = /^\/\w+/.exec(path)
    ? path.replace(/^\/\w+/.exec(path)[0], '')
    : '';

  const goLocal = basePath ? (
    <Nav.Link as={NavLink} exact to={`/`}>
      Go Local
    </Nav.Link>
  ) : (
    ''
  );

  const favouriteNav = favourites.length ? (
    <NavDropdown title='Favourites' id='basic-nav-dropdown'>
      {favourites.map((item) => {
        return (
          <NavDropdown.Item as={Link} exact to={item.path}>
            {item.name}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  ) : (
    ''
  );

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand as={Link} to='/'>
        Sunny Weather App
      </Navbar.Brand>
      <Form>
        <Form.Check
          style={{ color: 'white' }}
          type='switch'
          id='custom-switch'
          checked={isCelsius}
          label={isCelsius ? '°C' : '°F'}
          onChange={() => {
            toggleIsCelsius(toggleDegreesAction());
          }}
        />
      </Form>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={NavLink} exact to={`/current${basePath}`}>
            Current Weather
          </Nav.Link>
          <Nav.Link as={NavLink} exact to={`/forecast${basePath}`}>
            Five day Forecast
          </Nav.Link>
          {goLocal}
          {favouriteNav}
        </Nav>
        <SearchLocation />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default memo(PageNav);
