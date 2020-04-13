import React, { useState } from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchLocation(props) {
  const [state, setState] = useState('');
  const history = useHistory();
  const location = useLocation();

  function handleChange(e) {
    setState(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setState('');
    const path = location.pathname;
    let basePath = /^\/\w+/.exec(path)[0];
    history.push(`${basePath}/${state}`);
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        type='text'
        value={state}
        placeholder='Search'
        className='mr-sm-2'
        onChange={handleChange}
      />
      <Button variant='outline-success' onClick={handleSubmit}>
        Search
      </Button>
    </Form>
  );
}

export default withRouter(SearchLocation);
