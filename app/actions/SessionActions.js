import firebase from '../database';
import alt from '../lib/alt';

class SessionActions {
    getSession() {
      const user = firebase.auth.currentUser;
      if (user) {
        const userData = user.providerData[0],
          self = this,
          userId = `${userData.providerId.split(/\./)[0]}:${userData.uid}`,
          userRef = firebase.database.ref(`users/${userId}`),
          session = {
            name: userData.displayName,
            email: userData.email,
            id: userId,
            uid: user.uid,
            refreshToken: user.refreshToken,
            provider: userData.providerId,
            photo: userData.photoURL
        };

        userRef.once('value', (snap) => {
          if(snap.val()) {
            self.sessionSuccess(snap.val());
            userRef.update({
              photo: session.photo,
              refreshToken: session.refreshToken,
              uid: session.uid,
              lastSeenAt: Date.now()
            });
          } else {
            self.sessionSuccess(session);
          }
        });
      } else {
        this.sessionError();
      }

      return true;
    }

    sessionSuccess(user) {
      return user;
    }

    sessionError() {
      return {
        error: 'No active user'
      };
    }
}

export default alt.createActions(SessionActions);
