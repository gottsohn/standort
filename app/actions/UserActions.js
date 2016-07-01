import firebase from '../database';
import alt from '../lib/alt';

class UserActions {
  get(userId) {
    firebase.database.ref(`users/${userId}`).once('value', (snap) => {
      if (snap.val()) {
        this.getSuccess(snap.val());
      } else {
        this.getError();
      }
    });

    return true;
  }

  update(user, fields) {
    let update = fields || user;
    update.lastSeenAt = Date.now();
    if (user.id) {
      firebase.database.ref(`users/${user.id}`).update(update,
        (error) => {
          if (error) {
            this.updateError(error);
          } else {
            this.updateSuccess(user);
          }
        });
      } else {
      this.updateError({
          message: 'No user ID present'
      });
    }

    return true;
  }

  set(user, key, value) {
    firebase.database.ref(`users/${user.id}/${key}`).set(value);
    return true;
  }

  getSuccess(user) {
    return user;
  }

  getError() {
    return 'User not found';
  }

  updateSuccess(user) {
    return user;
  }

  updateError(error) {
    return {
      error
    };
  }
}

export default alt.createActions(UserActions);
