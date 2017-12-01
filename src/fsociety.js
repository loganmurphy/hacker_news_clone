import * as firebase from "firebase";

import store from './store.js';
import { login } from './actions.js';

var config = {
  apiKey: "AIzaSyCgNfQC53bF5TCSr2pemo6ZuLj4ORC6sF4",
  authDomain: "my-hacker-news-clone.firebaseapp.com",
  databaseURL: "https://my-hacker-news-clone.firebaseio.com",
  projectId: "my-hacker-news-clone",
  storageBucket: "my-hacker-news-clone.appspot.com",
  messagingSenderId: "739870936351"
};

firebase.initializeApp(config);

var database = firebase.database();

export var User = {};
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      User.user = user;
      console.log(user);

      store.dispatch(login(User.user.uid));
    }
  });


export default database;
