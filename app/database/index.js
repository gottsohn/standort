import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCcoeV4b3yAZYMQe24jWUUAgyo27CqDb9A',
  authDomain: 'the-goodson.firebaseapp.com',
  databaseURL: 'https://the-goodson.firebaseio.com',
  storageBucket: 'the-goodson.appspot.com'
};

const app = firebase.initializeApp(config);

export default {
  database: app.database(),
  auth: app.auth(),
  providers: {
    facebook: new firebase.auth.FacebookAuthProvider(),
    google: new firebase.auth.GoogleAuthProvider(),
    github: new firebase.auth.GithubAuthProvider()
  }
};
