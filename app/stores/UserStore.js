import alt from '../lib/alt';
import UserActions from '../actions/UserActions';

class UserStore {
    constructor() {
      this.state = {
        get: {
          user: null,
          error: null
        },
        update: {
          user: null,
          error: null
        }
      };

      this.bindListeners({
        get: UserActions.get,
        update: UserActions.update,
        updateSuccess: UserActions.updateSuccess,
        updateError: UserActions.updateError,
        getSuccess: UserActions.getSuccess,
        getError: UserActions.getError
      });
    }

    get() {
      this.setState({
        get: {
          user: {}
        }
      });
    }

    update() {
      this.setState({
        update: {}
      });
    }

    getSuccess(user) {
      this.setState({
        get: {
          user
        }
      });
    }

    getError(error) {
      this.setState({
        get: {
          error
        }
      });
    }

    updateSuccess(user) {
      this.setState({
        update: {
          user
        }
      });
    }

    updateError(error) {
      this.setState({
        update: {
          error
        }
      });
    }
}

export default alt.createStore(UserStore, 'UserStore');
