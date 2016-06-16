import alt from '../lib/alt';

class DrawerActions {
  open(isOpen) {
    return this.isOpen(isOpen);
  }

  isOpen(isOpen) {
    return isOpen;
  }
}

export default alt.createActions(DrawerActions);
