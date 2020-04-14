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
        title='Search for cities world wide. For more specificity add comma and country code: ",countrycode". For example "Solna,SE" with no space between city and country code.'
      />
      <Button variant='outline-success' onClick={handleSubmit}>
        Search
      </Button>
    </Form>
  );
}

export default withRouter(SearchLocation);
