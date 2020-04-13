import * as Constants from '../actions/actions';

export default function favouritesReducer(state, action) {
  switch (action.type) {
    case Constants.ADD_FAVOURITE:
      return [...state, action.payload];
    case Constants.DELETE_FAVOURITE:
      return [...state].filter(
        (item) =>
          item.path.slice(item.path.lastIndexOf('/')) !==
          action.payload.slice(action.payload.lastIndexOf('/'))
      );
    default:
      return state;
  }
}
