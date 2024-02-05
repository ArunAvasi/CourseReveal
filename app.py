from flask import Flask, render_template
import firebase_admin
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


if __name__ == '__main__':
    app.run()
