export const selectKlass = klass => {
  // Return an action
  return {
    type: 'KLASS_SELECTED',
    payload: klass
  };
};

export const selectKlassId = klassId => {
  return {
    type: 'KLASS_ID_SELECTED',
    payload: klassId
  };
};

export const authorizeUser = user => {
  return {
    type: 'AUTHORIZE_USER',
    payload: user
  }
};
