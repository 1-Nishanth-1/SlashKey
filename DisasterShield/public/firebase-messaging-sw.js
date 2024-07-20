importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDe5OLLg_PiGh8Qps-CHAIzl03OPje3YKs",
  authDomain: "disastershield-588e9.firebaseapp.com",
  projectId: "disastershield-588e9",
  storageBucket: "disastershield-588e9.appspot.com",
  messagingSenderId: "57892325791",
  appId: "1:57892325791:web:3ea1d1b9936dced66555aa",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(
    payload.notification.title,
    notificationOptions
  );
});
