import alt from '../lib/alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
    constructor() {
      this.state = {
        session: null,
        error: null
      };

      this.bindListeners({
        getSession: SessionActions.getSession,
        sessionSuccess: SessionActions.sessionSuccess,
        sessionError: SessionActions.sessionError
      });
    }

    getSession() {
      this.setState({
        session: null,
        error: null
      });
    }

    sessionSuccess(user) {
      this.setState({
        session: user
      });
    }

    sessionError(error) {
      this.setState({
        error: error
      });
    }
}

export default alt.createStore(SessionStore, 'SessionStore');
