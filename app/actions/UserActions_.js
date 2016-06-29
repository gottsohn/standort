import firebase from '../database';
const GET = 'GET';
const UPDATE = 'UPDATE';
const SET = 'SET';

export default {
  GET,
  UPDATE,
  SET,
  filters: {

  },

  get: (userId) => {
    'use strict';
    return new Promise((resolve, reject) => {
      let result = {
        type: GET
      };

      firebase.database.ref(`users/${userId}`).once('value', (snap) => {
        if (snap.val()) {
          result.user = snap.val();
          resolve(result);
        } else {
          result.error = 'User not found';
          reject(result);
        }
      });
    });
  },

  update: (user) => {
    'use strict';
    return {
      type: UPDATE,
      user
    };
  },

  set: (user) => {
    'use strict';
    return {
      type: SET,
      user
    };
  }
};
