from boto3.dynamodb.conditions import Key
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import firebase_admin, secrets, pandas as pd, boto3
from firebase_admin import credentials, firestore, auth
import boto3
from flask_cors import CORS
from boto3.dynamodb.conditions import Attr

boto3.setup_default_session(
    aws_access_key_id='AKIA3BSILOEAGNFXCP43',
    aws_secret_access_key='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'
)

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = secrets.token_hex(16)

cred = credentials.Certificate('/Users/varungangavarapu/Programming/FireBaseAuth/courselogin-19fbf-firebase-adminsdk-50tnp-46afd41bca.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('CourseRevealDB')


@app.route('/verifyToken', methods=['POST'])
def verify_token():
    id_token = request.json.get('idToken')
    
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        session['uid'] = uid

        full_name = decoded_token.get('name', '')
        split_name = full_name.split(' ')
        first_name = split_name[0]
        last_name = split_name[-1]
        session['first_name'] = first_name
        session['last_name'] = last_name

        return jsonify({'status': 'success', 'uid': uid})
    except auth.AuthError:
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 401

@app.route('/addClass', methods=['POST'])
def add_class():
    uid = session.get('uid')
    if uid is None:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    data = request.get_json()  # Get data from JSON request body
    sectionID = data.get('sectionNumber')
    try:
        sectionID = int(sectionID)  # Convert to integer
    except (ValueError, TypeError):
        return jsonify({'status': 'error', 'message': 'Invalid sectionNumber'}), 400

    df = pd.read_csv('/Users/varungangavarapu/Programming/CourseReveal/data/Data.csv')
    section_id_column = 'index'  # Replace with the actual column name for section IDs
    class_name_column = 'className'
    class_code_column = 'classCode'
    class_section_column = 'section'

    firstName = session.get('first_name')
    lastName = session.get('last_name')


    className= df.loc[df[section_id_column] == sectionID, class_name_column].iloc[0]
    classCode= df.loc[df[section_id_column] == sectionID, class_code_column].iloc[0]
    classSection= df.loc[df[section_id_column] == sectionID, class_section_column].iloc[0]


    response = table.put_item(
    Item={
        'UserID': uid,
        'SectionID': sectionID,
        'ClassName': className,
        'code': classCode,
        'sect': classSection,
        'FirstName': firstName,
        'LastName': lastName
    }
    )


    # Query the database for items associated with the uid
    classes = table.query(
        KeyConditionExpression=Key('UserID').eq(uid)
    )

    # Return the items in a JSON response
    return jsonify({'status': 'success', 'items': classes['Items']}), 200

@app.route('/getClasses', methods=['GET'])
def get_classes():
    uid = session.get('uid')
    if uid is None:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    # Query the database for items associated with the uid
    try:
        classes = table.query(
            KeyConditionExpression=Key('UserID').eq(uid)
        )
        return jsonify({'status': 'success', 'items': classes['Items']}), 200
    except Exception as e:
        # Handle potential errors
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/deleteClass', methods=['POST'])
def delete_class():
    uid = session.get('uid')
    if uid is None:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401

    data = request.get_json()  # Get data from JSON request body
    sectionID = data.get('sectionNumber')
    try:
        sectionID = int(sectionID)  # Convert to integer
    except (ValueError, TypeError):
        return jsonify({'status': 'error', 'message': 'Invalid sectionNumber'}), 400
    
    response = table.delete_item(
        Key={
            'UserID': uid,
            'SectionID': sectionID
        }
    )
    classes = table.query(
        KeyConditionExpression=Key('UserID').eq(uid)
    )
    return jsonify({'status': 'success', 'items': classes['Items']}), 200

@app.route('/ClassStudents', methods=['POST'])
def class_students():
    if 'uid' not in session:
        return jsonify({'status': 'error', 'message': 'Authentication required'}), 401
    
    data = request.get_json()  # Get data from JSON request body
    sectionID = data.get('sectionNumber')
    print("SectionID: " + sectionID)

    print(sectionID)
    try:
        sectionID = int(sectionID)  # Convert to integer
    except (ValueError, TypeError):
        return jsonify({'status': 'error', 'message': 'Invalid sectionNumber'}), 400

    response = table.scan(
        FilterExpression=Attr('SectionID').eq(sectionID)
    )
    for item in response['Items']:
        print("This is my print statement: " + item['FirstName'])
    firstNames = [item['FirstName'] for item in response['Items']]
    lastNames = [item['LastName'] for item in response['Items']]


    return jsonify({'status': 'success', 'students': list(zip(firstNames, lastNames))})

@app.route('/getInfo', methods=['POST'])
def getInfo():
    df = pd.read_csv('/Users/varungangavarapu/Programming/CourseReveal/data/Data.csv')
    if df.empty:
        return jsonify({'status': 'error', 'message': 'No data found in the file'}), 400
    data = request.get_json()  # Get data from JSON request body
    SectionID = data.get('sectionNumber')
    try:
        SectionID = int(SectionID)  # Convert to integer
    except (ValueError, TypeError):
        return jsonify({'status': 'error', 'message': 'Invalid sectionNumber'}), 400

    section_id_column = 'index'
    classCode = 'classCode'
    indexId = 'section'
    class_name_column = 'className'

    print(SectionID)
    row = df.loc[df['index'] == SectionID]
    print(row)
    if row.empty:
        return jsonify({'status': 'error', 'message': 'Section not found'}), 404

    ClassNum = row[classCode].values[0]
    index = row[indexId].values[0]
    Name = row[class_name_column].values[0]

    return jsonify({'status': 'success', 'ClassNum': ClassNum, 'index': index, 'Name': Name})

if __name__ == '__main__':
    app.run(debug=True)