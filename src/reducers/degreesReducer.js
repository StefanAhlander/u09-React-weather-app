import * as Constants from '../actions/actions';

export default function degreesReducer(state, action) {
  switch (action.type) {
    case Constants.TOGGLE_DEGREES:
      return !state;
    default:
      return state;
  }
}
