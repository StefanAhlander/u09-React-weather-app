import React, { useContext } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { WeatherContext } from './contexts/weather.context';
import { toggleDegreesAction } from './actions/actionCreators';
import SearchLocation from './SearchLocation';
import { Link, NavLink } from 'react-router-dom';

export default function PageNav(props) {
  const { state, dispatch } = useContext(WeatherContext);
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand as={Link} to='/'>
        Sunny Weather App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Form>
          <Form.Check
            style={{ color: 'white' }}
            type='switch'
            id='custom-switch'
            checked={state.isCelsius}
            label={state.isCelsius ? '°C' : '°F'}
            onChange={() => {
              dispatch(toggleDegreesAction());
            }}
          />
        </Form>
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
