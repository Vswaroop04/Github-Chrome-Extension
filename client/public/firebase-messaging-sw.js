// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAROb5dbky2cSbTs5x3gq1Imv7_1-FX2Cs",
  authDomain: "github-chrome-extension.firebaseapp.com",
  projectId: "github-chrome-extension",
  storageBucket: "github-chrome-extension.appspot.com",
  messagingSenderId: "1084770993403",
  appId: "1:1084770993403:web:c767873b314c00b3dcdc5e",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  self.addEventListener(
    "notificationclick",
    function (event) {
      if (payload.notification.data.url || event.notification.data.url) {
        clients.openWindow(event.notification.data.url);
      }
    },
    false
  );
});
