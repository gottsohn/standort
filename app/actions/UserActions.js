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

    update(user) {
      firebase.database.ref(`users/${user.id}`).update(user, (error) => {
        if (error) {
          this.updateError(error);
        } else {
          this.updateSuccess(user);
        }
      });

      return true;
    }

    getSuccess(user) {
      return user;
    }

    getError() {
      return {
        error: 'User not found'
      };
    }

    updateSuccess(user) {
      return user;
    }

    updateError() {
      return {
        error: 'User not updated'
      };
    }
}

export default alt.createActions(UserActions);
