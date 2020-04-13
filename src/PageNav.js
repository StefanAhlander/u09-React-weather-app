import React, { useContext, memo } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { DegreesContext } from './contexts/weather.context';
import { toggleDegreesAction } from './actions/actionCreators';
import SearchLocation from './SearchLocation';
import { Link, NavLink, useLocation } from 'react-router-dom';

function PageNav(props) {
  const { isCelsius, toggleIsCelsius } = useContext(DegreesContext);
  const location = useLocation();
  const path = location.pathname;
  let basePath = '';
  if (/^\/\w+/.exec(path)) {
    basePath = path.replace(/^\/\w+/.exec(path)[0], '');
  }

  console.log(basePath);
  const goLocal = basePath ? (
    <Nav.Link as={NavLink} exact to={`/`}>
      Go Local
    </Nav.Link>
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
        </Nav>
        <SearchLocation />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default memo(PageNav);
