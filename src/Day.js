import React, { memo } from 'react';
import ThreeHours from './ThreeHours';

function Day(props) {
  return (
    <>
      <h3 className='text-center'>{props.date}</h3>
      <ul className='list-group list-group-flush text-center'>
        {props.list.map((hour) => (
          <ThreeHours key={hour.dt} {...hour} />
        ))}
      </ul>
    </>
  );
}

export default memo(Day);
