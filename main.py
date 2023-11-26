from flask import Flask, request, render_template, jsonify, render_template_string
import boto3



app = Flask("__main__")
boto3.setup_default_session(profile_name='ArunAvasi')
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
# Reference the table
table = dynamodb.Table('SectionTable')

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit_number", methods=["POST"])
def submit_number():
    try:
        # Attempt to convert 'number' form data to an integer
        section = int(request.form.get('number', 0))
        name = request.form.get('name', '')
        table.put_item(
            Item={
                'SectionID': section,
                'StudentName': name,

            }
        )
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('SectionID').eq(section)
        )
        items = response.get('Items', [])
        return render_template("index.html", names=items)

    except Exception as e:
        # Handle errors
        print(f"An error occurred: {e}")
        return render_template("error.html", error=str(e))



if __name__ == "__main__":
    app.run()

