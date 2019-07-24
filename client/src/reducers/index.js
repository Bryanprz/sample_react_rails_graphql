import { combineReducers } from 'redux';

const selectedKlassReducer = (selectedKlass = null, action) => {
  if (action.type === 'KLASS_SELECTED') {
    return action.payload;
  }

  return selectedKlass;
};

const selectedKlassIdReducer = (selectedKlassId = '', action) => {
  if (action.type === 'KLASS_ID_SELECTED') {
    return action.payload;
  }

  return selectedKlassId;
};

const currentUserReducer = (user = null, action) => {
  if (action.type === 'AUTHORIZE_USER') {
    return action.payload;
  }

  return user;
};

export default combineReducers({
  selectedKlass: selectedKlassReducer,
  selectedKlassId: selectedKlassIdReducer,
  currentUser: currentUserReducer
});
