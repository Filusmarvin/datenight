var Rebase = require('re-base');
var firebase = require('firebase');
// require('firebase/auth');
var app = firebase.initializeApp({
    apiKey: "AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU",
    authDomain: "final-project-d5b65.firebaseapp.com",
    databaseURL: "https://final-project-d5b65.firebaseio.com",
    projectId: "final-project-d5b65",
    storageBucket: "final-project-d5b65.appspot.com",
    messagingSenderId: "70114222789"
  });

var base = Rebase.createClass(app.database());
export{ base , app }
