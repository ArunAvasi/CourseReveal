export const signIn = () => {
    function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // The signed-in user info.
        var user = result.user;
        // Get the ID token of the user
        user.getIdToken().then(function(idToken) {
            // Send the ID token to the backend
            fetch('/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: idToken })
            }).then(function(response) {
                if (response.ok) {
                    // Redirect to home page
                    window.location.href = '/home';
                } else {
                    // Handle error
                    console.error('Error:', response);
                }
            });
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // Display the error message
        document.getElementById('error-message').innerText = errorMessage;
    });
}