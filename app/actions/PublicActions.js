import alt from '../lib/alt';

class PublicActions {
  setTitle(title) {
    return this.title(title);
  }

  title(title) {
    return title;
  }
}

export default alt.createActions(PublicActions);
