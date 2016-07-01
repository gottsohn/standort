import React from 'react';
import classnames from 'classnames';

import PublicActions from '../../actions/PublicActions';
import styles from '../../App.css';

export default class NotFound extends React.Component {

  componentDidMount() {
    PublicActions.setTitle('404');
  }

  render() {
    return (
      <div className={styles.center} style={{color: '#ff4081'}}>
        <h1 className={styles.largerText}>404</h1>
        <p>
          <i
              className={classnames('fa', 'fa-5x', 'fa-warning')}
              style={{color: '#444'}}
          >
          </i>
        </p>
        <h2>The page you tried to access was not found</h2>
        <h4>Die Seite, die Sie den Zugriff versucht wurde nicht gefunden</h4>
        <h5>La page que vous avez essayé d'accéder n'a pas été trouvé</h5>
        <h6>La página que intentó acceder no se encontró</h6>
        <h6>Ukurasa uliojaribu kupata haupatikani</h6>
      </div>
    );
  }
}
