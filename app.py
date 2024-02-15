from boto3.dynamodb.conditions import Key
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import firebase_admin, secrets, pandas as pd, boto3
from firebase_admin import credentials, firestore, auth
from boto3.dynamodb.conditions import Attr
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

    class_students(17706)

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

    sectionID = request.form.get('sectionNumber')
    sectionID = int(sectionID) if sectionID.isdigit() else None

    if sectionID is None:
        return jsonify({'status': 'error', 'message': 'Missing Section ID'}), 400

    df=pd.read_csv('/Users/arunavasi/Code/Data.csv')
    if df.empty:
        return jsonify({'status': 'error', 'message': 'No data found in the file'}), 400

    section_id_column = 'index'  # Replace with the actual column name for section IDs
    class_name_column = 'className'


    className= df.loc[df[section_id_column] == sectionID, class_name_column].iloc[0]
    print(className)


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
def class_students(sectionID):
    if 'uid' not in session:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    response = table.scan(
        FilterExpression=Attr('SectionID').eq(sectionID)
    )

    uids = [item['UserID'] for item in response['Items']]

    for uid in uids:
        print(uid)

    return jsonify({'status': 'success', 'uids': uids})


@app.route('/getInfo', methods=['POST'])
def getInfo(SectionID):
    df = pd.read_csv('/Users/arunavasi/Code/Data.csv')
    if df.empty:
        return jsonify({'status': 'error', 'message': 'No data found in the file'}), 400
    section_id_column = 'index'
    classCode = 'classCode'
    indexId = 'section'
    class_name_column = 'className'

    row = df.loc[df['index'] == SectionID]
    if row.empty:
        return jsonify({'status': 'error', 'message': 'Section not found'}), 404

    ClassNum = row[classCode].values[0]
    index = row[indexId].values[0]
    Name = row[class_name_column].values[0]

    return jsonify({'status': 'success', 'ClassNum': ClassNum, 'index': index, 'Name': Name})










if __name__ == '__main__':
    app.run(debug=True)