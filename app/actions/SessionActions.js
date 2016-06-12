import firebase from '../database';
import alt from '../lib/alt';

class SessionActions {
    getSession() {
      const session = firebase.auth.currentUser;
      if (session) {
          this.sessionSuccess(session);
      } else {
        this.sessionError();
      }
    }

    sessionSuccess(user) {
      const userData = user.providerData[0],
        userId = `${userData.providerId.split(/\./)[0]}:${userData.uid}`,
        session = {
          name: userData.displayName,
          email: userData.email,
          id: userId,
          uid: user.uid,
          refreshToken: user.refreshToken,
          provider: userData.providerId,
          photo: userData.photoURL
        };

      return session;
    }

    sessionError() {
      return 'No Current User';
    }
}

export default alt.createActions(SessionActions);
