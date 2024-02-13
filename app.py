from boto3.dynamodb.conditions import Key
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import firebase_admin, secrets
from firebase_admin import credentials, firestore, auth
import boto3

app = Flask(__name__)

app.secret_key = secrets.token_hex(16)

cred = credentials.Certificate('/Users/arunavasi/Code/Firebase Auth/courselogin-19fbf-firebase-adminsdk-50tnp-46afd41bca.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CourseRevealDB')

@app.route('/')
def main():
    return render_template('login.html')

@app.route('/home')
def home():
    uid = session.get('uid')
    if not uid:
        # Redirect to login if UID not in session
        return redirect(url_for('login'))

    # Fetch classes from the database
    classes = table.query(
        KeyConditionExpression=Key('UserID').eq(uid)
    )

    # Pass classes to the home template
    return render_template('home.html', classes=classes['Items'])

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/verifyToken', methods=['POST'])
def verify_token():
    id_token = request.json.get('idToken')

    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        session['uid'] = uid

        return jsonify({'status': 'success', 'uid': uid})
    except auth.AuthError:
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 401

@app.route('/addClass', methods=['POST'])
def add_class():
    uid = session.get('uid')  # Retrieve UID from the session
    if uid is None:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    className = request.form.get('className')
    sectionID = request.form.get('sectionNumber')
    sectionID = int(sectionID) if sectionID.isdigit() else None

    if className is None or sectionID is None:
        return jsonify({'status': 'error', 'message': 'Missing className or sectionNumber'}), 400

    response = table.put_item(
        Item={
            'UserID': uid,
            'SectionID': sectionID,
            'ClassName': className
        }
    )
    classes = table.query(
        KeyConditionExpression=Key('UserID').eq(uid)
    )
    return render_template('home.html', classes=classes['Items'])


@app.route('/deleteClass', methods=['POST'])
def delete_class():
    uid = session.get('uid')
    if uid is None:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    sectionID=request.form.get('classID')
    sectionID = int(sectionID) if sectionID.isdigit() else None
    response = table.delete_item(
        Key={
            'UserID': uid,
            'SectionID': sectionID
        }
    )
    classes = table.query(
        KeyConditionExpression=Key('UserID').eq(uid)
    )
    return render_template('home.html', classes=classes['Items'])

@app.route('/ClassStudents', methods=['POST'])
def class_students():
    uid = session.get('uid')
    if uid is None:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    sectionID = request.form.get('classID')
    sectionID = int(sectionID) if sectionID.isdigit() else None
    response = table.get_item(
        Key={
            'UserID': uid,
            'SectionID': sectionID
        }
    )
    return render_template('students.html', classInfo=response['Item'])

if __name__ == '__main__':
    app.run(debug=True)