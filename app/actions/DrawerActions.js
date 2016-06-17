import alt from '../lib/alt';

class DrawerActions {
  open(isOpen) {
    this.isOpen(isOpen);
    return true;
  }

  isOpen(isOpen) {
    return isOpen;
  }
}

export default alt.createActions(DrawerActions);
