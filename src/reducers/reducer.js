import * as Constants from '../actions/actions';

export default function reducer(state, action) {
  switch (action.type) {
    case Constants.TOGGLE_DEGREES:
      return { ...state, isCelsius: !state.isCelsius };
    default:
      return state;
  }
}
