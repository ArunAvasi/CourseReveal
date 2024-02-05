from flask import Flask, render_template, request, jsonify
import firebase_admin
import firebase_admin.auth as auth
from firebase_admin import credentials, firestore

app = Flask(__name__)

# Initialize Firebase Admin
cred = credentials.Certificate('/Users/arunavasi/Code/Firebase Auth/courselogin-19fbf-firebase-adminsdk-50tnp-46afd41bca.json')
firebase_admin.initialize_app(cred)

# Firestore database instance
db = firestore.client()

@app.route('/')
def main():  # put application's code here
    return render_template('login.html')

@app.route('/home')
def home():  # put application's code here
    return render_template('home.html')


@app.route('/login')
def login():  # put application's code here
    return render_template('login.html')


@app.route('/verifyToken', methods=['POST'])
def verify_token():
    # Extract the ID token from the request.
    id_token = request.json.get('idToken')

    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        print(uid)

        return jsonify({'status': 'success', 'uid': uid})
    except auth.AuthError:
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run()
