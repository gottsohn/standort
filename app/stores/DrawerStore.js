import alt from '../lib/alt';
import DrawerActions from '../actions/DrawerActions';

class DrawerStore {
    constructor() {
      this.state = {
        isOpen: false
      };

      this.bindListeners({
        isOpen: DrawerActions.isOpen
      });
    }

    isOpen(isOpen) {
      this.setState({
        isOpen
      });
    }
}

export default alt.createStore(DrawerStore, 'DrawerStore');
