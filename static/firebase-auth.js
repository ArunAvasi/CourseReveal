// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAOuiVGNP8WTp7ZXsg5NoGXPxCuUBeWLw",
  authDomain: "courselogin-19fbf.firebaseapp.com",
  projectId: "courselogin-19fbf",
  storageBucket: "courselogin-19fbf.appspot.com",
  messagingSenderId: "507655263700",
  appId: "1:507655263700:web:cb550303f67e3ec5947241",
  measurementId: "G-QN0XN1FK9E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Sign-Up Function
function signUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = '/home';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Show error message to your user
    });
}

// Sign-In Function
function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = '/home';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Show error message to your user
    });
}

// Logout Function
function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    // Redirect to login page or show a success message
  }).catch((error) => {
    // An error happened.
    // Handle errors here
  });
}

// Auth State Observer
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    var uid = user.uid;
    // Update your UI with user information, or redirect
  } else {
    // User is signed out
    // Redirect to login, or hide user-specific elements
  }
});
