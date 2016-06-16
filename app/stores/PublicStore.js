import alt from '../lib/alt';
import PublicActions from '../actions/PublicActions';

class PublicStore {
    constructor() {
      this.state = {
        title: 'Standort'
      };

      this.bindListeners({
        title: PublicActions.title
      });
    }

    title(title) {
      this.setState({
        title
      });
    }
}

export default alt.createStore(PublicStore, 'PublicStore');
