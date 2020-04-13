import React from 'react';
import './DisplayPanel.css';

export default function DisplayPanel(props) {
  return (
    <div className='DisplayPanel card col-xs-11 col-sm-9 col-md-8 col-lg-6 col-xl-4 mx-auto mt-2'>
      {props.children}
    </div>
  );
}
