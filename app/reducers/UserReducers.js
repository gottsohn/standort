import actions from '../actions/UserActions_';

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET:
      return actions.get(action.userId);
    case actions.UPDATE:
      return Object.assign({}, state);
    case actions.SET:
      return Object.assign({}, state);
    default:
      return new Promise(resolve => resolve({}));
  }
};
