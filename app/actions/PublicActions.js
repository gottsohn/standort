import alt from '../lib/alt';

class PublicActions {
  setTitle(title) {
    this.title(title);
    return true;
  }

  title(title) {
    return title;
  }
}

export default alt.createActions(PublicActions);
