import alt from '../lib/alt';

class PublicActions {
  setTitle(title) {
    if (title) {
      this.title(title);
      window.document.title = title;
    }

    return true;
  }

  title(title) {
    return title;
  }
}

export default alt.createActions(PublicActions);
