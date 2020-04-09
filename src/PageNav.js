import React, { useContext } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { DegreesContext } from './contexts/weather.context';
import { toggleDegreesAction } from './actions/actionCreators';
import SearchLocation from './SearchLocation';
import { Link, NavLink } from 'react-router-dom';

export default function PageNav(props) {
  const { isCelsius, toggleIsCelsius } = useContext(DegreesContext);
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
          <Nav.Link as={NavLink} to='/current'>
            Current Weather
          </Nav.Link>
          <Nav.Link as={NavLink} to='/forecast'>
            Five day Forecast
          </Nav.Link>
        </Nav>
        <SearchLocation />
      </Navbar.Collapse>
    </Navbar>
  );
}
