import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FavouritesContext } from './contexts/weather.context';
import './CardHeader.css';
import {
  addFavouriteAction,
  deleteFavouriteAction,
} from './actions/actionCreators';

export default function CardHeader(props) {
  const { favourites, dispatchFavourites } = useContext(FavouritesContext);
  const location = useLocation();
  const path = location.pathname;
  let basePath = /^\/\w+/.exec(path)
    ? path.replace(/^\/\w+/.exec(path)[0], '')
    : '';
  const isFavourite = favourites.some(
    (item) =>
      item.path.slice(item.path.lastIndexOf('/')) ===
      location.pathname.slice(location.pathname.lastIndexOf('/'))
  );
  const color = isFavourite ? 'yellow' : 'gray';

  function handleClick() {
    if (isFavourite) {
      dispatchFavourites(deleteFavouriteAction(location.pathname));
    } else {
      dispatchFavourites(addFavouriteAction(props.name, location.pathname));
    }
  }

  return (
    <div className='CardHeader card-header text-center'>
      <h1>{props.name}</h1>
      {basePath ? (
        <i
          className='fas fa-star'
          style={{
            fontSize: '3rem',
            color: color,
            textShadow: '0px 0px 3px #000',
          }}
          onClick={handleClick}
        ></i>
      ) : (
        ''
      )}
    </div>
  );
}
