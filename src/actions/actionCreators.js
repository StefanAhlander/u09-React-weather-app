import { TOGGLE_DEGREES, ADD_FAVOURITE, DELETE_FAVOURITE } from './actions';

export function toggleDegreesAction() {
  return {
    type: TOGGLE_DEGREES,
  };
}

export function addFavouriteAction(name, path) {
  return {
    type: ADD_FAVOURITE,
    payload: {
      name,
      path,
    },
  };
}

export function deleteFavouriteAction(path) {
  return {
    type: DELETE_FAVOURITE,
    payload: path,
  };
}
