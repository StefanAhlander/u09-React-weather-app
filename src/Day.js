import React from 'react';
import ThreeHours from './ThreeHours';

export default function Day(props) {
  return (
    <>
      <h3>{props.date}</h3>
      {props.list.map((hour) => (
        <ThreeHours key={hour.dt} {...hour} />
      ))}
    </>
  );
}
