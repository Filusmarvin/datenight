importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-messaging.js');

var app = firebase.initializeApp({
    apiKey: "AIzaSyAhoxu3waM5qMIQHwXGZ4Gcq7VuDcRohtU",
    authDomain: "final-project-d5b65.firebaseapp.com",
    databaseURL: "https://final-project-d5b65.firebaseio.com",
    // projectId: "final-project-d5b65",
    storageBucket: "final-project-d5b65.appspot.com",
    messagingSenderId: "70114222789"
  });

  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(funciton(payload){
    const title = "hello world"
    const options = {
      body: payload.data.status
    }
    return self.registration.showNotification(title , options);
    console.log("payload")
  })
