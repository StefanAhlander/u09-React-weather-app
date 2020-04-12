import React, { memo } from 'react';
import ThreeHours from './ThreeHours';

function Day(props) {
  return (
    <>
      <h3>{props.date}</h3>
      {props.list.map((hour) => (
        <ThreeHours key={hour.dt} {...hour} />
      ))}
    </>
  );
}

export default memo(Day);
